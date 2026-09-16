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
    var n = String(nome).trim();
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

  /* ---------- lê o PDF e devolve o texto ---------- */
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

  /* ---------- extrai os campos do texto ---------- */
  function extrair(texto) {
    var t = String(texto || "").replace(/\r/g, "");
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
    var prof = primeiro(/Profiss[ãa]o\s*:\s*([^\n]+?)(?:\s{2,}|(?:Data|CPF|RG|Identidade|Nacional|Estado|Nasc|E-mail|Endere[çc]o|End\.|$)\s*:)/i, t);
    if (!prof) prof = primeiro(/Profiss[ãa]o\s*:\s*([^\n]+?)(?:\s{2,}|$)/i, t);
    if (!ehNaoInformado(prof)) d.profissao = prof;

    /* TELEFONE / CELULAR */
    var tel = primeiro(/(?:Tel(?:efone)?|Cel\.?|Celular|Contato)\s*(?:com\.|res\.)?\s*:?\s*(?:\+?\d{1,3}\s*)?(\(?\d{2}\)?\s*\d{4,5}[\s-]?\d{4})/i, t);
    if (tel) d.telefone = normalizarTelefone(tel);

    /* E-MAIL */
    var email = primeiro(/([A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,})/, t);
    if (email && !/wam|gav|ng20\.com|palmerston/i.test(email)) d.email = email.toLowerCase();

    /* RG */
    var rgNum = primeiro(/Identidade\s*:?\s*([0-9Xx][0-9Xx.\-\/]{2,})\s*Org/i, t);
    var rgOrg = primeiro(/Org(?:[ãa]o)?\.?\s*(?:Exp\.?|Emissor)?\s*:?\s*([A-Za-zÀ-ú]{2,}\s*[-\/]?\s*[A-Za-zÀ-ú]{2})\b/i, t);
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
      var org = (!ehNaoInformado(rgOrg)) ? " - " + rgOrg.replace(/\s*[-–]\s*/g, "/") : "";
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
    emp = emp.replace(/\s*\(.*$/, "").trim();
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
        var mSplit = linha.match(/^(.+?)\s*[-–\/]\s*([A-ZÀ-Úa-zà-ú]{2,20})$/);
        cid = mSplit ? mSplit[1].trim() + "/" + ufSigla(mSplit[2]) : linha;
      }
    }
    if (cid) d.cidade = cid;

    /* TORRE / BLOCO */
    var bloco = primeiro(/Torre\s*:?\s*(BLOCO\s*[\w-]+|[\w-]+)(?=\s|$)/i, t);
    if (bloco && !/^andar$/i.test(bloco)) d.bloco = bloco.replace(/^BLOCO\s+/i, "");

    /* ANDAR — só quando tem ":" (evita casar "Andar 30" de endereço da vendedora) */
    var andar = primeiro(/\bAndar\s*:\s*(\d{1,2}|t[ée]rreo|T)\b/i, t);
    if (andar) d.andar = andar;

    /* APARTAMENTO / UNIDADE */
    var apto = primeiro(/(?:Apartamento|Apto|Unidade\s+Aut[ôo]noma)\s*:?\s*n?º?\.?\s*([0-9]{1,5}[A-Za-z]?)\b/i, t);
    if (apto) d.unidade = apto;

    /* COTA */
    var cota = primeiro(/Cota\s*(?:n[º°o]?\.?)?\s*:?\s*([0-9]{1,4}[A-Za-z]?)\b/i, t);
    if (cota) d.cota = cota;

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
    var pCota = primeiro(/Pre[çc]o\s+da\s+Cota\s*\(?[^)]*\)?\s*:?\s*R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})/i, t);
    if (!pCota) pCota = primeiro(/VALOR\s+TOTAL\s+DA\s+VENDA\s*:?\s*R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})/i, t);
    if (!pCota) pCota = primeiro(/Pre[çc]o\s+total[^\n]{0,50}?R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})/i, t);
    if (!pCota) pCota = primeiro(/\(i\.1\)\s*R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})/i, t);
    if (pCota) d.precoCota = paraNumero(pCota);

    // Intermediação / Corretagem
    var pInt = primeiro(/(?:Valor\s+dos\s+Servi[çc]os\s+de\s+Intermedia[çc][ãa]o|Comiss[ãa]o\s+de\s+Corretagem)\s*:?\s*R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})/i, t);
    if (pInt) d.precoIntermediacao = paraNumero(pInt);

    // Total
    if (d.precoCota && d.precoIntermediacao) {
      d.precoTotal = d.precoCota + d.precoIntermediacao;
    }

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
      var linhasG = mGavRec[1].split(/\n/);
      linhasG.forEach(function (ln) {
        // "01 R$ 1,275.00 Rede Cartao 178626954 MASTER/CreditoAVista R$ 1,275.00 07/10/2026"
        // "04 R$ 138.75 -- Boleto -- -- R$ 555.00 07/10/2026"
        // "01 R$ 1,440.00 -- PIX RESV098...E8B9 -- R$ 1,440.00 07/09/2026"
        var m = ln.match(/^\s*(\d{1,3})\s+R\$\s*(\d{1,3}(?:[.,]\d{3})*[.,]\d{2})\s+\S+\s+(PIX|Boleto|Cart[ãa]o|D[éeE]bito|TED|Dep[óoO]sito|Transfer[eê]ncia)\s+.*?(\d{1,2}\/\d{1,2}\/\d{2,4})/i);
        if (m) {
          parcelas.push({
            tipo: "Intermediação",
            qtd: parseInt(m[1], 10),
            valor: paraNumero(m[2]),
            forma: m[3].trim(),
            vencimento: paraISO(m[4])
          });
        }
      });
    }

    if (parcelas.length) d.parcelas = parcelas;

    // texto humano da forma de pagamento (o campo formaPagamentoEntrada da ficha)
    if (fpInt || parcelas.length) {
      var fp = [];
      // Intermediação: usa a linha original do WAM se tiver; senão monta a partir das parcelas
      if (fpInt) {
        fp.push("Intermediação: " + fpInt);
      } else {
        var parcInt = parcelas.filter(function (p) { return p.tipo === "Intermediação"; });
        if (parcInt.length) {
          var resInt = parcInt.map(function (p) {
            return p.qtd + "x R$ " + (p.valor ? p.valor.toFixed(2).replace(".", ",") : "?") + " " + (p.forma || "");
          }).join(" + ");
          fp.push("Intermediação: " + resInt);
        }
      }
      // Preço: sempre do resumo das parcelas
      var parcPreco = parcelas.filter(function (p) { return p.tipo === "Preço"; });
      if (parcPreco.length) {
        var resPreco = parcPreco.map(function (p) {
          return p.qtd + "x R$ " + (p.valor ? p.valor.toFixed(2).replace(".", ",") : "?") + " " + (p.forma || "");
        }).join(" + ");
        fp.push("Preço: " + resPreco);
      }
      d.formaPagamentoEntrada = fp.join(" | ");
    }

    /* DATA DE ASSINATURA — última linha "CIDADE - UF, 07 de setembro de 2026" ou "Caldas Novas, 15 de Agosto de 2026" */
    var dataAss = primeiro(/(?:[A-ZÀ-Ú][A-Za-zà-ú ]+(?:\s*[-–]\s*[A-Za-z]{2,})?)\s*,\s*(\d{1,2}\s+de\s+[A-Za-zç]+\s+de\s+\d{4})/, t);
    if (dataAss) d.dataAssinatura = paraISO(dataAss);

    /* CNPJ da empresa vendedora (primeiro do documento) */
    var cnpj = primeiro(/CNPJ[^0-9]{0,18}?([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})\b/i, t);
    if (cnpj) {
      var cd = cnpj.replace(/\D/g, "");
      d.cnpj = cd.slice(0, 2) + "." + cd.slice(2, 5) + "." + cd.slice(5, 8) + "/" + cd.slice(8, 12) + "-" + cd.slice(12);
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
    if (empresaVend) d.razaoSocial = empresaVend;

    /* LOCAL / ESTADO do empreendimento */
    var uf = primeiro(/Estado\s+d[eo]\s+([A-Za-zÀ-ú]{4,})/i, t);
    if (uf) d.local = uf.toUpperCase();

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

    return d;
  }

  window.LerContrato = { lerPDF: lerPDF, extrair: extrair, pareceEscaneado: pareceEscaneado };

  if (window.pdfjsLib) {
    try { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "../../assets/lib/pdf.worker.min.js"; } catch (e) {}
  }
})();
