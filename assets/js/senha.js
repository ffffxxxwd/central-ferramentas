/* Tela de senha da Central de Ferramentas.
   Roda no <head>, antes de tudo. Se não houver sessão válida, interrompe o
   carregamento da página e mostra o formulário no lugar do conteúdo.

   O que isso é: uma tranca na porta. Impede que alguém com o link abra o
   painel no navegador.
   O que isso NÃO é: proteção dos dados. O site é estático e o repositório é
   público, então quem souber o caminho de um arquivo ainda baixa ele direto,
   sem passar por aqui. Para fechar isso de verdade é preciso autenticação no
   servidor (Cloudflare Access na frente do GitHub Pages, por exemplo).

   A senha nunca é gravada. Guardamos só o SHA-256 dela com um prefixo fixo,
   e a sessão vale 12 horas. Para trocar a senha, veja assets/js/senha-config.js. */
(function () {
  "use strict";

  var CHAVE = "cf-acesso";
  var SALT = "central-ferramentas:";
  var HORAS = 12;

  var esperado = String(window.SENHA_HASH || "").toLowerCase();
  if (!esperado) return;              // sem hash configurado, o painel fica aberto

  function sessaoValida() {
    try {
      var d = JSON.parse(localStorage.getItem(CHAVE) || "null");
      if (!d || d.h !== esperado || typeof d.em !== "number") return false;
      return (Date.now() - d.em) < HORAS * 3600 * 1000;
    } catch (e) {
      return false;
    }
  }
  if (sessaoValida()) return;

  // barra o resto da página: nada mais é baixado nem executado
  try { window.stop(); } catch (e) {}

  function sha256(texto) {
    if (!window.crypto || !crypto.subtle) return Promise.reject(new Error("sem-crypto"));
    var dados = new TextEncoder().encode(SALT + texto);
    return crypto.subtle.digest("SHA-256", dados).then(function (buf) {
      var bytes = new Uint8Array(buf), saida = "";
      for (var i = 0; i < bytes.length; i++) saida += ("0" + bytes[i].toString(16)).slice(-2);
      return saida;
    });
  }

  var doc = document;
  doc.title = "Acesso restrito";
  if (!doc.body) doc.documentElement.appendChild(doc.createElement("body"));
  doc.body.innerHTML = "";

  var css = doc.createElement("style");
  css.textContent = [
    "html,body{margin:0;padding:0;height:100%;background:#f2f5fa;",
    "font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#1b2335}",
    ".cf-tela{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px}",
    ".cf-caixa{width:100%;max-width:360px;background:#fff;border:1px solid #c3cdde;",
    "border-radius:10px;padding:28px 26px 24px}",
    ".cf-titulo{font-size:19px;font-weight:650;margin:0 0 4px}",
    ".cf-sub{font-size:13.5px;color:#434e67;margin:0 0 20px;line-height:1.45}",
    ".cf-rotulo{display:block;font-size:13px;font-weight:600;margin:0 0 6px}",
    ".cf-campo{width:100%;box-sizing:border-box;font-size:15px;padding:10px 12px;",
    "border:1px solid #9aa7bd;border-radius:7px;background:#fff;color:#1b2335}",
    ".cf-campo:focus{outline:2px solid #1a56db;outline-offset:1px;border-color:#1a56db}",
    ".cf-campo.erro{border-color:#b42318}",
    ".cf-btn{width:100%;margin-top:16px;font-size:15px;font-weight:600;padding:11px 12px;",
    "border:0;border-radius:7px;background:#1a56db;color:#fff;cursor:pointer}",
    ".cf-btn:hover{background:#1545b0}",
    ".cf-btn[disabled]{opacity:.6;cursor:default}",
    ".cf-erro{display:none;margin:10px 0 0;font-size:13px;color:#b42318}",
    ".cf-erro.ver{display:block}"
  ].join("");
  doc.head.appendChild(css);

  var tela = doc.createElement("div");
  tela.className = "cf-tela";
  tela.innerHTML =
    '<form class="cf-caixa" id="cfForm" autocomplete="off">' +
      '<h1 class="cf-titulo">Central de Ferramentas</h1>' +
      '<p class="cf-sub">Painel restrito. Informe a senha de acesso para continuar.</p>' +
      '<label class="cf-rotulo" for="cfSenha">Senha</label>' +
      '<input class="cf-campo" id="cfSenha" type="password" autocomplete="current-password" ' +
        'autocapitalize="off" autocorrect="off" spellcheck="false" />' +
      '<p class="cf-erro" id="cfErro"></p>' +
      '<button class="cf-btn" id="cfBtn" type="submit">Entrar</button>' +
    '</form>';
  doc.body.appendChild(tela);

  var form = doc.getElementById("cfForm");
  var campo = doc.getElementById("cfSenha");
  var aviso = doc.getElementById("cfErro");
  var botao = doc.getElementById("cfBtn");
  campo.focus();

  function mostrarErro(texto) {
    aviso.textContent = texto;
    aviso.className = "cf-erro ver";
    campo.className = "cf-campo erro";
    campo.select();
  }

  campo.addEventListener("input", function () {
    aviso.className = "cf-erro";
    campo.className = "cf-campo";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var digitada = campo.value;
    if (!digitada) { mostrarErro("Digite a senha."); return; }

    botao.disabled = true;
    botao.textContent = "Verificando...";

    sha256(digitada).then(function (h) {
      if (h !== esperado) {
        botao.disabled = false;
        botao.textContent = "Entrar";
        mostrarErro("Senha incorreta.");
        return;
      }
      try {
        localStorage.setItem(CHAVE, JSON.stringify({ h: h, em: Date.now() }));
      } catch (err) {}
      location.reload();
    }).catch(function (err) {
      botao.disabled = false;
      botao.textContent = "Entrar";
      mostrarErro(err && err.message === "sem-crypto"
        ? "Este navegador não permite verificar a senha aqui. Abra o painel por https:// ou por localhost."
        : "Não foi possível verificar a senha. Tente de novo.");
    });
  });
})();
