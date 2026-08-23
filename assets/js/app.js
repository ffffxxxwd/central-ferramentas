/* ============================================================
   Central de Ferramentas — lógica do site
   Monta o menu e os cards a partir de window.FERRAMENTAS,
   faz a navegação e carrega cada ferramenta isolada no iframe.
   ============================================================ */
(function () {
  "use strict";

  var ferramentas = window.FERRAMENTAS || [];

  var menuEl = document.getElementById("menu");
  var viewEl = document.getElementById("view");
  var topbarTitle = document.getElementById("topbarTitle");
  var topbarActions = document.getElementById("topbarActions");
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("overlay");
  var menuToggle = document.getElementById("menuToggle");
  var themeToggle = document.getElementById("themeToggle");

  /* ---------- Tema claro/escuro ---------- */
  aplicarTema(localStorage.getItem("tema") || "claro");
  themeToggle.addEventListener("click", function () {
    var atual = document.documentElement.getAttribute("data-tema");
    aplicarTema(atual === "claro" ? "escuro" : "claro");
  });
  function aplicarTema(tema) {
    document.documentElement.setAttribute("data-tema", tema);
    localStorage.setItem("tema", tema);
    var icon = themeToggle.querySelector(".theme-icon");
    var label = themeToggle.querySelector(".theme-label");
    if (tema === "escuro") { icon.textContent = "☀️"; label.textContent = "Tema claro"; }
    else { icon.textContent = "🌙"; label.textContent = "Tema escuro"; }
  }

  /* ---------- Menu lateral ---------- */
  function renderMenu() {
    var html = itemMenu("home", "🏠", "Início", "#home");

    var categorias = {};
    var ordem = [];
    ferramentas.forEach(function (f) {
      var cat = f.categoria || "Ferramentas";
      if (!categorias[cat]) { categorias[cat] = []; ordem.push(cat); }
      categorias[cat].push(f);
    });

    ordem.forEach(function (cat) {
      html += '<div class="menu-group">' + escapeHtml(cat) + "</div>";
      categorias[cat].forEach(function (f) {
        html += itemMenu(
          "tool/" + f.id,
          f.icone || "🔧",
          f.nome,
          "#tool/" + f.id,
          !f.pronta
        );
      });
    });

    menuEl.innerHTML = html;
  }

  function itemMenu(rota, icone, nome, href, badge) {
    return (
      '<a class="menu-item" data-rota="' + rota + '" href="' + href + '">' +
        '<span class="menu-icon">' + icone + "</span>" +
        '<span class="menu-text">' + escapeHtml(nome) + "</span>" +
        (badge ? '<span class="menu-badge">em breve</span>' : "") +
      "</a>"
    );
  }

  function marcarAtivo(rota) {
    var itens = menuEl.querySelectorAll(".menu-item");
    for (var i = 0; i < itens.length; i++) {
      itens[i].classList.toggle("active", itens[i].getAttribute("data-rota") === rota);
    }
  }

  /* ---------- Roteamento por hash (#home, #tool/<id>) ---------- */
  function router() {
    var rota = location.hash.replace(/^#/, "") || "home";

    if (rota.indexOf("tool/") === 0) {
      var id = rota.slice(5);
      var f = encontrar(id);
      if (f) { abrirFerramenta(f); marcarAtivo(rota); }
      else { naoEncontrado(); marcarAtivo(""); }
    } else {
      abrirHome();
      marcarAtivo("home");
    }
    fecharMobile();
  }

  /* ---------- Home ---------- */
  function abrirHome() {
    topbarTitle.textContent = "Início";
    topbarActions.innerHTML = "";

    var cards = ferramentas.map(function (f) {
      return (
        '<a class="card' + (f.pronta ? "" : " soon") + '" href="#tool/' + f.id + '">' +
          '<div class="card-icon">' + (f.icone || "🔧") + "</div>" +
          '<div class="card-title">' + escapeHtml(f.nome) + "</div>" +
          '<div class="card-desc">' + escapeHtml(f.descricao || "") + "</div>" +
          '<div class="card-foot">' +
            '<span class="card-tag">' + (f.pronta ? escapeHtml(f.categoria || "Ferramenta") : "em breve") + "</span>" +
            '<span class="card-arrow">→</span>' +
          "</div>" +
        "</a>"
      );
    }).join("");

    if (!cards) {
      cards = '<div class="card"><div class="card-title">Nenhuma ferramenta ainda</div>' +
        '<div class="card-desc">Adicione ferramentas no arquivo assets/js/tools.js.</div></div>';
    }

    viewEl.innerHTML =
      '<div class="home">' +
        '<div class="hero">' +
          "<h1>Bem-vindo 👋</h1>" +
          "<p>Todas as suas ferramentas de trabalho reunidas em um só lugar. " +
          "Escolha uma ferramenta abaixo ou use o menu ao lado.</p>" +
        "</div>" +
        '<div class="section-title">Ferramentas</div>' +
        '<div class="grid">' + cards + "</div>" +
      "</div>";
  }

  /* ---------- Ferramenta (iframe isolado) ---------- */
  function abrirFerramenta(f) {
    topbarTitle.textContent = f.nome;
    topbarActions.innerHTML =
      '<a class="btn" href="' + f.url + '" target="_blank" rel="noopener">Abrir em nova aba ↗</a>';

    if (!f.pronta) {
      viewEl.innerHTML =
        '<div class="state"><div class="state-inner">' +
          '<div class="state-emoji">🚧</div>' +
          "<h2>" + escapeHtml(f.nome) + "</h2>" +
          "<p>Esta ferramenta ainda não foi integrada. Assim que a pasta dela for " +
          "adicionada em <b>ferramentas/" + escapeHtml(f.id) + "/</b>, ela aparece aqui.</p>" +
        "</div></div>";
      return;
    }

    viewEl.innerHTML =
      '<iframe class="tool-frame" src="' + f.url + '" title="' + escapeHtml(f.nome) + '"></iframe>';
  }

  function naoEncontrado() {
    topbarTitle.textContent = "Não encontrado";
    topbarActions.innerHTML = "";
    viewEl.innerHTML =
      '<div class="state"><div class="state-inner">' +
        '<div class="state-emoji">🔍</div>' +
        "<h2>Ferramenta não encontrada</h2>" +
        '<p>O link acessado não existe. <a href="#home">Voltar ao início</a>.</p>' +
      "</div></div>";
  }

  /* ---------- Menu mobile ---------- */
  menuToggle.addEventListener("click", function () {
    sidebar.classList.add("open");
    overlay.classList.add("show");
  });
  overlay.addEventListener("click", fecharMobile);
  function fecharMobile() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  }

  /* ---------- Utilidades ---------- */
  function encontrar(id) {
    for (var i = 0; i < ferramentas.length; i++) {
      if (ferramentas[i].id === id) return ferramentas[i];
    }
    return null;
  }
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---------- Início ---------- */
  renderMenu();
  window.addEventListener("hashchange", router);
  router();
})();
