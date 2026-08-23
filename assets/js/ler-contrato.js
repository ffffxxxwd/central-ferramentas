/* ============================================================
   Ler Contrato — extrai dados do PDF do contrato (GAV / WAM)
   ------------------------------------------------------------
   - Lê o TEXTO do PDF com pdf.js (offline, sem chave de API).
   - Reconhece os rótulos do "Quadro Resumo / Proponente Comprador"
     (Nome, CPF, Identidade, Estado Civil, Cônjuge, Empreendimento,
      Torre/Bloco, Apartamento, Cota, Empresa vendedora + CNPJ).
   - Só funciona em PDF com TEXTO (contrato escaneado/imagem não).
   Uso:
     LerContrato.lerPDF(file).then(t => LerContrato.extrair(t))
   ============================================================ */
(function () {
  "use strict";

  /* ---------- utilidades ---------- */
  function norm(s) {
    return (s == null ? "" : String(s)).replace(/ /g, " ").replace(/\s+/g, " ").trim();
  }
  function primeiro(re, txt, grp) {
    var m = txt.match(re);
    return m ? norm(m[grp || 1]) : "";
  }
  function ehNaoInformado(s) {
    return !s || /n[ãa]o\s+informad/i.test(s) || /inexistente/i.test(s);
  }
  function normalizarEstadoCivil(s) {
    s = (s || "").toLowerCase();
    if (/uni[ãa]o\s+est/.test(s)) return "União estável";
    if (/solteir/.test(s)) return "Solteiro(a)";
    if (/casad/.test(s)) return "Casado(a)";
    if (/divorc/.test(s)) return "Divorciado(a)";
    if (/vi[úu]v/.test(s)) return "Viúvo(a)";
    return "";
  }

  /* ---------- reconstrução de linhas a partir dos itens do pdf.js ----------
     pdf.js devolve pedaços de texto com coordenada Y (transform[5]).
     Agrupo pedaços com Y parecido na mesma linha para os rótulos ficarem
     "Rótulo: valor" numa linha só (igual ao PDF impresso). */
  function itensParaLinhas(items) {
    var linhas = [], cur = "", lastY = null;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (typeof it.str !== "string") continue;
      var y = (it.transform && it.transform.length >= 6) ? it.transform[5] : lastY;
      if (lastY !== null && y !== null && Math.abs(y - lastY) > 3) {
        linhas.push(cur);
        cur = it.str;
      } else {
        var precisaEspaco = cur && !/\s$/.test(cur) && it.str && !/^\s/.test(it.str);
        cur += (precisaEspaco ? " " : "") + it.str;
      }
      lastY = y;
    }
    if (cur) linhas.push(cur);
    return linhas.join("\n");
  }

  /* ---------- lê o PDF e devolve o texto ----------
     Só processa as primeiras páginas (o Quadro-Resumo fica sempre no começo),
     pra não travar em contratos gigantes (100+ páginas). */
  var MAX_PAGINAS = 15;
  function lerPDF(file) {
    return new Promise(function (resolve, reject) {
      if (!window.pdfjsLib) { reject(new Error("biblioteca de PDF não carregou")); return; }
      try { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "../../assets/lib/pdf.worker.min.js"; } catch (e) {}
      var fr = new FileReader();
      fr.onload = function () {
        var dados = new Uint8Array(fr.result);
        window.pdfjsLib.getDocument({ data: dados }).promise.then(function (pdf) {
          var partes = [], seq = Promise.resolve();
          var total = Math.min(pdf.numPages, MAX_PAGINAS);
          for (var p = 1; p <= total; p++) {
            (function (n) {
              seq = seq.then(function () {
                return pdf.getPage(n).then(function (page) {
                  return page.getTextContent().then(function (tc) {
                    partes.push(itensParaLinhas(tc.items));
                  });
                });
              });
            })(p);
          }
          seq.then(function () { resolve(partes.join("\n")); }).catch(reject);
        }).catch(reject);
      };
      fr.onerror = function () { reject(new Error("falha ao abrir o arquivo")); };
      fr.readAsArrayBuffer(file);
    });
  }

  /* Detecta PDF escaneado (imagem, sem texto) — nesse caso o pdf.js não lê nada */
  function pareceEscaneado(texto) {
    var util = String(texto || "")
      .replace(/GSign[^\n]*/gi, "")        // tira marca d'água do assinador
      .replace(/Digitalizado com CamScanner/gi, "")
      .replace(/\s+/g, " ").trim();
    return util.length < 120;
  }

  /* ---------- extrai os campos do texto ---------- */
  function extrair(texto) {
    var t = String(texto || "").replace(/\r/g, "");
    var d = {};

    /* NOME — primeiro "Nome:" do documento = comprador (proponente) */
    var nome = primeiro(/\bNome\s*:\s*([^\n]+)/i, t);
    nome = nome.replace(/\s*(Filia[çc][ãa]o|Profiss[ãa]o|Nacionalidade|CPF|Data de|RG|Social).*$/i, "").trim();
    if (!ehNaoInformado(nome)) d.nome = nome;

    /* NACIONALIDADE (GAV "Nacionalidade:" / WAM "Nacional.:") */
    var nac = primeiro(/Nacional(?:idade)?\.?\s*:\s*([^\n]+?)(?:\s{2,}|\s*(?:Profiss|Data|Identidade|CPF|Estado|Est\.|Nasc)\b|\s*$)/im, t);
    if (!ehNaoInformado(nac)) d.nacionalidade = nac;

    /* ESTADO CIVIL (GAV "Estado Civil:" / WAM "Est. Civil:") */
    d.estadoCivil = normalizarEstadoCivil(
      primeiro(/Est(?:ado)?\.?\s*Civil\s*:\s*([^\n]+?)(?:\s{2,}|Data|Regime|Reg\.|Prof|End|Nasc|$)/im, t)
    );

    /* RG / Identidade + órgão expedidor (GAV "Identidade:" / WAM "RG:" ou "CI-RG:") */
    var rgNum = primeiro(/Identidade\s*:?\s*([0-9Xx][0-9Xx.\-\/]{2,})\s*Org/i, t);
    var rgOrg = primeiro(/Org(?:[ãa]o)?\.?\s*(?:Exp\.?|Emissor)?\s*:?\s*([A-Za-zÀ-ú]{2,}\s*[-\/]?\s*[A-Za-zÀ-ú]{2})\b/i, t);
    if (!rgNum) {
      // GAV: "Carteira de identidade/órgão expedidor" com o número na linha seguinte
      var cid = t.match(/Carteira de identidade[^\n]*\n\s*([0-9][0-9.\-\/]*\s+[A-Za-zÀ-ú][A-Za-zÀ-ú\-\/ ]{1,})/i);
      if (cid) rgNum = norm(cid[1]);
    }
    if (!rgNum) {
      // WAM: "RG: 10541092650 - SSP/MG"  ou  "CI-RG: 10541092650"
      var mrg = t.match(/\b(?:CI[-\s]?RG|RG)\s*:?\s*([0-9Xx][0-9Xx.\-\/]{4,})\s*[-–]?\s*([A-Za-zÀ-ú]{2,}\/?[A-Za-zÀ-ú]{0,3})?/i);
      if (mrg) { rgNum = mrg[1]; if (mrg[2] && !rgOrg) rgOrg = mrg[2]; }
    }
    if (!ehNaoInformado(rgNum)) {
      var org = (!ehNaoInformado(rgOrg)) ? " " + rgOrg.replace(/\s*[-–]\s*/g, " ") : ""; // só o traço vira espaço; barra (SSP/MG) fica
      d.rg = norm(/[A-Za-z]/.test(rgNum) ? rgNum : rgNum + org);
    }

    /* CPF — primeiro do documento = comprador */
    var cpf = primeiro(/CPF(?:\/MF)?\s*:?\s*([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})\b/i, t);
    if (cpf) d.cpf = cpf.replace(/\D/g, "");

    /* EMPREENDIMENTO */
    var emp = primeiro(/EMPREENDIMENTO\s*:\s*([^\n(]+)/i, t);
    if (!emp) emp = primeiro(/empreendimento\s+denominad[oa]\s+["'”“]?([A-ZÀ-Ú][^\n"'”“]+?)["'”“]?(?:\s*\(|,|\n)/i, t);
    emp = emp.replace(/\s*\(.*$/, "").trim();
    if (emp) d.empreendimento = emp;

    /* TORRE / BLOCO */
    var bloco = primeiro(/Torre\s*:?\s*(BLOCO\s*[\w-]+|[\w-]+)(?=\s|$)/i, t);
    if (bloco && !/^andar$/i.test(bloco)) d.bloco = bloco;

    /* APARTAMENTO */
    var apto = primeiro(/Apartamento\s*:?\s*n?º?\.?\s*([0-9]{1,5}[A-Za-z]?)\b/i, t);
    if (apto) d.unidade = "Apartamento " + apto;

    /* COTA */
    var cota = primeiro(/Cota\s*(?:n[º°o]?\.?)?\s*:?\s*([0-9]{1,4})\b/i, t);
    if (cota) d.cota = "Cota " + cota;

    /* WAM: campo combinado "Bloco, Unidade Imobiliária e Cota adquirida: L , 401 , 03" */
    var comb = t.match(/Bloco,?\s*Unidade\s*Imobili[áa]ria\s*e\s*Cota\s*adquirida\s*:?\s*([^\n]+)/i);
    if (comb) {
      var pp = comb[1].split(/[\s,]+/).filter(Boolean);
      if (pp.length >= 3) {
        if (!d.bloco) d.bloco = pp[0];
        if (!d.unidade) d.unidade = "Apartamento " + pp[1];
        if (!d.cota) d.cota = "Cota " + pp[2];
      } else if (pp.length === 2) {
        if (!d.unidade) d.unidade = "Apartamento " + pp[0];
        if (!d.cota) d.cota = "Cota " + pp[1];
      }
    }

    /* CNPJ da empresa vendedora (primeiro do documento) */
    var cnpj = primeiro(/CNPJ[^0-9]{0,18}?([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})\b/i, t);
    if (cnpj) d.cnpj = cnpj.replace(/\D/g, "");

    /* EMPRESA vendedora — vários formatos possíveis */
    var padroes = [
      /Proponho\s*à\s*Empresa\s+([^\n,]{4,90}?)\s*,?\s*pessoa\s*jur[íi]dica/i,
      /à\s*Empresa\s+([^\n,]{4,90}?)\s*,?\s*pessoa\s*jur[íi]dica/i,
      /([A-ZÀ-Ú][A-Za-zÀ-ú0-9&.\/\- ]{4,90}?(?:SPE\s+LTDA|LTDA|S\/A|S\.?A\.?|EIRELI|ME))\s*,?\s*pessoa\s*jur[íi]dica/i,
      /VENDEDORA["'”’)\s,(]*(?:a\s*["'”“][^"'”“]*["'”“]\)\s*,?\s*)?([A-ZÀ-Ú][^\n,]{4,90}?)\s*,?\s*pessoa\s*jur[íi]dica/i
    ];
    var empresa = "";
    for (var i = 0; i < padroes.length && !empresa; i++) empresa = primeiro(padroes[i], t);
    empresa = empresa.replace(/^(Proponho\s+[aà]\s+Empresa\s+|[aà]\s+Empresa\s+|Empresa\s+|[aà]\s+["'”“][^"'”“]*["'”“]\)\s*,?\s*)/i, "").trim();
    if (empresa) d.empresa = empresa;

    /* LOCAL / ESTADO do empreendimento (melhor esforço) */
    var uf = primeiro(/Estado\s+d[eo]\s+([A-Za-zÀ-ú]{4,})/i, t);
    if (uf) d.local = uf.toUpperCase();

    /* CÔNJUGE — só preenche se houver nome de verdade */
    var cj = t.match(/C[ôo]njuge\s*:\s*([^\n]+)/i);
    if (cj) {
      var cjNome = norm(cj[1]).replace(/\s*(Data|Profiss|Nacionalidade|CPF|RG).*$/i, "").trim();
      if (!ehNaoInformado(cjNome)) {
        d.conjugeNome = cjNome;
        var apos = t.slice(cj.index, cj.index + 700);
        var ccpf = primeiro(/CPF(?:\/MF)?\s*:?\s*([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})\b/i, apos);
        if (ccpf) d.conjugeCpf = ccpf.replace(/\D/g, "");
        var crgNum = primeiro(/Identidade\s*:?\s*([0-9Xx][0-9Xx.\-\/]{2,})\s*Org/i, apos);
        var crgOrg = primeiro(/Org\.?\s*Exp\.?\s*:?\s*([A-Za-zÀ-ú]{2,}\s*[-\/]?\s*[A-Za-zÀ-ú]{2})\b/i, apos);
        if (!ehNaoInformado(crgNum)) d.conjugeRg = norm(crgNum + (!ehNaoInformado(crgOrg) ? " " + crgOrg.replace(/\s*[-\/]\s*/g, " ") : ""));
      }
    }

    return d;
  }

  window.LerContrato = { lerPDF: lerPDF, extrair: extrair, pareceEscaneado: pareceEscaneado };

  // Configura o worker do pdf.js assim que possível (funciona em file:// via fallback)
  if (window.pdfjsLib) {
    try { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "../../assets/lib/pdf.worker.min.js"; } catch (e) {}
  }
})();
