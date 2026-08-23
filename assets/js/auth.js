/* ───────────────────────────────────────────
   Tela de senha — Central de Ferramentas
   Protege o acesso com senha simples (SHA-256).
   Para trocar a senha, gere o hash:
     echo -n "suaSenha" | sha256sum
   e substitua HASH abaixo.
   ─────────────────────────────────────────── */
(function () {
  "use strict";

  var HASH = "ce4eab09d4055a881382ddda1b3d9fad36e09ffd5161f3b3cf24d71ac8bc1c16";
  var KEY  = "cf_auth";

  if (sessionStorage.getItem(KEY) === "1") return;     // já autenticado nesta aba

  // esconde tudo
  document.documentElement.style.visibility = "hidden";

  document.addEventListener("DOMContentLoaded", function () {
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    // overlay
    var ov = document.createElement("div");
    ov.id = "authOverlay";
    ov.style.cssText =
      "position:fixed;inset:0;z-index:999999;display:flex;align-items:center;" +
      "justify-content:center;background:#1a1a2e;font-family:system-ui,sans-serif;";

    ov.innerHTML =
      '<div style="background:#16213e;padding:40px 36px;border-radius:12px;' +
      'box-shadow:0 8px 32px rgba(0,0,0,.4);text-align:center;max-width:360px;width:90%">' +
        '<div style="font-size:42px;margin-bottom:12px">🔒</div>' +
        '<h2 style="color:#e0e0e0;margin:0 0 6px;font-size:20px">Central de Ferramentas</h2>' +
        '<p style="color:#888;margin:0 0 24px;font-size:13px">Acesso restrito. Digite a senha.</p>' +
        '<input id="authPw" type="password" placeholder="Senha" autocomplete="off" ' +
          'style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #2a2a4a;' +
          'border-radius:8px;background:#0f0f23;color:#e0e0e0;font-size:15px;outline:none;' +
          'margin-bottom:14px" />' +
        '<button id="authBtn" style="width:100%;padding:12px;border:none;border-radius:8px;' +
          'background:#4361ee;color:#fff;font-size:15px;font-weight:600;cursor:pointer">Entrar</button>' +
        '<p id="authErr" style="color:#e74c3c;margin:12px 0 0;font-size:13px;min-height:18px"></p>' +
      '</div>';

    document.body.appendChild(ov);
    document.documentElement.style.visibility = "visible";

    var inp = document.getElementById("authPw");
    var btn = document.getElementById("authBtn");
    var err = document.getElementById("authErr");

    inp.focus();

    function tryLogin() {
      var pw = inp.value;
      if (!pw) { err.textContent = "Digite a senha."; return; }

      sha256(pw).then(function (h) {
        if (h === HASH) {
          sessionStorage.setItem(KEY, "1");
          ov.remove();
          document.body.style.overflow = "";
        } else {
          err.textContent = "Senha incorreta.";
          inp.value = "";
          inp.focus();
        }
      });
    }

    btn.addEventListener("click", tryLogin);
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") tryLogin();
    });
  });

  function sha256(str) {
    var buf = new TextEncoder().encode(str);
    return crypto.subtle.digest("SHA-256", buf).then(function (ab) {
      return Array.from(new Uint8Array(ab))
        .map(function (b) { return b.toString(16).padStart(2, "0"); })
        .join("");
    });
  }
})();
