/* ============================================================
   Termo de Distrato — lógica
   ============================================================ */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  function setTxt(id, val) { var el = $(id); if (el) el.textContent = val; }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function texto(v, fallback) {
    v = (v == null ? "" : String(v)).trim();
    return v === "" ? (fallback || "") : v;
  }

  /* ---------- Máscaras ---------- */
  function mascaraCPF(v) {
    v = v.replace(/\D/g, "").slice(0, 11);
    return v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  function mascaraCNPJ(v) {
    v = v.replace(/\D/g, "").slice(0, 14);
    return v.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
  function mascaraMoeda(v) {
    v = v.replace(/\D/g, "");
    if (v === "") return "";
    return (parseInt(v, 10) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function moedaParaNumero(str) {
    if (!str) return 0;
    return parseFloat(String(str).replace(/\./g, "").replace(",", ".")) || 0;
  }

  /* ---------- Valor por extenso ---------- */
  var UNI = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove",
    "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  var DEZ = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  var CEM = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
  var ESC_S = ["", "mil", "milhão", "bilhão"];
  var ESC_P = ["", "mil", "milhões", "bilhões"];

  function tresDigitos(num) {
    if (num === 100) return "cem";
    var s = "", c = Math.floor(num / 100), resto = num % 100;
    if (c > 0) s += CEM[c];
    if (resto > 0) {
      if (s) s += " e ";
      if (resto < 20) s += UNI[resto];
      else { s += DEZ[Math.floor(resto / 10)]; if (resto % 10 > 0) s += " e " + UNI[resto % 10]; }
    }
    return s;
  }
  function inteiroPorExtenso(n) {
    n = Math.floor(n);
    if (n === 0) return "zero";
    var grupos = [], t = n;
    while (t > 0) { grupos.push(t % 1000); t = Math.floor(t / 1000); }
    var partes = [], menor = 0;
    for (var i = grupos.length - 1; i >= 0; i--) {
      var g = grupos[i];
      if (g === 0) continue;
      var txt;
      if (i === 1) txt = (g === 1) ? "mil" : tresDigitos(g) + " mil";
      else if (i >= 2) txt = tresDigitos(g) + " " + (g === 1 ? ESC_S[i] : ESC_P[i]);
      else txt = tresDigitos(g);
      partes.push(txt); menor = g;
    }
    if (partes.length === 1) return partes[0];
    var ultimo = partes[partes.length - 1];
    var inicio = partes.slice(0, -1).join(" ");
    var usaE = (menor < 100) || (menor % 100 === 0);
    return inicio + (usaE ? " e " : " ") + ultimo;
  }
  function valorPorExtenso(valor) {
    var reais = Math.floor(valor), centavos = Math.round((valor - reais) * 100), s = "";
    if (reais > 0) s += inteiroPorExtenso(reais) + (reais === 1 ? " real" : " reais");
    if (centavos > 0) { if (s) s += " e "; s += inteiroPorExtenso(centavos) + (centavos === 1 ? " centavo" : " centavos"); }
    return s || "zero real";
  }

  /* ---------- Data ---------- */
  function hojeISO() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function dataBR(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }

  /* ---------- Logo ---------- */
  function aplicarLogo() {
    var align = $("f_logo_align").value;
    var size = $("f_logo_size").value;
    var top = $("f_logo_top").value;
    var bottom = $("f_logo_bottom").value;
    $("docLogo").style.textAlign = align;
    $("docLogo").style.marginTop = top + "px";
    $("docLogo").style.marginBottom = bottom + "px";
    $("docLogoImg").style.height = size + "px";
    setTxt("out_size", size + "px");
    setTxt("out_top", top + "px");
    setTxt("out_bottom", bottom + "px");
    salvar();
  }

  /* ---------- Encaixe em 1 página — SÓ na geração do PDF ----------
     (na tela o documento flui livre; ao imprimir, encolhe só se passar de 1 folha) */
  function pxDeMM(mm) {
    var d = document.createElement("div");
    d.style.height = mm + "mm"; d.style.position = "absolute"; d.style.visibility = "hidden";
    document.body.appendChild(d);
    var px = d.offsetHeight; document.body.removeChild(d);
    return px;
  }
  function ajustarEscala() {
    var inner = $("docInner"), folha = $("folha");
    if (!inner || !folha) return;
    inner.style.transform = "none";
    inner.style.width = "100%";
    var cs = getComputedStyle(folha);
    var disponivel = pxDeMM(297) - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    var natural = inner.scrollHeight;
    if (natural > disponivel && natural > 0) {
      var escala = disponivel / natural;
      inner.style.width = (100 / escala) + "%";
      inner.style.transform = "scale(" + escala + ")";
    }
  }
  function reverterEscala() {
    if ($("docInner")) { $("docInner").style.transform = "none"; $("docInner").style.width = "100%"; }
  }

  /* ---------- Gerar PDF com TEXTO DE VERDADE (dá pra copiar/pesquisar) ----------
     Usa o "Salvar como PDF" do próprio navegador (renderiza o texto real, não uma
     foto). O nome do arquivo já vai sugerido pelo título da página. */
  function gerarPDF(arquivo) {
    var tituloAntigo = document.title;
    document.title = arquivo;                 // vira o nome sugerido no "Salvar como PDF"
    var restaurar = function () {
      document.title = tituloAntigo;
      window.removeEventListener("afterprint", restaurar);
    };
    window.addEventListener("afterprint", restaurar);
    setTimeout(restaurar, 60000);             // fallback, caso o afterprint não dispare
    window.print();
  }

  /* ---------- Cônjuge ---------- */
  function permiteConjuge() {
    var ec = $("f_ec").value;
    return ec === "Casado(a)" || ec === "União estável";
  }
  function atualizarVisibilidadeConjuge() {
    var permite = permiteConjuge();
    $("blocoConjToggle").hidden = !permite;
    if (!permite) $("f_temConj").checked = false;
    $("camposConj").hidden = !(permite && $("f_temConj").checked);
  }

  /* ---------- Múltiplos imóveis ---------- */
  var imoveisExtra = []; // [{unidade: "", cota: ""}]

  function renderExtraImoveis() {
    var container = $("extraImoveis");
    if (!container) return;
    container.innerHTML = "";
    for (var i = 0; i < imoveisExtra.length; i++) {
      (function (idx) {
        var item = imoveisExtra[idx];
        var row = document.createElement("div");
        row.className = "row";
        row.style.cssText = "align-items:flex-end;gap:6px;margin-top:4px";
        var lU = document.createElement("label"); lU.className = "field";
        lU.innerHTML = "<span>Unidade " + (idx + 2) + "</span>";
        var inpU = document.createElement("input"); inpU.type = "text";
        inpU.value = item.unidade; inpU.placeholder = "Apartamento...";
        inpU.addEventListener("input", function () { item.unidade = this.value; atualizarImoveis(); salvar(); });
        lU.appendChild(inpU);
        var lC = document.createElement("label"); lC.className = "field";
        lC.innerHTML = "<span>Cota " + (idx + 2) + "</span>";
        var inpC = document.createElement("input"); inpC.type = "text";
        inpC.value = item.cota; inpC.placeholder = "Cota...";
        inpC.addEventListener("input", function () { item.cota = this.value; atualizarImoveis(); salvar(); });
        lC.appendChild(inpC);
        var btnX = document.createElement("button"); btnX.type = "button";
        btnX.textContent = "×"; btnX.title = "Remover imóvel " + (idx + 2);
        btnX.style.cssText = "background:#c0392b;color:#fff;border:none;border-radius:6px;width:34px;height:34px;font-size:18px;cursor:pointer;flex-shrink:0;margin-bottom:4px";
        btnX.addEventListener("click", function () { imoveisExtra.splice(idx, 1); renderExtraImoveis(); atualizarImoveis(); salvar(); });
        row.appendChild(lU); row.appendChild(lC); row.appendChild(btnX);
        container.appendChild(row);
      })(i);
    }
  }

  function atualizarImoveis() {
    var el = $("pv_imoveis");
    if (!el) return;
    var u1 = texto($("f_unidade").value, "—");
    var c1 = texto($("f_cota").value, "—");
    if (imoveisExtra.length === 0) {
      el.innerHTML = "<b>" + esc(u1) + "</b>, nominado <b>" + esc(c1) + "</b>,";
    } else {
      var todos = [{ unidade: u1, cota: c1 }].concat(imoveisExtra);
      var partes = [];
      for (var i = 0; i < todos.length; i++) {
        partes.push("<b>" + esc(texto(todos[i].unidade, "—")) + "</b> (<b>" + esc(texto(todos[i].cota, "—")) + "</b>)");
      }
      var txt;
      if (partes.length === 2) { txt = partes[0] + " e " + partes[1]; }
      else { txt = partes.slice(0, -1).join(", ") + " e " + partes[partes.length - 1]; }
      el.innerHTML = txt + ",";
    }
  }

  /* ---------- Atualização do preview ---------- */
  function atualizar() {
    var nome = texto($("f_nome").value, "NOME DO CLIENTE");
    setTxt("pv_nome", nome);
    setTxt("pv_nome_ass", nome);
    setTxt("pv_nac", texto($("f_nac").value, "brasileiro(a)"));
    setTxt("pv_ec", texto($("f_ec").value, "Solteiro(a)"));
    setTxt("pv_rg", texto($("f_rg").value, "—"));
    setTxt("pv_cpf", texto($("f_cpf").value, "—"));
    setTxt("pv_fracao", texto($("f_fracao").value, "—"));
    atualizarImoveis();
    setTxt("pv_edificio", texto($("f_edificio").value, "—"));
    setTxt("pv_local", texto($("f_local").value, "—"));
    setTxt("pv_empresa", texto($("f_empresa").value, "—"));
    setTxt("pv_cnpj", texto($("f_cnpj").value, "—"));
    setTxt("pv_pix", $("f_pix").value.trim());
    setTxt("pv_data", (dataBR($("f_data").value) || "__/__/____") + ".");

    // Cônjuge (texto + 2ª assinatura)
    var tem = permiteConjuge() && $("f_temConj").checked;
    var spanConj = $("pv_conjuge");
    if (tem) {
      var cnome = texto($("f_conj_nome").value, "NOME DO CÔNJUGE");
      var cnac = texto($("f_conj_nac").value, "brasileiro(a)");
      var crg = texto($("f_conj_rg").value, "—");
      var ccpf = texto($("f_conj_cpf").value, "—");
      var cec = texto($("f_ec").value, "Casado(a)");
      if (spanConj) {
        spanConj.innerHTML = ", e <b class='up'>" + esc(cnome) + "</b>, " + esc(cnac) + ", " + esc(cec) +
          ", titular da CI/RG <b>" + esc(crg) + "</b> e do CPF: <b>" + esc(ccpf) + "</b>";
      }
      setTxt("pv_verbo", "manifestamos");
      if ($("assConjuge")) $("assConjuge").hidden = false;
      setTxt("pv_nome_conj_ass", cnome);
    } else {
      if (spanConj) spanConj.innerHTML = "";
      setTxt("pv_verbo", "manifesto");
      if ($("assConjuge")) $("assConjuge").hidden = true;
    }

    // Valor + forma escolhida (delegado para atualizarValorForma)
    atualizarValorForma();
    salvar();
  }

  /* ---------- Atualização DIRECIONADA (só o trecho do campo que mudou) ----------
     Assim, editar algo à mão no documento NÃO é apagado quando você mexe
     num campo, clica numa opção ou volta o foco pra janela. */
  function atualizarConjuge() {
    var tem = permiteConjuge() && $("f_temConj").checked;
    var spanConj = $("pv_conjuge");
    if (tem) {
      var cnome = texto($("f_conj_nome").value, "NOME DO CÔNJUGE");
      var cnac = texto($("f_conj_nac").value, "brasileiro(a)");
      var crg = texto($("f_conj_rg").value, "—");
      var ccpf = texto($("f_conj_cpf").value, "—");
      var cec = texto($("f_ec").value, "Casado(a)");
      if (spanConj) {
        spanConj.innerHTML = ", e <b class='up'>" + esc(cnome) + "</b>, " + esc(cnac) + ", " + esc(cec) +
          ", titular da CI/RG <b>" + esc(crg) + "</b> e do CPF: <b>" + esc(ccpf) + "</b>";
      }
      setTxt("pv_verbo", "manifestamos");
      if ($("assConjuge")) $("assConjuge").hidden = false;
      setTxt("pv_nome_conj_ass", cnome);
    } else {
      if (spanConj) spanConj.innerHTML = "";
      setTxt("pv_verbo", "manifesto");
      if ($("assConjuge")) $("assConjuge").hidden = true;
    }
  }

  function atualizarValorForma() {
    var valorStr = $("f_valor").value.trim();
    var forma = $("f_forma").value;
    var misto = (forma === "Reembolso + Estorno");

    // Mostra/esconde blocos conforme o modo
    if ($("blocoMisto")) $("blocoMisto").hidden = !misto;
    if ($("blocoSimples")) $("blocoSimples").hidden = misto;
    if ($("blocoMistoDoc")) $("blocoMistoDoc").hidden = !misto;
    if ($("linhaPix")) $("linhaPix").hidden = (forma === "Estorno Cartão");

    if (misto) {
      // Modo misto: preenche os itens detalhados
      var reembStr = $("f_valor_reemb") ? $("f_valor_reemb").value.trim() : "";
      var meioReemb = $("f_meio_reemb") ? $("f_meio_reemb").value : "PIX";
      var qtdParc = $("f_qtd_parcelas") ? $("f_qtd_parcelas").value.trim() : "";
      var valParc = $("f_valor_parcela") ? $("f_valor_parcela").value.trim() : "";
      setTxt("pv_reemb_valor", reembStr || "0,00");
      setTxt("pv_reemb_extenso", valorPorExtenso(moedaParaNumero(reembStr)));
      setTxt("pv_reemb_meio", meioReemb);
      setTxt("pv_qtd_parcelas", qtdParc || "0");
      setTxt("pv_valor_parcela", valParc || "0,00");
      // Valor total
      var total = moedaParaNumero(reembStr) + (parseInt(qtdParc, 10) || 0) * moedaParaNumero(valParc);
      $("f_extenso").value = valorPorExtenso(total);
      setTxt("pv_extenso", $("f_extenso").value);
      var totalStr = total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      setTxt("pv_valor", totalStr);
    } else {
      // Modo simples: checkboxes originais
      setTxt("pv_valor", valorStr || "0,00");
      setTxt("pv_extenso", texto($("f_extenso").value, "—"));
      var MEIOS = {
        "Reembolso": "a devolução por transferência bancária",
        "Estorno Cartão": "o estorno no cartão de crédito",
        "Cheque": "a devolução por cheque"
      };
      setTxt("pv_meio", MEIOS[forma] || MEIOS["Reembolso"]);
      setTxt("ck_estorno", " "); setTxt("val_estorno", "XXXX,00");
      setTxt("ck_reemb", " ");   setTxt("val_reemb", "XXXX,00");
      setTxt("ck_cheque", " ");  setTxt("val_cheque", "XXXX,00");
      $("op_estorno").classList.remove("ativa");
      $("op_reemb").classList.remove("ativa");
      $("op_cheque").classList.remove("ativa");
      var ck, val, op;
      if (forma === "Estorno Cartão") { ck = "ck_estorno"; val = "val_estorno"; op = "op_estorno"; }
      else if (forma === "Cheque") { ck = "ck_cheque"; val = "val_cheque"; op = "op_cheque"; }
      else { ck = "ck_reemb"; val = "val_reemb"; op = "op_reemb"; }
      setTxt(ck, "X");
      setTxt(val, valorStr || "0,00");
      $(op).classList.add("ativa");
    }
  }

  function sincronizarCampo(id) {
    switch (id) {
      case "f_nome": var n = texto($("f_nome").value, "NOME DO CLIENTE"); setTxt("pv_nome", n); setTxt("pv_nome_ass", n); break;
      case "f_nac": setTxt("pv_nac", texto($("f_nac").value, "brasileiro(a)")); break;
      case "f_ec": setTxt("pv_ec", texto($("f_ec").value, "Solteiro(a)")); atualizarConjuge(); break;
      case "f_rg": setTxt("pv_rg", texto($("f_rg").value, "—")); break;
      case "f_cpf": setTxt("pv_cpf", texto($("f_cpf").value, "—")); break;
      case "f_fracao": setTxt("pv_fracao", texto($("f_fracao").value, "—")); break;
      case "f_unidade": case "f_cota": atualizarImoveis(); break;
      case "f_edificio": setTxt("pv_edificio", texto($("f_edificio").value, "—")); break;
      case "f_local": setTxt("pv_local", texto($("f_local").value, "—")); break;
      case "f_empresa": setTxt("pv_empresa", texto($("f_empresa").value, "—")); break;
      case "f_cnpj": setTxt("pv_cnpj", texto($("f_cnpj").value, "—")); break;
      case "f_pix": setTxt("pv_pix", $("f_pix").value.trim()); break;
      case "f_data": setTxt("pv_data", (dataBR($("f_data").value) || "__/__/____") + "."); break;
      case "f_valor": case "f_extenso": case "f_forma": case "f_valor_reemb": case "f_qtd_parcelas": case "f_valor_parcela": case "f_meio_reemb": atualizarValorForma(); break;
      case "f_conj_nome": case "f_conj_nac": case "f_conj_rg": case "f_conj_cpf": atualizarConjuge(); break;
    }
  }

  /* ---------- Valor por extenso ao editar o valor DIRETO no documento ----------
     Quando o usuário altera o "R$ ..." dentro do documento (modo edição),
     o "(por extenso)" ao lado é recalculado sozinho. */
  function sincronizarExtenso() {
    var pvValor = $("pv_valor"), pvExt = $("pv_extenso");
    if (!pvValor || !pvExt) return;
    var sel = window.getSelection();
    if (sel && sel.anchorNode && pvExt.contains(sel.anchorNode)) return; // não atrapalha edição manual do extenso
    var v = moedaParaNumero(pvValor.textContent);
    if (!(v > 0)) return;
    var ext = valorPorExtenso(v);
    if (pvExt.textContent !== ext) pvExt.textContent = ext;
    var fmt = v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if ($("f_valor") && $("f_valor").value !== fmt) $("f_valor").value = fmt;
    if ($("f_extenso")) $("f_extenso").value = ext;
  }

  /* ---------- Preencher o formulário a partir do contrato lido (PDF) ---------- */
  function preencherDoContrato(d) {
    var ok = [];
    if (d.nome) { $("f_nome").value = d.nome; ok.push("Nome"); }
    if (d.nacionalidade) { $("f_nac").value = d.nacionalidade; ok.push("Nacionalidade"); }
    if (d.estadoCivil) { $("f_ec").value = d.estadoCivil; ok.push("Estado civil"); }
    if (d.rg) { $("f_rg").value = d.rg; ok.push("RG"); }
    if (d.cpf) { $("f_cpf").value = mascaraCPF(d.cpf); ok.push("CPF"); }
    if (d.unidade) { $("f_unidade").value = d.unidade; ok.push("Unidade"); }
    if (d.cota) { $("f_cota").value = d.cota; ok.push("Cota"); }
    if (d.empreendimento) { $("f_edificio").value = d.empreendimento; ok.push("Empreendimento"); }
    if (d.local) { $("f_local").value = d.local; ok.push("Localização"); }
    if (d.empresa) { $("f_empresa").value = d.empresa; ok.push("Empresa"); }
    if (d.cnpj) { $("f_cnpj").value = mascaraCNPJ(d.cnpj); ok.push("CNPJ"); }
    if (d.conjugeNome) {
      if ($("f_ec").value !== "Casado(a)" && $("f_ec").value !== "União estável") $("f_ec").value = "Casado(a)";
      $("f_temConj").checked = true;
      $("f_conj_nome").value = d.conjugeNome;
      if (d.conjugeRg) $("f_conj_rg").value = d.conjugeRg;
      if (d.conjugeCpf) $("f_conj_cpf").value = mascaraCPF(d.conjugeCpf);
      ok.push("Cônjuge");
    }
    atualizarVisibilidadeConjuge();
    atualizar();
    return ok;
  }

  /* ---------- Aviso rápido (toast) ---------- */
  function toast(msg) {
    var t = document.getElementById("__toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "__toast";
      t.style.cssText = "position:fixed;left:50%;top:14px;transform:translateX(-50%);background:#15324e;color:#fff;padding:12px 18px;border-radius:10px;font:600 13px/1.45 system-ui,Segoe UI,Arial;z-index:9999;box-shadow:0 10px 34px rgba(0,0,0,.28);max-width:560px;text-align:center;opacity:0;transition:opacity .25s";
      document.body.appendChild(t);
    }
    t.innerHTML = msg;
    requestAnimationFrame(function () { t.style.opacity = "1"; });
    clearTimeout(t.__tm);
    t.__tm = setTimeout(function () { t.style.opacity = "0"; }, 6000);
  }

  /* ---------- Ligações ---------- */
  function ligar() {
    $("f_cpf").addEventListener("input", function () { this.value = mascaraCPF(this.value); });
    $("f_conj_cpf").addEventListener("input", function () { this.value = mascaraCPF(this.value); });
    $("f_cnpj").addEventListener("input", function () { this.value = mascaraCNPJ(this.value); });
    $("f_valor").addEventListener("input", function () {
      this.value = mascaraMoeda(this.value);
      $("f_extenso").value = valorPorExtenso(moedaParaNumero(this.value));
    });
    if ($("f_valor_reemb")) $("f_valor_reemb").addEventListener("input", function () { this.value = mascaraMoeda(this.value); });
    if ($("f_valor_parcela")) $("f_valor_parcela").addEventListener("input", function () { this.value = mascaraMoeda(this.value); });

    var campos = ["f_nome", "f_nac", "f_rg", "f_cpf", "f_fracao", "f_unidade",
      "f_cota", "f_local", "f_edificio", "f_empresa", "f_cnpj", "f_forma",
      "f_valor", "f_extenso", "f_pix", "f_data",
      "f_conj_nome", "f_conj_nac", "f_conj_rg", "f_conj_cpf",
      "f_meio_reemb", "f_valor_reemb", "f_qtd_parcelas", "f_valor_parcela"];
    campos.forEach(function (id) {
      var el = $(id);
      var h = function () { sincronizarCampo(id); salvar(); };
      el.addEventListener("input", h);
      el.addEventListener("change", h);
    });

    // Estado civil e checkbox de cônjuge: mexem na visibilidade
    $("f_ec").addEventListener("change", function () { atualizarVisibilidadeConjuge(); sincronizarCampo("f_ec"); salvar(); });
    $("f_temConj").addEventListener("change", function () { atualizarVisibilidadeConjuge(); atualizarConjuge(); salvar(); });

    // Botão adicionar imóvel
    if ($("btnAddImovel")) {
      $("btnAddImovel").addEventListener("click", function () {
        imoveisExtra.push({ unidade: "", cota: "" });
        renderExtraImoveis();
        atualizarImoveis();
        salvar();
        var container = $("extraImoveis");
        var inputs = container.querySelectorAll("input");
        if (inputs.length > 0) inputs[inputs.length - 2].focus();
      });
    }

    // Ajustes do logo
    ["f_logo_align", "f_logo_size", "f_logo_top", "f_logo_bottom"].forEach(function (id) {
      $(id).addEventListener("input", aplicarLogo);
      $(id).addEventListener("change", aplicarLogo);
    });

    // ---- Modo de edição (lápis): liga/desliga a edição livre ----
    var editando = false;
    $("btnEdit").addEventListener("click", function () {
      editando = !editando;
      $("folha").setAttribute("contenteditable", editando ? "true" : "false");
      $("docLogo").setAttribute("contenteditable", "false"); // logo nunca é texto editável
      $("editBar").hidden = !editando;
      $("btnEdit").classList.toggle("ativo", editando);
      $("btnEdit").textContent = editando ? "✓ Editando (clique p/ sair)" : "✏️ Editar documento";
      document.body.classList.toggle("modo-edicao", editando);
    });
    // Retorna a linha (bloco direto do documento) onde está o cursor — SEM destaque visual
    function linhaDoCursor() {
      var no = rangeSalvo ? rangeSalvo.startContainer : null;
      if (!no) {
        var sel = window.getSelection();
        if (sel && sel.rangeCount) no = sel.getRangeAt(0).startContainer;
      }
      if (!no || !$("docInner").contains(no)) return null;
      var el = (no.nodeType === 3) ? no.parentElement : no;
      while (el && el.parentElement !== $("docInner")) el = el.parentElement;
      return (el && el.parentElement === $("docInner") && el.id !== "docLogo") ? el : null;
    }
    function avisarSemLinha() {
      var hint = document.querySelector(".edit-bar__hint");
      if (!hint) return;
      hint.style.color = "#c0392b"; hint.style.fontWeight = "700";
      setTimeout(function () { hint.style.color = ""; hint.style.fontWeight = ""; }, 1500);
    }
    // FORA do modo edição: clicar nas 3 opções troca a forma de reembolso
    var mapaOpcoes = { op_estorno: "Estorno Cartão", op_reemb: "Reembolso", op_cheque: "Cheque" };
    Object.keys(mapaOpcoes).forEach(function (idOp) {
      var elOp = $(idOp);
      if (!elOp) return;
      elOp.addEventListener("click", function () {
        if (editando) return; // no modo edição deixa editar o texto livremente
        $("f_forma").value = mapaOpcoes[idOp];
        atualizarValorForma();
        salvar();
      });
    });

    // Preserva a seleção de texto para os botões de formatação não perderem o trecho
    var rangeSalvo = null;
    document.addEventListener("selectionchange", function () {
      var sel = window.getSelection();
      if (sel && sel.rangeCount && $("folha").contains(sel.anchorNode)) {
        rangeSalvo = sel.getRangeAt(0).cloneRange();
      }
    });
    function restaurarSelecao() {
      if (!rangeSalvo) return;
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(rangeSalvo);
    }
    // Não perder o foco/seleção ao clicar nos botões da barra
    $("editBar").addEventListener("mousedown", function (e) {
      if (e.target.closest("button")) e.preventDefault();
    });
    // Cliques na barra: formatação (N/I/S) e espaço da linha
    $("editBar").addEventListener("click", function (e) {
      var fmt = e.target.closest("button[data-fmt]");
      if (fmt) {
        restaurarSelecao();
        document.execCommand(fmt.getAttribute("data-fmt"), false, null);
        salvar();
        return;
      }
      var esp = e.target.closest("button[data-esp]");
      if (esp) {
        var linha = linhaDoCursor();
        if (!linha) { avisarSemLinha(); return; }
        var prop = esp.getAttribute("data-esp");
        var delta = parseFloat(esp.getAttribute("data-delta"));
        var atual = parseFloat(linha.style[prop] || 0);
        linha.style[prop] = Math.max(0, atual + delta) + "px";
        salvar();
        return;
      }
    });
    // Tamanho da fonte do trecho selecionado
    $("selFonte").addEventListener("change", function () {
      var px = this.value; this.value = "";
      if (!px) return;
      restaurarSelecao();
      document.execCommand("fontSize", false, "7");
      var fonts = $("folha").querySelectorAll('font[size="7"]');
      for (var i = 0; i < fonts.length; i++) { fonts[i].removeAttribute("size"); fonts[i].style.fontSize = px + "px"; }
      salvar();
    });
    // Adicionar uma linha em branco depois da linha selecionada (ou no fim)
    $("btnAddLinha").addEventListener("click", function () {
      var vazia = document.createElement("p");
      vazia.className = "doc-p";
      vazia.innerHTML = "&nbsp;";
      var linha = linhaDoCursor();
      if (linha && linha.parentElement === $("docInner")) {
        $("docInner").insertBefore(vazia, linha.nextSibling);
      } else {
        $("docInner").appendChild(vazia);
      }
      salvar();
    });

    // ---- Logo: arrastar livremente + trocar imagem ----
    (function () {
      var logo = $("docLogo");
      if (!logo) return;
      logo.setAttribute("title", "No modo edição: arraste para mover · duplo-clique troca a imagem");
      function escalaDoc() {
        var m = (($("docInner").style.transform) || "").match(/scale\(([-\d.]+)\)/);
        return m ? parseFloat(m[1]) : 1;
      }
      function getTranslate() {
        var m = ((logo.style.transform) || "").match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
        return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 0, y: 0 };
      }
      var dragging = false, sx, sy, base, moved;
      logo.addEventListener("mousedown", function (e) {
        if (!editando) return;
        dragging = true; moved = false;
        sx = e.clientX; sy = e.clientY; base = getTranslate();
        e.preventDefault();
      });
      document.addEventListener("mousemove", function (e) {
        if (!dragging) return;
        var esc = escalaDoc();
        var dx = (e.clientX - sx) / esc, dy = (e.clientY - sy) / esc;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
        logo.style.transform = "translate(" + (base.x + dx) + "px," + (base.y + dy) + "px)";
      });
      document.addEventListener("mouseup", function () {
        if (!dragging) return;
        dragging = false;
        if (moved) salvar();
      });
      $("btnTrocarLogo").addEventListener("click", function () { $("fileLogo").click(); });
      logo.addEventListener("dblclick", function () { $("fileLogo").click(); });
      $("fileLogo").addEventListener("change", function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () { $("docLogoImg").src = reader.result; salvar(); };
        reader.readAsDataURL(file);
      });
    })();

    // Na tela o documento flui livre. O encaixe em 1 página só ocorre ao gerar o PDF.
    $("folha").addEventListener("input", function () { sincronizarExtenso(); salvar(); });
    window.addEventListener("beforeprint", ajustarEscala);
    window.addEventListener("afterprint", reverterEscala);

    // Data do distrato sempre = hoje (salvo se o usuário trocar manualmente)
    var dataManual = false;
    $("f_data").addEventListener("input", function () { dataManual = true; });
    function definirHoje() {
      if (dataManual) return;
      $("f_data").value = hojeISO();
      sincronizarCampo("f_data");
      salvar();
    }
    window.addEventListener("focus", definirHoje);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) definirHoje(); });

    $("btnPdf").addEventListener("click", function () {
      // Baixa o PDF automaticamente com o nome "Distrato - NOME - DD-MM-AAAA"
      var nome = ($("f_nome").value || "cliente").trim();
      var d = dataBR($("f_data").value) || "";
      gerarPDF("Distrato - " + nome + (d ? " - " + d.replace(/\//g, "-") : ""));
    });

    // ---- Ler contrato (PDF) e preencher automaticamente ----
    if ($("btnLerContrato") && $("fileContrato")) {
      $("btnLerContrato").addEventListener("click", function () { $("fileContrato").click(); });
      $("fileContrato").addEventListener("change", function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!window.LerContrato) { alert("O leitor de contrato não carregou. Recarregue a página."); return; }
        var btn = $("btnLerContrato"), txt = btn.textContent;
        btn.textContent = "Lendo…"; btn.disabled = true;
        window.LerContrato.lerPDF(file).then(function (texto) {
          btn.textContent = txt; btn.disabled = false; e.target.value = "";
          if (window.LerContrato.pareceEscaneado(texto)) {
            alert("Esse PDF é uma IMAGEM ESCANEADA (ex.: CamScanner) — não tem texto pra ler automaticamente.\n\nUse o arquivo DIGITAL/original do contrato (o que vem do sistema de assinatura, não a foto escaneada). Se só tiver o escaneado, preencha manualmente por enquanto.");
            return;
          }
          var d = window.LerContrato.extrair(texto);
          var campos = preencherDoContrato(d);
          if (!campos.length) {
            alert("Li o texto do PDF, mas não reconheci os campos (modelo diferente).\n\nMe manda esse contrato que eu ajusto o leitor pra ele.");
          } else {
            toast("✅ Preenchi do contrato: <b>" + campos.join(", ") + "</b>.<br>Confira os dados e digite o <b>VALOR</b> do reembolso.");
          }
        }).catch(function (err) {
          btn.textContent = txt; btn.disabled = false; e.target.value = "";
          alert("Não consegui ler o PDF (" + (err && err.message || err) + ").\n\nSe o contrato for uma imagem escaneada, o leitor automático não funciona — nesse caso preencha manualmente.");
        });
      });
    }

    $("btnLimpar").addEventListener("click", function () {
      if (!confirm("Limpar tudo e recomeçar? As edições salvas neste navegador serão apagadas.")) return;
      try { localStorage.removeItem(CHAVE); } catch (e) {}
      location.reload();
    });

    // ---- Restaurar documento base (desfaz edições no texto; mantém os dados do formulário) ----
    if ($("btnBase")) {
      $("btnBase").addEventListener("click", function () {
        if (!confirm("Voltar o documento pro MODELO BASE?\n\nAs mudanças que você fez no texto/layout do documento serão desfeitas.\nOs dados do formulário (nome, CPF, valor, etc.) continuam.")) return;
        $("docInner").innerHTML = DOC_BASE;
        if (window.LOGO_PADRAO && $("docLogoImg")) $("docLogoImg").src = window.LOGO_PADRAO;
        atualizar();     // re-preenche o modelo base com os dados atuais do formulário
        aplicarLogo();   // reaplica posição/tamanho do logo
        toast("↺ Documento voltou pro modelo base (os dados do formulário foram mantidos).");
      });
    }
  }

  /* ---------- Persistência (cache local no navegador) ---------- */
  var CHAVE = "termo-distrato-v6";
  var CAMPOS = ["f_nome", "f_nac", "f_ec", "f_rg", "f_cpf", "f_fracao", "f_unidade", "f_cota",
    "f_local", "f_edificio", "f_empresa", "f_cnpj", "f_forma", "f_valor", "f_extenso", "f_pix",
    "f_conj_nome", "f_conj_nac", "f_conj_rg", "f_conj_cpf",
    "f_meio_reemb", "f_valor_reemb", "f_qtd_parcelas", "f_valor_parcela",
    "f_logo_align", "f_logo_size", "f_logo_top", "f_logo_bottom"];

  function salvar() {
    try {
      var dados = { campos: {}, temConj: $("f_temConj").checked, docHTML: $("docInner").innerHTML, imoveisExtra: imoveisExtra };
      CAMPOS.forEach(function (id) { dados.campos[id] = $(id).value; });
      localStorage.setItem(CHAVE, JSON.stringify(dados));
    } catch (e) {}
  }
  function carregar() {
    var raw;
    try { raw = localStorage.getItem(CHAVE); } catch (e) { return false; }
    if (!raw) return false;
    var dados;
    try { dados = JSON.parse(raw); } catch (e) { return false; }
    if (!dados || !dados.campos) return false;
    if (dados.docHTML) $("docInner").innerHTML = dados.docHTML;
    CAMPOS.forEach(function (id) {
      var el = $(id);
      if (el && dados.campos[id] != null) el.value = dados.campos[id];
    });
    $("f_temConj").checked = !!dados.temConj;
    if (dados.imoveisExtra && Array.isArray(dados.imoveisExtra)) imoveisExtra = dados.imoveisExtra;
    return true;
  }

  /* ---------- Início ---------- */
  var DOC_BASE = $("docInner").innerHTML;   // guarda o documento BASE (modelo limpo) antes de restaurar
  var restaurou = carregar();               // restaura o que estava salvo (se houver)
  $("f_data").value = hojeISO();             // data sempre atualizada para hoje
  if (!restaurou) $("f_extenso").value = valorPorExtenso(moedaParaNumero($("f_valor").value));
  // Logo embutido como dataURL (necessário para o gerador de PDF funcionar com arquivo local)
  if (window.LOGO_PADRAO && $("docLogoImg")) {
    var _src = $("docLogoImg").getAttribute("src") || "";
    if (_src.indexOf("data:") !== 0) $("docLogoImg").src = window.LOGO_PADRAO;
  }
  ligar();
  renderExtraImoveis();
  atualizarVisibilidadeConjuge();
  aplicarLogo();
  if (!restaurou) atualizar();   // se restaurou do cache, mantém o documento salvo (edições livres)
})();
