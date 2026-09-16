/* ============================================================
   MODELOS DE EMAIL
   ------------------------------------------------------------
   Para adicionar um modelo novo, acrescente um objeto na lista abaixo.

   Campos:
     id       -> identificador único
     nome     -> nome que aparece na lista
     assunto  -> assunto do email (pode usar {{variavel}})
     campos   -> lista de campos a preencher: { chave, rotulo, padrao }
     corpo    -> função que recebe os valores dos campos e retorna
                 { html, texto } — o html vai pro clipboard rico, o texto
                 vai pro clipboard puro.
   ============================================================ */

window.MODELOS_EMAIL = [
  {
    id: "continuidade-reembolso",
    nome: "Continuidade do processo de reembolso",
    assunto: "Continuidade do processo de reembolso",
    campos: [
      { chave: "saudacao",  rotulo: "Saudação",        padrao: "boa noite" },
      { chave: "nome",      rotulo: "Nome do cliente", padrao: "Bruno" },
      { chave: "whatsapp",  rotulo: "Número WhatsApp (só dígitos, com DDD e DDI)", padrao: "5562976025529" },
      { chave: "exibicao",  rotulo: "Número para exibir", padrao: "(62) 97602-5529" },
      { chave: "textoBotao", rotulo: "Texto do botão", padrao: "CLIQUE AQUI PARA DAR CONTINUIDADE" },
      { chave: "mensagemPre", rotulo: "Mensagem pré-preenchida no WhatsApp", padrao: "Olá! Gostaria de dar continuidade ao meu processo de reembolso." }
    ],
    corpo: function(v) {
      var link = "https://wa.me/" + v.whatsapp + "?text=" + encodeURIComponent(v.mensagemPre);

      // saudação: "Olá Bruno, boa tarde." OU "Olá, boa tarde." (sem nome)
      var nome = (v.nome || "").trim();
      var abertura = nome
        ? "Olá " + nome + ", " + v.saudacao + "."
        : "Olá, " + v.saudacao + ".";

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
