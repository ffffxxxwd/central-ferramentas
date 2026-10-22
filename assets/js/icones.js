/* ============================================================
   ÍCONES — SVG inline, sem emoji
   ------------------------------------------------------------
   Todos no mesmo traçado (24x24, stroke 1.8, pontas redondas) e
   sempre em currentColor, então acompanham a cor de quem os usa
   e funcionam no tema claro e no escuro sem ajuste.

   Uso:   Icone("contrato")            -> string com o <svg>
          Icone("contrato", "ico-g")   -> com classe extra
   Para acrescentar um ícone novo, basta somar uma entrada em
   TRACOS com o conteúdo interno do <svg> (paths já em 24x24).
   ============================================================ */
(function () {
  "use strict";

  var TRACOS = {
    /* navegação / marca */
    casa:     '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/><path d="M9.5 21v-6h5v6"/>',
    pastas:   '<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h3.8l1.7 2h6.5A1.5 1.5 0 0 1 18 9.5v7A1.5 1.5 0 0 1 16.5 18h-12A1.5 1.5 0 0 1 3 16.5z"/><path d="M7 6V4.5A1.5 1.5 0 0 1 8.5 3h3.8l1.7 2h6.5A1.5 1.5 0 0 1 22 6.5v7a1.5 1.5 0 0 1-1.5 1.5H18"/>',
    menu:     '<path d="M4 7h16M4 12h16M4 17h16"/>',
    lua:      '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
    sol:      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
    seta:     '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',

    /* ferramentas */
    contrato: '<path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1z"/><path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 11h6M9 15h4"/>',
    documento:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
    recibo:   '<path d="M6 3h12v18l-2.4-1.6L13.2 21l-2.4-1.6L8.4 21 6 19.4z"/><path d="M9.5 8h5M9.5 12h5"/>',
    conversa: '<path d="M20 12a7.5 7.5 0 0 1-10.9 6.7L4 20l1.3-4.1A7.5 7.5 0 1 1 20 12z"/><path d="M9 11h6M9 14h3.5"/>',
    dinheiro: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 10v4M18 10v4"/>',
    chave:    '<path d="M14.6 6.4a4 4 0 0 0 5.2 5.2l-8.4 8.4a2.6 2.6 0 0 1-3.7 0l-1.7-1.7a2.6 2.6 0 0 1 0-3.7z"/><path d="m16.8 4.2 3 3"/>',
    envelope: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.6 7 7.4 5.4a2 2 0 0 0 2 0L20.4 7"/>',

    /* estados de tela */
    obras:    '<path d="M3 9.5h18v4H3z"/><path d="M4.5 13.5V20M19.5 13.5V20"/><path d="m7 9.5 3-5M12 9.5l3-5"/>',
    lupa:     '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    cadeado:  '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/><path d="M12 14.5v2"/>',
    novaAba:  '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'
  };

  // nomes antigos (emoji) continuam funcionando: cai no ícone equivalente
  var APELIDOS = {
    "📋": "contrato", "📄": "documento", "🧾": "recibo", "💬": "conversa",
    "💰": "dinheiro", "🔧": "chave", "✉️": "envelope", "✉": "envelope",
    "🏠": "casa", "🗂️": "pastas", "☰": "menu", "🌙": "lua", "☀️": "sol"
  };

  function Icone(nome, classe) {
    var chave = TRACOS[nome] ? nome : (APELIDOS[nome] || "chave");
    return '<svg class="ico' + (classe ? " " + classe : "") + '" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true" focusable="false">' + TRACOS[chave] + "</svg>";
  }

  window.Icone = Icone;
  window.ICONES = TRACOS;
})();
