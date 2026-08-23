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
     icone     -> um emoji para o ícone
     categoria -> agrupamento no menu (ex.: "Documentos", "Financeiro")
     url       -> caminho do index.html da ferramenta
     pronta    -> true quando já estiver integrada; false mostra "em breve"
   ============================================================ */

window.FERRAMENTAS = [
  {
    id: "contratos",
    nome: "Contratos",
    descricao: "Ficha de cada cliente lida do contrato (GAV e WAM): identificação, imóvel, empresa e o valor efetivamente pago. Gera o distrato já preenchido.",
    icone: "📋",
    categoria: "Documentos",
    url: "ferramentas/contratos/index.html",
    pronta: true
  },
  {
    id: "termo-distrato",
    nome: "Termo de Distrato GAV",
    descricao: "Termo de distrato de compra de unidade imobiliária — modelo GAV (logo azul).",
    icone: "📄",
    categoria: "Documentos",
    url: "ferramentas/termo-distrato/index.html",
    pronta: true
  },
  {
    id: "termo-distrato-wam",
    nome: "Termo de Distrato WAM",
    descricao: "Termo de distrato de compra de unidade imobiliária — modelo WAM (logo verde).",
    icone: "📄",
    categoria: "Documentos",
    url: "ferramentas/termo-distrato-wam/index.html",
    pronta: true
  },
  {
    id: "comprovante-reembolso",
    nome: "Comprovante de Reembolso",
    descricao: "Sistemas de reembolso WAM e GAV (2 modelos): emite comprovantes com dados do cliente, valor e forma de pagamento.",
    icone: "🧾",
    categoria: "Financeiro",
    url: "ferramentas/comprovante-reembolso/index.html",
    pronta: true
  },
  {
    id: "reembolso-wam",
    nome: "Reembolso WAM",
    descricao: "Central de Reembolsos WAM: preenche os dados do cliente e o valor e emite o comprovante de reembolso.",
    icone: "🧾",
    categoria: "Financeiro",
    url: "ferramentas/reembolso-wam/index.html",
    pronta: true
  },
  {
    id: "leads-whatsapp",
    nome: "Leads do WhatsApp",
    descricao: "Mini-CRM dos contatos do WhatsApp: cadastra clientes, status e follow-ups (agenda) e abre a conversa com 1 clique. Salva no navegador.",
    icone: "💬",
    categoria: "Atendimento",
    url: "ferramentas/leads-whatsapp/index.html",
    pronta: true
  }
];
