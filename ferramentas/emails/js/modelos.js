window.MODELOS_EMAIL = [
  {
    id: "continuidade-reembolso",
    nome: "Continuidade do processo de reembolso",
    assunto: "Continuidade do processo de reembolso",
    numeros: [
      { whatsapp: "5562910237230", exibicao: "(62) 91023-7230" }
    ],
    campos: [
      { chave: "nome",      rotulo: "Nome do cliente", padrao: "" },
      { chave: "whatsapp",  rotulo: "Número WhatsApp (só dígitos, com DDD e DDI)", padrao: "5562910237230" },
      { chave: "exibicao",  rotulo: "Número para exibir", padrao: "(62) 91023-7230" },
      { chave: "textoBotao", rotulo: "Texto do botão", padrao: "CLIQUE AQUI PARA DAR CONTINUIDADE" },
      { chave: "mensagemPre", rotulo: "Mensagem pré-preenchida no WhatsApp", padrao: "Olá! Gostaria de dar continuidade ao meu processo de reembolso." }
    ],
    corpo: function(v) {
      var link = "https://wa.me/" + v.whatsapp + "?text=" + encodeURIComponent(v.mensagemPre);

      var nome = (v.nome || "").trim();
      var abertura = nome ? "Prezado(a) " + nome + "," : "Prezado(a),";

      var html =
        '<p>' + abertura + '</p>' +
        '<p>Preciso que entre em contato via WhatsApp para dar continuidade ao seu processo de reembolso.</p>' +
        '<p><a class="botao" href="' + link + '">' + v.textoBotao + '</a></p>' +
        '<p>Ou pelo número: <strong>' + v.exibicao + '</strong></p>' +
        '<p>Atenciosamente.</p>';

      var texto =
        abertura + '\n\n' +
        'Preciso que entre em contato via WhatsApp para dar continuidade ao seu processo de reembolso.\n\n' +
        v.textoBotao + ': ' + link + '\n\n' +
        'Ou pelo número: ' + v.exibicao + '\n\n' +
        'Atenciosamente.';

      return { html: html, texto: texto, link: link };
    }
  },

  {
    id: "retomada-distrato-assinado",
    nome: "Distrato assinado — entrar em contato",
    assunto: "Recebemos seu termo de distrato assinado",
    numeros: [
      { whatsapp: "5562910237230", exibicao: "(62) 91023-7230" }
    ],
    campos: [
      { chave: "nome",       rotulo: "Nome do cliente", padrao: "" },
      { chave: "referencia", rotulo: "Empreendimento e cota (ajuda o cliente a reconhecer)", padrao: "" },
      { chave: "whatsapp",   rotulo: "Número WhatsApp (só dígitos, com DDD e DDI)", padrao: "5562910237230" },
      { chave: "exibicao",   rotulo: "Número para exibir", padrao: "(62) 91023-7230" },
      { chave: "textoBotao", rotulo: "Texto do botão", padrao: "CLIQUE AQUI PARA FALAR COMIGO" },
      { chave: "mensagemPre", rotulo: "Mensagem que já vem digitada no WhatsApp dela (use {nome} e {referencia})",
        padrao: "Olá! O termo de distrato já foi assinado. Gostaria de dar continuidade ao processo de reembolso do contrato de {nome}{referencia}." }
    ],
    corpo: function(v) {
      var nome = (v.nome || "").trim();
      var abertura = nome ? "Prezado(a) " + nome + "," : "Prezado(a),";

      var ref = (v.referencia || "").trim();

      // A mensagem já chega identificada no WhatsApp: o nome do titular e a cota
      // vêm escritos, para saber de quem é assim que ela envia. Falar "o contrato
      // de Fulano" em vez de "sou Fulano" também cobre o caso de quem manda não
      // ser o titular — cônjuge, filho, advogado.
      // Se um campo ficar vazio, a frase se fecha sozinha: sem nome, "do contrato
      // de" vira "do meu contrato"; sem cota, a parte do empreendimento some.
      var pre = String(v.mensagemPre || "")
        .replace(/\{nome\}/g, nome)
        .replace(/\{referencia\}/g, ref ? ", referente a " + ref : "")
        .replace(/\bdo contrato de\s*(?=[,.]|$)/gi, "do meu contrato")
        .replace(/\s{2,}/g, " ")
        .replace(/\s+([.,!?])/g, "$1")
        .trim();

      var link = "https://wa.me/" + v.whatsapp + "?text=" + encodeURIComponent(pre);

      var html =
        '<p>' + abertura + '</p>' +
        '<p>Recebemos o seu termo de distrato assinado.</p>' +
        (ref ? '<p>Referente a: <strong>' + ref + '</strong></p>' : '') +
        '<p>Para darmos continuidade ao processo de reembolso, pedimos que entre em contato ' +
          'conosco pelo WhatsApp:</p>' +
        '<p><a class="botao" href="' + link + '">' + v.textoBotao + '</a></p>' +
        '<p>Ou pelo número: <strong>' + v.exibicao + '</strong></p>' +
        '<p>Atenciosamente.</p>';

      var texto =
        abertura + '\n\n' +
        'Recebemos o seu termo de distrato assinado.\n\n' +
        (ref ? 'Referente a: ' + ref + '\n\n' : '') +
        'Para darmos continuidade ao processo de reembolso, pedimos que entre em contato ' +
          'conosco pelo WhatsApp:\n\n' +
        v.textoBotao + ': ' + link + '\n\n' +
        'Ou pelo número: ' + v.exibicao + '\n\n' +
        'Atenciosamente.';

      return { html: html, texto: texto, link: link };
    }
  }
];
