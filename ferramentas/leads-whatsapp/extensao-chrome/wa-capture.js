/* ============================================================
   Leads do WhatsApp — captura no WhatsApp Web
   ------------------------------------------------------------
   Botão "＋ Salvar" no topo da conversa. Ao clicar, abre um
   formulário pra você ajustar nome, número, etiqueta, status e
   observação ANTES de mandar pro organizador. Se o nome ficar
   vazio, entra o número no lugar.

   A captura automática (ligada no popup) salva direto, sem o
   formulário — só pra números novos (não salvos).

   >>> SE O WHATSAPP MUDAR O SITE e a captura parar, o ponto a
       ajustar é a função headerTituloEl() abaixo. <<<
   ============================================================ */
(function () {
  "use strict";

  var BTN_ID = "leads-cap-btn";
  var OV_ID  = "leads-cap-ov";
  var STYLE_ID = "leads-cap-style";

  var PALETA = ["#e5484d","#f76b15","#c99700","#17994f","#0d9488","#2f6fed","#7c5cff","#d6409f","#6b7280"];
  var STATUS = [
    ["novo","Novo"], ["conversando","Em conversa"], ["proposta","Proposta"], ["fechado","Fechado"], ["perdido","Perdido"]
  ];

  function soDigitos(s){ return String(s || "").replace(/\D/g, ""); }
  function ehNumero(txt){ return /^[+\d][\d\s()\-.]{6,}$/.test(String(txt || "").trim()); }

  /* ---------- Leitura do cabeçalho da conversa ---------- */
  function headerTituloEl(){
    var main = document.querySelector("#main");
    if (!main) return null;
    var header = main.querySelector("header");
    if (!header) return null;
    return header.querySelector('[data-testid="conversation-info-header-chat-title"]')
        || header.querySelector('span[dir="auto"][title]')
        || header.querySelector('span[title]')
        || header.querySelector('span[dir="auto"]');
  }
  function extrair(){
    var elt = headerTituloEl();
    if (!elt) return null;
    var titulo = (elt.getAttribute("title") || elt.textContent || "").trim();
    if (!titulo) return null;
    if (ehNumero(titulo)) return { nome: "", numero: titulo };
    return { nome: titulo, numero: "" };
  }

  /* ---------- Fila (chrome.storage) ---------- */
  function enfileirar(contato, cb){
    contato.id = "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    contato.capturadoEm = new Date().toISOString();
    chrome.storage.local.get({ filaCapturas: [] }, function (res){
      var fila = res.filaCapturas || [];
      if (contato.telefone && fila.some(function (x){ return soDigitos(x.telefone) === soDigitos(contato.telefone); })){
        toast("Esse número já está na fila.");
        if (cb) cb(false); return;
      }
      fila.push(contato);
      chrome.storage.local.set({ filaCapturas: fila }, function (){ if (cb) cb(true); });
    });
  }

  /* ---------- Estilos do formulário ---------- */
  function injetarEstilo(){
    if (document.getElementById(STYLE_ID)) return;
    var css =
      "#leads-cap-ov{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:2147483000;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;}" +
      "#leads-cap-ov *{box-sizing:border-box;}" +
      "#leads-cap-card{background:#fff;color:#1a1a1a;width:340px;max-width:92vw;max-height:92vh;overflow:auto;border-radius:10px;padding:16px 16px 14px;box-shadow:0 20px 60px rgba(0,0,0,.4);}" +
      "#leads-cap-card h3{margin:0 0 4px;font-size:15px;font-weight:600;}" +
      "#leads-cap-card .sub{margin:0 0 8px;font-size:12px;color:#777;}" +
      "#leads-cap-card label{display:block;font-size:12px;font-weight:600;color:#666;margin:11px 0 4px;}" +
      "#leads-cap-card input[type=text],#leads-cap-card select,#leads-cap-card textarea{width:100%;padding:8px 10px;border:1px solid #d6d6da;border-radius:6px;font-size:14px;font-family:inherit;color:#1a1a1a;background:#fff;}" +
      "#leads-cap-card textarea{resize:vertical;min-height:52px;}" +
      "#leads-cap-sw{display:flex;gap:7px;flex-wrap:wrap;margin-top:6px;}" +
      ".leads-sw{width:22px;height:22px;border-radius:50%;border:none;cursor:pointer;padding:0;}" +
      ".leads-sw.sel{box-shadow:0 0 0 2px #fff,0 0 0 4px #1a1a1a;}" +
      "#leads-cap-foot{display:flex;justify-content:flex-end;gap:8px;margin-top:16px;}" +
      "#leads-cap-foot button{padding:8px 14px;border-radius:6px;font-size:13.5px;font-weight:600;font-family:inherit;cursor:pointer;border:1px solid #d6d6da;background:#fff;color:#1a1a1a;}" +
      "#leads-cap-foot .p{background:#1a1a1a;color:#fff;border-color:#1a1a1a;}";
    var s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = css;
    document.head.appendChild(s);
  }

  /* ---------- Formulário de captura ---------- */
  function abrirForm(det){
    if (document.getElementById(OV_ID)) return;
    det = det || { nome: "", numero: "" };
    injetarEstilo();

    var corSel = null;

    var ov = document.createElement("div");
    ov.id = OV_ID;
    ov.innerHTML =
      '<div id="leads-cap-card">' +
        "<h3>Salvar contato</h3>" +
        '<div class="sub">Ajuste e confirme. Cai no organizador quando você abrir ele.</div>' +
        "<label>Nome</label>" +
        '<input type="text" id="lc-nome" placeholder="deixe vazio pra usar o número">' +
        "<label>WhatsApp / número</label>" +
        '<input type="text" id="lc-num" placeholder="(11) 99999-8888">' +
        "<label>Status</label>" +
        '<select id="lc-status">' + STATUS.map(function (s){ return '<option value="' + s[0] + '">' + s[1] + "</option>"; }).join("") + "</select>" +
        "<label>Etiqueta (opcional)</label>" +
        '<input type="text" id="lc-etq" placeholder="ex.: Quente, VIP, Pagamento pendente">' +
        '<div id="leads-cap-sw"></div>' +
        "<label>Observação (opcional)</label>" +
        '<textarea id="lc-obs" placeholder="o que combinaram, horário bom pra ligar, nº de contrato..."></textarea>' +
        '<div id="leads-cap-foot">' +
          '<button id="lc-cancel" type="button">Cancelar</button>' +
          '<button id="lc-save" class="p" type="button">Salvar</button>' +
        "</div>" +
      "</div>";
    document.body.appendChild(ov);

    var card = ov.querySelector("#leads-cap-card");
    card.addEventListener("click", function (e){ e.stopPropagation(); });

    ov.querySelector("#lc-nome").value = det.nome || "";
    ov.querySelector("#lc-num").value = det.numero || "";

    // swatches de cor da etiqueta
    var sw = ov.querySelector("#leads-cap-sw");
    PALETA.forEach(function (c){
      var b = document.createElement("button");
      b.type = "button"; b.className = "leads-sw"; b.style.background = c; b.setAttribute("data-cor", c);
      b.addEventListener("click", function (){
        if (corSel === c){ corSel = null; }
        else { corSel = c; }
        Array.prototype.forEach.call(sw.children, function (x){ x.classList.toggle("sel", x.getAttribute("data-cor") === corSel); });
      });
      sw.appendChild(b);
    });

    function fechar(){ if (ov && ov.parentNode) ov.parentNode.removeChild(ov); }

    function salvar(){
      var nmr = ov.querySelector("#lc-num").value.trim();
      var nome = ov.querySelector("#lc-nome").value.trim() || nmr; // vazio -> usa o número
      var tel = soDigitos(nmr);
      if (!nome && !tel){ toast("Preencha ao menos o nome ou o número."); return; }

      var etqTexto = ov.querySelector("#lc-etq").value.trim();
      var etiquetas = (corSel || etqTexto) ? [{ texto: etqTexto, cor: corSel || "#6b7280" }] : [];

      var contato = {
        nome: nome,
        telefone: tel,
        status: ov.querySelector("#lc-status").value,
        etiquetas: etiquetas,
        observacoes: ov.querySelector("#lc-obs").value.trim()
      };
      enfileirar(contato, function (ok){ if (ok){ fechar(); toast(tel ? ("Na fila: " + nome) : ("Na fila: " + nome)); } });
    }

    ov.addEventListener("click", fechar); // clique no fundo fecha
    ov.querySelector("#lc-cancel").addEventListener("click", fechar);
    ov.querySelector("#lc-save").addEventListener("click", salvar);
    card.addEventListener("keydown", function (e){
      e.stopPropagation();
      if (e.key === "Escape"){ fechar(); }
      else if (e.key === "Enter" && e.target && e.target.tagName !== "TEXTAREA"){ e.preventDefault(); salvar(); }
    });

    var foco = ov.querySelector(det.nome ? "#lc-etq" : "#lc-nome");
    if (foco) foco.focus();
  }

  /* ---------- Botão no cabeçalho ---------- */
  function inserirBotao(){
    if (document.getElementById(BTN_ID)) return;
    var main = document.querySelector("#main");
    var header = main && main.querySelector("header");
    if (!header) return;
    var b = document.createElement("button");
    b.id = BTN_ID;
    b.type = "button";
    b.textContent = "＋ Salvar";
    b.title = "Salvar este contato no organizador";
    b.style.cssText = "margin:0 10px;padding:6px 12px;border-radius:16px;border:none;" +
      "background:#1a1a1a;color:#fff;font-size:13px;font-weight:600;cursor:pointer;flex-shrink:0;";
    b.addEventListener("click", function (e){ e.stopPropagation(); e.preventDefault(); abrirForm(extrair()); });
    header.appendChild(b);
  }

  /* ---------- Aviso rápido ---------- */
  var toastEl, toastTimer;
  function toast(msg){
    if (!toastEl){
      toastEl = document.createElement("div");
      toastEl.style.cssText = "position:fixed;bottom:22px;left:50%;transform:translateX(-50%);" +
        "background:#1a1a1a;color:#fff;padding:10px 16px;border-radius:8px;font-size:13px;z-index:2147483001;" +
        "opacity:0;transition:opacity .2s;font-family:system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.3);";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.style.opacity = "1";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function (){ toastEl.style.opacity = "0"; }, 2600);
  }

  /* ---------- Abrir conversa SEM recarregar (busca + clique) ----------
     Digita o número na busca do WhatsApp e clica no primeiro resultado.
     Loga cada passo em [Leads] no console (F12) pra facilitar o ajuste.
     >>> Se parar de funcionar, os pontos a ajustar são acharBusca(),
         digitar() e primeiroResultado(). <<< */
  function log(m){ try { console.log("[Leads] " + m); } catch (e){} }

  function termoBusca(tel){
    var d = soDigitos(tel);
    if (d.length > 11 && d.slice(0, 2) === "55") d = d.slice(2); // usa o número local (sem 55)
    return d;
  }
  function ehInput(el){ return el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA"); }
  function valorDe(box){ return ehInput(box) ? (box.value || "") : (box.textContent || ""); }

  function acharBusca(){
    // pega QUALQUER campo editável fora da área de mensagem (#main).
    var cands = document.querySelectorAll(
      '[contenteditable="true"],[contenteditable="plaintext-only"],[contenteditable=""],' +
      'input[type="text"],input[type="search"],input:not([type])'
    );
    var lista = [];
    for (var i = 0; i < cands.length; i++){
      var c = cands[i];
      if (c.getAttribute && c.getAttribute("contenteditable") === "false") continue;
      if (c.closest && c.closest("#main")) continue; // nunca a caixa de mensagem
      lista.push(c);
    }
    // 1) por rótulo (pesquisar / search)
    for (var j = 0; j < lista.length; j++){
      var r = lista[j];
      var rot = ((r.getAttribute("aria-label") || "") + " " + (r.getAttribute("placeholder") || "") + " " +
                 (r.getAttribute("title") || "") + " " + (r.getAttribute("data-placeholder") || "")).toLowerCase();
      if (rot.indexOf("pesquis") >= 0 || rot.indexOf("search") >= 0 || rot.indexOf("procur") >= 0){
        log("busca achada por rótulo: " + r.tagName); return r;
      }
    }
    // 2) dentro do painel esquerdo
    for (var k = 0; k < lista.length; k++){
      if (lista[k].closest && (lista[k].closest("#side") || lista[k].closest("#pane-side"))){
        log("busca achada no painel esquerdo: " + lista[k].tagName); return lista[k];
      }
    }
    // 3) primeiro campo editável fora do #main
    if (lista[0]){ log("busca (1º campo fora do #main): " + lista[0].tagName); return lista[0]; }
    log("nenhum campo de busca encontrado (candidatos totais: " + cands.length + ")");
    return null;
  }

  function setInputReact(box, txt){
    try {
      var proto = box.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, "value").set.call(box, txt);
    } catch (e){ box.value = txt; }
    box.dispatchEvent(new Event("input", { bubbles: true }));
  }
  function digitar(box, txt){
    box.focus();
    if (ehInput(box)){ setInputReact(box, txt); return valorDe(box).indexOf(txt) >= 0; }
    try { document.execCommand("selectAll", false, null); document.execCommand("delete", false, null); } catch (e){}
    try { document.execCommand("insertText", false, txt); } catch (e){}
    if (valorDe(box).indexOf(txt) < 0){ // se não pegou, tenta via "colar"
      try {
        var dt = new DataTransfer(); dt.setData("text/plain", txt);
        box.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true }));
      } catch (e){}
    }
    try { box.dispatchEvent(new InputEvent("input", { bubbles: true })); } catch (e){}
    return valorDe(box).indexOf(txt) >= 0;
  }
  function limparBusca(box){
    try {
      box.focus();
      if (ehInput(box)){ setInputReact(box, ""); }
      else { document.execCommand("selectAll", false, null); document.execCommand("delete", false, null); }
      box.blur();
    } catch (e){}
  }
  function semResultado(){
    var side = document.querySelector("#side") || document.querySelector("#pane-side");
    if (!side) return false;
    var t = (side.innerText || "").toLowerCase();
    return t.indexOf("nenhum") >= 0 || t.indexOf("não encontr") >= 0 || t.indexOf("nao encontr") >= 0;
  }
  function clicarDeVerdade(el){
    var alvo = el.querySelector('[role="button"]') || el;
    var opts = { bubbles: true, cancelable: true, view: window };
    ["pointerover","pointerdown","mousedown","pointerup","mouseup","click"].forEach(function (t){
      try { alvo.dispatchEvent(new MouseEvent(t, opts)); } catch (e){ try { alvo.dispatchEvent(new Event(t, { bubbles: true })); } catch (e2){} }
    });
  }
  // remove o número da lista "Pesquisas recentes" depois de abrir a conversa
  function removerRecente(termo){
    var busca = acharBusca();
    if (!busca) return;
    busca.focus(); // revela "Pesquisas recentes" no painel esquerdo
    setTimeout(function (){
      var pane = document.querySelector("#pane-side") || document.querySelector("#side");
      var itens = pane ? pane.querySelectorAll('[role="listitem"],[role="button"],[data-testid="cell-frame-container"]') : [];
      var achou = false;
      var soDig = /^\d+$/.test(termo);
      for (var i = 0; i < itens.length; i++){
        var txtItem = itens[i].textContent || "";
        var bate = soDig ? (soDigitos(txtItem).indexOf(termo) >= 0) : (txtItem.toLowerCase().indexOf(termo.toLowerCase()) >= 0);
        if (bate){
          achou = true;
          try { itens[i].dispatchEvent(new MouseEvent("mouseover", { bubbles: true })); } catch (e){}
          var x = itens[i].querySelector('span[data-icon="x-alt"],span[data-icon="x"],[aria-label*="emov" i],[aria-label*="xclu" i],[aria-label*="pag" i]');
          var alvo = x ? (x.closest('[role="button"]') || x.closest("button") || x) : null;
          if (alvo){ clicarDeVerdade(alvo); log("pesquisa recente removida"); }
          else { log("recente achada, mas sem botão de remover — me manda o console"); }
          break;
        }
      }
      if (!achou) log("nenhuma pesquisa recente correspondente");
      setTimeout(function (){ var b = acharBusca(); if (b) limparBusca(b); }, 180);
    }, 320);
  }
  function primeiroResultado(){
    var scope = document.querySelector("#pane-side") || document.querySelector("#side") || document;
    return scope.querySelector('[data-testid="cell-frame-container"]')
        || scope.querySelector('[role="listitem"]')
        || scope.querySelector('[role="gridcell"]')
        || scope.querySelector('[role="row"]')
        || scope.querySelector('div[tabindex="-1"] [role="button"]')
        || null;
  }
  function diagRoles(){
    var scope = document.querySelector("#pane-side");
    if (!scope){ log("sem #pane-side"); return; }
    var roles = {};
    scope.querySelectorAll("[role]").forEach(function (e){ var r = e.getAttribute("role"); roles[r] = (roles[r] || 0) + 1; });
    log("roles no pane-side: " + JSON.stringify(roles) + " | testids: " + scope.querySelectorAll("[data-testid]").length);
  }
  function abrirConversa(tel, nome){
    var digits = tel ? soDigitos(tel) : "";
    var termo = digits ? termoBusca(tel) : String(nome || "").trim(); // por número, ou por nome se não tiver número
    if (!termo){ log("sem número nem nome pra buscar"); return; }
    var busca = acharBusca();
    if (!busca){ toast("Não achei a busca do WhatsApp. Recarregue a página."); return; }
    log("digitando \"" + termo + "\" em " + busca.tagName);
    digitar(busca, termo);
    setTimeout(function (){
      if (valorDe(busca).toLowerCase().indexOf(termo.toLowerCase()) < 0){
        log("a digitação NÃO registrou. valor atual: \"" + valorDe(busca) + "\"");
        toast("Não consegui escrever na busca do WhatsApp.");
        return;
      }
      // espera o resultado aparecer e clica de verdade
      var n = 0;
      var iv = setInterval(function (){
        n++;
        var item = primeiroResultado();
        if (item){
          clearInterval(iv);
          log("clicando resultado: " + item.tagName + " role=" + item.getAttribute("role"));
          clicarDeVerdade(item);
          setTimeout(function (){ removerRecente(termo); }, 500);
        } else if (semResultado()){
          clearInterval(iv); log("nenhum resultado"); limparBusca(busca); toast("Não encontrei essa conversa na lista.");
        } else if (n >= 16){
          clearInterval(iv); diagRoles(); limparBusca(busca); toast("Achei a busca, mas não o resultado.");
        }
      }, 130);
    }, 400);
  }
  window.addEventListener("message", function (e){
    var d = e.data;
    if (!d || d.source !== "leads-org" || d.tipo !== "abrir-conversa") return;
    log("pedido de abrir conversa: tel=" + d.telefone + " nome=" + d.nome);
    abrirConversa(d.telefone, d.nome);
  });

  /* ---------- Captura automática (número novo ao abrir) ---------- */
  var ultimoAuto = "";
  function tentarAuto(){
    chrome.storage.local.get({ autoCaptura: false }, function (res){
      if (!res.autoCaptura) return;
      var c = extrair();
      if (c && c.numero){
        var tel = soDigitos(c.numero);
        if (tel && tel !== ultimoAuto){
          ultimoAuto = tel;
          enfileirar({ nome: c.numero, telefone: tel, status: "novo", etiquetas: [], observacoes: "" });
        }
      }
    });
  }

  /* ---------- Observa a página (troca de conversa / re-render) ---------- */
  var pend;
  var obs = new MutationObserver(function (){
    clearTimeout(pend);
    pend = setTimeout(function (){ inserirBotao(); tentarAuto(); }, 400);
  });
  obs.observe(document.body, { childList: true, subtree: true });

  setTimeout(inserirBotao, 1500);
})();
