/* ============================================================
   Contratos — fichas dos clientes
   Lê window.CLIENTES (clientes.js) e mostra em cards.
   Edições feitas aqui ficam no navegador (localStorage) e podem
   ser exportadas de volta para o clientes.js.
   ============================================================ */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var STORE = "contratos-v1";

  /* ---------- Utilidades ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function txt(v) { return (v == null ? "" : String(v)).trim(); }

  // aceita número (1200.5) ou texto ("1.200,50" / "R$ 1.200,50")
  function num(v) {
    if (v === null || v === undefined || v === "") return null;
    if (typeof v === "number") return isFinite(v) ? v : null;
    var s = String(v).replace(/[^\d,.-]/g, "");
    if (s === "") return null;
    if (s.indexOf(",") > -1) s = s.replace(/\./g, "").replace(",", ".");
    var n = parseFloat(s);
    return isFinite(n) ? n : null;
  }
  function moeda(v) {
    var n = num(v);
    if (n === null) return "";
    return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function rs(v) { var m = moeda(v); return m ? "R$ " + m : ""; }

  function dataBR(v) {
    var s = txt(v);
    if (!s) return "";
    var iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) return iso[3] + "/" + iso[2] + "/" + iso[1];
    return s;
  }
  function hojeISO() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function dataObj(v) {
    var s = txt(v);
    var m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
    return null;
  }
  function fmtData(d) {
    return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear();
  }

  /* ---------- Prazo de 7 dias (arrependimento) ----------
     Conta a partir da data de assinatura: o 7º dia é o último.
     Dentro do prazo o cancelamento é bem mais simples; depois dele
     entram as regras de retenção do contrato. */
  function prazo7(c) {
    var ass = dataObj(c.dataAssinatura);
    if (!ass) return null;
    var limite = new Date(ass.getFullYear(), ass.getMonth(), ass.getDate() + 7);
    var h = new Date();
    var hoje = new Date(h.getFullYear(), h.getMonth(), h.getDate());
    var dias = Math.round((limite - hoje) / 86400000);
    return {
      limite: limite,
      dias: dias,                                    // >0 restantes, 0 vence hoje, <0 vencido
      aberto: dias >= 0,
      desde: Math.round((hoje - ass) / 86400000)     // dias desde a assinatura
    };
  }
  function prazoCurto(p) {
    if (!p) return "";
    if (p.dias > 1) return "Prazo de 7 dias: faltam " + p.dias + " dias";
    if (p.dias === 1) return "Prazo de 7 dias: falta 1 dia";
    if (p.dias === 0) return "Prazo de 7 dias: vence hoje";
    if (p.dias === -1) return "Prazo de 7 dias: venceu ontem";
    return "Prazo de 7 dias: venceu há " + (-p.dias) + " dias";
  }
  function semAcento(s) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  /* ---------- Valor por extenso (mesma lógica do Termo de Distrato) ---------- */
  var UNI = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove",
    "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  var DEZ = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  var CEM = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
  var ESC_S = ["", "mil", "milhão", "bilhão"];
  var ESC_P = ["", "mil", "milhões", "bilhões"];

  function tresDigitos(n) {
    if (n === 100) return "cem";
    var s = "", c = Math.floor(n / 100), r = n % 100;
    if (c > 0) s += CEM[c];
    if (r > 0) {
      if (s) s += " e ";
      if (r < 20) s += UNI[r];
      else { s += DEZ[Math.floor(r / 10)]; if (r % 10 > 0) s += " e " + UNI[r % 10]; }
    }
    return s;
  }
  function inteiroPorExtenso(n) {
    n = Math.floor(n);
    if (n === 0) return "zero";
    var grupos = [], t = n;
    while (t > 0) { grupos.push(t % 1000); t = Math.floor(t / 1000); }
    var partes = [], menor = 0;
    for (var i = grupos.length - 1; i >= 0; i--) {
      var g = grupos[i];
      if (g === 0) continue;
      var s;
      if (i === 1) s = (g === 1) ? "mil" : tresDigitos(g) + " mil";
      else if (i >= 2) s = tresDigitos(g) + " " + (g === 1 ? ESC_S[i] : ESC_P[i]);
      else s = tresDigitos(g);
      partes.push(s); menor = g;
    }
    if (partes.length === 1) return partes[0];
    var ultimo = partes[partes.length - 1];
    var inicio = partes.slice(0, -1).join(" ");
    var usaE = (menor < 100) || (menor % 100 === 0);
    return inicio + (usaE ? " e " : " ") + ultimo;
  }
  function valorPorExtenso(valor) {
    var reais = Math.floor(valor), cent = Math.round((valor - reais) * 100), s = "";
    if (reais > 0) s += inteiroPorExtenso(reais) + (reais === 1 ? " real" : " reais");
    if (cent > 0) { if (s) s += " e "; s += inteiroPorExtenso(cent) + (cent === 1 ? " centavo" : " centavos"); }
    return s || "zero real";
  }

  /* ---------- Persistência (edições locais) ---------- */
  function lerStore() {
    try {
      var raw = localStorage.getItem(STORE);
      if (!raw) return { edits: {}, novos: [], arquivados: {}, pagos: {}, reembolsos: [] };
      var d = JSON.parse(raw);
      return { edits: d.edits || {}, novos: d.novos || [], arquivados: d.arquivados || {}, pagos: d.pagos || {}, reembolsos: d.reembolsos || [] };
    } catch (e) { return { edits: {}, novos: [], arquivados: {}, pagos: {}, reembolsos: [] }; }
  }
  function gravarStore(d) {
    try { localStorage.setItem(STORE, JSON.stringify(d)); } catch (e) {}
  }

  var store = lerStore();

  function normalizar(c) {
    var o = {};
    ["id", "nome", "cpf", "rg", "nacionalidade", "estadoCivil", "empreendimento", "bloco",
     "apartamento", "andar", "cota", "fracao", "localizacao", "empresa", "razaoSocial", "cnpj",
     "formaPagamentoEntrada", "formaReembolso", "dataAssinatura", "telefone", "email", "pix", "clausulaExtra", "observacoes", "notaEnvio"].forEach(function (k) {
      o[k] = txt(c[k]);
    });
    ["valorPago", "valorTotal", "corretagem", "sinal"].forEach(function (k) { o[k] = c[k]; });
    var cj = c.conjuge || {};
    o.conjuge = { nome: txt(cj.nome), cpf: txt(cj.cpf), rg: txt(cj.rg), email: txt(cj.email) };
    o.arquivos = (c.arquivos || []).map(function (a) {
      return { titulo: txt(a.titulo) || "Documento", arquivo: txt(a.arquivo) };
    }).filter(function (a) { return a.arquivo; });
    o.parcelas = (c.parcelas || []).map(function (p) {
      return { tipo: txt(p.tipo), qtd: p.qtd, valor: p.valor, forma: txt(p.forma), vencimento: txt(p.vencimento) };
    });
    o.entradas = (c.entradas || []).map(function (e) {
      return { descricao: txt(e.descricao), valor: e.valor };
    });
    o.empresa = (o.empresa || "").toUpperCase() === "WAM" ? "WAM" : "GAV";
    return o;
  }

  // lista final = clientes.js + edições locais + clientes criados aqui
  function listaCompleta() {
    var base = (window.CLIENTES || []).map(function (c) {
      var e = store.edits[c.id];
      return normalizar(e ? Object.assign({}, c, e) : c);
    });
    var novos = (store.novos || []).map(normalizar);
    return base.concat(novos);
  }
  function ehNovo(id) {
    return (store.novos || []).some(function (c) { return c.id === id; });
  }
  function ehEditado(id) {
    return !!store.edits[id];
  }
  function ehArquivado(id) {
    if (store.arquivados[id]) return true;
    return (window.CLIENTES || []).some(function (c) { return c.id === id && c.arquivado; });
  }
  // contratos já analisados saem da lista principal, mas continuam guardados
  function arquivar(id, arquiva) {
    if (arquiva) store.arquivados[id] = true;
    else delete store.arquivados[id];
    gravarStore(store);
  }

  function ehPago(id) { return !!store.pagos[id]; }
  function marcarPago(id, pago) {
    if (pago) store.pagos[id] = true;
    else delete store.pagos[id];
    gravarStore(store);
  }

  /* ---------- Reembolsos ----------
     Registro do que já foi devolvido. Fica salvo no navegador e só sai
     quando você clica em Excluir. */
  function reembolsos() {
    return (store.reembolsos || []).slice().sort(function (a, b) {
      return String(b.data || "").localeCompare(String(a.data || ""));
    });
  }
  // um reembolso pode cobrir mais de uma cota: aparece na ficha de todas
  function reembolsosDe(clienteId) {
    return reembolsos().filter(function (r) {
      return r.clienteId === clienteId || (r.clienteIds || []).indexOf(clienteId) > -1;
    });
  }
  function salvarReembolso(r) {
    store.reembolsos = store.reembolsos || [];
    var i = -1;
    store.reembolsos.forEach(function (x, k) { if (x.id === r.id) i = k; });
    if (i >= 0) store.reembolsos[i] = r; else store.reembolsos.push(r);
    gravarStore(store);
  }
  function excluirReembolso(id) {
    store.reembolsos = (store.reembolsos || []).filter(function (r) { return r.id !== id; });
    gravarStore(store);
  }
  function novoIdReembolso() {
    return "reemb-" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000);
  }
  function acharCliente(id) {
    var l = listaCompleta();
    for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i];
    return null;
  }

  /* ---------- Detecção de duplicatas ----------
     Duas fichas são consideradas o MESMO contrato quando têm:
     - mesmo CPF do titular
     - mesmo empreendimento
     - mesmo bloco + unidade + cota
     Ficha 140 (Lidia N/003/11) e uma nova 152 (mesmo N/003/11) — mesmo doc.
     ------------------------------------------------------------- */
  function chaveDuplicata(c) {
    var partes = [
      String(c.cpf || "").replace(/\D/g, ""),
      semAcento(c.empreendimento || ""),
      semAcento(c.bloco || ""),
      semAcento(c.unidade || c.apartamento || ""),
      semAcento(c.cota || "")
    ];
    // se algum campo essencial estiver vazio, não conta como duplicata
    if (!partes[0] || !partes[1] || !partes[3]) return "";
    return partes.join("|");
  }
  function acharDuplicatas() {
    var mapa = {}, l = listaCompleta();
    for (var i = 0; i < l.length; i++) {
      var k = chaveDuplicata(l[i]);
      if (!k) continue;
      (mapa[k] = mapa[k] || []).push(l[i]);
    }
    var grupos = [];
    for (var chave in mapa) if (mapa[chave].length > 1) grupos.push(mapa[chave]);
    return grupos;
  }

  /* ---------- Estado da tela ---------- */
  var filtroEmpresa = "";
  var filtroStatus = "ativos";   // "ativos" | "arquivados" | "todos"
  var termo = "";

  // lista da aba atual (sem busca nem filtro de empresa) — base dos totais do topo
  function listaPorStatus() {
    return listaCompleta().filter(function (c) {
      if (filtroStatus === "ativos") return !ehArquivado(c.id);
      if (filtroStatus === "arquivados") return ehArquivado(c.id);
      return true;
    });
  }

  function filtrados() {
    var t = semAcento(termo);
    return listaPorStatus().filter(function (c) {
      if (filtroEmpresa && c.empresa !== filtroEmpresa) return false;
      if (!t) return true;
      var alvo = semAcento([c.nome, c.empreendimento, c.cpf, c.razaoSocial, c.apartamento, c.cota].join(" "));
      return alvo.indexOf(t) > -1;
    });
  }

  /* ---------- Banner de duplicatas ----------
     Mostra logo no topo, acima do resumo, quando há fichas apontando
     pro mesmo contrato (mesmo CPF + empreendimento + bloco/unidade/cota).
     Ficou útil depois do caso Lidia (ficha 140 e 152 apontando pro mesmo
     Bloco N / 003 / Cota 11). */
  function renderAvisoDuplicatas() {
    var grupos = acharDuplicatas();
    var host = $("avisoDup");
    if (!host) return;
    if (!grupos.length) { host.hidden = true; host.innerHTML = ""; return; }
    var itens = grupos.map(function (g) {
      var titulo = (g[0].nome || "—") + " · " +
                   (g[0].empreendimento || "") + " · " +
                   [g[0].bloco, g[0].unidade || g[0].apartamento, g[0].cota].filter(Boolean).join("/");
      var ids = g.map(function (c) {
        return '<button type="button" class="dup-id" data-acao="ver-ficha" data-id="' + esc(c.id) + '">' +
               "ficha " + esc(c.id) + "</button>";
      }).join(" ");
      return '<li><strong>' + esc(titulo) + '</strong> — ' + ids + '</li>';
    }).join("");
    host.hidden = false;
    host.innerHTML =
      '<div class="aviso-duplicatas">' +
        '<div class="aviso-duplicatas__topo">' +
          '<span class="aviso-duplicatas__tag">Atenção</span> ' +
          '<strong>' + grupos.length + ' contrato' + (grupos.length > 1 ? "s" : "") + ' com ficha duplicada</strong>' +
          ' — mesmo CPF, mesmo empreendimento e mesma unidade/cota.' +
        '</div>' +
        '<ul class="aviso-duplicatas__lista">' + itens + '</ul>' +
      '</div>';
  }

  /* ---------- Resumo ---------- */
  function renderResumo() {
    if (filtroStatus === "reembolsos") {
      var rs_ = reembolsos();
      var totalR = rs_.reduce(function (s, r) { return s + (num(r.valor) || 0); }, 0);
      var gavR = rs_.filter(function (r) { return r.empresa !== "WAM"; }).length;
      $("resumo").innerHTML =
        stat("Reembolsos", rs_.length) +
        stat("GAV", gavR) +
        stat("WAM", rs_.length - gavR) +
        '<div class="stat destaque"><span>Total reembolsado</span><b>' + esc(rs(totalR) || "R$ 0,00") + "</b></div>";
      return;
    }

    var l = listaPorStatus();
    var gav = 0, wam = 0, soma = 0, noPrazo = 0;
    l.forEach(function (c) {
      if (c.empresa === "WAM") wam++; else gav++;
      soma += num(c.valorPago) || 0;
      var p = prazo7(c);
      if (p && p.aberto) noPrazo++;
    });
    $("resumo").innerHTML =
      stat("Contratos", l.length) +
      stat("Pessoas", agruparPorPessoa(l).length) +
      stat("GAV", gav) +
      stat("WAM", wam) +
      '<div class="stat' + (noPrazo ? " urgente" : "") + '"><span>Dentro dos 7 dias</span><b>' + noPrazo + "</b></div>" +
      '<div class="stat destaque"><span>Total pago (reembolso)</span><b>' + esc(rs(soma) || "R$ 0,00") + "</b></div>";
  }
  function stat(rot, val) {
    return '<div class="stat"><span>' + esc(rot) + "</span><b>" + esc(val) + "</b></div>";
  }

  /* ---------- Grid ----------
     Quem tem mais de um contrato aparece com as caixas juntas,
     dentro de uma faixa com o nome da pessoa. */
  function chavePessoa(c) {
    var cpf = txt(c.cpf).replace(/\D/g, "");
    return cpf || semAcento(c.nome);
  }

  function agruparPorPessoa(l) {
    var grupos = [], indice = {};
    l.forEach(function (c) {
      var k = chavePessoa(c);
      if (!indice[k]) { indice[k] = { itens: [] }; grupos.push(indice[k]); }
      indice[k].itens.push(c);
    });
    return grupos;
  }

  // o PDF do contrato da ficha: o anexo chamado "Contrato", ou o primeiro que houver
  function ehPendente(c) { return /-PENDENTE$/i.test(String(c.id)); }

  function contratoDe(c) {
    var lista = c.arquivos || [];
    for (var i = 0; i < lista.length; i++) {
      if (/contrato/i.test(lista[i].titulo)) return lista[i].arquivo;
    }
    return lista.length ? lista[0].arquivo : "";
  }

  function cardFicha(c, dentroDeGrupo) {
    var imovel = [blocoRotulado(c), unidadeCurta(c), c.cota ? "Cota " + c.cota : ""].filter(Boolean).join(" · ");
    var titulo = dentroDeGrupo ? (imovel || "—") : (c.nome || "(sem nome)");
    var sub = dentroDeGrupo
      ? (c.empreendimento || "—")
      : ([c.empreendimento, imovel].filter(Boolean).join(" · ") || "—");
    var marca = ehPendente(c.id) ? "aguardando contrato" : (ehNovo(c.id) ? "adicionado aqui" : (ehEditado(c.id) ? "editado" : ""));
    var p = prazo7(c);
    var arq = ehArquivado(c.id);
    var pago = ehPago(c.id);
    return (
      '<div role="button" tabindex="0" class="ficha' + (c.empresa === "WAM" ? " wam" : "") + (arq ? " arquivada" : "") + (pago ? " pago" : "") + '" data-id="' + esc(c.id) + '">' +
        (pago ? '<div class="ficha__carimbo">PAGO</div>' : "") +
        '<div class="ficha__topo">' +
          '<span class="tag' + (c.empresa === "WAM" ? " wam" : "") + '">' + esc(c.empresa) + "</span>" +
          (arq ? '<span class="tag arq">arquivado</span>' : "") +
          (pago ? '<span class="tag pago-tag">pago</span>' : "") +
          (ehPendente(c.id) ? '<span class="tag pend">aguardando contrato</span>' : "") +
          '<span class="ficha__data">' + esc(dataBR(c.dataAssinatura)) + "</span>" +
          '<button type="button" class="ficha__acao" data-arquivar="' + esc(c.id) + '" data-arq="' + (arq ? "1" : "0") + '">' +
            (arq ? "Reabrir" : "Arquivar") +
          "</button>" +
        "</div>" +
        '<div class="ficha__nome">' + esc(titulo) + "</div>" +
        '<div class="ficha__sub">' + esc(sub) + "</div>" +
        (c.telefone ? '<div class="ficha__tel">' + esc(c.telefone) + '</div>' : "") +
        (p ? '<div class="prazo-tag ' + (p.aberto ? "aberto" : "vencido") + '">' + esc(prazoCurto(p)) + "</div>" : "") +
        '<div class="ficha__valor"><span>Valor pago</span><b>' + esc(rs(c.valorPago) || "—") + "</b></div>" +
        (marca ? '<div class="ficha__marca">' + esc(marca) + "</div>" : "") +
        '<div class="ficha__botoes">' +
          (contratoDe(c)
            ? '<button type="button" class="ficha__btn" data-acao="ver-contrato" data-id="' + esc(c.id) + '">Ver contrato</button>'
            : "") +
          '<button type="button" class="ficha__btn destaque" data-acao="distrato" data-id="' + esc(c.id) + '">Distrato ' + esc(c.empresa) + "</button>" +
          '<button type="button" class="ficha__btn" data-acao="distrato" data-nova="1" data-id="' + esc(c.id) + '" title="Abre o distrato em outra guia">Nova guia ↗</button>' +
          '<button type="button" class="ficha__btn reembolso" data-acao="novo-reembolso" data-id="' + esc(c.id) + '">Reembolso</button>' +
          '<button type="button" class="ficha__btn" data-acao="email" data-id="' + esc(c.id) + '">Mensagem</button>' +
          '<button type="button" class="ficha__btn' + (pago ? " pago-ativo" : "") + '" data-pago="' + esc(c.id) + '" data-pg="' + (pago ? "1" : "0") + '">' +
            (pago ? "Desmarcar pago" : "Marcar pago") +
          "</button>" +
        "</div>" +
      "</div>"
    );
  }

  function renderGrid() {
    if (filtroStatus === "reembolsos") { renderReembolsos(); return; }

    var l = filtrados();
    var grupos = agruparPorPessoa(l);
    var pessoas = grupos.length;
    $("contagem").textContent =
      l.length + (l.length === 1 ? " contrato" : " contratos") +
      (pessoas !== l.length ? " · " + pessoas + (pessoas === 1 ? " pessoa" : " pessoas") : "");

    // contador de arquivados fica no próprio chip
    var nArq = listaCompleta().filter(function (c) { return ehArquivado(c.id); }).length;
    var chipArq = $("chipsStatus").querySelector('[data-status="arquivados"]');
    if (chipArq) chipArq.textContent = nArq ? "Arquivados (" + nArq + ")" : "Arquivados";

    // atalho para desfazer arquivamento em massa
    var btnTodos = $("btnReabrirTodos");
    if (btnTodos) {
      btnTodos.hidden = !(nArq && filtroStatus === "arquivados");
      btnTodos.textContent = "Reabrir todos (" + nArq + ")";
    }

    if (!l.length) {
      $("grid").innerHTML = '<div class="vazio">' +
        (filtroStatus === "arquivados"
          ? "Nenhum contrato arquivado ainda. Abra uma ficha e clique em <b>Arquivar</b> quando terminar a análise."
          : "Nenhum contrato encontrado.") + "</div>";
      return;
    }

    $("grid").innerHTML = grupos.map(function (g) {
      if (g.itens.length === 1) return cardFicha(g.itens[0], false);

      var p = g.itens[0];
      var total = g.itens.reduce(function (s, c) { return s + (num(c.valorPago) || 0); }, 0);
      var ids = g.itens.map(function (c) { return c.id; }).join("|");
      var resumo = [
        g.itens.length + " contratos",
        p.cpf ? "CPF " + p.cpf : "",
        "total pago " + rs(total)
      ].filter(Boolean).join(" · ");

      return (
        '<section class="grupo">' +
          '<header class="grupo__topo">' +
            "<div><b>" + esc(p.nome || "(sem nome)") + "</b><small>" + esc(resumo) + "</small></div>" +
            '<div class="grupo__acoes">' +
              '<button type="button" class="btn" data-acao="email-grupo" data-ids="' + esc(ids) + '">' +
                "Gerar mensagem dos " + g.itens.length +
              "</button>" +
              '<button type="button" class="btn" data-acao="reembolso-grupo" data-ids="' + esc(ids) + '">' +
                "Reembolso único dos " + g.itens.length +
              "</button>" +
              '<button type="button" class="btn" data-acao="distrato-grupo" data-ids="' + esc(ids) + '">' +
                "Distrato dos " + g.itens.length +
              "</button>" +
            "</div>" +
          "</header>" +
          '<div class="grupo__itens">' +
            g.itens.map(function (c) { return cardFicha(c, true); }).join("") +
          "</div>" +
        "</section>"
      );
    }).join("");
  }
  function unidadeCurta(c) {
    if (!c.apartamento) return "";
    return /^\d+$/.test(c.apartamento) ? "Apto " + c.apartamento : c.apartamento;
  }

  function renderReembolsos() {
    if ($("btnReabrirTodos")) $("btnReabrirTodos").hidden = true;
    var t = semAcento(termo);
    var l = reembolsos().filter(function (r) {
      if (filtroEmpresa && r.empresa !== filtroEmpresa) return false;
      if (!t) return true;
      return semAcento([r.cliente, r.imovel, r.obs].join(" ")).indexOf(t) > -1;
    });

    $("contagem").textContent = l.length + (l.length === 1 ? " reembolso" : " reembolsos");

    if (!l.length) {
      $("grid").innerHTML = '<div class="vazio">Nenhum reembolso registrado ainda. ' +
        "Abra a ficha de um cliente e clique em <b>Criar reembolso</b>.</div>";
      return;
    }

    $("grid").innerHTML = l.map(function (r) {
      return (
        '<div class="ficha' + (r.empresa === "WAM" ? " wam" : "") + '">' +
          '<div class="ficha__topo">' +
            '<span class="tag' + (r.empresa === "WAM" ? " wam" : "") + '">' + esc(r.empresa || "GAV") + "</span>" +
            '<span class="ficha__data">' + esc(dataBR(r.data)) + "</span>" +
            '<button type="button" class="ficha__acao" data-acao="abrir-comprovante" data-reemb="' + esc(r.id) + '" data-empresa="' + esc(r.empresa || "GAV") + '">Comprovante</button>' +
            '<button type="button" class="ficha__acao perigo" data-excluir-reemb="' + esc(r.id) + '">Excluir</button>' +
          "</div>" +
          '<div class="ficha__nome">' + esc(r.cliente || "—") + "</div>" +
          '<div class="ficha__sub">' + esc(r.imovel || "—") + "</div>" +
          '<div class="prazo-tag">' + esc(r.forma || "Reembolso") + "</div>" +
          (r.pix ? '<div class="ficha__sub">PIX: ' + esc(r.pix) + "</div>" : "") +
          (r.obs ? '<div class="ficha__sub">' + esc(r.obs) + "</div>" : "") +
          '<div class="ficha__valor"><span>Valor reembolsado</span><b>' + esc(rs(r.valor) || "—") + "</b></div>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------- Modal ---------- */
  function abrirModal(titulo, empresa, corpoHTML, rodapeHTML) {
    emailSel = null;   // sair do modo e-mail ao trocar o conteúdo do painel
    $("mdNome").textContent = titulo;
    var tag = $("mdEmpresa");
    tag.textContent = empresa || "";
    tag.className = "tag" + (empresa === "WAM" ? " wam" : "");
    tag.style.display = empresa ? "" : "none";
    $("mdCorpo").innerHTML = corpoHTML;
    $("mdRodape").innerHTML = rodapeHTML;
    $("modal").hidden = false;
    $("mdCorpo").scrollTop = 0;
  }
  function fecharModal() { $("modal").hidden = true; }

  function linha(rot, val) {
    var v = txt(val);
    return "<div><dt>" + esc(rot) + "</dt><dd" + (v ? "" : ' class="vazia"') + ">" + esc(v || "não consta") + "</dd></div>";
  }

  function verCliente(id) {
    var c = acharCliente(id);
    if (!c) return;

    var html = "";

    html += '<div class="pago"><span>Valor efetivamente pago<small>É sobre este valor que o reembolso é calculado.</small></span>' +
      "<b>" + esc(rs(c.valorPago) || "—") + "</b></div>";

    var p7 = prazo7(c);
    if (p7) {
      html += '<div class="prazo ' + (p7.aberto ? "aberto" : "vencido") + '">' +
        "<b>" + esc(prazoCurto(p7)) + "</b>" +
        "<span>Assinado em " + esc(dataBR(c.dataAssinatura)) + " (há " + p7.desde + (p7.desde === 1 ? " dia" : " dias") + ") · " +
        "7º dia: " + esc(fmtData(p7.limite)) + "</span>" +
        "</div>";
    }

    html += '<div class="bloco"><h3>Identificação</h3><dl class="dl">' +
      linha("Nome", c.nome) + linha("CPF", c.cpf) + linha("RG / órgão", c.rg) +
      linha("Nacionalidade", c.nacionalidade) + linha("Estado civil", c.estadoCivil) +
      "</dl></div>";

    if (c.conjuge.nome || c.conjuge.cpf || c.conjuge.rg) {
      html += '<div class="bloco"><h3>Cônjuge</h3><dl class="dl">' +
        linha("Nome", c.conjuge.nome) + linha("CPF", c.conjuge.cpf) + linha("RG / órgão", c.conjuge.rg) +
        (c.conjuge.email ? linha("E-mail", c.conjuge.email) : "") +
        "</dl></div>";
    }

    html += '<div class="bloco"><h3>Imóvel</h3><dl class="dl">' +
      linha("Empreendimento", c.empreendimento) + linha("Bloco / torre", c.bloco) +
      linha("Apartamento / unidade", c.apartamento) + linha("Andar", andarRotulado(c)) + linha("Cota", c.cota) +
      linha("Fração", c.fracao) + linha("Localização (estado)", c.localizacao) +
      "</dl></div>";

    html += '<div class="bloco"><h3>Empresa</h3><dl class="dl">' +
      linha("Grupo", c.empresa) + linha("Razão social", c.razaoSocial) + linha("CNPJ", c.cnpj) +
      "</dl></div>";

    html += '<div class="bloco"><h3>Financeiro</h3><dl class="dl">' +
      linha("Valor pago", rs(c.valorPago)) + linha("Valor total do contrato", rs(c.valorTotal)) +
      linha("Comissão de corretagem", rs(c.corretagem)) + linha("Sinal", rs(c.sinal)) +
      linha("Forma de pagamento da entrada", c.formaPagamentoEntrada) +
      linha("Forma do reembolso", formaReembolso(c)) +
      linha("Data da assinatura", dataBR(c.dataAssinatura)) +
      linha("Protocolo", protocoloDe(c)) +
      linha("Telefone / WhatsApp", c.telefone) +
      linha("E-mail", c.email) +
      // a chave PIX não vem do contrato — quem preenche é o cliente na hora de assinar o distrato
      (c.pix ? linha("Chave PIX", c.pix) : "") +
      "</dl></div>";

    if (c.parcelas.length) {
      html += '<div class="bloco"><h3>Parcelas</h3><table class="parcelas"><thead><tr>' +
        "<th>Tipo</th><th>Qtd</th><th>Valor</th><th>Forma</th><th>1º venc.</th><th>Total</th>" +
        "</tr></thead><tbody>";
      c.parcelas.forEach(function (p) {
        var q = num(p.qtd) || 0, v = num(p.valor);
        var total = (v !== null && q) ? rs(q * v) : "";
        html += "<tr><td>" + esc(p.tipo || "—") + "</td>" +
          '<td class="num">' + esc(q || "") + "</td>" +
          '<td class="num">' + esc(rs(p.valor)) + "</td>" +
          "<td>" + esc(p.forma || "") + "</td>" +
          "<td>" + esc(dataBR(p.vencimento)) + "</td>" +
          '<td class="num">' + esc(total) + "</td></tr>";
      });
      html += "</tbody></table></div>";
    }

    if (c.arquivos.length) {
      html += '<div class="bloco"><h3>Documentos</h3><div class="anexos">' +
        c.arquivos.map(function (a) {
          return '<a class="anexo" href="' + esc(a.arquivo) + '" target="_blank" rel="noopener">' +
            '<span class="anexo__icone">PDF</span>' +
            '<span class="anexo__nome">' + esc(a.titulo) + "</span>" +
            '<span class="anexo__seta">↗</span></a>';
        }).join("") +
        "</div></div>";
    }

    html += '<div class="bloco"><h3>Cláusulas que vão no distrato</h3>' +
      clausulasDoDistrato(c).map(function (t) { return '<div class="clausula">' + esc(t) + "</div>"; }).join("") +
      "</div>";

    var meus = reembolsosDe(c.id);
    if (meus.length) {
      html += '<div class="bloco"><h3>Reembolsos registrados</h3><table class="parcelas"><thead><tr>' +
        "<th>Data</th><th>Forma</th><th>Valor</th><th>Observação</th><th></th>" +
        "</tr></thead><tbody>";
      meus.forEach(function (r) {
        html += "<tr><td>" + esc(dataBR(r.data)) + "</td>" +
          "<td>" + esc(r.forma || "") + "</td>" +
          '<td class="num">' + esc(rs(r.valor)) + "</td>" +
          "<td>" + esc([r.pix ? "PIX " + r.pix : "", r.obs].filter(Boolean).join(" · ")) + "</td>" +
          '<td class="num"><button type="button" class="btn btn-perigo" data-excluir-reemb="' + esc(r.id) + '">Excluir</button></td></tr>';
      });
      html += "</tbody></table></div>";
    }

    if (c.observacoes) {
      html += '<div class="bloco"><h3>Observações</h3><div class="obs">' + esc(c.observacoes) + "</div></div>";
    }

    var rodape =
      '<button type="button" class="btn" data-fechar>Fechar</button>' +
      (ehNovo(c.id) ? '<button type="button" class="btn btn-perigo" data-acao="excluir" data-id="' + esc(c.id) + '">Excluir</button>' : "") +
      (ehEditado(c.id) ? '<button type="button" class="btn" data-acao="restaurar" data-id="' + esc(c.id) + '">Desfazer edições</button>' : "") +
      '<button type="button" class="btn" data-acao="editar" data-id="' + esc(c.id) + '">Editar</button>' +
      (ehArquivado(c.id)
        ? '<button type="button" class="btn" data-acao="desarquivar" data-id="' + esc(c.id) + '">Reabrir</button>'
        : '<button type="button" class="btn" data-acao="arquivar" data-id="' + esc(c.id) + '">Arquivar</button>') +
      '<button type="button" class="btn" data-acao="email" data-id="' + esc(c.id) + '">Gerar mensagem</button>' +
      '<button type="button" class="btn" data-acao="novo-reembolso" data-id="' + esc(c.id) + '">Criar reembolso</button>' +
      '<button type="button" class="btn ' + (c.empresa === "WAM" ? "btn-wam" : "btn-primary") + '" data-acao="distrato" data-id="' + esc(c.id) + '">Gerar distrato ' + esc(c.empresa) + "</button>" +
      '<button type="button" class="btn" data-acao="distrato" data-nova="1" data-id="' + esc(c.id) + '" title="Abre o distrato em outra guia, sem sair daqui">Nova guia ↗</button>';

    abrirModal(c.nome || "(sem nome)", c.empresa, html, rodape);
  }

  /* ---------- Edição ---------- */
  var CAMPOS_TEXTO = [
    ["nome", "Nome", "full"], ["cpf", "CPF"], ["rg", "RG / órgão (ex.: 7625314 SDS PE)"],
    ["nacionalidade", "Nacionalidade"], ["estadoCivil", "Estado civil"],
    ["conjuge.nome", "Cônjuge — nome", "full"], ["conjuge.cpf", "Cônjuge — CPF"], ["conjuge.rg", "Cônjuge — RG"], ["conjuge.email", "Cônjuge — e-mail"],
    ["empreendimento", "Empreendimento", "full"], ["bloco", "Bloco / torre"], ["apartamento", "Apartamento / unidade"], ["andar", "Andar"],
    ["cota", "Cota"], ["fracao", "Fração"], ["localizacao", "Localização (estado)"],
    ["razaoSocial", "Razão social", "full"], ["cnpj", "CNPJ"],
    ["valorPago", "VALOR PAGO (R$)"], ["valorTotal", "Valor total do contrato (R$)"],
    ["corretagem", "Corretagem (R$)"], ["sinal", "Sinal (R$)"],
    ["formaPagamentoEntrada", "Forma de pagamento da entrada"],
    ["formaReembolso", "Forma do reembolso (Reembolso / Estorno Cartão / Cheque)"], ["dataAssinatura", "Data da assinatura (AAAA-MM-DD)"],
    ["telefone", "Telefone / WhatsApp"], ["email", "E-mail"],
    ["pix", "Chave PIX para reembolso", "full"], ["clausulaExtra", "Cláusula extra — entra no distrato logo abaixo do valor", "full"]
  ];

  function pegar(o, caminho) {
    var p = caminho.split(".");
    return p.length === 1 ? o[caminho] : (o[p[0]] || {})[p[1]];
  }
  function pôr(o, caminho, v) {
    var p = caminho.split(".");
    if (p.length === 1) o[caminho] = v;
    else { o[p[0]] = o[p[0]] || {}; o[p[0]][p[1]] = v; }
  }

  /* ---------- Preencher formulário automaticamente a partir do PDF ---------- */
  function preencherComPDF(file) {
    var st = $("lerContratoStatus");
    var form = $("formEdit");
    if (!form) return;
    if (!window.LerContrato) {
      alert("Leitor de contrato não carregou. Recarregue a página.");
      return;
    }
    if (st) { st.textContent = "Lendo PDF..."; st.className = "ler-pdf__status carregando"; }

    window.LerContrato.lerPDF(file).then(function (texto) {
      if (window.LerContrato.pareceEscaneado(texto)) {
        if (st) { st.textContent = "PDF sem texto (escaneado). Preencha à mão."; st.className = "ler-pdf__status erro"; }
        return;
      }
      var d = window.LerContrato.extrair(texto);

      // Mapa campo do PDF -> name do input do formulário
      var mapa = {
        nome: "nome",
        cpf: "cpf",
        rg: "rg",
        nacionalidade: "nacionalidade",
        estadoCivil: "estadoCivil",
        empreendimento: "empreendimento",
        bloco: "bloco",
        unidade: "apartamento",
        andar: "andar",
        cota: "cota",
        fracao: "fracao",
        local: "localizacao",
        razaoSocial: "razaoSocial",
        cnpj: "cnpj",
        precoCota: null, // valorPago é decisão humana, não vem do contrato
        precoIntermediacao: "corretagem",
        precoTotal: "valorTotal",
        formaPagamentoEntrada: "formaPagamentoEntrada",
        dataAssinatura: "dataAssinatura",
        telefone: "telefone",
        email: "email",
        conjugeNome: "conjuge.nome",
        conjugeCpf: "conjuge.cpf",
        conjugeRg: "conjuge.rg"
      };

      var preenchidos = [], sobrescritos = [];
      Object.keys(mapa).forEach(function (chavePdf) {
        var nomeCampo = mapa[chavePdf];
        if (!nomeCampo) return;
        var valor = d[chavePdf];
        if (valor === undefined || valor === null || valor === "") return;
        var input = form.querySelector('[name="' + nomeCampo + '"]');
        if (!input) return;

        // formata número como moeda se for campo de valor
        if (["valorTotal", "corretagem"].indexOf(nomeCampo) > -1 && typeof valor === "number") {
          valor = moeda(valor);
        }

        if (input.value.trim()) sobrescritos.push(nomeCampo);
        else preenchidos.push(nomeCampo);
        input.value = valor;
      });

      // Empresa
      if (d.empresa) {
        var selEmp = form.querySelector('[name="empresa"]');
        if (selEmp) selEmp.value = d.empresa;
      }

      // Sugere id automático se o campo estiver vazio: ex "acson-areya-blc-1-649-30"
      var inpId = form.querySelector('[name="id"]');
      if (inpId && !inpId.value.trim() && d.nome) {
        var slug = semAcento(d.nome).toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).slice(0, 2).join("-");
        var unid = [d.bloco, d.unidade, d.cota].filter(Boolean).join("-").toLowerCase();
        inpId.value = slug + (unid ? "-" + unid : "");
      }

      if (st) {
        var msg = preenchidos.length + " campos preenchidos";
        if (sobrescritos.length) msg += " · " + sobrescritos.length + " sobrescritos";
        if (!d.nome && !d.cpf) msg = "Nada extraído — verifique se o PDF tem texto";
        st.textContent = msg;
        st.className = "ler-pdf__status " + ((!d.nome && !d.cpf) ? "erro" : "ok");
      }
    }).catch(function (err) {
      if (st) { st.textContent = "Erro: " + (err.message || err); st.className = "ler-pdf__status erro"; }
    });
  }

  /* ---------- Processar VÁRIOS PDFs de uma vez ----------
     Lê cada um, cria 1 ficha por contrato (mesma pessoa, unidades diferentes),
     salva tudo em store.novos e fecha o modal. */
  function processarVariosPDFs(files) {
    var st = $("lerContratoStatus");
    if (!window.LerContrato) return alert("Leitor de contrato não carregou.");

    var resultados = [];
    var promessa = Promise.resolve();
    files.forEach(function (file, idx) {
      promessa = promessa.then(function () {
        if (st) { st.textContent = "Lendo " + (idx + 1) + " de " + files.length + "..."; st.className = "ler-pdf__status carregando"; }
        return window.LerContrato.lerPDF(file).then(function (texto) {
          if (window.LerContrato.pareceEscaneado(texto)) {
            resultados.push({ file: file.name, ok: false, motivo: "PDF sem texto (escaneado)" });
            return;
          }
          var d = window.LerContrato.extrair(texto);
          if (!d.nome && !d.cpf) {
            resultados.push({ file: file.name, ok: false, motivo: "Nada extraído" });
            return;
          }
          resultados.push({ file: file.name, ok: true, dados: d });
        }).catch(function (err) {
          resultados.push({ file: file.name, ok: false, motivo: err.message || String(err) });
        });
      });
    });

    promessa.then(function () {
      // cria as fichas — uma por PDF que teve extração ok
      var criados = [];
      resultados.forEach(function (r) {
        if (!r.ok) return;
        var d = r.dados;
        var slug = semAcento(d.nome || "").toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).slice(0, 2).join("-");
        var unid = [d.bloco, d.unidade, d.cota].filter(Boolean).join("-").toLowerCase();
        var id = (slug + (unid ? "-" + unid : "")) || ("cliente-" + Date.now() + "-" + criados.length);

        // se já existir esse id, adiciona sufixo
        var idUnico = id, n = 2;
        while (acharCliente(idUnico)) idUnico = id + "-" + (n++);

        var novo = fichaAPartirDeExtracao(d, idUnico);
        store.novos.push(novo);
        criados.push({ id: idUnico, nome: d.nome, unidade: [d.bloco, d.unidade, d.cota].filter(Boolean).join("/") });
      });
      gravarStore(store);
      renderTudo();
      fecharModal();

      // relatório final
      var falhas = resultados.filter(function (r) { return !r.ok; });
      var msg = criados.length + " ficha" + (criados.length !== 1 ? "s" : "") + " criada" + (criados.length !== 1 ? "s" : "") + ":\n\n" +
                criados.map(function (c) { return "· " + c.id + " (" + c.unidade + ")"; }).join("\n") +
                (falhas.length ? "\n\nFalhas (" + falhas.length + "):\n" +
                                 falhas.map(function (r) { return "· " + r.file + ": " + r.motivo; }).join("\n") : "");
      alert(msg);
    });
  }

  /* Converte a saída do extrator numa ficha pronta pra store.novos */
  function fichaAPartirDeExtracao(d, id) {
    var f = {
      id: id,
      empresa: d.empresa || "GAV",
      nome: d.nome || "",
      cpf: d.cpf || "",
      rg: d.rg || "",
      nacionalidade: d.nacionalidade || "brasileiro(a)",
      estadoCivil: d.estadoCivil || "",
      empreendimento: d.empreendimento || "",
      bloco: d.bloco || "",
      apartamento: d.unidade || "",
      andar: d.andar || "",
      cota: d.cota || "",
      fracao: d.fracao || "1/52",
      localizacao: d.local || "",
      razaoSocial: d.razaoSocial || "",
      cnpj: d.cnpj || "",
      valorTotal: d.precoTotal || "",
      corretagem: d.precoIntermediacao || "",
      formaPagamentoEntrada: d.formaPagamentoEntrada || "",
      dataAssinatura: d.dataAssinatura || "",
      telefone: d.telefone || "",
      email: d.email || "",
      conjuge: {
        nome: d.conjugeNome || "",
        cpf: d.conjugeCpf || "",
        rg: d.conjugeRg || ""
      },
      parcelas: d.parcelas || [],
      observacoes: ""
    };
    return normalizar(f);
  }

  function editarCliente(id, criando) {
    var c = criando
      ? normalizar({ id: "", empresa: "GAV", nacionalidade: "brasileiro(a)", fracao: "1/52", parcelas: [] })
      : acharCliente(id);
    if (!c) return;

    var html = '<form id="formEdit" autocomplete="off">';

    // Botão "Ler contrato (PDF)" só no fluxo de criação — pré-preenche todos os campos
    if (criando) {
      html += '<div class="bloco bloco-ler-pdf">' +
        '<div class="ler-pdf__topo">' +
          '<strong>Preenchimento automático</strong>' +
          '<span class="aviso">Selecione um PDF pra pré-preencher esta ficha, ou vários PDFs de uma vez pra criar N fichas (uma por contrato).</span>' +
        '</div>' +
        '<div class="ler-pdf__acoes">' +
          '<label class="btn btn-primary" for="fileLerContrato">📄 Ler contrato(s) (PDF)</label>' +
          '<input type="file" id="fileLerContrato" accept="application/pdf,.pdf" multiple hidden />' +
          '<span id="lerContratoStatus" class="ler-pdf__status"></span>' +
        '</div>' +
      '</div>';
    }

    html += '<div class="bloco"><div class="form-grid">';
    html += '<label class="campo"><span>Identificador (id)</span><input type="text" name="id" value="' + esc(c.id) + '"' + (criando ? "" : " readonly") + ' /></label>';
    html += '<label class="campo"><span>Empresa</span><select name="empresa">' +
      '<option value="GAV"' + (c.empresa === "GAV" ? " selected" : "") + ">GAV</option>" +
      '<option value="WAM"' + (c.empresa === "WAM" ? " selected" : "") + ">WAM</option>" +
      "</select></label>";
    CAMPOS_TEXTO.forEach(function (f) {
      var v = pegar(c, f[0]);
      if (["valorPago", "valorTotal", "corretagem", "sinal"].indexOf(f[0]) > -1) v = moeda(v);
      html += '<label class="campo' + (f[2] === "full" ? " full" : "") + '"><span>' + esc(f[1]) + "</span>" +
        '<input type="text" name="' + f[0] + '" value="' + esc(v == null ? "" : v) + '" /></label>';
    });
    html += '<label class="campo full"><span>Observações</span><textarea name="observacoes">' + esc(c.observacoes) + "</textarea></label>";
    html += "</div></div>";

    html += '<div class="bloco"><h3>Parcelas</h3><div id="parcelasBox"></div>' +
      '<button type="button" class="btn" id="btnAddParcela">+ Parcela</button></div>';
    html += "</form>";

    var rodape =
      '<button type="button" class="btn" data-fechar>Cancelar</button>' +
      '<button type="button" class="btn btn-primary" data-acao="salvar" data-criando="' + (criando ? "1" : "") + '">Salvar</button>';

    abrirModal(criando ? "Novo cliente" : "Editando: " + (c.nome || c.id), "", html, rodape);

    var box = $("parcelasBox");
    (c.parcelas.length ? c.parcelas : []).forEach(addParcela);
    $("btnAddParcela").addEventListener("click", function () { addParcela({}); });

    // Preenchimento automático a partir do PDF do contrato (1 ou vários)
    if (criando) {
      var input = $("fileLerContrato");
      if (input) input.addEventListener("change", function (e) {
        var files = Array.prototype.slice.call(e.target.files || []);
        e.target.value = "";
        if (!files.length) return;
        if (files.length === 1) preencherComPDF(files[0]);
        else processarVariosPDFs(files);
      });
    }

    function addParcela(p) {
      var div = document.createElement("div");
      div.className = "linha-parcela";
      div.innerHTML =
        '<select data-p="tipo">' +
          ["Entrada", "Sinal", "Saldo", "Corretagem", "Outro"].map(function (t) {
            return '<option' + ((p.tipo || "Entrada") === t ? " selected" : "") + ">" + t + "</option>";
          }).join("") +
        "</select>" +
        '<input data-p="qtd" placeholder="qtd" value="' + esc(p.qtd == null ? "" : p.qtd) + '" />' +
        '<input data-p="valor" placeholder="valor" value="' + esc(moeda(p.valor)) + '" />' +
        '<input data-p="forma" placeholder="forma" value="' + esc(p.forma || "") + '" />' +
        '<input data-p="vencimento" placeholder="1º venc." value="' + esc(p.vencimento || "") + '" />' +
        '<button type="button" class="btn btn-perigo" data-remover>×</button>';
      div.querySelector("[data-remover]").addEventListener("click", function () { div.remove(); });
      box.appendChild(div);
    }
  }

  function salvarEdicao(criando) {
    var form = $("formEdit");
    var dados = {};
    Array.prototype.forEach.call(form.querySelectorAll("[name]"), function (el) {
      var v = el.value.trim();
      if (["valorPago", "valorTotal", "corretagem", "sinal"].indexOf(el.name) > -1) {
        var n = num(v);
        pôr(dados, el.name, n === null ? "" : n);
      } else {
        pôr(dados, el.name, v);
      }
    });
    dados.parcelas = Array.prototype.map.call($("parcelasBox").children, function (div) {
      var p = {};
      Array.prototype.forEach.call(div.querySelectorAll("[data-p]"), function (el) {
        var k = el.getAttribute("data-p"), v = el.value.trim();
        p[k] = (k === "qtd" || k === "valor") ? (num(v) === null ? "" : num(v)) : v;
      });
      return p;
    }).filter(function (p) { return p.tipo || p.valor; });

    if (!dados.id) { alert("Informe um identificador (id) para o cliente."); return; }

    if (criando) {
      if (acharCliente(dados.id)) { alert("Já existe um cliente com o id \"" + dados.id + "\"."); return; }
      // Aviso de duplicata: mesmo CPF + empreendimento + bloco/unidade/cota
      var chaveNovo = chaveDuplicata(normalizar(dados));
      if (chaveNovo) {
        var l = listaCompleta(), existente = null;
        for (var i = 0; i < l.length; i++) {
          if (chaveDuplicata(l[i]) === chaveNovo) { existente = l[i]; break; }
        }
        if (existente) {
          var msg = "ATENÇÃO: já existe uma ficha para este mesmo contrato:\n\n" +
                    "  · ficha " + existente.id + " — " + (existente.nome || "—") + "\n" +
                    "  · " + (existente.empreendimento || "") + " · " +
                    [existente.bloco, existente.unidade || existente.apartamento, existente.cota].filter(Boolean).join("/") + "\n\n" +
                    "Deseja salvar mesmo assim? (Isso vai criar uma duplicata.)";
          if (!confirm(msg)) return;
        }
      }
      store.novos.push(dados);
    } else if (ehNovo(dados.id)) {
      store.novos = store.novos.map(function (c) { return c.id === dados.id ? dados : c; });
    } else {
      store.edits[dados.id] = dados;
    }
    gravarStore(store);
    renderTudo();
    verCliente(dados.id);
  }

  /* ---------- Gerador do corpo do e-mail ----------
     Monta o texto que acompanha o(s) termo(s) de distrato enviados
     para assinatura. Serve para 1 distrato ou vários no mesmo e-mail. */

  var TEXTO_FORMA = {
    "Estorno Cartão": "estorno no cartão utilizado na compra",
    "Reembolso": "reembolso na chave PIX informada no termo",
    "Reembolso + Estorno": "reembolso via TED/PIX + cancelamento do parcelamento no cartão",
    "Cheque": "cheque"
  };

  function nomeProprio(s) {
    return String(s || "").toLowerCase()
      .replace(/(^|\s)([a-zà-ú])/g, function (m, a, b) { return a + b.toUpperCase(); })
      .replace(/\s(Da|De|Do|Das|Dos|E)\s/g, function (m) { return m.toLowerCase(); });
  }
  function porExtensoDe(v) {
    var n = num(v);
    return n === null ? "" : " (" + valorPorExtenso(n) + ")";
  }

  // quem assina o distrato: o titular e, quando existir, o cônjuge anuente
  function signatarios(cs) {
    var out = [];
    cs.forEach(function (c) {
      [{ nome: c.nome, email: c.email },
       { nome: c.conjuge.nome, email: c.conjuge.email }].forEach(function (p) {
        if (!p.nome) return;
        var ja = out.some(function (x) { return semAcento(x.nome) === semAcento(p.nome); });
        if (!ja) out.push(p);
      });
    });
    return out;
  }
  function juntarNomes(arr) {
    if (arr.length <= 1) return arr[0] || "";
    return arr.slice(0, -1).join(", ") + " e " + arr[arr.length - 1];
  }

  // Notas de envio personalizadas (campo notaEnvio de cada ficha)
  function notasEnvio(cs) {
    var notas = [];
    cs.forEach(function (c) {
      if (c.notaEnvio && notas.indexOf(c.notaEnvio) < 0) notas.push(c.notaEnvio);
    });
    return notas.length ? "*Importante:* " + notas.join(" ") + "\n\n" : "";
  }

  function montarEmail(cs) {
    var um = cs.length === 1;
    var mesmaPessoa = cs.every(function (c) { return c.cpf && c.cpf === cs[0].cpf; });
    var precisaPix = cs.some(function (c) { var f = formaReembolso(c); return f === "Reembolso" || f === "Reembolso + Estorno"; });

    // o e-mail vai para todos que assinam — inclusive o cônjuge, quando houver
    var quemAssina = signatarios(cs);
    var destinos = [];
    quemAssina.forEach(function (p) {
      if (p.email && destinos.indexOf(p.email) < 0) destinos.push(p.email);
    });

    // no e-mail é sempre "Prezado(a)" — não tenta adivinhar gênero
    var saudacao = quemAssina.length === 1
      ? "Prezado(a) " + nomeProprio(quemAssina[0].nome) + ","
      : "Prezados(as) " + juntarNomes(quemAssina.map(function (p) { return nomeProprio(p.nome); })) + ",";

    var itens = cs.map(function (c) {
      var cab = [];
      if (!um && !mesmaPessoa) cab.push(nomeProprio(c.nome));
      cab.push(c.empreendimento || "—");
      var imovel = [unidadeDistrato(c), cotaDistrato(c)].filter(Boolean).join(", ");
      if (imovel) cab.push(imovel);
      return "- " + cab.join(" — ") + "\n" +
        "  Valor a devolver: " + (rs(c.valorPago) || "—") + porExtensoDe(c.valorPago) +
        " — " + (TEXTO_FORMA[formaReembolso(c)] || TEXTO_FORMA["Reembolso"]);
    }).join("\n");

    // Agora sempre é 1 Termo consolidado, mesmo com N contratos.
    var passos = ["1. Confira os dados do termo;"];
    if (precisaPix) {
      passos.push((passos.length + 1) + ". Preencha a chave PIX para o reembolso no campo indicado no documento;");
    }
    passos.push((passos.length + 1) + ". Assine o termo via gov.br e devolva respondendo a este e-mail.");

    var total = cs.reduce(function (s, c) { return s + (num(c.valorPago) || 0); }, 0);

    var corpo =
      saudacao + "\n\n" +
      "Segue em anexo " + termoTexto(1, true) +
      (um ? " referente ao contrato" : " referente aos contratos") + " de multipropriedade abaixo, para assinatura:" +
      "\n\n" + itens + "\n\n" +
      (um ? "" : "Total a devolver: " + rs(total) + porExtensoDe(total) + "\n\n") +
      "Para darmos andamento ao cancelamento e à devolução dos valores, pedimos que:\n\n" +
      passos.join("\n") + "\n\n" +
      notasEnvio(cs) +
      "Assim que recebermos o termo assinado, seguimos com o processo.\n\n" +
      "Qualquer dúvida, é só responder este e-mail.\n\n" +
      "Atenciosamente,";

    var quem = (um || mesmaPessoa)
      ? nomeProprio(cs[0].nome)
      : cs.map(function (c) { return nomeProprio(c.nome); }).join(" e ");

    var assunto = termoTexto(1) + " para assinatura — " + quem +
      (um ? " — " + (cs[0].empreendimento || "") : "");

    return { assunto: assunto, corpo: corpo, destinos: destinos };
  }

  /* ---------- Mensagem de WhatsApp ----------
     Mais curta e informal que o e-mail. Usa *asterisco* para negrito,
     que é como o WhatsApp formata. */
  function primeiroNome(s) {
    return nomeProprio(txt(s).split(/\s+/)[0] || "");
  }
  function telDigitos(c) {
    var d = txt(c.telefone).replace(/\D/g, "");
    if (!d) return "";
    if (d.length === 10 || d.length === 11) return "55" + d;
    if (d.length === 12 || d.length === 13) return d;
    return d;
  }

  function montarWhats(cs) {
    var um = cs.length === 1;
    var mesmaPessoa = cs.every(function (c) { return c.cpf && c.cpf === cs[0].cpf; });
    var precisaPix = cs.some(function (c) { var f = formaReembolso(c); return f === "Reembolso" || f === "Reembolso + Estorno"; });

    var quem = (um || mesmaPessoa)
      ? primeiroNome(cs[0].nome)
      : cs.map(function (c) { return primeiroNome(c.nome); }).join(" e ");

    var itens = cs.map(function (c) {
      var imovel = [unidadeDistrato(c), cotaDistrato(c)].filter(Boolean).join(", ");
      var quemItem = (!um && !mesmaPessoa) ? nomeProprio(c.nome) + " — " : "";
      return "*" + (c.empreendimento || "—") + "* — " + quemItem + imovel + "\n" +
        "Valor a devolver: *" + (rs(c.valorPago) || "—") + "* — " + (TEXTO_FORMA[formaReembolso(c)] || TEXTO_FORMA["Reembolso"]);
    }).join("\n\n");

    var passos = ["1. Conferir os dados do termo;"];
    if (precisaPix) passos.push((passos.length + 1) + ". Preencher a chave PIX no campo indicado;");
    passos.push((passos.length + 1) + ". Assinar via gov.br e me devolver o documento.");

    var total = cs.reduce(function (s, c) { return s + (num(c.valorPago) || 0); }, 0);

    var texto =
      "Olá, " + quem + "! Tudo bem?\n\n" +
      "Estou te enviando o *" + termoTexto(1) + "*" +
      (um ? " do seu contrato" : " dos seus contratos") + " de multipropriedade para assinatura:\n\n" +
      itens + "\n\n" +
      (um ? "" : "*Total a devolver: " + rs(total) + "*\n\n") +
      "Para dar andamento, é só:\n" +
      passos.join("\n") + "\n\n" +
      notasEnvio(cs) +
      "Qualquer dúvida, me chama por aqui.";

    var tel = telDigitos(cs[0]);
    return { texto: texto, tel: tel, telFmt: txt(cs[0].telefone) };
  }

  /* ---------- Aviso no WhatsApp de que o termo foi por e-mail ----------
     Mensagem curta, só pra avisar que o documento já está na caixa dele. */
  function montarAviso(cs) {
    var um = cs.length === 1;
    var mesmaPessoa = cs.every(function (c) { return c.cpf && c.cpf === cs[0].cpf; });

    var quem = (um || mesmaPessoa)
      ? primeiroNome(cs[0].nome)
      : cs.map(function (c) { return primeiroNome(c.nome); }).join(" e ");

    var mail = txt(cs[0].email);
    var mesmoMail = cs.every(function (c) { return txt(c.email) === mail; });

    var texto =
      "Olá, " + quem + "! Tudo bem?\n\n" +
      "Acabei de te enviar por e-mail o *" + termoTexto(1) + "*" +
      " para assinatura" + (mail && mesmoMail ? ", no endereço " + mail : "") + ".\n\n" +
      "Dá uma olhada na caixa de entrada — se não achar, confere o spam/lixo eletrônico.\n\n" +
      "É só conferir os dados, assinar via gov.br e me devolver: pode responder o próprio e-mail ou " +
      "mandar por aqui mesmo, como preferir. Qualquer dúvida, me chama.";

    return { texto: texto, tel: telDigitos(cs[0]), telFmt: txt(cs[0].telefone) };
  }

  /* ---------- Cláusulas do distrato ----------
     Não há mais cláusula automática de prazo de pagamento: o distrato só
     recebe o que estiver escrito no campo "Cláusula extra" da ficha.
     Uma linha do campo = um parágrafo no documento. */
  function clausulasDoDistrato(c) {
    var lista = [];
    txt(c.clausulaExtra).split("\n").forEach(function (linha) {
      linha = linha.trim();
      if (linha) lista.push(linha);
    });
    return lista;
  }

  /* ---------- Protocolo e link de WhatsApp do atendimento ----------
     O número muda conforme a empresa da ficha. Troque aqui se mudar. */
  var WHATSAPP_EMPRESA = {
    GAV: "5562976029439",
    WAM: ""   // <<< preencher com o número da WAM (só dígitos, com 55 na frente)
  };

  // protocolo fixo por ficha: sai do número da proposta que está no id
  function protocoloDe(c) {
    var num = (String(c.id).match(/\d{4,}/) || [])[0];
    if (num) return "DIST-" + num;
    var h = 0, s = String(c.id);
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000000;
    return "DIST-" + String(h).padStart(6, "0");
  }

  // link que o cliente clica: já abre a conversa com a mensagem escrita,
  // identificando quem é, o imóvel e o protocolo
  function linkWhatsCliente(c) {
    var numero = WHATSAPP_EMPRESA[c.empresa] || "";
    if (!numero) return "";
    var imovel = [c.empreendimento, unidadeDistrato(c), cotaDistrato(c)].filter(Boolean).join(", ");
    var texto =
      "Olá! Sou " + nomeProprio(c.nome) + (c.cpf ? ", CPF " + c.cpf : "") + ". " +
      "Protocolo " + protocoloDe(c) + " — " + imovel + ". " +
      "Gostaria de dar sequência ao meu reembolso.";
    return "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);
  }

  var emailSel = null;       // {id: true} enquanto o painel de mensagem está aberto
  var emailModo = "email";   // "email" | "whatsapp" | "aviso"
  var emailCorrigido = false; // reenvio: troca o texto para "termo corrigido"

  // "o Termo de Distrato" / "os 2 Termos de Distrato corrigidos" etc.
  function termoTexto(qtd, comArtigo) {
    var um = qtd === 1;
    var corpo = um
      ? "Termo de Distrato" + (emailCorrigido ? " corrigido" : "")
      : qtd + " Termos de Distrato" + (emailCorrigido ? " corrigidos" : "");
    if (!comArtigo) return corpo;
    return (um ? "o " : "os ") + corpo;
  }

  function abrirEmail(ids) {
    var sel = {};
    (ids || []).forEach(function (id) { sel[id] = true; });

    var lista = listaPorStatus().map(function (c) {
      return '<label class="pick"><input type="checkbox" data-pick="' + esc(c.id) + '"' + (sel[c.id] ? " checked" : "") + " />" +
        "<span><b>" + esc(c.nome || c.id) + "</b><small>" + esc([c.empresa, c.empreendimento, rs(c.valorPago)].filter(Boolean).join(" · ")) + "</small></span></label>";
    }).join("");

    abrirModal("Gerar mensagem", "",
      '<div class="bloco"><h3>Distratos que vão nesta mensagem</h3><div class="picks">' + lista + "</div></div>" +
      '<div id="emailSaida"></div>', "");

    emailCorrigido = false;   // cada painel abre como envio normal
    emailSel = sel;   // só depois de abrirModal, que zera o modo mensagem
    renderEmail();
  }

  function renderEmail() {
    var saida = $("emailSaida");
    if (!saida || !emailSel) return;

    var escolhidos = listaCompleta().filter(function (c) { return emailSel[c.id]; });
    if (!escolhidos.length) {
      saida.innerHTML = '<p class="aviso">Marque pelo menos um distrato acima.</p>';
      $("mdRodape").innerHTML = '<button type="button" class="btn" data-fechar>Fechar</button>';
      return;
    }

    var abas = '<div class="abas">' +
      '<button type="button" class="aba' + (emailModo === "email" ? " ativa" : "") + '" data-modo="email">E-mail</button>' +
      '<button type="button" class="aba' + (emailModo === "whatsapp" ? " ativa" : "") + '" data-modo="whatsapp">WhatsApp</button>' +
      '<button type="button" class="aba' + (emailModo === "aviso" ? " ativa" : "") + '" data-modo="aviso">Avisei por e-mail</button>' +
      '<label class="corrigido"><input type="checkbox" id="chkCorrigido"' + (emailCorrigido ? " checked" : "") + " />" +
        "<span>Termo corrigido (reenvio)</span></label>" +
      "</div>";

    if (emailModo === "whatsapp" || emailModo === "aviso") {
      var wa = emailModo === "aviso" ? montarAviso(escolhidos) : montarWhats(escolhidos);
      saida.innerHTML = abas +
        '<div class="bloco"><h3>' + (emailModo === "aviso" ? "Aviso de que o termo foi por e-mail" : "Mensagem de WhatsApp") + "</h3>" +
          '<textarea class="codigo email" id="emWhats">' + esc(wa.texto) + "</textarea>" +
          '<p class="aviso">' + (wa.tel
            ? "Abre a conversa com " + esc(wa.telFmt) + " e a mensagem já vai escrita — você só confere e envia."
            : "Sem telefone nesta ficha. Copie a mensagem e cole no WhatsApp.") + "</p>" +
        "</div>";
      $("mdRodape").innerHTML =
        '<button type="button" class="btn" data-fechar>Fechar</button>' +
        (wa.tel ? '<button type="button" class="btn" data-acao="abrir-whats" data-tel="' + esc(wa.tel) + '">Abrir no WhatsApp</button>' : "") +
        '<button type="button" class="btn btn-primary" data-acao="copiar-whats">Copiar mensagem</button>';
      return;
    }

    var em = montarEmail(escolhidos);
    var destinos = em.destinos;
    saida.innerHTML = abas +
      (destinos.length
        ? '<div class="bloco"><h3>Para</h3><input type="text" class="assunto" id="emPara" value="' + esc(destinos.join("; ")) + '" /></div>'
        : "") +
      '<div class="bloco"><h3>Assunto</h3><input type="text" class="assunto" id="emAssunto" value="' + esc(em.assunto) + '" /></div>' +
      '<div class="bloco"><h3>Corpo do e-mail</h3><textarea class="codigo email" id="emCorpo">' + esc(em.corpo) + "</textarea></div>" +
      (escolhidos.length === 1
        ? '<div class="bloco"><h3>Link do WhatsApp com protocolo ' + esc(protocoloDe(escolhidos[0])) + "</h3>" +
            (linkWhatsCliente(escolhidos[0])
              ? '<input type="text" class="assunto" id="emLink" value="' + esc(linkWhatsCliente(escolhidos[0])) + '" />' +
                '<p class="aviso">Cole no e-mail. O cliente clica e a conversa já abre com o nome, o CPF e o protocolo escritos.</p>'
              : '<p class="aviso">Sem número de WhatsApp cadastrado para ' + esc(escolhidos[0].empresa) +
                " — preencher em WHATSAPP_EMPRESA, no topo do app.js.</p>") +
          "</div>"
        : "");
    $("mdRodape").innerHTML =
      '<button type="button" class="btn" data-fechar>Fechar</button>' +
      (destinos.length ? '<button type="button" class="btn" data-acao="copiar-para">Copiar e-mail</button>' : "") +
      '<button type="button" class="btn" data-acao="copiar-assunto">Copiar assunto</button>' +
      (escolhidos.length === 1 && linkWhatsCliente(escolhidos[0])
        ? '<button type="button" class="btn" data-acao="copiar-link">Copiar link</button>' : "") +
      '<button type="button" class="btn btn-primary" data-acao="copiar-corpo">Copiar corpo</button>';
  }

  /* ---------- Comprovante de reembolso (ferramentas GAV / WAM) ---------- */
  function pastaComprovante(empresa) {
    return empresa === "WAM" ? "reembolso-wam" : "comprovante-reembolso";
  }
  // vocabulário do comprovante (as ferramentas GAV/WAM usam outros rótulos)
  var FORMA_COMPROVANTE = {
    "Reembolso": "PIX",
    "Estorno Cartão": "Estorno no cartão",
    "Cheque": "Transferência bancária"
  };

  function enfileirarComprovante(c, dados, lista) {
    try {
      localStorage.setItem("comprovante-prefill", JSON.stringify({
        empresa: c.empresa,
        cliente: c.nome,
        cpf: c.cpf,
        empreendimento: c.empreendimento,
        cota: (lista || [c]).map(cotaDistrato).join(" e "),
        valor: moeda(dados.valor),
        forma: FORMA_COMPROVANTE[dados.forma] || "PIX",
        chavePix: dados.pix || c.pix || "",
        protocolo: ""
      }));
    } catch (e) {}
  }

  function abrirComprovante(empresa) {
    var pasta = pastaComprovante(empresa);
    try {
      if (window.top !== window.self) {
        window.top.location.href = "../../index.html#tool/" + pasta;
        return;
      }
    } catch (e) { /* sem acesso ao topo: abre no próprio quadro */ }
    location.href = "../" + pasta + "/index.html";
  }

  /* ---------- Criar reembolso ---------- */
  // descrição curta do imóvel de uma cota
  function imovelCurto(c) {
    return [c.empreendimento, blocoRotulado(c), c.apartamento ? "Apto " + c.apartamento : "", c.cota ? "Cota " + c.cota : ""]
      .filter(Boolean).join(" · ");
  }

  function formReembolso(ids) {
    var lista = (typeof ids === "string" ? [ids] : ids || [])
      .map(acharCliente).filter(Boolean);
    if (!lista.length) return;

    var c = lista[0];
    var imovel = lista.map(imovelCurto).join("  +  ");
    var soma = lista.reduce(function (s, x) { return s + (num(x.valorPago) || 0); }, 0);

    var formas = ["Reembolso", "Estorno Cartão", "Cheque"];
    var atual = formaReembolso(c);

    abrirModal(lista.length > 1 ? "Criar reembolso (" + lista.length + " cotas)" : "Criar reembolso", c.empresa,
      '<form id="formReemb" autocomplete="off"><div class="form-grid">' +
        '<label class="campo full"><span>Cliente</span><input type="text" value="' + esc(c.nome) + '" disabled /></label>' +
        (lista.length > 1
          ? '<label class="campo full"><span>Cotas incluídas</span><input type="text" value="' + esc(imovel) + '" disabled /></label>'
          : "") +
        '<label class="campo"><span>Valor reembolsado (R$)</span><input type="text" name="valor" value="' + esc(moeda(soma)) + '" /></label>' +
        '<label class="campo"><span>Data</span><input type="date" name="data" value="' + esc(hojeISO()) + '" /></label>' +
        '<label class="campo"><span>Forma</span><select name="forma">' +
          formas.map(function (f) { return '<option' + (f === atual ? " selected" : "") + ">" + f + "</option>"; }).join("") +
        "</select></label>" +
        '<label class="campo"><span>Chave PIX <small>(se houver)</small></span><input type="text" name="pix" value="' + esc(c.pix) + '" /></label>' +
        '<label class="campo full"><span>Observação</span><input type="text" name="obs" placeholder="nº do comprovante, quem autorizou, etc." /></label>' +
      "</div></form>" +
      '<p class="aviso">Fica salvo na aba <b>Reembolsos</b> e na ficha do cliente. Só sai se você clicar em Excluir.</p>' +
      '<div class="bloco"><h3>Para colar no comprovante ' + esc(c.empresa) + "</h3>" +
        '<textarea class="codigo" id="reembCola" style="min-height:150px"></textarea></div>',
      '<button type="button" class="btn" data-fechar>Cancelar</button>' +
      '<button type="button" class="btn" data-acao="copiar-cola">Copiar dados</button>' +
      '<button type="button" class="btn" data-acao="salvar-reembolso" data-ids="' + esc(lista.map(function(x){return x.id;}).join("|")) + '" data-imovel="' + esc(imovel) + '">Salvar</button>' +
      '<button type="button" class="btn btn-primary" data-acao="salvar-reembolso" data-abrir="1" data-ids="' + esc(lista.map(function(x){return x.id;}).join("|")) + '" data-imovel="' + esc(imovel) + '">Salvar e abrir comprovante</button>');

    atualizarCola(c, lista);
    $("formReemb").addEventListener("input", function () { atualizarCola(c, lista); });
    $("formReemb").addEventListener("change", function () { atualizarCola(c, lista); });
  }

  // o comprovante GAV/WAM não aceita dados por fora, então deixo os campos
  // prontos na ordem do formulário dele para copiar e colar
  function atualizarCola(c, lista) {
    var f = $("formReemb"), cola = $("reembCola");
    if (!f || !cola) return;
    function v(n) { var el = f.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ""; }
    cola.value =
      "Cliente: " + c.nome + "\n" +
      "CPF: " + c.cpf + "\n" +
      "Empreendimento: " + c.empreendimento + "\n" +
      "Cota: " + (lista || [c]).map(cotaDistrato).join(" e ") + "\n" +
      "Valor: " + v("valor") + "\n" +
      "Forma: " + (FORMA_COMPROVANTE[v("forma")] || "PIX") + "\n" +
      "Chave PIX: " + v("pix");
  }

  function salvarFormReembolso(idsTxt, imovel, abrir) {
    var lista = String(idsTxt || "").split("|").map(acharCliente).filter(Boolean);
    if (!lista.length) return;
    var c = lista[0], clienteId = c.id;
    var f = $("formReemb");
    function v(n) { var el = f.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ""; }

    var valor = num(v("valor"));
    if (valor === null || valor <= 0) { alert("Informe o valor do reembolso."); return; }

    var reg = {
      id: novoIdReembolso(),
      clienteId: clienteId,
      clienteIds: lista.map(function (x) { return x.id; }),
      cliente: c.nome,
      empresa: c.empresa,
      imovel: imovel,
      valor: valor,
      data: v("data") || hojeISO(),
      forma: v("forma") || "Reembolso",
      pix: v("pix"),
      obs: v("obs")
    };
    salvarReembolso(reg);
    renderTudo();
    if (abrir) { enfileirarComprovante(c, reg, lista); abrirComprovante(c.empresa); return; }
    verCliente(clienteId);
  }

  /* ---------- Exportar clientes.js ---------- */
  function exportar() {
    var l = listaCompleta().map(function (c) {
      return {
        id: c.id, nome: c.nome, cpf: c.cpf, rg: c.rg,
        nacionalidade: c.nacionalidade, estadoCivil: c.estadoCivil,
        conjuge: c.conjuge,
        empreendimento: c.empreendimento, bloco: c.bloco, apartamento: c.apartamento, andar: c.andar,
        cota: c.cota, fracao: c.fracao, localizacao: c.localizacao,
        empresa: c.empresa, razaoSocial: c.razaoSocial, cnpj: c.cnpj,
        valorPago: c.valorPago, valorTotal: c.valorTotal, corretagem: c.corretagem, sinal: c.sinal,
        parcelas: c.parcelas, arquivos: c.arquivos,
        formaPagamentoEntrada: c.formaPagamentoEntrada, formaReembolso: c.formaReembolso, dataAssinatura: c.dataAssinatura, telefone: c.telefone, email: c.email,
        pix: c.pix, clausulaExtra: c.clausulaExtra, observacoes: c.observacoes
      };
    });
    var codigo = "window.CLIENTES = " + JSON.stringify(l, null, 2) + ";\n";

    abrirModal("Exportar clientes.js", "",
      '<p class="aviso">Copie o código abaixo e cole em <b>ferramentas/contratos/clientes.js</b> ' +
      "(substituindo a linha <code>window.CLIENTES = [...]</code>). Assim as edições feitas aqui " +
      "passam a valer em qualquer computador, não só neste navegador.</p>" +
      '<textarea class="codigo" id="codigoExport" readonly>' + esc(codigo) + "</textarea>",
      '<button type="button" class="btn" data-fechar>Fechar</button>' +
      '<button type="button" class="btn btn-primary" data-acao="copiar">Copiar código</button>');
  }

  /* ---------- Gerar distrato (preenche o Termo de Distrato) ---------- */

  // Documento base do Termo de Distrato (cópia do modelo), usado só como
  // reserva quando ainda não existe nada salvo na ferramenta de distrato.
  function docBase(empresa) {
    var pagadora = empresa === "WAM"
      ? "Wam Hoteis e Resorts S/A"
      : "GAV Resorts Gestão de Negócios e Participação LTDA";
    var logo = empresa === "WAM" ? "images/logo-wam.png" : "images/logo-gav.png";
    return '' +
'<div class="doc-logo" id="docLogo" contenteditable="false"><img src="' + logo + '" alt="" id="docLogoImg" /></div>' +
'<hr class="doc-rule" />' +
'<h1 class="doc-title">TERMO DE DISTRATO AO CONTRATO PARTICULAR DE PROMESSA DE VENDA E COMPRA DE UNIDADE IMOBILIÁRIA.</h1>' +
'<p class="doc-p">Por este instrumento eu <b id="pv_nome" class="up">NOME DO CLIENTE</b>, <span id="pv_nac">brasileiro(a)</span>, <span id="pv_ec">Solteiro(a)</span>, titular da CI/RG <b id="pv_rg">—</b> e do CPF: <b id="pv_cpf">—</b><span id="pv_conjuge"></span> <span id="pv_verbo">manifesto</span> de livre e espontânea vontade, propor o distrato/desistência do negócio veiculado pela PROPOSTA DE PROMESSA DE VENDA E COMPRA DE UNIDADE IMOBILIÁRIA, relativa à aquisição de uma fração de <b id="pv_fracao">1/52</b> do <span id="pv_imoveis"><b>Apartamento 622</b>, nominado <b>Cota 21</b>,</span> do Edifício <b id="pv_edificio">AREYA BARRA RESORT</b>, localizado em <b id="pv_local">ALAGOAS</b>, de propriedade da empresa <b id="pv_empresa">—</b>, inscrita no CNPJ sob o nº <b id="pv_cnpj">—</b>.</p>' +
'<div class="doc-opcoes">' +
'<div class="doc-opcao" id="op_estorno"><span>( <b class="mark" id="ck_estorno">&nbsp;</b> ) Estorno Cartão</span><span>R$ <span id="val_estorno">XXXX,00</span></span></div>' +
'<div class="doc-opcao" id="op_reemb"><span>( <b class="mark" id="ck_reemb">X</b> ) Reembolso</span><span>R$ <span id="val_reemb">1.000,00</span></span></div>' +
'<div class="doc-opcao" id="op_cheque"><span>( <b class="mark" id="ck_cheque">&nbsp;</b> ) Cheque</span><span>R$ <span id="val_cheque">XXXX,00</span></span></div>' +
'</div>' +
'<p class="doc-p doc-p--bold">' + pagadora + ' compromete-se ainda a efetuar <span id="pv_meio">a devolução por transferência bancária</span> no valor de R$ <span id="pv_valor">1.000,00</span> (<span id="pv_extenso">mil reais</span>) referente ao sinal de proposta.</p>' +
'<p class="doc-p doc-p--bold">Comprometemos também em efetuar o cancelamento de quaisquer cobranças futuras referente as parcelas firmadas em contrato.</p>' +
'<p class="doc-p">Sendo essa a expressão final de minha vontade assino o presente distrato em 02 (duas) vias de igual teor, em conjunto, e com a concordância da empresa, razão pela qual as partes conferem entre si ampla, plena e irrevogável quitação, declarando-se livres e desimpedidas de qualquer obrigação em razão do aqui acordado.</p>' +
'<p class="doc-p" id="pv_data">__/__/____.</p>' +
'<p class="doc-p doc-pix" id="linhaPix"><strong>Chave PIX para reembolso:</strong> <span id="pv_pix" class="pix-valor"></span></p>' +
'<div class="doc-assinaturas" id="docAssinaturas">' +
'<div class="doc-assinatura"><div class="doc-assinatura__linha"></div><div class="doc-assinatura__nome up" id="pv_nome_ass">NOME DO CLIENTE</div></div>' +
'<div class="doc-assinatura" id="assConjuge" hidden><div class="doc-assinatura__linha"></div><div class="doc-assinatura__nome up" id="pv_nome_conj_ass">CÔNJUGE</div></div>' +
'</div>' +
'<p class="doc-rodape">Este Quadro-Resumo obedece ao artigo 35-A da Lei Federal nº 4.591/1964 e integra o presente Contrato para todos os fins e efeitos.</p>';
  }

  function estadoCivilSelect(v) {
    var s = semAcento(v);
    if (/uniao/.test(s)) return "União estável";
    if (/casad/.test(s)) return "Casado(a)";
    if (/divorc|separad/.test(s)) return "Divorciado(a)";
    if (/viuv/.test(s)) return "Viúvo(a)";
    return "Solteiro(a)";
  }
  // normalmente sai da forma de pagamento da entrada, mas o campo
  // formaReembolso da ficha manda quando estiver preenchido (pagamento misto)
  function formaReembolso(c) {
    var manual = txt(c.formaReembolso);
    if (/reembolso/i.test(manual) && /estorno/i.test(manual)) return "Reembolso + Estorno";
    if (/estorno/i.test(manual)) return "Estorno Cartão";
    if (/cheque/i.test(manual)) return "Cheque";
    if (/reembolso/i.test(manual)) return "Reembolso";

    var s = semAcento(c.formaPagamentoEntrada);
    if (/cheque/.test(s)) return "Cheque";
    // o que decide é o INSTRUMENTO PRINCIPAL (o 1º pagamento, antes do "+"),
    // não o "recorrente" que vem depois. Cartão principal -> estorno;
    // depósito/TED/PIX/débito principal -> devolução por transferência.
    var principal = s.split("+")[0];
    if (/deposit|transfer|ted|doc|pix|boleto|debito/.test(principal)) return "Reembolso";
    if (/cartao|credito/.test(principal)) return "Estorno Cartão";
    // sem instrumento claro no início: cai para o que houver
    if (/cartao|credito/.test(s)) return "Estorno Cartão";
    return "Reembolso";
  }
  // a cota/unidade nem sempre é número (ex.: "Cota SP/I") — leva o rótulo na frente
  // a não ser que o próprio valor já venha com ele
  function blocoRotulado(c) {
    var b = txt(c.bloco);
    if (!b) return "";
    return /^(bloco|torre|quadra)\b/i.test(b) ? b : "Bloco " + b;
  }
  function andarRotulado(c) {
    var a = txt(c.andar);
    if (!a) return "";
    if (/^t$/i.test(a)) return "térreo";
    if (/^\d+$/.test(a)) return a + "º andar";
    return a;   // já vem escrito, ex.: "2º pavimento"
  }
  // o modelo do distrato não tem campo de bloco nem de andar: os dois vão
  // junto da unidade, que é texto livre —> "Apartamento 103, 1º andar, Bloco A1"
  // se a devolução é estorno mas o pagamento foi no débito, a frase do documento
  // tem que dizer débito — o modelo do distrato traz "cartão de crédito" fixo
  function meioDoEstorno(c) {
    if (formaReembolso(c) !== "Estorno Cartão") return "";
    var s = semAcento(c.formaPagamentoEntrada);
    if (/debito/.test(s) && !/credito/.test(s)) return "o estorno no cartão de débito";
    return "";
  }

  function unidadeDistrato(c) {
    var ap = txt(c.apartamento);
    var bl = blocoRotulado(c);
    var an = andarRotulado(c);
    if (!ap) return [an, bl].filter(Boolean).join(", ");
    var u = /^(apartamento|apto|unidade|uh)\b/i.test(ap) ? ap : "Apartamento " + ap;
    return [u, an, bl].filter(Boolean).join(", ");
  }
  function cotaDistrato(c) {
    if (!c.cota) return "";
    return /^cota\b/i.test(c.cota) ? c.cota : "Cota " + c.cota;
  }

  // abre a URL numa aba nova SEM tirar o foco da atual (simula Ctrl/Cmd+clique)
  function abrirEmSegundoPlano(url) {
    var a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.dispatchEvent(new MouseEvent("click", {
      bubbles: true, cancelable: true, view: window,
      ctrlKey: true, metaKey: true   // ctrl no Windows, cmd no Mac -> abre atrás
    }));
    document.body.removeChild(a);
  }

  function gerarDistrato(id, novaGuia) {
    var c = acharCliente(id);
    if (!c) return;

    var chave = c.empresa === "WAM" ? "termo-distrato-wam-v6" : "termo-distrato-v8";
    var pasta = c.empresa === "WAM" ? "termo-distrato-wam" : "termo-distrato";

    var valorNum = num(c.valorPago);
    var valorStr = valorNum === null ? "" : moeda(valorNum);
    var extenso = valorNum === null ? "" : valorPorExtenso(valorNum);
    var forma = formaReembolso(c);
    var temConj = !!c.conjuge.nome;
    var ec = estadoCivilSelect(c.estadoCivil);
    if (temConj && ec !== "Casado(a)" && ec !== "União estável") ec = "Casado(a)";

    // aproveita o que já está salvo na ferramenta de distrato (documento e ajustes do logo)
    var anterior = {};
    try { anterior = JSON.parse(localStorage.getItem(chave) || "{}") || {}; } catch (e) {}
    var antesCampos = anterior.campos || {};

    var campos = {
      f_nome: c.nome,
      f_nac: c.nacionalidade || "brasileiro(a)",
      f_ec: ec,
      f_rg: c.rg,
      f_cpf: c.cpf,
      f_fracao: c.fracao || "1/52",
      f_unidade: unidadeDistrato(c),
      f_cota: cotaDistrato(c),
      f_local: c.localizacao,
      f_edificio: c.empreendimento,
      f_empresa: c.razaoSocial,
      f_cnpj: c.cnpj,
      f_forma: forma,
      f_valor: valorStr,
      f_extenso: extenso,
      f_pix: c.pix,
      f_conj_nome: c.conjuge.nome,
      f_conj_nac: "brasileiro(a)",
      f_conj_rg: c.conjuge.rg,
      f_conj_cpf: c.conjuge.cpf,
      f_logo_align: antesCampos.f_logo_align || "right",
      f_logo_size: antesCampos.f_logo_size || "62",
      f_logo_top: antesCampos.f_logo_top || "0",
      f_logo_bottom: antesCampos.f_logo_bottom || "6"
    };

    // Campos extras para modo misto (Reembolso + Estorno)
    // Estratégia: identifica a porção de cartão de CRÉDITO (estorno) e
    // calcula reembolso = valorPago − estorno. Aceita 2 formatos de ficha:
    //   - parcelas: [{ tipo, qtd, valor, forma, vencimento }] — formato antigo
    //   - entradas: [{ descricao, valor }] — formato novo (a forma é extraída da descricao)
    if (forma === "Reembolso + Estorno") {
      // Normaliza tudo pra um array uniforme { qtd, valor, forma }
      var itens = [];
      if (c.parcelas && c.parcelas.length) {
        itens = c.parcelas.map(function (p) {
          return { qtd: p.qtd || 1, valor: p.valor || 0, forma: p.forma || "" };
        });
      } else if (c.entradas && c.entradas.length) {
        itens = c.entradas.map(function (e) {
          // Descobre qtd a partir de "3x R$ 100" na descrição, mas o valor
          // unitário SEMPRE sai de e.valor (que já é numérico e correto).
          // Assim "1x R$ 9.200" com e.valor=9200 dá qtd=1, valor=9200 (não 9,20).
          var m = String(e.descricao || "").match(/(\d+)\s*x\s*R?\$?\s*[\d.,]+/i);
          var qtd = m ? parseInt(m[1], 10) : 1;
          var valorTotal = e.valor || 0;
          var valorUn = qtd > 0 ? valorTotal / qtd : valorTotal;
          return { qtd: qtd, valor: valorUn, forma: e.descricao || "" };
        });
      }

      var cartaoCredTotal = 0, meioReemb = "", qtdParc = 0, valParc = 0;
      for (var pi = 0; pi < itens.length; pi++) {
        var pp = itens[pi];
        var pf = semAcento(pp.forma || "");
        // crédito vai pro estorno; débito NÃO (débito = reembolso)
        // "recorrente" via GALAX/CREDAV também é cartão de crédito
        var ehCredito = (/credito|cartao\s+credito|recorrente|credav|galax/.test(pf) && !/debito/.test(pf));
        if (ehCredito) {
          cartaoCredTotal += (pp.qtd || 1) * (pp.valor || 0);
          qtdParc += (pp.qtd || 0);
          valParc = pp.valor || 0;
        } else if (!meioReemb) {
          // deduz o "meio" pelo 1º pagamento não-crédito
          if (/pix/.test(pf)) meioReemb = "PIX";
          else if (/ted/.test(pf)) meioReemb = "TED";
          else if (/deposit/.test(pf)) meioReemb = "depósito";
          else if (/boleto|debito/.test(pf)) meioReemb = "TED/DOC/depósito";
        }
      }
      var reembTotal = (valorNum || 0) - cartaoCredTotal;
      if (reembTotal < 0) reembTotal = 0;
      campos.f_valor_reemb = reembTotal ? moeda(reembTotal) : "";
      campos.f_meio_reemb = meioReemb || "PIX";
      campos.f_qtd_parcelas = qtdParc ? String(qtdParc) : "";
      campos.f_valor_parcela = valParc ? moeda(valParc) : "";
    }

    // usa docHTML salvo só se tiver o template novo (pv_imoveis), senão força docBase
    var htmlBase = anterior.docHTML && anterior.docHTML.indexOf("pv_imoveis") !== -1
      ? anterior.docHTML : docBase(c.empresa);
    var docHTML = preencherDoc(htmlBase, campos, temConj, clausulasDoDistrato(c), meioDoEstorno(c));

    try {
      localStorage.setItem(chave, JSON.stringify({ campos: campos, temConj: temConj, docHTML: docHTML, imoveisExtra: [] }));
    } catch (e) {
      alert("Não consegui gravar os dados no navegador. Abra o distrato e preencha à mão.");
      return;
    }

    // nova guia: abre ATRÁS (segundo plano) e mantém você na lista
    if (novaGuia) {
      abrirEmSegundoPlano("../" + pasta + "/index.html");
      return;
    }

    // navega para a ferramenta de distrato (dentro do app, se estiver no app)
    try {
      if (window.top !== window.self) {
        window.top.location.href = "../../index.html#tool/" + pasta;
        return;
      }
    } catch (e) { /* sem acesso ao topo: abre no próprio quadro */ }
    location.href = "../" + pasta + "/index.html";
  }

  // Distrato para grupo de contratos (múltiplos imóveis)
  function gerarDistratoGrupo(ids) {
    var clientes = ids.map(function (id) { return acharCliente(id); }).filter(Boolean);
    if (!clientes.length) return;

    // usa o primeiro contrato como base para dados pessoais
    var c = clientes[0];
    var chave = c.empresa === "WAM" ? "termo-distrato-wam-v6" : "termo-distrato-v8";
    var pasta = c.empresa === "WAM" ? "termo-distrato-wam" : "termo-distrato";

    // soma valorPago de todos
    var valorTotal = clientes.reduce(function (s, cl) { return s + (num(cl.valorPago) || 0); }, 0);
    var valorStr = valorTotal === 0 ? "" : moeda(valorTotal);
    var extenso = valorTotal === 0 ? "" : valorPorExtenso(valorTotal);
    var forma = formaReembolso(c);
    var temConj = !!c.conjuge.nome;
    var ec = estadoCivilSelect(c.estadoCivil);
    if (temConj && ec !== "Casado(a)" && ec !== "União estável") ec = "Casado(a)";

    // imóvel principal = primeiro contrato, extras = restantes
    var imoveisExtra = [];
    for (var i = 1; i < clientes.length; i++) {
      imoveisExtra.push({
        unidade: unidadeDistrato(clientes[i]),
        cota: cotaDistrato(clientes[i])
      });
    }

    var anterior = {};
    try { anterior = JSON.parse(localStorage.getItem(chave) || "{}") || {}; } catch (e) {}
    var antesCampos = anterior.campos || {};

    var campos = {
      f_nome: c.nome,
      f_nac: c.nacionalidade || "brasileiro(a)",
      f_ec: ec,
      f_rg: c.rg,
      f_cpf: c.cpf,
      f_fracao: c.fracao || "1/52",
      f_unidade: unidadeDistrato(c),
      f_cota: cotaDistrato(c),
      f_local: c.localizacao,
      f_edificio: c.empreendimento,
      f_empresa: c.razaoSocial,
      f_cnpj: c.cnpj,
      f_forma: forma,
      f_valor: valorStr,
      f_extenso: extenso,
      f_pix: c.pix,
      f_conj_nome: c.conjuge.nome,
      f_conj_nac: "brasileiro(a)",
      f_conj_rg: c.conjuge.rg,
      f_conj_cpf: c.conjuge.cpf,
      f_logo_align: antesCampos.f_logo_align || "right",
      f_logo_size: antesCampos.f_logo_size || "62",
      f_logo_top: antesCampos.f_logo_top || "0",
      f_logo_bottom: antesCampos.f_logo_bottom || "6",
      _imoveisExtra: imoveisExtra
    };

    var clausulas = clausulasDoDistrato(c);
    var meio = meioDoEstorno(c);
    // sempre usa template novo (docBase) pra garantir que pv_imoveis existe
    var docHTML = preencherDoc(docBase(c.empresa), campos, temConj, clausulas, meio);

    try {
      localStorage.setItem(chave, JSON.stringify({
        campos: campos,
        temConj: temConj,
        docHTML: docHTML,
        imoveisExtra: imoveisExtra
      }));
    } catch (e) {
      alert("Não consegui gravar os dados no navegador. Abra o distrato e preencha à mão.");
      return;
    }

    // navega para a ferramenta de distrato
    try {
      if (window.top !== window.self) {
        window.top.location.href = "../../index.html#tool/" + pasta;
        return;
      }
    } catch (e) {}
    location.href = "../" + pasta + "/index.html";
  }

  // Repete no HTML do documento o que a ferramenta de distrato faz ao preencher.
  function preencherDoc(html, f, temConj, clausula, meio) {
    var doc = new DOMParser().parseFromString('<div id="__wrap">' + html + "</div>", "text/html");
    var box = doc.getElementById("__wrap");
    if (!box) return html;

    function set(id, v) { var el = box.querySelector("#" + id); if (el) el.textContent = v; }
    function ou(v, alt) { v = txt(v); return v === "" ? alt : v; }

    var nome = ou(f.f_nome, "NOME DO CLIENTE");
    set("pv_nome", nome);
    set("pv_nome_ass", nome);
    set("pv_nac", ou(f.f_nac, "brasileiro(a)"));
    set("pv_ec", ou(f.f_ec, "Solteiro(a)"));
    set("pv_rg", ou(f.f_rg, "—"));
    set("pv_cpf", ou(f.f_cpf, "—"));
    set("pv_fracao", ou(f.f_fracao, "—"));

    // pv_imoveis: span que contém unidade(s) + cota(s)
    var spanIm = box.querySelector("#pv_imoveis");
    if (spanIm) {
      var u1 = ou(f.f_unidade, "—"), c1 = ou(f.f_cota, "—");
      var extras = f._imoveisExtra || [];
      if (extras.length === 0) {
        spanIm.innerHTML = "<b>" + esc(u1) + "</b>, nominado <b>" + esc(c1) + "</b>,";
      } else {
        var todos = [{ unidade: u1, cota: c1 }].concat(extras);
        var partes = [];
        for (var pi = 0; pi < todos.length; pi++) {
          partes.push("<b>" + esc(todos[pi].unidade || "—") + "</b> (<b>" + esc(todos[pi].cota || "—") + "</b>)");
        }
        var joined;
        if (partes.length === 2) joined = partes[0] + " e " + partes[1];
        else joined = partes.slice(0, -1).join(", ") + " e " + partes[partes.length - 1];
        spanIm.innerHTML = joined + ",";
      }
    } else {
      // fallback: template antigo com pv_unidade / pv_cota separados
      set("pv_unidade", ou(f.f_unidade, "—"));
      set("pv_cota", ou(f.f_cota, "—"));
    }

    set("pv_edificio", ou(f.f_edificio, "—"));
    set("pv_local", ou(f.f_local, "—"));
    set("pv_empresa", ou(f.f_empresa, "—"));
    set("pv_cnpj", ou(f.f_cnpj, "—"));
    set("pv_pix", txt(f.f_pix));
    set("pv_data", dataBR(hojeISO()) + ".");

    var spanConj = box.querySelector("#pv_conjuge");
    var assConj = box.querySelector("#assConjuge");
    if (temConj) {
      if (spanConj) {
        spanConj.innerHTML = ", e <b class='up'>" + esc(ou(f.f_conj_nome, "NOME DO CÔNJUGE")) + "</b>, " +
          esc(ou(f.f_conj_nac, "brasileiro(a)")) + ", " + esc(ou(f.f_ec, "Casado(a)")) +
          ", titular da CI/RG <b>" + esc(ou(f.f_conj_rg, "—")) + "</b> e do CPF: <b>" + esc(ou(f.f_conj_cpf, "—")) + "</b>";
      }
      set("pv_verbo", "manifestamos");
      set("pv_nome_conj_ass", ou(f.f_conj_nome, "NOME DO CÔNJUGE"));
      if (assConj) assConj.removeAttribute("hidden");
    } else {
      if (spanConj) spanConj.innerHTML = "";
      set("pv_verbo", "manifesto");
      if (assConj) assConj.setAttribute("hidden", "");
    }

    var valorStr = txt(f.f_valor) || "0,00";
    set("pv_valor", valorStr);
    set("pv_extenso", ou(f.f_extenso, "—"));

    var MEIOS = {
      "Reembolso": "a devolução por transferência bancária",
      "Estorno Cartão": "o estorno no cartão de crédito",
      "Cheque": "a devolução por cheque"
    };
    // meio passa por fora quando a ficha pede outra redação
    // (ex.: pagamento no débito, para não sair "cartão de crédito")
    set("pv_meio", txt(meio) || MEIOS[f.f_forma] || MEIOS["Reembolso"]);

    var linhaPix = box.querySelector("#linhaPix");
    if (linhaPix) {
      if (f.f_forma === "Estorno Cartão") linhaPix.setAttribute("hidden", "");
      else linhaPix.removeAttribute("hidden");
    }

    ["estorno", "reemb", "cheque"].forEach(function (k) {
      set("ck_" + k, " ");
      set("val_" + k, "XXXX,00");
      var op = box.querySelector("#op_" + k);
      if (op) op.classList.remove("ativa");
    });
    var k = f.f_forma === "Estorno Cartão" ? "estorno" : (f.f_forma === "Cheque" ? "cheque" : "reemb");
    set("ck_" + k, "X");
    set("val_" + k, valorStr);
    var op = box.querySelector("#op_" + k);
    if (op) op.classList.add("ativa");

    aplicarClausula(box, doc, clausula);

    return box.innerHTML;
  }

  // cláusulas entram como parágrafos logo abaixo do valor.
  // Regera do zero a cada geração, então nunca duplica nem deixa texto órfão.
  function aplicarClausula(box, doc, clausulas) {
    var lista = (clausulas || []).filter(function (t) { return txt(t); });

    Array.prototype.forEach.call(box.querySelectorAll("[id^='pv_clausula']"), function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    if (!lista.length) return;

    var pValor = box.querySelector("#pv_valor");
    while (pValor && pValor.tagName !== "P") pValor = pValor.parentNode;
    if (!pValor || !pValor.parentNode) return;

    var depois = pValor.nextSibling;
    lista.forEach(function (texto, i) {
      var p = doc.createElement("p");
      p.className = "doc-p doc-p--bold";
      p.id = "pv_clausula" + (i ? i + 1 : "");
      p.textContent = txt(texto);
      pValor.parentNode.insertBefore(p, depois);
    });
  }

  /* ---------- Eventos ---------- */
  $("grid").addEventListener("click", function (e) {
    // excluir reembolso direto no card da aba Reembolsos
    var delR = e.target.closest("[data-excluir-reemb]");
    if (delR) {
      if (!confirm("Excluir este registro de reembolso?")) return;
      excluirReembolso(delR.getAttribute("data-excluir-reemb"));
      renderTudo();
      return;
    }
    var compBt = e.target.closest("[data-acao='abrir-comprovante']");
    if (compBt) {
      var alvo = null, idR = compBt.getAttribute("data-reemb");
      reembolsos().forEach(function (r) { if (r.id === idR) alvo = r; });
      if (alvo) {
        var cl = acharCliente(alvo.clienteId);
        if (cl) enfileirarComprovante(cl, alvo);
      }
      abrirComprovante(compBt.getAttribute("data-empresa"));
      return;
    }
    // arquivar/reabrir direto no card, sem abrir a ficha
    var arqBt = e.target.closest("[data-arquivar]");
    if (arqBt) {
      arquivar(arqBt.getAttribute("data-arquivar"), arqBt.getAttribute("data-arq") === "0");
      renderTudo();
      return;
    }
    // marcar/desmarcar pago
    var pgBt = e.target.closest("[data-pago]");
    if (pgBt) {
      e.stopPropagation();
      marcarPago(pgBt.getAttribute("data-pago"), pgBt.getAttribute("data-pg") === "0");
      renderTudo();
      return;
    }
    var bt = e.target.closest("[data-acao='email-grupo']");
    if (bt) { abrirEmail(bt.getAttribute("data-ids").split("|")); return; }

    var rb = e.target.closest("[data-acao='reembolso-grupo']");
    if (rb) { formReembolso(rb.getAttribute("data-ids").split("|")); return; }

    var dg = e.target.closest("[data-acao='distrato-grupo']");
    if (dg) { gerarDistratoGrupo(dg.getAttribute("data-ids").split("|")); return; }

    // botões de ação da própria caixa (não abrem a ficha)
    var acaoBt = e.target.closest(".ficha__botoes [data-acao]");
    if (acaoBt) {
      var ac = acaoBt.getAttribute("data-acao"), idc = acaoBt.getAttribute("data-id");
      if (ac === "distrato") gerarDistrato(idc, acaoBt.getAttribute("data-nova") === "1");
      else if (ac === "email") abrirEmail([idc]);
      else if (ac === "ver-contrato") {
        var cli = acharCliente(idc), pdf = cli ? contratoDe(cli) : "";
        if (pdf) window.open(pdf, "_blank");
      }
      return;
    }

    var card = e.target.closest(".ficha");
    if (card) verCliente(card.getAttribute("data-id"));
  });

  // teclado: Enter/Espaço abre a ficha (o card não é mais um <button>)
  $("grid").addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var card = e.target.closest ? e.target.closest(".ficha") : null;
    if (!card || e.target !== card) return;
    e.preventDefault();
    verCliente(card.getAttribute("data-id"));
  });

  $("busca").addEventListener("input", function () { termo = this.value; renderGrid(); });

  $("chipsEmpresa").addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;
    filtroEmpresa = chip.getAttribute("data-empresa");
    Array.prototype.forEach.call(this.querySelectorAll(".chip"), function (c) {
      c.classList.toggle("ativo", c === chip);
    });
    renderGrid();
  });

  $("chipsStatus").addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;
    filtroStatus = chip.getAttribute("data-status");
    Array.prototype.forEach.call(this.querySelectorAll(".chip"), function (c) {
      c.classList.toggle("ativo", c === chip);
    });
    renderTudo();
  });

  $("btnNovo").addEventListener("click", function () { editarCliente(null, true); });
  $("btnEmail").addEventListener("click", function () { abrirEmail([]); });

  $("btnReabrirTodos").addEventListener("click", function () {
    var n = Object.keys(store.arquivados || {}).length;
    if (!n) return;
    if (!confirm("Reabrir os " + n + " contratos arquivados?")) return;
    store.arquivados = {};
    gravarStore(store);
    filtroStatus = "ativos";
    Array.prototype.forEach.call($("chipsStatus").querySelectorAll(".chip"), function (c) {
      c.classList.toggle("ativo", c.getAttribute("data-status") === "ativos");
    });
    renderTudo();
  });
  $("btnExportar").addEventListener("click", exportar);

  $("modal").addEventListener("click", function (e) {
    if (e.target.closest("[data-fechar]")) { fecharModal(); return; }

    var delR = e.target.closest("[data-excluir-reemb]");
    if (delR) {
      if (!confirm("Excluir este registro de reembolso?")) return;
      var idCliente = $("mdRodape").querySelector("[data-id]");
      idCliente = idCliente ? idCliente.getAttribute("data-id") : null;
      excluirReembolso(delR.getAttribute("data-excluir-reemb"));
      renderTudo();
      if (idCliente) verCliente(idCliente);
      return;
    }

    var aba = e.target.closest("[data-modo]");
    if (aba) { emailModo = aba.getAttribute("data-modo"); renderEmail(); return; }

    var b = e.target.closest("[data-acao]");
    if (!b) return;
    var acao = b.getAttribute("data-acao");
    var id = b.getAttribute("data-id");

    if (acao === "editar") editarCliente(id, false);
    else if (acao === "ver-ficha") verCliente(id);
    else if (acao === "salvar") salvarEdicao(b.getAttribute("data-criando") === "1");
    else if (acao === "distrato") gerarDistrato(id, b.getAttribute("data-nova") === "1");
    else if (acao === "email") abrirEmail([id]);
    else if (acao === "novo-reembolso") formReembolso(b.getAttribute("data-ids") || id);
    else if (acao === "salvar-reembolso") salvarFormReembolso(b.getAttribute("data-ids"), b.getAttribute("data-imovel"), b.getAttribute("data-abrir") === "1");
    else if (acao === "copiar-cola") copiarDe("reembCola", b, "Copiar dados");
    else if (acao === "abrir-comprovante") abrirComprovante(b.getAttribute("data-empresa"));
    else if (acao === "arquivar" || acao === "desarquivar") {
      arquivar(id, acao === "arquivar");
      renderTudo();
      verCliente(id);
    }
    else if (acao === "copiar") copiarDe("codigoExport", b, "Copiar código");
    else if (acao === "copiar-para") copiarDe("emPara", b, "Copiar e-mail");
    else if (acao === "copiar-assunto") copiarDe("emAssunto", b, "Copiar assunto");
    else if (acao === "copiar-link") copiarDe("emLink", b, "Copiar link");
    else if (acao === "copiar-corpo") copiarDe("emCorpo", b, "Copiar corpo");
    else if (acao === "copiar-whats") copiarDe("emWhats", b, "Copiar mensagem");
    else if (acao === "abrir-whats") {
      // abre a conversa com o texto pronto — quem envia é você, dentro do WhatsApp
      var msg = $("emWhats") ? $("emWhats").value : "";
      window.open("https://wa.me/" + b.getAttribute("data-tel") + "?text=" + encodeURIComponent(msg), "_blank");
    }
    else if (acao === "excluir") {
      if (!confirm("Excluir este cliente? (ele foi criado aqui, não está no clientes.js)")) return;
      store.novos = store.novos.filter(function (c) { return c.id !== id; });
      gravarStore(store); fecharModal(); renderTudo();
    } else if (acao === "restaurar") {
      if (!confirm("Desfazer as edições feitas aqui e voltar aos dados do clientes.js?")) return;
      delete store.edits[id];
      gravarStore(store); renderTudo(); verCliente(id);
    }
  });

  // marcar/desmarcar quais distratos entram no e-mail
  $("modal").addEventListener("change", function (e) {
    var cb = e.target;
    if (cb && cb.id === "chkCorrigido") { emailCorrigido = cb.checked; renderEmail(); return; }
    if (!emailSel || !cb.getAttribute || !cb.getAttribute("data-pick")) return;
    var id = cb.getAttribute("data-pick");
    if (cb.checked) emailSel[id] = true; else delete emailSel[id];
    renderEmail();
  });

  function copiarDe(idCampo, botao, textoOriginal) {
    var el = $(idCampo);
    if (!el) return;
    el.focus();
    el.select();
    if (el.setSelectionRange) el.setSelectionRange(0, 999999);
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) {}
    botao.textContent = ok ? "Copiado!" : "Selecione e copie (Ctrl+C)";
    setTimeout(function () { botao.textContent = textoOriginal; }, 2500);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !$("modal").hidden) fecharModal();
  });

  /* ---------- Início ---------- */
  function renderTudo() { renderAvisoDuplicatas(); renderResumo(); renderGrid(); }
  renderTudo();
})();
