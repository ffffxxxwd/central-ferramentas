window.MODELOS_EMAIL = [
  {
    id: "continuidade-reembolso",
    nome: "Continuidade do processo de reembolso",
    assunto: "Continuidade do processo de reembolso",
    numeros: [
      { whatsapp: "556296625714", exibicao: "(62) 9662-5714" },
      { whatsapp: "556276025529", exibicao: "(62) 7602-5529" },
      { whatsapp: "556284817629", exibicao: "(62) 8481-7629" }
    ],
    campos: [
      { chave: "nome",      rotulo: "Nome do cliente", padrao: "" },
      { chave: "whatsapp",  rotulo: "Número WhatsApp (só dígitos, com DDD e DDI)", padrao: "556296625714" },
      { chave: "exibicao",  rotulo: "Número para exibir", padrao: "(62) 9662-5714" },
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
  }
];
