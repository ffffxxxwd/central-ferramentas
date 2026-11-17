/* Tela de senha da Central de Ferramentas.
   Roda no <head>, antes de tudo. Sem sessão válida, interrompe o carregamento
   da página e cobre a tela com o formulário.

   O que isso é: uma tranca na porta. Impede que alguém com o link abra o
   painel no navegador.
   O que isso NÃO é: proteção dos dados. O site é estático e o repositório é
   público, então quem souber o caminho de um arquivo ainda baixa ele direto,
   sem passar por aqui. Para fechar isso de verdade é preciso autenticação no
   servidor (Cloudflare Access na frente do GitHub Pages, por exemplo).

   A senha nunca é gravada. Guardamos só o SHA-256 dela com um prefixo fixo,
   e a sessão vale 12 horas. Para trocar a senha, veja assets/js/senha-config.js.

   NOTA DE ROBUSTEZ: a primeira versão montava a tela em três etapas — criar o
   body, injetar uma tag <style> e então desenhar o formulário. Numa máquina a
   tela saiu preta: o título mudava e nada aparecia, sinal de que uma dessas
   etapas falhou no meio. Agora não há mais tag <style> nem dependência de o
   body já existir: cada elemento carrega o próprio estilo inline, a tela é uma
   camada fixa por cima de tudo, e ela se remonta sozinha caso a página continue
   carregando por baixo. */
(function () {
  "use strict";

  var CHAVE = "cf-acesso";
  var SALT = "central-ferramentas:";
  var HORAS = 12;
  var ID = "cfGate";

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

  // barra o resto da página: nada mais deveria ser baixado nem executado.
  // Se o navegador ignorar, a camada abaixo cobre o que for renderizado.
  try { window.stop(); } catch (e) {}

  function sha256(texto) {
    if (!window.crypto || !crypto.subtle || !window.TextEncoder) {
      return Promise.reject(new Error("sem-crypto"));
    }
    var dados = new TextEncoder().encode(SALT + texto);
    return crypto.subtle.digest("SHA-256", dados).then(function (buf) {
      var bytes = new Uint8Array(buf), saida = "";
      for (var i = 0; i < bytes.length; i++) saida += ("0" + bytes[i].toString(16)).slice(-2);
      return saida;
    });
  }

  var FUNDO = "#f2f5fa";
  var TINTA = "#1b2335";
  var FONTE = "system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif";

  function el(tag, estilo, texto) {
    var e = document.createElement(tag);
    if (estilo) e.setAttribute("style", estilo);
    if (texto != null) e.textContent = texto;
    return e;
  }

  var campo, aviso, botao;

  function montar() {
    var doc = document;
    try {
      if (!doc.documentElement) return false;

      // pinta a raiz, para o caso de a camada demorar um quadro a aparecer
      doc.documentElement.setAttribute("style", "background:" + FUNDO + ";");

      if (!doc.body) {
        doc.documentElement.appendChild(doc.createElement("body"));
      }
      var alvo = doc.body || doc.documentElement;

      var antigo = doc.getElementById(ID);
      if (antigo && antigo.parentNode) antigo.parentNode.removeChild(antigo);

      var gate = el("div", "position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;" +
        "z-index:2147483647;background:" + FUNDO + ";color:" + TINTA + ";font-family:" + FONTE + ";" +
        "display:flex;align-items:center;justify-content:center;padding:24px;" +
        "box-sizing:border-box;margin:0;overflow:auto;");
      gate.id = ID;

      var caixa = el("form", "width:100%;max-width:360px;background:#fff;border:1px solid #c3cdde;" +
        "border-radius:10px;padding:28px 26px 24px;box-sizing:border-box;margin:0;");
      caixa.setAttribute("autocomplete", "off");

      caixa.appendChild(el("h1", "font-size:19px;font-weight:650;margin:0 0 4px;color:" + TINTA + ";",
        "Central de Ferramentas"));
      caixa.appendChild(el("p", "font-size:13.5px;color:#434e67;margin:0 0 20px;line-height:1.45;",
        "Painel restrito. Informe a senha de acesso para continuar."));

      var rot = el("label", "display:block;font-size:13px;font-weight:600;margin:0 0 6px;color:" + TINTA + ";",
        "Senha");
      rot.setAttribute("for", "cfSenha");
      caixa.appendChild(rot);

      campo = el("input", "width:100%;box-sizing:border-box;font-size:15px;padding:10px 12px;" +
        "border:1px solid #9aa7bd;border-radius:7px;background:#fff;color:" + TINTA + ";" +
        "font-family:" + FONTE + ";margin:0;");
      campo.id = "cfSenha";
      campo.type = "password";
      campo.setAttribute("autocomplete", "current-password");
      campo.setAttribute("autocapitalize", "off");
      campo.setAttribute("autocorrect", "off");
      campo.setAttribute("spellcheck", "false");
      caixa.appendChild(campo);

      aviso = el("p", "display:none;margin:10px 0 0;font-size:13px;color:#b42318;");
      caixa.appendChild(aviso);

      botao = el("button", "width:100%;margin:16px 0 0;font-size:15px;font-weight:600;" +
        "padding:11px 12px;border:0;border-radius:7px;background:#1a56db;color:#fff;" +
        "cursor:pointer;font-family:" + FONTE + ";", "Entrar");
      botao.type = "submit";
      caixa.appendChild(botao);

      gate.appendChild(caixa);
      alvo.appendChild(gate);

      doc.title = "Acesso restrito";
      ligar(caixa);
      try { campo.focus(); } catch (e) {}
      return true;
    } catch (e) {
      // último recurso: troca o documento inteiro por uma tela simples
      try {
        document.documentElement.innerHTML =
          '<head><title>Acesso restrito</title></head>' +
          '<body style="margin:0;background:' + FUNDO + ';color:' + TINTA + ';font-family:' + FONTE + ';">' +
          '<div style="padding:40px;text-align:center">' +
          '<p>Não foi possível desenhar a tela de acesso neste navegador.</p>' +
          '<p style="color:#434e67;font-size:14px">Tente recarregar a página.</p>' +
          '</div></body>';
      } catch (e2) {}
      return false;
    }
  }

  function erro(texto) {
    if (!aviso) return;
    aviso.textContent = texto;
    aviso.style.display = "block";
    if (campo) {
      campo.style.borderColor = "#b42318";
      try { campo.select(); } catch (e) {}
    }
  }

  function ligar(form) {
    campo.addEventListener("input", function () {
      aviso.style.display = "none";
      campo.style.borderColor = "#9aa7bd";
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var digitada = campo.value;
      if (!digitada) { erro("Digite a senha."); return; }

      botao.disabled = true;
      botao.textContent = "Verificando...";

      sha256(digitada).then(function (h) {
        if (h !== esperado) {
          botao.disabled = false;
          botao.textContent = "Entrar";
          erro("Senha incorreta.");
          return;
        }
        try {
          localStorage.setItem(CHAVE, JSON.stringify({ h: h, em: Date.now() }));
        } catch (err) {}
        location.reload();
      }).catch(function (err) {
        botao.disabled = false;
        botao.textContent = "Entrar";
        erro(err && err.message === "sem-crypto"
          ? "Este navegador não permite verificar a senha aqui. Abra o painel por https:// ou por localhost."
          : "Não foi possível verificar a senha. Tente de novo.");
      });
    });
  }

  montar();

  // Se o navegador tiver ignorado o window.stop() e continuado a carregar a
  // página por baixo, estes dois momentos devolvem a tela para cima de tudo.
  function reforcar() {
    if (!document.getElementById(ID)) montar();
    document.title = "Acesso restrito";
  }
  document.addEventListener("DOMContentLoaded", reforcar);
  window.addEventListener("load", reforcar);
})();
