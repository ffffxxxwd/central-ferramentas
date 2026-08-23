/* ============================================================
   Painel lateral: encaixa o organizador na tela do WhatsApp Web.
   Um iframe (página da extensão) fica na direita; a aba
   "CONTATOS/OCULTAR" mostra/esconde. Abre sozinho ao capturar.
   ============================================================ */
(function () {
  "use strict";
  if (window.top !== window) return;              // só na aba principal
  if (document.getElementById("leads-panel")) return;

  var W = 372;

  var st = document.createElement("style");
  st.textContent =
    "#leads-panel{position:fixed;top:0;right:0;height:100vh;width:" + W + "px;max-width:92vw;background:#fff;" +
      "box-shadow:-4px 0 24px rgba(0,0,0,.18);z-index:2147482000;transform:translateX(0);transition:transform .18s ease;}" +
    "#leads-panel.fechado{transform:translateX(100%);}" +
    "#leads-panel iframe{width:100%;height:100%;border:none;display:block;background:#fff;}" +
    "#leads-tab{position:fixed;top:50%;right:" + W + "px;transform:translateY(-50%);z-index:2147482001;" +
      "writing-mode:vertical-rl;background:#1a1a1a;color:#fff;padding:16px 7px;border-radius:8px 0 0 8px;" +
      "font-family:system-ui,sans-serif;font-size:12px;font-weight:700;letter-spacing:.05em;cursor:pointer;" +
      "user-select:none;box-shadow:-2px 0 10px rgba(0,0,0,.25);transition:right .18s ease;}" +
    "#leads-tab.fechado{right:0;}" +
    // quando o painel está aberto, encolhe a tela do WhatsApp pra não ficar por baixo
    "html.leads-aberto #app{width:calc(100vw - " + W + "px) !important;min-width:0 !important;}";
  document.documentElement.appendChild(st);

  var painel = document.createElement("div");
  painel.id = "leads-panel";
  var ifr = document.createElement("iframe");
  ifr.src = chrome.runtime.getURL("organizador.html");
  painel.appendChild(ifr);

  var tab = document.createElement("div");
  tab.id = "leads-tab";

  document.documentElement.appendChild(painel);
  document.documentElement.appendChild(tab);

  var aberto = true;
  function aplicar(){
    painel.classList.toggle("fechado", !aberto);
    tab.classList.toggle("fechado", !aberto);
    tab.textContent = aberto ? "OCULTAR" : "CONTATOS";
    document.documentElement.classList.toggle("leads-aberto", aberto); // empurra/solta o WhatsApp
  }
  tab.addEventListener("click", function (){ aberto = !aberto; aplicar(); });
  aplicar();

  // abre o painel sozinho quando um contato é capturado
  chrome.storage.onChanged.addListener(function (changes, area){
    if (area === "local" && changes.filaCapturas){
      var nv = changes.filaCapturas.newValue || [];
      if (nv.length && !aberto){ aberto = true; aplicar(); }
    }
  });
})();
