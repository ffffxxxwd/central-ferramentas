(function() {
  var listaEl = document.getElementById("listaModelos");
  var editorEl = document.getElementById("editor");
  var modeloAtivo = null;
  var valoresAtivos = {};

  function renderLista() {
    listaEl.innerHTML = "";
    window.MODELOS_EMAIL.forEach(function(m) {
      var li = document.createElement("li");
      li.textContent = m.nome;
      li.dataset.id = m.id;
      if (modeloAtivo && modeloAtivo.id === m.id) li.classList.add("ativo");
      li.addEventListener("click", function() { selecionar(m.id); });
      listaEl.appendChild(li);
    });
  }

  function selecionar(id) {
    modeloAtivo = window.MODELOS_EMAIL.find(function(m) { return m.id === id; });
    valoresAtivos = {};
    modeloAtivo.campos.forEach(function(c) { valoresAtivos[c.chave] = c.padrao; });
    renderLista();
    renderEditor();
  }

  function renderEditor() {
    if (!modeloAtivo) return;
    var m = modeloAtivo;

    var camposHTML = m.campos.map(function(c) {
      var largo = c.chave === "mensagemPre" || c.chave === "textoBotao" ? " largo" : "";
      return '<div class="campo' + largo + '">' +
             '<label>' + c.rotulo + '</label>' +
             '<input type="text" data-chave="' + c.chave + '" value="' + escapeAttr(valoresAtivos[c.chave]) + '" />' +
             '</div>';
    }).join("");

    editorEl.innerHTML =
      '<h2>' + m.nome + '</h2>' +
      '<div class="assunto-info">Assunto: <strong>' + m.assunto + '</strong></div>' +
      '<div class="campos">' + camposHTML + '</div>' +
      '<div class="preview" id="preview"></div>' +
      '<div class="acoes">' +
        '<button class="btn primario" data-acao="copiar-html">Copiar email (formatado)</button>' +
        '<button class="btn" data-acao="copiar-texto">Copiar como texto</button>' +
        '<button class="btn" data-acao="copiar-link">Copiar só o link do botão</button>' +
      '</div>';

    editorEl.querySelectorAll("input[data-chave]").forEach(function(inp) {
      inp.addEventListener("input", function() {
        valoresAtivos[inp.dataset.chave] = inp.value;
        atualizarPreview();
      });
    });

    editorEl.querySelector('[data-acao="copiar-html"]').addEventListener("click", copiarHTML);
    editorEl.querySelector('[data-acao="copiar-texto"]').addEventListener("click", copiarTexto);
    editorEl.querySelector('[data-acao="copiar-link"]').addEventListener("click", copiarLink);

    atualizarPreview();
  }

  function atualizarPreview() {
    var out = modeloAtivo.corpo(valoresAtivos);
    var assunto = interpolar(modeloAtivo.assunto, valoresAtivos);
    document.getElementById("preview").innerHTML =
      '<div class="assunto">Assunto: <strong>' + assunto + '</strong></div>' + out.html;
  }

  function copiarHTML() {
    var out = modeloAtivo.corpo(valoresAtivos);
    var blobHTML = new Blob([out.html], { type: "text/html" });
    var blobText = new Blob([out.texto], { type: "text/plain" });
    if (navigator.clipboard && window.ClipboardItem) {
      navigator.clipboard.write([
        new ClipboardItem({ "text/html": blobHTML, "text/plain": blobText })
      ]).then(function() {
        flash(event.target, "Copiado!");
      }).catch(function() {
        fallbackCopy(out.html);
      });
    } else {
      fallbackCopy(out.html);
    }
  }

  function copiarTexto() {
    var out = modeloAtivo.corpo(valoresAtivos);
    navigator.clipboard.writeText(out.texto).then(function() {
      flash(event.target, "Copiado!");
    });
  }

  function copiarLink() {
    var out = modeloAtivo.corpo(valoresAtivos);
    navigator.clipboard.writeText(out.link).then(function() {
      flash(event.target, "Link copiado!");
    });
  }

  function fallbackCopy(html) {
    var ta = document.createElement("textarea");
    ta.value = html;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }

  function flash(botao, msg) {
    var original = botao.textContent;
    botao.textContent = msg;
    botao.classList.add("ok");
    setTimeout(function() {
      botao.textContent = original;
      botao.classList.remove("ok");
    }, 1500);
  }

  function interpolar(str, v) {
    return str.replace(/\{\{(\w+)\}\}/g, function(_, k) { return v[k] || ""; });
  }
  function escapeAttr(s) {
    return String(s || "").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  // Init
  renderLista();
  if (window.MODELOS_EMAIL.length > 0) selecionar(window.MODELOS_EMAIL[0].id);
})();
