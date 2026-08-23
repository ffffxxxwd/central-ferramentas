/* ============================================================
   Leads do WhatsApp — organizador (painel da extensão)
   ------------------------------------------------------------
   Igual ao da Central, mas guarda os dados em chrome.storage
   (pra compartilhar com a captura do WhatsApp Web) e puxa
   sozinho os contatos que você salvou pelo botão "＋ Salvar".
   ============================================================ */
(function () {
  "use strict";

  var STATUS = [
    { id: "novo",        nome: "Novo" },
    { id: "conversando", nome: "Em conversa" },
    { id: "proposta",    nome: "Proposta" },
    { id: "fechado",     nome: "Fechado" },
    { id: "perdido",     nome: "Perdido" }
  ];
  var STATUS_MAP = {};
  STATUS.forEach(function (s) { STATUS_MAP[s.id] = s; });

  var PALETA = ["#e5484d","#f76b15","#c99700","#17994f","#0d9488","#2f6fed","#7c5cff","#d6409f","#6b7280"];

  var state = { leads: [], view: "lista", filtro: "todos", busca: "" };
  var editId = null, drawerDraft = null, drawerCorSel = PALETA[0], toastTimer = null;
  var el = {};

  /* ---------- Utilidades ---------- */
  function pad(n){ return n < 10 ? "0" + n : "" + n; }
  function uid(){ return "l" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function agora(){ return new Date().toISOString(); }
  function hojeISO(){ var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth()+1) + "-" + pad(d.getDate()); }
  function maisDias(n){ var d = new Date(); d.setDate(d.getDate()+n); return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate()); }
  function clonar(o){ return JSON.parse(JSON.stringify(o)); }

  function soDigitos(s){ return String(s == null ? "" : s).replace(/\D/g, ""); }
  function numeroWhats(tel){
    var d = soDigitos(tel);
    if (!d) return "";
    if (d.length === 10 || d.length === 11) d = "55" + d;
    return d;
  }
  function linkWhats(tel, msg){
    var n = numeroWhats(tel);
    if (!n) return "";
    var base = "https://wa.me/" + n;
    return msg ? base + "?text=" + encodeURIComponent(msg) : base;
  }
  function diasAte(iso){
    if (!iso) return null;
    var p = iso.split("-");
    if (p.length !== 3) return null;
    var alvo = new Date(+p[0], +p[1]-1, +p[2]);
    var hoje = new Date(); hoje.setHours(0,0,0,0);
    return Math.round((alvo - hoje) / 86400000);
  }
  function fmtData(iso){
    if (!iso) return "";
    var p = iso.split("-");
    return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : iso;
  }
  function fmtDataHora(iso){
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return pad(d.getDate()) + "/" + pad(d.getMonth()+1) + "/" + d.getFullYear() + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }
  function followupInfo(iso){
    var d = diasAte(iso);
    if (d === null) return null;
    var quando;
    if (d < 0)       { quando = fmtData(iso) + " (atrasado " + Math.abs(d) + (Math.abs(d) === 1 ? " dia" : " dias") + ")"; }
    else if (d === 0){ quando = "hoje"; }
    else if (d === 1){ quando = "amanhã"; }
    else if (d <= 7) { quando = fmtData(iso) + " (em " + d + " dias)"; }
    else             { quando = fmtData(iso); }
    return { cls: d < 0 ? "atrasado" : (d === 0 ? "hoje" : "futuro"), quando: quando, dias: d };
  }
  function escapeHtml(s){
    return String(s == null ? "" : s)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function chaveEtq(t){ return (t.cor || "") + "|" + (t.texto || ""); }
  function tagInline(t){
    if (t.texto){
      return '<span class="tag" style="border-color:' + t.cor + ';color:' + t.cor + '">' +
        '<span class="tag-dot" style="background:' + t.cor + '"></span>' + escapeHtml(t.texto) + "</span>";
    }
    return '<span class="dotflag" style="background:' + t.cor + '" title="etiqueta"></span>';
  }

  /* ---------- Persistência (chrome.storage) ---------- */
  function carregar(cb){
    chrome.storage.local.get({ leads: [] }, function (res){
      state.leads = Array.isArray(res.leads) ? res.leads : [];
      if (cb) cb();
    });
  }
  function salvar(){ chrome.storage.local.set({ leads: state.leads }); }

  // Puxa os contatos capturados no WhatsApp Web (fila) para a lista
  function drenarFila(cb){
    chrome.storage.local.get({ filaCapturas: [] }, function (res){
      var fila = res.filaCapturas || [];
      if (!fila.length){ if (cb) cb(0); return; }
      var criados = 0;
      fila.forEach(function (it){
        if (!it) return;
        var tel = it.telefone || "", nome = it.nome || "";
        if (!tel && !nome) return;
        if (!nome && tel) nome = tel;
        if (tel){
          var norm = numeroWhats(tel);
          if (state.leads.some(function (l){ return l.telefone && numeroWhats(l.telefone) === norm; })) return;
        }
        var etq = Array.isArray(it.etiquetas) ? it.etiquetas.filter(function (t){ return t && t.cor; }) : [];
        var l = { id:uid(), nome:nome, telefone:tel, email:"", empresa:"", status: it.status || "novo",
                  proximaAcao:"", proximaAcaoNota:"", observacoes: it.observacoes || "", etiquetas: etq,
                  historico:[], criadoEm:agora(), atualizadoEm:agora() };
        addHist(l, "Recebido do WhatsApp");
        state.leads.push(l);
        criados++;
      });
      chrome.storage.local.set({ leads: state.leads, filaCapturas: [] }, function (){
        if (criados){ render(); toast(criados === 1 ? "1 contato novo do WhatsApp." : criados + " contatos novos do WhatsApp."); }
        if (cb) cb(criados);
      });
    });
  }

  /* ---------- Tema ---------- */
  function aplicarTema(){
    chrome.storage.local.get({ tema: "claro" }, function (res){
      document.documentElement.setAttribute("data-tema", res.tema === "escuro" ? "escuro" : "claro");
    });
  }
  function alternarTema(){
    chrome.storage.local.get({ tema: "claro" }, function (res){
      var novo = res.tema === "escuro" ? "claro" : "escuro";
      chrome.storage.local.set({ tema: novo }, function (){ document.documentElement.setAttribute("data-tema", novo); });
    });
  }

  /* ---------- Operações ---------- */
  function obter(id){
    for (var i = 0; i < state.leads.length; i++){ if (state.leads[i].id === id) return state.leads[i]; }
    return null;
  }
  function addHist(lead, texto){
    if (!lead.historico) lead.historico = [];
    lead.historico.unshift({ data: agora(), texto: texto });
  }
  function concluirFollowup(id){
    var l = obter(id); if (!l) return;
    addHist(l, "Concluído: " + (l.proximaAcaoNota || "follow-up"));
    l.proximaAcao = ""; l.proximaAcaoNota = ""; l.atualizadoEm = agora();
    salvar(); render();
    toast("Follow-up concluído. Marque o próximo quando quiser.");
  }
  function excluir(id){
    var l = obter(id); if (!l) return;
    if (!confirm('Excluir "' + (l.nome || "") + '"? Isso não pode ser desfeito.')) return;
    state.leads = state.leads.filter(function (x){ return x.id !== id; });
    salvar();
    if (editId === id) fecharDrawer();
    render();
    toast("Contato excluído.");
  }
  function quickAdd(){
    if (!el.quick) return;
    var raw = el.quick.value;
    if (!raw.trim()){ toast("Cole um número ou nome pra adicionar."); return; }
    var criados = 0, dup = 0;
    raw.split(/[\n;]+/).forEach(function (linha){
      linha = linha.trim(); if (!linha) return;
      var digits = soDigitos(linha);
      var tel = digits.length >= 8 ? digits : "";
      var nome = linha.replace(/[+()\d.\-\s]{6,}/g, " ").replace(/\s+/g, " ").trim();
      if (!tel && !nome) return;
      if (tel){
        var norm = numeroWhats(tel);
        if (state.leads.some(function (l){ return l.telefone && numeroWhats(l.telefone) === norm; })){ dup++; return; }
      }
      var l = { id:uid(), nome:nome, telefone:tel, email:"", empresa:"", status:"novo",
                proximaAcao:"", proximaAcaoNota:"", observacoes:"", etiquetas:[], historico:[], criadoEm:agora(), atualizadoEm:agora() };
      addHist(l, "Adicionado rápido");
      state.leads.push(l);
      criados++;
    });
    el.quick.value = "";
    if (criados){ salvar(); render(); }
    if (criados) toast(criados === 1 ? "Contato adicionado." + (dup ? " (1 já existia)" : "") : criados + " contatos adicionados." + (dup ? " (" + dup + " já existiam)" : ""));
    else if (dup) toast("Esse contato já existe na lista.");
    else toast("Não achei um número nem nome pra salvar.");
  }

  function filtrados(){
    var b = state.busca.trim().toLowerCase();
    return state.leads.filter(function (l){
      if (state.filtro !== "todos" && l.status !== state.filtro) return false;
      if (b){
        var etq = (l.etiquetas || []).map(function (t){ return t.texto || ""; }).join(" ");
        var alvo = ((l.nome||"") + " " + (l.telefone||"") + " " + (l.email||"") + " " + (l.empresa||"") + " " + (l.observacoes||"") + " " + etq).toLowerCase();
        if (alvo.indexOf(b) < 0) return false;
      }
      return true;
    });
  }
  function ordenar(arr){
    return arr.slice().sort(function (a, b){
      var da = a.proximaAcao || "9999-99-99", db = b.proximaAcao || "9999-99-99";
      if (da !== db) return da < db ? -1 : 1;
      return (a.nome || "").localeCompare(b.nome || "");
    });
  }

  /* ---------- Render ---------- */
  function render(){ renderStats(); renderTabs(); renderFiltros(); renderView(); }

  function renderStats(){
    var total = state.leads.length, hoje = 0, atras = 0, fech = 0;
    state.leads.forEach(function (l){
      if (l.status !== "fechado" && l.status !== "perdido"){
        var d = diasAte(l.proximaAcao);
        if (d !== null){ if (d < 0) atras++; else if (d === 0) hoje++; }
      }
      if (l.status === "fechado") fech++;
    });
    var partes = [total + (total === 1 ? " contato" : " contatos")];
    partes.push(hoje + " para hoje");
    if (atras > 0) partes.push('<span class="sum-alert">' + atras + " atrasado" + (atras > 1 ? "s" : "") + "</span>");
    partes.push(fech + " fechado" + (fech !== 1 ? "s" : ""));
    el.stats.innerHTML = partes.join(' <span class="sum-sep">·</span> ');
  }
  function renderTabs(){
    var tabs = [ { id:"lista", nome:"Contatos" }, { id:"agenda", nome:"Agenda" } ];
    el.tabs.innerHTML = tabs.map(function (t){
      return '<button class="tab' + (state.view === t.id ? " active" : "") + '" data-acao="tab" data-id="' + t.id + '">' + t.nome + "</button>";
    }).join("");
  }
  function renderFiltros(){
    if (state.view !== "lista"){ el.filtros.innerHTML = ""; el.filtros.style.display = "none"; return; }
    el.filtros.style.display = "";
    var html = '<button class="chip' + (state.filtro === "todos" ? " active" : "") + '" data-acao="filtro" data-id="todos">Todos</button>';
    STATUS.forEach(function (s){
      var n = state.leads.filter(function (l){ return l.status === s.id; }).length;
      html += '<button class="chip' + (state.filtro === s.id ? " active" : "") + '" data-acao="filtro" data-id="' + s.id + '">' +
              escapeHtml(s.nome) + ' <span class="chip-num">' + n + "</span></button>";
    });
    el.filtros.innerHTML = html;
  }
  function renderView(){ if (state.view === "agenda") renderAgenda(); else renderLista(); }

  function renderLista(){
    var arr = ordenar(filtrados());
    if (!arr.length){ el.view.innerHTML = vazio(state.leads.length ? "Nenhum contato com esse filtro ou busca." : null); return; }
    el.view.innerHTML = '<div class="lista">' + arr.map(leadRow).join("") + "</div>";
  }
  function renderAgenda(){
    var abertos = state.leads.filter(function (l){ return l.status !== "fechado" && l.status !== "perdido"; });
    var atras = [], hoje = [], prox = [], sem = [];
    abertos.forEach(function (l){
      var d = diasAte(l.proximaAcao);
      if (d === null) sem.push(l);
      else if (d < 0) atras.push(l);
      else if (d === 0) hoje.push(l);
      else prox.push(l);
    });
    var ordD = function (a, b){ return (a.proximaAcao || "") < (b.proximaAcao || "") ? -1 : 1; };
    atras.sort(ordD); hoje.sort(ordD); prox.sort(ordD);
    var html = "";
    html += grupoAgenda("Atrasados", atras, "atrasado");
    html += grupoAgenda("Para hoje", hoje, "hoje");
    html += grupoAgenda("Próximos", prox, "futuro");
    html += grupoAgenda("Sem follow-up marcado", sem, "sem");
    if (!html){ html = vazio(state.leads.length ? "Nada na agenda — todos os contatos estão fechados ou sem follow-up." : null); }
    el.view.innerHTML = html;
  }
  function grupoAgenda(titulo, arr, cls){
    if (!arr.length) return "";
    return '<div class="ag-grupo ag-' + cls + '">' +
      '<div class="ag-titulo">' + titulo + " (" + arr.length + ")</div>" +
      '<div class="lista">' + arr.map(leadRow).join("") + "</div></div>";
  }

  function leadRow(l){
    var st = STATUS_MAP[l.status] || STATUS[0];
    var fu = followupInfo(l.proximaAcao);
    var wa = linkWhats(l.telefone);
    var meta = [];
    if (l.telefone) meta.push(escapeHtml(l.telefone));
    if (l.empresa)  meta.push(escapeHtml(l.empresa));
    if (l.email)    meta.push(escapeHtml(l.email));
    meta = meta.join("  ·  ");
    var tags = (l.etiquetas && l.etiquetas.length) ? '<div class="lead-tags">' + l.etiquetas.map(tagInline).join("") + "</div>" : "";
    var statusCls = (fu && fu.cls === "atrasado") ? " st-atrasado" : "";
    var follow = "";
    if (fu){
      var nota = l.proximaAcaoNota ? " — " + escapeHtml(l.proximaAcaoNota) : "";
      follow = '<div class="lead-follow ' + (fu.cls === "atrasado" ? "atrasado" : "") + '">Próximo: ' + fu.quando + nota + "</div>";
    }
    var obs = l.observacoes ? '<div class="lead-obs">' + escapeHtml(l.observacoes) + "</div>" : "";
    var dados = 'data-tel="' + escapeHtml(l.telefone || "") + '" data-nome="' + escapeHtml(l.nome || "") + '" data-id="' + l.id + '"';
    var acoes = "";
    acoes += '<button class="btn btn-sm" data-acao="abrir-conversa" ' + dados + '>Abrir conversa</button>';
    if (l.email)    acoes += '<a class="btn-link" href="mailto:' + escapeHtml(l.email) + '">E-mail</a>';
    if (l.telefone) acoes += '<button class="btn-link" data-acao="copiar" data-tel="' + escapeHtml(l.telefone) + '">Copiar nº</button>';
    if (fu && fu.dias <= 0) acoes += '<button class="btn-link alert" data-acao="concluir" data-id="' + l.id + '">Concluir</button>';
    acoes += '<button class="btn-link" data-acao="editar" data-id="' + l.id + '">Editar</button>';
    var mainAttrs = 'data-acao="abrir-conversa" ' + dados;
    return '<div class="lead">' +
      '<div class="lead-main" ' + mainAttrs + '>' +
        '<div class="lead-l1"><span class="lead-nome">' + escapeHtml(l.nome || "(sem nome)") + "</span>" +
          '<span class="lead-status' + statusCls + '">' + escapeHtml(st.nome) + "</span></div>" +
        tags + (meta ? '<div class="lead-meta">' + meta + "</div>" : "") + follow + obs +
      "</div>" +
      '<div class="lead-actions">' + acoes + "</div></div>";
  }

  function vazio(msg){
    if (msg){ return '<div class="empty"><p>' + escapeHtml(msg) + "</p></div>"; }
    return '<div class="empty">' +
      "<h2>Nenhum contato ainda</h2>" +
      "<p>Abra uma conversa no WhatsApp e clique em <b>＋ Salvar</b> no topo — o contato cai aqui. " +
      "Ou cole um número no campo de cima.</p>" +
      '<div class="empty-acts">' +
        '<button class="btn btn-primary" data-acao="novo">Novo contato</button>' +
        '<button class="btn" data-acao="exemplos">Ver com exemplos</button>' +
      "</div></div>";
  }

  /* ---------- Painel de edição ---------- */
  function abrirDrawer(id){
    editId = id || null;
    var base = id ? obter(id) : { nome:"", telefone:"", email:"", empresa:"", status:"novo", proximaAcao:"", proximaAcaoNota:"", observacoes:"", historico:[], etiquetas:[] };
    if (!base) return;
    drawerDraft = clonar(base);
    if (!drawerDraft.etiquetas) drawerDraft.etiquetas = [];
    drawerCorSel = PALETA[0];
    renderDrawer();
    el.drawer.classList.add("open");
    el.drawerOverlay.classList.add("show");
    var nn = document.getElementById("f_nome"); if (nn) nn.focus();
  }
  function renderDrawer(){ el.drawer.innerHTML = drawerHtml(drawerDraft); }
  function fecharDrawer(){
    editId = null; drawerDraft = null;
    el.drawer.classList.remove("open");
    el.drawerOverlay.classList.remove("show");
  }
  function coletarCampos(){
    if (!drawerDraft) return;
    drawerDraft.nome = val("f_nome");
    drawerDraft.telefone = val("f_tel");
    drawerDraft.email = val("f_email");
    drawerDraft.empresa = val("f_empresa");
    drawerDraft.status = val("f_status");
    drawerDraft.proximaAcao = val("f_data");
    drawerDraft.proximaAcaoNota = val("f_datanota");
    drawerDraft.observacoes = val("f_obs");
  }
  function val(id){ var e = document.getElementById(id); return e ? (e.value || "") : ""; }
  function campo(label, id, control){
    return '<label class="campo" for="' + id + '"><span class="campo-lab">' + escapeHtml(label) + "</span>" + control + "</label>";
  }
  function drawerHtml(l){
    var isEdit = !!editId;
    var stOpts = STATUS.map(function (s){ return '<option value="' + s.id + '"' + (s.id === l.status ? " selected" : "") + ">" + escapeHtml(s.nome) + "</option>"; }).join("");
    var hist = (isEdit && l.historico && l.historico.length)
      ? l.historico.map(function (h){ return '<div class="hist-item"><span class="hist-data">' + fmtDataHora(h.data) + "</span>" + escapeHtml(h.texto) + "</div>"; }).join("")
      : "";
    return '<div class="drawer-head"><h2>' + (isEdit ? "Editar contato" : "Novo contato") + "</h2>" +
        '<button class="icon-btn" data-acao="fechar-drawer" aria-label="Fechar">✕</button></div>' +
      '<div class="drawer-body">' +
        campo("Nome", "f_nome", '<input id="f_nome" type="text" value="' + escapeHtml(l.nome) + '" placeholder="Nome do cliente">') +
        campo("WhatsApp / Telefone", "f_tel", '<input id="f_tel" type="tel" value="' + escapeHtml(l.telefone) + '" placeholder="(11) 91234-5678">') +
        campo("E-mail", "f_email", '<input id="f_email" type="email" value="' + escapeHtml(l.email) + '" placeholder="cliente@email.com">') +
        campo("Empresa / origem", "f_empresa", '<input id="f_empresa" type="text" value="' + escapeHtml(l.empresa) + '" placeholder="Ex.: GAV, WAM, indicação...">') +
        campo("Status", "f_status", '<select id="f_status">' + stOpts + "</select>") +
        '<div class="campo-linha">' +
          campo("Falar de novo em", "f_data", '<input id="f_data" type="date" value="' + escapeHtml(l.proximaAcao) + '">') +
          campo("O que fazer", "f_datanota", '<input id="f_datanota" type="text" value="' + escapeHtml(l.proximaAcaoNota) + '" placeholder="Ex.: ligar, enviar contrato">') +
        "</div>" +
        campo("Observações", "f_obs", '<textarea id="f_obs" placeholder="Anotações que ficam à mostra na lista...">' + escapeHtml(l.observacoes) + "</textarea>") +
        etiquetasHtml(l) +
        (isEdit ?
          '<div class="hist-bloco"><div class="hist-head">Histórico</div>' +
            '<div class="hist-add"><input id="f_histnovo" type="text" placeholder="Registrar uma anotação rápida...">' +
              '<button class="btn btn-sm" data-acao="add-hist">Registrar</button></div>' +
            (hist ? '<div class="hist-list">' + hist + "</div>" : '<div class="hist-vazio">Nenhum registro ainda.</div>') +
          "</div>" : "") +
      "</div>" +
      '<div class="drawer-foot">' +
        (isEdit ? '<button class="btn btn-danger" data-acao="excluir" data-id="' + editId + '">Excluir</button>' : "<span></span>") +
        '<div class="foot-dir"><button class="btn" data-acao="fechar-drawer">Cancelar</button>' +
          '<button class="btn btn-primary" data-acao="salvar">Salvar</button></div>' +
      "</div>";
  }
  function etiquetasHtml(l){
    var atuais = l.etiquetas.length
      ? '<div class="etq-atuais">' + l.etiquetas.map(function (t, i){
          var txt = t.texto ? escapeHtml(t.texto) : "sem nome";
          return '<span class="etq-chip" style="border-color:' + t.cor + ';color:' + t.cor + '">' +
            '<span class="tag-dot" style="background:' + t.cor + '"></span>' + txt +
            '<button class="etq-x" data-acao="etq-rem" data-idx="' + i + '" aria-label="remover">×</button></span>';
        }).join("") + "</div>"
      : "";
    var swatches = PALETA.map(function (c){
      return '<button type="button" class="swatch' + (c === drawerCorSel ? " sel" : "") + '" data-acao="etq-cor" data-cor="' + c + '" style="background:' + c + '" aria-label="cor"></button>';
    }).join("");
    return '<div class="etq-bloco">' +
      '<span class="campo-lab">Etiquetas <span class="campo-hint">(cor que você escolhe)</span></span>' +
      atuais +
      '<div class="etq-add"><input id="f_etqtexto" type="text" placeholder="Nome da etiqueta (opcional)">' +
        '<div class="swatches">' + swatches + "</div>" +
        '<button class="btn btn-sm" data-acao="etq-add">Adicionar</button></div>' +
      sugestoesHtml(l) + "</div>";
  }
  function sugestoesHtml(l){
    var usadas = {}; l.etiquetas.forEach(function (t){ usadas[chaveEtq(t)] = 1; });
    var vistos = {}, sug = [];
    state.leads.forEach(function (c){
      (c.etiquetas || []).forEach(function (t){
        var k = chaveEtq(t);
        if (!vistos[k] && !usadas[k]){ vistos[k] = 1; sug.push(t); }
      });
    });
    if (!sug.length) return "";
    return '<div class="etq-sugs"><span class="etq-sugs-lab">Reutilizar:</span>' +
      sug.slice(0, 12).map(function (t){
        return '<button class="tag tag-btn" data-acao="etq-sug" data-k="' + escapeHtml(chaveEtq(t)) + '" style="border-color:' + t.cor + ';color:' + t.cor + '">' +
          '<span class="tag-dot" style="background:' + t.cor + '"></span>' + (t.texto ? escapeHtml(t.texto) : "cor") + "</button>";
      }).join("") + "</div>";
  }
  function marcarSwatch(){
    var sw = el.drawer.querySelectorAll(".swatch");
    for (var i = 0; i < sw.length; i++){ sw[i].classList.toggle("sel", sw[i].getAttribute("data-cor") === drawerCorSel); }
  }
  function etqAdd(){
    if (!drawerDraft) return;
    var inp = document.getElementById("f_etqtexto");
    var texto = inp ? inp.value.trim() : "";
    coletarCampos();
    drawerDraft.etiquetas.push({ texto: texto, cor: drawerCorSel });
    renderDrawer();
  }
  function etqRem(idx){
    if (!drawerDraft) return;
    idx = parseInt(idx, 10);
    coletarCampos();
    if (drawerDraft.etiquetas[idx]) drawerDraft.etiquetas.splice(idx, 1);
    renderDrawer();
  }
  function etqSug(k){
    if (!drawerDraft) return;
    var i = k.indexOf("|");
    var cor = i >= 0 ? k.slice(0, i) : k;
    var texto = i >= 0 ? k.slice(i + 1) : "";
    coletarCampos();
    drawerDraft.etiquetas.push({ texto: texto, cor: cor });
    renderDrawer();
  }
  function salvarDrawer(){
    if (!drawerDraft) return;
    coletarCampos();
    var nome = (drawerDraft.nome || "").trim();
    if (!nome){ toast("Coloque pelo menos o nome."); var n = document.getElementById("f_nome"); if (n) n.focus(); return; }
    drawerDraft.nome = nome;
    drawerDraft.telefone = (drawerDraft.telefone || "").trim();
    drawerDraft.email = (drawerDraft.email || "").trim();
    drawerDraft.empresa = (drawerDraft.empresa || "").trim();
    drawerDraft.proximaAcaoNota = (drawerDraft.proximaAcaoNota || "").trim();
    drawerDraft.observacoes = (drawerDraft.observacoes || "").trim();
    if (editId){
      var l = obter(editId); if (!l){ fecharDrawer(); return; }
      var statusMudou = l.status !== drawerDraft.status;
      var deStatus = (STATUS_MAP[l.status] || {}).nome;
      l.nome = drawerDraft.nome; l.telefone = drawerDraft.telefone; l.email = drawerDraft.email; l.empresa = drawerDraft.empresa;
      l.proximaAcao = drawerDraft.proximaAcao; l.proximaAcaoNota = drawerDraft.proximaAcaoNota; l.observacoes = drawerDraft.observacoes;
      l.status = drawerDraft.status; l.etiquetas = drawerDraft.etiquetas; l.atualizadoEm = agora();
      if (statusMudou) addHist(l, "Status: " + deStatus + " -> " + (STATUS_MAP[l.status] || {}).nome);
      toast("Contato atualizado.");
    } else {
      var novo = { id: uid(), nome: drawerDraft.nome, telefone: drawerDraft.telefone, email: drawerDraft.email, empresa: drawerDraft.empresa,
        status: drawerDraft.status, proximaAcao: drawerDraft.proximaAcao, proximaAcaoNota: drawerDraft.proximaAcaoNota,
        observacoes: drawerDraft.observacoes, etiquetas: drawerDraft.etiquetas, historico: [], criadoEm: agora(), atualizadoEm: agora() };
      addHist(novo, "Contato criado");
      state.leads.push(novo);
      toast("Contato salvo.");
    }
    salvar(); fecharDrawer(); render();
  }
  function addHistRapido(){
    if (!editId || !drawerDraft) return;
    var inp = document.getElementById("f_histnovo");
    var txt = inp ? inp.value.trim() : "";
    if (!txt) return;
    var l = obter(editId); if (!l) return;
    coletarCampos();
    addHist(l, txt); l.atualizadoEm = agora();
    drawerDraft.historico = clonar(l.historico);
    salvar(); renderDrawer(); render();
    var again = document.getElementById("f_histnovo"); if (again) again.focus();
  }

  /* ---------- Backup ---------- */
  function baixarArquivo(nome, conteudo, tipo){
    var blob = new Blob([conteudo], { type: tipo || "application/octet-stream" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = nome; document.body.appendChild(a); a.click();
    setTimeout(function (){ document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  }
  function exportJSON(){
    baixarArquivo("leads-backup-" + hojeISO() + ".json", JSON.stringify(state.leads, null, 2), "application/json");
    toast("Backup exportado.");
  }
  function exportCSV(){
    var linhas = [["Nome","Telefone","Email","Empresa","Status","FalarDeNovoEm","Etiquetas","Observacoes"]];
    state.leads.forEach(function (l){
      var etq = (l.etiquetas || []).map(function (t){ return t.texto || t.cor; }).join(", ");
      linhas.push([l.nome, l.telefone, l.email, l.empresa, (STATUS_MAP[l.status] || {}).nome || l.status, l.proximaAcao, etq, (l.observacoes || "").replace(/\n/g, " ")]);
    });
    var csv = linhas.map(function (row){
      return row.map(function (c){ c = String(c == null ? "" : c); if (/[",;\n]/.test(c)) c = '"' + c.replace(/"/g, '""') + '"'; return c; }).join(";");
    }).join("\r\n");
    baixarArquivo("contatos-" + hojeISO() + ".csv", "﻿" + csv, "text/csv");
    toast("Contatos exportados (CSV).");
  }
  function importJSON(file){
    var reader = new FileReader();
    reader.onload = function (){
      try {
        var dados = JSON.parse(reader.result);
        if (!Array.isArray(dados)) throw new Error("formato");
        var mapa = {}; state.leads.forEach(function (l){ mapa[l.id] = l; });
        var novos = 0, atual = 0;
        dados.forEach(function (d){
          if (!d) return;
          if (!d.id) d.id = uid();
          if (mapa[d.id]) atual++; else novos++;
          mapa[d.id] = d;
        });
        state.leads = Object.keys(mapa).map(function (k){ return mapa[k]; });
        salvar(); render();
        toast("Importado: " + novos + " novo(s), " + atual + " atualizado(s).");
      } catch (e){ toast("Arquivo inválido. Use um backup exportado aqui."); }
    };
    reader.readAsText(file);
  }
  function limparTudo(){
    if (!state.leads.length){ toast("Já está vazio."); return; }
    if (!confirm("Apagar TODOS os contatos? Faça um backup antes. Isso não pode ser desfeito.")) return;
    state.leads = []; salvar(); render(); toast("Tudo apagado.");
  }
  function carregarExemplos(){
    if (state.leads.length && !confirm("Isso vai ADICIONAR 3 contatos de exemplo. Continuar?")) return;
    var ex = [
      { nome:"Maria Souza",  telefone:"11912345678", email:"maria@email.com",    empresa:"Indicação", status:"conversando", proximaAcao:maisDias(0),  proximaAcaoNota:"Ligar pra confirmar interesse", observacoes:"Prefere ligação depois das 18h.", etiquetas:[{texto:"Quente", cor:"#e5484d"}] },
      { nome:"João Pereira", telefone:"21998877665", email:"",                   empresa:"GAV",       status:"proposta",    proximaAcao:maisDias(-2), proximaAcaoNota:"Enviar contrato revisado",      observacoes:"Contrato 12345. Pediu desconto.",  etiquetas:[{texto:"Pagamento pendente", cor:"#c99700"}] },
      { nome:"Ana Lima",     telefone:"31991112222", email:"ana.lima@email.com", empresa:"WAM",       status:"novo",        proximaAcao:maisDias(2),  proximaAcaoNota:"Mandar apresentação",           observacoes:"Chegou pelo Instagram.",           etiquetas:[{texto:"", cor:"#2f6fed"}] }
    ];
    ex.forEach(function (d){
      var l = { id:uid(), nome:d.nome, telefone:d.telefone, email:d.email, empresa:d.empresa, status:d.status,
                proximaAcao:d.proximaAcao, proximaAcaoNota:d.proximaAcaoNota, observacoes:d.observacoes, etiquetas:d.etiquetas, historico:[], criadoEm:agora(), atualizadoEm:agora() };
      addHist(l, "Contato criado (exemplo)");
      state.leads.push(l);
    });
    salvar(); render(); toast("Exemplos adicionados.");
  }

  // Clicar num lead abre a conversa no WhatsApp Web (via a extensão), sem abrir link/aba nova.
  function abrirConversa(tel, nome, id){
    var temTermo = (tel && soDigitos(tel)) || (nome && String(nome).trim());
    if (!temTermo){ if (id) abrirDrawer(id); return; } // sem número nem nome: abre a edição
    if (window.top !== window){
      window.parent.postMessage({ source: "leads-org", tipo: "abrir-conversa", telefone: tel || "", nome: nome || "" }, "*");
      toast("Abrindo a conversa...");
    } else {
      var wa = linkWhats(tel);
      if (wa) window.open(wa, "_blank", "noopener");
      else if (id) abrirDrawer(id);
    }
  }

  /* ---------- Copiar e avisos ---------- */
  function copiar(tel){
    var txt = String(tel || "");
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(txt).then(function (){ toast("Número copiado: " + txt); }, function (){ copiarFallback(txt); });
    } else copiarFallback(txt);
  }
  function copiarFallback(txt){
    var ta = document.createElement("textarea");
    ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast("Número copiado: " + txt); }
    catch (e){ toast("Copie manualmente: " + txt); }
    document.body.removeChild(ta);
  }
  function toast(msg){
    el.toast.textContent = msg;
    el.toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function (){ el.toast.classList.remove("show"); }, 2800);
  }
  function toggleMenu(force){
    var abrir = force !== undefined ? force : !el.menuPop.classList.contains("show");
    el.menuPop.classList.toggle("show", abrir);
  }

  /* ---------- Eventos ---------- */
  function onClick(e){
    var alvo = e.target.closest("[data-acao]");
    if (el.menuPop.classList.contains("show") && !e.target.closest("#menuPop") && !e.target.closest("#menuBtn")){
      toggleMenu(false);
    }
    if (!alvo) return;
    var acao = alvo.getAttribute("data-acao");
    var id = alvo.getAttribute("data-id");
    switch (acao){
      case "tab":            state.view = id; render(); break;
      case "filtro":         state.filtro = id; render(); break;
      case "novo":           abrirDrawer(null); break;
      case "quick-add":      quickAdd(); break;
      case "editar":
      case "detalhe":        abrirDrawer(id); break;
      case "excluir":        excluir(id); break;
      case "concluir":       concluirFollowup(id); break;
      case "salvar":         salvarDrawer(); break;
      case "fechar-drawer":  fecharDrawer(); break;
      case "add-hist":       addHistRapido(); break;
      case "etq-cor":        drawerCorSel = alvo.getAttribute("data-cor"); marcarSwatch(); break;
      case "etq-add":        etqAdd(); break;
      case "etq-rem":        etqRem(alvo.getAttribute("data-idx")); break;
      case "etq-sug":        etqSug(alvo.getAttribute("data-k")); break;
      case "abrir-conversa": abrirConversa(alvo.getAttribute("data-tel"), alvo.getAttribute("data-nome"), alvo.getAttribute("data-id")); break;
      case "copiar":         copiar(alvo.getAttribute("data-tel")); break;
      case "tema":           alternarTema(); toggleMenu(false); break;
      case "menu":           toggleMenu(); break;
      case "export-json":    exportJSON(); toggleMenu(false); break;
      case "import-json":    el.fileInput.click(); break;
      case "export-csv":     exportCSV(); toggleMenu(false); break;
      case "exemplos":       carregarExemplos(); toggleMenu(false); break;
      case "limpar":         limparTudo(); toggleMenu(false); break;
    }
  }

  function init(){
    el.stats = document.getElementById("stats");
    el.tabs = document.getElementById("tabs");
    el.filtros = document.getElementById("filtros");
    el.busca = document.getElementById("busca");
    el.quick = document.getElementById("quick");
    el.view = document.getElementById("view");
    el.drawer = document.getElementById("drawer");
    el.drawerOverlay = document.getElementById("drawerOverlay");
    el.menuBtn = document.getElementById("menuBtn");
    el.menuPop = document.getElementById("menuPop");
    el.fileInput = document.getElementById("fileInput");
    el.toast = document.getElementById("toast");

    aplicarTema();
    carregar(function (){ render(); drenarFila(); });

    el.busca.addEventListener("input", function (){ state.busca = el.busca.value; renderStats(); renderView(); });
    el.fileInput.addEventListener("change", function (){
      if (el.fileInput.files && el.fileInput.files[0]) importJSON(el.fileInput.files[0]);
      el.fileInput.value = ""; toggleMenu(false);
    });
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", function (e){
      if (e.key === "Escape"){ if (el.drawer.classList.contains("open")) fecharDrawer(); toggleMenu(false); return; }
      if (e.key === "Enter" && e.target && e.target.id === "f_histnovo"){ e.preventDefault(); addHistRapido(); }
      if (e.key === "Enter" && e.target && e.target.id === "f_etqtexto"){ e.preventDefault(); etqAdd(); }
      if (e.key === "Enter" && e.target && e.target.id === "quick"){ e.preventDefault(); quickAdd(); }
    });

    // atualiza sozinho quando a captura do WhatsApp Web manda um contato novo
    chrome.storage.onChanged.addListener(function (changes, area){
      if (area !== "local") return;
      if (changes.filaCapturas && (changes.filaCapturas.newValue || []).length) drenarFila();
      if (changes.tema) aplicarTema();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
