/* ============================================================
   Preenchimento automático do Comprovante de Reembolso
   ------------------------------------------------------------
   A aba "Contratos" grava os dados do cliente em localStorage
   antes de abrir esta ferramenta. Este script lê esses dados,
   preenche o formulário e apaga a fila (uso único).

   Sem dados na fila, a página abre exatamente como sempre —
   este arquivo não muda nada do comportamento original.

   Chave: comprovante-prefill
   Formato: { empresa, cliente, cpf, empreendimento, cota,
              valor, forma, chavePix, protocolo }
   ============================================================ */
(function () {
  "use strict";

  var CHAVE = "comprovante-prefill";

  function lerFila() {
    var raw;
    try { raw = localStorage.getItem(CHAVE); } catch (e) { return null; }
    if (!raw) return null;
    try { localStorage.removeItem(CHAVE); } catch (e) {}   // uso único
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function semAcento(s) {
    return String(s == null ? "" : s)
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().trim();
  }

  // o select de empreendimentos é montado pela própria ferramenta;
  // aqui só procuro a opção equivalente, ignorando acento e caixa
  function casarOpcao(select, valor) {
    if (!select || !valor) return "";
    var alvo = semAcento(valor);
    var exato = "", parcial = "", fallback = "";
    for (var i = 0; i < select.options.length; i++) {
      var v = select.options[i].value;
      if (!v) continue;
      var n = semAcento(v);
      if (n === alvo) exato = v;
      else if (!parcial && (n.indexOf(alvo) === 0 || alvo.indexOf(n) === 0)) parcial = v;
      if (/outro/.test(n)) fallback = v;
    }
    return exato || parcial || fallback;
  }

  function porId(id) { return document.getElementById(id); }

  function preencher(d) {
    function set(id, valor) {
      var el = porId(id);
      if (!el || valor == null || valor === "") return;
      el.value = valor;
      if (window.jQuery) window.jQuery(el).trigger("input").trigger("change");
    }

    set("cliente", d.cliente);
    set("cpf", d.cpf);
    set("cota", d.cota);
    set("valor", d.valor);
    set("protocolo", d.protocolo);

    var sel = porId("empreendimento");
    var emp = casarOpcao(sel, d.empreendimento);
    if (emp) set("empreendimento", emp);

    // a forma controla quais campos de destino aparecem: dispara o change
    if (d.forma) {
      set("forma", d.forma);
      if (d.forma === "PIX") set("chavePix", d.chavePix);
    }
  }

  function iniciar() {
    var d = lerFila();
    if (!d) return;
    // roda depois do script da ferramenta, que é quem monta o select
    setTimeout(function () { preencher(d); }, 0);
  }

  if (window.jQuery) window.jQuery(iniciar);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
