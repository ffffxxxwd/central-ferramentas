/* ============================================================
   Ler Contrato — extrai dados do PDF do contrato (GAV / WAM)
   ------------------------------------------------------------
   - Lê o TEXTO do PDF com pdf.js (offline, sem chave de API).
   - Reconhece rótulos dos 3 templates principais:
       · GAV (proposta ZapSign): "PROPONENTE COMPRADOR" + "DO PREÇO"
       · WAM (contrato GSign):    "QUADRO-RESUMO" + tabela ADQUIRENTE
       · GAV/D4Sign antigo:       "Quadro Resumo / Proponente Comprador"
   - Só funciona em PDF com TEXTO (contrato escaneado/imagem não).

   Retorna um objeto d com os campos:
     nome, nacionalidade, estadoCivil, rg, cpf, nascimento, profissao,
     telefone, email, empreendimento, cidade, bloco, unidade, andar, cota,
     fracao, precoCota, precoIntermediacao, precoTotal, formaPagamentoEntrada,
     dataAssinatura, empresa, cnpj, local,
     conjugeNome, conjugeCpf, conjugeRg, conjugeNasc

   Uso:
     LerContrato.lerPDF(file).then(t => LerContrato.extrair(t))
   ============================================================ */
(function () {
  "use strict";

  /* ---------- utilidades ---------- */
  function norm(s) {
    return (s == null ? "" : String(s)).replace(/ /g, " ").replace(/\s+/g, " ").trim();
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
    if (/uni[ãa]o\s+est/.test(s)) return "União Estável";
    if (/solteir/.test(s)) return "Solteiro(a)";
    if (/casad/.test(s)) return "Casado(a)";
    if (/divorc/.test(s)) return "Divorciado(a)";
    if (/vi[úu]v/.test(s)) return "Viúvo(a)";
    return "";
  }
  // "R$ 46.446,75" -> 46446.75 ; também aceita "46,446.75" (formato US às vezes
  // vem em pdftotext) e "R$ 500,00"
  function paraNumero(s) {
    if (!s) return null;
    var t = String(s).replace(/[R$\s]/g, "");
    // decide separador decimal pelo último separador que apareça
    var ultVirgula = t.lastIndexOf(",");
    var ultPonto = t.lastIndexOf(".");
    if (ultVirgula > ultPonto) {
      // pt-BR: "46.446,75" — pontos são milhar, vírgula é decimal
      t = t.replace(/\./g, "").replace(",", ".");
    } else if (ultPonto > ultVirgula) {
      // en-US: "46,446.75" — vírgulas são milhar, ponto é decimal
      t = t.replace(/,/g, "");
    }
    var n = parseFloat(t);
    return isFinite(n) ? n : null;
  }
  // "31/08/1994" -> "1994-08-31" ; "07 de setembro de 2026" -> "2026-09-07"
  function paraISO(s) {
    if (!s) return "";
    s = String(s).trim();
    var m = s.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})$/);
    if (m) {
      var a = m[3].length === 2 ? "20" + m[3] : m[3];
      return a + "-" + m[2].padStart(2, "0") + "-" + m[1].padStart(2, "0");
    }
    var meses = { jan: "01", fev: "02", mar: "03", abr: "04", mai: "05", jun: "06",
                  jul: "07", ago: "08", set: "09", out: "10", nov: "11", dez: "12" };
    var m2 = s.match(/(\d{1,2})\s*(?:de)?\s*([A-Za-zç]+)\s*(?:de)?\s*(\d{4})/i);
    if (m2) {
      var mes = m2[2].toLowerCase().slice(0, 3);
      if (meses[mes]) return m2[3] + "-" + meses[mes] + "-" + m2[1].padStart(2, "0");
    }
    return s;
  }
  // formata CPF só com dígitos
  function formatarCPF(s) {
    if (!s) return "";
    var d = String(s).replace(/\D/g, "");
    if (d.length !== 11) return String(s).trim();
    return d.slice(0, 3) + "." + d.slice(3, 6) + "." + d.slice(6, 9) + "-" + d.slice(9);
  }

  /* Extrai a 2ª coluna do quadro-resumo WAM (coluna do cônjuge anuente).
     Cada linha do quadro tem "Rótulo: valor_titular  <espaços grandes>  valor_conjuge".
     Achamos as linhas com 2+ espaços entre valores e pegamos o valor da direita. */
  function extrairColuna2WAM(t) {
    var out = {};
    // procura a região do quadro (do rótulo "Cônjuge anuente" até "OBJETO E EMPREENDIMENTO")
    var inicio = t.search(/DADOS\s+ADQUIRENTE.+?C[ôo]njuge\s+anuente/i);
    if (inicio === -1) inicio = t.search(/C[ôo]njuge\s+anuente/i);
    if (inicio === -1) return out;
    var fim = t.slice(inicio).search(/(?:OBJETO\s+E\s+EMPREENDIMENTO|2\.\s+OBJETO)/i);
    var bloco = fim === -1 ? t.slice(inicio, inicio + 2000) : t.slice(inicio, inicio + fim);

    function segCol(regex) {
      var m = bloco.match(regex);
      return m ? norm(m[2]) : "";
    }
    out.nome = segCol(/Nome\s*:\s*([^\n]+?)\s{2,}([A-ZÀ-Ú][A-ZÀ-Úa-zà-ú' ]+?)\s*\n/);
    out.cpf  = segCol(/CPF\s*:\s*([0-9.\-]+)\s{2,}([0-9.\-]{11,14})/);
    out.rg   = segCol(/RG\s*:\s*([A-Z0-9.\-\/ ]+?)\s{2,}([A-Z0-9.\-\/ ]+?)\s*(?:\n|Telefone)/);
    out.nasc = segCol(/Nasc\.?\s*:\s*(\d{1,2}\/\d{1,2}\/\d{2,4})\s{2,}(\d{1,2}\/\d{1,2}\/\d{2,4})/);
    // se a segunda coluna estiver vazia ou for igual à primeira, ignora
    if (out.nome && /^n[ãa]o/i.test(out.nome)) out.nome = "";
    return out;
  }

  // "Alagoas" -> "AL", "Bahia" -> "BA", já em sigla retorna igual
  function ufSigla(nome) {
    if (!nome) return "";
    // a sigla às vezes sai partida pelo pdf.js: "G O" -> "GO"
    var n = String(nome).trim();
    if (/^[A-Z]\s+[A-Z]$/.test(n)) n = n.replace(/\s+/g, "");
    if (/^[A-Z]{2}$/.test(n)) return n;
    var map = {
      acre: "AC", alagoas: "AL", amapa: "AP", amazonas: "AM", bahia: "BA",
      ceara: "CE", "distritofederal": "DF", "espiritosanto": "ES", goias: "GO",
      maranhao: "MA", "matogrosso": "MT", "matogrossodosul": "MS", minasgerais: "MG",
      para: "PA", paraiba: "PB", parana: "PR", pernambuco: "PE", piaui: "PI",
      "riodejaneiro": "RJ", "riograndedonorte": "RN", "riograndedosul": "RS",
      rondonia: "RO", roraima: "RR", "santacatarina": "SC", saopaulo: "SP",
      sergipe: "SE", tocantins: "TO"
    };
    var k = n.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "");
    return map[k] || n;
  }

  // formata "(71) 99168-2925" a partir de dígitos
  function normalizarTelefone(s) {
    if (!s) return "";
    var d = String(s).replace(/\D/g, "");
    if (d.length === 11) return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
    if (d.length === 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    return String(s).trim();
  }

  /* ---------- reconstrução de linhas a partir dos itens do pdf.js ---------- */
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
     Os dados do cliente ficam nas primeiras páginas, mas a DATA DE ASSINATURA
     de verdade está no certificado (D4Sign / ZapSign / GSign), que fica nas
     ÚLTIMAS. Por isso lemos as N primeiras E as M últimas — ler o contrato
     inteiro (55+ páginas de cláusulas padrão) só deixaria lento sem ganho. */
  var PAG_INICIO = 16;   // quadro-resumo, proposta, recibo de corretagem
  var PAG_FIM = 10;      // certificado de assinaturas e anexos finais

  function paginasQueImportam(total) {
    if (total <= PAG_INICIO + PAG_FIM) {
      var todas = [];
      for (var i = 1; i <= total; i++) todas.push(i);
      return todas;
    }
    var lista = [];
    for (var a = 1; a <= PAG_INICIO; a++) lista.push(a);
    for (var b = total - PAG_FIM + 1; b <= total; b++) lista.push(b);
    return lista;
  }

  function lerPDF(file) {
    return new Promise(function (resolve, reject) {
      if (!window.pdfjsLib) { reject(new Error("biblioteca de PDF não carregou")); return; }
      try { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "../../assets/lib/pdf.worker.min.js"; } catch (e) {}
      var fr = new FileReader();
      fr.onload = function () {
        var dados = new Uint8Array(fr.result);
        window.pdfjsLib.getDocument({ data: dados }).promise.then(function (pdf) {
          var partes = [], seq = Promise.resolve();
          var paginas = paginasQueImportam(pdf.numPages);
          paginas.forEach(function (n) {
            seq = seq.then(function () {
              return pdf.getPage(n).then(function (page) {
                return page.getTextContent().then(function (tc) {
                  partes.push(itensParaLinhas(tc.items));
                });
              });
            });
          });
          seq.then(function () { resolve(partes.join("\n")); }).catch(reject);
        }).catch(reject);
      };
      fr.onerror = function () { reject(new Error("falha ao abrir o arquivo")); };
      fr.readAsArrayBuffer(file);
    });
  }

  /* Detecta PDF escaneado (imagem, sem texto) */
  function pareceEscaneado(texto) {
    var util = String(texto || "")
      .replace(/GSign[^\n]*/gi, "")
      .replace(/ZapSign[^\n]*/gi, "")
      .replace(/D4Sign[^\n]*/gi, "")
      .replace(/Digitalizado com CamScanner/gi, "")
      .replace(/\s+/g, " ").trim();
    return util.length < 120;
  }

  /* ---------- detecta empresa (GAV / WAM) ---------- */
  function detectarEmpresa(t) {
    if (/\bWAM\s+COMERCIALIZA[ÇC][AÃ]O|NG20\s+EMPREENDIMENTOS|Wam\s+Hoteis/i.test(t)) return "WAM";
    if (/\bGAV\s+(?:BARRA|MARAGOGI|RESORTS|VACATION)|GAV\s+GEST[AÃ]O/i.test(t)) return "GAV";
    return "";
  }

  /* O pdf.js remonta o texto a partir de pedaços posicionados, e volta e meia
     parte um rótulo no meio: "Na cionalidade", "Primeiro Vencim ento". Isso
     quebrava as buscas por rótulo. Aqui a gente remenda os rótulos conhecidos
     aceitando UM espaço solto entre letras — que é o defeito que acontece. */
  var ROTULOS = [
    "Nacionalidade", "Profissão", "Identidade", "Nascimento", "Endereço",
    "Telefone", "Celular", "Vencimento", "Documento", "Empreendimento",
    "Apartamento", "Localização", "Pagamento", "Corretagem", "Comissão",
    "Intermediação", "Proponente", "Comprador", "Adquirente", "Bandeira",
    "Cidade", "Bairro", "Estado", "Município", "Residencial"
  ];
  function repararRotulos(t) {
    ROTULOS.forEach(function (p) {
      var re = new RegExp("\\b" + p.split("").join("\\s?"), "gi");
      t = t.replace(re, function (achado) {
        // só mexe no que está realmente quebrado — e mantém a caixa original,
        // senão "EMPREENDIMENTO" em caixa alta virava "Empreendimento" e
        // estragava a razão social copiada do documento
        if (achado.indexOf(" ") === -1) return achado;
        var limpo = achado.replace(/\s+/g, "");
        return limpo === limpo.toUpperCase() ? p.toUpperCase() : p;
      });
    });
    return t;
  }

  /* Alguns contratos (principalmente os da WAM) saem do pdf.js com espaço
     solto dentro dos números: "753.697.701 - 82", "(62) 98128 - 8877",
     "45.298.124/0001 - 33". Grudar separador entre dígitos conserta CPF,
     CNPJ, RG e telefone de uma vez só, sem risco pros outros campos. */
  function repararNumeros(t) {
    return t
      .replace(/(\d)\s*([-.\/])\s*(\d)/g, "$1$2$3")
      .replace(/(\d)\s*([-.\/])\s*(\d)/g, "$1$2$3");  // 2ª passada: "1 . 2 . 3"
  }

  /* "GUIGUSSILVA@HOT MAIL.COM" — o endereço vem partido no meio do domínio */
  function repararEmails(t) {
    return t.replace(/([A-Za-z0-9._%+\-]+)\s*@\s*([A-Za-z0-9.\- ]{3,40}\.[A-Za-z]{2,})/g,
      function (todo, usuario, dominio) {
        return usuario + "@" + dominio.replace(/\s+/g, "");
      });
  }

  /* ---------- extrai os campos do texto ---------- */
  function extrair(texto) {
    var t = repararEmails(repararNumeros(repararRotulos(String(texto || "").replace(/\r/g, ""))));
    var d = {};

    d.empresa = detectarEmpresa(t);

    /* NOME — primeiro "Nome:" (ou linha do quadro ADQUIRENTE) */
    var nome = primeiro(/\bNome\s*:?\s*([A-ZÀ-Ú][A-ZÀ-Ú\s]+?)(?=\s{2,}|\n|Filia|Profiss|Nacional|CPF|Data|RG|Identidade|Social|E-mail|$)/, t);
    if (!nome) nome = primeiro(/\bNome\s*:\s*([^\n]+)/i, t)
                          .replace(/\s*(Filia[çc][ãa]o|Profiss[ãa]o|Nacional|CPF|Data|RG|Social|E-mail).*$/i, "").trim();
    if (!ehNaoInformado(nome)) d.nome = nome;

    /* NACIONALIDADE */
    var nac = primeiro(/Nacional(?:idade)?\.?\s*:\s*([^\n]+?)(?:\s{2,}|\s*(?:Profiss|Data|Identidade|CPF|Estado|Est\.|Nasc)\b|\s*$)/im, t);
    if (!ehNaoInformado(nac)) d.nacionalidade = nac.toLowerCase();

    /* ESTADO CIVIL */
    d.estadoCivil = normalizarEstadoCivil(
      primeiro(/Est(?:ado)?\.?\s*Civil\s*:\s*([^\n]+?)(?:\s{2,}|Data|Regime|Reg\.|Prof|End|Nasc|$)/im, t)
    );

    /* DATA DE NASCIMENTO — "Nasc.: 25/07/1986" ou "Data Nascimento: 31/08/1994" ou "Data de Nascimento:" */
    var nasc = primeiro(/(?:Data\s+(?:de\s+)?Nascimento|Nasc\.?|Nascimento)\s*:\s*(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4})/i, t);
    if (nasc) d.nascimento = paraISO(nasc);

    /* PROFISSÃO — terminadores precisam ser palavras inteiras ou rótulo com ":" */
    // os terminadores aceitam sufixo (Nacional -> Nacionalidade:, Nasc -> Nascimento:),
    // senão "MILITAR Nacionalidade: brasileiro(a)" não era cortado no lugar certo
    var prof = primeiro(/Profiss[ãa]o\s*:\s*([^\n]+?)(?:\s{2,}|\s+(?:Data|CPF|RG|Identidade|Nacional|Estado|Nasc|E-mail|Endere[çc]o|End)\w*\.?\s*:)/i, t);
    if (!prof) prof = primeiro(/Profiss[ãa]o\s*:\s*([^\n]+?)(?:\s{2,}|$)/i, t);
    if (!ehNaoInformado(prof)) d.profissao = prof;

    /* TELEFONE / CELULAR */
    var tel = primeiro(/(?:Tel(?:efone)?|Cel\.?|Celular|Contato)\s*(?:com\.|res\.)?\s*:?\s*(?:\+?\d{1,3}\s*)?(\(?\d{2}\)?\s*\d{4,5}[\s-]?\d{4})/i, t);
    if (tel) d.telefone = normalizarTelefone(tel);

    /* ENDEREÇO DO CLIENTE — vem espalhado em rótulos separados:
       "Endereço Residencial: Rua X, 101, Apto 203 | Bairro: Y | Cidade: Z |
        UF: RS | CEP: 90640050". Junta tudo numa linha só.

       IMPORTANTE: a busca é feita numa JANELA logo depois do rótulo de
       endereço do cliente, nunca no documento inteiro. O contrato descreve
       o endereço do EMPREENDIMENTO em vários pontos ("Bairro Mato Queimado,
       Gramado"), e procurar "Bairro:" solto trazia o endereço do resort no
       lugar do endereço de quem comprou. */
    var iEnd = t.search(/Endere[çc]o(?:\s+Residencial)?\s*:/i);
    if (iEnd > -1) {
      var janela = t.slice(iEnd, iEnd + 420);

      var rua = primeiro(/Endere[çc]o(?:\s+Residencial)?\s*:\s*([^\n]+?)(?:\s{2,}|\s*(?:Bairro|Cidade|Munic[íi]pio|UF|CEP|Tel)\s*:|$)/i, janela);
      // rótulos de formulário em branco ("Endereço do 01º comprador") não contam
      if (/^(?:n[ãa]o\s+informad|endere[çc]o\s+d)/i.test(rua)) rua = "";

      var bairro = primeiro(/\bBairro\s*:\s*([^\n]+?)(?:\s{2,}|\s*(?:Cidade|Munic[íi]pio|UF|CEP|Tel)\s*:|$)/i, janela);
      if (/^(?:bairro\s+d|n[ãa]o\s+informad)/i.test(bairro)) bairro = "";

      var cidadeCli = primeiro(/(?:Cidade|Munic[íi]pio)\s*:\s*([^\n]+?)(?:\s{2,}|\s*(?:UF|CEP|Estado|Tel)\s*:|$)/i, janela);
      if (/^(?:cidade\s+d|munic[íi]pio\s+d|n[ãa]o\s+informad)/i.test(cidadeCli)) cidadeCli = "";

      var ufCli = primeiro(/\bUF\s*:\s*([A-Z]{2})\b/, janela);
      if (/^(?:UF\s+d)/i.test(ufCli)) ufCli = "";

      // alguns layouts emendam tudo numa linha só:
      // "Rua X, 39, CENTRO Cidade: Tunas do Paraná, PR" — corta o rótulo
      // de dentro da rua/bairro e aproveita o que vinha depois dele
      var vazou = (bairro || rua).match(/^([\s\S]*?)\s*(?:Cidade|Munic[íi]pio)\s*:\s*([^,\n]+?)\s*,\s*([A-Z]{2})\b/i);
      if (vazou) {
        if (bairro) bairro = vazou[1].trim(); else rua = vazou[1].trim();
        if (!cidadeCli) cidadeCli = vazou[2].trim();
        if (!ufCli) ufCli = vazou[3];
      }

      var cep = primeiro(/\bCEP\s*:?\s*(\d{5}-?\d{3})\b/i, janela);
      if (cep && cep.indexOf("-") === -1) cep = cep.slice(0, 5) + "-" + cep.slice(5);

      var partesEnd = [
        rua, bairro,
        [cidadeCli, ufCli].filter(Boolean).join("/"),
        cep ? "CEP " + cep : ""
      ].filter(Boolean);
      // sem rua o resto não identifica ninguém ("UF/MG, CEP 75690-000" é lixo)
      if (rua && partesEnd.length >= 2) d.endereco = partesEnd.join(", ");
    }

    /* E-MAIL */
    var email = primeiro(/([A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,})/, t);
    if (email && !/wam|gav|ng20\.com|palmerston/i.test(email)) d.email = email.toLowerCase();

    /* RG */
    var rgNum = primeiro(/Identidade\s*:?\s*([0-9Xx][0-9Xx.\-\/]{2,})\s*Org/i, t);
    var rgOrg = primeiro(/Org(?:[ãa]o)?\.?\s*(?:Exp\.?|Emissor)?\s*:?\s*([A-Za-zÀ-ú]{2,}\s*[-\/]?\s*[A-Za-zÀ-ú]{2})\b/i, t);
    // "Identidade: 5750188 Órgão expedidor:" — sem valor depois, o próprio rótulo
    // vinha parar no campo; aqui ele é descartado
    if (/^(?:[óo]rg[ãa]o|expedidor|emissor)/i.test(rgOrg)) rgOrg = "";
    if (!rgNum) {
      // GAV proposta: "Identidade: 1313086967   Org Exp: SSP - BA"
      var mgav = t.match(/Identidade:?\s*(\d{4,})\s+Org\s+Exp:?\s*([A-Z]{2,4})\s*[-–]\s*([A-Z]{2})/i);
      if (mgav) { rgNum = mgav[1]; rgOrg = mgav[2] + "/" + mgav[3]; }
    }
    if (!rgNum) {
      // GAV: "Carteira de identidade" com número na linha seguinte
      var cid = t.match(/Carteira de identidade[^\n]*\n\s*([0-9][0-9.\-\/]*\s+[A-Za-zÀ-ú][A-Za-zÀ-ú\-\/ ]{1,})/i);
      if (cid) rgNum = norm(cid[1]);
    }
    if (!rgNum) {
      // WAM: "RG: MG24083029 - SSP/MG" ou "RG: 10541092650 - SSP/MG"
      // CI/órgão expedidor: 1313086967 SSP BA
      var mrg = t.match(/\b(?:CI[-\s]?RG|CI\/[óo]rg[ãa]o\s+expedidor|RG)\s*:?\s*([A-Z0-9Xx][A-Z0-9Xx.\-\/]{4,})\s*[-–]?\s*([A-Za-zÀ-ú]{2,}\/?[A-Za-zÀ-ú]{0,3})?/i);
      if (mrg) { rgNum = mrg[1]; if (mrg[2] && !rgOrg) rgOrg = mrg[2]; }
    }
    if (!ehNaoInformado(rgNum)) {
      // formato das fichas: "6084313763 SSPDI/RS" (sem traço separando o órgão)
      var org = (!ehNaoInformado(rgOrg)) ? " " + rgOrg.replace(/\s*[-–]\s*/g, "/").replace(/\s+/g, "") : "";
      d.rg = norm(/[A-Za-z]/.test(rgNum) ? rgNum : rgNum + org);
    }

    /* CPF */
    var cpf = primeiro(/CPF(?:\/MF)?\s*:?\s*([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})\b/i, t);
    if (cpf) {
      var soDig = cpf.replace(/\D/g, "");
      d.cpf = soDig.slice(0, 3) + "." + soDig.slice(3, 6) + "." + soDig.slice(6, 9) + "-" + soDig.slice(9);
    }

    /* EMPREENDIMENTO */
    var emp = primeiro(/EMPREENDIMENTO\s*:\s*([^\n(]+)/i, t);
    if (!emp) emp = primeiro(/empreendimento\s+denominad[oa]\s+["'”“]?([A-ZÀ-Ú][^\n"'”“]+?)["'”“]?(?:\s*\(|,|\n)/i, t);
    emp = emp.replace(/\s*\(.*$/, "").trim()
      // "Encontro d as Águas" — o pdf.js parte os artigos; remenda das/dos/da/do/de
      .replace(/\bd\s+(as|os|a|o|e)\b/gi, "d$1")
      .replace(/\s{2,}/g, " ");
    if (emp) d.empreendimento = emp;

    /* CIDADE / UF do empreendimento — várias estratégias, do mais confiável ao menos.
       Ordem importante: precisa ignorar o endereço da vendedora, que fica primeiro no
       documento. Priorizamos texto próximo à palavra "empreendimento" ou "Comarca". */
    var cid = "";
    // 1) WAM Praias do Lago: "empreendimento situado no ... município de X, Estado de Y"
    var mMun = t.match(/(?:situado|localizad[oa])[^\n]*?munic[íi]pio\s+de\s+([A-ZÀ-Ú][A-Za-zà-ú ]+?)(?:,\s*(?:no\s+)?Estado\s+d[eo]\s+([A-Za-zà-ú]+))?/i);
    if (mMun) {
      cid = mMun[1].trim();
      if (mMun[2]) cid += "/" + ufSigla(mMun[2]);
    }
    // 2) "Comarca de X - Estado" (do registro de matrícula do empreendimento — confiável)
    if (!cid) {
      var mCom = t.match(/Comarca\s+de\s+([A-ZÀ-Ú][A-Za-zà-ú ]+?)\s*[-–,]\s*([A-Za-zà-ú]{2,20})/);
      if (mCom) cid = mCom[1].trim() + "/" + ufSigla(mCom[2]);
    }
    // 3) WAM Ondas Praia: "Empreendimento: ..., CEP nº X, CIDADE, ESTADO,"
    if (!cid) {
      var mEmpCEP = t.match(/Empreendimento[^\n]*?CEP\s*n?º?\.?\s*[\d.\-]+\s*,\s*([A-ZÀ-Ú][A-Za-zà-ú ]{2,40}?)\s*,\s*([A-Za-zà-ú]{2,20})\s*[,\.]/);
      if (mEmpCEP) cid = mEmpCEP[1].trim() + "/" + ufSigla(mEmpCEP[2]);
    }
    // 4) GAV: "Localização: ..., Cidade/UF, CEP:" — precisa vir DEPOIS de "AREYA BARRA RESORT:" ou "Empreendimento:"
    if (!cid) {
      var mCEP = t.match(/(?:RESORT|Empreendimento)[^\n]{0,300}?([A-ZÀ-Ú][A-Za-zà-ú ]{2,50})\s*[\/\-–]\s*([A-Z]{2})\s*,\s*CEP/);
      if (mCEP) cid = mCEP[1].trim() + "/" + mCEP[2];
    }
    // 5) rodapé — "Cidade - UF, DD de mês de AAAA" (menos confiável, pode ser local de assinatura)
    if (!cid) {
      var mRod = t.match(/([A-ZÀ-Ú][^,\n]{2,60}?)\s*,\s*\d{1,2}\s+de\s+[A-Za-zç]+\s+de\s+\d{4}/);
      if (mRod) {
        var linha = mRod[1].trim();
        // a UF pode vir partida ("Caldas Novas - G O"), por isso aceita espaço
        var mSplit = linha.match(/^(.+?)\s*[-–\/]\s*([A-ZÀ-Úa-zà-ú][A-ZÀ-Úa-zà-ú\s]{1,20})$/);
        cid = mSplit ? mSplit[1].trim() + "/" + ufSigla(mSplit[2].trim()) : linha;
      }
    }
    if (cid) d.cidade = cid;

    /* TORRE / BLOCO */
    var bloco = primeiro(/Torre\s*:?\s*(BLOCO\s*[\w-]+|[\w-]+)(?=\s|$)/i, t);
    if (bloco && !/^andar$/i.test(bloco)) d.bloco = bloco.replace(/^BLOCO\s+/i, "");

    /* ANDAR — só quando tem ":" (evita casar "Andar 30" de endereço da vendedora) */
    var andar = primeiro(/\bAndar\s*:\s*(\d{1,2}|t[ée]rreo|T)\b/i, t);
    if (andar) d.andar = andar;

    /* APARTAMENTO / UNIDADE — cuidado: o endereço RESIDENCIAL do comprador vem
       antes no documento e costuma trazer "Apto 203". A unidade do contrato é
       escrita por extenso ("Apartamento: 439" / "Apartamento nº 439"), então a
       palavra inteira tem prioridade e "Apto" só entra se não houver outra. */
    var apto = primeiro(/\bApartamento\s*:?\s*n?[º°]?\.?\s*([0-9]{1,5}[A-Za-z]?)\b/i, t) ||
               primeiro(/\bUnidade\s+Aut[ôo]noma\s*(?:n[º°]?\.?)?\s*:?\s*([0-9]{1,5}[A-Za-z]?)\b/i, t) ||
               primeiro(/\bApto\.?\s*:?\s*n?[º°]?\.?\s*([0-9]{1,5}[A-Za-z]?)\b/i, t);
    if (apto) d.unidade = apto;

    /* COTA */
    var cota = primeiro(/Cota\s*(?:n[º°o]?\.?)?\s*:?\s*([0-9]{1,4}[A-Za-z]?)\b/i, t);
    if (cota) d.cota = cota;

    /* WAM/pousada: linha solta "Bloco CAA , 106 , Cota 10C" */
    var mBUC = t.match(/\bBloco\s+([A-Za-z0-9-]{1,6})\s*,\s*([0-9]{1,5}[A-Za-z]?)\s*,\s*Cota\s+([0-9A-Za-z]{1,5})/i);
    if (mBUC) {
      if (!d.bloco) d.bloco = mBUC[1];
      if (!d.unidade) d.unidade = mBUC[2];
      if (!d.cota) d.cota = mBUC[3];
    }

    /* WAM: campo combinado "Bloco, Unidade Imobiliária e Cota adquirida: L , 401 , 03" */
    var comb = t.match(/Bloco,?\s*Unidade\s*Imobili[áa]ria\s*e\s*Cota\s*adquirida\s*:?\s*([^\n]+)/i);
    if (comb) {
      var pp = comb[1].split(/[\s,]+/).filter(Boolean);
      if (pp.length >= 3) {
        if (!d.bloco) d.bloco = pp[0];
        if (!d.unidade) d.unidade = pp[1];
        if (!d.cota) d.cota = pp[2];
      } else if (pp.length === 2) {
        if (!d.unidade) d.unidade = pp[0];
        if (!d.cota) d.cota = pp[1];
      }
    }

    /* FRAÇÃO / SEMANAS DE USO */
    var sem = primeiro(/(?:Semanas?\s+de\s+uso|PER[ÍI]ODO\s+DE\s+UTILIZA[ÇC][ÃA]O)\s*:?\s*(\d+)\s*semana/i, t);
    if (sem) d.semanas = parseInt(sem, 10);
    d.fracao = "1/52"; // padrão nas fichas existentes

    /* PREÇOS */
    // Preço da cota / Preço total / VALOR TOTAL DA VENDA
    var jaEhTotal = false;
    var pCota = primeiro(/Pre[çc]o\s+da\s+Cota\s*\(?[^)]*\)?\s*:?\s*R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})/i, t);
    if (!pCota) {
      // "VALOR TOTAL DA VENDA" já é o total do contrato: não soma corretagem em cima
      pCota = primeiro(/VALOR\s+TOTAL\s+DA\s+VENDA\s*:?\s*R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})/i, t);
      if (pCota) jaEhTotal = true;
    }
    // "Preço total Cota de Direito de Uso (CDU) sem a parcela de intermediação
    //  (corretagem) : R$\n13.588,00" — rótulo longo e o valor na linha de baixo
    if (!pCota) { pCota = primeiro(/Pre[çc]o\s+total[\s\S]{0,140}?R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})/i, t); if (pCota) jaEhTotal = true; }
    if (!pCota) pCota = primeiro(/\(i\.1\)\s*R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})/i, t);
    if (pCota) d.precoCota = paraNumero(pCota);

    // Intermediação / Corretagem
    var pInt = primeiro(/(?:Valor\s+dos\s+Servi[çc]os\s+de\s+Intermedia[çc][ãa]o|Comiss[ãa]o\s+de\s+Corretagem)\s*:?\s*R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})/i, t);
    if (pInt) d.precoIntermediacao = paraNumero(pInt);

    // Total do contrato
    if (jaEhTotal) d.precoTotal = d.precoCota;
    else if (d.precoCota && d.precoIntermediacao) d.precoTotal = d.precoCota + d.precoIntermediacao;
    else if (d.precoCota) d.precoTotal = d.precoCota;

    /* FORMA DE PAGAMENTO — intermediação (linha única) + preço (tabela de parcelas) */
    var fpInt = primeiro(/Forma\s+de\s+Pagamento\s+dos\s+Servi[çc]os\s+de\s+Intermedia[çc][ãa]o\s*:?\s*([^\n]+)/i, t);
    // limpa o rótulo genérico que às vezes vem colado
    if (fpInt) fpInt = fpInt.replace(/\s*(?:Reajuste|A\s+parte|Parcelas\s+Periodicidade).*/i, "").trim();

    // PARCELAS DO PREÇO — WAM traz uma tabela: "4 Mensal 10/09/2026 R$ 50,00 Boleto"
    // Cada linha: qtd, periodicidade, 1º venc, valor, forma
    var parcelas = [];
    // tabela do preço da cota
    var mTab = t.match(/Forma\s+de\s+Pagamento\s+do\s+Pre[çc]o\s+da\s+Cota\s*:?([\s\S]*?)(?=Reajuste:|Caso,|A\s+parte\s+ADQUIRENTE|Servi[çc]os\s+de\s+Intermedia)/i);
    if (mTab) {
      var linhas = mTab[1].split(/\n/);
      linhas.forEach(function (ln) {
        var m = ln.match(/^\s*(\d{1,3})\s+(Mensal|Anual|[\wçã]+)\s+(\d{1,2}\/\d{1,2}\/\d{2,4})\s+R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})\s+([A-Za-zç]+)/);
        if (m) {
          parcelas.push({
            tipo: "Preço",
            qtd: parseInt(m[1], 10),
            valor: paraNumero(m[4]),
            forma: m[5].trim(),
            vencimento: paraISO(m[3])
          });
        }
      });
    }
    // parcelas de intermediação vêm em texto: "1 x 750,00 CARTÃO DE DÉBITO / 11 x 491,81 CREDITO RECORRENTE"
    if (fpInt) {
      var partesInt = fpInt.split(/\s*\/\s*/);
      partesInt.forEach(function (parte) {
        var mp = parte.match(/(\d{1,3})\s*x\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})\s+(.+)/i);
        if (mp) {
          parcelas.push({
            tipo: "Intermediação",
            qtd: parseInt(mp[1], 10),
            valor: paraNumero(mp[2]),
            forma: mp[3].trim(),
            vencimento: ""
          });
        }
      });
    }

    // GAV: tabela do RECIBO DE COMISSÃO DE CORRETAGEM
    var mGavRec = t.match(/RECIBO\s+DA\s+COMISS[ÃA]O\s+DE\s+CORRETAGEM[\s\S]*?Primeiro\s+Vencimento([\s\S]*?)(?=DESCRI[ÇC][ÃA]O|NOTA\s+EXPLICATIVA)/i);
    if (mGavRec) {
      // Uma linha da tabela pode ocupar VÁRIAS linhas do texto, porque o código
      // do PIX é longo e o pdf.js o parte em pedaços:
      //   "01 R$ 1,330.00 -- PIX\nRESV112 6330094\n8454250IM4UBCX\n726865B\n-- R$ 1,330.00 13/09/2025"
      // Então a varredura é no bloco inteiro, deixando o miolo atravessar quebras.
      //   grupos: qtd, valor unit., forma, miolo (nº doc + bandeira), total, 1º venc.
      var reLinha = new RegExp(
        "(\\d{1,3})\\s+R\\$\\s*(\\d{1,3}(?:[.,]\\d{3})*[.,]\\d{2})\\s+\\S+\\s+" +
        "(PIX|Boleto|Cart[ãa]o|D[éeE]bito|TED|Dep[óoO]sito|Transfer[eê]ncia)" +
        "([\\s\\S]{0,160}?)R\\$\\s*(\\d{1,3}(?:[.,]\\d{3})*[.,]\\d{2})\\s+(\\d{1,2}/\\d{1,2}/\\d{2,4})", "gi");
      var m;
      while ((m = reLinha.exec(mGavRec[1])) !== null) {
        var miolo = norm(m[4] || "").replace(/(^|\s)--(\s|$)/g, " ").trim();
        // bandeira/operação: "MASTER/CreditoAVista", "VISA ELECTRON/Debito"
        var bandeira = (miolo.match(/\b(VISA(?:\s+ELECTRON)?|MASTER(?:CARD)?|ELO|AMEX|HIPER\w*)\b\s*\/?\s*(Cr[ée]dito\w*|D[ée]bito\w*)?/i) || [])[0] || "";
        // nº do documento: código longo do PIX ou NSU/CV do cartão
        var doc = (miolo.match(/\b[A-Z0-9]{8,}\b/) || [])[0] || "";
        var forma = m[3].trim();
        // "Cartão" sozinho não diz crédito ou débito — a bandeira diz. Junta os dois,
        // senão o distrato sai falando "crédito" num pagamento que foi no débito.
        if (/cart[ãa]o/i.test(forma) && /d[ée]bito/i.test(bandeira)) forma = "Cartão de Débito";
        else if (/cart[ãa]o/i.test(forma) && /cr[ée]dito/i.test(bandeira)) forma = "Cartão de Crédito";
        parcelas.push({
          tipo: "Intermediação",
          qtd: parseInt(m[1], 10),
          valor: paraNumero(m[2]),
          forma: forma,
          vencimento: paraISO(m[6]),
          doc: doc,
          bandeira: bandeira,
          total: paraNumero(m[5])
        });
      }
    }

    if (parcelas.length) d.parcelas = parcelas;

    // texto humano da forma de pagamento (o campo formaPagamentoEntrada da ficha)
    // Formato: "PIX R$ 1.330,00 (Nº Doc ABC123, 13/09/2025) + Boleto 2x R$ 1.330,00
    //           = R$ 2.660,00 (1º venc 05/10/2025)"
    function moedaBR(n) {
      if (n === null || n === undefined) return "?";
      return "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function dataBRde(iso) {
      var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
      return m ? m[3] + "/" + m[2] + "/" + m[1] : "";
    }
    function descreverParcela(p) {
      var base = (p.forma || "Pagamento");
      // 1 parcela: "PIX R$ 1.330,00"; várias: "Boleto 2x R$ 1.330,00 = R$ 2.660,00"
      base += p.qtd > 1
        ? " " + p.qtd + "x " + moedaBR(p.valor) + " = " + moedaBR(p.total != null ? p.total : p.qtd * p.valor)
        : " " + moedaBR(p.valor);
      var detalhe = [];
      if (p.doc) detalhe.push("Nº Doc " + p.doc);
      if (p.bandeira && !/^cart/i.test(p.forma)) detalhe.push(p.bandeira);
      else if (p.bandeira) detalhe.push(p.bandeira);
      var dv = dataBRde(p.vencimento);
      if (dv) detalhe.push((p.qtd > 1 ? "1º venc " : "") + dv);
      return base + (detalhe.length ? " (" + detalhe.join(", ") + ")" : "");
    }

    if (fpInt || parcelas.length) {
      var parcInt = parcelas.filter(function (p) { return p.tipo === "Intermediação"; });
      var parcPreco = parcelas.filter(function (p) { return p.tipo === "Preço"; });
      var fp = [];
      if (parcInt.length) {
        fp.push(parcInt.map(descreverParcela).join(" + "));
      } else if (fpInt) {
        fp.push("Intermediação: " + fpInt);
      }
      if (parcPreco.length) {
        fp.push("Preço da cota: " + parcPreco.map(descreverParcela).join(" + "));
      }
      d.formaPagamentoEntrada = fp.join(" | ");
    }

    /* Último recurso: alguns contratos descrevem o pagamento em texto corrido
       ("Forma de pagamento: I. 3 parcelas mensais de fidelização..."), sem
       tabela nenhuma. Melhor trazer o trecho cru pra conferência do que deixar
       o campo vazio — é o tipo de coisa que passa batido e vira erro no valor. */
    if (!d.formaPagamentoEntrada) {
      var bruto = primeiro(/Forma\s+de\s+pagamento\s*:?\s*([\s\S]{20,500}?)(?=\n\s*[A-Z]\.\d|\n\s*Reajuste|\n\s*Cl[áa]usula|$)/i, t);
      if (bruto) d.formaPagamentoEntrada = norm(bruto).slice(0, 400);
    }

    /* DATA DE ASSINATURA ----------------------------------------------
       A data do corpo do contrato ("IPOJUCA - PE, 13 de setembro de 2025")
       é a data de EMISSÃO, que nem sempre bate com a da assinatura — e é
       a da assinatura que faz o prazo de 7 dias correr. Então a ordem é:
         1) certificado D4Sign: "DATE_ATOM: 2025-09-13T14:47:35-03:00"
         2) certificado ZapSign/GSign: "Assinado em 13/09/2025"
         3) data por extenso no rodapé do contrato (último recurso)
       Entre várias assinaturas vale a ÚLTIMA — o contrato só fica fechado
       quando todo mundo assinou.                                        */
    var assinaturas = [];
    var reAtom = /DATE_ATOM:\s*(\d{4})-(\d{2})-(\d{2})T/gi, mAtom;
    while ((mAtom = reAtom.exec(t)) !== null) {
      assinaturas.push(mAtom[1] + "-" + mAtom[2] + "-" + mAtom[3]);
    }
    if (!assinaturas.length) {
      var reAss = /Assin(?:ou|ado|atura)[^\n]{0,60}?(\d{1,2}\/\d{1,2}\/\d{4})/gi, mAss;
      while ((mAss = reAss.exec(t)) !== null) assinaturas.push(paraISO(mAss[1]));
    }
    if (assinaturas.length) {
      assinaturas.sort();
      d.dataAssinatura = assinaturas[assinaturas.length - 1];
      d.origemDataAssinatura = "certificado";
    } else {
      var dataAss = primeiro(/(?:[A-ZÀ-Ú][A-Za-zà-ú ]+(?:\s*[-–]\s*[A-Za-z]{2,})?)\s*,\s*(\d{1,2}\s+de\s+[A-Za-zç]+\s+de\s+\d{4})/, t);
      if (dataAss) { d.dataAssinatura = paraISO(dataAss); d.origemDataAssinatura = "corpo do contrato"; }
    }

    /* Nº DA PROPOSTA / VENDA — ajuda a casar a ficha com o PDF */
    // os parênteses vêm com espaço dentro: "AREYA BARRA RESORT ( 287265 )"
    var prop = primeiro(/EMPREENDIMENTO[^\n(]{0,120}\(\s*(\d{5,8})\s*\)/i, t) ||
               primeiro(/Proposta\s*:?\s*n?[º°o]?\.?\s*(\d{5,8})\b/i, t) ||
               primeiro(/Venda\s*:?\s*(\d{4,8})\s+Dt\.?\s*Venda/i, t);
    if (prop) d.proposta = prop;

    /* CNPJ da empresa vendedora (primeiro do documento).
       Vem quebrado em duas linhas e com espaço antes do traço do dígito:
       "CNPJ sob o n.º\n45.298.124/0001 - 33" — por isso os \s* no meio. */
    var cnpj = primeiro(
      /CNPJ[^0-9]{0,24}?([0-9]{2}\s*\.?\s*[0-9]{3}\s*\.?\s*[0-9]{3}\s*\/?\s*[0-9]{4}\s*-?\s*[0-9]{2})(?!\d)/i, t);
    if (cnpj) {
      var cd = cnpj.replace(/\D/g, "");
      if (cd.length === 14) {
        d.cnpj = cd.slice(0, 2) + "." + cd.slice(2, 5) + "." + cd.slice(5, 8) + "/" + cd.slice(8, 12) + "-" + cd.slice(12);
      }
    }

    /* EMPRESA vendedora (razão social) */
    var padroes = [
      /Proponho\s*à\s*Empresa\s+([^\n,]{4,90}?)\s*,?\s*pessoa\s*jur[íi]dica/i,
      /VENDEDORA\s*\([^)]*\)?,?\s*([A-ZÀ-Ú][^\n,]{4,90}?)\s*[.,]?\s*Pessoa\s*Jur[íi]dica/i,
      /à\s*Empresa\s+([^\n,]{4,90}?)\s*,?\s*pessoa\s*jur[íi]dica/i,
      /([A-ZÀ-Ú][A-Za-zÀ-ú0-9&.\/\- ]{4,90}?(?:SPE\s+LTDA|LTDA|S\/A|S\.?A\.?|EIRELI|ME))\s*[.,]?\s*(?:Pessoa|pessoa)\s*(?:Jur|jur)/i
    ];
    var empresaVend = "";
    for (var i = 0; i < padroes.length && !empresaVend; i++) empresaVend = primeiro(padroes[i], t);
    empresaVend = empresaVend.replace(/^(Proponho\s+[aà]\s+Empresa\s+|[aà]\s+Empresa\s+|Empresa\s+|[aà]\s+["'”“][^"'”“]*["'”“]\)\s*,?\s*)/i, "").trim();
    // o PDF deixa um ponto solto no fim ("... SPE LTDA ."): junta ao LTDA
    empresaVend = empresaVend.replace(/\s+\.\s*$/, ".").replace(/\s{2,}/g, " ").trim();
    if (empresaVend) d.razaoSocial = empresaVend;

    /* LOCAL / ESTADO do empreendimento */
    var uf = primeiro(/Estado\s+d[eo]\s+([A-Za-zÀ-ú]{4,})/i, t);
    if (uf) d.local = uf.toUpperCase();
    // sem cidade identificada, pelo menos a sigla do estado entra na ficha
    if (!d.cidade && uf) d.cidade = ufSigla(uf);

    /* CÔNJUGE — 2 caminhos:
       (a) WAM: quadro-resumo com 2 colunas (ADQUIRENTE | Cônjuge anuente).
           As linhas do quadro têm "Rótulo: valor_titular  <espaços>  valor_conjuge"
       (b) GAV/outros: seção "Cônjuge:" seguida de dados na sequência           */
    var conjLinhas = extrairColuna2WAM(t);
    if (conjLinhas.nome) {
      d.conjugeNome = conjLinhas.nome;
      if (conjLinhas.cpf) d.conjugeCpf = formatarCPF(conjLinhas.cpf);
      if (conjLinhas.rg) d.conjugeRg = conjLinhas.rg;
      if (conjLinhas.nasc) d.conjugeNasc = paraISO(conjLinhas.nasc);
    } else {
      var cj = t.match(/C[ôo]njuge\s*:?\s*([^\n]+)/i);
      if (cj) {
        var cjNome = norm(cj[1]).replace(/\s*(Data|Profiss|Nacional|CPF|RG|Estado|Filia|Nasc).*$/i, "").trim();
        if (!ehNaoInformado(cjNome) && !/^[a-z]/.test(cjNome) && cjNome.length > 3) {
          d.conjugeNome = cjNome;
          var apos = t.slice(cj.index + cj[0].length, cj.index + 900);
          var ccpf = primeiro(/CPF(?:\/MF)?\s*:?\s*([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})\b/i, apos);
          if (ccpf) d.conjugeCpf = formatarCPF(ccpf);
          var crgNum = primeiro(/(?:Identidade|RG|CI[-\s]?RG)\s*:?\s*([A-Z0-9Xx][A-Z0-9Xx.\-\/]{2,})/i, apos);
          if (crgNum) d.conjugeRg = norm(crgNum);
          var cnasc = primeiro(/(?:Data\s+(?:de\s+)?Nascimento|Nasc\.?)\s*:\s*(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4})/i, apos);
          if (cnasc) d.conjugeNasc = paraISO(cnasc);
        }
      }
    }

    /* VALOR PAGO (sugestão) --------------------------------------------
       Regra do projeto, aplicada sobre as parcelas encontradas:
         · cartão (crédito OU débito) → entra o valor cheio
         · PIX / TED / depósito / transferência → entra o que passou
         · boleto → NÃO entra: só conta o que já foi quitado, e o contrato
           não diz o que o cliente pagou. Esse ajuste é do humano.
       Por isso é "sugerido": o valor final sempre passa pela conferência. */
    var pagoSugerido = 0, temBoleto = false, instrumentos = [];
    (d.parcelas || []).forEach(function (p) {
      var f = String(p.forma || "").toLowerCase()
        .normalize("NFD").replace(/[̀-ͯ]/g, "");
      var total = (p.qtd || 1) * (p.valor || 0);
      if (/boleto/.test(f)) { temBoleto = true; instrumentos.push("boleto"); return; }
      if (/cartao|credito|debito|visa|master|elo|amex|hiper|rede/.test(f)) {
        pagoSugerido += total; instrumentos.push("cartao");
      } else if (/pix|ted|doc|deposito|transfer/.test(f)) {
        pagoSugerido += total; instrumentos.push(/pix/.test(f) ? "pix" : "transferencia");
      }
    });
    if (pagoSugerido > 0) d.valorPagoSugerido = Math.round(pagoSugerido * 100) / 100;
    d.temBoletoNaoQuitado = temBoleto;

    /* FORMA DO REEMBOLSO — decide o instrumento PRINCIPAL (o primeiro).
       Cartão de débito É cartão: vira estorno, não reembolso.
       Débito em conta / boleto / PIX / TED → reembolso por transferência. */
    var principal = instrumentos[0] || "";
    if (principal === "cartao") d.formaReembolso = "Estorno Cartão";
    else if (principal) d.formaReembolso = "Reembolso";

    /* O QUE FALTOU — alimenta o relatório de leitura na tela */
    var obrigatorios = {
      nome: "nome", cpf: "CPF", rg: "RG", estadoCivil: "estado civil", profissao: "profissão",
      empreendimento: "empreendimento", cidade: "cidade/UF", bloco: "bloco", unidade: "unidade",
      cota: "cota", razaoSocial: "razão social", cnpj: "CNPJ", precoCota: "valor do contrato",
      formaPagamentoEntrada: "forma de pagamento", dataAssinatura: "data de assinatura",
      telefone: "telefone", email: "e-mail", endereco: "endereço"
    };
    d.achou = []; d.faltou = [];
    Object.keys(obrigatorios).forEach(function (k) {
      (d[k] === undefined || d[k] === null || d[k] === "" ? d.faltou : d.achou).push(obrigatorios[k]);
    });

    return d;
  }

  window.LerContrato = { lerPDF: lerPDF, extrair: extrair, pareceEscaneado: pareceEscaneado };

  if (window.pdfjsLib) {
    try { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "../../assets/lib/pdf.worker.min.js"; } catch (e) {}
  }
})();
