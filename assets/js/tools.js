/* ============================================================
   LISTA DE FERRAMENTAS
   ------------------------------------------------------------
   Para adicionar uma ferramenta nova:
     1) Copie a pasta da ferramenta para  ferramentas/<id>/
        (o arquivo principal dela deve se chamar index.html)
     2) Acrescente um objeto na lista abaixo.

   Campos:
     id        -> identificador único (mesmo nome da pasta), sem espaços
     nome      -> nome que aparece no menu e no card
     descricao -> texto curto explicando a ferramenta
     icone     -> nome do ícone em assets/js/icones.js (ex.: "contrato")
     categoria -> agrupamento no menu (ex.: "Documentos", "Financeiro")
     url       -> caminho do index.html da ferramenta
     pronta    -> true quando já estiver integrada; false mostra "em breve"
   ============================================================ */

window.FERRAMENTAS = [
  {
    id: "contratos",
    nome: "Contratos",
    descricao: "Ficha de cada cliente lida do contrato (GAV e WAM): identificação, imóvel, empresa e o valor efetivamente pago. Gera o distrato já preenchido.",
    icone: "contrato",
    categoria: "Documentos",
    url: "ferramentas/contratos/index.html",
    pronta: true
  },
  {
    id: "termo-distrato",
    nome: "Termo de Distrato GAV",
    descricao: "Termo de distrato de compra de unidade imobiliária — modelo GAV (logo azul).",
    icone: "documento",
    categoria: "Documentos",
    url: "ferramentas/termo-distrato/index.html",
    pronta: true
  },
  {
    id: "termo-distrato-wam",
    nome: "Termo de Distrato WAM",
    descricao: "Termo de distrato de compra de unidade imobiliária — modelo WAM (logo verde).",
    icone: "documento",
    categoria: "Documentos",
    url: "ferramentas/termo-distrato-wam/index.html",
    pronta: true
  },
  {
    id: "comprovante-reembolso",
    nome: "Comprovante de Reembolso",
    descricao: "Sistemas de reembolso WAM e GAV (2 modelos): emite comprovantes com dados do cliente, valor e forma de pagamento.",
    icone: "recibo",
    categoria: "Financeiro",
    url: "ferramentas/comprovante-reembolso/index.html",
    pronta: true
  },
  {
    id: "reembolso-wam",
    nome: "Reembolso WAM",
    descricao: "Central de Reembolsos WAM: preenche os dados do cliente e o valor e emite o comprovante de reembolso.",
    icone: "recibo",
    categoria: "Financeiro",
    url: "ferramentas/reembolso-wam/index.html",
    pronta: true
  },
  {
    id: "gastos",
    nome: "GAV e WAM",
    descricao: "Controle de gastos e receitas da GAV e da WAM: saldo, filtros e exportação CSV. Salva no navegador.",
    icone: "dinheiro",
    categoria: "Gastos e Receitas",
    url: "ferramentas/gastos/index.html",
    pronta: true
  },
  {
    id: "auto-pecas",
    nome: "Auto Peças",
    descricao: "Dashboard do trampo de auto peças: gastos, receitas e lucro com os mesmos filtros. Números totalmente separados da GAV e WAM.",
    icone: "chave",
    categoria: "Gastos e Receitas",
    url: "ferramentas/auto-pecas/index.html",
    pronta: true
  },
  {
    id: "emails",
    nome: "Modelos de Email",
    descricao: "Modelos prontos de email para o cliente (continuidade do reembolso, etc). Preenche os campos e copia o email já formatado com botão de WhatsApp.",
    icone: "envelope",
    categoria: "Emails",
    url: "ferramentas/emails/index.html",
    pronta: true
  }
];
