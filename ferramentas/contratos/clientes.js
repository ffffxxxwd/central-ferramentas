/* ============================================================
   CONTRATOS — base de dados dos clientes
   ------------------------------------------------------------
   Este arquivo é a "ficha" de cada cliente lido dos contratos.
   Cada contrato novo vira mais um objeto no final da lista.
   NÃO apague os anteriores.

   Campos de cada cliente:
     id                    identificador único (sem espaços)
     nome, cpf, rg, nacionalidade, estadoCivil
     conjuge: { nome, cpf, rg, email }
     empreendimento, bloco, apartamento, andar, cota, fracao   (fração = 1/52 padrão em todos)
     localizacao           estado/UF do empreendimento  (usado no distrato)
     empresa               "GAV" ou "WAM"
     razaoSocial, cnpj
     valorPago             >>> O QUE O CLIENTE REALMENTE PAGOU (base do reembolso)
     valorTotal            valor total do contrato
     corretagem, sinal
     parcelas: [ { tipo, qtd, valor, forma, vencimento } ]
     formaPagamentoEntrada, dataAssinatura
     formaReembolso        força Reembolso / Estorno Cartão / Cheque no distrato
                           (deixe vazio que ele deduz da forma de pagamento)
     telefone              celular do cliente (usado na mensagem de WhatsApp)
     email                 e-mail do cliente (destinatário do termo de distrato)
     clausulaExtra         texto opcional que entra no distrato logo abaixo do valor
     pix                   quase sempre vazio — quem preenche a chave PIX é o
                           próprio cliente na hora de assinar o distrato
     observacoes

   Valores em número (1200.5) ou em texto ("1.200,50") — os dois funcionam.
   Datas em "AAAA-MM-DD" ou "DD/MM/AAAA".
   ============================================================ */

window.CLIENTES = [

  /* ---------- 001 — GAV — R0001-BLOCO 01-622-21 ---------- */
  {
    id: "r0001-bruna-marcela-nascimento",
    nome: "BRUNA MARCELA DO NASCIMENTO",
    cpf: "075.251.944-16",
    rg: "7625314 SDS PE",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: { nome: "", cpf: "", rg: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "622",
    andar: "6",
    cota: "21",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1000.00,
    valorTotal: 55776.44,
    corretagem: 3990.00,
    sinal: 2788.82,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1000.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-07-31" },
      { tipo: "Entrada", qtd: 4, valor: 747.50, forma: "Boleto (corretagem)", vencimento: "2026-08-31" },
      { tipo: "Sinal", qtd: 3, valor: 697.20, forma: "Boleto", vencimento: "2026-12-05" },
      { tipo: "Sinal", qtd: 1, valor: 697.22, forma: "Boleto", vencimento: "2027-03-05" },
      { tipo: "Saldo", qtd: 74, valor: 662.13, forma: "Boleto", vencimento: "2027-04-05" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-07-31",
    telefone: "(81) 98301-8368",
    email: "bruna_macela@hotmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/r0001-bruna-marcela-nascimento--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (entrada da corretagem, PIX em 31/07/2026, doc. RESV1126440094 / 845425LVF6OZA7C0ED3BF). " +
      "Todo o resto é boleto futuro — o primeiro só vence em 31/08/2026.\n" +
      "Casada, mas o cônjuge está \"Não informado\" no Quadro Resumo e NÃO assinou o contrato — o distrato sai com uma assinatura só.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0103058394990%. Adotado 1/52 como padrão.\n" +
      "Valor total: R$ 55.776,44 na Proposta e no Quadro Resumo; a Ficha de Negociação traz R$ 55.776,48 (4 centavos de diferença). Não afeta o reembolso.\n" +
      "Assinado por ZapSign em 31/07/2026 18:28, em Ipojuca/PE. Sala PORTO DE GALINHAS - DIA, consultor RAFAEL MACHADO PEREIRA."
  },

  /* ---------- 002 — WAM — 307150 RESORT DO LAGO ---------- */
  {
    id: "307150-reila-marcia-santos-da-silva",
    nome: "REILA MARCIA SANTOS DA SILVA",
    cpf: "931.831.276-87",
    rg: "M7391733 - SSP-MG",
    nacionalidade: "brasileira",
    estadoCivil: "Solteira",
    conjuge: { nome: "", cpf: "", rg: "" },

    empreendimento: "RESORT DO LAGO",
    bloco: "E",
    apartamento: "308",
    cota: "SP/I",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "SPE RESORT DO LAGO CALDAS NOVAS LTDA",
    cnpj: "20.269.496/0001-00",

    valorPago: 2880.00,
    valorTotal: 31557.23,
    corretagem: 2880.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 480.00, forma: "Master débito (intermediação)", vencimento: "2026-07-28" },
      { tipo: "Entrada", qtd: 5, valor: 480.00, forma: "Master crédito (intermediação)", vencimento: "2026-07-28" },
      { tipo: "Saldo", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-08-15" },
      { tipo: "Saldo", qtd: 84, valor: 373.90, forma: "Boleto", vencimento: "2026-11-20" }
    ],
    formaPagamentoEntrada: "Cartão Master (1x débito + 5x crédito)",
    dataAssinatura: "2026-07-28",
    telefone: "(34) 99979-6787",
    email: "Marianaflauzino01@gmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/307150-reila-marcia-santos-da-silva--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 2.880,00 — a intermediação inteira, passada no cartão na assinatura: 1x 480,00 no débito + 5x 480,00 no crédito. Estorno sobre o total.\n" +
      "Semanas de uso: 2 por ano. Habite-se de 22/12/2017 — resort pronto e entregue.\n" +
      "Intermediadora: WAM COMERCIALIZAÇÃO SA, CNPJ 17.919.649/0004-56.\n" +
      "Contato: (34) 99979-6787 · Marianaflauzino01@gmail.com.\n" +
      "Testemunhas: NOENDELL LEONNARDO COELHO BARRETO e ALAN GUILHERME GUIMARÃES (CPF 416.740.568-77)."
  },

  /* ---------- 003 — WAM — 304897 PRAIAS DO LAGO ECO RESORT ---------- */
  {
    id: "304897-renato-vitor-de-souza",
    nome: "RENATO VITOR DE SOUZA",
    cpf: "090.596.326-13",
    rg: "14640475 SSP MG",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado",
    conjuge: { nome: "THAIS MACEDO PEREIRA", cpf: "102.971.846-60", rg: "MG15808530 PC MG", email: "THAISMACEDO2419@hotmail.com" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "J",
    apartamento: "407",
    cota: "02",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 6600.00,
    valorTotal: 46446.75,
    corretagem: 6600.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1100.00, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-07-20" },
      { tipo: "Entrada", qtd: 5, valor: 1100.00, forma: "Crédito recorrente (intermediação)", vencimento: "2026-07-20" },
      { tipo: "Saldo", qtd: 4, valor: 50.00, forma: "Boleto", vencimento: "2026-08-15" },
      { tipo: "Saldo", qtd: 88, valor: 525.53, forma: "Boleto", vencimento: "2026-12-15" }
    ],
    formaPagamentoEntrada: "Cartão de crédito (Cielo + crédito recorrente)",
    dataAssinatura: "2026-07-20",
    telefone: "(31) 99995-0368",
    email: "RENATOVICTOR13@HOTMAIL.COM",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/304897-renato-vitor-de-souza--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 6.600,00 — intermediação inteira no cartão: 1x 1.100,00 crédito Cielo + 5x 1.100,00 crédito recorrente.\n" +
      "Cônjuge anuente THAIS MACEDO PEREIRA assinou o contrato — o distrato vai com duas assinaturas. Regime: comunhão parcial.\n" +
      "Semanas de uso: 3 por ano. Habite-se de 20/11/2020 — resort pronto e entregue.\n" +
      "Intermediadora: WAM COMERCIALIZAÇÃO S.A., CNPJ 17.919.649/0001-03.\n" +
      "Contato: (31) 99995-0368 · RENATOVICTOR13@HOTMAIL.COM · cônjuge THAISMACEDO2419@hotmail.com.\n" +
      "Testemunhas: LETICIA SANTOS e YASMIN LORRANE SILVA GOMES (CPF 058.624.011-05)."
  },

  /* ---------- 004 — WAM — PRAIAS DO LAGO, Bloco O / 001 / Cota 05 ----------
     Mesma cliente da ficha 005: são 2 cotas compradas no mesmo dia.
     Os 2 distratos vão no mesmo e-mail. */
  {
    id: "alciene-bloco-o-001-cota-05",
    nome: "ALCIENE FRANCA BRANDAO BARBOSA",
    cpf: "896.684.481-20",
    rg: "23028599 SSP/MT",
    nacionalidade: "brasileiro",
    estadoCivil: "Casada",
    conjuge: { nome: "JOAO BARBOSA DE LIMA", cpf: "456.734.031-00", rg: "471297 SSP/MS", email: "joaopedrobbrandao@gmail.com" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "O",
    apartamento: "001",
    cota: "05",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 5280.00,
    valorTotal: 46446.75,
    corretagem: 5280.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 6, valor: 880.00, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-08-04" },
      { tipo: "Saldo", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Saldo", qtd: 88, valor: 526.10, forma: "Boleto", vencimento: "2026-12-20" }
    ],
    formaPagamentoEntrada: "Cartão de crédito (Cielo, 6x)",
    dataAssinatura: "2026-08-04",
    telefone: "(31) 98203-3630",
    email: "Contato@contparmg.com.br",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/alciene-bloco-o-001-cota-05--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 5.280,00 — intermediação inteira no cartão: 6x 880,00 crédito Cielo.\n" +
      "1ª de 2 cotas compradas no mesmo dia — a outra é Bloco O, Unidade 403, Cota 02. Os 2 distratos vão no mesmo e-mail.\n" +
      "Cônjuge anuente JOAO BARBOSA DE LIMA assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\n" +
      "O contrato traz a nacionalidade dela como \"BRASILEIRO\"; mantido como está no documento.\n" +
      "Semanas de uso: 3 por ano. Habite-se de 20/11/2020 — resort pronto e entregue.\n" +
      "Intermediadora: WAM COMERCIALIZAÇÃO S.A., CNPJ 17.919.649/0001-03.\n" +
      "Contato: (31) 98203-3630 · Contato@contparmg.com.br · cônjuge (31) 98440-8138 · joaopedrobbrandao@gmail.com.\n" +
      "Testemunhas: LUIZ FELIPE VIEIRA SILVA e YASMIN LORRANE SILVA GOMES."
  },

  /* ---------- 005 — WAM — PRAIAS DO LAGO, Bloco O / 403 / Cota 02 ----------
     Mesma cliente da ficha 004. */
  {
    id: "alciene-bloco-o-403-cota-02",
    nome: "ALCIENE FRANCA BRANDAO BARBOSA",
    cpf: "896.684.481-20",
    rg: "23028599 SSP/MT",
    nacionalidade: "brasileiro",
    estadoCivil: "Casada",
    conjuge: { nome: "JOAO BARBOSA DE LIMA", cpf: "456.734.031-00", rg: "471297 SSP/MS", email: "joaopedrobbrandao@gmail.com" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "O",
    apartamento: "403",
    cota: "02",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 5280.00,
    valorTotal: 46446.75,
    corretagem: 5280.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 6, valor: 880.00, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-08-04" },
      { tipo: "Saldo", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Saldo", qtd: 88, valor: 526.10, forma: "Boleto", vencimento: "2026-12-20" }
    ],
    formaPagamentoEntrada: "Cartão de crédito (Cielo, 6x)",
    dataAssinatura: "2026-08-04",
    telefone: "(31) 98203-3630",
    email: "Contato@contparmg.com.br",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/alciene-bloco-o-403-cota-02--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 5.280,00 — intermediação inteira no cartão: 6x 880,00 crédito Cielo.\n" +
      "2ª de 2 cotas compradas no mesmo dia — a outra é Bloco O, Unidade 001, Cota 05. Os 2 distratos vão no mesmo e-mail.\n" +
      "Cônjuge anuente JOAO BARBOSA DE LIMA assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\n" +
      "O contrato traz a nacionalidade dela como \"BRASILEIRO\"; mantido como está no documento.\n" +
      "Semanas de uso: 3 por ano. Habite-se de 20/11/2020 — resort pronto e entregue.\n" +
      "Intermediadora: WAM COMERCIALIZAÇÃO S.A., CNPJ 17.919.649/0001-03.\n" +
      "Contato: (31) 98203-3630 · Contato@contparmg.com.br · cônjuge (31) 98440-8138 · joaopedrobbrandao@gmail.com.\n" +
      "Testemunhas: LUIZ FELIPE VIEIRA SILVA e YASMIN LORRANE SILVA GOMES."
  },

  /* ---------- 006 — GAV — R0001 BLOCO 01 / 410 / Cota 05 ---------- */
  {
    id: "353339-willian-bruno-410-cota-05",
    nome: "WILLIAN BRUNO ORNELAS BREDOFF",
    cpf: "026.920.112-28",
    rg: "62757576 IIRGD SP",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "410",
    andar: "4",
    cota: "05",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1150.00,
    valorTotal: 49579.13,
    corretagem: 3990.00,
    sinal: 2478.95,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1150.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-08-05" },
      { tipo: "Entrada", qtd: 4, valor: 710.00, forma: "Boleto (corretagem)", vencimento: "2026-09-05" },
      { tipo: "Sinal", qtd: 3, valor: 619.74, forma: "Boleto", vencimento: "2027-01-10" },
      { tipo: "Sinal", qtd: 1, valor: 619.73, forma: "Boleto", vencimento: "2027-04-10" },
      { tipo: "Saldo", qtd: 74, valor: 582.57, forma: "Boleto", vencimento: "2027-05-10" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-08-05",
    telefone: "(11) 94175-3266",
    email: "bredoff.bruno@gmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/353339-willian-bruno-410-cota-05--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 1.150,00 (entrada da corretagem, PIX em 05/08/2026, doc. RESV3077290094 / 845425HXXXWNLQA3F8E89). " +
      "O restante é boleto futuro — o primeiro vence 05/09/2026.\n" +
      "1ª de 2 cotas compradas no mesmo dia — a outra é Bloco 01, Apto 406, Cota 21 (ficha 012). São 2 distratos.\n" +
      "União estável, cônjuge não informado — o distrato sai com uma assinatura só.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0103058394990%. Adotado 1/52 como padrão.\n" +
      "Valor total: R$ 49.579,13 na Proposta; a Ficha de Negociação traz R$ 49.579,09.\n" +
      "Assinado em 05/08/2026 15:24, em Ipojuca/PE. Sala CUPE. Contato: (11) 94175-3266 · bredoff.bruno@gmail.com."
  },

  /* ---------- 007 — GAV — 324112 BEACH GAV RESORTS ---------- */
  {
    id: "324112-adn-gomes-de-arruda-santos",
    nome: "ADN GOMES DE ARRUDA SANTOS",
    cpf: "892.675.161-91",
    rg: "392155 SSP TO",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado",
    conjuge: { nome: "DENES JACKSON FRASAO SANTOS", cpf: "012.298.551-65", rg: "744087 SSP TO" },

    empreendimento: "BEACH GAV RESORTS",
    bloco: "BLOCO 1",
    apartamento: "0612",
    andar: "6",
    cota: "12",
    fracao: "1/52",
    localizacao: "PARÁ",

    empresa: "GAV",
    razaoSocial: "BEACH GAV RESORTS EMPREENDIMENTOS IMOBILIARIOS SPE LTDA",
    cnpj: "33.531.685/0001-51",

    valorPago: 3990.00,
    valorTotal: 43896.24,
    corretagem: 3990.00,
    sinal: 2194.80,
    parcelas: [
      { tipo: "Entrada", qtd: 4, valor: 997.50, forma: "Cartão Master crédito parcelado - Rede (corretagem)", vencimento: "2026-03-14" },
      { tipo: "Sinal", qtd: 4, valor: 548.70, forma: "Boleto", vencimento: "2026-07-15" },
      { tipo: "Saldo", qtd: 68, valor: 554.58, forma: "Boleto", vencimento: "2026-11-15" }
    ],
    formaPagamentoEntrada: "Cartão de crédito parcelado (Master/Rede)",
    dataAssinatura: "2026-02-14",
    telefone: "(63) 98154-5400",
    email: "adngomesarruda@gmail.com",
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990,00 — corretagem inteira no cartão: 4x 997,50 Master crédito parcelado (Rede), doc. 190132798, 1º venc. 14/03/2026.\n" +
      "Cônjuge DENES JACKSON FRASAO SANTOS consta no contrato — o distrato vai com duas assinaturas.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0048562548563%. Adotado 1/52 como padrão.\n" +
      "Contrato antigo — assinado em 14/02/2026, em Salinópolis/PA. Este PDF não traz Ficha de Negociação de Cota.\n" +
      "Contato: (63) 98154-5400 · adngomesarruda@gmail.com · cônjuge (63) 98109-9697."
  },

  /* ---------- 008 — WAM — 308999 ONDAS PRAIA RESORT ---------- */
  {
    id: "308999-marina-maciel-da-silva",
    nome: "MARINA MACIEL DA SILVA",
    cpf: "443.793.738-43",
    rg: "43368148 SSP SP",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: { nome: "CRISTIAN DOMINGOS FONSECA DA SILVA", cpf: "406.573.258-13", rg: "49092317 SSP SP", email: "CRISTIAN.DOMINGOS1892@GMAIL.COM" },

    empreendimento: "ONDAS PRAIA RESORT",
    bloco: "C",
    apartamento: "C134",
    cota: "06",
    fracao: "1/52",
    localizacao: "BAHIA",

    empresa: "WAM",
    razaoSocial: "SPE PORTO SEGURO 02 EMPREENDIMENTOS IMOBILIÁRIOS S.A.",
    cnpj: "22.059.167/0001-60",

    valorPago: 5100.00,
    valorTotal: 64863.17,
    corretagem: 5100.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 610.00, forma: "Cartão de débito (intermediação)", vencimento: "2026-08-05" },
      { tipo: "Entrada", qtd: 2, valor: 2245.00, forma: "Crédito recorrente (intermediação)", vencimento: "2026-08-05" },
      { tipo: "Saldo", qtd: 4, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Saldo", qtd: 96, valor: 673.57, forma: "Boleto", vencimento: "2027-01-15" }
    ],
    formaPagamentoEntrada: "Cartão (1x débito + 2x crédito recorrente)",
    dataAssinatura: "2026-08-05",
    telefone: "(11) 97282-3289",
    email: "MARI_MACIEL98@HOTMAIL.COM",
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 5.100,00 — intermediação inteira no cartão: 1x 610,00 no débito + 2x 2.245,00 no crédito recorrente.\n" +
      "Cônjuge anuente CRISTIAN DOMINGOS FONSECA DA SILVA assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\n" +
      "Semanas de uso: 2 por ano. Habite-se a partir de 02/03/2021 — resort pronto e entregue.\n" +
      "Intermediadora: WAM COMERCIALIZAÇÃO S.A., CNPJ 17.919.649/0001-03.\n" +
      "Assinado em Porto Seguro/BA, 05/08/2026. Contato: (11) 97282-3289 · MARI_MACIEL98@HOTMAIL.COM · " +
      "cônjuge CRISTIAN.DOMINGOS1892@GMAIL.COM.\n" +
      "Testemunhas: NOENDELL LEONNARDO COELHO BARRETO e YASMIN LORRANE SILVA GOMES (CPF 058.624.011-05)."
  },

  /* ---------- 009 — GAV — 328373 JERIQUIÁ DUNAS RESORT ---------- */
  {
    id: "328373-luzia-alves-de-farias",
    nome: "LUZIA ALVES DE FARIAS",
    cpf: "567.542.994-87",
    rg: "001000760 SESPDS RN",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "JERIQUIÁ DUNAS RESORT",
    bloco: "Bloco 01",
    apartamento: "101",
    andar: "1",
    cota: "52",
    fracao: "1/52",
    localizacao: "CEARÁ",

    empresa: "GAV",
    razaoSocial: "JERI-2 EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "33.598.849/0001-68",

    valorPago: 1995.00,
    valorTotal: 65280.95,
    corretagem: 1995.00,
    sinal: 3264.05,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 333.34, forma: "PIX (corretagem) — PAGO", vencimento: "2026-03-09" },
      { tipo: "Entrada", qtd: 1, valor: 166.66, forma: "Cartão Master crédito à vista, Rede (corretagem) — PAGO", vencimento: "2026-04-09" },
      { tipo: "Entrada", qtd: 2, valor: 498.33, forma: "Boleto (corretagem) — PAGO", vencimento: "2026-04-15" },
      { tipo: "Entrada", qtd: 1, valor: 498.34, forma: "Boleto (corretagem) — PAGO", vencimento: "2026-06-15" },
      { tipo: "Sinal", qtd: 6, valor: 544.01, forma: "Boleto", vencimento: "2026-07-15" },
      { tipo: "Saldo", qtd: 106, valor: 566.24, forma: "Boleto", vencimento: "2027-01-15" }
    ],
    formaPagamentoEntrada: "PIX (333,34) + cartão de crédito à vista (166,66) + boletos (1.495,00)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-03-09",
    telefone: "(84) 99640-6010",
    email: "luziaeroster0503@gmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/328373-luzia-alves-de-farias--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 1.995,00 — a corretagem inteira, quitada. Composição: R$ 333,34 no PIX " +
      "(doc. RESV1995070095 / 158332UMX9ZLYC86C9204) + R$ 166,66 no cartão Master crédito à vista (Rede, doc. 38069354) " +
      "+ R$ 1.495,00 nos 3 boletos (2x 498,33 venc. 15/04/2026 + 1x 498,34 venc. 15/06/2026).\n" +
      "Os boletos não constam como pagos no contrato — a própria cliente confirmou o pagamento (\"paguei 1500\", que bate " +
      "com os R$ 1.495,00). Pedir os comprovantes antes de fechar o estorno.\n" +
      "Sinal: a 1ª parcela (R$ 544,01) venceu em 15/07/2026 e a 2ª vence em 15/08/2026 — se também foram pagas, o valor sobe.\n" +
      "Pagamento misto; forma do reembolso fixada em Reembolso (PIX/transferência), já que o cartão foi só R$ 166,66.\n" +
      "Casada, mas o cônjuge está \"Não informado\" e não assinou — o distrato sai com uma assinatura só.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0144199448358%. Adotado 1/52 como padrão.\n" +
      "Apartamento de 2 quartos, 259,72 m². Assinado em Pipa/RN, 09/03/2026 (D4Sign). Contato: (84) 99640-6010 · luziaeroster0503@gmail.com."
  },

  /* ---------- 010 — GAV — 352793 GRAN GARDEN RESORT, Bloco C4 / 04B / Cota 07 ----------
     Mesma cliente da ficha 011: 2 cotas compradas no mesmo dia. */
  {
    id: "352793-jocemara-c4-04b-cota-07",
    nome: "JOCEMARA HOLKEM BONAFE",
    cpf: "026.146.970-36",
    rg: "1091600658 SJS II RS",
    nacionalidade: "brasileira",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco C4",
    apartamento: "04B",
    andar: "T",
    cota: "07",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 1000.00,
    valorTotal: 51701.38,
    corretagem: 4490.00,
    sinal: 2585.07,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1000.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-08-01" },
      { tipo: "Entrada", qtd: 4, valor: 872.50, forma: "Boleto (corretagem)", vencimento: "2026-09-10" },
      { tipo: "Sinal", qtd: 3, valor: 646.27, forma: "Boleto", vencimento: "2027-01-10" },
      { tipo: "Sinal", qtd: 1, valor: 646.26, forma: "Boleto", vencimento: "2027-04-10" },
      { tipo: "Saldo", qtd: 79, valor: 564.89, forma: "Boleto", vencimento: "2027-05-10" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-08-01",
    telefone: "(51) 99541-8381",
    email: "jo_bonafe@hotmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/352793-jocemara-c4-04b-cota-07--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (entrada da corretagem, PIX em 01/08/2026). O resto é boleto futuro — o primeiro vence 10/09/2026.\n" +
      "PIX de R$ 2.000,00 pago de uma vez e rateado pelo sistema em R$ 1.000,00 por contrato — por isso os dois recibos " +
      "trazem o MESMO nº de documento (RESN4191710093 / 814695LJ95U4U207889F). Confirmado pelo comprovante de " +
      "R$ 2.000,00 enviado pela cliente. Total pago: R$ 2.000,00 (R$ 1.000,00 por cota).\n" +
      "1ª de 2 cotas compradas no mesmo dia — a outra é Bloco C3, Apto 05A, Cota 16.\n" +
      "União estável, cônjuge não informado — o distrato sai com uma assinatura só.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0053418803419%. Adotado 1/52 como padrão.\n" +
      "Assinado em Gramado/RS, 01/08/2026 (ZapSign). Sala GRAMADO - DIA. Vista: Lago Menor. Apartamento de 1 quarto, 63,11 m²."
  },

  /* ---------- 011 — GAV — 352793 GRAN GARDEN RESORT, Bloco C3 / 05A / Cota 16 ----------
     Mesma cliente da ficha 010. */
  {
    id: "352793-jocemara-c3-05a-cota-16",
    nome: "JOCEMARA HOLKEM BONAFE",
    cpf: "026.146.970-36",
    rg: "1091600658 SJS II RS",
    nacionalidade: "brasileira",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco C3",
    apartamento: "05A",
    andar: "T",
    cota: "16",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 1000.00,
    valorTotal: 51701.38,
    corretagem: 4490.00,
    sinal: 2585.07,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1000.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-08-01" },
      { tipo: "Entrada", qtd: 4, valor: 872.50, forma: "Boleto (corretagem)", vencimento: "2026-09-10" },
      { tipo: "Sinal", qtd: 3, valor: 646.27, forma: "Boleto", vencimento: "2027-01-10" },
      { tipo: "Sinal", qtd: 1, valor: 646.26, forma: "Boleto", vencimento: "2027-04-10" },
      { tipo: "Saldo", qtd: 79, valor: 564.89, forma: "Boleto", vencimento: "2027-05-10" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-08-01",
    telefone: "(51) 99541-8381",
    email: "jo_bonafe@hotmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/352793-jocemara-c3-05a-cota-16--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (entrada da corretagem, PIX em 01/08/2026). O resto é boleto futuro — o primeiro vence 10/09/2026.\n" +
      "PIX de R$ 2.000,00 pago de uma vez e rateado pelo sistema em R$ 1.000,00 por contrato — por isso os dois recibos " +
      "trazem o MESMO nº de documento (RESN4191710093 / 814695LJ95U4U207889F). Confirmado pelo comprovante de " +
      "R$ 2.000,00 enviado pela cliente. Total pago: R$ 2.000,00 (R$ 1.000,00 por cota).\n" +
      "2ª de 2 cotas compradas no mesmo dia — a outra é Bloco C4, Apto 04B, Cota 07.\n" +
      "União estável, cônjuge não informado — o distrato sai com uma assinatura só.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0053418803419%. Adotado 1/52 como padrão.\n" +
      "Assinado em Gramado/RS, 01/08/2026 (ZapSign). Sala GRAMADO - DIA. Vista: Lago Menor. Apartamento de 1 quarto, 63,11 m²."
  },

  /* ---------- 012 — GAV — 353339 AREYA BARRA, Bloco 01 / 406 / Cota 21 ----------
     2ª cota do Willian (ficha 006). Os dados vieram da Ficha de Negociação
     de Cota do mesmo PDF — o contrato específico desta cota não foi recebido. */
  {
    id: "353339-willian-bruno-406-cota-21",
    nome: "WILLIAN BRUNO ORNELAS BREDOFF",
    cpf: "026.920.112-28",
    rg: "62757576 IIRGD SP",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "406",
    cota: "21",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1150.00,
    valorTotal: 49579.09,
    corretagem: 3990.00,
    sinal: 2478.95,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1150.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-08-05" },
      { tipo: "Entrada", qtd: 4, valor: 710.00, forma: "Boleto (corretagem)", vencimento: "2026-09-05" },
      { tipo: "Sinal", qtd: 3, valor: 619.74, forma: "Boleto", vencimento: "2027-01-10" },
      { tipo: "Sinal", qtd: 1, valor: 619.73, forma: "Boleto", vencimento: "2027-04-10" },
      { tipo: "Saldo", qtd: 74, valor: 582.57, forma: "Boleto", vencimento: "2027-05-10" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-08-05",
    telefone: "(11) 94175-3266",
    email: "bredoff.bruno@gmail.com",
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.150,00 (entrada da corretagem, PIX em 05/08/2026), conforme a linha COTA 2 da Ficha de Negociação.\n" +
      "2ª de 2 cotas compradas no mesmo dia — a outra é Bloco 01, Apto 410, Cota 05 (ficha 006). São 2 distratos.\n" +
      "ORIGEM DOS DADOS: o contrato/proposta específico desta cota não foi recebido — os valores vieram da Ficha de " +
      "Negociação de Cota do PDF da Cota 05, que traz as duas cotas com estrutura idêntica. Conferir o recibo de corretagem " +
      "do contrato desta cota para confirmar que o PIX de R$ 1.150,00 é uma segunda transação, e não a mesma da Cota 05.\n" +
      "União estável, cônjuge não informado — o distrato sai com uma assinatura só.\n" +
      "Fração: adotado 1/52 como padrão.\n" +
      "Assinado em 05/08/2026, em Ipojuca/PE. Sala CUPE. Contato: (11) 94175-3266 · bredoff.bruno@gmail.com."
  },

  /* ---------- 013 — WAM — 307856 ONDAS PRAIA RESORT ---------- */
  {
    id: "307856-abdo-fabiano-mendonca",
    nome: "ABDO FABIANO MENDONÇA",
    cpf: "082.232.296-09",
    rg: "MG15692959 SSP MG",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado",
    conjuge: {
      nome: "PÂMELA VITORIA SILVA DA LUZ MENDONÇA",
      cpf: "149.324.686-01",
      rg: "MG1920596 PC MG",
      email: "pamelavitoria@gmail.com"
    },

    empreendimento: "ONDAS PRAIA RESORT",
    bloco: "C",
    apartamento: "C236",
    cota: "14",
    fracao: "1/52",
    localizacao: "BAHIA",

    empresa: "WAM",
    razaoSocial: "W-20 EMPREENDIMENTOS IMOBILIARIOS LTDA",
    cnpj: "30.123.187/0001-81",

    valorPago: 5100.00,
    valorTotal: 62663.17,
    corretagem: 5100.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 5100.00, forma: "Depósito bancário / transferência (intermediação)", vencimento: "2026-07-31" },
      { tipo: "Saldo", qtd: 5, valor: 50.00, forma: "Boleto", vencimento: "2026-08-15" },
      { tipo: "Saldo", qtd: 96, valor: 650.14, forma: "Boleto", vencimento: "2027-01-20" }
    ],
    formaPagamentoEntrada: "Depósito bancário / transferência eletrônica",
    dataAssinatura: "2026-07-31",
    telefone: "(31) 98649-2214",
    email: "abdofabianob11@gmail.com",
    pix: "",
    clausulaExtra:
      "O pagamento do valor acima será efetivado em 07/08/2026, condicionado ao recebimento deste " +
      "Termo de Distrato devidamente assinado até as 16h00 da mesma data.",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/307856-abdo-fabiano-mendonca--contrato.pdf" },
      { titulo: "Termo de distrato", arquivo: "contratos-pdf/307856-abdo-fabiano-mendonca--termo-de-distrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 5.100,00 — intermediação inteira, em 1x por depósito bancário / transferência eletrônica na assinatura.\n" +
      "É O CONTRATO DA PÂMELA que preencheu o formulário WAM: ela entra como cônjuge anuente, o titular é o marido ABDO. " +
      "Ela assinou, então o distrato vai com duas assinaturas. Regime: comunhão parcial.\n" +
      "O formulário veio do e-mail pamelavitoriaa10@icloud.com; no contrato o e-mail dela é pamelavitoria@gmail.com. " +
      "Mandar para os dois endereços.\n" +
      "Semanas de uso: 2 por ano. Habite-se a partir de 02/03/2021 — resort pronto e entregue.\n" +
      "Vendedora diferente da ficha 008 (mesmo empreendimento, outra SPE): aqui é W-20, lá é SPE PORTO SEGURO 02.\n" +
      "Intermediadora: WAM COMERCIALIZAÇÃO S.A.\n" +
      "Assinado em Porto Seguro/BA, 31/07/2026. Contato: (31) 98649-2214 · abdofabianob11@gmail.com · " +
      "cônjuge (31) 98514-2899 · pamelavitoria@gmail.com.\n" +
      "Testemunhas: NOENDELL LEONNARDO COELHO BARRETO e ALAN GUILHERME GUIMARÃES (CPF 416.740.568-77)."
  },

  /* ---------- 014 — GAV — 351740 GRAN GARDEN RESORT ---------- */
  {
    id: "351740-joao-paulo-da-silva-caetano",
    nome: "JOAO PAULO DA SILVA CAETANO",
    cpf: "011.992.469-21",
    rg: "01199246921 SESP SC",
    nacionalidade: "francês",
    estadoCivil: "Casado",
    conjuge: {
      nome: "MARILAINE REZENDE DA SILVA",
      cpf: "863.095.799-91",
      rg: "86309579991 PC SC",
      email: ""
    },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco C4",
    apartamento: "102B",
    andar: "1",
    cota: "32",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 1000.00,
    valorTotal: 50744.84,
    corretagem: 4490.00,
    sinal: 2537.24,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1000.00, forma: "Cartão Master crédito à vista, Rede (corretagem) — PAGO", vencimento: "2026-08-28" },
      { tipo: "Entrada", qtd: 4, valor: 872.50, forma: "Boleto (corretagem)", vencimento: "2026-09-10" },
      { tipo: "Sinal", qtd: 4, valor: 634.31, forma: "Boleto", vencimento: "2027-01-10" },
      { tipo: "Saldo", qtd: 80, valor: 546.47, forma: "Boleto", vencimento: "2027-05-10" }
    ],
    formaPagamentoEntrada: "Cartão de crédito à vista (Master/Rede)",
    dataAssinatura: "2026-07-28",
    telefone: "(47) 99671-0198",
    email: "joao.mari@hotmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/351740-joao-paulo-da-silva-caetano--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 1.000,00 — entrada da corretagem no cartão Master crédito à vista (Rede, doc. 22904044). " +
      "O restante da corretagem (4x 872,50) é boleto e o primeiro só vence em 10/09/2026.\n" +
      "Cônjuge MARILAINE REZENDE DA SILVA consta no contrato — o distrato vai com duas assinaturas. Tel. dela: (47) 99696-6777.\n" +
      "CONFERIR ANTES DE EMITIR: o contrato traz a nacionalidade dele como \"francês(esa)\" e o número da Identidade igual " +
      "ao do CPF (01199246921). Os dois campos vão impressos no distrato — se for erro de cadastro da GAV, corrigir na ficha.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0053418803419%. Adotado 1/52 como padrão.\n" +
      "Mesma vendedora das fichas 010 e 011 (Jocemara). Assinado em Gramado/RS, 28/07/2026 (ZapSign). Sala GRAMADO - DIA. " +
      "Vista: Lago Menor. Apartamento de 1 quarto, 63,11 m². Contato: (47) 99671-0198 · joao.mari@hotmail.com."
  },

  /* ---------- 015 — WAM — CT.01-C202/03 LE CHARMANT ----------
     Caso antigo (2021) e de valor alto. Os números vieram do EXTRATO
     financeiro (SIENGE), não do contrato — o PDF do contrato é digitalizado
     e não pôde ser lido. Campos em branco = faltam no que foi enviado. */
  {
    id: "ct01-c202-03-simone-pereira-rocha-reis",
    nome: "SIMONE PEREIRA ROCHA REIS",
    cpf: "409.370.088-50",
    rg: "360952628 SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: {
      nome: "JEFFERSON DOUGLAS CARLOS DE AZEVEDO",
      cpf: "372.393.658-08",
      rg: "466780758",
      email: "JEFFERSONDOUGLAS06@HOTMAIL.COM"
    },

    empreendimento: "LE CHARMANT MAISON DE LUXE",
    bloco: "C",
    apartamento: "202",
    andar: "2º pavimento",
    cota: "03",
    fracao: "1/52",
    localizacao: "SÃO PAULO",

    empresa: "WAM",
    razaoSocial: "SPE VALE VERDE EMPREENDIMENTO IMOBILIÁRIO LTDA",
    cnpj: "33.337.272/0001-30",

    valorPago: 12598.82,
    valorTotal: 30748.48,
    corretagem: 2325.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 3, valor: 775.00, forma: "Cartão de crédito Cielo/Mastercard (corretagem) — PAGAS", vencimento: "2021-07-04" },
      { tipo: "Saldo", qtd: 26, valor: 338.37, forma: "Mensais — PAGAS (set/2021 a out/2023)", vencimento: "2021-09-01" },
      { tipo: "Saldo", qtd: 58, valor: 488.81, forma: "Mensais — EM ABERTO desde 01/11/2023", vencimento: "2023-11-01" }
    ],
    formaPagamentoEntrada: "Cartão de crédito (Cielo/Mastercard, 3x 775,00)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2021-06-04",
    telefone: "(11) 95122-5690",
    email: "simone.reis1993@gmail.com",
    pix: "",
    clausulaExtra:
      "A quitação ampla, plena e irrevogável prevista neste instrumento somente produzirá efeitos após a " +
      "efetiva liquidação do valor acordado e a confirmação do respectivo crédito na conta bancária do(a) ADQUIRENTE.\n" +
      "A empresa declara expressamente que, após a liquidação do valor acima, não haverá saldo residual, cobrança " +
      "futura, apontamento, restrição cadastral ou qualquer obrigação remanescente vinculada ao contrato ora distratado.",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/ct01-c202-03-simone-pereira-rocha-reis--contrato.pdf" },
      { titulo: "Extrato financeiro (SIENGE)", arquivo: "contratos-pdf/ct01-c202-03-simone-pereira-rocha-reis--extrato-financeiro-sienge.pdf" },
      { titulo: "Voucher Cancun", arquivo: "contratos-pdf/ct01-c202-03-simone-pereira-rocha-reis--voucher-cancun.pdf" },
      { titulo: "Termo de distrato", arquivo: "contratos-pdf/ct01-c202-03-simone-pereira-rocha-reis--termo-de-distrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 12.598,82, conforme o Extrato Cliente III (SIENGE), corrigido até 06/08/2026:\n" +
      "  · R$ 10.273,82 — 26 parcelas do saldo pagas (título 812455, SPE Vale Verde), de 30/09/2021 a 04/10/2023\n" +
      "  · R$ 2.325,00 — corretagem quitada, 3x 775,00 no cartão de crédito (título 1781466, WAM BRASIL INTERMEDIACAO - CAMPOS DO JORDAO)\n" +
      "O extrato traz duas colunas: Valor baixa R$ 12.433,05 e Recto líquido R$ 12.598,82. Usei o Recto líquido, " +
      "que é o que efetivamente saiu do bolso dela (inclui juros/multa de atraso).\n" +
      "INADIMPLENTE desde 01/11/2023: 58 das 84 parcelas em aberto, saldo devedor de R$ 28.350,98 corrigido.\n" +
      "CORREÇÃO MONETÁRIA: ela pediu por e-mail, mas o assunto foi resolvido direto com ela pelo WhatsApp. " +
      "O termo sai pelo valor histórico e NÃO menciona correção monetária. Não reabrir isso no documento.\n" +
      "CLÁUSULA NONA, PARÁGRAFO SEGUNDO (rescisão) — este contrato é MAIS BRANDO que os WAM de 2026: deduz " +
      "(I) a integralidade da corretagem e (II) MULTA DE 50% DA QUANTIA PAGA — e não 50% do preço do contrato. " +
      "Itens de posse (IPTU, condomínio, fruição) só incidem 'se já estiver na posse do imóvel'. " +
      "O que sobrar é pago em parcela única após 180 dias do desfazimento.\n" +
      "Preço total de venda R$ 30.748,48 = corretagem R$ 2.325,00 + saldo R$ 28.423,48 em 84x R$ 338,37 (1ª em 01/09/2021), " +
      "reajuste INCC-M até o habite-se e IGPM + 0,5% a.m. depois.\n" +
      "Apartamento 1/4, 2º pavimento, 36,250 m² privativos. Endereço: Av. Presidente Castelo Branco, 1950, lote 33, " +
      "Vila Médica, Campos do Jordão/SP. Registro no Tabelionato de Campos do Jordão sob nº 30.971.\n" +
      "Tem voucher BONUS TRAVEL CANCUN da WAM Fidelidade (e-mail de 09/08/2021, luciana.figueiredo@wamfidelidade.com): " +
      "hospedagem para 2 adultos e 2 crianças, sem aéreo, sem refeições, com taxa de reserva de US$ 264,00 por hotel.\n" +
      "Assinado em Campos do Jordão/SP, 04/06/2021. Cliente 184540, documento CT.01-C202/03. " +
      "Contato: (11) 95122-5690 · simone.reis1993@gmail.com · cônjuge JEFFERSONDOUGLAS06@HOTMAIL.COM.\n" +
      "O PDF do contrato é digitalizado (sem texto) — os dados foram lidos das páginas renderizadas como imagem."
  },

  /* ---------- 016 — GAV — 347228 PORTO ALTO RESORT ---------- */
  {
    id: "347228-nathiely-raylla-de-barros-silva",
    nome: "NATHIELY RAYLLA DE BARROS SILVA",
    cpf: "135.789.274-81",
    rg: "10643077 SDS PE",
    nacionalidade: "brasileira",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PORTO ALTO RESORT",
    bloco: "BLOCO 01",
    apartamento: "0111",
    andar: "1",
    cota: "21",
    fracao: "1/52",
    localizacao: "PERNAMBUCO",

    empresa: "GAV",
    razaoSocial: "GAV MURO ALTO EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "34.832.326/0001-05",

    valorPago: 1000.00,
    valorTotal: 67647.57,
    corretagem: 3990.00,
    sinal: 3382.37,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1000.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-07-11" },
      { tipo: "Entrada", qtd: 4, valor: 747.50, forma: "Boleto (corretagem)", vencimento: "2026-08-11" },
      { tipo: "Sinal", qtd: 3, valor: 845.59, forma: "Boleto", vencimento: "2026-12-10" },
      { tipo: "Sinal", qtd: 1, valor: 845.60, forma: "Boleto", vencimento: "2027-03-10" },
      { tipo: "Saldo", qtd: 68, valor: 886.40, forma: "Boleto", vencimento: "2027-04-10" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-07-11",
    telefone: "(81) 98959-5212",
    email: "Nathielyraylla123@gmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/347228-nathiely-raylla-de-barros-silva--contrato.pdf" },
      { titulo: "Termo de distrato", arquivo: "contratos-pdf/347228-nathiely-raylla-de-barros-silva--termo-de-distrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (entrada da corretagem, PIX em 11/07/2026, doc. RESN2002670095 / 158146MPLG1H062CB162C).\n" +
      "O restante da corretagem (4x 747,50) é boleto e o primeiro vence 11/08/2026 — ainda não venceu.\n" +
      "PRIMEIRO CLIENTE DO PORTO ALTO. Pela Pasta Técnica do empreendimento, o direito de arrependimento de 7 dias " +
      "devolve TUDO, inclusive a corretagem — mas exige carta registrada com AR, e o prazo dela venceu em 18/07/2026.\n" +
      "Fora do prazo, a cláusula 6.3 deduz: corretagem integral + sinal integral + pena de 50% da quantia paga, " +
      "limitadas ao que foi efetivamente pago (item 6.3.2) — nunca fica saldo negativo. O contrato prevê devolver em " +
      "até 30 dias após o Habite-se, que ainda não existe (obra não iniciada).\n" +
      "União estável, cônjuge não informado — o distrato sai com uma assinatura só.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0085609110000%. Adotado 1/52 como padrão.\n" +
      "Apartamento de 1 quarto, 64,54 m², vista LATERAL. Assinado em Maragogi/AL, 11/07/2026 (ZapSign). " +
      "Sala MARAGOGI - DIA. Contato: (81) 98959-5212 · Nathielyraylla123@gmail.com."
  },

  /* ---------- 017 — GAV — 308758 GRAN GARDEN RESORT ---------- */
  {
    id: "308758-marcela-cerencio-ogassawara",
    nome: "MARCELA CERENCIO OGASSAWARA",
    cpf: "281.673.278-92",
    rg: "28375467 SSP SP",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco A1",
    apartamento: "103",
    andar: "1",
    cota: "46",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 2000.00,
    valorTotal: 73925.97,
    corretagem: 4490.00,
    sinal: 3696.29,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 2000.00, forma: "Cartão VISA débito, Rede (corretagem) — PAGO", vencimento: "2025-12-23" },
      { tipo: "Entrada", qtd: 1, valor: 2490.00, forma: "Boleto (corretagem) — VENCIDO, conferir", vencimento: "2026-01-23" },
      { tipo: "Sinal", qtd: 5, valor: 739.26, forma: "Boleto — VENCIDAS, conferir", vencimento: "2026-02-15" },
      { tipo: "Saldo", qtd: 91, valor: 722.41, forma: "Boleto — 1ª VENCIDA, conferir", vencimento: "2026-07-15" }
    ],
    formaReembolso: "Reembolso",
    formaPagamentoEntrada: "Cartão de débito VISA (Rede)",
    dataAssinatura: "2025-12-23",
    telefone: "(11) 94780-6600",
    email: "marcela.cerencio@gmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/308758-marcela-cerencio-ogassawara--contrato.pdf" },
      { titulo: "Termo de distrato", arquivo: "contratos-pdf/308758-marcela-cerencio-ogassawara--termo-de-distrato.pdf" }
    ],
    observacoes:
      "FORMA DE DEVOLUÇÃO = REEMBOLSO (transferência/PIX). O recibo diz VISA/DÉBITO, não crédito — a própria cliente " +
      "apontou o erro por e-mail em 10/08/2026. Débito à vista não se estorna meses depois.\n" +
      "VALOR PAGO = R$ 2.000,00 CONFIRMADO — cartão VISA débito (Rede, doc. 26036206) em 23/12/2025.\n" +
      "ATENÇÃO — PRECISA DO EXTRATO: contrato de dezembro/2025, já tem quase 8 meses, e várias parcelas venceram desde então:\n" +
      "  · R$ 2.490,00 — 2ª parte da corretagem, boleto vencido em 23/01/2026\n" +
      "  · R$ 3.696,29 — sinal, 5x 739,26, vencidos entre 15/02 e 15/06/2026\n" +
      "  · R$ 722,41 — 1ª do saldo, vencida em 15/07/2026\n" +
      "Se tudo tiver sido pago, o valor sobe de R$ 2.000,00 para cerca de R$ 8.908,70. " +
      "Puxar o Extrato Cliente no SIENGE pelo CPF antes de emitir o distrato.\n" +
      "Casada, mas o cônjuge está \"Não informado\" e não assinou — o distrato sai com uma assinatura só.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0106837606838%. Adotado 1/52 como padrão.\n" +
      "Apartamento de 2 quartos, 126,33 m². Mesma vendedora das fichas 010, 011 e 014.\n" +
      "Assinado em Gramado/RS, 23/12/2025 (D4Sign ed2374a4-5568-44c0-8965-e49ca9603fa0). " +
      "Contato: (11) 94780-6600 · marcela.cerencio@gmail.com."
  },

  /* ---------- 018 — WAM — 303938 RESORT DO LAGO ---------- */
  {
    id: "303938-andreia-aparecida-pinto-de-sousa-silva",
    nome: "ANDREIA APARECIDA PINTO DE SOUSA SILVA",
    cpf: "059.832.486-00",
    rg: "MG11763165 SSP MG",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: {
      nome: "LUCIANO BARROSO DA SILVA",
      cpf: "036.823.996-90",
      rg: "MG8789796 SSP MG",
      email: "lucianobarroso10@gmail.com"
    },

    empreendimento: "RESORT DO LAGO",
    bloco: "Bloco A",
    apartamento: "307",
    cota: "MA/M",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "SPE RESORT DO LAGO CALDAS NOVAS LTDA",
    cnpj: "20.269.496/0001-00",

    valorPago: 4200.00,
    valorTotal: 37940.20,
    corretagem: 4200.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 4200.00, forma: "TED/DOC/depósito (intermediação)", vencimento: "2026-07-15" },
      { tipo: "Saldo", qtd: 2, valor: 50.00, forma: "Boleto", vencimento: "2026-08-15" },
      { tipo: "Saldo", qtd: 84, valor: 450.48, forma: "Boleto", vencimento: "2026-10-15" }
    ],
    formaPagamentoEntrada: "TED/DOC/depósito bancário",
    dataAssinatura: "2026-07-15",
    telefone: "(31) 99687-0672",
    email: "andreiapsousa28@gmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/303938-andreia-aparecida-pinto-de-sousa-silva--contrato.pdf" },
      { titulo: "Termo de distrato", arquivo: "contratos-pdf/303938-andreia-aparecida-pinto-de-sousa-silva--termo-de-distrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 4.200,00 — intermediação inteira, em 1x por TED/DOC/depósito na assinatura.\n" +
      "Cônjuge anuente LUCIANO BARROSO DA SILVA assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\n" +
      "Do preço da cota ela não pagou nada ainda: o primeiro boleto de R$ 50,00 vence em 15/08/2026.\n" +
      "Semanas de uso: 2 por ano. Habite-se de 22/12/2017 — resort pronto e entregue.\n" +
      "Mesma vendedora da ficha 002 (Reila) — SPE RESORT DO LAGO CALDAS NOVAS LTDA.\n" +
      "Cota MA/M é código, não número. Assinado em Caldas Novas/GO, 15/07/2026 (GSign).\n" +
      "Contato: (31) 99687-0672 · andreiapsousa28@gmail.com · cônjuge lucianobarroso10@gmail.com.\n" +
      "Testemunhas: NOENDELL LEONNARDO COELHO BARRETO e ALAN GUILHERME GUIMARÃES (CPF 416.740.568-77)."
  },

  /* ---------- 019 — GAV — 354051 OIKOS MARAGOGI, Bloco 02 / UH 034 / Cota 29 ----------
     Mesma cliente da ficha 020: 2 cotas compradas no mesmo dia. */
  {
    id: "354051-thais-uh034-cota-29",
    nome: "THAIS RODRIGUES SILVA AGERTTE",
    cpf: "703.288.632-97",
    rg: "703.288.632-97 IICCECF RO",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "OIKOS MARAGOGI RESORT",
    bloco: "Bloco 02",
    apartamento: "UH 034",
    andar: "T",
    cota: "29",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV MARAGOGI EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "39.757.445/0001-56",

    valorPago: 665.00,
    valorTotal: 36880.91,
    corretagem: 1995.00,
    sinal: 1844.03,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 665.00, forma: "Cartão VISA crédito à vista, Rede (corretagem) — PAGO", vencimento: "2026-09-08" },
      { tipo: "Entrada", qtd: 2, valor: 665.00, forma: "Boleto (corretagem)", vencimento: "2026-10-09" },
      { tipo: "Sinal", qtd: 4, valor: 461.01, forma: "Boleto", vencimento: "2026-12-10" },
      { tipo: "Saldo", qtd: 68, valor: 485.91, forma: "Boleto", vencimento: "2027-04-10" }
    ],
    formaPagamentoEntrada: "Cartão de crédito à vista (VISA/Rede)",
    dataAssinatura: "2026-08-09",
    telefone: "(69) 98482-9481",
    email: "thaysilva.ub@gmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/354051-thais-uh034-cota-29--contrato.pdf" },
      { titulo: "Termo de distrato (1)", arquivo: "contratos-pdf/354051-thais-uh034-cota-29--termo-de-distrato-1.pdf" },
      { titulo: "Termo de distrato (2)", arquivo: "contratos-pdf/354051-thais-uh034-cota-29--termo-de-distrato-2.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 665,00 — cartão VISA crédito à vista (Rede, doc. 27524104). O restante da corretagem " +
      "(2x 665,00) é boleto e vence a partir de 09/10/2026.\n" +
      "MESMA TRANSAÇÃO NAS DUAS COTAS: o doc. 27524104 aparece igual no recibo desta e da Cota 05 — é um único " +
      "lançamento de R$ 1.330,00 rateado em R$ 665,00 por contrato, mesmo padrão da Jocemara (fichas 010/011). " +
      "Total pago por ela: R$ 1.330,00.\n" +
      "1ª de 2 cotas compradas no mesmo dia — a outra é Bloco 02, UH 028, Cota 05.\n" +
      "Casada, mas o cônjuge está \"Não informado\" e não assinou — o distrato sai com uma assinatura só.\n" +
      "O contrato repete o CPF no campo Identidade (703.288.632-97), com órgão IICCECF - RO. Conferir o RG real antes de emitir.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0055165048492%. Adotado 1/52 como padrão.\n" +
      "Apartamento de 1 quarto, 100,43 m², térreo. Assinado em Ipojuca/PE, 09/08/2026. " +
      "Contato: (69) 98482-9481 · thaysilva.ub@gmail.com."
  },

  /* ---------- 020 — GAV — 354051 OIKOS MARAGOGI, Bloco 02 / UH 028 / Cota 05 ----------
     Mesma cliente da ficha 019. */
  {
    id: "354051-thais-uh028-cota-05",
    nome: "THAIS RODRIGUES SILVA AGERTTE",
    cpf: "703.288.632-97",
    rg: "703.288.632-97 IICCECF RO",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "OIKOS MARAGOGI RESORT",
    bloco: "Bloco 02",
    apartamento: "UH 028",
    andar: "T",
    cota: "05",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV MARAGOGI EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "39.757.445/0001-56",

    valorPago: 665.00,
    valorTotal: 36880.91,
    corretagem: 1995.00,
    sinal: 1844.03,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 665.00, forma: "Cartão VISA crédito à vista, Rede (corretagem) — PAGO", vencimento: "2026-09-08" },
      { tipo: "Entrada", qtd: 2, valor: 665.00, forma: "Boleto (corretagem)", vencimento: "2026-10-09" },
      { tipo: "Sinal", qtd: 4, valor: 461.01, forma: "Boleto", vencimento: "2026-12-10" },
      { tipo: "Saldo", qtd: 68, valor: 485.91, forma: "Boleto", vencimento: "2027-04-10" }
    ],
    formaPagamentoEntrada: "Cartão de crédito à vista (VISA/Rede)",
    dataAssinatura: "2026-08-09",
    telefone: "(69) 98482-9481",
    email: "thaysilva.ub@gmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/354051-thais-uh028-cota-05--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 665,00 — cartão VISA crédito à vista (Rede, doc. 27524104). O restante da corretagem " +
      "(2x 665,00) é boleto e vence a partir de 09/10/2026.\n" +
      "MESMA TRANSAÇÃO NAS DUAS COTAS: o doc. 27524104 aparece igual no recibo desta e da Cota 29 — é um único " +
      "lançamento de R$ 1.330,00 rateado em R$ 665,00 por contrato, mesmo padrão da Jocemara (fichas 010/011). " +
      "Total pago por ela: R$ 1.330,00.\n" +
      "2ª de 2 cotas compradas no mesmo dia — a outra é Bloco 02, UH 034, Cota 29.\n" +
      "Casada, mas o cônjuge está \"Não informado\" e não assinou — o distrato sai com uma assinatura só.\n" +
      "O contrato repete o CPF no campo Identidade (703.288.632-97), com órgão IICCECF - RO. Conferir o RG real antes de emitir.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0055165048492%. Adotado 1/52 como padrão.\n" +
      "Apartamento de 1 quarto, 100,43 m², térreo. Assinado em Ipojuca/PE, 09/08/2026. " +
      "Contato: (69) 98482-9481 · thaysilva.ub@gmail.com."
  },

  /* ---------- 021 — GAV — 353035 BEACH GAV RESORTS ---------- */
  {
    id: "353035-margarete-de-souza-barata",
    nome: "MARGARETE DE SOUZA BARATA",
    cpf: "003.413.902-83",
    rg: "2729260 PC PA",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: {
      nome: "ALISON RICARDO CARDOSO",
      cpf: "101.329.519-67",
      rg: "131935196 SSP PR",
      email: ""
    },

    empreendimento: "BEACH GAV RESORTS",
    bloco: "BLOCO 2",
    apartamento: "0919",
    andar: "9",
    cota: "04",
    fracao: "1/52",
    localizacao: "PARÁ",

    empresa: "GAV",
    razaoSocial: "BEACH GAV RESORTS EMPREENDIMENTOS IMOBILIARIOS SPE LTDA",
    cnpj: "33.531.685/0001-51",

    valorPago: 1000.00,
    valorTotal: 44554.77,
    corretagem: 3990.00,
    sinal: 2227.73,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1000.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-08-02" },
      { tipo: "Entrada", qtd: 5, valor: 598.00, forma: "Boleto (corretagem)", vencimento: "2026-09-02" },
      { tipo: "Sinal", qtd: 4, valor: 556.93, forma: "Boleto", vencimento: "2027-02-10" },
      { tipo: "Saldo", qtd: 68, valor: 563.78, forma: "Boleto", vencimento: "2027-06-10" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-08-02",
    telefone: "(91) 98428-8096",
    email: "margaretebeli4@gmail.com",
    pix: "91984288096",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/353035-margarete-de-souza-barata--contrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (entrada da corretagem, PIX em 02/08/2026, doc. RESN0131560095 / 1582438XSEY90C5630CB5). " +
      "O restante da corretagem (5x 598,00) é boleto e o primeiro vence 02/09/2026.\n" +
      "DISTRATO JÁ ASSINADO E DEVOLVIDO, mas com o CNPJ ERRADO: o termo assinado traz " +
      "\"BEACH GAV RESORTS EMPREENDIMENTOS IMOBILIARIOS SPE LTDA, CNPJ 45.298.124/0001-33\". " +
      "Esse CNPJ é o da GAV Barra de São Miguel. O correto, conforme este contrato, é 33.531.685/0001-51. " +
      "Provavelmente veio do cache do Termo de Distrato, que guarda os dados do último cliente gerado. " +
      "Refazer o termo pela ficha e recolher assinatura.\n" +
      "Chave PIX que ela preencheu no termo: 91984288096 — é o próprio celular dela.\n" +
      "Cônjuge ALISON RICARDO CARDOSO assinou o distrato — duas assinaturas. Tel. dele: (91) 98451-6444.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0048562548563%. Adotado 1/52 como padrão.\n" +
      "Mesmo empreendimento da ficha 007 (ADN), que já tinha o CNPJ correto.\n" +
      "Apartamento de 1 quarto, 61,268 m², 9º andar. Assinado em Salinópolis/PA, 02/08/2026. " +
      "Contato: (91) 98428-8096 · margaretebeli4@gmail.com."
  },

  /* ---------- 022 — GAV — 353859 GRAN GARDEN, Bloco C4 / 105A / Cota 06 ----------
     Ela tem 2 cotas: falta o contrato da outra (Bloco C3, 103B, Cota 08). */
  {
    id: "353859-andressa-c4-105a-cota-06",
    nome: "ANDRESSA COELHO DE SOUZA",
    cpf: "035.615.130-18",
    rg: "1114579756 SSP SC",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco C4",
    apartamento: "105A",
    andar: "1",
    cota: "06",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 2000.00,
    valorTotal: 50744.84,
    corretagem: 4490.00,
    sinal: 2537.24,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 2000.00, forma: "PIX das 2 cotas (corretagem) — PAGO", vencimento: "2026-08-08" },
      { tipo: "Entrada", qtd: 5, valor: 698.00, forma: "Boleto (corretagem)", vencimento: "2026-09-08" },
      { tipo: "Sinal", qtd: 4, valor: 634.31, forma: "Boleto", vencimento: "2027-02-10" },
      { tipo: "Saldo", qtd: 80, valor: 546.47, forma: "Boleto", vencimento: "2027-06-10" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-08-08",
    telefone: "(48) 99185-3522",
    email: "andressacoelho820@gmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/353859-andressa-c4-105a-cota-06--contrato.pdf" },
      { titulo: "Termo de distrato", arquivo: "contratos-pdf/353859-andressa-c4-105a-cota-06--termo-de-distrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 2.000,00 — entrada da corretagem das DUAS cotas, num PIX único em 08/08/2026 " +
      "(doc. RESN9264020093 / 814895R4G9F6J3). O recibo de cada contrato mostra R$ 1.000,00 porque o sistema " +
      "rateia o lançamento entre os dois — mesmo padrão da Jocemara (010/011) e da Thais (019/020).\n" +
      "O valor está INTEIRO NESTA FICHA porque o contrato da outra cota ainda não foi recebido. Quando chegar, " +
      "dividir R$ 1.000,00 aqui e R$ 1.000,00 na ficha nova, senão o total dela vira R$ 3.000,00.\n" +
      "O restante da corretagem (5x 698,00 por contrato) é boleto e o primeiro vence 08/09/2026.\n" +
      "FALTA A 2ª COTA: a Ficha de Negociação deste PDF traz duas — COTA 1 (Bloco C3, Apto 103B, Cota 08) e " +
      "COTA 2 (Bloco C4, Apto 105A, Cota 06, que é este contrato). Pedir o contrato da Cota 08.\n" +
      "Casada, mas o cônjuge está \"Não informado\" e não assinou — o distrato sai com uma assinatura só.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0053418803419%. Adotado 1/52 como padrão.\n" +
      "Apartamento de 1 quarto, 63,11 m², vista Lago Menor. Mesma vendedora das fichas 010, 011, 014 e 017.\n" +
      "Assinado em Gramado/RS, 08/08/2026. Contato: (48) 99185-3522 · andressacoelho820@gmail.com."
  },

  /* ---------- 023 — WAM — 309636 BÚZIOS FRACTIONAL RESORT ---------- */
  {
    id: "309636-melissa-medeiros-nardi",
    nome: "MELISSA MEDEIROS NARDI",
    cpf: "058.153.997-44",
    rg: "210994679 DIC RJ",
    nacionalidade: "brasileira",
    estadoCivil: "Solteira",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "BÚZIOS FRACTIONAL RESORT",
    bloco: "Bloco 03",
    apartamento: "3108",
    andar: "",
    cota: "45",
    fracao: "1/52",
    localizacao: "RIO DE JANEIRO",

    empresa: "WAM",
    razaoSocial: "W50 EMPREENDIMENTOS IMOBILIARIOS LTDA",
    cnpj: "33.770.634/0001-82",

    valorPago: 2800.00,
    valorTotal: 36533.79,
    corretagem: 2800.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 4, valor: 500.00, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-08-09" },
      { tipo: "Entrada", qtd: 4, valor: 200.00, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-08-09" },
      { tipo: "Saldo", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Saldo", qtd: 96, valor: 379.00, forma: "Boleto", vencimento: "2026-12-15" }
    ],
    formaPagamentoEntrada: "Cartão de crédito Cielo (4x 500,00 + 4x 200,00)",
    dataAssinatura: "2026-08-09",
    telefone: "(21) 96430-1735",
    email: "melissamedeiros832@gmail.com",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/309636-melissa-medeiros-nardi--contrato.pdf" },
      { titulo: "Termo de distrato", arquivo: "contratos-pdf/309636-melissa-medeiros-nardi--termo-de-distrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 2.800,00 — intermediação inteira no cartão de crédito Cielo: 4x 500,00 + 4x 200,00.\n" +
      "Do preço da cota não pagou nada ainda: o primeiro boleto de R$ 50,00 vence em 15/09/2026.\n" +
      "Solteira — o distrato sai com uma assinatura só.\n" +
      "Semanas de uso: 1 por ano. Habite-se de 13/03/2010 — resort pronto e entregue há anos.\n" +
      "Incorporação SEM patrimônio de afetação, diferente dos outros contratos WAM da base.\n" +
      "Empreendimento e vendedora novos no cadastro: BÚZIOS FRACTIONAL RESORT, em Armação dos Búzios/RJ, " +
      "vendido pela W50 EMPREENDIMENTOS IMOBILIARIOS LTDA.\n" +
      "Segundo telefone no contrato: (21) 9707-4141. Assinado em Armação dos Búzios/RJ, 09/08/2026 (GSign).\n" +
      "Testemunhas: JEAN PHILIPPE LEON KOCH e YASMIN LORRANE SILVA GOMES (CPF 058.624.011-05)."
  },

  /* ---------- 024 — WAM — 309202 RESORT DO LAGO ---------- */
  {
    id: "309202-diego-augusto-alves-de-oliveira-e-silva",
    nome: "DIEGO AUGUSTO ALVES DE OLIVEIRA E SILVA",
    cpf: "067.448.726-56",
    rg: "00000001752087 SSP/MG",
    nacionalidade: "brasileiro",
    estadoCivil: "Solteiro",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "RESORT DO LAGO",
    bloco: "Bloco D",
    apartamento: "109",
    andar: "",
    cota: "SP/B",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "SPE RESORT DO LAGO CALDAS NOVAS LTDA",
    cnpj: "20.269.496/0001-00",

    valorPago: 967.00,
    valorTotal: 39006.02,
    corretagem: 2900.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 967.00, forma: "TED/DOC/depósito (intermediação) — PAGO", vencimento: "2026-08-06" },
      { tipo: "Entrada", qtd: 2, valor: 966.50, forma: "Boleto Itaú (intermediação)", vencimento: "" },
      { tipo: "Saldo", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-09-10" },
      { tipo: "Saldo", qtd: 84, valor: 462.57, forma: "Boleto", vencimento: "2026-12-10" }
    ],
    formaPagamentoEntrada: "TED/DOC/depósito (967,00) + 2x boleto Itaú",
    dataAssinatura: "2026-08-06",
    telefone: "(37) 99918-5552",
    email: "diegoalves.2008@yahoo.com.br",
    pix: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/309202-diego-augusto-alves-de-oliveira-e-silva--contrato.pdf" },
      { titulo: "Termo de distrato", arquivo: "contratos-pdf/309202-diego-augusto-alves-de-oliveira-e-silva--termo-de-distrato.pdf" }
    ],
    observacoes:
      "VALOR PAGO = R$ 967,00 — só a parte da intermediação paga por TED/DOC/depósito na assinatura. " +
      "As outras 2 parcelas de R$ 966,50 são boleto Itaú e ainda não venceram; se forem pagas, o total sobe para R$ 2.900,00.\n" +
      "Do preço da cota não pagou nada: o primeiro boleto de R$ 50,00 vence em 10/09/2026.\n" +
      "Solteiro — o distrato sai com uma assinatura só.\n" +
      "ATENÇÃO: o contrato traz a nacionalidade dele como \"BRASILEIRA\". Registrei \"brasileiro\" para o termo não sair " +
      "com o gênero errado — se preferir manter exatamente como no contrato, alterar na ficha.\n" +
      "Cota SP/B é código, não número. Semanas de uso: 2 por ano. Habite-se de 22/12/2017 — resort pronto.\n" +
      "Mesma vendedora das fichas 002 (Reila) e 018 (Andreia).\n" +
      "Assinado em Caldas Novas/GO, 06/08/2026. Contato: (37) 99918-5552 · diegoalves.2008@yahoo.com.br."
  },

  /* ---------- 025 — WAM — 308416 ONDAS PRAIA RESORT ---------- */
  {
    id: "308416-bernardo-nicolas-zaneti-gomes",
    nome: "BERNARDO NICOLAS ZANETI GOMES",
    cpf: "700.884.146-98",
    rg: "MG21271190 SSP/MG",
    nacionalidade: "brasileiro",
    estadoCivil: "Solteiro",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "ONDAS PRAIA RESORT",
    bloco: "C",
    apartamento: "C141",
    andar: "",
    cota: "23",
    fracao: "1/52",
    localizacao: "BAHIA",

    empresa: "WAM",
    razaoSocial: "SPE PORTO SEGURO 02 EMPREENDIMENTOS IMOBILIÁRIOS S.A.",
    cnpj: "22.059.167/0001-60",

    valorPago: 6120.00,
    valorTotal: 62663.17,
    corretagem: 6120.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 6120.00, forma: "Cartão de débito (intermediação) — PAGO", vencimento: "2026-08-03" },
      { tipo: "Saldo", qtd: 96, valor: 652.74, forma: "Boleto", vencimento: "2026-09-10" }
    ],
    formaReembolso: "Estorno Cartão",
    formaPagamentoEntrada: "Cartão de débito",
    dataAssinatura: "2026-08-03",
    telefone: "(31) 98550-8387",
    email: "",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/308416-bernardo-nicolas-zaneti-gomes--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 6.120,00 — intermediação inteira, em 1x no CARTÃO DE DÉBITO na assinatura. " +
      "Devolução por ESTORNO no cartão de débito — a transação é de 03/08/2026, ainda dentro da janela da adquirente. " +
      "O termo sai com a frase \"o estorno no cartão de débito\", não \"de crédito\".\n" +
      "Do preço da cota não pagou nada: o primeiro boleto de R$ 652,74 vence em 10/09/2026.\n" +
      "SEM E-MAIL VÁLIDO: o contrato traz \"DG@GMAIL.COM\", que é preenchimento de fachada. " +
      "Pedir o e-mail real antes de enviar o termo — por enquanto só dá para falar pelo WhatsApp.\n" +
      "Segundo telefone no contrato: (31) 99885-4259.\n" +
      "Solteiro — o distrato sai com uma assinatura só. Nascido em 26/02/2007 (19 anos).\n" +
      "Semanas de uso: 2 por ano. Habite-se a partir de 02/03/2021 — resort pronto e entregue.\n" +
      "Mesma vendedora da ficha 008 (Marina Maciel) — SPE PORTO SEGURO 02.\n" +
      "Assinado em Porto Seguro/BA, 03/08/2026 (GSign).\n" +
      "Testemunhas: NOENDELL LEONNARDO COELHO BARRETO e ALAN GUILHERME GUIMARÃES (CPF 416.740.568-77)."
  },

  /* ---------- 026 — WAM — 308458 RESORT DO LAGO ---------- */
  {
    id: "308458-pedro-henrique-gomes-da-silva",
    nome: "PEDRO HENRIQUE GOMES DA SILVA",
    cpf: "702.465.316-73",
    rg: "17267609 SSP MG",
    nacionalidade: "brasileiro",
    estadoCivil: "Solteiro",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "RESORT DO LAGO",
    bloco: "Bloco E",
    apartamento: "410",
    andar: "",
    cota: "SP/J",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "SPE RESORT DO LAGO CALDAS NOVAS LTDA",
    cnpj: "20.269.496/0001-00",

    valorPago: 3600.00,
    valorTotal: 31557.23,
    corretagem: 3600.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 12, valor: 300.00, forma: "Cartão VISA crédito (intermediação)", vencimento: "2026-08-03" },
      { tipo: "Saldo", qtd: 84, valor: 375.68, forma: "Boleto", vencimento: "2026-09-10" }
    ],
    formaPagamentoEntrada: "Cartão de crédito VISA (12x 300,00)",
    dataAssinatura: "2026-08-03",
    telefone: "(31) 99578-7413",
    email: "ciclismobrasileiro@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/308458-pedro-henrique-gomes-da-silva--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.600,00 — intermediação inteira no cartão de crédito VISA, em 12x de 300,00. " +
      "Parcelamento mais longo que o dos outros contratos WAM da base (os demais vão de 1x a 6x).\n" +
      "Do preço da cota não pagou nada: o primeiro boleto vence em 10/09/2026.\n" +
      "Solteiro — o distrato sai com uma assinatura só. Nascido em 20/10/2001.\n" +
      "Cota SP/J é código, não número. Semanas de uso: 2 por ano. Resort pronto e entregue.\n" +
      "Mesma vendedora das fichas 002 (Reila), 018 (Andreia) e 024 (Diego).\n" +
      "Assinado em Caldas Novas/GO, 03/08/2026 (GSign). Contato: (31) 99578-7413 · ciclismobrasileiro@gmail.com."
  },

  /* ---------- 027 — GAV — 332353 GRAN GARDEN RESORT ---------- */
  {
    id: "332353-larissa-aine-de-borba",
    nome: "LARISSA AINE DE BORBA",
    cpf: "013.199.010-18",
    rg: "5124700443 SSP DI RS",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco C4",
    apartamento: "205A",
    andar: "2",
    cota: "14",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 1490.00,
    valorTotal: 51189.48,
    corretagem: 4490.00,
    sinal: 2559.48,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1490.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-04-04" },
      { tipo: "Entrada", qtd: 4, valor: 750.00, forma: "Boleto (corretagem) — VENCIDOS, conferir", vencimento: "2026-05-15" },
      { tipo: "Sinal", qtd: 4, valor: 639.87, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Saldo", qtd: 80, valor: 551.75, forma: "Boleto", vencimento: "2027-01-15" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-04-04",
    telefone: "(51) 99730-9528",
    email: "larissaborba2201@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/332353-larissa-aine-de-borba--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.490,00 (entrada da corretagem, PIX em 04/04/2026, doc. RESN4197170093 / 814895PHTE5K2C). Confirmado.\n" +
      "ATENÇÃO — PRECISA DO EXTRATO: contrato de 04/04/2026, já tem 4 meses, e os boletos venceram desde então:\n" +
      "  · R$ 3.000,00 — 4x 750,00 da corretagem, vencidos a partir de 15/05/2026\n" +
      "  · R$ 2.559,48 — sinal, 4x 639,87, o primeiro vence 15/09/2026\n" +
      "Se os 4 boletos da corretagem foram pagos, o valor sobe de R$ 1.490,00 para R$ 4.490,00. " +
      "Puxar o Extrato Cliente no SIENGE pelo CPF antes de emitir. Mesmo caso da Luzia e da Marcela.\n" +
      "É A LARISSA que estava perdida procurando o contrato — o e-mail de orientação (buscar por ZapSign/D4Sign) " +
      "funcionou e ela localizou e reencaminhou.\n" +
      "Casada, mas o cônjuge está \"Não informado\" e não assinou — o distrato sai com uma assinatura só.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0053418803419%. Adotado 1/52 como padrão.\n" +
      "Apartamento de 1 quarto, 63,11 m², 2º andar. Mesma vendedora das fichas 010, 011, 014, 017 e 022.\n" +
      "Assinado em Gramado/RS, 04/04/2026 (D4Sign). Contato: (51) 99730-9528 · larissaborba2201@gmail.com."
  },

  /* ---------- 028 — GAV — BEACH GAV, BLOCO 2 / 1519 / Cota 09 ----------
     Mesma pessoa da ficha 029: 2 cotas compradas no mesmo dia. */
  {
    id: "beach-gav-1519-cota-09-andre-luiz",
    nome: "ANDRE LUIZ SANTANA MORAES",
    cpf: "970.875.302-59",
    rg: "5864006 PC PA",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: {
      nome: "DEUSANGELA BENTES GUIMARAES",
      cpf: "016.175.282-93",
      rg: "6356683 PC PA",
      email: ""
    },

    empreendimento: "BEACH GAV RESORTS",
    bloco: "BLOCO 2",
    apartamento: "1519",
    andar: "15",
    cota: "09",
    fracao: "1/52",
    localizacao: "PARÁ",

    empresa: "GAV",
    razaoSocial: "BEACH GAV RESORTS EMPREENDIMENTOS IMOBILIARIOS SPE LTDA",
    cnpj: "33.531.685/0001-51",

    valorPago: 1000.00,
    valorTotal: 44756.64,
    corretagem: 3990.00,
    sinal: 2237.84,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1000.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-02-21" },
      { tipo: "Entrada", qtd: 5, valor: 598.00, forma: "Boleto (corretagem) — VENCIDOS, conferir", vencimento: "2026-03-21" },
      { tipo: "Sinal", qtd: 4, valor: 559.46, forma: "Boleto", vencimento: "" },
      { tipo: "Saldo", qtd: 68, valor: 566.60, forma: "Boleto", vencimento: "" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-02-21",
    telefone: "(91) 98280-4799",
    email: "andremoraesfoto@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/beach-gav-1519-cota-09-andre-luiz--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (entrada da corretagem, PIX em 21/02/2026, doc. RESN1219350095 / 158243F8JBVALI8).\n" +
      "PIX REPETIDO NAS DUAS COTAS: o mesmo doc. RESN1219350095 aparece no recibo desta e da Cota 03 — provável " +
      "PIX único de R$ 2.000,00 rateado em R$ 1.000,00 por contrato, padrão da Jocemara/Thais/Andressa. " +
      "Total pago pelo casal: R$ 2.000,00 (R$ 1.000,00 por cota).\n" +
      "ATENÇÃO — PRECISA DO EXTRATO: contrato de 21/02/2026, já tem quase 6 meses. Os 5 boletos de 598,00 da corretagem " +
      "(R$ 2.990,00) venceram a partir de 21/03/2026. Se pagos, o valor sobe. Puxar o Extrato Cliente no SIENGE pelo CPF.\n" +
      "1ª de 2 cotas compradas no mesmo dia — a outra é BLOCO 2, Apto 1509, Cota 03.\n" +
      "União estável, com cônjuge/companheira DEUSANGELA BENTES GUIMARAES qualificada no contrato — se ela assinou, " +
      "o distrato vai com duas assinaturas. Conferir na página de assinaturas. Tel. dela: (91) 99807-8288.\n" +
      "Fração: o contrato não diz 1/52; adotado 1/52 como padrão.\n" +
      "Apartamento de 1 quarto, 15º andar. Mesmo empreendimento das fichas 007 (ADN) e 021 (Margarete).\n" +
      "Assinado em Salinópolis/PA, 21/02/2026. Contato: (91) 98280-4799 · andremoraesfoto@gmail.com."
  },

  /* ---------- 029 — GAV — BEACH GAV, BLOCO 2 / 1509 / Cota 03 ----------
     Mesma pessoa da ficha 028. */
  {
    id: "beach-gav-1509-cota-03-andre-luiz",
    nome: "ANDRE LUIZ SANTANA MORAES",
    cpf: "970.875.302-59",
    rg: "5864006 PC PA",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: {
      nome: "DEUSANGELA BENTES GUIMARAES",
      cpf: "016.175.282-93",
      rg: "6356683 PC PA",
      email: ""
    },

    empreendimento: "BEACH GAV RESORTS",
    bloco: "BLOCO 2",
    apartamento: "1509",
    andar: "15",
    cota: "03",
    fracao: "1/52",
    localizacao: "PARÁ",

    empresa: "GAV",
    razaoSocial: "BEACH GAV RESORTS EMPREENDIMENTOS IMOBILIARIOS SPE LTDA",
    cnpj: "33.531.685/0001-51",

    valorPago: 1000.00,
    valorTotal: 44756.64,
    corretagem: 3990.00,
    sinal: 2237.84,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1000.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-02-21" },
      { tipo: "Entrada", qtd: 5, valor: 598.00, forma: "Boleto (corretagem) — VENCIDOS, conferir", vencimento: "2026-03-21" },
      { tipo: "Sinal", qtd: 4, valor: 559.46, forma: "Boleto", vencimento: "" },
      { tipo: "Saldo", qtd: 68, valor: 566.60, forma: "Boleto", vencimento: "" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-02-21",
    telefone: "(91) 98280-4799",
    email: "andremoraesfoto@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/beach-gav-1509-cota-03-andre-luiz--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (entrada da corretagem, PIX em 21/02/2026, doc. RESN1219350095 / 158243F8JBVALI8).\n" +
      "PIX REPETIDO NAS DUAS COTAS: o mesmo doc. RESN1219350095 aparece no recibo desta e da Cota 09 — provável " +
      "PIX único de R$ 2.000,00 rateado em R$ 1.000,00 por contrato. Total pago pelo casal: R$ 2.000,00.\n" +
      "ATENÇÃO — PRECISA DO EXTRATO: contrato de 21/02/2026, já tem quase 6 meses. Os 5 boletos de 598,00 da corretagem " +
      "(R$ 2.990,00) venceram a partir de 21/03/2026. Se pagos, o valor sobe. Puxar o Extrato no SIENGE pelo CPF.\n" +
      "2ª de 2 cotas compradas no mesmo dia — a outra é BLOCO 2, Apto 1519, Cota 09.\n" +
      "União estável, com cônjuge/companheira DEUSANGELA BENTES GUIMARAES qualificada no contrato — se ela assinou, " +
      "o distrato vai com duas assinaturas. Tel. dela: (91) 99807-8288.\n" +
      "Fração: adotado 1/52 como padrão. Apartamento de 1 quarto, 15º andar.\n" +
      "Assinado em Salinópolis/PA, 21/02/2026. Contato: (91) 98280-4799 · andremoraesfoto@gmail.com."
  },

  /* ---------- 030 — GAV — 352433 GRAN GARDEN RESORT ---------- */
  {
    id: "352433-mauricio-noronha-laner",
    nome: "MAURICIO NORONHA LANER",
    cpf: "026.638.090-55",
    rg: "9110848018 SSP RS",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco B1",
    apartamento: "203",
    andar: "2",
    cota: "16",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 500.00,
    valorTotal: 76732.22,
    corretagem: 4490.00,
    sinal: 3836.61,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 500.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-07-31" },
      { tipo: "Entrada", qtd: 1, valor: 500.00, forma: "Boleto (corretagem)", vencimento: "2026-08-07" },
      { tipo: "Entrada", qtd: 4, valor: 872.50, forma: "Boleto (corretagem)", vencimento: "2026-09-30" },
      { tipo: "Sinal", qtd: 5, valor: 767.32, forma: "Boleto", vencimento: "" },
      { tipo: "Saldo", qtd: 91, valor: 751.71, forma: "Boleto", vencimento: "" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-07-31",
    telefone: "(54) 99201-7852",
    email: "mau_n1992@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/352433-mauricio-noronha-laner--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 500,00 (entrada da corretagem, PIX em 31/07/2026, doc. RESV0113470093 / 814895XTIYVAGJB). " +
      "Entrada menor que a dos outros GAV (R$ 500 em vez de R$ 1.000).\n" +
      "O restante da corretagem é boleto: 1x 500,00 (venc. 07/08/2026) + 4x 872,50 (a partir de 30/09/2026). " +
      "O boleto de 500,00 já venceu — conferir se foi pago; se sim, o valor sobe para R$ 1.000,00.\n" +
      "União estável, cônjuge não informado e não assinou — o distrato sai com uma assinatura só.\n" +
      "Fração: o contrato não diz 1/52; informa fração ideal do terreno de 0,0106837606838%. Adotado 1/52 como padrão.\n" +
      "Apartamento de 2 quartos, 126,33 m², 2º andar — cota mais cara (R$ 76.732,22). " +
      "Mesma vendedora das fichas 010, 011, 014, 017, 022 e 027 (Gran Garden / GAV Gramado Três).\n" +
      "Assinado em Gramado/RS, 31/07/2026. Contato: (54) 99201-7852 · mau_n1992@hotmail.com."
  },

  /* ---------- 031 — WAM — 304196 PRAIAS DO LAGO ECO RESORT ---------- */
  {
    id: "304196-sandra-regina-nunes",
    nome: "SANDRA REGINA NUNES",
    cpf: "832.481.969-04",
    rg: "57678470 SSP PR",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: {
      nome: "LEOMAR NUNES DA SILVA",
      cpf: "615.269.241-53",
      rg: "000810941 SSP MS",
      email: "LEOMARN74@HOTMAIL.COM"
    },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "D",
    apartamento: "208",
    andar: "",
    cota: "03",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 3960.00,
    valorTotal: 35071.08,
    corretagem: 3960.00,
    sinal: 0,
    formaReembolso: "Estorno Cartão",
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 400.00, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-07-16" },
      { tipo: "Entrada", qtd: 5, valor: 712.00, forma: "Boleto W Palmerston (intermediação)", vencimento: "" },
      { tipo: "Saldo", qtd: 4, valor: 50.00, forma: "Boleto", vencimento: "2026-08-15" },
      { tipo: "Saldo", qtd: 84, valor: 415.13, forma: "Boleto", vencimento: "2026-12-20" }
    ],
    formaPagamentoEntrada: "Cartão de crédito Cielo (1x 400,00) + 5x boleto",
    dataAssinatura: "2026-07-16",
    telefone: "(41) 98837-1257",
    email: "Reginasandrals126@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/304196-sandra-regina-nunes--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.960,00 — a intermediação inteira. A EMPRESA RECEBEU O VALOR À VISTA da intermediadora; " +
      "o parcelamento (1x 400,00 no cartão Cielo + 5x 712,00 em boleto W Palmerston) é só a forma como a cliente quita " +
      "com a intermediadora. O reembolso é sobre o total de R$ 3.960,00.\n" +
      "Cônjuge anuente LEOMAR NUNES DA SILVA assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\n" +
      "Do preço da cota não pagou nada: o primeiro boleto de R$ 50,00 vence em 15/08/2026.\n" +
      "Fração: adotado 1/52 como padrão. Semanas de uso: 2 por ano.\n" +
      "Mesma vendedora da ficha 003 (Renato) — NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A.\n" +
      "Assinado em Caldas Novas/GO, 16/07/2026. Contato: (41) 98837-1257 · Reginasandrals126@gmail.com · " +
      "cônjuge (41) 99183-9979 · LEOMARN74@HOTMAIL.COM."
  },

  /* ---------- 032 — GAV — 217183 GRAN GARDEN RESORT ---------- */
  {
    id: "217183-alisson-bettervide-pereira",
    nome: "ALISSON BETTERVIDE PEREIRA",
    cpf: "007.744.650-00",
    rg: "5111162102 SSP DI RS",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco C3",
    apartamento: "103B",
    andar: "1",
    cota: "04",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 14995.88,
    valorTotal: 47338.70,
    corretagem: 4490.00,
    sinal: 2366.94,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1000.00, forma: "PIX (corretagem) — PAGO em 31/10/2024", vencimento: "2024-10-31" },
      { tipo: "Entrada", qtd: 2, valor: 1163.33, forma: "Boleto (corretagem) — VENCIDOS 2024/2025, conferir", vencimento: "2024-11-30" },
      { tipo: "Entrada", qtd: 1, valor: 1163.34, forma: "Boleto (corretagem) — VENCIDO, conferir", vencimento: "2025-01-30" },
      { tipo: "Sinal", qtd: 4, valor: 591.74, forma: "Boleto — VENCIDAS, conferir", vencimento: "" },
      { tipo: "Saldo", qtd: 68, valor: 532.65, forma: "Boleto — MUITAS VENCIDAS, conferir", vencimento: "" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2024-10-31",
    telefone: "(53) 99936-3065",
    email: "alissonbettervide@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/217183-alisson-bettervide-pereira--contrato.pdf" },
      { titulo: "Extrato de cota (SIENGE)", arquivo: "contratos-pdf/217183-alisson-bettervide-pereira--extrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 14.995,88 — CONFIRMADO pelo Extrato de Cota (SIENGE), venda 7809, base 07/08/2026. " +
      "22 das 84 parcelas pagas (26,19% da cota). Contrato de 31/10/2024, venceu há 642 dias — por isso o valor é alto. Reembolso sobre este total.\n" +
      "Corretagem R$ 4.490,00: 1x 1.000,00 PIX (pago 31/10/2024) + 2x 1.163,33 boleto (venc. 30/11/2024) + 1x 1.163,34 boleto (venc. 30/01/2025) — todos vencidos.\n" +
      "Sinal R$ 2.366,94 (4x 591,74) e saldo R$ 40.481,76 (68x 532,65) — várias parcelas já venceram desde 2024.\n" +
      "Casado, mas o cônjuge está \"Não informado\" e não assinou — o distrato sai com uma assinatura só.\n" +
      "Fração: adotado 1/52 como padrão. Apartamento de 1 quarto, 63,11 m², 1º andar.\n" +
      "Mesma vendedora e mesmo apartamento (103B) da 2ª cota da Andressa (que ainda falta) — mas cotas diferentes: aqui é Cota 04, a dela é Cota 08. Pessoas diferentes.\n" +
      "Assinado em Gramado/RS, 31/10/2024. Proposta 217183. Contato: (53) 99936-3065 · alissonbettervide@gmail.com."
  },

  /* ---------- 033 — GAV — 354139 GRAN GARDEN RESORT ---------- */
  {
    id: "354139-alessandra-dos-santos-paula-fernandes",
    nome: "ALESSANDRA DOS SANTOS PAULA FERNANDES",
    cpf: "427.597.958-37",
    rg: "42759795837 SSP SP",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco C1",
    apartamento: "201A",
    andar: "2",
    cota: "48",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 1000.00,
    valorTotal: 51701.47,
    corretagem: 4490.00,
    sinal: 2585.07,
    formaReembolso: "Estorno Cartão",
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1000.00, forma: "Cartão Master crédito à vista, Rede (corretagem) — PAGO", vencimento: "2026-09-10" },
      { tipo: "Entrada", qtd: 5, valor: 698.00, forma: "Boleto (corretagem)", vencimento: "2026-10-10" },
      { tipo: "Sinal", qtd: 4, valor: 646.27, forma: "Boleto", vencimento: "" },
      { tipo: "Saldo", qtd: 80, valor: 557.83, forma: "Boleto", vencimento: "" }
    ],
    formaPagamentoEntrada: "Cartão de crédito à vista (Master/Rede)",
    dataAssinatura: "2026-08-10",
    telefone: "(15) 99851-6044",
    email: "alessandra_santos020@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/354139-alessandra-dos-santos-paula-fernandes--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 — entrada da corretagem no cartão Master crédito à vista (Rede, doc. 20975030). " +
      "O restante da corretagem (5x 698,00) é boleto e vence a partir de 10/10/2026.\n" +
      "Devolução por ESTORNO no cartão (os R$ 1.000,00 passaram no crédito). Contrato recente (10/08/2026), " +
      "boletos ainda não venceram.\n" +
      "Casada, mas o cônjuge está \"Não informado\" e não assinou — o distrato sai com uma assinatura só.\n" +
      "Fração: adotado 1/52 como padrão. Apartamento de 1 quarto, 63,11 m², 2º andar.\n" +
      "Mesma vendedora das fichas do Gran Garden / GAV Gramado Três.\n" +
      "Assinado em Gramado/RS, 10/08/2026. Contato: (15) 99851-6044 · alessandra_santos020@hotmail.com."
  },

  /* ---------- 034 — WAM — A22622 ONDAS PRAIA RESORT ---------- */
  {
    id: "a22622-moacir-augusto-sanches-de-almeida",
    nome: "MOACIR AUGUSTO SANCHES DE ALMEIDA",
    cpf: "070.838.126-08",
    rg: "MG13728400 SSP MG",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado",
    conjuge: {
      nome: "ISABEL CRISTINA CARVALHO COSTA",
      cpf: "130.498.206-83",
      rg: "MG19284334 SSP MG",
      email: "ISABELCRISCARVALHO97@GMAIL.COM"
    },

    empreendimento: "ONDAS PRAIA RESORT",
    bloco: "A",
    apartamento: "A226",
    andar: "",
    cota: "22",
    fracao: "1/52",
    localizacao: "BAHIA",

    empresa: "WAM",
    razaoSocial: "SPE PORTO SEGURO 02 EMPREENDIMENTOS IMOBILIÁRIOS S.A.",
    cnpj: "22.059.167/0001-60",

    valorPago: 4466.00,
    valorTotal: 61213.00,
    corretagem: 4466.00,
    sinal: 0,
    formaReembolso: "Estorno Cartão",
    parcelas: [
      { tipo: "Entrada", qtd: 3, valor: 1488.66, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-02-14" },
      { tipo: "Saldo", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-03-15" },
      { tipo: "Saldo", qtd: 96, valor: 636.07, forma: "Boleto", vencimento: "2026-06-15" }
    ],
    formaPagamentoEntrada: "Cartão de crédito Cielo (3x 1.488,66)",
    dataAssinatura: "2026-02-14",
    telefone: "(31) 99725-8061",
    email: "MOASANCHES@GMAIL.COM",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/a22622-moacir-augusto-sanches-de-almeida--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 4.466,00 — intermediação inteira no cartão de crédito Cielo (3x 1.488,66). A empresa recebeu à vista; " +
      "devolução por estorno no cartão.\n" +
      "ATENÇÃO — CONFERIR O EXTRATO DA COTA: contrato de 14/02/2026, quase 6 meses. Além da intermediação, os boletos do " +
      "PREÇO da cota começaram a vencer (3x 50,00 desde 15/03/2026 + 96x 636,07 desde 15/06/2026). Se ela pagou parcelas " +
      "do preço, isso é valor à parte que também entra no acerto — puxar o Extrato de Cota no SIENGE pelo CPF.\n" +
      "Cônjuge anuente ISABEL CRISTINA CARVALHO COSTA assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\n" +
      "Semanas de uso: 2 por ano. Habite-se a partir de 02/03/2021 — resort pronto e entregue (atenção à fruição no distrato de rescisão).\n" +
      "Mesma vendedora das fichas 008 (Marina) e 025 (Bernardo) — SPE PORTO SEGURO 02.\n" +
      "Fração: adotado 1/52 como padrão.\n" +
      "Assinado em Porto Seguro/BA, 14/02/2026 (GSign). Contato: (31) 99725-8061 · MOASANCHES@GMAIL.COM · " +
      "cônjuge ISABELCRISCARVALHO97@GMAIL.COM."
  },

  /* ---------- 035 — WAM — 309416 BÚZIOS FRACTIONAL RESORT ---------- */
  {
    id: "309416-afranio-de-souza-goudard",
    nome: "AFRANIO DE SOUZA GOUDARD",
    cpf: "004.326.387-92",
    rg: "084645779 IFP RJ",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado",
    conjuge: {
      nome: "GRASIELA DE FATIMA JASMIM VIEIRA GOUDARD",
      cpf: "075.976.667-30",
      rg: "107952889 DETRAN RJ",
      email: "grasielav@yahoo.com.br"
    },

    empreendimento: "BÚZIOS FRACTIONAL RESORT",
    bloco: "Bloco 03",
    apartamento: "3108",
    andar: "",
    cota: "21",
    fracao: "1/52",
    localizacao: "RIO DE JANEIRO",

    empresa: "WAM",
    razaoSocial: "W50 EMPREENDIMENTOS IMOBILIARIOS LTDA",
    cnpj: "33.770.634/0001-82",

    valorPago: 392.00,
    valorTotal: 36533.79,
    corretagem: 3920.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 392.00, forma: "Depósito/TED (intermediação) — PAGO", vencimento: "2026-08-07" },
      { tipo: "Entrada", qtd: 9, valor: 392.00, forma: "Crédito recorrente (intermediação)", vencimento: "" },
      { tipo: "Saldo", qtd: 5, valor: 50.00, forma: "Boleto", vencimento: "2026-09-10" },
      { tipo: "Saldo", qtd: 96, valor: 377.96, forma: "Boleto", vencimento: "2027-02-20" }
    ],
    formaPagamentoEntrada: "Depósito/TED (1x 392,00) + 9x crédito recorrente",
    dataAssinatura: "2026-08-07",
    telefone: "(22) 99265-7961",
    email: "asgoudard72@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/309416-afranio-de-souza-goudard--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "⚠️ CONFERIR O VALOR — R$ 392,00 é só o PISO. A intermediação é R$ 3.920,00, paga em 1x 392,00 no depósito/TED " +
      "(confirmado, na assinatura) + 9x 392,00 em CRÉDITO RECORRENTE. Crédito recorrente cobra o cartão TODO MÊS " +
      "(não é à vista como o crédito parcelado). Contrato de 07/08/2026, poucos dias — provável que só a 1ª tenha caído.\n" +
      "DECIDIR: se a empresa recebeu a intermediação à vista da intermediadora, o valor é R$ 3.920,00; se cada parcela " +
      "recorrente entra mês a mês, o pago até agora é R$ 392,00. Confirmar quantas parcelas recorrentes já foram cobradas.\n" +
      "Forma de reembolso deixada em branco (deduz da forma): como o pago foi depósito/TED, sai como Reembolso " +
      "(transferência) por padrão. Se for estornar o crédito recorrente, mudar na ficha.\n" +
      "Cônjuge anuente GRASIELA DE FATIMA JASMIM VIEIRA GOUDARD assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\n" +
      "Semanas de uso: 1 por ano. Mesmo empreendimento e apartamento (3108) da ficha 023 (Melissa), mas cota diferente (a dela é a 45, esta é a 21). Pessoas diferentes.\n" +
      "Vendedora W50 EMPREENDIMENTOS IMOBILIARIOS LTDA (a mesma da Melissa). Fração: adotado 1/52.\n" +
      "Assinado em Armação dos Búzios/RJ, 07/08/2026 (GSign). Contato: (22) 99265-7961 · asgoudard72@gmail.com · " +
      "cônjuge (22) 97346-0894 · grasielav@yahoo.com.br."
  },

  /* ---------- 036 — WAM — 308936 ONDAS PRAIA, Bloco A / A128 / Cota 23 ----------
     Mesma pessoa da ficha 037: 2 cotas compradas no mesmo dia. */
  {
    id: "308936-viviane-a128-cota-23",
    nome: "VIVIANE APARECIDA OLIVEIRA SILVA",
    cpf: "092.295.876-99",
    rg: "15853267 SSP MG",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: {
      nome: "REGINALDO GONCALVES VALERIO",
      cpf: "047.436.126-83",
      rg: "MG12579560 SSP MG",
      email: "reykgb@hotmail.com"
    },

    empreendimento: "ONDAS PRAIA RESORT",
    bloco: "A",
    apartamento: "A128",
    andar: "",
    cota: "23",
    fracao: "1/52",
    localizacao: "BAHIA",

    empresa: "WAM",
    razaoSocial: "SPE PORTO SEGURO 02 EMPREENDIMENTOS IMOBILIÁRIOS S.A.",
    cnpj: "22.059.167/0001-60",

    valorPago: 7650.00,
    valorTotal: 62663.17,
    corretagem: 7650.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 765.00, forma: "Depósito/TED (intermediação) — PAGO", vencimento: "2026-08-05" },
      { tipo: "Entrada", qtd: 6, valor: 1147.50, forma: "Crédito recorrente (intermediação)", vencimento: "" },
      { tipo: "Saldo", qtd: 5, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Saldo", qtd: 96, valor: 650.14, forma: "Boleto", vencimento: "2027-02-20" }
    ],
    formaReembolso: "Reembolso",
    formaPagamentoEntrada: "Depósito/TED (1x 765,00) + 6x crédito recorrente",
    dataAssinatura: "2026-08-05",
    telefone: "(31) 99840-4206",
    email: "Vivi_oliver_10@yahoo.com.br",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/308936-viviane-a128-cota-23--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 7.650,00 — a intermediação inteira. A empresa recebeu à vista (a operadora antecipa o crédito " +
      "recorrente), por isso é o valor cheio, não só o depósito. Composição: 1x 765,00 depósito/TED + 6x 1.147,50 crédito recorrente.\n" +
      "1ª de 2 cotas compradas no mesmo dia — a outra é Bloco C, Apto C119, Cota 20 (ficha 037). Cada uma tem intermediação " +
      "própria de R$ 7.650,00 (não é rateio — são 2 contratos separados, propostas 308936 e 308956).\n" +
      "Cônjuge anuente REGINALDO GONCALVES VALERIO assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\n" +
      "Semanas de uso: 2 por ano. Habite-se a partir de 02/03/2021 — resort pronto e entregue.\n" +
      "Vendedora SPE PORTO SEGURO 02 (a mesma da Marina, Bernardo e Moacir). Fração: adotado 1/52.\n" +
      "Assinado em Porto Seguro/BA, 05/08/2026 (GSign). Contato: (31) 99840-4206 · Vivi_oliver_10@yahoo.com.br · cônjuge reykgb@hotmail.com."
  },

  /* ---------- 037 — WAM — 308956 ONDAS PRAIA, Bloco C / C119 / Cota 20 ----------
     Mesma pessoa da ficha 036. */
  {
    id: "308956-viviane-c119-cota-20",
    nome: "VIVIANE APARECIDA OLIVEIRA SILVA",
    cpf: "092.295.876-99",
    rg: "15853267 SSP MG",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: {
      nome: "REGINALDO GONCALVES VALERIO",
      cpf: "047.436.126-83",
      rg: "MG12579560 SSP MG",
      email: "reykgb@hotmail.com"
    },

    empreendimento: "ONDAS PRAIA RESORT",
    bloco: "C",
    apartamento: "C119",
    andar: "",
    cota: "20",
    fracao: "1/52",
    localizacao: "BAHIA",

    empresa: "WAM",
    razaoSocial: "SPE PORTO SEGURO 02 EMPREENDIMENTOS IMOBILIÁRIOS S.A.",
    cnpj: "22.059.167/0001-60",

    valorPago: 7650.00,
    valorTotal: 62663.17,
    corretagem: 7650.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 765.00, forma: "Depósito/TED (intermediação) — PAGO", vencimento: "2026-08-05" },
      { tipo: "Entrada", qtd: 6, valor: 1147.50, forma: "Crédito recorrente (intermediação)", vencimento: "" },
      { tipo: "Saldo", qtd: 5, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Saldo", qtd: 96, valor: 650.14, forma: "Boleto", vencimento: "2027-02-20" }
    ],
    formaReembolso: "Reembolso",
    formaPagamentoEntrada: "Depósito/TED (1x 765,00) + 6x crédito recorrente",
    dataAssinatura: "2026-08-05",
    telefone: "(31) 99840-4206",
    email: "Vivi_oliver_10@yahoo.com.br",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/308956-viviane-c119-cota-20--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 7.650,00 — a intermediação inteira. A empresa recebeu à vista (a operadora antecipa o crédito " +
      "recorrente). Composição: 1x 765,00 depósito/TED + 6x 1.147,50 crédito recorrente.\n" +
      "2ª de 2 cotas compradas no mesmo dia — a outra é Bloco A, Apto A128, Cota 23 (ficha 036). São 2 contratos separados " +
      "(propostas 308936 e 308956), cada um com intermediação própria de R$ 7.650,00 — não é rateio.\n" +
      "Cônjuge anuente REGINALDO GONCALVES VALERIO assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\n" +
      "Semanas de uso: 2 por ano. Habite-se a partir de 02/03/2021 — resort pronto.\n" +
      "Vendedora SPE PORTO SEGURO 02. Fração: adotado 1/52.\n" +
      "Assinado em Porto Seguro/BA, 05/08/2026 (GSign). Contato: (31) 99840-4206 · Vivi_oliver_10@yahoo.com.br · cônjuge reykgb@hotmail.com."
  },

  /* ---------- 038 — GAV — AREYA BARRA, Bloco 01 / 253 / Cota 07 ----------
     Aline tem 2 cotas: falta o contrato da outra (Bloco 01, Apto 258, Cota 52). */
  {
    id: "areya-253-cota-07-aline-gomes",
    nome: "ALINE GOMES BORGES DE OLIVEIRA",
    cpf: "090.943.394-12",
    rg: "09094339412 SSP AL",
    nacionalidade: "brasileira",
    estadoCivil: "Casada",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "253",
    andar: "2",
    cota: "07",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 500.00,
    valorTotal: 28721.82,
    corretagem: 1995.00,
    sinal: 1436.10,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 500.00, forma: "PIX (corretagem) — PAGO", vencimento: "2026-08-11" },
      { tipo: "Entrada", qtd: 2, valor: 498.33, forma: "Boleto (corretagem)", vencimento: "2026-09-11" },
      { tipo: "Entrada", qtd: 1, valor: 498.34, forma: "Boleto (corretagem)", vencimento: "2026-11-11" },
      { tipo: "Sinal", qtd: 4, valor: 359.02, forma: "Boleto", vencimento: "" },
      { tipo: "Saldo", qtd: 56, valor: 451.62, forma: "Boleto", vencimento: "" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-08-11",
    telefone: "(82) 99822-3601",
    email: "alineagbo@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/areya-253-cota-07-aline-gomes--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 500,00 (entrada da corretagem, PIX em 11/08/2026, doc. RESV0981270094 / 845425QBED4A2B). " +
      "Contrato recém-assinado (11/08/2026), os boletos ainda não venceram.\n" +
      "FALTA A 2ª COTA: a Ficha de Negociação deste PDF traz duas — COTA 1 (Apto 253, Cota 07, este contrato) e " +
      "COTA 2 (Bloco 01, Apto 258, Cota 52). Pedir o contrato da Cota 52 para cadastrar e emitir os 2 distratos.\n" +
      "Casada, mas o cônjuge está \"Não informado\" e não assinou — o distrato sai com uma assinatura só.\n" +
      "Fração: adotado 1/52 como padrão. Apartamento de 1 quarto, 76,66 m², 2º andar.\n" +
      "Mesma vendedora e empreendimento da ficha 001 (Bruna) — GAV Barra de São Miguel / Areya Barra.\n" +
      "Assinado em Marechal Deodoro/AL, 11/08/2026. Contato: (82) 99822-3601 · alineagbo@hotmail.com."
  },

  /* ---------- 039 — GAV — GRAN VALLEY / NOTIFICAÇÃO EXTRAJUDICIAL ----------
     NÃO é distrato de rotina. Cliente notificou a empresa exigindo restituição
     integral sem multa. Tem prazo e argumento jurídico forte. Ler observações. */
  {
    id: "notificacao-gran-valley-orivaldo",
    nome: "ORIVALDO DA ROCHA MELLO",
    cpf: "",
    rg: "",
    nacionalidade: "brasileiro",
    estadoCivil: "",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN VALLEY RESORT",
    bloco: "Bloco B",
    apartamento: "0406",
    andar: "",
    cota: "25",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.042.537/0001-52",

    valorPago: 42096.34,
    valorTotal: 0,
    corretagem: 0,
    sinal: 0,
    formaReembolso: "Reembolso",
    parcelas: [],
    formaPagamentoEntrada: "",
    dataAssinatura: "2023-01-26",
    telefone: "",
    email: "",
    arquivos: [
      { titulo: "Notificação extrajudicial (assinada)", arquivo: "contratos-pdf/notificacao-gran-valley-orivaldo--notificacao.pdf" }
    ],
    pix: "",
    observacoes:
      "🔴 NÃO É DISTRATO DE ROTINA — É UMA NOTIFICAÇÃO EXTRAJUDICIAL do cliente contra a GAV, assinada em 13/08/2026, " +
      "em Santa Rosa do Sul/SC. Ele exige resolução/distrato SEM MULTA e RESTITUIÇÃO INTEGRAL de R$ 42.096,34.\n" +
      "PRAZO: pediu resposta formal em 10 (dez) dias úteis a contar de 13/08/2026. Não deixar vencer.\n" +
      "ARGUMENTO DELE (forte): a GAV alterou o Cronograma de Uso da cota. A Semana 1 dele era 22 a 29/07/2026; o portal " +
      "depois removeu e remarcou para 2027 (Semana 1 de 19 a 26/05/2027). O resort só inaugurou em 03/08/2026, DEPOIS da " +
      "semana que era dele — então ele não pôde usar. Ele sustenta que ISSO NÃO É desistência imotivada do comprador, e sim " +
      "descumprimento da vendedora — o que, pela cláusula G.1 do próprio contrato GAV, muda tudo: se a rescisão é por culpa " +
      "da VENDEDORA, não há multa e o sinal é restituído EM DOBRO. Ou seja, o pedido dele de devolução integral tem base.\n" +
      "VALOR = R$ 42.096,34, conforme o Demonstrativo de Pagamentos da Cota de 11/08/2026 (venda 5658), sem parcelas " +
      "atrasadas. É valor de restituição, não corretagem.\n" +
      "Ele pede, se a empresa negar: (a) fundamento contratual/legal; (b) histórico das alterações do cronograma; (c) razão " +
      "da retirada da semana; (d) memória de retenção; (e) valor líquido proposto. E ressalva medidas judiciais.\n" +
      "ISSO PRECISA DO JURÍDICO / RESPONSÁVEL, não do fluxo normal de distrato. Não gerar termo padrão sem orientação.\n" +
      "FALTAM DADOS (não vieram na notificação): CPF, RG, estado civil, telefone, e-mail, e o CONTRATO em si " +
      "(corretagem, sinal, forma de pagamento). Puxar pelo nome/venda 5658 no sistema.\n" +
      "Empreendimento e vendedora novos na base: GRAN VALLEY RESORT, vendido pela GAV GRAMADO EMPREENDIMENTO " +
      "IMOBILIÁRIO SPE LTDA (CNPJ 45.042.537/0001-52) — não confundir com a GAV GRAMADO TRÊS (Gran Garden). " +
      "Localização a confirmar (Gramado/RS provável, mas o contrato não veio).\n" +
      "Bloco B, Apto 0406, Cota 25. Venda 5658, 26/01/2023 (contrato de 2,5 anos). Notificante em Santa Rosa do Sul/SC."
  },

  /* ---------- 40 — GAV — 310136 REFÚGIO DAS LONTRAS, Bloco B / 310 / Cota 24 ----------
     Jonas comprou 6 cotas no mesmo dia — agrupam pelo CPF. */
  {
    id: "310136-jonas-b310-cota-24",
    nome: "JONAS DELASENA FATURI",
    cpf: "002.947.260-12",
    rg: "9081981251 SJS RS",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "KARINE DE OLIVEIRA LUNARDI", cpf: "009.103.890-12", rg: "1088898448 SJS RS", email: "karinelunardi@yahoo.com.br" },

    empreendimento: "REFÚGIO DAS LONTRAS POUSADA",
    bloco: "Bloco B",
    apartamento: "310",
    andar: "",
    cota: "24",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "REFÚGIO DAS LONTRAS POUSADA EMPREENDIMENTOS IMOBILIARIOS LTDA",
    cnpj: "41.402.028/0001-32",

    valorPago: 3900.00,
    valorTotal: 34655.91,
    corretagem: 3900.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1333.33, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-08-12" },
      { tipo: "Entrada", qtd: 4, valor: 641.66, forma: "Crédito recorrente (intermediação)", vencimento: "" }
    ],
    formaPagamentoEntrada: "Cartão de crédito Cielo (1x 1.333,33) + 4x crédito recorrente",
    dataAssinatura: "2026-08-12",
    telefone: "(55) 99152-9082",
    email: "jonasdelasenafaturi@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/310136-jonas-b310-cota-24--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.900,00 — intermediação inteira. Recebida à vista (operadora antecipa): 1x 1.333,33 no cartão de crédito Cielo + 4x 641,66 em crédito recorrente. Mesma regra da Viviane (recorrente = valor cheio).\n1 de 6 cotas que o Jonas comprou no mesmo dia (12/08/2026), todas no Bloco B do Refúgio das Lontras: apto 310/cota 24, 211/42, 111/14, 110/03, 010/13 e 210/21. Cada uma tem intermediação própria de R$ 3.900,00 (6 contratos separados, não é rateio). Total pago pelo casal: R$ 23.400,00.\nDEVOLUÇÃO: Estorno no Cartão — o pagamento principal foi no cartão de crédito Cielo (1x 1.333,33) e o restante em crédito recorrente do mesmo cartão. Total R$ 3.900,00 volta pelo cartão.\nUnião estável, cônjuge KARINE DE OLIVEIRA LUNARDI assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\nDo preço da cota (R$ 34.655,91) não pagou nada ainda — contrato recém-assinado.\nEmpreendimento e vendedora novos na base: REFÚGIO DAS LONTRAS POUSADA, Barra de Santo Antônio/AL, CNPJ 41.402.028/0001-32. Fração: adotado 1/52.\nAssinado em Maceió/AL, 12/08/2026. Contato: (55) 99152-9082 · jonasdelasenafaturi@gmail.com · cônjuge (55) 99609-7889 · karinelunardi@yahoo.com.br."
  },

  /* ---------- 41 — GAV — 310138 REFÚGIO DAS LONTRAS, Bloco B / 211 / Cota 42 ----------
     Jonas comprou 6 cotas no mesmo dia — agrupam pelo CPF. */
  {
    id: "310138-jonas-b211-cota-42",
    nome: "JONAS DELASENA FATURI",
    cpf: "002.947.260-12",
    rg: "9081981251 SJS RS",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "KARINE DE OLIVEIRA LUNARDI", cpf: "009.103.890-12", rg: "1088898448 SJS RS", email: "karinelunardi@yahoo.com.br" },

    empreendimento: "REFÚGIO DAS LONTRAS POUSADA",
    bloco: "Bloco B",
    apartamento: "211",
    andar: "",
    cota: "42",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "REFÚGIO DAS LONTRAS POUSADA EMPREENDIMENTOS IMOBILIARIOS LTDA",
    cnpj: "41.402.028/0001-32",

    valorPago: 3900.00,
    valorTotal: 34655.91,
    corretagem: 3900.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1333.33, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-08-12" },
      { tipo: "Entrada", qtd: 4, valor: 641.66, forma: "Crédito recorrente (intermediação)", vencimento: "" }
    ],
    formaPagamentoEntrada: "Cartão de crédito Cielo (1x 1.333,33) + 4x crédito recorrente",
    dataAssinatura: "2026-08-12",
    telefone: "(55) 99152-9082",
    email: "jonasdelasenafaturi@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/310138-jonas-b211-cota-42--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.900,00 — intermediação inteira. Recebida à vista (operadora antecipa): 1x 1.333,33 no cartão de crédito Cielo + 4x 641,66 em crédito recorrente. Mesma regra da Viviane (recorrente = valor cheio).\n1 de 6 cotas que o Jonas comprou no mesmo dia (12/08/2026), todas no Bloco B do Refúgio das Lontras: apto 310/cota 24, 211/42, 111/14, 110/03, 010/13 e 210/21. Cada uma tem intermediação própria de R$ 3.900,00 (6 contratos separados, não é rateio). Total pago pelo casal: R$ 23.400,00.\nDEVOLUÇÃO: Estorno no Cartão — o pagamento principal foi no cartão de crédito Cielo (1x 1.333,33) e o restante em crédito recorrente do mesmo cartão. Total R$ 3.900,00 volta pelo cartão.\nUnião estável, cônjuge KARINE DE OLIVEIRA LUNARDI assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\nDo preço da cota (R$ 34.655,91) não pagou nada ainda — contrato recém-assinado.\nEmpreendimento e vendedora novos na base: REFÚGIO DAS LONTRAS POUSADA, Barra de Santo Antônio/AL, CNPJ 41.402.028/0001-32. Fração: adotado 1/52.\nAssinado em Maceió/AL, 12/08/2026. Contato: (55) 99152-9082 · jonasdelasenafaturi@gmail.com · cônjuge (55) 99609-7889 · karinelunardi@yahoo.com.br."
  },

  /* ---------- 42 — GAV — 310140 REFÚGIO DAS LONTRAS, Bloco B / 111 / Cota 14 ----------
     Jonas comprou 6 cotas no mesmo dia — agrupam pelo CPF. */
  {
    id: "310140-jonas-b111-cota-14",
    nome: "JONAS DELASENA FATURI",
    cpf: "002.947.260-12",
    rg: "9081981251 SJS RS",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "KARINE DE OLIVEIRA LUNARDI", cpf: "009.103.890-12", rg: "1088898448 SJS RS", email: "karinelunardi@yahoo.com.br" },

    empreendimento: "REFÚGIO DAS LONTRAS POUSADA",
    bloco: "Bloco B",
    apartamento: "111",
    andar: "",
    cota: "14",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "REFÚGIO DAS LONTRAS POUSADA EMPREENDIMENTOS IMOBILIARIOS LTDA",
    cnpj: "41.402.028/0001-32",

    valorPago: 3900.00,
    valorTotal: 34655.91,
    corretagem: 3900.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1333.33, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-08-12" },
      { tipo: "Entrada", qtd: 4, valor: 641.66, forma: "Crédito recorrente (intermediação)", vencimento: "" }
    ],
    formaPagamentoEntrada: "Cartão de crédito Cielo (1x 1.333,33) + 4x crédito recorrente",
    dataAssinatura: "2026-08-12",
    telefone: "(55) 99152-9082",
    email: "jonasdelasenafaturi@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/310140-jonas-b111-cota-14--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.900,00 — intermediação inteira. Recebida à vista (operadora antecipa): 1x 1.333,33 no cartão de crédito Cielo + 4x 641,66 em crédito recorrente. Mesma regra da Viviane (recorrente = valor cheio).\n1 de 6 cotas que o Jonas comprou no mesmo dia (12/08/2026), todas no Bloco B do Refúgio das Lontras: apto 310/cota 24, 211/42, 111/14, 110/03, 010/13 e 210/21. Cada uma tem intermediação própria de R$ 3.900,00 (6 contratos separados, não é rateio). Total pago pelo casal: R$ 23.400,00.\nDEVOLUÇÃO: Estorno no Cartão — o pagamento principal foi no cartão de crédito Cielo (1x 1.333,33) e o restante em crédito recorrente do mesmo cartão. Total R$ 3.900,00 volta pelo cartão.\nUnião estável, cônjuge KARINE DE OLIVEIRA LUNARDI assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\nDo preço da cota (R$ 34.655,91) não pagou nada ainda — contrato recém-assinado.\nEmpreendimento e vendedora novos na base: REFÚGIO DAS LONTRAS POUSADA, Barra de Santo Antônio/AL, CNPJ 41.402.028/0001-32. Fração: adotado 1/52.\nAssinado em Maceió/AL, 12/08/2026. Contato: (55) 99152-9082 · jonasdelasenafaturi@gmail.com · cônjuge (55) 99609-7889 · karinelunardi@yahoo.com.br."
  },

  /* ---------- 43 — GAV — 310141 REFÚGIO DAS LONTRAS, Bloco B / 110 / Cota 03 ----------
     Jonas comprou 6 cotas no mesmo dia — agrupam pelo CPF. */
  {
    id: "310141-jonas-b110-cota-03",
    nome: "JONAS DELASENA FATURI",
    cpf: "002.947.260-12",
    rg: "9081981251 SJS RS",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "KARINE DE OLIVEIRA LUNARDI", cpf: "009.103.890-12", rg: "1088898448 SJS RS", email: "karinelunardi@yahoo.com.br" },

    empreendimento: "REFÚGIO DAS LONTRAS POUSADA",
    bloco: "Bloco B",
    apartamento: "110",
    andar: "",
    cota: "03",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "REFÚGIO DAS LONTRAS POUSADA EMPREENDIMENTOS IMOBILIARIOS LTDA",
    cnpj: "41.402.028/0001-32",

    valorPago: 3900.00,
    valorTotal: 34655.91,
    corretagem: 3900.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1333.33, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-08-12" },
      { tipo: "Entrada", qtd: 4, valor: 641.66, forma: "Crédito recorrente (intermediação)", vencimento: "" }
    ],
    formaPagamentoEntrada: "Cartão de crédito Cielo (1x 1.333,33) + 4x crédito recorrente",
    dataAssinatura: "2026-08-12",
    telefone: "(55) 99152-9082",
    email: "jonasdelasenafaturi@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/310141-jonas-b110-cota-03--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.900,00 — intermediação inteira. Recebida à vista (operadora antecipa): 1x 1.333,33 no cartão de crédito Cielo + 4x 641,66 em crédito recorrente. Mesma regra da Viviane (recorrente = valor cheio).\n1 de 6 cotas que o Jonas comprou no mesmo dia (12/08/2026), todas no Bloco B do Refúgio das Lontras: apto 310/cota 24, 211/42, 111/14, 110/03, 010/13 e 210/21. Cada uma tem intermediação própria de R$ 3.900,00 (6 contratos separados, não é rateio). Total pago pelo casal: R$ 23.400,00.\nDEVOLUÇÃO: Estorno no Cartão — o pagamento principal foi no cartão de crédito Cielo (1x 1.333,33) e o restante em crédito recorrente do mesmo cartão. Total R$ 3.900,00 volta pelo cartão.\nUnião estável, cônjuge KARINE DE OLIVEIRA LUNARDI assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\nDo preço da cota (R$ 34.655,91) não pagou nada ainda — contrato recém-assinado.\nEmpreendimento e vendedora novos na base: REFÚGIO DAS LONTRAS POUSADA, Barra de Santo Antônio/AL, CNPJ 41.402.028/0001-32. Fração: adotado 1/52.\nAssinado em Maceió/AL, 12/08/2026. Contato: (55) 99152-9082 · jonasdelasenafaturi@gmail.com · cônjuge (55) 99609-7889 · karinelunardi@yahoo.com.br."
  },

  /* ---------- 44 — GAV — 310143 REFÚGIO DAS LONTRAS, Bloco B / 010 / Cota 13 ----------
     Jonas comprou 6 cotas no mesmo dia — agrupam pelo CPF. */
  {
    id: "310143-jonas-b010-cota-13",
    nome: "JONAS DELASENA FATURI",
    cpf: "002.947.260-12",
    rg: "9081981251 SJS RS",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "KARINE DE OLIVEIRA LUNARDI", cpf: "009.103.890-12", rg: "1088898448 SJS RS", email: "karinelunardi@yahoo.com.br" },

    empreendimento: "REFÚGIO DAS LONTRAS POUSADA",
    bloco: "Bloco B",
    apartamento: "010",
    andar: "",
    cota: "13",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "REFÚGIO DAS LONTRAS POUSADA EMPREENDIMENTOS IMOBILIARIOS LTDA",
    cnpj: "41.402.028/0001-32",

    valorPago: 3900.00,
    valorTotal: 34655.91,
    corretagem: 3900.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1333.33, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-08-12" },
      { tipo: "Entrada", qtd: 4, valor: 641.66, forma: "Crédito recorrente (intermediação)", vencimento: "" }
    ],
    formaPagamentoEntrada: "Cartão de crédito Cielo (1x 1.333,33) + 4x crédito recorrente",
    dataAssinatura: "2026-08-12",
    telefone: "(55) 99152-9082",
    email: "jonasdelasenafaturi@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/310143-jonas-b010-cota-13--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.900,00 — intermediação inteira. Recebida à vista (operadora antecipa): 1x 1.333,33 no cartão de crédito Cielo + 4x 641,66 em crédito recorrente. Mesma regra da Viviane (recorrente = valor cheio).\n1 de 6 cotas que o Jonas comprou no mesmo dia (12/08/2026), todas no Bloco B do Refúgio das Lontras: apto 310/cota 24, 211/42, 111/14, 110/03, 010/13 e 210/21. Cada uma tem intermediação própria de R$ 3.900,00 (6 contratos separados, não é rateio). Total pago pelo casal: R$ 23.400,00.\nDEVOLUÇÃO: Estorno no Cartão — o pagamento principal foi no cartão de crédito Cielo (1x 1.333,33) e o restante em crédito recorrente do mesmo cartão. Total R$ 3.900,00 volta pelo cartão.\nUnião estável, cônjuge KARINE DE OLIVEIRA LUNARDI assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\nDo preço da cota (R$ 34.655,91) não pagou nada ainda — contrato recém-assinado.\nEmpreendimento e vendedora novos na base: REFÚGIO DAS LONTRAS POUSADA, Barra de Santo Antônio/AL, CNPJ 41.402.028/0001-32. Fração: adotado 1/52.\nAssinado em Maceió/AL, 12/08/2026. Contato: (55) 99152-9082 · jonasdelasenafaturi@gmail.com · cônjuge (55) 99609-7889 · karinelunardi@yahoo.com.br."
  },

  /* ---------- 45 — GAV — 310156 REFÚGIO DAS LONTRAS, Bloco B / 210 / Cota 21 ----------
     Jonas comprou 6 cotas no mesmo dia — agrupam pelo CPF. */
  {
    id: "310156-jonas-b210-cota-21",
    nome: "JONAS DELASENA FATURI",
    cpf: "002.947.260-12",
    rg: "9081981251 SJS RS",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "KARINE DE OLIVEIRA LUNARDI", cpf: "009.103.890-12", rg: "1088898448 SJS RS", email: "karinelunardi@yahoo.com.br" },

    empreendimento: "REFÚGIO DAS LONTRAS POUSADA",
    bloco: "Bloco B",
    apartamento: "210",
    andar: "",
    cota: "21",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "REFÚGIO DAS LONTRAS POUSADA EMPREENDIMENTOS IMOBILIARIOS LTDA",
    cnpj: "41.402.028/0001-32",

    valorPago: 3900.00,
    valorTotal: 34655.91,
    corretagem: 3900.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1333.33, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-08-12" },
      { tipo: "Entrada", qtd: 4, valor: 641.66, forma: "Crédito recorrente (intermediação)", vencimento: "" }
    ],
    formaPagamentoEntrada: "Cartão de crédito Cielo (1x 1.333,33) + 4x crédito recorrente",
    dataAssinatura: "2026-08-12",
    telefone: "(55) 99152-9082",
    email: "jonasdelasenafaturi@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/310156-jonas-b210-cota-21--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.900,00 — intermediação inteira. Recebida à vista (operadora antecipa): 1x 1.333,33 no cartão de crédito Cielo + 4x 641,66 em crédito recorrente. Mesma regra da Viviane (recorrente = valor cheio).\n1 de 6 cotas que o Jonas comprou no mesmo dia (12/08/2026), todas no Bloco B do Refúgio das Lontras: apto 310/cota 24, 211/42, 111/14, 110/03, 010/13 e 210/21. Cada uma tem intermediação própria de R$ 3.900,00 (6 contratos separados, não é rateio). Total pago pelo casal: R$ 23.400,00.\nDEVOLUÇÃO: Estorno no Cartão — o pagamento principal foi no cartão de crédito Cielo (1x 1.333,33) e o restante em crédito recorrente do mesmo cartão. Total R$ 3.900,00 volta pelo cartão.\nUnião estável, cônjuge KARINE DE OLIVEIRA LUNARDI assinou — o distrato vai com duas assinaturas. Regime: comunhão parcial.\nDo preço da cota (R$ 34.655,91) não pagou nada ainda — contrato recém-assinado.\nEmpreendimento e vendedora novos na base: REFÚGIO DAS LONTRAS POUSADA, Barra de Santo Antônio/AL, CNPJ 41.402.028/0001-32. Fração: adotado 1/52.\nAssinado em Maceió/AL, 12/08/2026. Contato: (55) 99152-9082 · jonasdelasenafaturi@gmail.com · cônjuge (55) 99609-7889 · karinelunardi@yahoo.com.br."
  },

  /* ---------- 46 — WAM — 303122 ONDAS PRAIA RESORT, Bloco A / A231 / Cota 07 ---------- */
  {
    id: "303122-victor-ondas-a231-cota-07",
    nome: "VICTOR DOS SANTOS FERNANDES FERREIRA",
    cpf: "054.522.897-20",
    rg: "5793300 MMRJ",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "VIVIANNE DOS SANTOS ROSAS", cpf: "070.363.267-19", rg: "07036326719 PC PB", email: "viviannerosas76@gmail.com" },

    empreendimento: "ONDAS PRAIA RESORT",
    bloco: "Bloco A",
    apartamento: "A231",
    andar: "",
    cota: "07",
    fracao: "1/52",
    localizacao: "BAHIA",

    empresa: "WAM",
    razaoSocial: "SPE PORTO SEGURO 02 EMPREENDIMENTOS IMOBILIÁRIOS S.A.",
    cnpj: "22.059.167/0001-60",

    valorPago: 7650.00,
    valorTotal: 62663.17,
    corretagem: 7650.00,
    sinal: 0,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 765.00, forma: "Cartão de crédito Cielo (intermediação)", vencimento: "2026-08-13" },
      { tipo: "Entrada", qtd: 10, valor: 688.50, forma: "Crédito recorrente (intermediação)", vencimento: "" },
      { tipo: "Cota", qtd: 5, valor: 50.00, forma: "Boleto", vencimento: "2026-08-15" },
      { tipo: "Cota", qtd: 96, valor: 650.14, forma: "Boleto", vencimento: "2027-01-20" }
    ],
    formaPagamentoEntrada: "Cartão de crédito Cielo (1x 765,00) + 10x crédito recorrente",
    dataAssinatura: "2026-08-13",
    telefone: "(21) 96450-5041",
    email: "victorsff82@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/303122-victor-ondas-a231-cota-07--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 7.650,00 — intermediação inteira (WAM Comercialização S.A.). Recebida à vista pela operadora: 1x 765,00 no cartão de crédito Cielo + 10x 688,50 em crédito recorrente do mesmo cartão. Cartão = valor cheio.\nDEVOLUÇÃO: Estorno no Cartão — pagamento principal foi no cartão de crédito Cielo; o restante é crédito recorrente do mesmo cartão. Os R$ 7.650,00 voltam pelo cartão.\nDo preço da cota (R$ 62.663,17) não pagou nada ainda — boleto só começa em 15/08/2026 (5x 50,00 + 96x 650,14). Contrato recém-assinado.\nUnião estável, cônjuge VIVIANNE DOS SANTOS ROSAS assinou — o distrato vai com duas assinaturas.\nMulta em caso de distrato (cláusula 5): retém a intermediação inteira + 50% do preço da cota reajustado.\nUnidade: Bloco A, A231, Cota 07 — 2 semanas de uso por ano. Empreendimento em Porto Seguro/BA (matrícula 38.236). Fração: adotado 1/52.\nVendedora/proprietária: SPE PORTO SEGURO 02 EMPREENDIMENTOS IMOBILIÁRIOS S.A., CNPJ 22.059.167/0001-60.\nContrato sem data explícita (GSign, data no quadro-resumo em branco); registrado como 13/08/2026. Contato: (21) 96450-5041 · victorsff82@gmail.com · cônjuge (21) 96589-1702 · viviannerosas76@gmail.com."
  },

  /* ---------- 47 — GAV — GGR-BLOCO B3-203-08 — GRAN GARDEN RESORT ---------- */
  {
    id: "ggr-marluce-monteiro-b3-203-08",
    nome: "MARLUCE MONTEIRO SILVA NOVAES",
    cpf: "534.855.305-06",
    rg: "0268664714 SSP BA",
    nacionalidade: "brasileiro(a)",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco B3",
    apartamento: "203",
    andar: "2",
    cota: "08",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA.",
    cnpj: "50.094.155/0001-02",

    valorPago: 4490.00,
    valorTotal: 75972.62,
    corretagem: 4490.00,
    sinal: 3798.62,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 4490.00, forma: "PIX", vencimento: "2026-01-13" },
      { tipo: "Sinal", qtd: 5, valor: 759.72, forma: "", vencimento: "2026-02-15" },
      { tipo: "Saldo", qtd: 91, valor: 743.78, forma: "", vencimento: "2026-07-15" }
    ],
    formaPagamentoEntrada: "PIX (1x 4.490,00)",
    dataAssinatura: "2026-01-13",
    telefone: "(73) 98846-0914",
    email: "marlams68@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/ggr-marluce-monteiro-b3-203-08--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 4.490,00 — corretagem via PIX, pagamento confirmado (doc RESV0820580093). Forma: Reembolso (PIX → transferência).\nSINAL DE NEGÓCIO: R$ 3.798,62 em 5x R$ 759,72 (1ª em 15/02/2026). Todas as parcelas já venceram. Se foram pagas, valor pago sobe pra R$ 8.288,62 — AGUARDANDO CONFIRMAÇÃO.\nSaldo da cota (R$ 67.684,00 em 91x R$ 743,78, 1ª em 15/07/2026) — provavelmente nada pago.\nEstado civil: união estável, mas cônjuge/companheiro(a) NÃO informado no contrato — nenhum campo preenchido. Conferir se precisa assinar o distrato.\nEmpreendimento novo na base: GRAN GARDEN RESORT, Gramado/RS. Vendedora: GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA., CNPJ 50.094.155/0001-02.\nAssinatura presencial D4Sign em 13/01/2026, 14:43. Contato: (73) 98846-0914 · marlams68@hotmail.com."
  },

  /* ---------- 48 — GAV — PYRENÉUS RESIDENCE, Bloco C / 0039 / Cota 14 ---------- */
  {
    id: "pyreneus-carolina-tatarin-c-0039-14",
    nome: "CAROLINA DE SOUZA TATARIN KNAUT",
    cpf: "093.613.069-52",
    rg: "",
    nacionalidade: "brasileira",
    estadoCivil: "",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PYRENÉUS RESIDENCE",
    bloco: "Bloco C",
    apartamento: "0039",
    andar: "",
    cota: "14",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "GAV",
    razaoSocial: "",
    cnpj: "",

    valorPago: 3990.00,
    valorTotal: 67380.52,
    corretagem: 3990.00,
    sinal: 3369.03,
    parcelas: [
      { tipo: "Entrada", qtd: 1, valor: 1125.00, forma: "PIX", vencimento: "2026-04-03" },
      { tipo: "Entrada", qtd: 4, valor: 716.25, forma: "Boleto", vencimento: "2026-05-03" },
      { tipo: "Sinal", qtd: 4, valor: 673.81, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Sinal", qtd: 1, valor: 673.79, forma: "Boleto", vencimento: "2027-01-15" },
      { tipo: "Saldo", qtd: 75, valor: 800.29, forma: "Boleto", vencimento: "2027-02-15" }
    ],
    formaPagamentoEntrada: "PIX (1x 1.125,00) + 4x boleto (716,25)",
    dataAssinatura: "2026-04-03",
    telefone: "(48) 98825-0990",
    email: "carolinatatarin@gmail.com",
    arquivos: [
      { titulo: "Ficha de Negociação + Termo", arquivo: "contratos-pdf/pyreneus-carolina-tatarin-c-0039-14--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990,00 — entrada inteira (1x 1.125,00 PIX + 4x 716,25 boleto). O PIX foi pago no ato (03/04/2026). Os 4 boletos da entrada venceram entre mai–ago/2026 (todos já vencidos em 20/08/2026).\nDEVOLUÇÃO: Reembolso por transferência — instrumento principal PIX.\nSINAL: R$ 3.369,03 em 5x boleto (set/2026 – jan/2027) — NENHUMA parcela venceu ainda. Não entra no valor pago.\nSaldo da cota (R$ 60.021,75 em 75x R$ 800,29, 1ª em 15/02/2027) — nada pago.\nDADOS INCOMPLETOS: cadastrada a partir da Ficha de Negociação (Flow/GAV). Faltam RG, estado civil, cônjuge, razão social e CNPJ da vendedora — preencher quando tiver o contrato de compra e venda.\nConsultora: Andressa Hayane Souza da Silva. Sala de venda: Pyrenéus Hotel.\nContato: (48) 98825-0990 · carolinatatarin@gmail.com."
  },

  /* ---------- 49 — WAM — 310795 PRAIAS DO LAGO ECO RESORT, Bloco M / 401 / Cota 04 ---------- */
  {
    id: "310795-monica-praias-m401-cota-04",
    nome: "MONICA CRISTINA GIMENEZ TAVARES DO PRADO",
    cpf: "306.705.398-21",
    rg: "308558388 SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "Solteiro(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "Bloco M",
    apartamento: "401",
    andar: "",
    cota: "04",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 528.00,
    valorTotal: 46446.75,
    corretagem: 5280.00,
    sinal: 0,
    parcelas: [
      { tipo: "Intermediação", qtd: 1, valor: 528.00, forma: "Depósito/Transferência", vencimento: "2026-08-15" },
      { tipo: "Intermediação", qtd: 5, valor: 950.40, forma: "Boleto (W Palmerston)", vencimento: "" },
      { tipo: "Cota", qtd: 4, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota", qtd: 88, valor: 525.53, forma: "Boleto", vencimento: "2027-01-15" }
    ],
    formaPagamentoEntrada: "Depósito/Transferência (1x 528,00) + 5x boleto (950,40)",
    dataAssinatura: "2026-08-15",
    telefone: "(11) 97338-4962",
    email: "mogimenez@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/310795-monica-praias-m401-cota-04--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 528,00 — 1x depósito/transferência eletrônica (intermediação).\nDEVOLUÇÃO: Reembolso por transferência — instrumento principal depósito/transferência.\nDo preço da cota (R$ 46.446,75) nada pago — boleto começa em 15/09/2026 (4x 50,00) e 15/01/2027 (88x 525,53).\nContrato assinado em Caldas Novas em 15/08/2026 — PRAZO DE 7 DIAS VENCE HOJE 22/08/2026.\nSemanas de uso: 3 por ano, fração padronizada 1/52.\nGSign ID: 0YTAYN6V3E-XZZ243V-A3UFJ4QD8BDSJS-0TB3V.\nVendedora: NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A, CNPJ 19.829.219/0001-26. Intermediadora: WAM COMERCIALIZAÇÃO S.A., CNPJ 17.919.649/0001-03.\nInclui Passaporte Náutico Praia Clube (nº 06-M401/04, prazo 5 anos).\nContato: (11) 97338-4962 · mogimenez@hotmail.com. Endereço: Rua do Rosário 373, Vila São Paulo, Mogi das Cruzes/SP.\nPDF do contrato completo armazenado em 22/08/2026."
  },

  /* ---------- 50 — GAV — GHR GRAN HAUS RESORT, Bloco 7 / 106 / Cota 40 ---------- */
  {
    id: "ghr-elisa-spolaricki-bloco7-106-cota-40",
    nome: "ELISA SIMOES FILLETI SPOLARICKI",
    cpf: "256.996.338-04",
    rg: "25699633804 SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "WILLIAN SPOLARICKI", cpf: "254.260.718-45", rg: "25426071845 SSP/SP", email: "spolarick@gmail.com" },

    empreendimento: "GRAN HAUS RESORT",
    bloco: "Bloco 7",
    apartamento: "106",
    andar: "0",
    cota: "40",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO 4 EMPREENDIMENTOS IMOBILIARIOS SPE LTDA",
    cnpj: "62.986.874/0001-17",

    valorPago: 3990.00,
    valorTotal: 37490.05,
    corretagem: 3990.00,
    sinal: 1874.50,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 3990.00, forma: "Cartão de Débito MASTER (****3900)", vencimento: "2026-08-03" },
      { tipo: "Sinal", qtd: 3, valor: 624.83, forma: "Boleto", vencimento: "2026-09-05" },
      { tipo: "Saldo", qtd: 55, valor: 575.01, forma: "Boleto", vencimento: "2026-12-05" }
    ],
    formaPagamentoEntrada: "Cartão de Débito",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-03",
    telefone: "(19) 99355-4992",
    email: "e.spolaricki@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/ghr-elisa-spolaricki-bloco7-106-cota-40--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990,00 — corretagem paga via cartão de débito MASTER (****3900, CV 21960854, 03/08/2026 12h20, via Rede/Itaú).\n" +
      "DEVOLUÇÃO: Estorno Cartão (corrigido manualmente — débito neste caso será estornado).\n" +
      "Sinal R$ 1.874,50 (3x R$ 624,83, 1ª em 05/09/2026) — NENHUMA parcela venceu.\n" +
      "Saldo R$ 31.625,55 (55x R$ 575,01, 1ª em 05/12/2026) — nada pago.\n" +
      "Contrato assinado em Ipojuca/PE em 03/08/2026 — prazo de 7 dias EXPIRADO (venceu 10/08/2026).\n" +
      "Profissão: Fonoaudiólogo(a). Cônjuge: Willian Spolaricki, Encarregado de Manutenção, tel (19) 98193-7375.\n" +
      "Consultor: Vicente Alves de Lima.\n" +
      "Endereço: Rua Santa Catarina, 269 – Jd. Santa Cecilia – Santa Bárbara D'Oeste/SP – CEP 13451-068.\n" +
      "ZapSign nº 6a3ea9af-4ad2-40af-802d-011dc127e58d."
  },

  /* ---------- 51 — GAV — JLR JERIQUIÁ LAGOA RESORT, Bloco 02 / 117 / Cota 03 ---------- */
  {
    id: "jlr-elisa-spolaricki-bloco02-117-cota-03",
    nome: "ELISA SIMOES FILLETI SPOLARICKI",
    cpf: "256.996.338-04",
    rg: "25699633804 SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "WILLIAN SPOLARICKI", cpf: "254.260.718-45", rg: "25426071845 SSP/SP", email: "spolarick@gmail.com" },

    empreendimento: "JERIQUIÁ LAGOA RESORT",
    bloco: "Bloco 02",
    apartamento: "117",
    andar: "1",
    cota: "03",
    fracao: "1/52",
    localizacao: "CEARÁ",

    empresa: "GAV",
    razaoSocial: "JERI 1 EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "33.578.977/0001-40",

    valorPago: 3990.00,
    valorTotal: 54805.49,
    corretagem: 3990.00,
    sinal: 2740.29,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 3990.00, forma: "PIX", vencimento: "2026-08-03" },
      { tipo: "Sinal", qtd: 4, valor: 685.07, forma: "Boleto", vencimento: "2026-09-05" },
      { tipo: "Saldo", qtd: 80, valor: 600.94, forma: "Boleto", vencimento: "2027-01-05" }
    ],
    formaPagamentoEntrada: "PIX",
    dataAssinatura: "2026-08-03",
    telefone: "(19) 99355-4992",
    email: "e.spolaricki@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/jlr-elisa-spolaricki-bloco02-117-cota-03--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990,00 — corretagem paga via PIX (ID RESN923976009178677063VYRP1H318EFFD, 03/08/2026 12h49, JERI1 BEACH/Itaú).\n" +
      "DEVOLUÇÃO: Reembolso por transferência — instrumento principal PIX.\n" +
      "Sinal R$ 2.740,29 (4x R$ 685,07, 1ª em 05/09/2026) — NENHUMA parcela venceu.\n" +
      "Saldo R$ 48.075,20 (80x R$ 600,94, 1ª em 05/01/2027) — nada pago.\n" +
      "Contrato assinado em Ipojuca/PE em 03/08/2026 — prazo de 7 dias EXPIRADO (venceu 10/08/2026).\n" +
      "Contrato indica 2 semanas por ano, fração padronizada 1/52.\n" +
      "Profissão: Fonoaudiólogo(a). Cônjuge: Willian Spolaricki, Encarregado de Manutenção, tel (19) 98193-7375.\n" +
      "Consultor: Vicente Alves de Lima.\n" +
      "Endereço: Rua Santa Catarina, 269 – Jd. Santa Cecilia – Santa Bárbara D'Oeste/SP – CEP 13451-068.\n" +
      "ZapSign nº 5e46d7a9-75f1-405b-bd28-086faa25df3b."
  },

  /* ---------- 52 — GAV — GGR GRAN GARDEN RESORT, Bloco A2 / 104 / Cota 51 ---------- */
  {
    id: "ggr-ediala-freitas-bloco-a2-104-cota-51",
    nome: "EDIALA CRISTINA PARENTE DE AGUIAR FREITAS",
    cpf: "025.738.133-39",
    rg: "2001010127169 SSPDS/CE",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco A2",
    apartamento: "104",
    andar: "1",
    cota: "51",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 1990.00,
    valorTotal: 75784.88,
    corretagem: 4490.00,
    sinal: 3789.26,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1990.00, forma: "Cartão de Crédito MASTER à vista (****9261)", vencimento: "2026-08-08" },
      { tipo: "Corretagem", qtd: 4, valor: 625.00, forma: "Boleto", vencimento: "2026-10-08" },
      { tipo: "Sinal", qtd: 5, valor: 757.85, forma: "Boleto", vencimento: "2027-02-10" },
      { tipo: "Saldo", qtd: 91, valor: 741.82, forma: "Boleto", vencimento: "2027-07-10" }
    ],
    formaPagamentoEntrada: "Cartão de Crédito (1x 1.990,00) + 4x boleto (625,00)",
    dataAssinatura: "2026-08-08",
    telefone: "(85) 98895-9053",
    email: "edialafreitas@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/ggr-ediala-freitas-bloco-a2-104-cota-51--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.990,00 — corretagem parcial: 1x R$ 1.990,00 cartão de crédito MASTER à vista (****9261, CV 24318692, 08/08/2026 11h57, via Rede/Itaú). Os 4 boletos restantes da corretagem (4x R$ 625,00 = R$ 2.500,00, 1ª em 08/10/2026) NÃO venceram ainda.\n" +
      "DEVOLUÇÃO: Estorno Cartão — instrumento principal cartão de crédito.\n" +
      "Sinal R$ 3.789,26 (5x R$ 757,85, 1ª em 10/02/2027) — nada pago.\n" +
      "Saldo R$ 67.505,62 (91x R$ 741,82, 1ª em 10/07/2027) — nada pago.\n" +
      "Contrato assinado em Gramado/RS em 08/08/2026 — prazo de 7 dias EXPIRADO (venceu 15/08/2026).\n" +
      "Casada, mas cônjuge 'Não informado' em todos os campos — NÃO assinou (ZapSign tem 4 assinaturas, sem cônjuge).\n" +
      "Profissão: Empresário(a). Nascimento: 24/07/1987.\n" +
      "Consultor: Matheus Henrique Gomes Castro.\n" +
      "Endereço: Rua Raimundo Ribeiro, 52, Casa – Autran Nunes – Fortaleza/CE – CEP 60526-500.\n" +
      "ZapSign nº 394666c8-042d-4a4c-8b24-c4e7b53d760f."
  },

  /* ---------- 53 — GAV — OMR OIKOS MARAGOGI RESORT, Bloco 01 / UH 219 / Cota 26 ---------- */
  {
    id: "omr-augusto-silva-bloco01-uh219-cota-26",
    nome: "AUGUSTO CARLOS DA SILVA JUNIOR",
    cpf: "704.530.134-06",
    rg: "27261310 SDS/PE",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "OIKOS MARAGOGI RESORT",
    bloco: "Bloco 01",
    apartamento: "UH 219",
    andar: "2",
    cota: "26",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV MARAGOGI EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "39.757.445/0001-56",

    valorPago: 1000.00,
    valorTotal: 60220.55,
    corretagem: 3990.00,
    sinal: 3011.03,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "PIX", vencimento: "2026-08-16" },
      { tipo: "Corretagem", qtd: 4, valor: 747.50, forma: "Boleto", vencimento: "2026-09-16" },
      { tipo: "Sinal", qtd: 4, valor: 752.76, forma: "Boleto", vencimento: "2027-01-10" },
      { tipo: "Saldo", qtd: 68, valor: 782.64, forma: "Boleto", vencimento: "2027-05-05" }
    ],
    formaPagamentoEntrada: "PIX (1x 1.000,00) + 4x boleto (747,50)",
    dataAssinatura: "2026-08-16",
    telefone: "(81) 97906-8876",
    email: "augusto.carlos001996@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/omr-augusto-silva-bloco01-uh219-cota-26--contrato.pdf" }
    ],
    pix: "704.530.134-06",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 — corretagem parcial: 1x R$ 1.000,00 PIX (ID RESN963523009376117I4E8535C0444F6E6, 16/08/2026 12h05, GAV Maragogi/Itaú). Os 4 boletos restantes da corretagem (4x R$ 747,50 = R$ 2.990,00, 1ª em 16/09/2026) NÃO venceram.\n" +
      "DEVOLUÇÃO: Reembolso por transferência — instrumento principal PIX. Chave PIX para reembolso: 704.530.134-06 (CPF). Distrato assinado em 21/08/2026.\n" +
      "Sinal R$ 3.011,03 (4x R$ 752,76, 1ª em 10/01/2027) — nada pago.\n" +
      "Saldo R$ 53.219,52 (68x R$ 782,64, 1ª em 05/05/2027) — nada pago.\n" +
      "Contrato assinado em Ipojuca/PE em 16/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 23/08/2026 — faltam 2 dias!).\n" +
      "Contrato indica 2 semanas por ano, fração padronizada 1/52.\n" +
      "União estável, mas companheiro(a) 'Não informado' — NÃO assinou (ZapSign tem 4 assinaturas, sem cônjuge).\n" +
      "Profissão: Militar Corpo de Bombeiros. Nascimento: 30/11/1996.\n" +
      "Consultor: Victor Camara Paiva e Silva.\n" +
      "Endereço: Rua Conselheiro Barros Barreto, 457 – Porto da Madeira – Recife/PE – CEP 52130-170.\n" +
      "ZapSign nº 3ef81433-c94a-490f-b806-7c0a45119169."
  },

  // ── ficha 54 ── Katherine Costa Bittencourt — Oikos Maragogi Resort
  {
    id: "katherine-omr-213-10",
    nome: "KATHERINE COSTA BITTENCOURT",
    cpf: "846.809.380-72",
    rg: "7085808504 SJS II RS",
    nacionalidade: "brasileira",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "OIKOS MARAGOGI RESORT",
    bloco: "Bloco 01",
    apartamento: "UH 213",
    andar: "2",
    cota: "10",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV MARAGOGI EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "39.757.445/0001-56",

    valorPago: 1600.00,
    valorTotal: 60220.55,
    corretagem: 3990.00,
    sinal: 3011.03,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1600.00, forma: "PIX", vencimento: "2026-08-18" },
      { tipo: "Corretagem", qtd: 5, valor: 478.00, forma: "Boleto", vencimento: "2026-09-18" },
      { tipo: "Sinal", qtd: 4, valor: 752.76, forma: "Boleto", vencimento: "2027-02-10" },
      { tipo: "Saldo", qtd: 68, valor: 782.64, forma: "Boleto", vencimento: "2027-06-10" }
    ],
    formaPagamentoEntrada: "PIX (1x 1.600,00) + 5x boleto (478,00)",
    dataAssinatura: "2026-08-18",
    telefone: "(51) 98108-3308",
    email: "katherinecbittencourt@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/katherine-omr-213-10--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.600,00 — corretagem parcial: 1x R$ 1.600,00 PIX (Nº RESV0981270094 845425JQ6ZTHJ2B 3F149D, 18/08/2026). Os 5 boletos restantes (5x R$ 478,00 = R$ 2.390,00, 1ª em 18/09/2026) NÃO venceram.\n" +
      "ATENÇÃO: o Nº Documento do PIX é idêntico nos 3 contratos desta cliente (OMR + 2x ABR) — pode ser 1 PIX de R$ 1.600,00 rateado ou 3 PIX de R$ 1.600,00 com mesma referência. Conferir.\n" +
      "DEVOLUÇÃO: Reembolso por transferência — instrumento principal PIX.\n" +
      "Sinal R$ 3.011,03 (4x R$ 752,76, 1ª em 10/02/2027) — nada pago.\n" +
      "Saldo R$ 53.219,52 (68x R$ 782,64, 1ª em 10/06/2027) — nada pago.\n" +
      "Contrato assinado em Marechal Deodoro/AL em 18/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 25/08/2026).\n" +
      "Contrato indica 2 semanas por ano, fração padronizada 1/52.\n" +
      "União estável, cônjuge não informado.\n" +
      "Profissão: Enfermeiro(a). Nascimento: 21/08/1994.\n" +
      "Endereço: Rua Carlos Estevao, 740 – Jardim Leopoldina – Porto Alegre/RS – CEP 91240-000.\n" +
      "ZapSign nº c336ddda-f11e-494f-83a5-b0c43e7951d8."
  },

  // ── ficha 55 ── Katherine Costa Bittencourt — Areya Barra Resort (Apto 435 / Cota 07)
  {
    id: "katherine-abr-435-07",
    nome: "KATHERINE COSTA BITTENCOURT",
    cpf: "846.809.380-72",
    rg: "7085808504 SJS II RS",
    nacionalidade: "brasileira",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "435",
    andar: "4",
    cota: "07",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1600.00,
    valorTotal: 56189.30,
    corretagem: 3990.00,
    sinal: 2809.48,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1600.00, forma: "PIX", vencimento: "2026-08-18" },
      { tipo: "Corretagem", qtd: 5, valor: 478.00, forma: "Boleto", vencimento: "2026-09-18" },
      { tipo: "Sinal", qtd: 4, valor: 702.37, forma: "Boleto", vencimento: "2027-02-10" },
      { tipo: "Saldo", qtd: 74, valor: 667.43, forma: "Boleto", vencimento: "2027-06-10" }
    ],
    formaPagamentoEntrada: "PIX (1x 1.600,00) + 5x boleto (478,00)",
    dataAssinatura: "2026-08-18",
    telefone: "(51) 98108-3308",
    email: "katherinecbittencourt@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/katherine-abr-435-07--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.600,00 — corretagem parcial: 1x R$ 1.600,00 PIX (Nº RESV0981270094 845425JQ6ZTHJ2B 3F149D, 18/08/2026). Os 5 boletos restantes (5x R$ 478,00 = R$ 2.390,00, 1ª em 18/09/2026) NÃO venceram.\n" +
      "ATENÇÃO: o Nº Documento do PIX é idêntico nos 3 contratos desta cliente (OMR + 2x ABR) — pode ser 1 PIX de R$ 1.600,00 rateado ou 3 PIX de R$ 1.600,00 com mesma referência. Conferir.\n" +
      "DEVOLUÇÃO: Reembolso por transferência — instrumento principal PIX.\n" +
      "Sinal R$ 2.809,48 (4x R$ 702,37, 1ª em 10/02/2027) — nada pago.\n" +
      "Saldo R$ 49.389,82 (74x R$ 667,43, 1ª em 10/06/2027) — nada pago.\n" +
      "Contrato assinado em Marechal Deodoro/AL em 18/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 25/08/2026).\n" +
      "Contrato indica 2 semanas por ano, fração padronizada 1/52.\n" +
      "União estável, cônjuge não informado.\n" +
      "Profissão: Enfermeiro(a). Nascimento: 21/08/1994.\n" +
      "Endereço: Rua Carlos Estevao, 740 – Jardim Leopoldina – Porto Alegre/RS – CEP 91240-000.\n" +
      "ZapSign nº af22ffed-bacb-4058-a1ab-bc4493d8ac92."
  },

  // ── ficha 56 ── Katherine Costa Bittencourt — Areya Barra Resort (Apto 441 / Cota 16)
  {
    id: "katherine-abr-441-16",
    nome: "KATHERINE COSTA BITTENCOURT",
    cpf: "846.809.380-72",
    rg: "7085808504 SJS II RS",
    nacionalidade: "brasileira",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "441",
    andar: "4",
    cota: "16",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1600.00,
    valorTotal: 56189.30,
    corretagem: 3990.00,
    sinal: 2809.48,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1600.00, forma: "PIX", vencimento: "2026-08-18" },
      { tipo: "Corretagem", qtd: 5, valor: 478.00, forma: "Boleto", vencimento: "2026-09-18" },
      { tipo: "Sinal", qtd: 4, valor: 702.37, forma: "Boleto", vencimento: "2027-02-10" },
      { tipo: "Saldo", qtd: 74, valor: 667.43, forma: "Boleto", vencimento: "2027-06-10" }
    ],
    formaPagamentoEntrada: "PIX (1x 1.600,00) + 5x boleto (478,00)",
    dataAssinatura: "2026-08-18",
    telefone: "(51) 98108-3308",
    email: "katherinecbittencourt@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/katherine-abr-441-16--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.600,00 — corretagem parcial: 1x R$ 1.600,00 PIX (Nº RESV0981270094 845425JQ6ZTHJ2B 3F149D, 18/08/2026). Os 5 boletos restantes (5x R$ 478,00 = R$ 2.390,00, 1ª em 18/09/2026) NÃO venceram.\n" +
      "ATENÇÃO: o Nº Documento do PIX é idêntico nos 3 contratos desta cliente (OMR + 2x ABR) — pode ser 1 PIX de R$ 1.600,00 rateado ou 3 PIX de R$ 1.600,00 com mesma referência. Conferir.\n" +
      "DEVOLUÇÃO: Reembolso por transferência — instrumento principal PIX.\n" +
      "Sinal R$ 2.809,48 (4x R$ 702,37, 1ª em 10/02/2027) — nada pago.\n" +
      "Saldo R$ 49.389,82 (74x R$ 667,43, 1ª em 10/06/2027) — nada pago.\n" +
      "Contrato assinado em Marechal Deodoro/AL em 18/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 25/08/2026).\n" +
      "Contrato indica 2 semanas por ano, fração padronizada 1/52.\n" +
      "União estável, cônjuge não informado.\n" +
      "Profissão: Enfermeiro(a). Nascimento: 21/08/1994.\n" +
      "Endereço: Rua Carlos Estevao, 740 – Jardim Leopoldina – Porto Alegre/RS – CEP 91240-000.\n" +
      "ZapSign nº c729f196-3910-419d-858f-03856bd8e221."
  },

  // ── ficha 57 ── Karla Aparecida Aguiar Alves — Areya Barra Resort (Apto 427 / Cota 25)
  {
    id: "karla-abr-427-25",
    nome: "KARLA APARECIDA AGUIAR ALVES",
    cpf: "066.390.316-55",
    rg: "MG12502790 SSP MG",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "427",
    andar: "4",
    cota: "25",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1330.00,
    valorTotal: 56189.30,
    corretagem: 3990.00,
    sinal: 2809.48,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1330.00, forma: "PIX", vencimento: "2026-08-17" },
      { tipo: "Corretagem", qtd: 2, valor: 1330.00, forma: "Boleto", vencimento: "2026-09-10" },
      { tipo: "Sinal", qtd: 4, valor: 702.37, forma: "Boleto", vencimento: "2026-11-10" },
      { tipo: "Saldo", qtd: 74, valor: 667.43, forma: "Boleto", vencimento: "2027-03-10" }
    ],
    formaPagamentoEntrada: "PIX (1x 1.330,00) + 2x boleto (1.330,00)",
    dataAssinatura: "2026-08-17",
    telefone: "(27) 99838-0810",
    email: "karlaaparecida346@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/karla-abr-427-25--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.330,00 — corretagem parcial: 1x R$ 1.330,00 PIX (ID RESV112644009484542SUYC001B7D212029, 17/08/2026 14h51, GAV Barra de SA/Itaú, CV 183089010, Aute 576597). Comprovante Laranjinha Itaú no PDF. Os 2 boletos restantes (2x R$ 1.330,00 = R$ 2.660,00, 1ª em 10/09/2026) NÃO venceram.\n" +
      "DEVOLUÇÃO: Reembolso por transferência — instrumento principal PIX.\n" +
      "Sinal R$ 2.809,48 (4x R$ 702,37, 1ª em 10/11/2026) — nada pago.\n" +
      "Saldo R$ 49.389,82 (74x R$ 667,43, 1ª em 10/03/2027) — nada pago.\n" +
      "Contrato assinado em Ipojuca/PE em 17/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 24/08/2026).\n" +
      "Contrato indica 2 semanas por ano, fração padronizada 1/52.\n" +
      "Casada, cônjuge não informado no contrato (não assinou).\n" +
      "Profissão: Do lar. Nascimento: 13/11/1981.\n" +
      "Consultor: Elias Moises da Silva Junior.\n" +
      "Endereço: Avenida Oceanica, 1694, Apto 305 – Praia do Morro – Guarapari/ES – CEP 29216-080.\n" +
      "ZapSign nº 42d0be19-0575-4703-8e29-c7c1c6c99c54."
  },

  // ── ficha 58 ── Hyan Lucas Carvalho Rodrigues — GAV Vacation Club (Pontos)
  {
    id: "gavts-hyan-rodrigues-pontos-005354",
    nome: "HYAN LUCAS CARVALHO RODRIGUES",
    cpf: "098.036.181-80",
    rg: "09803618180 SEJUSPMS",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "GIOVANNA PEREIRA DE ALMEIDA", cpf: "056.238.741-26", rg: "2023016 SEJUSPMS", email: "pgiovannabiomed@gmail.com" },

    empreendimento: "GAV VACATION CLUB (PONTOS)",
    bloco: "Contrato 63232",
    apartamento: "100.000 pontos",
    andar: "",
    cota: "005354",
    fracao: "100.000 pontos / 5 anos",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV TS ADMINISTRAÇÃO UNIPESSOAL LTDA",
    cnpj: "47.008.570/0001-91",

    valorPago: 215.00,
    valorTotal: 12900.00,
    corretagem: 0,
    sinal: 215.00,
    parcelas: [
      { tipo: "Sinal", qtd: 1, valor: 215.00, forma: "Cartão de Débito", vencimento: "2026-08-24" },
      { tipo: "Saldo", qtd: 59, valor: 215.00, forma: "Boleto", vencimento: "2026-09-10" }
    ],
    formaPagamentoEntrada: "Cartão de Débito",
    dataAssinatura: "2026-08-21",
    telefone: "(67) 99110-0541",
    email: "lhyan0605@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/gavts-hyan-rodrigues-pontos-005354--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO DE PONTOS — diferente dos contratos de multipropriedade (fração). É uma cessão de direito de uso de unidade hoteleira via sistema de tempo compartilhado por pontos (GAV Vacation Club).\n" +
      "VALOR PAGO = R$ 215,00 — sinal via cartão de débito (2 DEB, doc M88210, vencimento 24/08/2026).\n" +
      "DEVOLUÇÃO: Reembolso por transferência — débito nunca é estorno.\n" +
      "Saldo R$ 12.685,00 (59x R$ 215,00 boleto, 1ª em 10/09/2026) — nada pago.\n" +
      "Contrato assinado em Salinópolis/PA em 21/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 28/08/2026).\n" +
      "Escritório de vendas: Praia do Francês.\n" +
      "Cônjuge: Giovanna Pereira de Almeida, CPF 056.238.741-26, Secretária, tel (67) 99284-4199, email pgiovannabiomed@gmail.com. Ambos assinaram.\n" +
      "Profissão: Autônomo. Nascimento: 14/07/2006.\n" +
      "Consultora: Dina Santos de Oliveira. Testemunhas: Gabriele Cristine Chaves de Alcântara, João Pedro Lyra dos Santos.\n" +
      "Endereço: Rua Francisco Amaral Militao, 965, Casa – Jardim Monumento – Campo Grande/MS – CEP 79071-240.\n" +
      "ZapSign nº 29bf7fb7-97d7-400c-837b-4fd06315ec32."
  },

  /* ---------- 59 — GAV — 355486 GRAN VALLEY RESORT, Bloco A / A 210 / Cota 14 ---------- */
  {
    id: "355486-karla-bianca-gvr-a210-cota-14",
    nome: "KARLA BIANCA SANTOS DE LIMA LTDA",
    cpf: "30.767.852/0001-70",
    rg: "",
    nacionalidade: "",
    estadoCivil: "",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN VALLEY RESORT",
    bloco: "Bloco A",
    apartamento: "A 210",
    andar: "-1",
    cota: "14",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.042.537/0001-52",

    valorPago: 4490.00,
    valorTotal: 72141.07,
    corretagem: 4490.00,
    sinal: 3607.07,
    parcelas: [
      { tipo: "Corretagem", qtd: 3, valor: 1496.67, forma: "Cartão Crédito Mastercard (parcelado)", vencimento: "2026-09-18" },
      { tipo: "Sinal", qtd: 4, valor: 901.77, forma: "Boleto/Recorrente", vencimento: "2026-12-10" },
      { tipo: "Saldo", qtd: 80, valor: 800.55, forma: "Boleto/Recorrente", vencimento: "2027-04-10" }
    ],
    formaPagamentoEntrada: "Cartão de Crédito Mastercard 3x 1.496,67 (corretagem) + sinal 4x 901,77 boleto",
    dataAssinatura: "2026-08-19",
    telefone: "(83) 99613-6747",
    email: "souzalimaconstrutora.1@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/355486-karla-bianca-gvr-a210-cota-14--contrato.pdf" },
      { titulo: "Carta Arrependimento", arquivo: "contratos-pdf/355486-karla-bianca-gvr-a210-cota-14--carta-arrependimento.pdf" }
    ],
    pix: "30767852000170",
    observacoes:
      "PESSOA JURÍDICA — KARLA BIANCA SANTOS DE LIMA LTDA (CNPJ 30.767.852/0001-70), nome fantasia Souza Lima Construções.\n" +
      "Sócia administradora: Karla Bianca Santos de Lima, CPF 095.301.454-11.\n" +
      "VALOR PAGO = R$ 4.490,00 — corretagem via cartão de crédito Mastercard final 4775, 3x R$ 1.496,67 parcelado estabelecimento, CV 42102620, em 18/08/2026 às 23h19.\n" +
      "DEVOLUÇÃO: Estorno Cartão — instrumento principal cartão de crédito.\n" +
      "Sinal R$ 3.607,07 (4x R$ 901,77, 1ª em 10/12/2026) — NÃO PAGO. Saldo R$ 64.044,00 (80x R$ 800,55, 1ª em 10/04/2027) — NÃO PAGO.\n" +
      "Contrato assinado em Gramado/RS em 19/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 26/08/2026).\n" +
      "ARREPENDIMENTO JÁ EXERCIDO — Carta de notificação extrajudicial datada 22/08/2026, assinada digitalmente via gov.br por Karla Bianca Santos de Souza Lima em 22/08/2026 15:30:36.\n" +
      "Dados bancários: Sicredi (748), Ag 2201, CC 50023-6. Chave PIX: 30767852000170 (CNPJ).\n" +
      "Período de utilização: 2 semanas por ano. Tipo: Cama Queen + Sofá-Cama, capacidade 4 pessoas.\n" +
      "Endereço PJ: Rua Otacílio de Albuquerque, 22, Sala 01, Torre, João Pessoa/PB, CEP 58.040-720.\n" +
      "ZapSign nº 508c9b91-1c9a-4d8f-a14c-6956676ec8dd. Contrato nº 355486."
  },

  /* ---------- 60 — GAV — 356107 AREYA BARRA RESORT, Bloco 01 / 350 / Cota 30 ---------- */
  {
    id: "356107-leila-rosana-abr-bloco01-350-cota-30",
    nome: "LEILA ROSANA SILVA SANTOS",
    cpf: "024.597.615-97",
    rg: "30496306 SSP/SE",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "350",
    andar: "3",
    cota: "30",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1995.00,
    valorTotal: 29104.57,
    corretagem: 1995.00,
    sinal: 1455.25,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1995.00, forma: "PIX", vencimento: "2026-08-22" },
      { tipo: "Sinal", qtd: 4, valor: 363.81, forma: "Boleto/Recorrente", vencimento: "2026-10-10" },
      { tipo: "Saldo", qtd: 74, valor: 346.68, forma: "Boleto/Recorrente", vencimento: "2027-02-10" }
    ],
    formaPagamentoEntrada: "PIX R$ 1.995,00 (corretagem) + sinal 4x R$ 363,81 boleto",
    dataAssinatura: "2026-08-22",
    telefone: "(79) 99839-2523",
    email: "lheilinha_rosana@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/356107-leila-rosana-abr-bloco01-350-cota-30--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.995,00 — corretagem via PIX em 22/08/2026 às 13h03, CV 27041164.\n" +
      "ATENÇÃO: Comprovante PIX (Rede) mostra R$ 3.990,00 (mesma transação ID RESV0981270094845425HCXZJPYA666D1C8). Proposta indica corretagem R$ 1.995,00. Possível que o PIX de R$ 3.990 cubra 2 contratos — VERIFICAR.\n" +
      "DEVOLUÇÃO: Reembolso — instrumento principal PIX.\n" +
      "Sinal R$ 1.455,25 (4x R$ 363,81, 1ª em 10/10/2026) — NÃO PAGO. Saldo R$ 25.654,32 (74x R$ 346,68, 1ª em 10/02/2027) — NÃO PAGO.\n" +
      "Contrato assinado em Marechal Deodoro/AL em 22/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 29/08/2026).\n" +
      "Profissão: Enfermeiro(a). Nascimento: 30/04/1985. Cônjuge: não informado na proposta.\n" +
      "Consultora: Barbara Vitoria Conegundes de Souza.\n" +
      "Endereço: Rua Coronel Manoel Ramos dos Santos, 06, Farolandia, Aracaju/SE, CEP 49030-190.\n" +
      "ZapSign nº 9b8b45ec-d99a-43af-ad8b-e27c87a46b28. Contrato nº 356107."
  },

  /* ---------- 61 — WAM — 282059 TERRA NOVA ONDAS RESORT, Bloco A / 029 / Cota 13 ---------- */
  {
    id: "282059-walkiria-garcia-tnor-a-029-cota-13",
    nome: "WALKIRIA DA CUNHA GARCIA",
    cpf: "181.895.688-84",
    rg: "25146263 - SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "União Estável",
    conjuge: { nome: "RENAN DE LIMA ANDRADE", cpf: "381.626.038-16", rg: "475102320 - SSP/SP", email: "RENAN.PYD@gmail.com" },

    empreendimento: "TERRA NOVA ONDAS RESORT",
    bloco: "A",
    apartamento: "029",
    andar: "-1",
    cota: "13",
    fracao: "1/52",
    localizacao: "BAHIA",

    empresa: "WAM",
    razaoSocial: "W-30 EMPREENDIMENTOS IMOBILIÁRIOS LTDA",
    cnpj: "30.157.207/0001-35",

    valorPago: 3203.59,
    valorTotal: 40289.35,
    corretagem: 4372.00,
    sinal: 150.00,
    parcelas: [
      { tipo: "Cota (entrada)", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-04-15" },
      { tipo: "Cota (saldo)", qtd: 86, valor: 415.90, forma: "Boleto", vencimento: "2026-07-20" },
      { tipo: "Intermediação", qtd: 1, valor: 400.00, forma: "Depósito Bancário/Transferência Eletrônica", vencimento: "2026-03-05" },
      { tipo: "Intermediação", qtd: 11, valor: 361.09, forma: "Crédito Recorrente", vencimento: "2026-03-05" }
    ],
    formaPagamentoEntrada: "3x R$ 50,00 boleto (cota entrada) + 1x R$ 400,00 depósito + 11x R$ 361,09 crédito recorrente (intermediação)",
    dataAssinatura: "2026-03-05",
    telefone: "(11) 99626-3504",
    email: "WALKIRIA.GARCIA@GMAIL.COM",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/282059-walkiria-garcia-tnor-a-029-cota-13--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.203,59 (informado pelo cliente).\n" +
      "Valor anterior calculado era R$ 5.353,79 — corrigido em 26/08/2026.\n" +
      "DEVOLUÇÃO: Reembolso — instrumento principal boleto (cota).\n" +
      "Preço da cota (sem intermediação): R$ 35.917,35. Intermediação: R$ 4.372,00 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "86x R$ 415,90 boleto mensal (1ª em 20/07/2026) — saldo restante da cota.\n" +
      "Contrato assinado em Porto Seguro/BA em 05/03/2026 — FORA DO PRAZO de arrependimento.\n" +
      "Cônjuge anuente: Renan de Lima Andrade, CPF 381.626.038-16, cientista de informação.\n" +
      "Profissão: Enfermeiro(a). Nascimento: 09/05/1975. Cônjuge nasc: 12/06/1990.\n" +
      "Endereço: não informado no quadro-resumo.\n" +
      "Semanas de uso: 1 por ano. Habite-se previsto: 31/12/2027.\n" +
      "Matrícula nº 8.656, Cartório de Registro de Imóveis de Porto Seguro/BA.\n" +
      "GSign Documento ID: 5BDBK8C52R-JDHMXGO-PGEN0JKZ4TP2D6-1NGDQ. Contrato/Assinatura nº 282059."
  },

  /* ---------- 62 — WAM — 311477 PRAIAS DO LAGO ECO RESORT, Bloco D / 208 / Cota 21 ---------- */
  {
    id: "311477-everton-cosme-pdl-d-208-cota-21",
    nome: "EVERTON COSME PEREIRA",
    cpf: "723.658.461-49",
    rg: "1841763 - SSP/DF",
    nacionalidade: "brasileiro",
    estadoCivil: "Solteiro",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "D",
    apartamento: "208",
    andar: "-1",
    cota: "21",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 400.00,
    valorTotal: 39031.08,
    corretagem: 3960.00,
    sinal: 200.00,
    parcelas: [
      { tipo: "Cota (entrada)", qtd: 4, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota (saldo)", qtd: 84, valor: 415.13, forma: "Boleto", vencimento: "2027-01-20" },
      { tipo: "Intermediação", qtd: 1, valor: 400.00, forma: "Depósito Bancário/Transferência Eletrônica", vencimento: "2026-08-18" },
      { tipo: "Intermediação", qtd: 5, valor: 712.00, forma: "Boleto - Cobrança W Palmerston", vencimento: "2026-08-18" }
    ],
    formaPagamentoEntrada: "1x R$ 400,00 depósito/transferência (intermediação) + 4x R$ 50,00 boleto (cota entrada) + 5x R$ 712,00 boleto W Palmerston (intermediação)",
    dataAssinatura: "2026-08-18",
    telefone: "(61) 99192-5981",
    email: "akellycp@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/311477-everton-cosme-pdl-d-208-cota-21--contrato.pdf" },
      { titulo: "Notificação Arrependimento", arquivo: "contratos-pdf/311477-everton-cosme-pdl-d-208-cota-21--notificacao-arrependimento.pdf" }
    ],
    pix: "evertoncostabsb@gmail.com",
    observacoes:
      "VALOR PAGO = R$ 400,00 — 1x R$ 400,00 depósito bancário/transferência eletrônica (intermediação, na data do contrato).\n" +
      "DEVOLUÇÃO: Reembolso — instrumento principal depósito/transferência.\n" +
      "Preço da cota (sem intermediação): R$ 35.071,08. Intermediação: R$ 3.960,00 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Cota entrada: 4x R$ 50,00 boleto (1ª 15/09/2026) — NÃO PAGO. Cota saldo: 84x R$ 415,13 boleto (1ª 20/01/2027) — NÃO PAGO.\n" +
      "Intermediação restante: 5x R$ 712,00 boleto Cobrança W Palmerston — NÃO PAGO.\n" +
      "Contrato assinado em Caldas Novas/GO (Náutico Parque Aquático) em 18/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 25/08/2026).\n" +
      "ARREPENDIMENTO JÁ EXERCIDO — Notificação datada 22/08/2026, solicita cancelamento e devolução integral de R$ 400,00 via PIX.\n" +
      "Dados para devolução: PIX evertoncostabsb@gmail.com / Bradesco Ag 484, CC 22009-4, titular Everton Cosme Pereira.\n" +
      "ATENÇÃO: Notificação cita 'Contrato nº 31477' mas o arquivo do contrato indica 311477 — possível erro de digitação na notificação.\n" +
      "Semanas de uso: 2 por ano. Habite-se nº 2020001124 (20/11/2020). Não conheceu o empreendimento.\n" +
      "Profissão: Auxiliar de Farmácia de Manipulação. Nascimento: 29/11/1981.\n" +
      "Matrícula nº 29.684, Cartório de Registro de Imóveis de Caldas Novas/GO.\n" +
      "GSign Documento ID: J3YF9LELID-KH4QTP1-8595LNCJFB8UEU-ENQDV. Contrato nº 311477."
  },

  /* ---------- 63 — WAM — KAWANA RESIDENCE, Bloco 02 / 101 / Cota O/I (Amelia Sonia 1/3) ---------- */
  {
    id: "kawana-amelia-sonia-bloco02-101-cota-oi",
    nome: "AMELIA SONIA MADUREIRA",
    cpf: "421.923.156-00",
    rg: "MG6393230 - SSP/MG",
    nacionalidade: "brasileiro",
    estadoCivil: "Solteiro",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "KAWANA RESIDENCE",
    bloco: "Bloco 02",
    apartamento: "101",
    andar: "1",
    cota: "O/I",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "S.P.E. MIRANTE INVESTIMENTO IMOBILIÁRIOS S/A",
    cnpj: "18.622.215/0001-00",

    valorPago: 3350.00,
    valorTotal: 48174.92,
    corretagem: 3350.00,
    sinal: 150.00,
    parcelas: [
      { tipo: "Cota (entrada)", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota (saldo)", qtd: 84, valor: 531.84, forma: "Boleto", vencimento: "2026-12-15" },
      { tipo: "Intermediação", qtd: 1, valor: 3350.00, forma: "Elo Crédito", vencimento: "2026-08-17" }
    ],
    formaPagamentoEntrada: "1x R$ 3.350,00 Elo Crédito (intermediação) + 3x R$ 50,00 boleto (cota entrada)",
    dataAssinatura: "2026-08-17",
    telefone: "(31) 99918-0983",
    email: "Carolinemadureiramoreira@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/kawana-amelia-sonia-bloco02-101-cota-oi--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 1 DE 3 — mesma adquirente (Amelia Sonia Madureira) com 3 contratos Kawana Residence.\n" +
      "VALOR PAGO = R$ 3.350,00 — 1x R$ 3.350,00 Elo Crédito (intermediação, valor cheio).\n" +
      "DEVOLUÇÃO: Estorno Cartão — instrumento principal cartão Elo Crédito.\n" +
      "Preço da cota (sem intermediação): R$ 44.824,92. Intermediação: R$ 3.350,00 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Cota entrada: 3x R$ 50,00 boleto (1ª 15/09/2026) — NÃO PAGO. Cota saldo: 84x R$ 531,84 boleto (1ª 15/12/2026) — NÃO PAGO.\n" +
      "Contrato assinado em Caldas Novas/GO em 17/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 24/08/2026).\n" +
      "Ônus: Alienação Fiduciária R35-77.345 na matrícula 77.345.\n" +
      "Semanas de uso: 2 por ano. Habite-se previsto: 31/12/2027. Não conheceu o empreendimento.\n" +
      "Profissão: Gerente. Nascimento: 05/12/1958. Telefone 2: (31) 99700-0512.\n" +
      "ATENÇÃO: Nome no quadro-resumo = 'AMELIA', assinatura GSign = 'AMAELIA' — verificar grafia correta.\n" +
      "Matrícula nº 77.345, Cartório de Registro de Imóveis Leandro Félix, Caldas Novas/GO.\n" +
      "GSign Documento ID: MOOYNMWVFO-KUXI5XH-R5QQKP9ZWPQMJP-9FTBZ."
  },

  /* ---------- 64 — WAM — KAWANA RESIDENCE, Bloco 02 / 202 / Cota O/L (Amelia Sonia 2/3) ---------- */
  {
    id: "kawana-amelia-sonia-bloco02-202-cota-ol",
    nome: "AMELIA SONIA MADUREIRA",
    cpf: "421.923.156-00",
    rg: "MG6393230 - SSP/MG",
    nacionalidade: "brasileiro",
    estadoCivil: "Solteiro",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "KAWANA RESIDENCE",
    bloco: "Bloco 02",
    apartamento: "202",
    andar: "2",
    cota: "O/L",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "S.P.E. MIRANTE INVESTIMENTO IMOBILIÁRIOS S/A",
    cnpj: "18.622.215/0001-00",

    valorPago: 3350.00,
    valorTotal: 48174.92,
    corretagem: 3350.00,
    sinal: 150.00,
    parcelas: [
      { tipo: "Cota (entrada)", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota (saldo)", qtd: 84, valor: 531.84, forma: "Boleto", vencimento: "2026-12-15" },
      { tipo: "Intermediação", qtd: 10, valor: 315.00, forma: "Master Crédito", vencimento: "2026-08-17" },
      { tipo: "Intermediação", qtd: 10, valor: 20.00, forma: "Elo Crédito", vencimento: "2026-08-17" }
    ],
    formaPagamentoEntrada: "10x R$ 315,00 Master Crédito + 10x R$ 20,00 Elo Crédito (intermediação) + 3x R$ 50,00 boleto (cota entrada)",
    dataAssinatura: "2026-08-17",
    telefone: "(31) 99918-0983",
    email: "Carolinemadureiramoreira@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/kawana-amelia-sonia-bloco02-202-cota-ol--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 2 DE 3 — mesma adquirente (Amelia Sonia Madureira) com 3 contratos Kawana Residence.\n" +
      "VALOR PAGO = R$ 3.350,00 — 10x R$ 315,00 Master Crédito (R$ 3.150,00) + 10x R$ 20,00 Elo Crédito (R$ 200,00) = intermediação valor cheio.\n" +
      "DEVOLUÇÃO: Estorno Cartão — instrumento principal cartão Master Crédito.\n" +
      "Preço da cota (sem intermediação): R$ 44.824,92. Intermediação: R$ 3.350,00 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Cota entrada: 3x R$ 50,00 boleto (1ª 15/09/2026) — NÃO PAGO. Cota saldo: 84x R$ 531,84 boleto (1ª 15/12/2026) — NÃO PAGO.\n" +
      "Contrato assinado em Caldas Novas/GO em 17/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 24/08/2026).\n" +
      "Ônus: Alienação Fiduciária R35-77.345 na matrícula 77.345.\n" +
      "Semanas de uso: 2 por ano. Habite-se previsto: 31/12/2027. Não conheceu o empreendimento.\n" +
      "Profissão: Gerente. Nascimento: 05/12/1958. Telefone 2: (31) 99700-0512.\n" +
      "ATENÇÃO: Nome no quadro-resumo = 'AMELIA', assinatura GSign = 'AMAELIA' — verificar grafia correta.\n" +
      "Matrícula nº 77.345, Cartório de Registro de Imóveis Leandro Félix, Caldas Novas/GO.\n" +
      "GSign Documento ID: CA85WFGK4N-KC0149M-CVMB1EFDQIN1WE-DEE3R."
  },

  /* ---------- 65 — WAM — 311018 PRAIAS DO LAGO ECO RESORT, Bloco J / 301 / Cota 10 (Vania 1/2) ---------- */
  {
    id: "311018-vania-silva-pdl-j-301-cota-10",
    nome: "VANIA SILVA CORDEIRO DOS SANTOS",
    cpf: "325.127.348-54",
    rg: "43251077 - SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "EDIVALDO DA SILVA LIRA", cpf: "413.694.128-51", rg: "53151652 - SSP/SP", email: "Edivaldosilvasp@hotmail.com" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "J",
    apartamento: "301",
    andar: "3",
    cota: "10",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 4400.00,
    valorTotal: 50846.75,
    corretagem: 4400.00,
    sinal: 200.00,
    parcelas: [
      { tipo: "Cota (entrada)", qtd: 4, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota (saldo)", qtd: 88, valor: 525.53, forma: "Boleto", vencimento: "2027-01-15" },
      { tipo: "Intermediação", qtd: 1, valor: 1500.00, forma: "Depósito Bancário/Transferência Eletrônica", vencimento: "2026-08-16" },
      { tipo: "Intermediação", qtd: 1, valor: 2900.00, forma: "Cartão de Débito", vencimento: "2026-08-16" }
    ],
    formaPagamentoEntrada: "1x R$ 1.500,00 depósito + 1x R$ 2.900,00 cartão débito (intermediação) + 4x R$ 50,00 boleto (cota entrada)",
    dataAssinatura: "2026-08-16",
    telefone: "(11) 96246-1162",
    email: "vaniacordeiro22@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/311018-vania-silva-pdl-j-301-cota-10--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 1 DE 2 — mesma adquirente (Vania Silva Cordeiro dos Santos) com 2 contratos Praias do Lago.\n" +
      "VALOR PAGO = R$ 4.400,00 — 1x R$ 1.500,00 depósito/transferência + 1x R$ 2.900,00 cartão de débito (intermediação).\n" +
      "DEVOLUÇÃO: Reembolso — instrumentos principais depósito + cartão débito.\n" +
      "Preço da cota (sem intermediação): R$ 46.446,75. Intermediação: R$ 4.400,00 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Cota entrada: 4x R$ 50,00 boleto (1ª 15/09/2026) — NÃO PAGO. Cota saldo: 88x R$ 525,53 boleto (1ª 15/01/2027) — NÃO PAGO.\n" +
      "Contrato assinado em Caldas Novas/GO em 16/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 23/08/2026, último dia HOJE).\n" +
      "Cônjuge: Edivaldo da Silva Lira, CPF 413.694.128-51, empresário, nasc 11/10/1991.\n" +
      "Profissão: Analista. Nascimento: 12/05/1983. Não conheceu o empreendimento.\n" +
      "Semanas de uso: 3 por ano. Habite-se nº 2020001124 (20/11/2020).\n" +
      "Matrícula nº 29.684, Cartório de Registro de Imóveis de Caldas Novas/GO.\n" +
      "GSign Documento ID: ZM7KB5UKXC-R588YW9-14FBX45ZTBP958-YD3LN. Contrato nº 311018."
  },

  /* ---------- 66 — WAM — 311001 PRAIAS DO LAGO ECO RESORT, Bloco J / 303 / Cota 07 (Vania 2/2) ---------- */
  {
    id: "311001-vania-silva-pdl-j-303-cota-07",
    nome: "VANIA SILVA CORDEIRO DOS SANTOS",
    cpf: "325.127.348-54",
    rg: "43251077 - SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "EDIVALDO DA SILVA LIRA", cpf: "413.694.128-51", rg: "53151652 - SSP/SP", email: "Edivaldosilvasp@hotmail.com" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "J",
    apartamento: "303",
    andar: "3",
    cota: "07",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 4400.00,
    valorTotal: 50846.75,
    corretagem: 4400.00,
    sinal: 200.00,
    parcelas: [
      { tipo: "Cota (entrada)", qtd: 4, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota (saldo)", qtd: 88, valor: 525.53, forma: "Boleto", vencimento: "2027-01-15" },
      { tipo: "Intermediação", qtd: 1, valor: 1500.00, forma: "Depósito Bancário/Transferência Eletrônica", vencimento: "2026-08-16" },
      { tipo: "Intermediação", qtd: 1, valor: 2900.00, forma: "Cartão de Débito", vencimento: "2026-08-16" }
    ],
    formaPagamentoEntrada: "1x R$ 1.500,00 depósito + 1x R$ 2.900,00 cartão débito (intermediação) + 4x R$ 50,00 boleto (cota entrada)",
    dataAssinatura: "2026-08-16",
    telefone: "(11) 96246-1162",
    email: "vaniacordeiro22@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/311001-vania-silva-pdl-j-303-cota-07--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 2 DE 2 — mesma adquirente (Vania Silva Cordeiro dos Santos) com 2 contratos Praias do Lago.\n" +
      "VALOR PAGO = R$ 4.400,00 — 1x R$ 1.500,00 depósito/transferência + 1x R$ 2.900,00 cartão de débito (intermediação).\n" +
      "DEVOLUÇÃO: Reembolso — instrumentos principais depósito + cartão débito.\n" +
      "Preço da cota (sem intermediação): R$ 46.446,75. Intermediação: R$ 4.400,00 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Cota entrada: 4x R$ 50,00 boleto (1ª 15/09/2026) — NÃO PAGO. Cota saldo: 88x R$ 525,53 boleto (1ª 15/01/2027) — NÃO PAGO.\n" +
      "Contrato assinado em Caldas Novas/GO em 16/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 23/08/2026, último dia HOJE).\n" +
      "Cônjuge: Edivaldo da Silva Lira, CPF 413.694.128-51, empresário, nasc 11/10/1991.\n" +
      "Profissão: Analista. Nascimento: 12/05/1983. Não conheceu o empreendimento.\n" +
      "Semanas de uso: 3 por ano. Habite-se nº 2020001124 (20/11/2020).\n" +
      "Matrícula nº 29.684, Cartório de Registro de Imóveis de Caldas Novas/GO.\n" +
      "GSign Documento ID: L68IMNZGXM-BS16B4N-0TL0RWQJUAPO4F-IC1DM. Contrato nº 311001."
  },

  /* ---------- 67 — WAM — 310820 PRAIAS DO LAGO ECO RESORT, Bloco L / 303 / Cota 12 ---------- */
  {
    id: "310820-pollyana-ferreira-pdl-l-303-cota-12",
    nome: "POLLYANA FERREIRA DE OLIVEIRA",
    cpf: "015.986.171-33",
    rg: "17296331 - SSP/MT",
    nacionalidade: "brasileira",
    estadoCivil: "Solteiro",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "L",
    apartamento: "303",
    andar: "3",
    cota: "12",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 6160.00,
    valorTotal: 52606.75,
    corretagem: 6160.00,
    sinal: 200.00,
    parcelas: [
      { tipo: "Cota (entrada)", qtd: 4, valor: 50.00, forma: "Boleto", vencimento: "2026-09-10" },
      { tipo: "Cota (saldo)", qtd: 88, valor: 525.53, forma: "Boleto", vencimento: "2027-01-10" },
      { tipo: "Intermediação", qtd: 1, valor: 684.44, forma: "Cartão de Crédito - Cielo", vencimento: "2026-08-15" },
      { tipo: "Intermediação", qtd: 8, valor: 684.44, forma: "Crédito Recorrente", vencimento: "2026-08-15" }
    ],
    formaPagamentoEntrada: "1x R$ 684,44 cartão crédito Cielo + 8x R$ 684,44 crédito recorrente (intermediação) + 4x R$ 50,00 boleto (cota entrada)",
    dataAssinatura: "2026-08-15",
    telefone: "(66) 99229-4561",
    email: "POLLYALESSANDRO22@GMAIL.COM",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/310820-pollyana-ferreira-pdl-l-303-cota-12--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 6.160,00 — 1x R$ 684,44 cartão crédito Cielo + 8x R$ 684,44 crédito recorrente = intermediação valor cheio.\n" +
      "DEVOLUÇÃO: Estorno Cartão — instrumento principal cartão de crédito (Cielo).\n" +
      "Preço da cota (sem intermediação): R$ 46.446,75. Intermediação: R$ 6.160,00 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Cota entrada: 4x R$ 50,00 boleto (1ª 10/09/2026) — NÃO PAGO. Cota saldo: 88x R$ 525,53 boleto (1ª 10/01/2027) — NÃO PAGO.\n" +
      "Contrato assinado em Caldas Novas/GO em 15/08/2026 — FORA DO PRAZO de arrependimento (venceu 22/08/2026).\n" +
      "CONHECEU o empreendimento (marcou Sim no quadro-resumo).\n" +
      "Inclui Passaporte Náutico Praia Clube nº 07-L303/12, Apt L303/Cota 12 (W.Palmerston & Tavares, CNPJ 05.513.549/0001-01).\n" +
      "Profissão: Servidor Público(a). Nascimento: 30/06/1985. Sexo: Feminino.\n" +
      "Endereço: Rua dos Lírios, 899, Anchieta, Barra do Garças/MT, CEP 78601618.\n" +
      "Semanas de uso: 3 por ano. Habite-se nº 2020001124 (20/11/2020).\n" +
      "Matrícula nº 29.684, Cartório de Registro de Imóveis de Caldas Novas/GO.\n" +
      "GSign Documento ID: CWU0R1HBQS-9FLIIEY-CMC0HODAL3PNWX-M6303. Contrato/Assinatura nº 310820."
  },

  /* ---------- 68 — GAV — GGR GRAN GARDEN RESORT, Torre B4 / 003 / Cota 17 ---------- */
  {
    id: "ggr-luciano-ramires-b4-003-cota-17",
    nome: "LUCIANO RAMIRES BUGALHO",
    cpf: "986.569.530-87",
    rg: "1075464816 SJS II RS",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "B4",
    apartamento: "003",
    andar: "T",
    cota: "17",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA.",
    cnpj: "50.094.155/0001-02",

    valorPago: 1000.00,
    valorTotal: 76732.22,
    corretagem: 4490.00,
    sinal: 3836.61,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "PIX", vencimento: "2026-08-23" },
      { tipo: "Corretagem", qtd: 4, valor: 872.50, forma: "Boleto", vencimento: "2026-09-05" },
      { tipo: "Sinal", qtd: 5, valor: 767.32, forma: "Boleto", vencimento: "2027-01-05" },
      { tipo: "Saldo", qtd: 91, valor: 751.71, forma: "Boleto", vencimento: "2027-06-05" }
    ],
    formaPagamentoEntrada: "1x R$ 1.000,00 PIX (corretagem) + 4x R$ 872,50 boleto (corretagem)",
    dataAssinatura: "2026-08-23",
    telefone: "(51) 991107345",
    email: "lucianoramiresbugalho@yahoo.com.br",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/ggr-luciano-ramires-b4-003-cota-17--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 — 1x R$ 1.000,00 PIX (corretagem). Comprovante PIX Laranjinha Itaú confirmado: R$ 1.000,00 em 23/08/2026 16:14, ID RESV0820580093814895WCKP4Y1M0526998.\n" +
      "DEVOLUÇÃO: Reembolso — instrumento principal PIX.\n" +
      "Corretagem total: R$ 4.490,00 (beneficiários: Carina Alff, Alen Polis Pinto, Gilliana Rodrigues Vieira da Silva, João Lucas de Moura Souza). PIX R$ 1.000,00 pago + 4x R$ 872,50 boleto (1ª 05/09/2026, NÃO PAGOS).\n" +
      "Sinal de negócio: R$ 3.836,61 em 5x R$ 767,32 boleto (1ª 05/01/2027) — NÃO PAGO.\n" +
      "Saldo: R$ 68.405,61 em 91x R$ 751,71 boleto (1ª 05/06/2027) — NÃO PAGO.\n" +
      "Contrato assinado em Gramado/RS em 23/08/2026 — DENTRO DO PRAZO de arrependimento (vence 30/08/2026).\n" +
      "NÃO conheceu o empreendimento (marcou Não no quadro-resumo).\n" +
      "Empreendimento novo na base: Gran Garden Resort, Gramado/RS. 2 quartos, área privativa 86,2m², total 125,5m². 1 semana/ano.\n" +
      "Estado civil: União estável — cônjuge NÃO informado nos documentos.\n" +
      "Profissão: Serralheiro. Nascimento: 08/07/1980.\n" +
      "Endereço: Rua Bem Te Vi, 159, Tres Marias, Esteio/RS, CEP 93295607.\n" +
      "Inclui Select Club (intercâmbio férias) e Guia Multiproprietário GAV (recebido digitalmente 23/08/2026).\n" +
      "ZapSign 95a5396b-4f3a-47e5-9633-08ab89a591cd. Luciano assinou 23/08/2026 17:03:41.\n" +
      "ATENÇÃO: PDF (57p) contém páginas avulsas do contrato Everton Cosme Pereira (311477, Praias do Lago) misturadas — erro de montagem pela GAV."
  },

  /* ---------- 69 — GAV — 353063 BEACH GAV RESORTS, Bloco 2 / 1212 / Cota 02 ---------- */
  {
    id: "353063-eduardo-nunes-bgr-b2-1212-cota-02",
    nome: "EDUARDO NUNES PEREIRA",
    cpf: "050.409.723-77",
    rg: "0376699120098 SSP MA",
    nacionalidade: "brasileiro",
    estadoCivil: "União estável",
    conjuge: { nome: "SAMELINE GUEDES SILVA", cpf: "057.535.613-81", rg: "0386980820103 SSP MA", email: "" },

    empreendimento: "BEACH GAV RESORTS",
    bloco: "Bloco 2",
    apartamento: "1212",
    andar: "12",
    cota: "02",
    fracao: "1/52",
    localizacao: "PARÁ",

    empresa: "GAV",
    razaoSocial: "BEACH GAV RESORTS EMPREENDIMENTOS IMOBILIARIOS SPE LTDA.",
    cnpj: "33.531.685/0001-51",

    valorPago: 3990.00,
    valorTotal: 46336.40,
    corretagem: 3990.00,
    sinal: 2316.84,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 666.66, forma: "Cartão VISA CreditoParcelado", vencimento: "2026-09-02" },
      { tipo: "Corretagem", qtd: 1, valor: 1993.32, forma: "Cartão MASTER CreditoParcelado", vencimento: "2026-09-02" },
      { tipo: "Corretagem", qtd: 1, valor: 333.34, forma: "Cartão VISA CreditoParcelado", vencimento: "2026-11-01" },
      { tipo: "Corretagem", qtd: 1, valor: 996.68, forma: "Cartão MASTER CreditoParcelado", vencimento: "2026-11-01" },
      { tipo: "Sinal", qtd: 4, valor: 579.21, forma: "Boleto", vencimento: "2026-12-10" },
      { tipo: "Saldo", qtd: 68, valor: 588.67, forma: "Boleto", vencimento: "2027-04-10" }
    ],
    formaPagamentoEntrada: "Cartão VISA + MASTER CreditoParcelado (corretagem R$ 3.990,00)",
    dataAssinatura: "",
    telefone: "(99) 991663547",
    email: "eduardonunnes26@gmail.com",
    arquivos: [],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990,00 — corretagem inteira via cartão de crédito (VISA + MASTER, CreditoParcelado). Cartão = valor cheio.\n" +
      "DEVOLUÇÃO: Estorno Cartão — instrumento principal cartão de crédito.\n" +
      "Corretagem: R$ 3.990,00 em 4 lançamentos parcelados: VISA R$ 666,66 (1ª 02/09/2026) + MASTER R$ 1.993,32 (1ª 02/09/2026) + VISA R$ 333,34 (1ª 01/11/2026) + MASTER R$ 996,68 (1ª 01/11/2026).\n" +
      "Sinal de negócio: R$ 2.316,84 em 4x R$ 579,21 boleto (1ª 10/12/2026) — NÃO PAGO.\n" +
      "Saldo: R$ 40.029,56 em 68x R$ 588,67 boleto (1ª 10/04/2027) — NÃO PAGO.\n" +
      "ATENÇÃO: DATA DE ASSINATURA NÃO IDENTIFICADA — só recebi foto da proposta (1 página), sem log de assinatura digital nem data no rodapé. Preciso do PDF completo ou da data.\n" +
      "Cônjuge: Sameline Guedes Silva, CPF 057.535.613-81, nasc. 02/06/1993, empresária, tel (98) 992101458.\n" +
      "Profissão: Empresário. Nascimento: 26/08/1992.\n" +
      "Endereço: Rua Tertuliano Sampaio, Qd 65, 07, Nova Acailândia, Acailândia/MA, CEP 65930000.\n" +
      "Empreendimento: Beach GAV Resorts, Salinópolis/PA. 1 quarto, área privativa 30m², total 61,27m².\n" +
      "PENDÊNCIA: falta PDF do contrato completo (só tenho foto da proposta) e data de assinatura. Contrato/Proposta nº 353063."
  },

  /* ---------- 70 — GAV — 355736 BEACH GAV RESORTS, Bloco 2 / 0712 / Cota 10 ----------
     Miqueias comprou 2 cotas no mesmo dia — contrato 1 de 2. */
  {
    id: "355736-miqueias-costa-bgr-b2-0712-cota-10",
    nome: "MIQUEIAS COSTA SOARES",
    cpf: "003.630.152-30",
    rg: "08406 CTPS PA",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "BEACH GAV RESORTS",
    bloco: "Bloco 2",
    apartamento: "0712",
    andar: "7",
    cota: "10",
    fracao: "1/52",
    localizacao: "PARÁ",

    empresa: "GAV",
    razaoSocial: "BEACH GAV RESORTS EMPREENDIMENTOS IMOBILIARIOS SPE LTDA.",
    cnpj: "33.531.685/0001-51",

    valorPago: 1000.00,
    valorTotal: 44554.77,
    corretagem: 3990.00,
    sinal: 2227.73,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "PIX", vencimento: "2026-08-20" },
      { tipo: "Corretagem", qtd: 5, valor: 598.00, forma: "Boleto", vencimento: "2026-09-20" },
      { tipo: "Sinal", qtd: 4, valor: 556.93, forma: "Boleto", vencimento: "2027-02-10" },
      { tipo: "Saldo", qtd: 68, valor: 563.78, forma: "Boleto", vencimento: "2027-06-10" }
    ],
    formaPagamentoEntrada: "1x R$ 1.000,00 PIX (corretagem) + 5x R$ 598,00 boleto (corretagem)",
    dataAssinatura: "2026-08-20",
    telefone: "(11) 992554125",
    email: "miqueiassoares458@gmail.com",
    arquivos: [
      { titulo: "Contrato + CNH + PIX", arquivo: "contratos-pdf/355736-miqueias-costa-bgr-b2-0712-cota-10--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 1 DE 2 — mesmo adquirente (Miqueias Costa Soares) com 2 contratos Beach GAV Resorts.\n" +
      "VALOR PAGO = R$ 1.000,00 — 1x R$ 1.000,00 PIX (corretagem). PIX = o que passou.\n" +
      "DEVOLUÇÃO: Reembolso — instrumento principal PIX.\n" +
      "Corretagem total: R$ 3.990,00. PIX R$ 1.000,00 pago + 5x R$ 598,00 boleto (1ª 20/09/2026, NÃO PAGOS).\n" +
      "Sinal de negócio: R$ 2.227,73 em 4x R$ 556,93 boleto (1ª 10/02/2027) — NÃO PAGO.\n" +
      "Saldo: R$ 38.337,04 em 68x R$ 563,78 boleto (1ª 10/06/2027) — NÃO PAGO.\n" +
      "Data estimada: 20/08/2026 (data do PIX) — DENTRO DO PRAZO de arrependimento (vence 27/08/2026).\n" +
      "ATENÇÃO PIX: comprovante mostra R$ 3.000,00 de LEVI GUIMARAES TAVARES (CPF ***.986.192-**, PagBank) para Beach GAV Resorts (CNPJ 33.531.685/0001-51). Mesmo ID transação nas 2 propostas (R$ 1.000 cada = R$ 2.000). Sobram R$ 1.000 — possível 3ª proposta não enviada.\n" +
      "Estado civil: Casado(a) — cônjuge NÃO informado na proposta.\n" +
      "CNH: 2968892310, cat AB, emissão 16/12/2024, validade 03/12/2034, natural de Viseu/PA.\n" +
      "Filiação: Raimundo Cavalcante Soares / Maria Madalena Costa Soares.\n" +
      "Profissão: Empresário. Nascimento: 01/09/1985.\n" +
      "Endereço: Passagem Jari, SN, Areia Branca, Capanema/PA, CEP 68702271.\n" +
      "1 quarto, área privativa 30m², total 61,27m². Proposta nº 355736.\n" +
      "PDF = CamScanner (4p): proposta 1 + proposta 2 + CNH + comprovante PIX."
  },

  /* ---------- 71 — GAV — 355737 BEACH GAV RESORTS, Bloco 2 / 0915 / Cota 08 ----------
     Miqueias comprou 2 cotas no mesmo dia — contrato 2 de 2. */
  {
    id: "355737-miqueias-costa-bgr-b2-0915-cota-08",
    nome: "MIQUEIAS COSTA SOARES",
    cpf: "003.630.152-30",
    rg: "08406 CTPS PA",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "BEACH GAV RESORTS",
    bloco: "Bloco 2",
    apartamento: "0915",
    andar: "9",
    cota: "08",
    fracao: "1/52",
    localizacao: "PARÁ",

    empresa: "GAV",
    razaoSocial: "BEACH GAV RESORTS EMPREENDIMENTOS IMOBILIARIOS SPE LTDA.",
    cnpj: "33.531.685/0001-51",

    valorPago: 1000.00,
    valorTotal: 44554.77,
    corretagem: 3990.00,
    sinal: 2227.73,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "PIX", vencimento: "2026-08-20" },
      { tipo: "Corretagem", qtd: 5, valor: 598.00, forma: "Boleto", vencimento: "2026-09-20" },
      { tipo: "Sinal", qtd: 4, valor: 556.93, forma: "Boleto", vencimento: "2027-02-10" },
      { tipo: "Saldo", qtd: 68, valor: 563.78, forma: "Boleto", vencimento: "2027-06-10" }
    ],
    formaPagamentoEntrada: "1x R$ 1.000,00 PIX (corretagem) + 5x R$ 598,00 boleto (corretagem)",
    dataAssinatura: "2026-08-20",
    telefone: "(11) 992554125",
    email: "miqueiassoares458@gmail.com",
    arquivos: [
      { titulo: "Contrato + CNH + PIX", arquivo: "contratos-pdf/355736-miqueias-costa-bgr-b2-0712-cota-10--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 2 DE 2 — mesmo adquirente (Miqueias Costa Soares) com 2 contratos Beach GAV Resorts.\n" +
      "VALOR PAGO = R$ 1.000,00 — 1x R$ 1.000,00 PIX (corretagem). PIX = o que passou.\n" +
      "DEVOLUÇÃO: Reembolso — instrumento principal PIX.\n" +
      "Corretagem total: R$ 3.990,00. PIX R$ 1.000,00 pago + 5x R$ 598,00 boleto (1ª 20/09/2026, NÃO PAGOS).\n" +
      "Sinal de negócio: R$ 2.227,73 em 4x R$ 556,93 boleto (1ª 10/02/2027) — NÃO PAGO.\n" +
      "Saldo: R$ 38.337,04 em 68x R$ 563,78 boleto (1ª 10/06/2027) — NÃO PAGO.\n" +
      "Data estimada: 20/08/2026 (data do PIX) — DENTRO DO PRAZO de arrependimento (vence 27/08/2026).\n" +
      "Mesmo PIX de R$ 3.000 (Levi Guimarães Tavares) cobre os 2 contratos (R$ 1.000 cada). PDF compartilhado com ficha 70.\n" +
      "Estado civil: Casado(a) — cônjuge NÃO informado na proposta.\n" +
      "Profissão: Empresário. Nascimento: 01/09/1985. Natural de Viseu/PA.\n" +
      "Endereço: Passagem Jari, SN, Areia Branca, Capanema/PA, CEP 68702271.\n" +
      "1 quarto, área privativa 30m², total 61,27m². Proposta nº 355737."
  },

  /* ---------- 72 — WAM — 296221 PRAIAS DO LAGO ECO RESORT, Bloco O / 507 / Cota 09 ---------- */
  {
    id: "296221-ivie-candida-pdl-o-507-cota-09",
    nome: "IVIE CANDIDA FREITAS",
    cpf: "019.975.116-14",
    rg: "MG16248082 SSP/MG",
    nacionalidade: "brasileira",
    estadoCivil: "Casado",
    conjuge: { nome: "PETRICK RIBEIRO PEGORITTI", cpf: "129.649.406-30", rg: "MG16537085 SSP/MG", email: "petrickpegoritti@gmail.com" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "O",
    apartamento: "507",
    andar: "5",
    cota: "09",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 6150.00,
    valorTotal: 43875.93,
    corretagem: 6150.00,
    sinal: 0,
    parcelas: [
      { tipo: "Cota (entrada)", qtd: 1, valor: 50.00, forma: "Boleto", vencimento: "2026-06-15" },
      { tipo: "Cota (saldo)", qtd: 88, valor: 498.02, forma: "Boleto", vencimento: "2026-07-15" },
      { tipo: "Intermediação", qtd: 1, valor: 2000.00, forma: "Depósito Bancário/Transferência Eletrônica", vencimento: "2026-05-29" },
      { tipo: "Intermediação", qtd: 1, valor: 4150.00, forma: "Depósito Bancário/Transferência Eletrônica", vencimento: "2026-05-29" }
    ],
    formaPagamentoEntrada: "1x R$ 2.000,00 depósito + 1x R$ 4.150,00 depósito (intermediação)",
    dataAssinatura: "2026-05-29",
    telefone: "(31) 98802-8624",
    email: "iviecandida@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/296221-ivie-candida-pdl-o-507-cota-09--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 6.150,00 — intermediação total: 1x R$ 2.000,00 depósito + 1x R$ 4.150,00 depósito/transferência eletrônica. Depósito = o que passou.\n" +
      "DEVOLUÇÃO: Reembolso — instrumento principal depósito/transferência.\n" +
      "Preço da cota (sem intermediação): R$ 43.875,93. Intermediação: R$ 6.150,00 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Cota entrada: 1x R$ 50,00 boleto (15/06/2026) — possivelmente pago (venceu há 2+ meses), não confirmado.\n" +
      "Cota saldo: 88x R$ 498,02 boleto (1ª 15/07/2026) — até 2 parcelas podem ter vencido, pagamento não confirmado.\n" +
      "Contrato assinado em Caldas Novas/GO em 29/05/2026 — FORA DO PRAZO de arrependimento (venceu 05/06/2026).\n" +
      "NÃO conheceu o empreendimento (marcou Não no quadro-resumo).\n" +
      "Regime de bens: Comunhão Parcial. Cônjuge: Petrick Ribeiro Pegoritti, CPF 129.649.406-30, consultor, nasc 27/03/1995, tel (31) 99949-6209.\n" +
      "Profissão: Médica. Nascimento: 18/11/1997. Sexo: Feminino.\n" +
      "Endereço: Rua Paraná, 265, Espírito Santo, Betim/MG, CEP 32671674.\n" +
      "Inclui Passaporte Náutico Praia Clube nº 11-O507/09.\n" +
      "Semanas de uso: 3 por ano. Habite-se nº 2020001124 (20/11/2020).\n" +
      "Matrícula nº 29.684, Cartório de Registro de Imóveis de Caldas Novas/GO.\n" +
      "GSign Documento ID: AED6RSUZUL-03CXJH5-JX5S9HOKOKRFNT-XP8P0. Contrato nº 296221."
  },

  /* ---------- 73 — WAM — PRAIAS DO LAGO ECO RESORT, Bloco H / 207 / Cota 02 ---------- */
  {
    id: "pdl-francisco-cleiton-h-207-cota-02",
    nome: "FRANCISCO CLEITON DA SILVA SOUZA",
    cpf: "056.275.951-40",
    rg: "3169050 SESP/DF",
    nacionalidade: "brasileira",
    estadoCivil: "Casado",
    conjuge: { nome: "BRUNA GONÇALVES DA SILVA SOUZA", cpf: "061.480.193-10", rg: "3605167 PC/DF", email: "brunabdb8@outlook.com" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "H",
    apartamento: "207",
    andar: "2",
    cota: "02",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 616.00,
    valorTotal: 46446.75,
    corretagem: 6160.00,
    sinal: 0,
    parcelas: [
      { tipo: "Cota (entrada)", qtd: 5, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota (saldo)", qtd: 88, valor: 524.96, forma: "Boleto", vencimento: "2027-02-20" },
      { tipo: "Intermediação", qtd: 1, valor: 616.00, forma: "Cartão de Débito", vencimento: "2026-08-23" },
      { tipo: "Intermediação", qtd: 8, valor: 693.00, forma: "Boleto", vencimento: "2026-08-23" }
    ],
    formaPagamentoEntrada: "1x R$ 616,00 cartão de débito (intermediação)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-23",
    telefone: "(61) 98353-9849",
    email: "cleitinho1511@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/pdl-francisco-cleiton-h-207-cota-02--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 616,00 — 1x R$ 616,00 cartão de débito (intermediação WAM Comercialização). Cartão = valor cheio.\n" +
      "DEVOLUÇÃO: Estorno Cartão — instrumento principal cartão de débito.\n" +
      "Preço da cota (sem intermediação): R$ 46.446,75. Intermediação: R$ 6.160,00 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Cota entrada: 5x R$ 50,00 boleto (1ª 15/09/2026) — NÃO VENCIDAS, nenhuma paga.\n" +
      "Cota saldo: 88x R$ 524,96 boleto (1ª 20/02/2027) — NÃO PAGO.\n" +
      "Intermediação saldo: 8x R$ 693,00 boleto — COBRANÇA W PALMERSTON — contrato recente, provavelmente nenhum pago.\n" +
      "Contrato assinado em Caldas Novas/GO em 23/08/2026 — DENTRO DO PRAZO de arrependimento (vence 30/08/2026).\n" +
      "NÃO conheceu o empreendimento (marcou Não no quadro-resumo).\n" +
      "Regime de bens: Comunhão Parcial. Cônjuge: Bruna Gonçalves da Silva Souza, CPF 061.480.193-10, RG 3605167 PC/DF, técnica de enfermagem, nasc 04/04/1996, tel (61) 98302-5701.\n" +
      "Profissão: Representante comercial. Nascimento: 15/11/1994.\n" +
      "Endereço: Quadra 19, Rua 4, Lote 27, 27, São Sebastião, Brasília/DF, CEP 71693500.\n" +
      "Inclui Passaporte Náutico Praia Clube nº 04-H207/02.\n" +
      "Semanas de uso: 3 por ano. Habite-se nº 2020001124 (20/11/2020).\n" +
      "Matrícula nº 29.684, Cartório de Registro de Imóveis de Caldas Novas/GO.\n" +
      "D4Sign Documento ID: 9H38Q2LCE8-WVY48WK-B01ZFY2HU89U1W-XA4YU."
  },

  /* ---------- 74 — GAV — 340024 GRAN HAUS RESORT, Bloco 1 / 0208 / Cota 21 ---------- */
  {
    id: "340024-angelo-ghr-b1-0208-cota-21",
    nome: "ANGELO SALLASAR",
    cpf: "396.887.838-89",
    rg: "471314468 SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "Casado",
    conjuge: { nome: "ADILA MAGDA COSTA SALLASAR", cpf: "085.151.136-86", rg: "667214690 SSP/SP", email: "adila-costa@live.com" },

    empreendimento: "GRAN HAUS RESORT",
    bloco: "1",
    apartamento: "0208",
    andar: "1",
    cota: "21",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO 4 EMPREENDIMENTOS IMOBILIARIOS SPE LTDA",
    cnpj: "62.986.874/0001-17",

    valorPago: 1000.00,
    valorTotal: 34554.27,
    corretagem: 4490.00,
    sinal: 1727.72,
    parcelas: [
      { tipo: "Sinal", qtd: 5, valor: 345.54, forma: "Boleto", vencimento: "2026-10-15" },
      { tipo: "Saldo", qtd: 55, valor: 515.21, forma: "Boleto", vencimento: "2027-03-15" },
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "PIX", vencimento: "2026-05-24" },
      { tipo: "Corretagem", qtd: 4, valor: 872.50, forma: "Boleto", vencimento: "2026-06-24" }
    ],
    formaPagamentoEntrada: "1x R$ 1.000,00 PIX (corretagem)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-05-24",
    telefone: "(19) 981690478",
    email: "angelo_sallasar@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/340024-angelo-ghr-b1-0208-cota-21--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (conservador) — 1x R$ 1.000,00 PIX corretagem. PIX = o que passou.\n" +
      "DEVOLUÇÃO: Reembolso — instrumento principal PIX.\n" +
      "Preço da fração: R$ 34.554,27. Corretagem: R$ 4.490,00.\n" +
      "Sinal: R$ 1.727,72 em 5x R$ 345,54 boleto (1ª 15/10/2026) — NÃO VENCIDAS.\n" +
      "Saldo: R$ 28.336,55 em 55x R$ 515,21 boleto (1ª 15/03/2027) — NÃO PAGO.\n" +
      "Corretagem boleto: 4x R$ 872,50 (1ª 24/06/2026) — até 3 parcelas vencidas (24/06, 24/07, 24/08), pagamento NÃO CONFIRMADO.\n" +
      "ATENÇÃO: Nº Documento PIX idêntico nos 2 contratos (340024 e 340025) — conferir se foi 1 PIX de R$ 2.000 rateado ou 2 PIX separados.\n" +
      "Contrato assinado em Gramado/RS em 24/05/2026 — FORA DO PRAZO de arrependimento (venceu 31/05/2026).\n" +
      "Cônjuge: Adila Magda Costa Sallasar, CPF 085.151.136-86, RG 667214690 SSP/SP, servidora pública, nasc 10/07/1989, tel (19) 983581158.\n" +
      "Profissão: Consultor. Nascimento: 26/01/1991.\n" +
      "Endereço: Rua Celia Aparecida de Souza Bouffier, 8, Bosque de Barão Geraldo, Campinas/SP, CEP 13082753.\n" +
      "Empreendimento em construção — conclusão prevista março/2030.\n" +
      "1 quarto, área privativa 34,97m², área comum 27.408m², área total 62.378m².\n" +
      "Matrícula nº 62.273, Livro nº 2, Cartório de Registro de Imóveis de Gramado/RS.\n" +
      "D4Sign Documento ID: bc150ef6-006c-4a92-85b0-337bb86bfa12. Proposta nº 340024."
  },

  /* ---------- 75 — GAV — 340025 GRAN HAUS RESORT, Bloco 2 / 0208 / Cota 08 ---------- */
  {
    id: "340025-angelo-ghr-b2-0208-cota-08",
    nome: "ANGELO SALLASAR",
    cpf: "396.887.838-89",
    rg: "471314468 SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "Casado",
    conjuge: { nome: "ADILA MAGDA COSTA SALLASAR", cpf: "085.151.136-86", rg: "667214690 SSP/SP", email: "adila-costa@live.com" },

    empreendimento: "GRAN HAUS RESORT",
    bloco: "2",
    apartamento: "0208",
    andar: "1",
    cota: "08",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO 4 EMPREENDIMENTOS IMOBILIARIOS SPE LTDA",
    cnpj: "62.986.874/0001-17",

    valorPago: 1000.00,
    valorTotal: 34554.27,
    corretagem: 4490.00,
    sinal: 1727.72,
    parcelas: [
      { tipo: "Sinal", qtd: 5, valor: 345.54, forma: "Boleto", vencimento: "2026-10-15" },
      { tipo: "Saldo", qtd: 55, valor: 515.21, forma: "Boleto", vencimento: "2027-03-15" },
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "PIX", vencimento: "2026-05-24" },
      { tipo: "Corretagem", qtd: 4, valor: 872.50, forma: "Boleto", vencimento: "2026-06-24" }
    ],
    formaPagamentoEntrada: "1x R$ 1.000,00 PIX (corretagem)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-05-24",
    telefone: "(19) 981690478",
    email: "angelo_sallasar@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/340025-angelo-ghr-b2-0208-cota-08--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (conservador) — 1x R$ 1.000,00 PIX corretagem. PIX = o que passou.\n" +
      "DEVOLUÇÃO: Reembolso — instrumento principal PIX.\n" +
      "Preço da fração: R$ 34.554,27. Corretagem: R$ 4.490,00.\n" +
      "Sinal: R$ 1.727,72 em 5x R$ 345,54 boleto (1ª 15/10/2026) — NÃO VENCIDAS.\n" +
      "Saldo: R$ 28.336,55 em 55x R$ 515,21 boleto (1ª 15/03/2027) — NÃO PAGO.\n" +
      "Corretagem boleto: 4x R$ 872,50 (1ª 24/06/2026) — até 3 parcelas vencidas (24/06, 24/07, 24/08), pagamento NÃO CONFIRMADO.\n" +
      "ATENÇÃO: Nº Documento PIX idêntico nos 2 contratos (340024 e 340025) — conferir se foi 1 PIX de R$ 2.000 rateado ou 2 PIX separados.\n" +
      "Contrato assinado em Gramado/RS em 24/05/2026 — FORA DO PRAZO de arrependimento (venceu 31/05/2026).\n" +
      "Mesmos dados pessoais da ficha 74. PDF compartilhado entre fichas 74-75.\n" +
      "D4Sign Documento ID: d3a28114-4b45-4d20-b066-e5f52ae4c760. Proposta nº 340025."
  },

  /* ---------- 76 — GAV — 294256 GRAN GARDEN RESORT, Bloco C1 / 03B / Cota 26 ---------- */
  {
    id: "294256-deise-ggr-c1-03b-cota-26",
    nome: "DEISE DAIANE LUDKE FURLAN",
    cpf: "835.445.260-34",
    rg: "6092230694 SJS II/RS",
    nacionalidade: "brasileira",
    estadoCivil: "Casado",
    conjuge: { nome: "VANDERLEI DA CONCEICAO FURLAN", cpf: "015.848.100-33", rg: "7101015985 SJS II/RS", email: "vandyfurlan@gmail.com" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "C1",
    apartamento: "03B",
    andar: "T",
    cota: "26",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 1000.00,
    valorTotal: 50433.05,
    corretagem: 4490.00,
    sinal: 2521.65,
    parcelas: [
      { tipo: "Sinal", qtd: 4, valor: 630.41, forma: "Boleto", vencimento: "2026-04-15" },
      { tipo: "Saldo", qtd: 80, valor: 542.77, forma: "Boleto", vencimento: "2026-08-15" },
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "PIX", vencimento: "2025-10-19" },
      { tipo: "Corretagem", qtd: 5, valor: 698.00, forma: "Boleto", vencimento: "2025-11-19" }
    ],
    formaPagamentoEntrada: "1x R$ 1.000,00 PIX (corretagem)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2025-10-19",
    telefone: "(51) 999048785",
    email: "deisefurlan2010@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/294256-deise-ggr-c1-03b-cota-26--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (conservador, só PIX confirmado) — 1x R$ 1.000,00 PIX corretagem (19/10/2025). PIX = o que passou.\n" +
      "DEVOLUÇÃO: Reembolso — instrumento principal PIX.\n" +
      "Preço da fração: R$ 50.433,05. Corretagem: R$ 4.490,00.\n" +
      "Sinal: R$ 2.521,65 em 4x R$ 630,41 boleto (1ª 15/04/2026) — TODAS VENCIDAS, pagamento NÃO CONFIRMADO.\n" +
      "Saldo: R$ 43.421,40 em 80x R$ 542,77 boleto (1ª 15/08/2026) — 1 parcela vencida (15/08), pagamento NÃO CONFIRMADO.\n" +
      "Corretagem boleto: 5x R$ 698,00 (1ª 19/11/2025) — TODAS VENCIDAS (10 meses), pagamento NÃO CONFIRMADO.\n" +
      "ATENÇÃO: contrato de 10 meses — boletos de corretagem e sinal provavelmente pagos, mas sem comprovante.\n" +
      "Contrato assinado presencialmente em Gramado/RS em 19/10/2025 — FORA DO PRAZO de arrependimento (venceu 26/10/2025).\n" +
      "Cônjuge: Vanderlei da Conceição Furlan, CPF 015.848.100-33, RG 7101015985 SJS II/RS, téc. elétrico, nasc 11/02/1989, tel (51) 997087825.\n" +
      "Profissão: Aux. Administrativo. Nascimento: 13/01/1988.\n" +
      "Endereço: Linha Cafe, Três Coroas/RS, CEP 95660000.\n" +
      "Inclui Select Club (GAV). 1 quarto, área privativa 43,1m², área total 63,11m².\n" +
      "Matrícula nº 59.387, Livro nº 02, Serviço de Registro de Imóveis de Gramado/RS.\n" +
      "Nº PIX corretagem: RESV0113470093 B148954J458EXKK9 335F5C.\n" +
      "D4Sign Documento ID: ff63d3f0-0451-4cab-ab74-c2d985f5d181. Proposta nº 294256."
  },

  /* ---------- 77 — GAV — 151009 PORTO 2 LIFE RESORT, Bloco 07 / 0318 / Cota 02 ---------- */
  {
    id: "151009-rafael-p2l-b07-0318-cota-02",
    nome: "RAFAEL HENRIQUE PAREDE GARCIA",
    cpf: "379.046.448-19",
    rg: "458250454 SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "União Estável",
    conjuge: { nome: "BRUNO HENRIQUE DE MATTOS", cpf: "394.196.968-47", rg: "47160334 SSP/SP", email: "brunohenri2283@gmail.com" },

    empreendimento: "PORTO 2 LIFE RESORT",
    bloco: "07",
    apartamento: "0318",
    andar: "2",
    cota: "02",
    fracao: "1/52",
    localizacao: "PERNAMBUCO",

    empresa: "GAV",
    razaoSocial: "GAV MURO ALTO 2 EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "39.673.888/0001-69",

    valorPago: 26678.31,
    valorTotal: 55136.92,
    corretagem: 3990.00,
    sinal: 2756.84,
    parcelas: [
      { tipo: "Sinal", qtd: 4, valor: 689.21, forma: "Boleto", vencimento: "2024-04-05" },
      { tipo: "Saldo", qtd: 74, valor: 653.92, forma: "Boleto", vencimento: "2024-08-05" },
      { tipo: "Corretagem", qtd: 1, valor: 2000.00, forma: "PIX", vencimento: "2023-12-13" },
      { tipo: "Corretagem", qtd: 2, valor: 663.33, forma: "Boleto", vencimento: "2024-01-13" },
      { tipo: "Corretagem", qtd: 1, valor: 663.34, forma: "Boleto", vencimento: "2024-03-13" }
    ],
    formaPagamentoEntrada: "PIX R$ 2.000 + boletos corretagem/sinal/saldo + condomínio",
    formaReembolso: "Reembolso",
    dataAssinatura: "2023-12-13",
    telefone: "(19) 991929371",
    email: "rafa.parede@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/151009-rafael-p2l-b07-0318-cota-02--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 26.678,31 — informado pelo cliente: R$ 25.275,26 (contrato) + R$ 1.403,05 (condomínio).\n" +
      "DEVOLUÇÃO: Reembolso — instrumento principal PIX.\n" +
      "Preço da fração: R$ 55.136,92. Corretagem: R$ 3.990,00.\n" +
      "Contrato de quase 3 anos (dez/2023) — valor pago informado diretamente, não calculado por parcelas.\n" +
      "Contrato assinado em Ipojuca/PE em 13/12/2023 — FORA DO PRAZO de arrependimento (venceu 20/12/2023).\n" +
      "Cônjuge (união estável): Bruno Henrique de Mattos, CPF 394.196.968-47, RG 47160334 SSP/SP, gerente comercial, nasc 16/01/1991, tel (19) 989196729.\n" +
      "Profissão: Coordenador de Planejamento. Nascimento: 10/03/1989.\n" +
      "Endereço: Rua João Batista Campos Pinto, 216, Bloco 05, Apto 53, Jardim Abaeté, Piracicaba/SP, CEP 13420264.\n" +
      "Empreendimento novo na base: Porto 2 Life Resort, Ipojuca/PE. 2 semanas de uso por ano.\n" +
      "1 quarto, área privativa 32,54m², área total 69,89m².\n" +
      "Matrícula N° R.9-2.929, Livro nº 02-E, Cartório de Registro Geral de Imóveis de Ipojuca/PE.\n" +
      "Nº PIX corretagem: E6070119020231 2131402DY5P8GC NXTW.\n" +
      "D4Sign Documento ID: 1bd08e1a-7b9a-49f2-8bd8-bdcddc99690d. Proposta nº 151009."
  },

  /* ---------- 78 — GAV — 356521 GRAN GARDEN RESORT, Bloco A1 / 103 / Cota 46 ---------- */
  {
    id: "356521-cleyce-ggr-a1-103-cota-46",
    nome: "CLEYCE CARVALHO ALVES",
    cpf: "029.699.330-12",
    rg: "02969933012 IGP/RS",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "EDSON MAURICIO ALVES CARVALHO", cpf: "019.558.210-11", rg: "01955821011 IGP/RS", email: "edsonrs.59@gmail.com" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "A1",
    apartamento: "103",
    andar: "1",
    cota: "46",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 1000.00,
    valorTotal: 75784.88,
    corretagem: 4490.00,
    sinal: 3789.26,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "Cartão de Débito VISA Electron", vencimento: "2026-08-25" },
      { tipo: "Corretagem", qtd: 5, valor: 698.00, forma: "Boleto", vencimento: "2026-10-10" },
      { tipo: "Sinal", qtd: 5, valor: 757.85, forma: "Boleto", vencimento: "2027-03-10" },
      { tipo: "Saldo", qtd: 91, valor: 741.82, forma: "Boleto", vencimento: "2027-08-10" }
    ],
    formaPagamentoEntrada: "1x R$ 1.000,00 cartão de débito VISA Electron (corretagem)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-24",
    telefone: "(51) 99228-0926",
    email: "barthcleyce@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/356521-cleyce-ggr-a1-103-cota-46--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 1 DE 2 — casal Cleyce + Edson, mesmo endereço, mesma data, mesma maquininha.\n" +
      "VALOR PAGO = R$ 1.000,00 — sua parte do cartão de débito VISA Electron (comprovante único R$ 2.000,00, CV 177756890, maquininha Laranjinha Itaú, 24/08/2026 12h29). R$ 1.000 alocado a este contrato, R$ 1.000 ao contrato do Edson (ficha 79).\n" +
      "DEVOLUÇÃO: Estorno Cartão — cartão de débito = cartão → Estorno.\n" +
      "Corretagem: R$ 4.490,00 (R$ 1.000 cartão + 5x R$ 698,00 boleto, 1ª 10/10/2026 — NÃO PAGOS).\n" +
      "Sinal: R$ 3.789,26 em 5x R$ 757,85 boleto (1ª 10/03/2027) — NÃO PAGO.\n" +
      "Saldo: R$ 67.505,62 em 91x R$ 741,82 boleto (1ª 10/08/2027) — NÃO PAGO.\n" +
      "Contrato assinado em Gramado/RS em 24/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 31/08/2026).\n" +
      "Cônjuge: Edson Mauricio Alves Carvalho (ficha 79), mesmo endereço, ambos Casado(a).\n" +
      "Profissão: Assistente Administrativo. Nascimento: 24/07/1992.\n" +
      "Endereço: Rua Assis Brasil, 81, Vila Vista Alegre, Cachoeirinha/RS, CEP 94945-570.\n" +
      "2 quartos, área privativa 86,2m², área total 126,33m².\n" +
      "ZapSign nº d7f14495-c6b1-493c-ab9b-4c7d75f1af0e. Proposta nº 356521."
  },

  /* ---------- 79 — GAV — 356518 GRAN GARDEN RESORT, Bloco A3 / 203 / Cota 09 ---------- */
  {
    id: "356518-edson-ggr-a3-203-cota-09",
    nome: "EDSON MAURICIO ALVES CARVALHO",
    cpf: "019.558.210-11",
    rg: "01955821011 IGP/RS",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "CLEYCE CARVALHO ALVES", cpf: "029.699.330-12", rg: "02969933012 IGP/RS", email: "barthcleyce@gmail.com" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "A3",
    apartamento: "203",
    andar: "2",
    cota: "09",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 1000.00,
    valorTotal: 79573.34,
    corretagem: 4490.00,
    sinal: 3978.67,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "Cartão de Débito VISA Electron", vencimento: "2026-08-25" },
      { tipo: "Corretagem", qtd: 5, valor: 698.00, forma: "Boleto", vencimento: "2026-10-10" },
      { tipo: "Sinal", qtd: 5, valor: 795.73, forma: "Boleto", vencimento: "2027-03-10" },
      { tipo: "Saldo", qtd: 91, valor: 781.37, forma: "Boleto", vencimento: "2027-08-10" }
    ],
    formaPagamentoEntrada: "1x R$ 1.000,00 cartão de débito VISA Electron (corretagem)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-24",
    telefone: "(51) 98922-3844",
    email: "edsonrs.59@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/356518-edson-ggr-a3-203-cota-09--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 2 DE 2 — casal Cleyce + Edson, mesmo endereço, mesma data, mesma maquininha.\n" +
      "VALOR PAGO = R$ 1.000,00 — sua parte do cartão de débito VISA Electron (comprovante único R$ 2.000,00, CV 177756890, maquininha Laranjinha Itaú, 24/08/2026 12h29). R$ 1.000 alocado a este contrato, R$ 1.000 ao contrato da Cleyce (ficha 78).\n" +
      "DEVOLUÇÃO: Estorno Cartão — cartão de débito = cartão → Estorno.\n" +
      "Corretagem: R$ 4.490,00 (R$ 1.000 cartão + 5x R$ 698,00 boleto, 1ª 10/10/2026 — NÃO PAGOS).\n" +
      "Sinal: R$ 3.978,67 em 5x R$ 795,73 boleto (1ª 10/03/2027) — NÃO PAGO.\n" +
      "Saldo: R$ 71.104,67 em 91x R$ 781,37 boleto (1ª 10/08/2027) — NÃO PAGO.\n" +
      "Contrato assinado em Gramado/RS em 24/08/2026 — DENTRO DO PRAZO DE 7 DIAS (vence 31/08/2026).\n" +
      "Cônjuge: Cleyce Carvalho Alves (ficha 78), mesmo endereço, ambos Casado(a).\n" +
      "Profissão: Autônomo(a). Nascimento: 11/02/1991.\n" +
      "Endereço: Rua Assis Brasil, 81, Vila Vista Alegre, Cachoeirinha/RS, CEP 94945-570.\n" +
      "2 quartos, área privativa 86,2m², área total 126,33m².\n" +
      "ZapSign nº 39675a5d-c5d9-4f09-a9b4-fec06b1c2347. Proposta nº 356518."
  },

  /* ---------- 80 — WAM — KAWANA RESIDENCE, Bloco 01 / 311 / Cota P/H (Amelia Sonia 3/3) ---------- */
  {
    id: "kawana-amelia-sonia-bloco01-311-cota-ph",
    nome: "AMELIA SONIA MADUREIRA",
    cpf: "421.923.156-00",
    rg: "MG6393230 - SSP/MG",
    nacionalidade: "brasileiro",
    estadoCivil: "Solteiro",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "KAWANA RESIDENCE",
    bloco: "Bloco 01",
    apartamento: "311",
    andar: "3",
    cota: "P/H",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "S.P.E. MIRANTE INVESTIMENTO IMOBILIÁRIOS S/A",
    cnpj: "18.622.215/0001-00",

    valorPago: 3350.00,
    valorTotal: 48174.92,
    corretagem: 3350.00,
    sinal: 150.00,
    parcelas: [
      { tipo: "Cota (entrada)", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota (saldo)", qtd: 84, valor: 531.84, forma: "Boleto", vencimento: "2026-12-15" },
      { tipo: "Intermediação", qtd: 1, valor: 3350.00, forma: "Cartão Crédito (estimado)", vencimento: "2026-08-17" }
    ],
    formaPagamentoEntrada: "Cartão crédito R$ 3.350,00 (intermediação — estimado, sem contrato)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-17",
    telefone: "(31) 99918-0983",
    email: "Carolinemadureiramoreira@gmail.com",
    arquivos: [],
    pix: "",
    observacoes:
      "CONTRATO 3 DE 3 — mesma adquirente (Amelia Sonia Madureira) com 3 contratos Kawana Residence.\n" +
      "FICHA INCOMPLETA — criada a partir de print do Termo de Distrato (GSign), sem contrato/proposta disponível. Cliente não conseguiu puxar o PDF deste contrato.\n" +
      "DADOS DO DISTRATO: Apartamento 01.311 P/H, Edifício KAWANA, Caldas Novas, WAM Caldas Novas Ltda. Fração indicada no distrato: 1/26 (2 semanas/ano).\n" +
      "VALOR PAGO = R$ 3.350,00 (ESTIMADO) — baseado no padrão das fichas 63-64 (intermediação R$ 3.350 cada). Distrato indica Estorno Cartão total R$ 10.000,00 para os 3 contratos (R$ 3.350 + R$ 3.350 + R$ 3.300 = R$ 10.000).\n" +
      "DEVOLUÇÃO: Estorno Cartão — marcado com (X) no distrato.\n" +
      "Valores de cota, sinal e saldo ESTIMADOS — copiados das fichas 63-64 (mesmo empreendimento, mesma data).\n" +
      "Contrato assinado em Caldas Novas/GO em 17/08/2026 (estimado, mesma data das fichas 63-64) — DENTRO DO PRAZO DE 7 DIAS (vence 24/08/2026).\n" +
      "Profissão: Gerente. Nascimento: 05/12/1958. Telefone 2: (31) 99700-0512.\n" +
      "ATENÇÃO: Nome no quadro-resumo = 'AMELIA', assinatura GSign = 'AMAELIA' — verificar grafia correta.\n" +
      "Dados bancários no distrato: Banco do Brasil (campo editável, ainda não confirmado).\n" +
      "PENDENTE: obter contrato/proposta original para confirmar valores exatos e forma de pagamento."
  },

  /* ---------- 81 — GAV — 343753 PORTO 2 LIFE RESORT, Bloco 01 / 0208 / Cota 23 ---------- */
  {
    id: "343753-jaison-p2l-bl01-0208-cota-23",
    nome: "JAISON LUIS GOMES PINHEIRO",
    cpf: "826.463.500-82",
    rg: "4084912197 SJS/RS",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PORTO 2 LIFE RESORT",
    bloco: "Bloco 01",
    apartamento: "0208",
    andar: "1",
    cota: "23",
    fracao: "1/52",
    localizacao: "PERNAMBUCO",

    empresa: "GAV",
    razaoSocial: "GAV MURO ALTO 2 EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "39.673.888/0001-69",

    valorPago: 0,
    valorTotal: 78015.58,
    corretagem: 3990.00,
    sinal: 3900.78,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "PIX", vencimento: "2026-06-19" },
      { tipo: "Corretagem", qtd: 4, valor: 747.50, forma: "Boleto", vencimento: "2026-07-19" },
      { tipo: "Sinal", qtd: 4, valor: 975.20, forma: "Parcelas", vencimento: "2026-11-10" },
      { tipo: "Saldo", qtd: 80, valor: 876.56, forma: "Parcelas", vencimento: "2027-03-10" }
    ],
    formaPagamentoEntrada: "PIX R$ 1.000,00 (corretagem) + Boleto 4x R$ 747,50 (corretagem)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-06-19",
    telefone: "(51) 98950-9373",
    email: "jaisonlgpinheiro@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/343753-jaison-p2l-bl01-0208-cota-23--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 1 DE 3 — mesmo adquirente (Jaison Luis Gomes Pinheiro), 3 contratos Porto 2 Life Resort.\n" +
      "VALOR PAGO = R$ 0 (PENDENTE — aguardando informação do usuário).\n" +
      "FORA DO PRAZO — contrato 19/06/2026, prazo 26/06/2026, hoje 26/08/2026 (2+ meses).\n" +
      "DEVOLUÇÃO: Reembolso — PIX é o instrumento principal.\n" +
      "Corretagem: R$ 3.990,00 (PIX R$ 1.000 + Boleto 4x R$ 747,50 = R$ 2.990).\n" +
      "PIX R$ 3.000 total rateado em 3 contratos (R$ 1.000 cada). ID transação: RESN7829500095158073RP55X6HI78641DB. Recibo maquininha Laranjinha Itaú, 19/06/2026 23h25.\n" +
      "Boleto corretagem 4x R$ 747,50 (1ª 19/07/2026) — quitação a verificar.\n" +
      "Sinal: R$ 3.900,78 em 4x R$ 975,20 (1ª 10/11/2026) — NÃO VENCIDO.\n" +
      "Saldo: R$ 70.124,80 em 80x R$ 876,56 (1ª 10/03/2027) — NÃO VENCIDO.\n" +
      "Cônjuge: Não informado (estado civil Casado, mas cônjuge não consta no contrato).\n" +
      "Profissão: Assistente Comercial. Nascimento: 24/10/1985.\n" +
      "Endereço: Rua Flor de Gazanias, 79, Bairro São Luiz, Gravataí/RS, CEP 94065464.\n" +
      "D4Sign 0db9ecb1-e5de-4185-a140-78f5790e9543. Assinatura presencial 20/06/2026 00:02:59. Proposta nº 343753."
  },

  /* ---------- 82 — GAV — 343752 PORTO 2 LIFE RESORT, Bloco 06 / 0328 / Cota 09 ---------- */
  {
    id: "343752-jaison-p2l-bl06-0328-cota-09",
    nome: "JAISON LUIS GOMES PINHEIRO",
    cpf: "826.463.500-82",
    rg: "4084912197 SJS/RS",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PORTO 2 LIFE RESORT",
    bloco: "Bloco 06",
    apartamento: "0328",
    andar: "2",
    cota: "09",
    fracao: "1/52",
    localizacao: "PERNAMBUCO",

    empresa: "GAV",
    razaoSocial: "GAV MURO ALTO 2 EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "39.673.888/0001-69",

    valorPago: 0,
    valorTotal: 78015.58,
    corretagem: 3990.00,
    sinal: 3900.78,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "PIX", vencimento: "2026-06-19" },
      { tipo: "Corretagem", qtd: 4, valor: 747.50, forma: "Boleto", vencimento: "2026-07-19" },
      { tipo: "Sinal", qtd: 4, valor: 975.20, forma: "Parcelas", vencimento: "2026-11-10" },
      { tipo: "Saldo", qtd: 80, valor: 876.56, forma: "Parcelas", vencimento: "2027-03-10" }
    ],
    formaPagamentoEntrada: "PIX R$ 1.000,00 (corretagem) + Boleto 4x R$ 747,50 (corretagem)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-06-19",
    telefone: "(51) 98950-9373",
    email: "jaisonlgpinheiro@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/343752-jaison-p2l-bl06-0328-cota-09--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 2 DE 3 — mesmo adquirente (Jaison Luis Gomes Pinheiro), 3 contratos Porto 2 Life Resort.\n" +
      "VALOR PAGO = R$ 0 (PENDENTE — aguardando informação do usuário).\n" +
      "FORA DO PRAZO — contrato 19/06/2026, prazo 26/06/2026, hoje 26/08/2026 (2+ meses).\n" +
      "DEVOLUÇÃO: Reembolso — PIX é o instrumento principal.\n" +
      "Corretagem: R$ 3.990,00 (PIX R$ 1.000 + Boleto 4x R$ 747,50 = R$ 2.990).\n" +
      "PIX R$ 3.000 total rateado em 3 contratos (R$ 1.000 cada). ID transação: RESN7829500095158073RP55X6HI78641DB.\n" +
      "Boleto corretagem 4x R$ 747,50 (1ª 19/07/2026) — quitação a verificar.\n" +
      "Sinal: R$ 3.900,78 em 4x R$ 975,20 (1ª 10/11/2026) — NÃO VENCIDO.\n" +
      "Saldo: R$ 70.124,80 em 80x R$ 876,56 (1ª 10/03/2027) — NÃO VENCIDO.\n" +
      "Cônjuge: Não informado (estado civil Casado, mas cônjuge não consta no contrato).\n" +
      "Profissão: Assistente Comercial. Nascimento: 24/10/1985.\n" +
      "Endereço: Rua Flor de Gazanias, 79, Bairro São Luiz, Gravataí/RS, CEP 94065464.\n" +
      "D4Sign 25b94431-464a-4fb9-b28e-31b8232529ef. Assinatura presencial 20/06/2026 00:01:58. Proposta nº 343752."
  },

  /* ---------- 83 — GAV — 343754 PORTO 2 LIFE RESORT, Bloco 01 / 0226 / Cota 19 ---------- */
  {
    id: "343754-jaison-p2l-bl01-0226-cota-19",
    nome: "JAISON LUIS GOMES PINHEIRO",
    cpf: "826.463.500-82",
    rg: "4084912197 SJS/RS",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PORTO 2 LIFE RESORT",
    bloco: "Bloco 01",
    apartamento: "0226",
    andar: "1",
    cota: "19",
    fracao: "1/52",
    localizacao: "PERNAMBUCO",

    empresa: "GAV",
    razaoSocial: "GAV MURO ALTO 2 EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "39.673.888/0001-69",

    valorPago: 0,
    valorTotal: 78015.58,
    corretagem: 3990.00,
    sinal: 3900.78,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1000.00, forma: "PIX", vencimento: "2026-06-19" },
      { tipo: "Corretagem", qtd: 4, valor: 747.50, forma: "Boleto", vencimento: "2026-07-19" },
      { tipo: "Sinal", qtd: 4, valor: 975.20, forma: "Parcelas", vencimento: "2026-11-10" },
      { tipo: "Saldo", qtd: 80, valor: 876.56, forma: "Parcelas", vencimento: "2027-03-10" }
    ],
    formaPagamentoEntrada: "PIX R$ 1.000,00 (corretagem) + Boleto 4x R$ 747,50 (corretagem)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-06-19",
    telefone: "(51) 98950-9373",
    email: "jaisonlgpinheiro@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/343754-jaison-p2l-bl01-0226-cota-19--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 3 DE 3 — mesmo adquirente (Jaison Luis Gomes Pinheiro), 3 contratos Porto 2 Life Resort.\n" +
      "VALOR PAGO = R$ 0 (PENDENTE — aguardando informação do usuário).\n" +
      "FORA DO PRAZO — contrato 19/06/2026, prazo 26/06/2026, hoje 26/08/2026 (2+ meses).\n" +
      "DEVOLUÇÃO: Reembolso — PIX é o instrumento principal.\n" +
      "Corretagem: R$ 3.990,00 (PIX R$ 1.000 + Boleto 4x R$ 747,50 = R$ 2.990).\n" +
      "PIX R$ 3.000 total rateado em 3 contratos (R$ 1.000 cada). ID transação: RESN7829500095158073RP55X6HI78641DB.\n" +
      "Boleto corretagem 4x R$ 747,50 (1ª 19/07/2026) — quitação a verificar.\n" +
      "Sinal: R$ 3.900,78 em 4x R$ 975,20 (1ª 10/11/2026) — NÃO VENCIDO.\n" +
      "Saldo: R$ 70.124,80 em 80x R$ 876,56 (1ª 10/03/2027) — NÃO VENCIDO.\n" +
      "Cônjuge: Não informado (estado civil Casado, mas cônjuge não consta no contrato).\n" +
      "Profissão: Assistente Comercial. Nascimento: 24/10/1985.\n" +
      "Endereço: Rua Flor de Gazanias, 79, Bairro São Luiz, Gravataí/RS, CEP 94065464.\n" +
      "D4Sign b76ce9da-80ba-4d43-bc04-e5d3494759a9. Assinatura presencial 20/06/2026 00:04:42. Proposta nº 343754."
  },

  /* ---------- 84 — WAM — 312559 PRAIAS DO LAGO ECO RESORT, Bloco M / 003 / Cota 06 ---------- */
  {
    id: "312559-lucio-praias-lago-m-003-cota-06",
    nome: "LUCIO DE BARROS GONCALVES",
    cpf: "091.332.316-05",
    rg: "15855928 SSP/MG",
    nacionalidade: "brasileiro",
    estadoCivil: "Solteiro",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "M",
    apartamento: "003",
    andar: "",
    cota: "06",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 5280.00,
    valorTotal: 51726.75,
    corretagem: 5280.00,
    sinal: 0,
    parcelas: [
      { tipo: "Cota (entrada)", qtd: 5, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota (saldo)", qtd: 88, valor: 524.96, forma: "Boleto", vencimento: "2027-02-20" },
      { tipo: "Intermediação", qtd: 1, valor: 1500.00, forma: "Espécie/Dinheiro", vencimento: "2026-08-25" },
      { tipo: "Intermediação", qtd: 11, valor: 343.63, forma: "Cartão de Crédito Cielo", vencimento: "2026-08-25" }
    ],
    formaPagamentoEntrada: "1x R$ 1.500,00 espécie/dinheiro + 11x R$ 343,63 cartão crédito Cielo (intermediação)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-25",
    telefone: "(31) 99582-5437",
    email: "luciobarros70@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/312559-lucio-praias-lago-m-003-cota-06--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 5.280,00 — intermediação: R$ 1.500 espécie/dinheiro + 11x R$ 343,63 cartão crédito Cielo (R$ 3.779,93). Total contratual R$ 5.280,00.\n" +
      "DEVOLUÇÃO: Reembolso — espécie/dinheiro é o instrumento principal (listado primeiro). Cartão crédito R$ 3.779,93 pode ser estornado separadamente.\n" +
      "DENTRO DO PRAZO — contrato 25/08/2026, prazo 01/09/2026, hoje 26/08/2026.\n" +
      "Preço da Cota (sem intermediação): R$ 46.446,75.\n" +
      "Cota entrada: 5x R$ 50,00 boleto (1ª 15/09/2026) — NÃO VENCIDO.\n" +
      "Cota saldo: 88x R$ 524,96 boleto (1ª 20/02/2027) — NÃO VENCIDO.\n" +
      "Intermediadora: WAM COMERCIALIZAÇÃO S.A., CNPJ 17.919.649/0001-03.\n" +
      "Contrato indica 3 semanas de uso por ano (campo fracao mantido como 1/52 por padrão).\n" +
      "Inclui Passaporte Náutico Praia Clube (nº 09-M003/06), vinculado à cota.\n" +
      "Profissão: Empresário. Nascimento: 20/04/1990.\n" +
      "Endereço: Rua São Martinho, 49 - Jardim das Alterosas 1ª Seção, Betim/MG, CEP 32670738.\n" +
      "GSign ID: 7EHYD8DX06-C18ZUY5-BD38NZKETS1VPH-7Y7FZ. Contrato nº 312559."
  },

  /* ---------- 85 — GAV — 356096 AREYA BARRA RESORT, Bloco 01 / 247 / Cota 09 ---------- */
  {
    id: "356096-antonio-areya-bl01-247-cota-09",
    nome: "ANTONIO VICENTE FERREIRA JUNIOR",
    cpf: "088.429.364-56",
    rg: "8233254 SDS/PE",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "247",
    andar: "2",
    cota: "09",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1995.00,
    valorTotal: 56682.42,
    corretagem: 1995.00,
    sinal: 2834.14,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1995.00, forma: "Cartão MASTER Crédito à Vista", vencimento: "2026-09-21" },
      { tipo: "Sinal", qtd: 4, valor: 708.54, forma: "Parcelas", vencimento: "2026-10-10" },
      { tipo: "Saldo", qtd: 74, valor: 700.72, forma: "Parcelas", vencimento: "2027-02-10" }
    ],
    formaPagamentoEntrada: "1x R$ 1.995,00 cartão MASTER crédito à vista (corretagem)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-22",
    telefone: "(87) 98876-2863",
    email: "junior-arara@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/356096-antonio-areya-bl01-247-cota-09--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 1 DE 3 — mesmo adquirente (Antonio Vicente Ferreira Junior), 3 contratos Areya Barra Resort.\n" +
      "VALOR PAGO = R$ 1.995,00 — cartão MASTER crédito à vista (corretagem). Cartão = valor cheio.\n" +
      "DEVOLUÇÃO: Estorno Cartão — cartão crédito → Estorno.\n" +
      "DENTRO DO PRAZO — contrato 22/08/2026, prazo 29/08/2026. ÚLTIMO DIA HOJE (29/08).\n" +
      "Corretagem: R$ 1.995,00 (1x cartão MASTER, Nº Doc 22963094, venc 21/09/2026).\n" +
      "ATENÇÃO: Nº Documento 22963094 é o MESMO nos 3 contratos — verificar se foi 1 transação ou 3 separadas.\n" +
      "Sinal: R$ 2.834,14 em 4x R$ 708,54 (1ª 10/10/2026) — NÃO VENCIDO.\n" +
      "Saldo: R$ 51.853,28 em 74x R$ 700,72 (1ª 10/02/2027) — NÃO VENCIDO.\n" +
      "2 quartos, área privativa 81,8m², área total 177,3m².\n" +
      "Cônjuge: Não informado (estado civil Casado, mas cônjuge não consta no contrato).\n" +
      "Profissão: Empresário. Nascimento: 24/10/1994.\n" +
      "Endereço: Rua Santana, 713, Mercadinho Santo Antonio, Alto da Boa Vista, Araripina/PE, CEP 56287020.\n" +
      "ZapSign d7201d91-ca73-41aa-9802-0a310d4cf655. Proposta nº 356096."
  },

  /* ---------- 86 — GAV — 356095 AREYA BARRA RESORT, Bloco 01 / 247 / Cota 31 ---------- */
  {
    id: "356095-antonio-areya-bl01-247-cota-31",
    nome: "ANTONIO VICENTE FERREIRA JUNIOR",
    cpf: "088.429.364-56",
    rg: "8233254 SDS/PE",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "247",
    andar: "2",
    cota: "31",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1995.00,
    valorTotal: 56682.42,
    corretagem: 1995.00,
    sinal: 2834.14,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 1995.00, forma: "Cartão MASTER Crédito à Vista", vencimento: "2026-09-21" },
      { tipo: "Sinal", qtd: 4, valor: 708.54, forma: "Parcelas", vencimento: "2026-10-10" },
      { tipo: "Saldo", qtd: 74, valor: 700.72, forma: "Parcelas", vencimento: "2027-02-10" }
    ],
    formaPagamentoEntrada: "1x R$ 1.995,00 cartão MASTER crédito à vista (corretagem)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-22",
    telefone: "(87) 98876-2863",
    email: "junior-arara@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/356095-antonio-areya-bl01-247-cota-31--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 2 DE 3 — mesmo adquirente (Antonio Vicente Ferreira Junior), 3 contratos Areya Barra Resort.\n" +
      "VALOR PAGO = R$ 1.995,00 — cartão MASTER crédito à vista (corretagem). Cartão = valor cheio.\n" +
      "DEVOLUÇÃO: Estorno Cartão — cartão crédito → Estorno.\n" +
      "DENTRO DO PRAZO — contrato 22/08/2026, prazo 29/08/2026. ÚLTIMO DIA HOJE (29/08).\n" +
      "Corretagem: R$ 1.995,00 (1x cartão MASTER, Nº Doc 22963094, venc 21/09/2026).\n" +
      "ATENÇÃO: Nº Documento 22963094 é o MESMO nos 3 contratos — verificar se foi 1 transação ou 3 separadas.\n" +
      "Sinal: R$ 2.834,14 em 4x R$ 708,54 (1ª 10/10/2026) — NÃO VENCIDO.\n" +
      "Saldo: R$ 51.853,28 em 74x R$ 700,72 (1ª 10/02/2027) — NÃO VENCIDO.\n" +
      "Mesmo apartamento 247 da ficha 85, cota diferente (31 vs 09).\n" +
      "2 quartos, área privativa 81,8m², área total 177,3m².\n" +
      "Cônjuge: Não informado (estado civil Casado, mas cônjuge não consta no contrato).\n" +
      "Profissão: Empresário. Nascimento: 24/10/1994.\n" +
      "Endereço: Rua Santana, 713, Mercadinho Santo Antonio, Alto da Boa Vista, Araripina/PE, CEP 56287020.\n" +
      "ZapSign e91e8839-6964-4eb4-88ef-aa726068f836. Proposta nº 356095."
  },

  /* ---------- 87 — GAV — 356097 AREYA BARRA RESORT, Bloco 01 / 312 / Cota 13 ---------- */
  {
    id: "356097-antonio-areya-bl01-312-cota-13",
    nome: "ANTONIO VICENTE FERREIRA JUNIOR",
    cpf: "088.429.364-56",
    rg: "8233254 SDS/PE",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "312",
    andar: "3",
    cota: "13",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 3990.00,
    valorTotal: 48752.68,
    corretagem: 3990.00,
    sinal: 2437.64,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 3990.00, forma: "Cartão MASTER Crédito à Vista", vencimento: "2026-09-21" },
      { tipo: "Sinal", qtd: 4, valor: 609.41, forma: "Parcelas", vencimento: "2026-10-10" },
      { tipo: "Saldo", qtd: 74, valor: 571.96, forma: "Parcelas", vencimento: "2027-02-10" }
    ],
    formaPagamentoEntrada: "1x R$ 3.990,00 cartão MASTER crédito à vista (corretagem)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-22",
    telefone: "(87) 98876-2863",
    email: "junior-arara@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/356097-antonio-areya-bl01-312-cota-13--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 3 DE 3 — mesmo adquirente (Antonio Vicente Ferreira Junior), 3 contratos Areya Barra Resort.\n" +
      "VALOR PAGO = R$ 3.990,00 — cartão MASTER crédito à vista (corretagem). Cartão = valor cheio.\n" +
      "DEVOLUÇÃO: Estorno Cartão — cartão crédito → Estorno.\n" +
      "DENTRO DO PRAZO — contrato 22/08/2026, prazo 29/08/2026. ÚLTIMO DIA HOJE (29/08).\n" +
      "Corretagem: R$ 3.990,00 (1x cartão MASTER, Nº Doc 22963094, venc 21/09/2026).\n" +
      "ATENÇÃO: Nº Documento 22963094 é o MESMO nos 3 contratos — verificar se foi 1 transação ou 3 separadas.\n" +
      "Sinal: R$ 2.437,64 em 4x R$ 609,41 (1ª 10/10/2026) — NÃO VENCIDO.\n" +
      "Saldo: R$ 42.325,04 em 74x R$ 571,96 (1ª 10/02/2027) — NÃO VENCIDO.\n" +
      "Apartamento diferente (312, 1 quarto) dos contratos 85-86 (247, 2 quartos). Período 2 semanas/ano.\n" +
      "1 quarto, área privativa 34,01m², área total 73,72m².\n" +
      "Cônjuge: Não informado (estado civil Casado, mas cônjuge não consta no contrato).\n" +
      "Profissão: Empresário. Nascimento: 24/10/1994.\n" +
      "Endereço: Rua Santana, 713, Mercadinho Santo Antonio, Alto da Boa Vista, Araripina/PE, CEP 56287020.\n" +
      "ZapSign 812e5702-4028-483f-a89a-05c5edbdb23d. Proposta nº 356097."
  },

  /* ---------- 88 — GAV — 356601 AREYA BARRA RESORT, Bloco 01 / 213 / Cota 14 ---------- */
  {
    id: "356601-wellington-areya-bl01-213-cota-14",
    nome: "WELLINGTON DEBLA DOS SANTOS",
    cpf: "072.269.669-80",
    rg: "93815980 SESP/PR",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "MIRIAM NOEMI DEBLA DOS SANTOS", cpf: "039.473.339-86", rg: "90900749 SESP/PR", email: "miriam.220817@gmail.com" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "213",
    andar: "2",
    cota: "14",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 3990.00,
    valorTotal: 50405.59,
    corretagem: 3990.00,
    sinal: 2520.27,
    parcelas: [
      { tipo: "Corretagem (PIX)", qtd: 1, valor: 2000.00, forma: "PIX", vencimento: "2026-08-25" },
      { tipo: "Corretagem (Cartão)", qtd: 3, valor: 663.33, forma: "Cartão MASTER Crédito Parcelado", vencimento: "2026-08-25" },
      { tipo: "Sinal", qtd: 4, valor: 630.07, forma: "Parcelas", vencimento: "2026-12-10" },
      { tipo: "Saldo", qtd: 74, valor: 593.18, forma: "Parcelas", vencimento: "2027-04-10" }
    ],
    formaPagamentoEntrada: "1x R$ 2.000,00 PIX + 3x R$ 663,33 cartão MASTER crédito parcelado (corretagem)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-25",
    telefone: "(44) 99998-8089",
    email: "wellington.debla@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/356601-wellington-areya-bl01-213-cota-14--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990,00 — corretagem: R$ 2.000 PIX + R$ 1.990 cartão MASTER crédito parcelado 3x R$ 663,33 (final 6230, CV 178135370).\n" +
      "PIX = instrumento principal (R$ 2.000 > R$ 1.990 cartão) → Reembolso. Cartão R$ 1.990 pode ser estornado separadamente.\n" +
      "DENTRO DO PRAZO — contrato 25/08/2026, prazo 01/09/2026, hoje 29/08/2026.\n" +
      "PIX: R$ 2.000,00 em 25/08/2026, ID RESV1046620094845425LHGRV9S3EE45D27, CV 22470586, CPF 072.269.669-80.\n" +
      "Cartão: R$ 1.990,00 MASTERCARD final 6230, crédito parcelado estabelecimento, CV 178135370, 25/08/2026 12h33.\n" +
      "Sinal: R$ 2.520,27 em 4x R$ 630,07 (1ª 10/12/2026) — NÃO VENCIDO.\n" +
      "Saldo: R$ 43.895,32 em 74x R$ 593,18 (1ª 10/04/2027) — NÃO VENCIDO.\n" +
      "1 quarto, área privativa 34,01m², área total 73,72m². Período 2 semanas/ano.\n" +
      "Cônjuge: Miriam Noemi Debla dos Santos, CPF 039.473.339-86, RG 90900749 SESP/PR, professora, nasc. 20/08/1982, tel. (44) 99916-1802.\n" +
      "Profissão: Autônomo. Nascimento: 24/11/1988.\n" +
      "Endereço: Rua Jose Cividanes, SN, Casa, Jardim Yamanaka, Marialva/PR, CEP 86990-000.\n" +
      "Consultora: Cassia Sanches Pamplona.\n" +
      "ZapSign 985358c1-3046-4b9d-b4e3-96b788504c89. Proposta nº 356601."
  },

  /* ---------- 89 — GAV — 357136 PORTO 2 LIFE RESORT, Bloco 05 / 0321 / Cota 19 ---------- */
  {
    id: "357136-leandro-p2l-bl05-321-cota-19",
    nome: "LEANDRO LINHARES DE LIMA",
    cpf: "386.020.608-74",
    rg: "38602060874 SSP/SP",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PORTO 2 LIFE RESORT",
    bloco: "Bloco 05",
    apartamento: "0321",
    andar: "2",
    cota: "19",
    fracao: "1/52",
    localizacao: "PERNAMBUCO",

    empresa: "GAV",
    razaoSocial: "GAV MURO ALTO 2 EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "39.673.888/0001-69",

    valorPago: 3990.00,
    valorTotal: 85246.73,
    corretagem: 3990.00,
    sinal: 4262.33,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 3990.00, forma: "Cartão VISA Crédito à Vista", vencimento: "2026-09-27" },
      { tipo: "Sinal", qtd: 4, valor: 1065.58, forma: "Parcelas", vencimento: "2026-09-09" },
      { tipo: "Saldo", qtd: 80, valor: 962.43, forma: "Parcelas", vencimento: "2027-01-10" }
    ],
    formaPagamentoEntrada: "1x R$ 3.990,00 cartão VISA crédito à vista (corretagem)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-28",
    telefone: "(11) 94962-1897",
    email: "le3linhares@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/357136-leandro-p2l-bl05-321-cota-19--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990,00 — cartão VISA crédito à vista (corretagem). Cartão = valor cheio.\n" +
      "DEVOLUÇÃO: Estorno Cartão — cartão crédito → Estorno.\n" +
      "DENTRO DO PRAZO — contrato 28/08/2026, prazo 04/09/2026, hoje 29/08/2026.\n" +
      "Corretagem: R$ 3.990,00 (1x VISA crédito à vista, final 6134, CV 190054654, Nº Doc 190054654, 28/08/2026 16h47).\n" +
      "Sinal: R$ 4.262,33 em 4x R$ 1.065,58 (1ª 09/09/2026) — NÃO VENCIDO.\n" +
      "Saldo: R$ 76.994,40 em 80x R$ 962,43 (1ª 10/01/2027) — NÃO VENCIDO.\n" +
      "ATENÇÃO: RG informado igual ao CPF (38602060874) — possível erro de preenchimento ou uso do CPF como documento de identidade.\n" +
      "Cônjuge: Casado(a) mas dados do cônjuge NÃO informados no contrato.\n" +
      "1 quarto, área privativa 32,54m², área total 69,89m². Período 2 semanas/ano.\n" +
      "Profissão: Agente de Segurança. Nascimento: 06/08/1989.\n" +
      "Endereço: Rua Elvis Presley, 15, Centreville, Santo André/SP, CEP 09120-100.\n" +
      "Consultor: Raynner R S de Araujo Consul.\n" +
      "Beneficiários corretagem: Mathews Gomes Parreira, Raynner R S de Araujo Consul, Cesar Oliveira da S, Patricia Cardoso de Araujo.\n" +
      "ZapSign 941a9b0c-8079-4ff1-a354-16b8cf16e300. Proposta nº 357136."
  },

  /* ---------- 90 — WAM — 313476 BÚZIOS FRACTIONAL RESORT, Bloco 03 / 3108 / Cota 09 ---------- */
  {
    id: "313476-daniel-buzios-bl03-3108-cota-09",
    nome: "DANIEL PRAVATO",
    cpf: "133.438.927-69",
    rg: "21301927",
    nacionalidade: "brasileiro",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "BÚZIOS FRACTIONAL RESORT",
    bloco: "Bloco 03",
    apartamento: "3108",
    andar: "",
    cota: "09",
    fracao: "1/52",
    localizacao: "RIO DE JANEIRO",

    empresa: "WAM",
    razaoSocial: "W50 EMPREENDIMENTOS IMOBILIARIOS LTDA",
    cnpj: "33.770.634/0001-82",

    valorPago: 3920.00,
    valorTotal: 36533.79,
    corretagem: 3920.00,
    sinal: 0,
    parcelas: [
      { tipo: "Intermediação (depósito)", qtd: 1, valor: 280.00, forma: "Depósito Bancário/Transferência", vencimento: "2026-08-29" },
      { tipo: "Intermediação (recorrente)", qtd: 9, valor: 404.44, forma: "Crédito Recorrente", vencimento: "2026-08-29" },
      { tipo: "Cota (entrada)", qtd: 5, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota (saldo)", qtd: 96, valor: 377.96, forma: "Boleto", vencimento: "2027-02-20" }
    ],
    formaPagamentoEntrada: "1x R$ 280,00 depósito/transferência + 9x R$ 404,44 crédito recorrente (intermediação)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-29",
    telefone: "(22) 99962-9854",
    email: "thalitamaia09@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/313476-daniel-buzios-bl03-3108-cota-09--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.920,00 — intermediação: R$ 280 depósito/transferência + 9x R$ 404,44 crédito recorrente (R$ 3.639,96). Recorrente = valor cheio.\n" +
      "DEVOLUÇÃO: Reembolso — depósito/transferência é o instrumento listado primeiro. Crédito recorrente R$ 3.639,96 pode ser estornado separadamente.\n" +
      "DENTRO DO PRAZO — contrato 29/08/2026, prazo 05/09/2026, hoje 30/08/2026.\n" +
      "Preço da Cota (sem intermediação): R$ 36.533,79.\n" +
      "Cota entrada: 5x R$ 50,00 boleto (1ª 15/09/2026) — NÃO VENCIDO.\n" +
      "Cota saldo: 96x R$ 377,96 boleto (1ª 20/02/2027) — NÃO VENCIDO.\n" +
      "ATENÇÃO: Estado civil CASADO mas cônjuge NÃO informado. Arquivo diz 'SOLTEIRO' no título — contradição.\n" +
      "ATENÇÃO: Email (thalitamaia09@hotmail.com) parece ser de terceiro/cônjuge (Thalita?), não do adquirente Daniel.\n" +
      "ATENÇÃO: RG incompleto — '21301927' sem órgão expedidor.\n" +
      "Empreendimento em RETROFIT (reforma) — contrato contém cláusula de anuência com retrofit.\n" +
      "Nome comercial: Búzios Beach Resort. Nome legal: Búzios Fractional Resort.\n" +
      "Vendedora: W50 Empreendimentos Imobiliários Ltda. Intermediadora: WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Semanas de uso: 1 por ano. Habite-se nº 002/2010 (13/03/2010).\n" +
      "Telefone secundário: (22) 99900-7309.\n" +
      "Profissão: Almoxarife. Nascimento: 01/10/1986.\n" +
      "Testemunhas: Jean Philippe Leon Koch, Yasmin Lorrane Silva Gomes (CPF 058.624.011-05).\n" +
      "GSign ID: I8YII1ABQW-J0NTORF-X403AZPT610W0M-3OZI2. Contrato nº 313476."
  },

  /* ---------- 91 — WAM — ONDAS PRAIA RESORT, Bloco B / B228 / Cota 10 ---------- */
  {
    id: "ondas-juslaine-bl-b-b228-cota-10",
    nome: "JUSLAINE APARECIDA GONCALVES",
    cpf: "048.078.706-96",
    rg: "10968190 SSP/MG",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "TIAGO HONORATO DA SILVA SANTOS", cpf: "073.404.306-60", rg: "14473580 SSP/MG", email: "TIAGONACAPA@GMAIL.COM" },

    empreendimento: "ONDAS PRAIA RESORT",
    bloco: "Bloco B",
    apartamento: "B228",
    andar: "",
    cota: "10",
    fracao: "1/52",
    localizacao: "BAHIA",

    empresa: "WAM",
    razaoSocial: "SPE PORTO SEGURO 02 EMPREENDIMENTOS IMOBILIÁRIOS S.A.",
    cnpj: "22.059.167/0001-60",

    valorPago: 1000.00,
    valorTotal: 62663.17,
    corretagem: 7650.00,
    sinal: 0,
    parcelas: [
      { tipo: "Intermediação (depósito)", qtd: 1, valor: 1000.00, forma: "Depósito Bancário/Transferência", vencimento: "2026-08-23" },
      { tipo: "Intermediação (boleto)", qtd: 9, valor: 738.88, forma: "Boleto - Cobrança W Palmerston", vencimento: "" },
      { tipo: "Cota (entrada)", qtd: 5, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota (saldo)", qtd: 96, valor: 650.14, forma: "Boleto", vencimento: "2027-02-10" }
    ],
    formaPagamentoEntrada: "1x R$ 1.000,00 depósito/transferência + 9x R$ 738,88 boleto W Palmerston (intermediação)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-23",
    telefone: "(37) 99127-5997",
    email: "JUSLANEAG23@gmail.com",
    arquivos: [
      { titulo: "Contrato (fotos)", arquivo: "contratos-pdf/ondas-juslaine-bl-b-b228-cota-10--contrato.zip" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 — depósito/transferência (intermediação). Boletos: só o quitado — sem confirmação de quais foram pagos.\n" +
      "DEVOLUÇÃO: Reembolso — depósito/transferência → Reembolso.\n" +
      "DENTRO DO PRAZO — contrato 23/08/2026, prazo 30/08/2026. ÚLTIMO DIA HOJE (30/08)!\n" +
      "Intermediação total: R$ 7.650,00 (1x R$ 1.000 depósito + 9x R$ 738,88 boleto W Palmerston).\n" +
      "Intermediadora: WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Preço da Cota (sem intermediação): R$ 62.663,17.\n" +
      "Cota entrada: 5x R$ 50,00 boleto (1ª 15/09/2026) — NÃO VENCIDO.\n" +
      "Cota saldo: 96x R$ 650,14 boleto (1ª 10/02/2027) — NÃO VENCIDO.\n" +
      "CONTRATO ENVIADO EM FOTOS (23 imagens JPG em ZIP), não em PDF.\n" +
      "Cônjuge anuente: Tiago Honorato da Silva Santos, CPF 073.404.306-60, RG 14473580 SSP/MG, mecânico, nasc. 15/10/1984, tel. (37) 99126-0298.\n" +
      "Regime de bens: Comunhão Parcial.\n" +
      "ATENÇÃO: Email do contrato é JUSLANEAG23 (sem I) — possível grafia intencional ou erro.\n" +
      "Profissão: Professora. Nascimento: 13/02/1980.\n" +
      "Habite-se: 00046/2021 a 00611/2021 (02/03/2021).\n" +
      "Testemunhas: Abqueila Amorim, Alan Guilherme Guimarães (CPF 416.740.568-77).\n" +
      "GSign Juslaine: P2BZHIHY5BZ6. GSign Tiago: W7Q2XG8YRX3P.\n" +
      "GSign Documento ID: FE7FFUP4GD-STEJLJI-3ZME5G81O2NAYL-6GO3N."
  },

  /* ---------- 92 — GAV — 357323 AREYA BARRA RESORT, Bloco 01 / 548 / Cota 47 ---------- */
  {
    id: "357323-carla-areya-bl01-548-cota-47",
    nome: "CARLA RODRIGUES LIMA",
    cpf: "091.745.714-51",
    rg: "36066567 SSP/AL",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "AGEU HAMED CAMPOS DE MELO", cpf: "121.481.914-11", rg: "38276089 SEDS/AL", email: "ageuhamed03@gmail.com" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "548",
    andar: "5",
    cota: "47",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1000.00,
    valorTotal: 29870.98,
    corretagem: 3990.00,
    sinal: 1493.54,
    parcelas: [
      { tipo: "Corretagem (PIX)", qtd: 1, valor: 500.00, forma: "PIX", vencimento: "2026-08-29" },
      { tipo: "Corretagem (Cartão)", qtd: 1, valor: 500.00, forma: "Cartão MASTER Crédito à Vista", vencimento: "2026-09-29" },
      { tipo: "Corretagem (Boleto)", qtd: 5, valor: 598.00, forma: "Boleto", vencimento: "2026-10-10" },
      { tipo: "Sinal", qtd: 4, valor: 373.38, forma: "Parcelas", vencimento: "2027-03-10" },
      { tipo: "Saldo", qtd: 74, valor: 329.56, forma: "Parcelas", vencimento: "2027-07-10" }
    ],
    formaPagamentoEntrada: "1x R$ 500,00 PIX + 1x R$ 500,00 cartão MASTER crédito à vista + 5x R$ 598,00 boleto (corretagem)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-29",
    telefone: "(82) 99361-0437",
    email: "carlarodrigueslima1@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/357323-carla-areya-bl01-548-cota-47--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 — corretagem: R$ 500 PIX + R$ 500 cartão MASTER ****4060 crédito à vista. Boleto 5x R$ 598 (1ª 10/10/2026) — NÃO VENCIDO.\n" +
      "DEVOLUÇÃO: Reembolso — PIX é o instrumento listado primeiro (R$ 500 PIX = R$ 500 cartão). Cartão R$ 500 pode ser estornado separadamente.\n" +
      "DENTRO DO PRAZO — contrato 29/08/2026, prazo 05/09/2026, hoje 31/08/2026.\n" +
      "PIX: R$ 500,00 em 29/08/2026 17:28, ID RESV098332009484542S8UK6BAVI7B0E11F, CV 193807006, Aute 956385.\n" +
      "Cartão: R$ 500,00 MASTERCARD ****4060 crédito à vista, CV 193770212, Aute 956384/AUTO 937091, 29/08/2026 17:28.\n" +
      "Terminal: SV098332, Estab 94845425, GAV BARRA DE SA, GOIANIA/GO.\n" +
      "Sinal: R$ 1.493,54 em 4x R$ 373,38 (1ª 10/03/2027) — NÃO VENCIDO.\n" +
      "Saldo: R$ 24.387,44 em 74x R$ 329,56 (1ª 10/07/2027) — NÃO VENCIDO.\n" +
      "1 quarto, área privativa 35,37m², área total 76,66m².\n" +
      "Cônjuge anuente: Ageu Hamed Campos de Melo, CPF 121.481.914-11, RG 38276089 SEDS/AL, cirurgião dentista, nasc. 12/03/1999, tel. (82) 98733-2730.\n" +
      "Profissão: Cirurgião dentista. Nascimento: 15/03/1995.\n" +
      "Endereço: Avenida Maceio, 397, Bloco 5 apto 403, Tabuleiro do Martins, Maceio/AL, CEP 57061110.\n" +
      "Consultor: Leonardo Vidal Agostini.\n" +
      "ZapSign 7a365e9e-d544-4d10-aa3e-8462c2cecc4a. Status: Em-Curso (3/5 assinaturas). Pendentes: Robert Tomazi de Oliveira, Jerlandia Kelly de Oliveira Amarante.\n" +
      "Recibo Guia Flow TOKEN: 2RY6MTEUZ4VDA870373D. Proposta nº 357323."
  },

  /* ---------- 93 — GAV — 356396 GRAN GARDEN RESORT, Bloco A2 / 005 / Cota 17 ---------- */
  {
    id: "356396-vanessa-ggr-a2-005-cota-17",
    nome: "VANESSA MIRANDA DE ALMEIDA",
    cpf: "091.386.937-63",
    rg: "123424319 DETRAN/RJ",
    nacionalidade: "brasileira",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "Bloco A2",
    apartamento: "005",
    andar: "T",
    cota: "17",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 4490.00,
    valorTotal: 76732.22,
    corretagem: 4490.00,
    sinal: 3836.61,
    parcelas: [
      { tipo: "Corretagem (PIX)", qtd: 1, valor: 4490.00, forma: "PIX", vencimento: "2026-08-23" },
      { tipo: "Sinal", qtd: 5, valor: 767.32, forma: "Parcelas", vencimento: "2026-09-10" },
      { tipo: "Saldo", qtd: 91, valor: 751.71, forma: "Parcelas", vencimento: "2027-02-10" }
    ],
    formaPagamentoEntrada: "1x R$ 4.490,00 PIX (corretagem)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-23",
    telefone: "(21) 97319-3993",
    email: "vanessamirandagata@hotmail.com",
    arquivos: [],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 4.490,00 — PIX corretagem (o que passou). PIX = valor integral.\n" +
      "DEVOLUÇÃO: Reembolso — PIX → Reembolso.\n" +
      "FORA DO PRAZO — contrato 23/08/2026, prazo 30/08/2026, hoje 31/08/2026 (1 dia fora).\n" +
      "PIX: R$ 4.490,00 em 23/08/2026, Nº Doc RESV0820700093/81489586KLI2HH/AB5BF45.\n" +
      "Sinal: R$ 3.836,61 em 5x R$ 767,32 (1ª 10/09/2026) — NÃO VENCIDO.\n" +
      "Saldo: R$ 68.405,61 em 91x R$ 751,71 (1ª 10/02/2027) — NÃO VENCIDO.\n" +
      "2 quartos, área privativa 86,2m², área total 126,33m².\n" +
      "Cônjuge: NÃO INFORMADO (estado civil União estável).\n" +
      "Profissão: Eletricista. Nascimento: 02/03/1981.\n" +
      "Endereço: Rua Duarte Pereira, 165, Wona, Belford Roxo/RJ, CEP 26175090.\n" +
      "Empreendimento em Gramado/RS: Estrada da Olaria, Bairro Mato Queimado, CEP 95.670-000.\n" +
      "ATENÇÃO: PDF/arquivo do contrato NÃO fornecido — contrato enviado apenas como imagem no chat.\n" +
      "ZapSign (parcial): 17811037-c331-...-2598ed955520 (ID sobreposto por texto na imagem). Proposta nº 356396."
  }
];
