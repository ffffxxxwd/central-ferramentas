/* Popup: total de contatos, captura automática e abrir em aba. */
(function () {
  "use strict";
  function $(id){ return document.getElementById(id); }

  function atualizar(){
    chrome.storage.local.get({ leads: [] }, function (r){ $("tot").textContent = (r.leads || []).length; });
  }

  document.addEventListener("DOMContentLoaded", function (){
    atualizar();
    chrome.storage.local.get({ autoCaptura: false }, function (r){ $("auto").checked = !!r.autoCaptura; });
    $("auto").addEventListener("change", function (){ chrome.storage.local.set({ autoCaptura: $("auto").checked }); });
    $("abrir").addEventListener("click", function (){ chrome.tabs.create({ url: chrome.runtime.getURL("organizador.html") }); });
    chrome.storage.onChanged.addListener(function (c, a){ if (a === "local" && c.leads) atualizar(); });
  });
})();
