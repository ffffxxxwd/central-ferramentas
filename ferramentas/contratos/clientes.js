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
  },

  /* ---------- 94 — WAM — 313385 HOTEL DOM PEDRO LAGUNA, Bloco 01 / 107 / Cota 10 ---------- */
  {
    id: "313385-maria-luana-dpl-bl01-107-cota-10",
    nome: "MARIA LUANA MOURA DE MAGALHÃES DOS SANTOS",
    cpf: "115.650.694-80",
    rg: "4340075 SSP/PB",
    nacionalidade: "brasileira",
    estadoCivil: "Solteiro(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "HOTEL DOM PEDRO LAGUNA",
    bloco: "Bloco 01",
    apartamento: "107",
    andar: "",
    cota: "10",
    fracao: "1/52",
    localizacao: "CEARÁ",

    empresa: "WAM",
    razaoSocial: "CONSÓRCIO DOM PEDRO LAGUNA",
    cnpj: "43.740.923/0001-92",

    valorPago: 5200.00,
    valorTotal: 25206.94,
    corretagem: 2600.00,
    sinal: 0,
    parcelas: [
      { tipo: "Corretagem", qtd: 3, valor: 866.66, forma: "Cartão de Crédito Cielo", vencimento: "2026-08-29" },
      { tipo: "Saldo (CDU)", qtd: 98, valor: 227.62, forma: "Parcelas", vencimento: "2027-03-20" }
    ],
    formaPagamentoEntrada: "3x R$ 866,66 cartão de crédito Cielo (corretagem)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-29",
    telefone: "(87) 99600-0182",
    email: "MARIALUANA20166@OUTLOOK.COM",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/313385-maria-luana-dpl-bl01-107-cota-10--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO DE CESSÃO DE DIREITO DE USO (TIME-SHARE) — diferente de multipropriedade fracionada. Prazo determinado de 10 anos, 1 semana/ano.\n" +
      "VALOR PAGO = R$ 5.200,00 — informado pelo usuário (contrato mostra apenas corretagem R$ 2.600; valor real pago é R$ 5.200).\n" +
      "DEVOLUÇÃO: Estorno Cartão — cartão crédito → Estorno.\n" +
      "DENTRO DO PRAZO — contrato 29/08/2026, prazo 05/09/2026, hoje 31/08/2026.\n" +
      "Preço total CDU (sem intermediação): R$ 22.606,94.\n" +
      "Saldo: R$ 22.606,94 em 98x R$ 227,62 (1ª 20/03/2027) — NÃO VENCIDO.\n" +
      "Entrada: Inexistente.\n" +
      "Beneficiária corretagem: W7 Brasil Negócios Inteligentes Ltda.\n" +
      "Tipo: DELUXE - 1Q (1 quarto, 1 banheiro, 1 varanda).\n" +
      "CDU original: Bloco 01107/Cota 10 (interpretado como Bloco 01, Apt 107, Cota 10).\n" +
      "Contrato nº 01-01.107/10. Número 313385.\n" +
      "Cedente líder: Dom Pedro Laguna Resort Empreendimentos Imobiliários Ltda, CNPJ 41.928.634/0001-96.\n" +
      "Hotel: Av. Marginal Aquiraz Riviera, Lote A-06, Condomínio Aquiraz Riviera, Praia da Marambaia, Tapera, Aquiraz/CE, CEP 61.758-000.\n" +
      "Taxa anual de serviços e manutenção: R$ 1.300,00 por UH.\n" +
      "Profissão: Empresário. Nascimento: 25/02/1997.\n" +
      "Endereço: Avenida Martinho Furtado de Lacerda, 410, Nossa Senhora de Fátima, Conceição/PB, CEP 58970000.\n" +
      "GSign ID: TU5ELW8S7L-NWMB68B-ZOU58MREOYLM88-KJTU3."
  },

  /* ---------- 95 — WAM — 249361 PRAIAS DO LAGO ECO RESORT, Bloco N / 302 / Cota 16 ---------- */
  {
    id: "249361-fernanda-pdl-n-302-cota-16",
    nome: "FERNANDA PATRICIA ZUNIGA GOMES",
    cpf: "375.068.948-23",
    rg: "274683325 SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "Solteiro(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PRAIAS DO LAGO ECO RESORT",
    bloco: "N",
    apartamento: "302",
    andar: "",
    cota: "16",
    fracao: "1/52",
    localizacao: "GOIÁS",

    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",

    valorPago: 15621.71,
    valorTotal: 43875.93,
    corretagem: 4029.73,
    sinal: 100.00,
    parcelas: [
      { tipo: "Intermediação (depósito)", qtd: 1, valor: 1000.00, forma: "Depósito Bancário/Transferência Eletrônica", vencimento: "2025-04-20" },
      { tipo: "Intermediação (boleto)", qtd: 11, valor: 275.43, forma: "Boleto - Cobrança W Palmerston", vencimento: "" },
      { tipo: "Cota (entrada)", qtd: 2, valor: 50.00, forma: "Boleto", vencimento: "2025-05-15" },
      { tipo: "Cota (saldo)", qtd: 88, valor: 497.45, forma: "Boleto", vencimento: "2025-07-20" }
    ],
    formaPagamentoEntrada: "1x R$ 1.000,00 depósito/transferência + 11x R$ 275,43 boleto W Palmerston (intermediação)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2025-04-20",
    telefone: "(11) 96667-7754",
    email: "fernandapzuniga@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/249361-fernanda-pdl-n-302-cota-16--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 15.621,71 — informado pelo escritório (corrigido). Contrato antigo (abril/2025).\n" +
      "DEVOLUÇÃO: Reembolso — depósito/transferência é o instrumento listado primeiro → Reembolso.\n" +
      "FORA DO PRAZO — contrato 20/04/2025, prazo 27/04/2025, hoje 31/08/2026 (mais de 1 ano fora).\n" +
      "Intermediação: R$ 4.029,73 (1x R$ 1.000 depósito + 11x R$ 275,43 boleto W Palmerston = R$ 3.029,73).\n" +
      "Intermediadora: WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Preço da Cota (sem intermediação): R$ 43.875,93.\n" +
      "Cota entrada: 2x R$ 50,00 boleto (1ª 15/05/2025).\n" +
      "Cota saldo: 88x R$ 497,45 boleto (1ª 20/07/2025).\n" +
      "Semanas de uso: 3 por ano (acima do padrão de 1 semana).\n" +
      "Inclui Passaporte Náutico Praia Clube (nº 07-N302/16), vinculado à cota.\n" +
      "Habite-se nº 2020001124, expedido 20/11/2020.\n" +
      "Vendedora assinante: Sara Thalia Melo Barrozo.\n" +
      "Testemunhas: Luiz Felipe Vieira Silva, David Alisson Gadelha dos Santos (CPF 700.943.871-41).\n" +
      "Profissão: Outra. Nascimento: 25/08/1989.\n" +
      "Endereço: Rua Ator Paulo Gustavo, 270, Cidade São Mateus, São Paulo/SP, CEP 03965005.\n" +
      "GSign Fernanda: G4RMR8NQCP6D. GSign Documento ID: ZW6JMJIW17-OJQUWY3-GXYU6SL0W41RID-UC0C2."
  },

  /* ---------- 96 — GAV — 356428 AREYA BARRA RESORT, Bloco 01 / 132 / Cota 08 ---------- */
  {
    id: "356428-jeniffer-areya-bl01-132-cota-08",
    nome: "JENIFFER CAROLINE LUZIA ALMEIDA",
    cpf: "144.915.297-01",
    rg: "25.579.924-9 DETRAN/RJ",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "132",
    andar: "1",
    cota: "08",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1000.00,
    valorTotal: 52057.76,
    corretagem: 3990.00,
    sinal: 2602.90,
    parcelas: [
      { tipo: "Corretagem (Cartão Débito)", qtd: 1, valor: 100.00, forma: "Cartão MASTER Débito", vencimento: "2026-08-25" },
      { tipo: "Corretagem (Cartão Débito)", qtd: 1, valor: 900.00, forma: "Cartão MASTER Débito", vencimento: "2026-08-25" },
      { tipo: "Corretagem (Boleto)", qtd: 5, valor: 598.00, forma: "Boleto", vencimento: "2026-09-10" },
      { tipo: "Sinal", qtd: 4, valor: 650.72, forma: "Parcelas", vencimento: "2027-02-10" },
      { tipo: "Saldo", qtd: 74, valor: 614.39, forma: "Parcelas", vencimento: "2027-06-10" }
    ],
    formaPagamentoEntrada: "1x R$ 100,00 + 1x R$ 900,00 cartão MASTER débito + 5x R$ 598,00 boleto (corretagem)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-24",
    telefone: "(21) 98812-4940",
    email: "jhennyk10@gmail.com",
    arquivos: [],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 — corretagem: R$ 100 + R$ 900 cartão MASTER débito. Cartão débito = cartão → valor cheio.\n" +
      "Boleto 5x R$ 598 (1ª 10/09/2026) — NÃO VENCIDO.\n" +
      "DEVOLUÇÃO: Estorno Cartão — cartão débito = cartão → Estorno.\n" +
      "DENTRO DO PRAZO — contrato 24/08/2026, prazo 31/08/2026. ÚLTIMO DIA HOJE!\n" +
      "Cartão 1: R$ 100,00 MASTER débito, Nº Doc 175763374, 25/08/2026.\n" +
      "Cartão 2: R$ 900,00 MASTER débito, Nº Doc 19695688, 25/08/2026.\n" +
      "Sinal: R$ 2.602,90 em 4x R$ 650,72 (1ª 10/02/2027) — NÃO VENCIDO.\n" +
      "Saldo: R$ 45.464,86 em 74x R$ 614,39 (1ª 10/06/2027) — NÃO VENCIDO.\n" +
      "1 quarto, área privativa 34,01m², área total 73,72m².\n" +
      "Cônjuge: NÃO INFORMADO (estado civil Casado, mas dados do cônjuge ausentes no contrato).\n" +
      "Profissão: Do lar. Nascimento: 05/07/1993.\n" +
      "Endereço: Estrada Duarte Nunes, 24, Senador Vasconcelos, Rio de Janeiro/RJ, CEP 23085000.\n" +
      "ATENÇÃO: PDF/arquivo do contrato NÃO fornecido — contrato enviado apenas como screenshot.\n" +
      "ZapSign (parcial): 90308fde-b2c8-...-464c698128a5 (ID sobreposto por texto na imagem). Proposta nº 356428."
  },

  /* ---------- 97 — GAV — GRAN GARDEN RESORT (dados parciais — só notificação) ---------- */
  {
    id: "ggr-paulo-scherer",
    nome: "PAULO ROBERTO SCHERER",
    cpf: "506.759.310-53",
    rg: "70.576.999-81",
    nacionalidade: "brasileiro",
    estadoCivil: "",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "GRAN GARDEN RESORT",
    bloco: "",
    apartamento: "",
    andar: "",
    cota: "",
    fracao: "1/52",
    localizacao: "RIO GRANDE DO SUL",

    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "50.094.155/0001-02",

    valorPago: 2245.00,
    valorTotal: 0,
    corretagem: 0,
    sinal: 0,
    parcelas: [
      { tipo: "PIX", qtd: 1, valor: 2245.00, forma: "PIX", vencimento: "2026-07-31" }
    ],
    formaPagamentoEntrada: "1x R$ 2.245,00 PIX",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-07-31",
    telefone: "(51) 98057-5924",
    email: "",
    arquivos: [
      { titulo: "Notificação de arrependimento", arquivo: "contratos-pdf/ggr-paulo-scherer--notificacao.pdf" }
    ],
    pix: "",
    observacoes:
      "FICHA INCOMPLETA — cadastrada a partir da carta de arrependimento, NÃO do contrato. Faltam: bloco, apartamento, cota, valor total, corretagem, email, estado civil, profissão.\n" +
      "VALOR PAGO = R$ 2.245,00 — PIX em 31/07/2026 (o que passou).\n" +
      "DEVOLUÇÃO: Reembolso — PIX → Reembolso.\n" +
      "DENTRO DO PRAZO — contrato 31/07/2026, prazo 07/08/2026. Arrependimento exercido em 03/08/2026 (carta gov.br assinada digitalmente 03/08/2026 13:43:09).\n" +
      "Carta solicita estorno integral de R$ 2.245,00 para chave PIX (51) 98057-5924 ou CPF 506.759.310-53.\n" +
      "Motivos: apelo emocional, sem tempo para leitura do contrato, dificuldades financeiras, omissão de informações.\n" +
      "Endereço: Rua Arroio do Meio, 175, Olarias, Lajeado/RS.\n" +
      "Referência arquivo: (281_29) no nome do documento original."
  },

  /* ---------- 98 — WAM — 105348 ONDAS PRAIA RESORT, C / C136 / Cota 09 ---------- */
  {
    id: "105348-alfredo-opr-c-c136-cota-09",
    nome: "ALFREDO PEREIRA DA SILVA",
    cpf: "578.279.746-00",
    rg: "MG-3.803.171 PC/MG",
    nacionalidade: "brasileira",
    estadoCivil: "Solteiro(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "ONDAS PRAIA RESORT",
    bloco: "C",
    apartamento: "C136",
    andar: "",
    cota: "09",
    fracao: "1/52",
    localizacao: "BAHIA",

    empresa: "WAM",
    razaoSocial: "SPE PORTO SEGURO 02 EMPREENDIMENTOS IMOBILIÁRIOS S.A.",
    cnpj: "22.059.167/0001-60",

    valorPago: 32290.00,
    valorTotal: 61801.83,
    corretagem: 2990.00,
    sinal: 0,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 2990.00, forma: "Cartão de Débito", vencimento: "2022-11-15" },
      { tipo: "Iniciais fixas", qtd: 3, valor: 50.00, forma: "Parcelas", vencimento: "2022-12-15" },
      { tipo: "Saldo (imóvel)", qtd: 120, valor: 488.85, forma: "Parcelas mensais reajustáveis", vencimento: "2023-03-10" }
    ],
    formaPagamentoEntrada: "1x R$ 2.990,00 cartão de débito (corretagem) + 3x R$ 50,00 parcelas fixas + 120x R$ 488,85 parcelas reajustáveis",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2022-11-15",
    telefone: "31985472954 / 31987595939",
    email: "PR_ALFREDO_SILVA@HOTMAIL.COM",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/105348-alfredo-opr-c-c136-cota-09--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO ANTIGO — assinado em 15/11/2022 (DocuSign). FORA DO PRAZO de arrependimento.\n" +
      "Nº Contrato: 362/03-CC136/Cota 09. DocuSign Envelope ID: B6D751B6-B9ED-426A-8DA3-3FDC25CA84B4.\n" +
      "VALOR PAGO = R$ 32.290,00 — informado pelo usuário (corrigido de R$ 29.300). Contrato de 2022 com parcelas boleto reajustáveis. Corretagem R$ 2.990 (cartão débito) + parcelas do imóvel pagas.\n" +
      "DEVOLUÇÃO: Estorno Cartão — cartão de débito (instrumento principal listado primeiro).\n" +
      "Preço imóvel sem corretagem: R$ 58.811,83. Corretagem: R$ 2.990,00. Total: R$ 61.801,83.\n" +
      "Beneficiário corretagem: WAM BRASIL. Controladora: WAM COMERCIALIZAÇÃO S.A. (CNPJ 17.919.649/0003-75).\n" +
      "Prazo quitação: 10/02/2033. Regime: Patrimônio de afetação. Registro incorporação: 38236.\n" +
      "Área privativa: 44,5300 m². Área comum: 10,8454 m². Total: 55,3754 m². Fração ideal: 0,1973%.\n" +
      "WAM Fidelidade inclusa (adesão 6 anos, sem custo adicional).\n" +
      "Endereço: Rua Cruzeiro do Sul, 405, Novo Tempo, Timoteo/MG, CEP 35183116."
  },

  /* ---------- 99 — GAV — 356721 AREYA BARRA RESORT, Bloco 01 / 219 / Cota 25 ---------- */
  {
    id: "356721-david-areya-bl01-219-cota-25",
    nome: "DAVID CONCEICAO DOS SANTOS",
    cpf: "036.402.111-03",
    rg: "2644826 SSP/DF",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "219",
    andar: "2",
    cota: "25",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA.",
    cnpj: "45.298.124/0001-33",

    valorPago: 1330.00,
    valorTotal: 52471.36,
    corretagem: 3990.00,
    sinal: 2623.56,
    parcelas: [
      { tipo: "Corretagem (PIX)", qtd: 1, valor: 1330.00, forma: "PIX", vencimento: "2026-08-26" },
      { tipo: "Corretagem (boleto)", qtd: 2, valor: 1330.00, forma: "Boleto", vencimento: "2026-09-26" },
      { tipo: "Sinal de Negócio", qtd: 4, valor: 655.89, forma: "Parcelas", vencimento: "2026-11-05" },
      { tipo: "Saldo", qtd: 74, valor: 619.70, forma: "Parcelas", vencimento: "2027-03-05" }
    ],
    formaPagamentoEntrada: "PIX R$ 1.330,00 (corretagem) + 2x R$ 1.330,00 boleto (corretagem) + 4x R$ 655,89 sinal + 74x R$ 619,70 saldo",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-26",
    telefone: "(61) 99258-3054",
    email: "davidmaklin89@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/356721-david-areya-bl01-219-cota-25--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 1 DE 3 — mesma pessoa, 3 cotas no Areya Barra Resort (fichas 99, 100, 101).\n" +
      "VALOR PAGO = R$ 1.330,00 — PIX R$ 3.990,00 total rateado nos 3 contratos (R$ 1.330 cada). PIX = o que passou.\n" +
      "Nº Documento PIX: RESV1046670094845425FGRZT52ZCA404CF — MESMO nos 3 contratos (1 PIX de R$ 3.990 rateado).\n" +
      "PIX pagador CNPJ: 34.123.097/0001-41 (pessoa jurídica, não o CPF do David).\n" +
      "DEVOLUÇÃO: Reembolso — PIX (instrumento principal, listado primeiro).\n" +
      "DENTRO DO PRAZO — contrato 26/08/2026, prazo 02/09/2026, hoje 31/08/2026.\n" +
      "Corretagem restante: 2x R$ 1.330 boleto (1º 26/09/2026 — NÃO VENCIDO).\n" +
      "Sinal: 4x R$ 655,89 (1ª 05/11/2026 — NÃO VENCIDO).\n" +
      "Saldo: R$ 45.857,80 em 74x R$ 619,70 (1ª 05/03/2027 — NÃO VENCIDO).\n" +
      "Proposta nº 356721. ZapSign: 647644e4-d8e3-4409-adbe-e880ca988d8c. David assinou 26/08/2026 12:16:55.\n" +
      "Autenticação Flow: Aceito via plataforma Flow, 26/08/2026 12:04:32.\n" +
      "Endereço: Residencial Itaipu Quadra 80, SN, Setor Habitacional Jardim Botanico, Brasilia/DF, CEP 71680528."
  },

  /* ---------- 100 — GAV — 356720 AREYA BARRA RESORT, Bloco 01 / 222 / Cota 02 ---------- */
  {
    id: "356720-david-areya-bl01-222-cota-02",
    nome: "DAVID CONCEICAO DOS SANTOS",
    cpf: "036.402.111-03",
    rg: "2644826 SSP/DF",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "222",
    andar: "2",
    cota: "02",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA.",
    cnpj: "45.298.124/0001-33",

    valorPago: 1330.00,
    valorTotal: 52471.36,
    corretagem: 3990.00,
    sinal: 2623.56,
    parcelas: [
      { tipo: "Corretagem (PIX)", qtd: 1, valor: 1330.00, forma: "PIX", vencimento: "2026-08-26" },
      { tipo: "Corretagem (boleto)", qtd: 2, valor: 1330.00, forma: "Boleto", vencimento: "2026-09-26" },
      { tipo: "Sinal de Negócio", qtd: 4, valor: 655.89, forma: "Parcelas", vencimento: "2026-11-05" },
      { tipo: "Saldo", qtd: 74, valor: 619.70, forma: "Parcelas", vencimento: "2027-03-05" }
    ],
    formaPagamentoEntrada: "PIX R$ 1.330,00 (corretagem) + 2x R$ 1.330,00 boleto (corretagem) + 4x R$ 655,89 sinal + 74x R$ 619,70 saldo",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-26",
    telefone: "(61) 99258-3054",
    email: "davidmaklin89@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/356720-david-areya-bl01-222-cota-02--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 2 DE 3 — mesma pessoa, 3 cotas no Areya Barra Resort (fichas 99, 100, 101).\n" +
      "VALOR PAGO = R$ 1.330,00 — PIX R$ 3.990,00 total rateado nos 3 contratos (R$ 1.330 cada). PIX = o que passou.\n" +
      "Nº Documento PIX: RESV1046670094845425FGRZT52ZCA404CF — MESMO nos 3 contratos.\n" +
      "DEVOLUÇÃO: Reembolso — PIX (instrumento principal).\n" +
      "DENTRO DO PRAZO — contrato 26/08/2026, prazo 02/09/2026, hoje 31/08/2026.\n" +
      "Proposta nº 356720. ZapSign: f9b570a0-9bc7-475a-b3df-00a132c3f9a2."
  },

  /* ---------- 101 — GAV — 356719 AREYA BARRA RESORT, Bloco 01 / 220 / Cota 15 ---------- */
  {
    id: "356719-david-areya-bl01-220-cota-15",
    nome: "DAVID CONCEICAO DOS SANTOS",
    cpf: "036.402.111-03",
    rg: "2644826 SSP/DF",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "Bloco 01",
    apartamento: "220",
    andar: "2",
    cota: "15",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA.",
    cnpj: "45.298.124/0001-33",

    valorPago: 1330.00,
    valorTotal: 52471.36,
    corretagem: 3990.00,
    sinal: 2623.56,
    parcelas: [
      { tipo: "Corretagem (PIX)", qtd: 1, valor: 1330.00, forma: "PIX", vencimento: "2026-08-26" },
      { tipo: "Corretagem (boleto)", qtd: 2, valor: 1330.00, forma: "Boleto", vencimento: "2026-09-26" },
      { tipo: "Sinal de Negócio", qtd: 4, valor: 655.89, forma: "Parcelas", vencimento: "2026-11-05" },
      { tipo: "Saldo", qtd: 74, valor: 619.70, forma: "Parcelas", vencimento: "2027-03-05" }
    ],
    formaPagamentoEntrada: "PIX R$ 1.330,00 (corretagem) + 2x R$ 1.330,00 boleto (corretagem) + 4x R$ 655,89 sinal + 74x R$ 619,70 saldo",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-26",
    telefone: "(61) 99258-3054",
    email: "davidmaklin89@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/356719-david-areya-bl01-220-cota-15--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 3 DE 3 — mesma pessoa, 3 cotas no Areya Barra Resort (fichas 99, 100, 101).\n" +
      "VALOR PAGO = R$ 1.330,00 — PIX R$ 3.990,00 total rateado nos 3 contratos (R$ 1.330 cada). PIX = o que passou.\n" +
      "Nº Documento PIX: RESV1046670094845425FGRZT52ZCA404CF — MESMO nos 3 contratos.\n" +
      "DEVOLUÇÃO: Reembolso — PIX (instrumento principal).\n" +
      "DENTRO DO PRAZO — contrato 26/08/2026, prazo 02/09/2026, hoje 31/08/2026.\n" +
      "Proposta nº 356719. ZapSign: e51706bd-2166-47b7-9496-e4fb86f0eba1."
  },

  /* ---------- 102 — WAM — REFÚGIO DAS LONTRAS POUSADA, B / 110 / Cota 05 ---------- */
  {
    id: "rdl-maria-auxiliadora-b-110-cota-05",
    nome: "MARIA AUXILIADORA MENDES DA SILVA",
    cpf: "193.219.701-00",
    rg: "958391 SSP/GO",
    nacionalidade: "brasileira",
    estadoCivil: "Solteiro(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "REFÚGIO DAS LONTRAS POUSADA",
    bloco: "B",
    apartamento: "110",
    andar: "",
    cota: "05",
    fracao: "1/52",
    localizacao: "ALAGOAS",

    empresa: "WAM",
    razaoSocial: "REFÚGIO DAS LONTRAS POUSADA EMPREENDIMENTOS IMOBILIARIOS LTDA",
    cnpj: "41.402.028/0001-32",

    valorPago: 7800.00,
    valorTotal: 38555.91,
    corretagem: 3900.00,
    sinal: 0,
    parcelas: [
      { tipo: "Corretagem", qtd: 6, valor: 650.00, forma: "Cartão de Crédito Cielo", vencimento: "2026-08-24" },
      { tipo: "Parcelas fixas", qtd: 5, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Saldo", qtd: 84, valor: 409.59, forma: "Boleto", vencimento: "2027-02-20" }
    ],
    formaPagamentoEntrada: "6x R$ 650,00 cartão de crédito Cielo (corretagem) + 5x R$ 50,00 boleto + 84x R$ 409,59 boleto",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-24",
    telefone: "(19) 99666-8400",
    email: "mariaedubrasil@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/rdl-maria-auxiliadora-b-110-cota-05--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 7.800,00 — R$ 7.800 no cartão de crédito (6x R$ 1.300 conforme e-mail da cliente). Cartão = valor cheio.\n" +
      "DEVOLUÇÃO: Estorno Cartão — cartão crédito (instrumento principal).\n" +
      "DENTRO DO PRAZO — contrato 24/08/2026, prazo 31/08/2026 (ÚLTIMO DIA HOJE).\n" +
      "Preço cota (sem intermediação): R$ 34.655,91. Corretagem: R$ 3.900,00. Total: R$ 38.555,91.\n" +
      "Parcelas cota: 5x R$ 50 boleto (1ª 15/09/2026 — NÃO VENCIDO) + 84x R$ 409,59 boleto (1ª 20/02/2027 — NÃO VENCIDO).\n" +
      "Intermediadora: WAM COMERCIALIZAÇÃO SA (CNPJ 17.919.649/0001-03).\n" +
      "Habite-se previsto: 31/08/2028. Regime: Patrimônio de Afetação. Matrícula: 14.659.\n" +
      "GSign Document ID: P66UP323WB-CECGMFS-RO1H23X3WH3W0L-EQBT7. GSignId adquirente: T1V11GK1E8L.\n" +
      "Testemunhas: Nelson Augusto da Costa; Yasmin Lorrane Silva Gomes (CPF 058.624.011-05).\n" +
      "ATENÇÃO: e-mail da cliente menciona R$ 7.800 (6x R$ 1.300) no cartão — dobro da corretagem deste contrato (R$ 3.900). Pode haver 2º contrato não recebido.\n" +
      "Não conheceu pessoalmente a unidade/empreendimento (marcou 'Não').\n" +
      "Nasc: 23/06/1959. Profissão: Aposentado."
  },

  /* ---------- 103 — GAV — AREYA BARRA RESORT, Bl 01 / 512 / Cota 10 ---------- */
  {
    id: "357404-vanessa-areya-bl01-512-cota-10",
    nome: "VANESSA SAMPAIO DA SILVA",
    cpf: "117.088.546-22",
    rg: "MG16734561 SSP/MG",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "01",
    apartamento: "512",
    andar: "5",
    cota: "10",
    fracao: "1/52",
    localizacao: "Barra de São Miguel/AL",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 1000.00,
    valorTotal: 50405.59,
    corretagem: 3990.00,
    sinal: 2520.27,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 1000.00, forma: "PIX", vencimento: "2026-08-29" },
      { tipo: "Corretagem Boleto", qtd: 5, valor: 598.00, forma: "Boleto", vencimento: "2026-09-29" },
      { tipo: "Sinal", qtd: 4, valor: 630.07, forma: "Conforme contrato", vencimento: "2027-02-10" },
      { tipo: "Saldo", qtd: 74, valor: 593.18, forma: "Conforme contrato", vencimento: "2027-06-10" }
    ],
    formaPagamentoEntrada: "1x R$ 1.000,00 PIX (corretagem) + 5x R$ 598,00 boleto (corretagem) + 4x R$ 630,07 sinal + 74x R$ 593,18 saldo",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-29",
    telefone: "(31) 999483428",
    email: "eng.vanessasampaio@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/357404-vanessa-areya-bl01-512-cota-10--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 — PIX R$ 1.000 corretagem (comprovante no contrato). PIX = o que passou.\n" +
      "Boletos corretagem: 5x R$ 598 (1ª 29/09/2026 — NÃO VENCIDO). Sinal: 4x R$ 630,07 (1ª 10/02/2027 — NÃO VENCIDO). Saldo: 74x R$ 593,18 (1ª 10/06/2027 — NÃO VENCIDO).\n" +
      "DEVOLUÇÃO: Reembolso — PIX (instrumento principal).\n" +
      "DENTRO DO PRAZO — contrato 29/08/2026, prazo 05/09/2026, hoje 31/08/2026.\n" +
      "Proposta nº 357404. ZapSign: 29ef9371-fb2b-4951-8708-93468c1e0a1c.\n" +
      "Nº Documento PIX: RESV1937540094845425BR6G9I881063C15.\n" +
      "Nasc: 29/12/1993. Profissão: Engenheiro(a). End: Rua Edmon de Sousa Melo, 33, C43 Ap14, Joao Paulo II Barreiro, Belo Horizonte/MG, CEP 30660585."
  },

  /* ---------- 104 — GAV — PORTO ALTO RESORT, Bl 01 / 0106 / Cota 04 ---------- */
  {
    id: "357650-nelson-par-bl01-0106-cota-04",
    nome: "NELSON OLIVEIRA MIRANDA",
    cpf: "034.513.881-38",
    rg: "37976 PM/GO",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "BARBARA ALESSANDRA DOS SANTOS NASCIMENTO", cpf: "023.767.131-02", rg: "36743 PM/GO", email: "babi.alessandra28@gmail.com" },

    empreendimento: "PORTO ALTO RESORT",
    bloco: "01",
    apartamento: "0106",
    andar: "1",
    cota: "04",
    fracao: "1/52",
    localizacao: "Ipojuca/PE",

    empresa: "GAV",
    razaoSocial: "GAV MURO ALTO EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "34.832.326/0001-05",

    valorPago: 2500.00,
    valorTotal: 72824.86,
    corretagem: 3990.00,
    sinal: 3641.26,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 2500.00, forma: "PIX", vencimento: "2026-08-31" },
      { tipo: "Corretagem Boleto", qtd: 2, valor: 496.66, forma: "Boleto", vencimento: "2026-09-30" },
      { tipo: "Corretagem Boleto", qtd: 1, valor: 496.68, forma: "Boleto", vencimento: "2026-11-30" },
      { tipo: "Sinal", qtd: 4, valor: 910.31, forma: "Conforme contrato", vencimento: "2026-12-10" },
      { tipo: "Saldo", qtd: 80, valor: 814.92, forma: "Conforme contrato", vencimento: "2027-04-10" }
    ],
    formaPagamentoEntrada: "1x R$ 2.500,00 PIX (corretagem) + 2x R$ 496,66 boleto + 1x R$ 496,68 boleto (corretagem) + 4x R$ 910,31 sinal + 80x R$ 814,92 saldo",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-31",
    telefone: "(61) 983523197",
    email: "nelsonraiado77@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/357650-nelson-par-bl01-0106-cota-04--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 1 DE 2 — mesma pessoa + cônjuge Barbara, 2 cotas em resorts diferentes (fichas 104, 105).\n" +
      "VALOR PAGO = R$ 2.500,00 — PIX R$ 5.000,00 total rateado nos 2 contratos (R$ 2.500 cada). PIX = o que passou.\n" +
      "Nº Documento PIX: RESV19375400948454255370G6PYJ37A25EA — MESMO nos 2 contratos.\n" +
      "DEVOLUÇÃO: Reembolso — PIX (instrumento principal).\n" +
      "DENTRO DO PRAZO — contrato 31/08/2026, prazo 07/09/2026, hoje 31/08/2026.\n" +
      "ATENÇÃO: ZapSign status 'Em-Curso' — assinatura de Nelson PENDENTE. Cônjuge Barbara assinou 31/08/2026 18:55:03.\n" +
      "Boletos corretagem: 2x R$ 496,66 (1ª 30/09/2026) + 1x R$ 496,68 (30/11/2026) — NÃO VENCIDOS.\n" +
      "Sinal: 4x R$ 910,31 (1ª 10/12/2026). Saldo: 80x R$ 814,92 (1ª 10/04/2027) — NÃO VENCIDOS.\n" +
      "Proposta nº 357650. ZapSign: 089eecb9-67ec-4449-8c17-0cccffaf8172.\n" +
      "Cônjuge: Barbara Alessandra dos Santos Nascimento, CPF 023.767.131-02, RG 36743 PM/GO, nasc 28/02/1987, Policial militar(a), tel (61) 992473540.\n" +
      "Nasc: 22/08/1989. Profissão: Policial militar(a). End: Quadra SQ 15 Quadra 8, 16, Centro, Cidade Ocidental/GO, CEP 72880568."
  },

  /* ---------- 105 — GAV — AREYA BARRA RESORT, Bl 01 / 630 / Cota 23 ---------- */
  {
    id: "357651-nelson-areya-bl01-630-cota-23",
    nome: "NELSON OLIVEIRA MIRANDA",
    cpf: "034.513.881-38",
    rg: "37976 PM/GO",
    nacionalidade: "brasileira",
    estadoCivil: "Casado(a)",
    conjuge: { nome: "BARBARA ALESSANDRA DOS SANTOS NASCIMENTO", cpf: "023.767.131-02", rg: "36743 PM/GO", email: "babi.alessandra28@gmail.com" },

    empreendimento: "AREYA BARRA RESORT",
    bloco: "01",
    apartamento: "630",
    andar: "6",
    cota: "23",
    fracao: "1/52",
    localizacao: "Barra de São Miguel/AL",

    empresa: "GAV",
    razaoSocial: "GAV BARRA DE SÃO MIGUEL EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "45.298.124/0001-33",

    valorPago: 2500.00,
    valorTotal: 56189.30,
    corretagem: 3990.00,
    sinal: 2809.48,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 2500.00, forma: "PIX", vencimento: "2026-08-31" },
      { tipo: "Corretagem Boleto", qtd: 2, valor: 496.66, forma: "Boleto", vencimento: "2026-09-30" },
      { tipo: "Corretagem Boleto", qtd: 1, valor: 496.68, forma: "Boleto", vencimento: "2026-11-30" },
      { tipo: "Sinal", qtd: 4, valor: 702.37, forma: "Conforme contrato", vencimento: "2026-12-10" },
      { tipo: "Saldo", qtd: 74, valor: 667.43, forma: "Conforme contrato", vencimento: "2027-04-10" }
    ],
    formaPagamentoEntrada: "1x R$ 2.500,00 PIX (corretagem) + 2x R$ 496,66 boleto + 1x R$ 496,68 boleto (corretagem) + 4x R$ 702,37 sinal + 74x R$ 667,43 saldo",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-31",
    telefone: "(61) 983523197",
    email: "nelsonraiado77@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/357651-nelson-areya-bl01-630-cota-23--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO 2 DE 2 — mesma pessoa + cônjuge Barbara, 2 cotas em resorts diferentes (fichas 104, 105).\n" +
      "VALOR PAGO = R$ 2.500,00 — PIX R$ 5.000,00 total rateado nos 2 contratos (R$ 2.500 cada). PIX = o que passou.\n" +
      "Nº Documento PIX: RESV19375400948454255370G6PYJ37A25EA — MESMO nos 2 contratos.\n" +
      "DEVOLUÇÃO: Reembolso — PIX (instrumento principal).\n" +
      "DENTRO DO PRAZO — contrato 31/08/2026, prazo 07/09/2026, hoje 31/08/2026.\n" +
      "ATENÇÃO: ZapSign status 'Em-Curso' — assinatura de Nelson PENDENTE. Cônjuge Barbara assinou 31/08/2026 18:57:36.\n" +
      "Boletos corretagem: 2x R$ 496,66 (1ª 30/09/2026) + 1x R$ 496,68 (30/11/2026) — NÃO VENCIDOS.\n" +
      "Sinal: 4x R$ 702,37 (1ª 10/12/2026). Saldo: 74x R$ 667,43 (1ª 10/04/2027) — NÃO VENCIDOS.\n" +
      "Proposta nº 357651. ZapSign: feb75524-edc8-4c3d-859b-2dbfcc449f94.\n" +
      "Cônjuge: Barbara Alessandra dos Santos Nascimento, CPF 023.767.131-02, RG 36743 PM/GO, nasc 28/02/1987, Policial militar(a), tel (61) 992473540.\n" +
      "Nasc: 22/08/1989. Profissão: Policial militar(a). End: Quadra SQ 15 Quadra 8, 16, Centro, Cidade Ocidental/GO, CEP 72880568."
  },

  /* ---------- 106 — GAV — PORTO 2 LIFE RESORT, Bl 05 / 0332 / Cota 07 ---------- */
  {
    id: "357003-julia-p2l-bl05-0332-cota-07",
    nome: "JULIA MARIA POGGERE",
    cpf: "109.919.719-81",
    rg: "128575847 SESP/PR",
    nacionalidade: "brasileira",
    estadoCivil: "União estável",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },

    empreendimento: "PORTO 2 LIFE RESORT",
    bloco: "05",
    apartamento: "0332",
    andar: "2",
    cota: "07",
    fracao: "1/52",
    localizacao: "Ipojuca/PE",

    empresa: "GAV",
    razaoSocial: "GAV MURO ALTO 2 EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "39.673.888/0001-69",

    valorPago: 3990.00,
    valorTotal: 85246.73,
    corretagem: 3990.00,
    sinal: 4262.33,
    parcelas: [
      { tipo: "Corretagem Cartão", qtd: 3, valor: 1330.00, forma: "Cartão de Crédito VISA", vencimento: "2026-09-27" },
      { tipo: "Sinal", qtd: 4, valor: 1065.58, forma: "Conforme contrato", vencimento: "2026-12-10" },
      { tipo: "Saldo", qtd: 80, valor: 962.43, forma: "Conforme contrato", vencimento: "2027-04-10" }
    ],
    formaPagamentoEntrada: "3x R$ 1.330,00 cartão crédito VISA (corretagem) + 4x R$ 1.065,58 sinal + 80x R$ 962,43 saldo",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-28",
    telefone: "(65) 996975582",
    email: "claudiosimionatto@hotmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/357003-julia-p2l-bl05-0332-cota-07--contrato.pdf" },
      { titulo: "Distrato", arquivo: "contratos-pdf/106-julia-poggere-porto2-life-bl05-0332-cota07--distrato.pdf" }
    ],
    pix: "",
    notaEnvio: "Estamos reenviando o termo de distrato, que agora consta o estorno referente aos dois contratos.",
    observacoes:
      "VALOR PAGO = R$ 3.990,00 — 3x R$ 1.330 cartão crédito VISA parcelado (CV 20640372, final 1437). Cartão = valor cheio.\n" +
      "NOTA: comprovante cartão no PDF mostra R$ 7.980 (3x R$ 2.660) — dobro da corretagem. São 2 contratos (Cota 07 + Cota 26), R$ 3.990 cada.\n" +
      "DEVOLUÇÃO: Estorno Cartão — cartão crédito (instrumento principal).\n" +
      "DISTRATO ASSINADO 01/09/2026. Assinatura digital Julia 03/09/2026 09:45. Estorno R$ 3.990 cartão.\n" +
      "DENTRO DO PRAZO — contrato 28/08/2026, prazo 04/09/2026.\n" +
      "Sinal: 4x R$ 1.065,58 (1ª 10/12/2026). Saldo: 80x R$ 962,43 (1ª 10/04/2027) — NÃO VENCIDOS.\n" +
      "Proposta nº 357003. ZapSign: 042c0f94-ca6a-4d97-8432-701753d11929.\n" +
      "Nasc: 06/04/1997. Profissão: Analista Administrativo(a). End: Rodovia MT 199, SN, Casa, Zona Rural, Vila Bela da Santissima Trindade/MT, CEP 78245000."
  },

  /* ---------- 107 — WAM — ONDAS PRAIA RESORT, A / A280 / Cota 12 ---------- */
  {
    id: "opr-caio-a-a280-cota-12",
    nome: "CAIO TADEU DE MESQUITA",
    cpf: "382.310.648-18",
    rg: "49405699 SSP/SP",
    nacionalidade: "brasileira",
    estadoCivil: "Casado",
    conjuge: { nome: "CAROLINA FERRARI", cpf: "109.002.069-42", rg: "5823345 SSP/SC", email: "CAROL.FERRARI010@HOTMAIL.COM" },

    empreendimento: "ONDAS PRAIA RESORT",
    bloco: "A",
    apartamento: "A280",
    andar: "",
    cota: "12",
    fracao: "1/52",
    localizacao: "Porto Seguro/BA",

    empresa: "WAM",
    razaoSocial: "SPE PORTO SEGURO 02 EMPREENDIMENTOS IMOBILIÁRIOS S.A.",
    cnpj: "22.059.167/0001-60",

    valorPago: 510.00,
    valorTotal: 67763.17,
    corretagem: 5100.00,
    sinal: 0,
    parcelas: [
      { tipo: "Intermediação depósito", qtd: 1, valor: 500.00, forma: "Depósito Bancário / Transferência Eletrônica", vencimento: "2026-08-30" },
      { tipo: "Intermediação depósito", qtd: 1, valor: 10.00, forma: "Depósito Bancário / Transferência Eletrônica", vencimento: "2026-08-30" },
      { tipo: "Intermediação boleto", qtd: 2, valor: 2295.00, forma: "Boleto - Cobrança W Palmerston", vencimento: "" },
      { tipo: "Parcelas fixas", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Saldo", qtd: 96, valor: 651.18, forma: "Boleto", vencimento: "2026-12-20" }
    ],
    formaPagamentoEntrada: "1x R$ 500 depósito + 1x R$ 10 depósito (intermediação) + 2x R$ 2.295 boleto (intermediação) + 3x R$ 50 boleto + 96x R$ 651,18 boleto",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-30",
    telefone: "(11) 96327-7826",
    email: "Caiolucchi33@icloud.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/opr-caio-a-a280-cota-12--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 510,00 — depósito/transferência R$ 500 + R$ 10 (intermediação). Depósito = o que passou.\n" +
      "Intermediação total R$ 5.100: depósitos R$ 510 (pagos) + 2x R$ 2.295 boleto W Palmerston (sem data de vencimento definida — conferir se pagos).\n" +
      "DEVOLUÇÃO: Reembolso — depósito/transferência (instrumento principal listado primeiro).\n" +
      "DENTRO DO PRAZO — contrato 30/08/2026, prazo 06/09/2026, hoje 01/09/2026.\n" +
      "Parcelas cota: 3x R$ 50 boleto (1ª 15/09/2026 — NÃO VENCIDO) + 96x R$ 651,18 boleto (1ª 20/12/2026 — NÃO VENCIDO).\n" +
      "Preço cota (sem intermediação): R$ 62.663,17. Intermediação: R$ 5.100,00. Total: R$ 67.763,17.\n" +
      "Intermediadora: WAM COMERCIALIZAÇÃO S.A. (CNPJ 17.919.649/0001-03).\n" +
      "GSign Document ID: H4RT4FGVPL-BT7863T-4VCWEVY3MJW10A-L87HT.\n" +
      "Cônjuge: Carolina Ferrari, CPF 109.002.069-42, RG 5823345 SSP/SC, nasc 15/11/1996, Empresário, tel (47) 98466-2124.\n" +
      "Testemunhas: Noendell Leonnardo Coelho Barreto; Alan Guilherme Guimarães (CPF 416.740.568-77).\n" +
      "Não conheceu pessoalmente a unidade/empreendimento (marcou 'Não').\n" +
      "Nasc: 16/04/1991. Profissão: Empresário. Matrícula: 38.236."
  },

  /* ── Ficha 108 ─────────────────────────────────────────────── */
  {
    id: 108,
    nome: "Cristina da Silva Lopes",
    cpf: "111.036.616-71",
    rg: "1103661671",
    orgaoEmissor: "PC MG",
    estadoCivil: "Solteiro",
    empresa: "WAM",
    razaoSocial: "S.P.E. MIRANTE INVESTIMENTO IMOBILIÁRIOS S/A",
    cnpj: "18.622.215/0001-00",
    empreendimento: "Kawana Residence",
    bloco: "02",
    unidade: "303",
    andar: "",
    cota: "D/K",
    fracao: "1/52",
    localizacao: "GOIÁS",
    cidade: "Caldas Novas",
    numeroContrato: "313497",
    valorContrato: 82190.00,
    valorIntermediacaoTotal: 12400.00,
    valorPago: 12400.00,
    parcelas: [
      { tipo: "Intermediação TED/DOC/Depósito", qtd: 1, valor: 6000.00, forma: "TED/DOC/Depósito", vencimento: "2026-08-30" },
      { tipo: "Intermediação cartão crédito", qtd: 10, valor: 640.00, forma: "VISA Crédito", vencimento: "2026-08-30" },
      { tipo: "Parcelas cota", qtd: 99, valor: 830.20, forma: "Boleto", vencimento: "2026-09-15" }
    ],
    formaPagamentoEntrada: "1x R$ 6.000 TED/DOC/depósito + 10x R$ 640 VISA crédito (intermediação) + 99x R$ 830,20 boleto (cota, 1º venc 15/09/2026)",
    formaReembolso: "Reembolso + Estorno Cartão",
    dataAssinatura: "2026-08-30",
    telefone: "(34) 99905-9563",
    email: "cristinalopescr7@gmail.com",
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/313497-cristina-kwr-bl02-303-cota-dk--contrato.pdf" }
    ],
    pix: "",
    notaEnvio: "O termo de distrato precisa ser assinado novamente via gov.br.",
    observacoes:
      "VALOR PAGO = R$ 12.400,00 — TED/DOC/depósito R$ 6.000 + cartão crédito VISA 10x R$ 640 (valor cheio R$ 6.400).\n" +
      "Intermediação total R$ 12.400: TED/DOC/depósito R$ 6.000 (pago) + VISA crédito R$ 6.400 (valor cheio).\n" +
      "DEVOLUÇÃO: Reembolso R$ 6.000 (TED/DOC/depósito) + Estorno Cartão R$ 6.400 (VISA crédito 10x R$ 640).\n" +
      "DENTRO DO PRAZO — contrato 30/08/2026, prazo 06/09/2026, hoje 01/09/2026.\n" +
      "Parcelas cota: 99x R$ 830,20 boleto (1ª 15/09/2026 — NÃO VENCIDO).\n" +
      "Preço cota (sem intermediação): R$ 82.190,00. Intermediação: R$ 12.400,00. Total: R$ 94.590,00.\n" +
      "Intermediadora: WAM COMERCIALIZAÇÃO S.A. (CNPJ 17.919.649/0001-03).\n" +
      "PDF inclui Contrato de Cessão Kawana Park (TALLIN SPE LTDA) — mesma unidade, sem pagamento adicional.\n" +
      "GSign Document ID: FYRE0AHMMM-KPLEU1B-4LUHNUF8TE5V78-0R0UH.\n" +
      "Testemunhas: Wanderson Santos da Silveira; Yasmin Lorrane Silva Gomes (CPF 058.624.011-05).\n" +
      "Não conheceu pessoalmente a unidade/empreendimento (marcou 'Não').\n" +
      "Nasc: 27/01/1990. Profissão: Secretária. Matrícula: 77.345. Semanas de uso: 4/ano."
  },

  /* ── Ficha 109 ─────────────────────────────────────────────── */
  {
    id: 109,
    nome: "Maria Luana Moura de Magalhães dos Santos",
    cpf: "115.650.694-80",
    rg: "4340075 SSP/PB",
    estadoCivil: "Solteira",
    empresa: "WAM",
    razaoSocial: "Consórcio Dom Pedro Laguna",
    cnpj: "43.740.923/0001-92",
    empreendimento: "Hotel Dom Pedro Laguna",
    bloco: "01",
    apartamento: "107",
    cota: "10",
    fracao: "1/52",
    localizacao: "Ceará",
    valorPago: 5200,
    parcelas: [
      { tipo: "Sinal de proposta (cartão crédito)", qtd: 1, valor: 5200, forma: "Cartão de Crédito" }
    ],
    formaPagamentoEntrada: "R$ 5.200,00 cartão de crédito (sinal de proposta)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-31",
    telefone: "",
    email: "",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },
    arquivos: [
      { titulo: "Distrato assinado", arquivo: "contratos-pdf/109-maria-luana-dom-pedro-laguna-bl01-107-cota10--distrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 5.200,00 — estorno no cartão de crédito (sinal de proposta).\n" +
      "Distrato já assinado manuscritamente em 31/08/2026.\n" +
      "Razão social: Consórcio Dom Pedro Laguna (CNPJ 43.740.923/0001-92).\n" +
      "Documento recebido é o próprio distrato (1 página), não o contrato original.\n" +
      "Nacionalidade: brasileira. RG: 4340075 SSP/PB."
  },

  /* ── Ficha 110 ─────────────────────────────────────────────── */
  {
    id: 110,
    nome: "Walkyria Ferreira da Silva Felix",
    cpf: "067.299.234-58",
    rg: "30929695 SSP AL",
    estadoCivil: "Casada",
    empresa: "GAV",
    razaoSocial: "GAV Maragogi Empreendimento Imobiliário SPE LTDA.",
    cnpj: "39.757.445/0001-56",
    empreendimento: "Oikos Maragogi Resort",
    bloco: "01",
    apartamento: "UH 035",
    cota: "21",
    fracao: "1/52",
    localizacao: "Maragogi/AL",
    valorPago: 14900.17,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 1250, forma: "PIX", vencimento: "2024-01-27" },
      { tipo: "Corretagem boleto", qtd: 4, valor: 685, forma: "Boleto", vencimento: "2024-02-05" },
      { tipo: "Sinal", qtd: 4, valor: 379.63, forma: "", vencimento: "2024-06-05" },
      { tipo: "Saldo", qtd: 68, valor: 365.61, forma: "", vencimento: "2024-10-05" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.250 PIX + 4x R$ 685 boleto = R$ 3.990 | Sinal: 4x R$ 379,63 | Saldo: 68x R$ 365,61",
    formaReembolso: "Reembolso",
    dataAssinatura: "2024-01-27",
    telefone: "(82) 982106558",
    email: "walkyriaf92@gmail.com",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/110-walkyria-oikos-maragogi-bl01-uh035-cota21--contrato.pdf" },
      { titulo: "Extrato Pgto", arquivo: "contratos-pdf/110-walkyria-extrato-uh035-cota21.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 14.900,17 (CONFIRMADO por extrato GAV 06/09/2026) — 32 parcelas pagas (5 entrada + 4 sinal + 23 saldo).\n" +
      "Principal R$ 13.917,53 + Correção INCC R$ 964,72 + Multa R$ 16,29 + Juros atraso R$ 1,63.\n" +
      "Venda 7150. Corretagem R$ 3.990: PIX R$ 1.250 (27/01/2024) + Boleto 4x R$ 685 (a partir 05/02/2024).\n" +
      "Sinal R$ 1.518,50: 4x R$ 379,63 (a partir 05/06/2024). Saldo R$ 24.861,48: 68x R$ 365,61 (a partir 05/10/2024).\n" +
      "Valor total contrato: R$ 30.369,98. 32 pagas, 45 a pagar, 1 atrasada (P/24 venc 05/09/2026).\n" +
      "FORA DO PRAZO — contrato 27/01/2024, prazo 03/02/2024.\n" +
      "ATENÇÃO: Nº Documento PIX (RESN9019060093/76117120240127/T145738) IDÊNTICO nos 4 contratos — conferir se 1 PIX rateado ou 4 separados.\n" +
      "D4Sign: a35382e3-a4e8-49ea-8bfe-b5f3fdc3072e. Assinatura presencial 27/01/2024.\n" +
      "Nasc: 29/11/1985. Profissão: Empresária. Endereço: Rua São Francisco, 297, Centro, Dois Riachos/AL."
  },

  /* ── Ficha 111 ─────────────────────────────────────────────── */
  {
    id: 111,
    nome: "Walkyria Ferreira da Silva Felix",
    cpf: "067.299.234-58",
    rg: "30929695 SSP AL",
    estadoCivil: "Casada",
    empresa: "GAV",
    razaoSocial: "GAV Maragogi Empreendimento Imobiliário SPE LTDA.",
    cnpj: "39.757.445/0001-56",
    empreendimento: "Oikos Maragogi Resort",
    bloco: "01",
    apartamento: "UH 025",
    cota: "09",
    fracao: "1/52",
    localizacao: "Maragogi/AL",
    valorPago: 14900.17,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 1250, forma: "PIX", vencimento: "2024-01-27" },
      { tipo: "Corretagem boleto", qtd: 4, valor: 685, forma: "Boleto", vencimento: "2024-02-05" },
      { tipo: "Sinal", qtd: 4, valor: 379.63, forma: "", vencimento: "2024-06-05" },
      { tipo: "Saldo", qtd: 68, valor: 365.61, forma: "", vencimento: "2024-10-05" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.250 PIX + 4x R$ 685 boleto = R$ 3.990 | Sinal: 4x R$ 379,63 | Saldo: 68x R$ 365,61",
    formaReembolso: "Reembolso",
    dataAssinatura: "2024-01-27",
    telefone: "(82) 982106558",
    email: "walkyriaf92@gmail.com",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/111-walkyria-oikos-maragogi-bl01-uh025-cota09--contrato.pdf" },
      { titulo: "Extrato Pgto", arquivo: "contratos-pdf/111-walkyria-extrato-uh025-cota09.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 14.900,17 (CONFIRMADO por extrato GAV 06/09/2026) — Venda 7148. 32 parcelas pagas. Ver detalhes ficha 110.\n" +
      "D4Sign: 4b228772-0a5d-4d84-9ceb-292ff071f07d."
  },

  /* ── Ficha 112 ─────────────────────────────────────────────── */
  {
    id: 112,
    nome: "Walkyria Ferreira da Silva Felix",
    cpf: "067.299.234-58",
    rg: "30929695 SSP AL",
    estadoCivil: "Casada",
    empresa: "GAV",
    razaoSocial: "GAV Maragogi Empreendimento Imobiliário SPE LTDA.",
    cnpj: "39.757.445/0001-56",
    empreendimento: "Oikos Maragogi Resort",
    bloco: "01",
    apartamento: "UH 048",
    cota: "07",
    fracao: "1/52",
    localizacao: "Maragogi/AL",
    valorPago: 14900.17,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 1250, forma: "PIX", vencimento: "2024-01-27" },
      { tipo: "Corretagem boleto", qtd: 4, valor: 685, forma: "Boleto", vencimento: "2024-02-05" },
      { tipo: "Sinal", qtd: 4, valor: 379.63, forma: "", vencimento: "2024-06-05" },
      { tipo: "Saldo", qtd: 68, valor: 365.61, forma: "", vencimento: "2024-10-05" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.250 PIX + 4x R$ 685 boleto = R$ 3.990 | Sinal: 4x R$ 379,63 | Saldo: 68x R$ 365,61",
    formaReembolso: "Reembolso",
    dataAssinatura: "2024-01-27",
    telefone: "(82) 982106558",
    email: "walkyriaf92@gmail.com",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/112-walkyria-oikos-maragogi-bl01-uh048-cota07--contrato.pdf" },
      { titulo: "Extrato Pgto", arquivo: "contratos-pdf/112-walkyria-extrato-uh048-cota07.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 14.900,17 (CONFIRMADO por extrato GAV 06/09/2026) — Venda 7151. 32 parcelas pagas. Ver detalhes ficha 110.\n" +
      "D4Sign: 1a80f290-68d8-41d9-82a0-7fb44f2bc157."
  },

  /* ── Ficha 113 ─────────────────────────────────────────────── */
  {
    id: 113,
    nome: "Walkyria Ferreira da Silva Felix",
    cpf: "067.299.234-58",
    rg: "30929695 SSP AL",
    estadoCivil: "Casada",
    empresa: "GAV",
    razaoSocial: "GAV Maragogi Empreendimento Imobiliário SPE LTDA.",
    cnpj: "39.757.445/0001-56",
    empreendimento: "Oikos Maragogi Resort",
    bloco: "01",
    apartamento: "UH 004",
    cota: "08",
    fracao: "1/52",
    localizacao: "Maragogi/AL",
    valorPago: 14900.14,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 1250, forma: "PIX", vencimento: "2024-01-27" },
      { tipo: "Corretagem boleto", qtd: 4, valor: 685, forma: "Boleto", vencimento: "2024-02-05" },
      { tipo: "Sinal", qtd: 4, valor: 379.63, forma: "", vencimento: "2024-06-05" },
      { tipo: "Saldo", qtd: 68, valor: 365.61, forma: "", vencimento: "2024-10-05" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.250 PIX + 4x R$ 685 boleto = R$ 3.990 | Sinal: 4x R$ 379,63 | Saldo: 68x R$ 365,61",
    formaReembolso: "Reembolso",
    dataAssinatura: "2024-01-27",
    telefone: "(82) 982106558",
    email: "walkyriaf92@gmail.com",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/113-walkyria-oikos-maragogi-bl01-uh004-cota08--contrato.pdf" },
      { titulo: "Extrato Pgto", arquivo: "contratos-pdf/113-walkyria-extrato-uh004-cota08.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 14.900,14 (CONFIRMADO por extrato GAV 06/09/2026) — Venda 7149. 32 parcelas pagas. Ver detalhes ficha 110.\n" +
      "D4Sign: 5c57593d-7078-4b47-9bbe-629678b482e1."
  },

  /* ── Ficha 114 ─────────────────────────────────────────────── */
  {
    id: 114,
    nome: "Marines Salau Machado",
    cpf: "956.010.740-20",
    rg: "4079167351 SJS RS",
    estadoCivil: "Casada",
    empresa: "GAV",
    razaoSocial: "GAV Gramado Três Empreendimento Imobiliário SPE LTDA.",
    cnpj: "50.094.155/0001-02",
    empreendimento: "Gran Garden Resort",
    bloco: "A4",
    apartamento: "103",
    andar: "1",
    cota: "28",
    fracao: "1/52",
    localizacao: "Gramado/RS",
    valorPago: 5285.73,
    parcelas: [
      { tipo: "Corretagem débito", qtd: 1, valor: 4490, forma: "VISA Electron Débito", vencimento: "2026-07-10" },
      { tipo: "Sinal", qtd: 5, valor: 795.73, forma: "", vencimento: "2026-08-10" },
      { tipo: "Saldo", qtd: 91, valor: 781.37, forma: "", vencimento: "2027-01-10" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 4.490 VISA Electron débito (10/07/2026) | Sinal: 5x R$ 795,73 (1ª paga) | Saldo: 91x R$ 781,37",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-07-10",
    telefone: "(51) 984528578",
    email: "marymsalau@gmail.com",
    conjuge: { nome: "Paulo Rogerio Salau Machado", cpf: "438.771.500-63", rg: "1034047314 SSP RS", email: "paulorsalau@gmail.com" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/114-marines-gran-garden-bl-a4-103-cota28--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 5.285,73 — VISA Electron débito R$ 4.490 (corretagem) + 1ª parcela sinal R$ 795,73 (vencida 10/08/2026).\n" +
      "Corretagem R$ 4.490 (1 parcela, débito 10/07/2026, comprovante Laranjinha Itaú ****5170). Beneficiários: Leonardo Domingos, Guilherme Porcionato Coppo Mota, Cicero Augusto de Sousa Araujo, João Lucas de Moura Souza.\n" +
      "Sinal R$ 3.978,67: 5x R$ 795,73 (1ª 10/08/2026 — PAGA, 2ª 10/09 em diante). Saldo R$ 71.104,67: 91x R$ 781,37 (1ª 10/01/2027 — não vencido).\n" +
      "Valor total contrato: R$ 79.573,34.\n" +
      "FORA DO PRAZO — contrato 10/07/2026, prazo 17/07/2026.\n" +
      "Cônjuge: Paulo Rogerio Salau Machado (CPF 438.771.500-63, tel (51) 984453205, paulorsalau@gmail.com).\n" +
      "ZapSign: 66eddfcd-161a-4c23-89ab-c8a81a9d449e. Assinatura digital 10/07/2026.\n" +
      "Nasc: 12/03/1979. Profissão: Técnico em Enfermagem. Endereço: Rua Santa Cecilia, 1630, Ap 101, Rio Branco, Porto Alegre/RS."
  },

  /* ── Ficha 115 ─────────────────────────────────────────────── */
  {
    id: 115,
    nome: "Vanessa Miranda de Almeida",
    cpf: "091.386.937-63",
    rg: "123424319 DETRAN RJ",
    estadoCivil: "União estável",
    empresa: "GAV",
    razaoSocial: "GAV Gramado Três Empreendimento Imobiliário SPE LTDA.",
    cnpj: "50.094.155/0001-02",
    empreendimento: "Gran Garden Resort",
    bloco: "A2",
    apartamento: "005",
    andar: "T",
    cota: "17",
    fracao: "1/52",
    localizacao: "Gramado/RS",
    valorPago: 4490,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 4490, forma: "PIX", vencimento: "2026-08-23" },
      { tipo: "Sinal", qtd: 5, valor: 767.32, forma: "", vencimento: "2026-09-10" },
      { tipo: "Saldo", qtd: 91, valor: 751.71, forma: "", vencimento: "2027-02-10" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 4.490 PIX (23/08/2026) | Sinal: 5x R$ 767,32 (1ª 10/09/2026) | Saldo: 91x R$ 751,71 (1ª 10/02/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-23",
    telefone: "(21) 973193993",
    email: "vanessamirandagata@hotmail.com",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },
    arquivos: [],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 4.490,00 — PIX corretagem (Nº Doc RESV0820700093/814895B6KLI2HH/AB5BF45).\n" +
      "Sinal R$ 3.836,61: 5x R$ 767,32 (1ª 10/09/2026 — não vencida). Saldo R$ 68.405,61: 91x R$ 751,71 (1ª 10/02/2027).\n" +
      "Valor total contrato: R$ 76.732,22.\n" +
      "FORA DO PRAZO — contrato 23/08/2026, prazo 30/08/2026.\n" +
      "ZapSign: 1781f037-c31...-2508ed955520.\n" +
      "Nasc: 02/03/1981. Profissão: Eletricista. Endereço: Rua Duarte Pereira, 165, Wona, Belford Roxo/RJ, CEP 26175090.\n" +
      "ATENÇÃO: Ficha criada a partir de screenshot da proposta — PDF do contrato completo NÃO recebido."
  },

  /* ── Ficha 116 ─────────────────────────────────────────────── */
  {
    id: 116,
    nome: "Vanessa Ceccon Santos",
    cpf: "038.749.129-57",
    rg: "85530550 SESP PR",
    estadoCivil: "Casado(a)",
    empresa: "GAV",
    razaoSocial: "GAV Gramado Empreendimento Imobiliário SPE LTDA",
    cnpj: "45.042.537/0001-52",
    empreendimento: "Gran Valley Resort",
    bloco: "A",
    apartamento: "310",
    andar: "0",
    cota: "03",
    fracao: "1/52",
    localizacao: "Gramado/RS",
    valorPago: 0,
    parcelas: [
      { tipo: "Corretagem Cartão", qtd: 3, valor: 1330, forma: "Cartão ELO", vencimento: "2022-08-07" },
      { tipo: "Sinal", qtd: 4, valor: 716.27, forma: "", vencimento: "2022-11-15" },
      { tipo: "Saldo", qtd: 74, valor: 681.72, forma: "", vencimento: "2023-03-15" }
    ],
    formaPagamentoEntrada: "Corretagem: 3x R$ 1.330 Cartão ELO/CréditoParcelado (Cielo, Doc 651781, 1º venc. 07/08/2022) | Sinal: 4x R$ 716,27 (1º venc. 15/11/2022) | Saldo: 74x R$ 681,72 (1º venc. 15/03/2023)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2022-07-08",
    telefone: "(41) 988974533",
    email: "vanessacecconsantos.vcs@gmail.com",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/116-vanessa-ceccon-santos-gran-valley-resort-bl-a-310-cota03--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 0 — aguardando informação do usuário.\n" +
      "Corretagem R$ 3.990 (3x R$ 1.330, Cartão ELO/CréditoParcelado Cielo, Doc 651781, 1º venc. 07/08/2022).\n" +
      "Sinal R$ 2.865,10: 4x R$ 716,27 (1ª 15/11/2022). Saldo R$ 50.447,20: 74x R$ 681,72 (1ª 15/03/2023).\n" +
      "Valor total contrato: R$ 57.302,30.\n" +
      "FORA DO PRAZO — contrato 08/07/2022, prazo 15/07/2022.\n" +
      "Beneficiária corretagem: Anna Claudia Franca de Oliveira ME (CNPJ 23.258.831/000163).\n" +
      "D4Sign: 438a70e9-c143-42f2-8056-27e9e462280c. Assinatura presencial 08/07/2022.\n" +
      "Nasc: 31/10/1983. Profissão: Comerciante. Endereço: Eros Ruppel Abdala, 39, Centro, Tunas do Paraná/PR, CEP 83480000."
  },

  /* ── Ficha 117 ─────────────────────────────────────────────── */
  {
    id: 117,
    nome: "Júlia Stefany Dornelas Soares Brasileiro",
    cpf: "114.325.536-40",
    rg: "MG18195005 PC MG",
    estadoCivil: "Solteiro",
    empresa: "WAM",
    razaoSocial: "NG20 Empreendimentos Imobiliários S/A",
    cnpj: "19.829.219/0001-26",
    empreendimento: "Praias do Lago Eco Resort",
    bloco: "I",
    apartamento: "307",
    andar: "",
    cota: "02",
    fracao: "1/52",
    localizacao: "Caldas Novas/GO",
    valorPago: 2000,
    parcelas: [
      { tipo: "Intermediação Cartão", qtd: 1, valor: 1000, forma: "Cartão Crédito Cielo", vencimento: "" },
      { tipo: "Intermediação Recorrente", qtd: 2, valor: 2140, forma: "Crédito Recorrente", vencimento: "" },
      { tipo: "Cota Sinal", qtd: 5, valor: 50, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota Saldo", qtd: 88, valor: 524.96, forma: "Boleto", vencimento: "2027-02-15" }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 1.000 Cartão Crédito Cielo + 2x R$ 2.140 Crédito Recorrente (total R$ 5.280) | Cota: 5x R$ 50 boleto (1ª 15/09/2026) + 88x R$ 524,96 boleto (1ª 15/02/2027)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-29",
    telefone: "(34) 999758207",
    email: "jliastefany@yahoo.com",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/117-julia-stefany-praias-do-lago-bl-i-307-cota02--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 2.000,00 — corrigido conforme informação do responsável (valor efetivamente cobrado). Nenhum boleto vencido.\n" +
      "Intermediação prevista no contrato: 1x R$ 1.000 Cartão Crédito Cielo + 2x R$ 2.140 Crédito Recorrente (total contratual R$ 5.280), devida à WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Cota R$ 46.446,75: 5x R$ 50 boleto (1ª 15/09/2026) + 88x R$ 524,96 boleto (1ª 15/02/2027).\n" +
      "Valor total: R$ 51.726,75.\n" +
      "DENTRO DO PRAZO — contrato 29/08/2026, prazo 05/09/2026.\n" +
      "GSign: KKZ2UK9MHB-8OIFK08-UQV2OOSJOUA2DD-GM0YP. Assinatura digital 29/08/2026.\n" +
      "Náutico Praia Clube Nº 07-I307/02 (Cedente: W.Palmerston & Tavares, CNPJ 05.513.549/0001-01).\n" +
      "Nasc: 05/02/1994. Profissão: Auxiliar Administrativo. Endereço: Rua Dina Aparecida da Silva, 165, Jardim Esperança, Patos de Minas/MG, CEP 38703735.\n" +
      "Tel. secundário: (34) 99184-1587."
  },

  /* ── Ficha 118 ─────────────────────────────────────────────── */
  {
    id: 118,
    nome: "Marlon Pereira Mello Barbosa",
    cpf: "700.183.996-57",
    rg: "MG17375796 SSP MG",
    estadoCivil: "Casado — Comunhão Parcial",
    empresa: "WAM",
    razaoSocial: "S.P.E. Mirante Investimento Imobiliários S/A",
    cnpj: "18.622.215/0001-00",
    empreendimento: "Kawana Residence",
    bloco: "02",
    apartamento: "201",
    andar: "",
    cota: "P/F",
    fracao: "1/52",
    localizacao: "Caldas Novas/GO",
    valorPago: 2850,
    parcelas: [
      { tipo: "Intermediação TED/Depósito", qtd: 1, valor: 300, forma: "TED/DOC/Depósito", vencimento: "" },
      { tipo: "Intermediação Boleto", qtd: 2, valor: 1275, forma: "Boleto Itaú", vencimento: "" },
      { tipo: "Cota Sinal", qtd: 3, valor: 50, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota Saldo", qtd: 84, valor: 448.51, forma: "Boleto", vencimento: "2026-12-20" }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 300 TED/DOC/Depósito + 2x R$ 1.275 Boleto Itaú (total R$ 2.850) | Cota: 3x R$ 50 boleto (1ª 15/09/2026) + 84x R$ 448,51 boleto (1ª 20/12/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-12",
    telefone: "(31) 984913297",
    email: "sobrinhosvidaa@gmail.com",
    conjuge: { nome: "Bruna Stefanny de Souza Pena", cpf: "020.995.386-11", rg: "MG20227949 SSP MG", email: "stefanny.bruna@icloud.com" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/118-marlon-pereira-kawana-residence-bl02-201-cotapf--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 2.850 — intermediação completa: 1x R$ 300 depósito + 2x R$ 1.275 boleto Itaú (confirmado pago). Boletos cota não vencidos.\n" +
      "Intermediação R$ 2.850: 1x R$ 300 TED/DOC/Depósito + 2x R$ 1.275 Boleto Itaú. Devida à WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Cota R$ 37.824,92: 3x R$ 50 boleto (1ª 15/09/2026) + 84x R$ 448,51 boleto (1ª 20/12/2026).\n" +
      "Valor total: R$ 40.674,92.\n" +
      "FORA DO PRAZO — contrato 12/08/2026, prazo 19/08/2026.\n" +
      "GSign: XP7Y39IW9B-RJUIHVA-L541FGE4XZARCC-P42B2. Assinatura digital 12/08/2026.\n" +
      "Cônjuge: Bruna Stefanny de Souza Pena (CPF 020.995.386-11, RG MG20227949 SSP MG, nasc. 15/10/2000, Administrador, stefanny.bruna@icloud.com).\n" +
      "Nasc: 25/02/1999. Profissão: Autônomo. Tel. secundário: (31) 98491-3297."
  },

  /* ── Ficha 119 ─────────────────────────────────────────────── */
  {
    id: 119,
    nome: "Andreia de Vasconcelos Silva Cardoso",
    cpf: "007.885.419-94",
    rg: "84305146 SESP PR",
    estadoCivil: "Casado(a)",
    empresa: "GAV",
    razaoSocial: "GAV Maragogi Empreendimento Imobiliário SPE LTDA",
    cnpj: "39.757.445/0001-56",
    empreendimento: "Oikos Maragogi Resort",
    bloco: "01",
    apartamento: "UH 212",
    andar: "2",
    cota: "02",
    fracao: "1/52",
    localizacao: "Maragogi/AL",
    valorPago: 2500,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 2500, forma: "PIX", vencimento: "2026-08-07" },
      { tipo: "Corretagem Boleto", qtd: 2, valor: 745, forma: "Boleto", vencimento: "2026-09-07" },
      { tipo: "Sinal", qtd: 4, valor: 752.76, forma: "", vencimento: "2026-11-05" },
      { tipo: "Saldo", qtd: 68, valor: 782.64, forma: "", vencimento: "2027-03-05" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 2.500 PIX (07/08/2026, Laranjinha Itaú CV 42859970) + 2x R$ 745 boleto (1ª 07/09/2026) | Sinal: 4x R$ 752,76 (1ª 05/11/2026) | Saldo: 68x R$ 782,64 (1ª 05/03/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-07",
    telefone: "(41) 996335914",
    email: "andreiavasconcelossilva@hotmail.com",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/119-andreia-vasconcelos-oikos-maragogi-bl01-uh212-cota02--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 2.500 — PIX corretagem (Laranjinha Itaú, CV 42859970, ID RESN911852009376117IBGT3Z29F70CEBA3). Boletos corretagem (2x R$ 745) vencem a partir de 07/09 — nenhum vencido.\n" +
      "Corretagem R$ 3.990: 1x R$ 2.500 PIX + 2x R$ 745 boleto (1ª 07/09/2026).\n" +
      "Sinal R$ 3.011,03: 4x R$ 752,76 (1ª 05/11/2026). Saldo R$ 53.219,52: 68x R$ 782,64 (1ª 05/03/2027).\n" +
      "Valor total contrato: R$ 60.220,55.\n" +
      "FORA DO PRAZO — contrato 07/08/2026, prazo 14/08/2026.\n" +
      "ZapSign: fe75ae10-7a6c-49fe-8d68-4c9fd434110a. Assinatura digital 07/08/2026 19:56.\n" +
      "Flow: ficha negociação aceita 07/08/2026 19:44. Consultor: Higor Pires da Silva.\n" +
      "Nasc: 20/09/1982. Profissão: Psicóloga. Endereço: Rua Jose Bassa, 1373, Sítio Cercado, Curitiba/PR, CEP 81920500."
  },

  /* ── Ficha 120 ─────────────────────────────────────────────── */
  {
    id: 120,
    nome: "Julia Maria Poggere",
    cpf: "109.919.719-81",
    rg: "128575847 SESP PR",
    estadoCivil: "União estável",
    empresa: "GAV",
    razaoSocial: "GAV Muro Alto 2 Empreendimento Imobiliário SPE LTDA",
    cnpj: "39.673.888/0001-69",
    empreendimento: "Porto 2 Life Resort",
    bloco: "05",
    apartamento: "0326",
    andar: "2",
    cota: "26",
    fracao: "1/52",
    localizacao: "Ipojuca/PE",
    valorPago: 3990,
    parcelas: [
      { tipo: "Corretagem Cartão", qtd: 3, valor: 1330, forma: "Cartão VISA CréditoParcelado", vencimento: "2026-09-27" },
      { tipo: "Sinal", qtd: 4, valor: 1065.58, forma: "", vencimento: "2026-12-10" },
      { tipo: "Saldo", qtd: 80, valor: 962.43, forma: "", vencimento: "2027-04-10" }
    ],
    formaPagamentoEntrada: "Corretagem: 3x R$ 1.330 Cartão VISA/CréditoParcelado (Rede, Doc 20640372, 1º venc. 27/09/2026) | Sinal: 4x R$ 1.065,58 (1ª 10/12/2026) | Saldo: 80x R$ 962,43 (1ª 10/04/2027)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-28",
    telefone: "(65) 996975582",
    email: "claudiosimionatto@hotmail.com",
    conjuge: { nome: "", cpf: "", rg: "", email: "" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/120-julia-poggere-porto2-life-bl05-0326-cota26--contrato.pdf" }
    ],
    pix: "",
    notaEnvio: "Estamos reenviando o termo de distrato, que agora consta o estorno referente aos dois contratos.",
    observacoes:
      "VALOR PAGO = R$ 3.990 — corretagem Cartão VISA ****1437 CréditoParcelado (Rede, CV 20640372, 3x R$ 1.330). Nenhum boleto vencido.\n" +
      "ATENÇÃO: Comprovante Laranjinha Itaú (CV 20640372) mostra R$ 7.980 (3x R$ 2.660) — dobro da corretagem deste contrato. Possível 2 contratos no mesmo cartão.\n" +
      "Corretagem R$ 3.990: 3x R$ 1.330 Cartão VISA (1ª 27/09/2026). Beneficiários: Emanuelly Nathalia, Gabriel Augusto Alves Viana, Cesar Oliveira da S, Patricia Cardoso de Araujo.\n" +
      "Sinal R$ 4.262,33: 4x R$ 1.065,58 (1ª 10/12/2026). Saldo R$ 76.994,40: 80x R$ 962,43 (1ª 10/04/2027).\n" +
      "Valor total contrato: R$ 85.246,73.\n" +
      "DENTRO DO PRAZO — contrato 28/08/2026, prazo 04/09/2026.\n" +
      "ZapSign: 51ce7cff-38e6-44c5-9f0a-4298d701b75b. Assinatura digital 28/08/2026 11:50.\n" +
      "Flow: ficha negociação aceita 28/08/2026 11:40. Consultor: Gabriel Augusto Alves Viana.\n" +
      "Nasc: 06/04/1997. Profissão: Analista Administrativo(a). Endereço: Rodovia MT 199, SN, Casa, Zona Rural, Vila Bela da Santíssima Trindade/MT, CEP 78245000."
  },

  /* ── Ficha 121 ─────────────────────────────────────────────── */
  {
    id: 121,
    nome: "Fernanda Raquel Correa de Paula Candido",
    cpf: "030.879.906-20",
    rg: "03087990620 PC MG",
    estadoCivil: "Casado — Comunhão Parcial",
    empresa: "WAM",
    razaoSocial: "S.P.E. Mirante Investimento Imobiliários S/A",
    cnpj: "18.622.215/0001-00",
    empreendimento: "Kawana Residence",
    bloco: "01",
    apartamento: "402",
    andar: "",
    cota: "O/B",
    fracao: "1/52",
    localizacao: "Caldas Novas/GO",
    valorPago: 3350,
    parcelas: [
      { tipo: "Intermediação Cartão", qtd: 4, valor: 837.50, forma: "Master Crédito", vencimento: "" },
      { tipo: "Cota Sinal", qtd: 3, valor: 50, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota Saldo", qtd: 84, valor: 531.84, forma: "Boleto", vencimento: "2026-12-20" }
    ],
    formaPagamentoEntrada: "Intermediação: 4x R$ 837,50 Master Crédito (total R$ 3.350) | Cota: 3x R$ 50 boleto (1ª 15/09/2026) + 84x R$ 531,84 boleto (1ª 20/12/2026)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-28",
    telefone: "(35) 998510819",
    email: "ferraquel50@gmail.com",
    conjuge: { nome: "Marcelo Vilela da Cruz", cpf: "833.415.366-04", rg: "M7363821 SSP MG", email: "vilelamarcelo834@gmail.com" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/121-fernanda-raquel-kawana-residence-bl01-402-cotaob--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.350 — intermediação 4x R$ 837,50 Master Crédito. Nenhum boleto vencido.\n" +
      "Intermediação R$ 3.350 devida à WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Cota R$ 44.824,92: 3x R$ 50 boleto (1ª 15/09/2026) + 84x R$ 531,84 boleto (1ª 20/12/2026).\n" +
      "Valor total: R$ 48.174,92.\n" +
      "DENTRO DO PRAZO — contrato 28/08/2026, prazo 04/09/2026.\n" +
      "GSign: 540MPXC3RM-XV7EVCV-LQDZ1OXRNLVC05-7WEV2. Assinatura digital 28/08/2026.\n" +
      "Cônjuge: Marcelo Vilela da Cruz (CPF 833.415.366-04, RG M7363821 SSP MG, nasc. 17/08/1972, Ferroviário, tel (35) 98804-4459, vilelamarcelo834@gmail.com).\n" +
      "Nasc: 04/01/1977. Profissão: Administrador de Empresas. Tel. secundário: (35) 99851-0819."
  },

  /* ── Ficha 122 ─────────────────────────────────────────────── */
  {
    id: 122,
    nome: "Fernanda Raquel Correa de Paula Candido",
    cpf: "030.879.906-20",
    rg: "03087990620 PC MG",
    estadoCivil: "Casado — Comunhão Parcial",
    empresa: "WAM",
    razaoSocial: "S.P.E. Mirante Investimento Imobiliários S/A",
    cnpj: "18.622.215/0001-00",
    empreendimento: "Kawana Residence",
    bloco: "02",
    apartamento: "202",
    andar: "",
    cota: "O/L",
    fracao: "1/52",
    localizacao: "Caldas Novas/GO",
    valorPago: 3350,
    parcelas: [
      { tipo: "Intermediação Cartão", qtd: 4, valor: 837.50, forma: "Master Crédito", vencimento: "" },
      { tipo: "Cota Sinal", qtd: 3, valor: 50, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota Saldo", qtd: 84, valor: 531.84, forma: "Boleto", vencimento: "2026-12-20" }
    ],
    formaPagamentoEntrada: "Intermediação: 4x R$ 837,50 Master Crédito (total R$ 3.350) | Cota: 3x R$ 50 boleto (1ª 15/09/2026) + 84x R$ 531,84 boleto (1ª 20/12/2026)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-28",
    telefone: "(35) 998510819",
    email: "ferraquel50@gmail.com",
    conjuge: { nome: "Marcelo Vilela da Cruz", cpf: "833.415.366-04", rg: "M7363821 SSP MG", email: "vilelamarcelo834@gmail.com" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/122-fernanda-raquel-kawana-residence-bl02-202-cotaol--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.350 — intermediação 4x R$ 837,50 Master Crédito. Nenhum boleto vencido.\n" +
      "Intermediação R$ 3.350 devida à WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Cota R$ 44.824,92: 3x R$ 50 boleto (1ª 15/09/2026) + 84x R$ 531,84 boleto (1ª 20/12/2026).\n" +
      "Valor total: R$ 48.174,92.\n" +
      "DENTRO DO PRAZO — contrato 28/08/2026, prazo 04/09/2026.\n" +
      "GSign: D8BAT88TNR-ICLS84Q-F9STS77JIJXCIR-H2YRG. Assinatura digital 28/08/2026.\n" +
      "Cônjuge: Marcelo Vilela da Cruz (CPF 833.415.366-04, RG M7363821 SSP MG, nasc. 17/08/1972, Ferroviário, tel (35) 98804-4459, vilelamarcelo834@gmail.com).\n" +
      "Nasc: 04/01/1977. Profissão: Administrador de Empresas. Tel. secundário: (35) 99851-0819."
  },

  /* ── Ficha 123 ─────────────────────────────────────────────── */
  {
    id: 123,
    nome: "Andre Luiz Santana Moraes",
    cpf: "970.875.302-59",
    rg: "5864006 2VIA PC PA",
    estadoCivil: "União Estável",
    empresa: "GAV",
    razaoSocial: "Beach GAV Resorts Empreendimentos Imobiliários SPE Ltda",
    cnpj: "33.531.685/0001-51",
    empreendimento: "Beach GAV Resorts",
    bloco: "02",
    apartamento: "1509",
    andar: "15",
    cota: "03",
    fracao: "1/52",
    localizacao: "Salinópolis/PA",
    valorPago: 3990,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 1000, forma: "PIX", vencimento: "2026-02-21" },
      { tipo: "Corretagem Boleto", qtd: 5, valor: 598, forma: "Boleto", vencimento: "2026-03-21" },
      { tipo: "Sinal", qtd: 4, valor: 559.46, forma: "Boleto", vencimento: "2026-08-15" },
      { tipo: "Saldo", qtd: 68, valor: 566.60, forma: "Boleto", vencimento: "2026-12-15" }
    ],
    formaPagamentoEntrada: "Corretagem: PIX R$ 1.000 (21/02/2026) + 5x R$ 598 boleto (1ª 21/03/2026) = R$ 3.990 | Sinal: 4x R$ 559,46 (1ª 15/08/2026) | Saldo: 68x R$ 566,60 (1ª 15/12/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-02-21",
    telefone: "(91) 982804799",
    email: "andremoraesfoto@gmail.com",
    conjuge: { nome: "Deusangela Bentes Guimaraes", cpf: "016.175.282-93", rg: "6356683 6VIA PC PA", email: "deuzaguimaraes@hotmail.com" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/123-andre-luiz-beach-gav-resorts-bl02-1509-cota03--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990 — corretagem: PIX R$ 1.000 + 5 boletos R$ 598 (venc. 21/03 a 21/07/2026, todos vencidos).\n" +
      "Valor total venda: R$ 44.756,64. Corretagem: R$ 3.990.\n" +
      "FORA DO PRAZO — contrato 21/02/2026, prazo 28/02/2026.\n" +
      "D4Sign: 53b0b3bb-528b-47cd-89c4-491c68afd11c. Certificado 22/02/2026.\n" +
      "ATENÇÃO: Nº Documento PIX idêntico nos 2 contratos (123+124): RESN1219350095 158243F8JBVALI8 903512 — conferir se foi 1 PIX rateado ou 2 separados.\n" +
      "São 2 contratos (Cota 03 + Cota 09), R$ 3.990 corretagem cada.\n" +
      "Cônjuge: Deusangela Bentes Guimaraes (CPF 016.175.282-93, RG 6356683 6VIA PC PA, nasc. 10/09/1991, Empresária, tel (91) 99807-8288, deuzaguimaraes@hotmail.com).\n" +
      "Nasc: 17/12/1988. Profissão: Fotógrafo. End: Travessa Angustura 2983, Bairro Marco, Belém/PA, CEP 66093040."
  },

  /* ── Ficha 124 ─────────────────────────────────────────────── */
  {
    id: 124,
    nome: "Andre Luiz Santana Moraes",
    cpf: "970.875.302-59",
    rg: "5864006 2VIA PC PA",
    estadoCivil: "União Estável",
    empresa: "GAV",
    razaoSocial: "Beach GAV Resorts Empreendimentos Imobiliários SPE Ltda",
    cnpj: "33.531.685/0001-51",
    empreendimento: "Beach GAV Resorts",
    bloco: "02",
    apartamento: "1519",
    andar: "15",
    cota: "09",
    fracao: "1/52",
    localizacao: "Salinópolis/PA",
    valorPago: 3990,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 1000, forma: "PIX", vencimento: "2026-02-21" },
      { tipo: "Corretagem Boleto", qtd: 5, valor: 598, forma: "Boleto", vencimento: "2026-03-21" },
      { tipo: "Sinal", qtd: 4, valor: 559.46, forma: "Boleto", vencimento: "2026-08-15" },
      { tipo: "Saldo", qtd: 68, valor: 566.60, forma: "Boleto", vencimento: "2026-12-15" }
    ],
    formaPagamentoEntrada: "Corretagem: PIX R$ 1.000 (21/02/2026) + 5x R$ 598 boleto (1ª 21/03/2026) = R$ 3.990 | Sinal: 4x R$ 559,46 (1ª 15/08/2026) | Saldo: 68x R$ 566,60 (1ª 15/12/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-02-21",
    telefone: "(91) 982804799",
    email: "andremoraesfoto@gmail.com",
    conjuge: { nome: "Deusangela Bentes Guimaraes", cpf: "016.175.282-93", rg: "6356683 6VIA PC PA", email: "deuzaguimaraes@hotmail.com" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/124-andre-luiz-beach-gav-resorts-bl02-1519-cota09--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990 — corretagem: PIX R$ 1.000 + 5 boletos R$ 598 (venc. 21/03 a 21/07/2026, todos vencidos).\n" +
      "Valor total venda: R$ 44.756,64. Corretagem: R$ 3.990.\n" +
      "FORA DO PRAZO — contrato 21/02/2026, prazo 28/02/2026.\n" +
      "D4Sign: ff1f808a-10c3-4e3c-825d-0e5dae58f3d2. Certificado 22/02/2026.\n" +
      "ATENÇÃO: Nº Documento PIX idêntico nos 2 contratos (123+124): RESN1219350095 158243F8JBVALI8 903512 — conferir se foi 1 PIX rateado ou 2 separados.\n" +
      "São 2 contratos (Cota 03 + Cota 09), R$ 3.990 corretagem cada.\n" +
      "Cônjuge: Deusangela Bentes Guimaraes (CPF 016.175.282-93, RG 6356683 6VIA PC PA, nasc. 10/09/1991, Empresária, tel (91) 99807-8288, deuzaguimaraes@hotmail.com).\n" +
      "Nasc: 17/12/1988. Profissão: Fotógrafo. End: Travessa Angustura 2983, Bairro Marco, Belém/PA, CEP 66093040."
  },

  /* ── Ficha 125 ─────────────────────────────────────────────── */
  {
    id: 125,
    nome: "Elielson Gama de Almeida",
    cpf: "510.215.362-53",
    rg: "303622 DPTC AP",
    estadoCivil: "Casado(a)",
    empresa: "GAV",
    razaoSocial: "Salinas Beach Resort Empreendimento Imobiliário SPE Ltda",
    cnpj: "33.531.685/0001-51",
    empreendimento: "Salinas Beach Resort",
    bloco: "02",
    apartamento: "1124",
    andar: "11",
    cota: "03",
    fracao: "1/52",
    localizacao: "Salinópolis/PA",
    valorPago: 15915.67,
    parcelas: [
      { tipo: "Corretagem Cartão Débito", qtd: 1, valor: 1330, forma: "VISA Débito Rede", vencimento: "2024-06-17" },
      { tipo: "Corretagem Cartão Crédito", qtd: 2, valor: 1330, forma: "VISA Crédito Parcelado Rede", vencimento: "2024-07-16" },
      { tipo: "Sinal", qtd: 4, valor: 497.07, forma: "Boleto", vencimento: "2024-09-15" },
      { tipo: "Saldo", qtd: 68, valor: 496.87, forma: "Boleto", vencimento: "2025-01-15" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.330 VISA Débito (doc 642443, 17/06/2024) + 2x R$ 1.330 VISA Crédito Parcelado (doc 015069, 16/07/2024) = R$ 3.990 | Sinal: 4x R$ 497,07 boleto (1ª 15/09/2024) | Saldo: 68x R$ 496,87 boleto (1ª 15/01/2025)",
    formaReembolso: "Reembolso + Estorno",
    dataAssinatura: "2024-06-16",
    telefone: "(96) 991421845",
    email: "elielsongalmeida@gmail.com",
    conjuge: { nome: "Josiane Monteiro Gama", cpf: "805.402.012-00", rg: "190920 PTC AP", email: "josianegama84@gmail.com" },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/125-elielson-gama-salinas-beach-resort-bl02-1124-cota03--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 15.915,67 — corretagem R$ 3.990 (cartão) + sinal R$ 1.988,27 (4 boletos vencidos set-dez/2024) + saldo R$ 9.937,40 (20 boletos vencidos jan/2025-ago/2026).\n" +
      "Corretagem: R$ 1.330 VISA Débito + R$ 2.660 VISA Crédito Parcelado.\n" +
      "Reembolso (sinal+saldo boleto) + Estorno (corretagem crédito). Débito R$ 1.330 também é Reembolso.\n" +
      "Valor total venda: R$ 39.765,43. Corretagem: R$ 3.990.\n" +
      "Sinal: R$ 1.988,27 (4x R$ 497,07 boleto, 1ª 15/09/2024, todos vencidos). Saldo: R$ 33.787,16 (68x R$ 496,87 boleto, 1ª 15/01/2025, 20 vencidos até 15/08/2026).\n" +
      "FORA DO PRAZO — contrato 16/06/2024, prazo 23/06/2024.\n" +
      "D4Sign: e81f4f11-d4ae-4539-acd2-e086a0422e7c. Certificado 16/06/2024.\n" +
      "Cônjuge: Josiane Monteiro Gama (CPF 805.402.012-00, RG 190920 PTC AP, nasc. 06/03/1984, Policial Militar, tel (96) 99128-2263, josianegama84@gmail.com).\n" +
      "Nasc: 27/07/1979. Profissão: Técnico Laboratório. End: Rua Luis Azarias 1132, Bairro Universidade, Macapá/AP, CEP 68903350."
  },

  /* ── Ficha 126 ─────────────────────────────────────────────── */
  {
    id: 126,
    nome: "Conceição Agostinho Amorim",
    cpf: "027.099.804-79",
    rg: "4201725 SDS PE",
    estadoCivil: "Casado(a)",
    empresa: "GAV",
    razaoSocial: "GAV Muro Alto 2 Empreendimento Imobiliário SPE Ltda",
    cnpj: "39.673.888/0001-69",
    empreendimento: "Porto 2 Life Resort",
    bloco: "04",
    apartamento: "0412",
    andar: "3",
    cota: "11",
    fracao: "1/52",
    localizacao: "Ipojuca/PE",
    valorPago: 16400.23,
    parcelas: [
      { tipo: "Corretagem PIX", qtd: 1, valor: 1330, forma: "PIX", vencimento: "2025-03-06" },
      { tipo: "Corretagem Boleto", qtd: 2, valor: 1330, forma: "Boleto", vencimento: "2025-04-05" },
      { tipo: "Sinal", qtd: 4, valor: 817.75, forma: "Boleto", vencimento: "2025-06-05" },
      { tipo: "Saldo", qtd: 70, valor: 830.84, forma: "Boleto", vencimento: "2025-10-05" }
    ],
    formaPagamentoEntrada: "Corretagem: PIX R$ 1.330 (06/03/2025) + 2x R$ 1.330 boleto (1ª 05/04/2025) = R$ 3.990 | Sinal: 4x R$ 817,75 (1ª 05/06/2025) | Saldo: 70x R$ 830,84 (1ª 05/10/2025)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2025-03-06",
    telefone: "(81) 995730234",
    email: "ceica.agostinho@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/126-conceicao-agostinho-porto2-life-bl04-0412-cota11--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 16.400,23 — corretagem R$ 3.990 (PIX R$ 1.330 + 2 boletos R$ 1.330 vencidos) + sinal R$ 3.270,99 (4 boletos vencidos jun-set/2025) + saldo R$ 9.139,24 (11 boletos vencidos out/2025-ago/2026).\n" +
      "Valor total venda: R$ 65.419,69. Corretagem: R$ 3.990.\n" +
      "Sinal: R$ 3.270,99 (4x R$ 817,75 boleto, 1ª 05/06/2025, todos vencidos). Saldo: R$ 58.158,70 (70x R$ 830,84 boleto, 1ª 05/10/2025, 11 vencidos até 05/08/2026).\n" +
      "FORA DO PRAZO — contrato 06/03/2025, prazo 13/03/2025.\n" +
      "D4Sign: 8fe36e74-f555-48a7-b16f-b9de21d4cf00. Certificado 06/03/2025.\n" +
      "Estado civil casado(a) mas cônjuge NÃO INFORMADO no contrato.\n" +
      "Nº Doc PIX: RESV0890210095 158073RBWIUPU 74533968.\n" +
      "Nasc: 01/04/1979. Profissão: Nutricionista. End: Rua Silveira de Carvalho 71, Apt 402, Bairro Tamarineira, Recife/PE, CEP 52110060."
  },

  /* ── Ficha 127 ─────────────────────────────────────────────── */
  {
    id: 127,
    nome: "Carla Denize Dias dos Santos Sambudio",
    cpf: "056.509.119-08",
    rg: "86141108 SESP PR",
    estadoCivil: "Casado(a)",
    empresa: "GAV",
    razaoSocial: "GAV Maragogi Empreendimento Imobiliário SPE Ltda",
    cnpj: "39.757.445/0001-56",
    empreendimento: "Oikos Maragogi Resort",
    bloco: "01",
    apartamento: "115",
    andar: "1",
    cota: "26",
    fracao: "1/52",
    localizacao: "Maragogi/AL",
    valorPago: 500,
    parcelas: [
      { tipo: "Corretagem Cartão", qtd: 1, valor: 500, forma: "Cartão AMEX Crédito à Vista", vencimento: "2026-10-04" },
      { tipo: "Corretagem Boleto", qtd: 4, valor: 373.75, forma: "Boleto", vencimento: "2026-11-04" },
      { tipo: "Sinal", qtd: 4, valor: 463.44, forma: "Boleto", vencimento: "2027-03-10" },
      { tipo: "Saldo", qtd: 68, valor: 488.62, forma: "Boleto", vencimento: "2027-07-10" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 500 cartão AMEX crédito à vista (Nº Doc 203834532, 04/10/2026) + 4x R$ 373,75 boleto (1ª 04/11/2026) = R$ 1.995 | Sinal: 4x R$ 463,44 (1ª 10/03/2027) | Saldo: 68x R$ 488,62 (1ª 10/07/2027)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-04",
    telefone: "(41) 99727-2777",
    email: "carladahmer@gmail.com",
    conjuge: {
      nome: "Douglas Fernandez Sambudio",
      cpf: "353.824.988-14",
      rg: "249773739 SSP SP"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/127-carla-denize-oikos-maragogi-bl01-uh115-cota26--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 500,00 — corretagem cartão AMEX crédito à vista R$ 500. Nenhum boleto vencido.\n" +
      "Comprovante cartão: R$ 1.000 num único CV 203834532 (AMEX ****9529, 04/09/26 21h08) — cobriu 2 contratos (R$ 500 cada, fichas 127 e 128).\n" +
      "Valor total venda: R$ 37.074,90. Corretagem: R$ 1.995.\n" +
      "Sinal: R$ 1.853,74 (4x R$ 463,44, 1ª 10/03/2027, nenhum vencido). Saldo: R$ 33.226,16 (68x R$ 488,62, 1ª 10/07/2027, nenhum vencido).\n" +
      "Corretagem boleto: 4x R$ 373,75 (1ª 04/11/2026, nenhum vencido).\n" +
      "DENTRO DO PRAZO — contrato 04/09/2026, prazo até 11/09/2026.\n" +
      "ZapSign: dc06f4a6-fb6f-4ffd-8b56-8eb7d7e1800b. Assinado 04/09/2026.\n" +
      "Cônjuge: Douglas Fernandez Sambudio (CPF 353.824.988-14, RG 249773739 SSP SP, nasc. 06/10/1987, Analista de Sistemas, tel (11) 97208-9608, sambudio13@gmail.com).\n" +
      "Nasc: 02/01/1987. Profissão: Analista de Sistemas. End: Rua Paulo Setubal SN, Bairro Boqueirao, Curitiba/PR, CEP 81670130."
  },

  /* ── Ficha 128 ─────────────────────────────────────────────── */
  {
    id: 128,
    nome: "Carla Denize Dias dos Santos Sambudio",
    cpf: "056.509.119-08",
    rg: "86141108 SESP PR",
    estadoCivil: "Casado(a)",
    empresa: "GAV",
    razaoSocial: "GAV Maragogi Empreendimento Imobiliário SPE Ltda",
    cnpj: "39.757.445/0001-56",
    empreendimento: "Oikos Maragogi Resort",
    bloco: "01",
    apartamento: "116",
    andar: "1",
    cota: "47",
    fracao: "1/52",
    localizacao: "Maragogi/AL",
    valorPago: 500,
    parcelas: [
      { tipo: "Corretagem Cartão", qtd: 1, valor: 500, forma: "Cartão AMEX Crédito à Vista", vencimento: "2026-10-04" },
      { tipo: "Corretagem Boleto", qtd: 4, valor: 373.75, forma: "Boleto", vencimento: "2026-11-04" },
      { tipo: "Sinal", qtd: 4, valor: 463.44, forma: "Boleto", vencimento: "2027-03-10" },
      { tipo: "Saldo", qtd: 68, valor: 488.62, forma: "Boleto", vencimento: "2027-07-10" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 500 cartão AMEX crédito à vista (Nº Doc 203834532, 04/10/2026) + 4x R$ 373,75 boleto (1ª 04/11/2026) = R$ 1.995 | Sinal: 4x R$ 463,44 (1ª 10/03/2027) | Saldo: 68x R$ 488,62 (1ª 10/07/2027)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-04",
    telefone: "(41) 99727-2777",
    email: "carladahmer@gmail.com",
    conjuge: {
      nome: "Douglas Fernandez Sambudio",
      cpf: "353.824.988-14",
      rg: "249773739 SSP SP"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/128-carla-denize-oikos-maragogi-bl01-uh116-cota47--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 500,00 — corretagem cartão AMEX crédito à vista R$ 500. Nenhum boleto vencido.\n" +
      "Comprovante cartão: R$ 1.000 num único CV 203834532 (AMEX ****9529, 04/09/26 21h08) — cobriu 2 contratos (R$ 500 cada, fichas 127 e 128).\n" +
      "Valor total venda: R$ 37.074,90. Corretagem: R$ 1.995.\n" +
      "Sinal: R$ 1.853,74 (4x R$ 463,44, 1ª 10/03/2027, nenhum vencido). Saldo: R$ 33.226,16 (68x R$ 488,62, 1ª 10/07/2027, nenhum vencido).\n" +
      "Corretagem boleto: 4x R$ 373,75 (1ª 04/11/2026, nenhum vencido).\n" +
      "DENTRO DO PRAZO — contrato 04/09/2026, prazo até 11/09/2026.\n" +
      "ZapSign: 70e21afd-aac9-4b03-a41f-4c3e23a6b434. Assinado 04/09/2026.\n" +
      "Cônjuge: Douglas Fernandez Sambudio (CPF 353.824.988-14, RG 249773739 SSP SP, nasc. 06/10/1987, Analista de Sistemas, tel (11) 97208-9608, sambudio13@gmail.com).\n" +
      "Nasc: 02/01/1987. Profissão: Analista de Sistemas. End: Rua Paulo Setubal SN, Bairro Boqueirao, Curitiba/PR, CEP 81670130."
  },

  /* ── Ficha 129 ─────────────────────────────────────────────── */
  {
    id: 129,
    nome: "Thiago Azevedo da Silva",
    cpf: "057.120.777-44",
    rg: "2016163469 SSP CE",
    estadoCivil: "Casado",
    empresa: "WAM",
    razaoSocial: "NG20 Empreendimentos Imobiliários S/A",
    cnpj: "19.829.219/0001-26",
    empreendimento: "Praias do Lago Eco Resort",
    bloco: "M",
    apartamento: "106",
    andar: "",
    cota: "04",
    fracao: "1/52",
    localizacao: "Caldas Novas/GO",
    valorPago: 6160,
    parcelas: [
      { tipo: "Intermediação Cartão Crédito", qtd: 1, valor: 2053.33, forma: "Cartão Crédito Cielo", vencimento: "" },
      { tipo: "Intermediação Recorrente", qtd: 2, valor: 2053.33, forma: "Crédito Recorrente", vencimento: "" },
      { tipo: "Cota Sinal", qtd: 3, valor: 50, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota Saldo", qtd: 88, valor: 526.10, forma: "Boleto", vencimento: "2026-12-15" }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 2.053,33 cartão crédito Cielo + 2x R$ 2.053,33 crédito recorrente = R$ 6.160 | Cota: 3x R$ 50 boleto (1ª 15/09/2026) + 88x R$ 526,10 boleto (1ª 15/12/2026)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-30",
    telefone: "(11) 98564-6320",
    email: "thiagoazevedosilva@hotmail.com",
    conjuge: {
      nome: "Luana de Azevedo Souza da Silva",
      cpf: "325.780.118-18",
      rg: "32578011818 SSP SP"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/129-thiago-azevedo-praias-lago-bl-m-106-cota04--contrato.pdf" },
      { titulo: "Formulário Cancelamento WAM", arquivo: "contratos-pdf/129-thiago-azevedo-formulario-cancelamento-wam.pdf" },
      { titulo: "Carta Arrependimento", arquivo: "contratos-pdf/129-thiago-azevedo-carta-arrependimento.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 6.160 — intermediação cartão crédito Cielo R$ 2.053,33 + crédito recorrente 2x R$ 2.053,33 (cartão/recorrente = valor cheio). Nenhum boleto cota vencido.\n" +
      "Contrato nº 313518. Preço cota: R$ 46.446,75. Intermediação: R$ 6.160 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Cota sinal: 3x R$ 50 boleto (1ª 15/09/2026, nenhum vencido). Saldo: 88x R$ 526,10 boleto (1ª 15/12/2026, nenhum vencido).\n" +
      "3 semanas de uso por ano.\n" +
      "DENTRO DO PRAZO — contrato 30/08/2026, prazo até 06/09/2026. Arrependimento exercido 30/08/2026 (carta gov.br assinada digitalmente 31/08/2026).\n" +
      "Formulário WAM cancelamento assinado Sobradinho, 31/08/2026. ATENÇÃO: formulário troca nºs 313520↔313521 nas cotas 2 e 3.\n" +
      "GSign: 1ZLWXOV73M-2BFXLYQ-Q2MWWWJ6KF2LHN-UH134.\n" +
      "3 contratos mesma pessoa: fichas 129 (M/106/04), 130 (L/207/06), 131 (I/308/08).\n" +
      "Cônjuge: Luana de Azevedo Souza da Silva (CPF 325.780.118-18, RG 32578011818 SSP SP, nasc. 24/03/1985, profissão Outra, tel (79) 99100-3593, lunaazevedosouzasilva@gmail.com).\n" +
      "Nasc: 02/05/1983. Profissão: Professor(a). Regime bens: Comunhão Universal."
  },

  /* ── Ficha 130 ─────────────────────────────────────────────── */
  {
    id: 130,
    nome: "Thiago Azevedo da Silva",
    cpf: "057.120.777-44",
    rg: "2016163469 SSP CE",
    estadoCivil: "Casado",
    empresa: "WAM",
    razaoSocial: "NG20 Empreendimentos Imobiliários S/A",
    cnpj: "19.829.219/0001-26",
    empreendimento: "Praias do Lago Eco Resort",
    bloco: "L",
    apartamento: "207",
    andar: "",
    cota: "06",
    fracao: "1/52",
    localizacao: "Caldas Novas/GO",
    valorPago: 6160,
    parcelas: [
      { tipo: "Intermediação Cartão Crédito", qtd: 1, valor: 2053.33, forma: "Cartão Crédito Cielo", vencimento: "" },
      { tipo: "Intermediação Recorrente", qtd: 2, valor: 2053.33, forma: "Crédito Recorrente", vencimento: "" },
      { tipo: "Cota Sinal", qtd: 3, valor: 50, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota Saldo", qtd: 88, valor: 526.10, forma: "Boleto", vencimento: "2026-12-15" }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 2.053,33 cartão crédito Cielo + 2x R$ 2.053,33 crédito recorrente = R$ 6.160 | Cota: 3x R$ 50 boleto (1ª 15/09/2026) + 88x R$ 526,10 boleto (1ª 15/12/2026)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-30",
    telefone: "(11) 98564-6320",
    email: "thiagoazevedosilva@hotmail.com",
    conjuge: {
      nome: "Luana de Azevedo Souza da Silva",
      cpf: "325.780.118-18",
      rg: "32578011818 SSP SP"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/130-thiago-azevedo-praias-lago-bl-l-207-cota06--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 6.160 — intermediação cartão crédito Cielo R$ 2.053,33 + crédito recorrente 2x R$ 2.053,33 (cartão/recorrente = valor cheio). Nenhum boleto cota vencido.\n" +
      "Contrato nº 313520. Preço cota: R$ 46.446,75. Intermediação: R$ 6.160 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Cota sinal: 3x R$ 50 boleto (1ª 15/09/2026, nenhum vencido). Saldo: 88x R$ 526,10 boleto (1ª 15/12/2026, nenhum vencido).\n" +
      "3 semanas de uso por ano.\n" +
      "DENTRO DO PRAZO — contrato 30/08/2026, prazo até 06/09/2026. Arrependimento exercido 30/08/2026.\n" +
      "GSign: A7W5QYZRCT-P3LH6LN-TT62QKX67TU8BR-SBZCQ.\n" +
      "3 contratos mesma pessoa: fichas 129 (M/106/04), 130 (L/207/06), 131 (I/308/08). Docs de cancelamento na ficha 129.\n" +
      "Cônjuge: Luana de Azevedo Souza da Silva (CPF 325.780.118-18, RG 32578011818 SSP SP, nasc. 24/03/1985).\n" +
      "Nasc: 02/05/1983. Profissão: Professor(a). Regime bens: Comunhão Universal."
  },

  /* ── Ficha 131 ─────────────────────────────────────────────── */
  {
    id: 131,
    nome: "Thiago Azevedo da Silva",
    cpf: "057.120.777-44",
    rg: "2016163469 SSP CE",
    estadoCivil: "Casado",
    empresa: "WAM",
    razaoSocial: "NG20 Empreendimentos Imobiliários S/A",
    cnpj: "19.829.219/0001-26",
    empreendimento: "Praias do Lago Eco Resort",
    bloco: "I",
    apartamento: "308",
    andar: "",
    cota: "08",
    fracao: "1/52",
    localizacao: "Caldas Novas/GO",
    valorPago: 6160,
    parcelas: [
      { tipo: "Intermediação Cartão Crédito", qtd: 1, valor: 2053.33, forma: "Cartão Crédito Cielo", vencimento: "" },
      { tipo: "Intermediação Recorrente", qtd: 2, valor: 2053.33, forma: "Crédito Recorrente", vencimento: "" },
      { tipo: "Cota Sinal", qtd: 3, valor: 50, forma: "Boleto", vencimento: "2026-09-15" },
      { tipo: "Cota Saldo", qtd: 88, valor: 526.10, forma: "Boleto", vencimento: "2026-12-15" }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 2.053,33 cartão crédito Cielo + 2x R$ 2.053,33 crédito recorrente = R$ 6.160 | Cota: 3x R$ 50 boleto (1ª 15/09/2026) + 88x R$ 526,10 boleto (1ª 15/12/2026)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-30",
    telefone: "(11) 98564-6320",
    email: "thiagoazevedosilva@hotmail.com",
    conjuge: {
      nome: "Luana de Azevedo Souza da Silva",
      cpf: "325.780.118-18",
      rg: "32578011818 SSP SP"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/131-thiago-azevedo-praias-lago-bl-i-308-cota08--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 6.160 — intermediação cartão crédito Cielo R$ 2.053,33 + crédito recorrente 2x R$ 2.053,33 (cartão/recorrente = valor cheio). Nenhum boleto cota vencido.\n" +
      "Contrato nº 313521. Preço cota: R$ 46.446,75. Intermediação: R$ 6.160 (WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Cota sinal: 3x R$ 50 boleto (1ª 15/09/2026, nenhum vencido). Saldo: 88x R$ 526,10 boleto (1ª 15/12/2026, nenhum vencido).\n" +
      "3 semanas de uso por ano.\n" +
      "DENTRO DO PRAZO — contrato 30/08/2026, prazo até 06/09/2026. Arrependimento exercido 30/08/2026.\n" +
      "GSign: D8H9D8GP09-2RMKE25-D70MSSXJ28U88A-YC28U.\n" +
      "3 contratos mesma pessoa: fichas 129 (M/106/04), 130 (L/207/06), 131 (I/308/08). Docs de cancelamento na ficha 129.\n" +
      "Cônjuge: Luana de Azevedo Souza da Silva (CPF 325.780.118-18, RG 32578011818 SSP SP, nasc. 24/03/1985).\n" +
      "Nasc: 02/05/1983. Profissão: Professor(a). Regime bens: Comunhão Universal."
  },

  /* ── Ficha 132 ─────────────────────────────────────────────── */
  {
    id: 132,
    nome: "Bruno Temotio Ferreira de Brito",
    cpf: "333.534.828-14",
    rg: "42.893.753 SSP SP",
    estadoCivil: "Casado",
    empresa: "WAM",
    razaoSocial: "SPE WGSA 02 Empreendimentos Imobiliários S/A",
    cnpj: "19.924.962/0001-65",
    empreendimento: "Solar das Águas Park Resort",
    bloco: "C",
    apartamento: "910",
    andar: "09",
    cota: "09",
    fracao: "1/52",
    localizacao: "Olímpia/SP",
    valorPago: 42848.52,
    parcelas: [
      { tipo: "Saldo Devedor", qtd: 121, valor: 649.22, forma: "Boleto", vencimento: "2021-03-15" }
    ],
    formaPagamentoEntrada: "Sem entrada. Sem corretagem. 121x R$ 649,22 boleto mensal (1ª 15/03/2021)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2020-12-20",
    telefone: "(11) 97236-5804",
    email: "BRNTFB@OUTLOOK.COM",
    conjuge: {
      nome: "Heloiza Ferrarezi Mesquita de Brito",
      cpf: "369.290.618-83",
      rg: "43.110.671-X SSP SP"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/132-bruno-temotio-solar-aguas-bl-c-910-cota09--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 42.848,52 — 66 boletos vencidos (15/03/2021 a 15/08/2026) × R$ 649,22. Próxima parcela 15/09/2026 (não vencida). 55 parcelas restantes.\n" +
      "CONTRATO DIFERENTE: compra de unidade imobiliária flat-service, NÃO é formato padrão GAV/WAM de multipropriedade.\n" +
      "Vendedora: SPE WGSA 02 Empreendimentos Imobiliários S/A (CNPJ 19.924.962/0001-65), Olímpia/SP.\n" +
      "Preço total: R$ 78.555,62. Entrada: inexistente. Corretagem: não informada.\n" +
      "121 parcelas de R$ 649,22, 1ª venc 15/03/2021, amortização Price, juros 0,5% a.m., INCC/IGPM.\n" +
      "FORA DO PRAZO — contrato 20/12/2020, prazo arrependimento até 27/12/2020 (quase 6 anos atrás).\n" +
      "Unidade flat-service: Apto 910, Pav. 09, Cota 09, Bloco C. Fração ideal 0,00690968005%.\n" +
      "Matrícula 43.362, R.11, Livro 2 RG, Cartório de Registro de Imóveis de Olímpia/SP.\n" +
      "Cônjuge: Heloiza Ferrarezi Mesquita de Brito (CPF 369.290.618-83, RG 43.110.671-X SSP SP, nasc. 25/11/1988, Profissional ensino fund/médio - Administrativo/Operacional).\n" +
      "Nasc: 18/07/1986. Profissão: Diretoria/Financeira/Administrativa. End: Rua Roque Oliveira Casa 94, Jardim Adriana, Itaquaquecetuba/SP, CEP 08582225."
  },

  // ── Ficha 133 ─────────────────────────────────────────────
  {
    id: 133,
    nome: "Jorge Daniel Aucca Chavez",
    cpf: "337.753.348-66",
    rg: "416001658 SSP SP",
    empresa: "GAV",
    empreendimento: "Oikos Maragogi Resort",
    bloco: "02",
    unidade: "UH 256",
    andar: "2",
    cota: "18",
    fracao: "1/52",
    numeroContrato: "357719",
    valorTotal: 63370.04,
    valorPago: 3990.00,
    parcelas: [
      { tipo: "Corretagem", qtd: 1, valor: 3990.00, forma: "PIX", vencimento: "2026-09-01" },
      { tipo: "Sinal de Negócio", qtd: 4, valor: 792.13, forma: "Cartão/Boleto", vencimento: "2026-10-10" },
      { tipo: "Saldo Devedor", qtd: 68, valor: 826.64, forma: "Cartão/Boleto", vencimento: "2027-02-10" }
    ],
    formaPagamentoEntrada: "Corretagem PIX R$ 3.990,00 (01/09/2026). Sinal R$ 3.168,52 em 4x R$ 792,13 (1ª 10/10/2026, não vencida). Saldo R$ 56.211,52 em 68x R$ 826,64 (1ª 10/02/2027, não vencida)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-01",
    telefone: "(11) 98655-8409",
    email: "jdaucca@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/133-jorge-daniel-oikos-maragogi-bl02-uh256-cota18--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990,00 — corretagem paga via PIX em 01/09/2026 (comprovante Rede/Itaú, CV 24229494, ID RESN963523009376117171I69YHC9265F928).\n" +
      "Sinal de negócio: R$ 3.168,52 em 4x R$ 792,13, 1ª parcela 10/10/2026 — NENHUMA VENCIDA, nada pago.\n" +
      "Saldo devedor: R$ 56.211,52 em 68x R$ 826,64, 1ª parcela 10/02/2027 — NENHUMA VENCIDA, nada pago.\n" +
      "DENTRO DO PRAZO — contrato 01/09/2026, prazo arrependimento até 08/09/2026.\n" +
      "Vendedora: GAV Maragogi Empreendimento Imobiliário SPE LTDA (CNPJ 39.757.445/0001-56).\n" +
      "Consultor: Victor Camara Paiva e Silva (CPF 573.565.390-03).\n" +
      "Corretores/beneficiários: Leticia Cardoso de Araujo (61264915000107), Victor Camara Paiva e Silva (57356539000103), Samara Mauro Vieira (50438113000141), Allan Wendel R Simoes LTDA (59385554000105).\n" +
      "Assinatura ZapSign: 01/09/2026 13:42:42 (IP 191.244.252.222, Android).\n" +
      "Nasc: 03/04/1985. Profissão: Estudante. Estado Civil: Casado(a). Cônjuge não informado.\n" +
      "End: Rua Coronel Mendonca, 87, Chacara Santo Antonio (Zona Leste), São Paulo/SP, CEP 03409000."
  },

  // ── Ficha 134 ─────────────────────────────────────────────
  {
    id: 134,
    nome: "Jose Luciano da Silva Junior",
    cpf: "109.829.444-03",
    rg: "9151235 SDS PE",
    empresa: "GAV",
    empreendimento: "Porto 2 Life Resort",
    bloco: "02",
    unidade: "0206",
    andar: "1",
    cota: "26",
    fracao: "1/52",
    numeroContrato: "358529",
    valorTotal: 85246.73,
    valorPago: 1330.00,
    parcelas: [
      { tipo: "Corretagem (PIX)", qtd: 1, valor: 1330.00, forma: "PIX", vencimento: "2026-09-05" },
      { tipo: "Corretagem (Boleto)", qtd: 2, valor: 1330.00, forma: "Boleto", vencimento: "2026-10-05" },
      { tipo: "Sinal de Negócio", qtd: 4, valor: 1065.58, forma: "Cartão/Boleto", vencimento: "2026-12-05" },
      { tipo: "Saldo Devedor", qtd: 80, valor: 962.43, forma: "Cartão/Boleto", vencimento: "2027-04-05" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x PIX R$ 1.330,00 (05/09/2026) + 2x boleto R$ 1.330,00 (05/10 e 05/11/2026, não vencidos). Sinal R$ 4.262,33 em 4x R$ 1.065,58 (1ª 05/12/2026, não vencida). Saldo R$ 76.994,40 em 80x R$ 962,43 (1ª 05/04/2027, não vencida)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-05",
    telefone: "(81) 99824-1239",
    email: "lucianosjunior96@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/134-jose-luciano-porto2-life-bl02-0206-cota26--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.330,00 — 1ª parcela corretagem paga via PIX em 05/09/2026 (comprovante Rede/Itaú, CV 199760140, ID RESN78295000951580733YLS2LFXU67E5BE9).\n" +
      "Corretagem restante: 2x R$ 1.330,00 boleto (05/10 e 05/11/2026) — NÃO VENCIDAS, nada pago.\n" +
      "Sinal de negócio: R$ 4.262,33 em 4x R$ 1.065,58, 1ª parcela 05/12/2026 — NENHUMA VENCIDA.\n" +
      "Saldo devedor: R$ 76.994,40 em 80x R$ 962,43, 1ª parcela 05/04/2027 — NENHUMA VENCIDA.\n" +
      "DENTRO DO PRAZO — contrato 05/09/2026, prazo arrependimento até 12/09/2026.\n" +
      "Vendedora: GAV Muro Alto 2 Empreendimento Imobiliário SPE LTDA (CNPJ 39.673.888/0001-69).\n" +
      "Consultor: Leandro Alves Campo (CNPJ 41926020000175).\n" +
      "Corretores/beneficiários: Leandro Alves Campo (41926020000175), Deneson Amaro DaSilva (40769447000144), Rodrigo Vieira do Prado Olivei (38236459000161).\n" +
      "Assinatura ZapSign: 05/09/2026 21:14:17 (IP 189.40.101.28, iPhone). Flow/checklist: 05/09/2026 20:52:20.\n" +
      "Nasc: 29/04/1996. Profissão: Médico(a). Estado Civil: União estável. Cônjuge não informado.\n" +
      "End: Rua Quarenta e Oito, 117, Apto, Espinheiro, Recife/PE, CEP 52020060."
  },

  // ── Ficha 135 ─────────────────────────────────────────────
  {
    id: 135,
    nome: "Jessica Silva Santos",
    cpf: "365.351.788-54",
    rg: "447665273 SSP/SP",
    empresa: "GAV",
    empreendimento: "Oikos Maragogi Resort",
    bloco: "02",
    unidade: "UH 031",
    andar: "T",
    cota: "22",
    fracao: "1/52",
    numeroContrato: "",
    valorTotal: 36880.91,
    valorPago: 1995.00,
    parcelas: [
      { tipo: "Corretagem (PIX)", qtd: 1, valor: 500.00, forma: "PIX", vencimento: "2026-08-16" },
      { tipo: "Corretagem (Boleto)", qtd: 1, valor: 1495.00, forma: "Boleto", vencimento: "2026-08-19" },
      { tipo: "Sinal de Negócio", qtd: 4, valor: 461.01, forma: "Cartão/Boleto", vencimento: "2026-09-10" },
      { tipo: "Saldo Devedor", qtd: 68, valor: 485.91, forma: "Cartão/Boleto", vencimento: "2027-01-01" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x PIX R$ 500,00 (16/08/2026) + 1x boleto R$ 1.495,00 (19/08/2026). Sinal R$ 1.844,03 em 4x R$ 461,01 (1ª 10/09/2026, não vencida). Saldo R$ 33.041,88 em 68x R$ 485,91 (1ª 01/01/2027, não vencida)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-16",
    telefone: "(11) 95865-8374",
    email: "jessica.jsasilva88@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/135-jessica-silva-santos-oikos-maragogi-bl02-uh031-cota22--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.995,00 — corretagem: PIX R$ 500,00 (16/08/2026) + boleto R$ 1.495,00 (venc 19/08/2026, já vencido).\n" +
      "ATENÇÃO: O PIX foi 1 transação de R$ 1.000,00 (Rede/Itaú Laranjinha, CV 185875652, ID RESN9118520093761171PR1CSO5R69DFO48, 16/08/26 19:37) rateada entre 2 contratos (R$ 500 cada — este e ficha 136).\n" +
      "Sinal de negócio: R$ 1.844,03 em 4x R$ 461,01, 1ª parcela 10/09/2026 — NENHUMA VENCIDA, nada pago.\n" +
      "Saldo devedor: R$ 33.041,88 em 68x R$ 485,91, 1ª parcela 01/01/2027 — NENHUMA VENCIDA, nada pago.\n" +
      "FORA DO PRAZO — contrato 16/08/2026, prazo arrependimento venceu 23/08/2026.\n" +
      "Vendedora: GAV Maragogi Empreendimento Imobiliário SPE LTDA (CNPJ 39.757.445/0001-56).\n" +
      "Corretores/beneficiários: Joao Marcos da Silva Serafim T (60177335000101), Gabriella de Lima Vitor (45925714000149), Josuel Jose de Mendonca (53928823000148), Erica Nascimento Vercosa (49011032000181).\n" +
      "Assinatura ZapSign: 16/08/2026 20:27:05 (IP 181.77.116.110, Android, localização -9.011687/-35.220433).\n" +
      "Nasc: 10/10/1988. Profissão: Outra (especifique). Estado Civil: Casado(a). Cônjuge não informado.\n" +
      "End: Rua Jose Soeiro de Vaz, 515, Jardim Marisa, São Paulo/SP, CEP 05108130."
  },

  // ── Ficha 136 ─────────────────────────────────────────────
  {
    id: 136,
    nome: "Jessica Silva Santos",
    cpf: "365.351.788-54",
    rg: "447665273 SSP/SP",
    empresa: "GAV",
    empreendimento: "Oikos Maragogi Resort",
    bloco: "02",
    unidade: "UH 119",
    andar: "1",
    cota: "51",
    fracao: "1/52",
    numeroContrato: "",
    valorTotal: 35558.16,
    valorPago: 1995.00,
    parcelas: [
      { tipo: "Corretagem (PIX)", qtd: 1, valor: 500.00, forma: "PIX", vencimento: "2026-08-16" },
      { tipo: "Corretagem (Boleto)", qtd: 1, valor: 1495.00, forma: "Boleto", vencimento: "2026-08-19" },
      { tipo: "Sinal de Negócio", qtd: 4, valor: 444.48, forma: "Cartão/Boleto", vencimento: "2026-09-10" },
      { tipo: "Saldo Devedor", qtd: 68, valor: 467.43, forma: "Cartão/Boleto", vencimento: "2027-01-01" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x PIX R$ 500,00 (16/08/2026) + 1x boleto R$ 1.495,00 (19/08/2026). Sinal R$ 1.777,92 em 4x R$ 444,48 (1ª 10/09/2026, não vencida). Saldo R$ 31.785,24 em 68x R$ 467,43 (1ª 01/01/2027, não vencida)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-16",
    telefone: "(11) 95865-8374",
    email: "jessica.jsasilva88@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/136-jessica-silva-santos-oikos-maragogi-bl02-uh119-cota51--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.995,00 — corretagem: PIX R$ 500,00 (16/08/2026) + boleto R$ 1.495,00 (venc 19/08/2026, já vencido).\n" +
      "ATENÇÃO: O PIX foi 1 transação de R$ 1.000,00 (Rede/Itaú Laranjinha, CV 185875652, ID RESN9118520093761171PR1CSO5R69DFO48, 16/08/26 19:37) rateada entre 2 contratos (R$ 500 cada — este e ficha 135).\n" +
      "Sinal de negócio: R$ 1.777,92 em 4x R$ 444,48, 1ª parcela 10/09/2026 — NENHUMA VENCIDA, nada pago.\n" +
      "Saldo devedor: R$ 31.785,24 em 68x R$ 467,43, 1ª parcela 01/01/2027 — NENHUMA VENCIDA, nada pago.\n" +
      "FORA DO PRAZO — contrato 16/08/2026, prazo arrependimento venceu 23/08/2026.\n" +
      "Vendedora: GAV Maragogi Empreendimento Imobiliário SPE LTDA (CNPJ 39.757.445/0001-56).\n" +
      "Corretores/beneficiários: Joao Marcos da Silva Serafim T (60177335000101), Gabriella de Lima Vitor (45925714000149), Josuel Jose de Mendonca (53928823000148), Erica Nascimento Vercosa (49011032000181).\n" +
      "Assinatura ZapSign: 16/08/2026 20:21:27 (IP 181.77.116.110, Android, localização -9.011704/-35.220398).\n" +
      "Nasc: 10/10/1988. Profissão: Outra (especifique). Estado Civil: Casado(a). Cônjuge não informado.\n" +
      "End: Rua Jose Soeiro de Vaz, 515, Jardim Marisa, São Paulo/SP, CEP 05108130."
  },

  // ── Ficha 137 ─────────────────────────────────────────────
  {
    id: 137,
    nome: "Alessandra dos Santos Guimaraes",
    cpf: "045.013.310-97",
    rg: "9112017001 SSP/RS",
    empresa: "WAM",
    empreendimento: "Resort do Lago",
    bloco: "C",
    unidade: "007",
    andar: "",
    cota: "MA/A",
    fracao: "1/52",
    numeroContrato: "307297",
    valorTotal: 41300.20,
    valorPago: 3410.00,
    parcelas: [
      { tipo: "Intermediação (Depósito/TED)", qtd: 1, valor: 643.00, forma: "Depósito/TED", vencimento: "2026-07-28" },
      { tipo: "Intermediação (Recorrente)", qtd: 6, valor: 452.83, forma: "Crédito Recorrente", vencimento: "2026-08-28" },
      { tipo: "Cota (Boleto inicial)", qtd: 3, valor: 50.00, forma: "Boleto", vencimento: "2026-08-15" },
      { tipo: "Cota (Saldo)", qtd: 84, valor: 449.88, forma: "Boleto", vencimento: "2026-11-15" }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 643,00 depósito/TED (no ato) + 6x R$ 452,83 crédito recorrente Galax Pay (valor cheio R$ 2.716,98). Cota: 3x R$ 50,00 boleto (1ª 15/08/2026, 1 vencida) + 84x R$ 449,88 boleto (1ª 15/11/2026, nenhuma vencida)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-07-28",
    telefone: "(51) 99106-8983",
    email: "aleguimaraes1897@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/137-alessandra-guimaraes-resort-do-lago-blc-007-cotama-a--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.410,00 — intermediação R$ 3.360,00 (depósito R$ 643 + recorrente 6x R$ 452,83 valor cheio) + 1x boleto cota R$ 50,00 (venc 15/08/2026, já vencido).\n" +
      "Preço da cota (sem intermediação): R$ 37.940,20. Intermediação: R$ 3.360,00. Total: R$ 41.300,20.\n" +
      "Cota: 3x R$ 50,00 boleto (1ª 15/08/2026) + 84x R$ 449,88 boleto (1ª 15/11/2026) — só 1 boleto de R$ 50 vencido.\n" +
      "2ª e 3ª parcelas cota R$ 50 (15/09 e 15/10/2026) e 84 parcelas de R$ 449,88 — NENHUMA VENCIDA.\n" +
      "Intermediação paga à WAM Comercialização SA (CNPJ 17.919.649/0004-56) via Galax Pay.\n" +
      "FORA DO PRAZO — contrato 28/07/2026, prazo arrependimento venceu 04/08/2026.\n" +
      "Cliente NÃO conheceu o empreendimento pessoalmente (marcou 'Não').\n" +
      "Semanas de uso: 2 por ano. Habite-se: 2017002129/2017, expedido 22/12/2017 (empreendimento ENTREGUE).\n" +
      "Vendedora: SPE Resort do Lago Caldas Novas LTDA (CNPJ 20.269.496/0001-00).\n" +
      "Assinante vendedora: Daiane Aparecida Cilla Garbeti. Testemunhas: Abqueila Amorim (1ª), Alan Guilherme Guimarães CPF 416.740.568-77 (2ª).\n" +
      "Assinatura GSign (data do contrato): 28/07/2026. GSign Doc ID: TU9RDSMZ7U-NV7H0AF-E1L3ZEKEF083ER-U8U9L.\n" +
      "Nasc: 18/12/1997. Profissão: Autônomo(a). Estado Civil: Solteiro.\n" +
      "Mesma pessoa da ficha 138 (Ondas Praia Resort)."
  },

  // ── Ficha 138 ─────────────────────────────────────────────
  {
    id: 138,
    nome: "Alessandra dos Santos Guimaraes",
    cpf: "045.013.310-97",
    rg: "9112017001 SSP/RS",
    empresa: "WAM",
    empreendimento: "Ondas Praia Resort",
    bloco: "B",
    unidade: "B128",
    andar: "",
    cota: "04",
    fracao: "1/52",
    numeroContrato: "307316",
    valorTotal: 72003.17,
    valorPago: 7190.00,
    parcelas: [
      { tipo: "Intermediação (Depósito/TED)", qtd: 1, valor: 714.00, forma: "Depósito/TED", vencimento: "2026-07-28" },
      { tipo: "Intermediação (Recorrente)", qtd: 6, valor: 1071.00, forma: "Crédito Recorrente", vencimento: "2026-08-28" },
      { tipo: "Cota (Boleto inicial)", qtd: 4, valor: 50.00, forma: "Boleto", vencimento: "2026-08-15" },
      { tipo: "Cota (Saldo)", qtd: 96, valor: 673.57, forma: "Boleto", vencimento: "2026-12-15" }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 714,00 depósito/TED (no ato) + 6x R$ 1.071,00 crédito recorrente (valor cheio R$ 6.426,00). Cota: 4x R$ 50,00 boleto (1ª 15/08/2026, 1 vencida) + 96x R$ 673,57 boleto (1ª 15/12/2026, nenhuma vencida)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-07-28",
    telefone: "(51) 99106-8983",
    email: "aleguimaraes1897@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/138-alessandra-guimaraes-ondas-praia-blb-b128-cota04--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 7.190,00 — intermediação R$ 7.140,00 (depósito R$ 714 + recorrente 6x R$ 1.071 valor cheio) + 1x boleto cota R$ 50,00 (venc 15/08/2026, já vencido).\n" +
      "Preço da cota (sem intermediação): R$ 64.863,17. Intermediação: R$ 7.140,00. Total: R$ 72.003,17.\n" +
      "Cota: 4x R$ 50,00 boleto (1ª 15/08/2026) + 96x R$ 673,57 boleto (1ª 15/12/2026) — só 1 boleto de R$ 50 vencido.\n" +
      "2ª, 3ª e 4ª parcelas cota R$ 50 (15/09, 15/10, 15/11/2026) e 96 parcelas de R$ 673,57 — NENHUMA VENCIDA.\n" +
      "Intermediação paga à WAM Comercialização SA (CNPJ 17.919.649/0001-03) via crédito recorrente.\n" +
      "FORA DO PRAZO — contrato 28/07/2026, prazo arrependimento venceu 04/08/2026.\n" +
      "Cliente NÃO conheceu o empreendimento pessoalmente (marcou 'Não').\n" +
      "Semanas de uso: 2 por ano. Habite-se: 00046/2021 a 00611/2021, expedidos 02/03/2021 (empreendimento ENTREGUE).\n" +
      "Vendedora: SPE Porto Seguro 02 Empreendimentos Imobiliários S.A. (CNPJ 22.059.167/0001-60).\n" +
      "Assinante vendedora: Daiane Aparecida Cilla Garbeti. Testemunhas: Abqueila Amorim (1ª), Alan Guilherme Guimarães CPF 416.740.568-77 (2ª).\n" +
      "Assinatura GSign (data do contrato): 28/07/2026. GSign Doc ID: DIDY23GZXE-BB14DXY-VTJAF0ZSN55Y4C-U2O0Q.\n" +
      "Nasc: 18/12/1997. Profissão: Autônomo(a). Estado Civil: Solteiro.\n" +
      "Mesma pessoa da ficha 137 (Resort do Lago)."
  },

  // ── Ficha 139 ─────────────────────────────────────────────
  {
    id: 139,
    nome: "Luiz Flavio da Silva",
    cpf: "009.019.985-59",
    rg: "807503541 SSP/BA",
    empresa: "WAM",
    empreendimento: "Tree Bies Beach Resort",
    bloco: "Tree Bies Share",
    unidade: "14",
    andar: "",
    cota: "MA/J",
    fracao: "1/52",
    numeroContrato: "290498",
    valorTotal: 36245.00,
    valorPago: 4124.41,
    parcelas: [
      { tipo: "Corretagem (Cartão Crédito)", qtd: 1, valor: 405.00, forma: "Cartão de Crédito", vencimento: "2026-06-02" },
      { tipo: "Corretagem (Recorrente)", qtd: 8, valor: 405.00, forma: "Crédito Recorrente", vencimento: "2026-06-30" },
      { tipo: "Parcela do Produto (Boleto)", qtd: 68, valor: 479.41, forma: "Boleto", vencimento: "2026-08-20" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 405,00 cartão crédito Cielo (02/06/2026) + 8x R$ 405,00 crédito recorrente (1ª 30/06/2026, valor cheio R$ 3.240,00). Produto: 68x R$ 479,41 boleto (1ª 20/08/2026, 1 vencida)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-05-02",
    telefone: "(71) 99666-6246",
    email: "luiz.flavios@yahoo.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/139-luiz-flavio-tree-bies-share-14-cotama-j--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 4.124,41 — corretagem R$ 3.645,00 (cartão R$ 405 + recorrente 8x R$ 405 valor cheio R$ 3.240) + 1x boleto produto R$ 479,41 (venc 20/08/2026, já vencido).\n" +
      "Preço do produto: R$ 32.600,00. Corretagem: R$ 3.645,00. Total: R$ 36.245,00.\n" +
      "Produto: 68x R$ 479,41 boleto (1ª 20/08/2026, última 20/03/2032) — 1 boleto vencido (20/08), restantes não vencidas.\n" +
      "Produto: TREE BIES - PLUS MASTER - 1 SEMANA (ALTA) - 24M². Tipo UH: 1 Quarto. Semana: 1 por ano.\n" +
      "Corretagem paga à WAM Comercialização S/A (CNPJ 17.919.649/0022-38).\n" +
      "FORA DO PRAZO — contrato 02/05/2026, prazo arrependimento venceu 09/05/2026.\n" +
      "Vendedora: Immobate Imobiliária LTDA (CNPJ 05.236.090/0001-38), assinante Marivaldo Boeloni.\n" +
      "Intermediadora: Sara Melo — WAM Comercialização S/A.\n" +
      "Assinatura GSign (data do contrato): 02/05/2026. GSign Doc ID: W4A67GJDF0-LOXJIR0-SS3M6S2Q1HEPQ3-P2WEQ.\n" +
      "Nasc: 19/12/1983. Profissão: Engenheiro. Estado Civil: Solteiro.\n" +
      "End: Rua Ministro Antônio Carlos Magalhães, 447, Buraquinho, Lauro de Freitas/BA, CEP 42710400."
  },

  // ── 140 — Lidia dos Santos Chaves — Praias do Lago Eco Resort ──
  {
    id: 140,
    nome: "Lidia dos Santos Chaves",
    cpf: "344.893.648-06",
    rg: "MG24083029 - SSP/MG",
    empresa: "WAM",
    empreendimento: "Praias do Lago Eco Resort",
    bloco: "N",
    unidade: "003",
    andar: "",
    cota: "11",
    fracao: "1/52",
    numeroContrato: "",
    valorTotal: 52606.75,
    valorPago: 875.00,
    parcelas: [
      { tipo: "Intermediação (Cartão Débito)", qtd: 1, valor: 750.00, forma: "Cartão de Débito", vencimento: "2026-08-15" },
      { tipo: "PIX (rateio de R$ 500 entre 4 contratos)", qtd: 1, valor: 125.00, forma: "PIX", vencimento: "" }
    ],
    formaPagamentoEntrada: "R$ 750 cartão débito (intermediação) + R$ 125 PIX (rateio de R$ 500 entre 4 contratos). Crédito recorrente 11x R$ 491,81 ainda NÃO cobrado.",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-15",
    telefone: "(34) 98308-0069",
    email: "lidiasantos1508@gmail.com",
    conjuge: {
      nome: "Renan Alves dos Santos",
      cpf: "130.286.556-08",
      rg: "MG20367608 - SSP/MG"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/140-lidia-santos-chaves-praias-do-lago-bln-003-cota11--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 875 (R$ 3.500 total / 4 contratos) — débito R$ 750 + PIX R$ 125.\n" +
      "Pagamento total informado pelo cliente: R$ 3.000 cartão débito (4× R$ 750) + R$ 500 PIX = R$ 3.500 nos 4 contratos.\n" +
      "Crédito recorrente intermediação (11× R$ 491,81 = R$ 5.409,91) NÃO cobrado ainda.\n" +
      "Preço da cota: R$ 46.446,75. Intermediação contratual: R$ 6.160,00. Total: R$ 52.606,75.\n" +
      "Boletos preço não pagos (4x R$ 50 + 88x R$ 525,53).\n" +
      "Intermediação devida à WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Vendedora: NG20 Empreendimentos Imobiliários S/A (CNPJ 19.829.219/0001-26), Caldas Novas/GO.\n" +
      "Semanas de uso: 3 por ano. Habite-se: 2020001124 (20/11/2020). Empreendimento ENTREGUE.\n" +
      "FORA DO PRAZO — contrato 15/08/2026, prazo arrependimento venceu 22/08/2026.\n" +
      "Assinatura GSign (data do contrato): 15/08/2026. GSign Doc ID: C6Z5XJM94E-IZHCLIA-4MULRKP2JBWGA2-A37KR.\n" +
      "Cônjuge: Renan Alves dos Santos, CPF 130.286.556-08, RG MG20367608 SSP/MG, nasc 28/05/1996, Serralheiro.\n" +
      "Estado Civil: União Estável. Nasc: 25/07/1986. Profissão: Professor(a). Nacionalidade: Brasileiro(a).\n" +
      "Email cônjuge: alvesdossantosrenan422@gmail.com.\n" +
      "4 contratos mesma pessoa/cônjuge no mesmo resort — fichas 140, 149, 150, 151 (unidades N/003/11, N/101/04, H/207/03, H/202/12)."
  },

  // ── 141 — Antonio Henrique Cortes Coelho Rangel — Encontro das Águas Thermas Resort ──
  {
    id: 141,
    nome: "Antonio Henrique Cortes Coelho Rangel",
    cpf: "151.814.267-27",
    rg: "217757574 - Detran RJ",
    empresa: "WAM",
    empreendimento: "Encontro das Águas Thermas Resort",
    bloco: "PIA",
    unidade: "304",
    andar: "",
    cota: "09A",
    fracao: "1/52",
    numeroContrato: "01-PIA304/09A",
    valorTotal: 15586.00,
    valorPago: 2516.58,
    parcelas: [
      { tipo: "Fidelização (Boleto)", qtd: 6, valor: 86.43, forma: "Boleto", vencimento: "2026-03-15" },
      { tipo: "Parcela do Saldo (Boleto)", qtd: 72, valor: 181.52, forma: "Boleto", vencimento: "2026-09-20" },
      { tipo: "Corretagem (Cartão Crédito Master)", qtd: 6, valor: 333.00, forma: "Cartão de Crédito", vencimento: "2026-02-24" }
    ],
    formaPagamentoEntrada: "CDU: 6x R$ 86,43 fidelização boleto (1ª 15/03/2026, todas vencidas) + 72x R$ 181,52 boleto (1ª 20/09/2026, nenhuma vencida). Corretagem: 6x R$ 333,00 Master Crédito (valor cheio R$ 1.998,00)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-02-24",
    telefone: "(61) 99313-4877",
    email: "antoniohccrangel@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/141-antonio-henrique-encontro-das-aguas-pia-304-cota09a--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 2.516,58 — fidelização 6x R$ 86,43 boleto (todas vencidas, R$ 518,58) + corretagem 6x R$ 333,00 Master crédito (valor cheio R$ 1.998,00).\n" +
      "CONTRATO DE CESSÃO DE DIREITO DE USO (CDU) — TIMESHARE, NÃO MULTIPROPRIEDADE. Direito de usar unidade por 10 anos, 1 semana/ano (10 semanas total). Não transfere propriedade.\n" +
      "Preço CDU (sem corretagem): R$ 13.588,00. Corretagem: R$ 1.998,00. Total: R$ 15.586,00.\n" +
      "CDU: 6x R$ 86,43 fidelização (1ª 15/03/2026, 6 vencidas = R$ 518,58) + 72x R$ 181,52 boleto (1ª 20/09/2026, nenhuma vencida).\n" +
      "Corretagem paga à WAM Caldas Novas Ltda. Cedente: RMEX Construtora e Incorporadora SPE Ltda (CNPJ 10.623.013/0001-70).\n" +
      "Taxa mensal serviços e manutenção: R$ 62,66.\n" +
      "FORA DO PRAZO — contrato 24/02/2026, prazo arrependimento venceu 03/03/2026.\n" +
      "Assinatura GSign: 24/02/2026. GSign Doc ID: PAU7GN4MM5-JQKLJTK-P1KFR2TFR2IDKK-AQVFV. Nº contrato: 01-PIA304/09A (ref 280738).\n" +
      "Assinante cedente: Sara Melo. Testemunhas: Dyessika Torres, Alan Guilherme Guimarães (CPF 416.740.568-77).\n" +
      "Nasc: 05/03/1999. Profissão: Militar. Estado Civil: Solteiro. Nacionalidade: Brasileiro.\n" +
      "End: Módulo 1, 401, Cond. Mestre D'Armas (Planaltina), Brasília/DF, CEP 73403303."
  },

  // ── 142 — Amanda de Oliveira Martins — Porto 2 Life Resort ──
  {
    id: 142,
    nome: "Amanda de Oliveira Martins",
    cpf: "056.117.821-67",
    rg: "3383457 - SSP/DF",
    empresa: "GAV",
    empreendimento: "Porto 2 Life Resort",
    bloco: "04",
    unidade: "0217",
    andar: "1",
    cota: "18",
    fracao: "1/52",
    numeroContrato: "342120",
    valorTotal: 83986.80,
    valorPago: 3990.00,
    parcelas: [
      { tipo: "Corretagem (Cartão Crédito Master)", qtd: 5, valor: 798.00, forma: "Cartão de Crédito", vencimento: "2026-07-08" },
      { tipo: "Sinal de Negócio (Boleto)", qtd: 4, valor: 1049.84, forma: "Boleto", vencimento: "2026-11-10" },
      { tipo: "Parcela do Saldo (Boleto)", qtd: 80, valor: 947.47, forma: "Boleto", vencimento: "2027-03-10" }
    ],
    formaPagamentoEntrada: "Corretagem: 5x R$ 798,00 Master/CréditoParcelado (Nº Doc 179010966, valor cheio R$ 3.990,00, 1ª 08/07/2026). Sinal: 4x R$ 1.049,84 boleto (1ª 10/11/2026, nenhuma vencida). Saldo: 80x R$ 947,47 boleto (1ª 10/03/2027, nenhuma vencida)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-06-08",
    telefone: "(61) 999068873",
    email: "assessoria.academiadf@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/142-amanda-oliveira-martins-porto2-life-bl04-0217-cota18--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990,00 — corretagem 5x R$ 798,00 Master/CréditoParcelado (valor cheio). Sinal e saldo: nenhum boleto vencido.\n" +
      "Valor total: R$ 83.986,80. Corretagem: R$ 3.990,00. Sinal: R$ 4.199,34 (5%). Saldo devedor: R$ 75.797,46.\n" +
      "Sinal: 4x R$ 1.049,84 boleto (1ª 10/11/2026). Saldo: 80x R$ 947,47 boleto (1ª 10/03/2027, dia 10 de cada mês).\n" +
      "Corretagem beneficiários: Hudson Reis Barreto (CPF/CNPJ 45399103000104), Vanessa Marques de Freitas (34281103000199), N.M. de Lima (39259640000156).\n" +
      "Vendedora: GAV Muro Alto 2 Empreendimento Imobiliário SPE Ltda (CNPJ 39.673.888/0001-69), Ipojuca/PE.\n" +
      "Empreendimento em construção — início Out/2022, término Out/2025 + tolerância 180 dias obras + 120 dias montagem.\n" +
      "Semanas de uso: 2 por ano. Tipo: 1 Quarto. Fração ideal: 0,00368087422200%.\n" +
      "FORA DO PRAZO — contrato 08/06/2026, prazo arrependimento venceu 15/06/2026.\n" +
      "ATENÇÃO: Estado Civil 'Casado(a)' mas dados do cônjuge NÃO INFORMADOS no contrato.\n" +
      "D4Sign: 08/06/2026, assinatura presencial. Doc ID: 305fd429-e3d3-4277-95ea-08c0546a71c4. Ref: P2L-BL04-0217-18.\n" +
      "Aprovador GAV: Gabriel Barbosa Souza de Siqueira. Assinante vendedora: Irley Belo da Silva. Testemunhas: Hudson Reis Barreto, Joao Vitor Lima Ramos.\n" +
      "Nasc: 07/12/1995. Profissão: Orientadora Acadêmica. Estado Civil: Casado(a). Nacionalidade: Brasileiro(a).\n" +
      "End: Cond Residencial Parque do Gama, 5, Conjunto G, Ponte Alta Norte, Gama/DF, CEP 72426250."
  },

  // ── 143 — Sara Julia Rosa — Praias do Lago Eco Resort ──
  {
    id: 143,
    nome: "Sara Julia Rosa",
    cpf: "022.981.621-58",
    rg: "5145166 - SSP/GO",
    empresa: "WAM",
    empreendimento: "Praias do Lago Eco Resort",
    bloco: "D",
    unidade: "201",
    andar: "",
    cota: "04",
    fracao: "1/52",
    numeroContrato: "180/X01-D201/04",
    valorTotal: 30095.13,
    valorPago: 21290.48,
    parcelas: [
      { tipo: "Parcela do Imóvel (Boleto)", qtd: 76, valor: 366.85, forma: "Boleto", vencimento: "2022-05-20" },
      { tipo: "Crédito Transferido (Contrato Anterior)", qtd: 1, valor: 2214.28, forma: "Crédito", vencimento: "2027-06-10" }
    ],
    formaPagamentoEntrada: "76x R$ 366,85 boleto mensal (1ª 20/05/2022, 52 vencidas até 08/09/2026 = R$ 19.076,20) + crédito transferido R$ 2.214,28 do contrato anterior cancelado 01-D006/16 (31/08/2019)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2022-04-28",
    telefone: "(062) 982500416",
    email: "sarajrosa15@hotmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/143-sara-julia-rosa-praias-do-lago-bld-201-cota04--contrato.pdf" },
      { titulo: "Transferência de Crédito", arquivo: "contratos-pdf/143-sara-julia-rosa-praias-do-lago-bld-201-cota04--transferencia-credito.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 21.290,48 — 52 boletos vencidos (52x R$ 366,85 = R$ 19.076,20) + crédito transferido R$ 2.214,28 do contrato anterior.\n" +
      "CONTRATO ANTIGO (abril/2022). Preço total: R$ 30.095,13 (sem corretagem — campos de corretagem preenchidos como 'XXXXXXX').\n" +
      "Pagamento: 76x R$ 366,85 boleto mensal (1ª 20/05/2022, última ~20/08/2028). Prazo quitação: 20/08/2028.\n" +
      "CRÉDITO TRANSFERIDO: contrato anterior 01-D006/16 (data 31/08/2019) cancelado — pago R$ 2.570,28 (7 parcelas), dedução condomínio R$ 356,00, saldo transferido R$ 2.214,28 (vencimento 10/06/2027).\n" +
      "Termo de Transferência de Crédito assinado em Goiânia, 02/02/2022. Testemunhas: Joyce Silva Siqueira (CPF 020.700.971-61), Aiomara Joice Brito Sousa Noleto (CPF 015.470.531-43).\n" +
      "Vendedora: NG20 Empreendimentos Imobiliários S/A (CNPJ 19.829.219/0001-26).\n" +
      "Bloco D: 26 frações/cotas por unidade (2 semanas/ano). Apartamento 1 quarto.\n" +
      "FORA DO PRAZO — contrato 28/04/2022, prazo arrependimento venceu 05/05/2022.\n" +
      "Blocos D e G: entregues dez/2020. Blocos H,I,J,L,M,N,O: prazo 60 meses a partir de 28/11/2014 + tolerância 180 dias.\n" +
      "Inclui: Passaporte Náutico Praia Clube (5 anos), WAM Fidelidade (intercâmbio/monetização).\n" +
      "DocuSign Envelope ID: CEF6B369-3BF0-4C62-B9AA-60DA4DB813AC. Assinatura: 28/04/2022.\n" +
      "Nasc: 16/07/1990. Profissão: Auxiliar de Escritório. Estado Civil: Solteira. Nacionalidade: Brasileira.\n" +
      "End: Rua Luiz de Matos, Quadra 194, Lote 09, Setor Sudoeste, Goiânia/GO, CEP 74303010."
  },

  /* ── Ficha 144 ─────────────────────────────────────────────── */
  {
    id: 144,
    nome: "Edvaldo Xavier dos Prazeres Junior",
    cpf: "116.200.417-74",
    rg: "2126626 SPTC/ES",
    estadoCivil: "Solteiro",
    empresa: "WAM",
    razaoSocial: "W-20 Empreendimentos Imobiliários Ltda",
    cnpj: "30.123.187/0001-81",
    empreendimento: "Ondas Praia Resort",
    bloco: "C",
    apartamento: "C102",
    andar: "",
    cota: "21",
    fracao: "1/52",
    localizacao: "Porto Seguro/BA",
    valorPago: 7675.11,
    parcelas: [
      { tipo: "Intermediação Débito", qtd: 1, valor: 200, forma: "Cartão de Débito", vencimento: "" },
      { tipo: "Intermediação Recorrente", qtd: 11, valor: 550.27, forma: "Crédito Recorrente", vencimento: "" },
      { tipo: "Cota Sinal", qtd: 3, valor: 50, forma: "Boleto", vencimento: "2026-04-15" },
      { tipo: "Cota Saldo", qtd: 96, valor: 636.07, forma: "Boleto", vencimento: "2026-07-20" }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 200 Cartão de Débito + 11x R$ 550,27 Crédito Recorrente (total R$ 6.253) | Cota: 3x R$ 50 boleto (1ª 15/04/2026) + 96x R$ 636,07 boleto (1ª 20/07/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-03-07",
    telefone: "(27) 99311-2224",
    email: "caikxavier6@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/144-edvaldo-xavier-ondas-praia-resort-blc-c102-cota21--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 7.675,11 — intermediação: débito R$ 200 + recorrente 11x R$ 550,27 = R$ 6.052,97 (valor cheio) + boletos vencidos: 3x R$ 50 sinal + 2x R$ 636,07 saldo = R$ 1.422,14.\n" +
      "Intermediação R$ 6.253 devida à WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Cota R$ 61.213: 3x R$ 50 boleto (1ª 15/04/2026) + 96x R$ 636,07 boleto (1ª 20/07/2026). Valor total: R$ 67.466.\n" +
      "FORA DO PRAZO — contrato 07/03/2026, prazo arrependimento venceu 14/03/2026.\n" +
      "GSign documento 282423. Assinatura digital 07/03/2026.\n" +
      "Matrícula nº 38.236 — Cartório de Registro de Imóveis de Porto Seguro/BA.\n" +
      "2 semanas de uso por ano.\n" +
      "Nasc: 23/09/1988. Profissão: Motorista Particular.\n" +
      "Tel. secundário: (27) 99311-2224."
  },

  /* ── Ficha 145 ─────────────────────────────────────────────── */
  {
    id: 145,
    nome: "Priscila de Oliveira",
    cpf: "064.333.459-99",
    rg: "123908520 SESP/PR",
    estadoCivil: "União estável",
    empresa: "GAV",
    razaoSocial: "GAV Gramado Empreendimento Imobiliário SPE Ltda",
    cnpj: "45.042.537/0001-52",
    empreendimento: "Gran Valley Resort",
    bloco: "B",
    apartamento: "B 415",
    andar: "1",
    cota: "10",
    fracao: "1/52",
    localizacao: "Gramado/RS",
    valorPago: 9890.45,
    parcelas: [
      { tipo: "Intermediação PIX", qtd: 1, valor: 1990.00, forma: "PIX", vencimento: "2025-10-05" },
      { tipo: "Intermediação Boleto", qtd: 4, valor: 625.00, forma: "Boleto", vencimento: "2025-11-15" },
      { tipo: "Sinal", qtd: 4, valor: 901.42, forma: "Sinal", vencimento: "2026-03-15" },
      { tipo: "Saldo", qtd: 80, valor: 800.23, forma: "Boleto", vencimento: "2026-07-15" }
    ],
    formaPagamentoEntrada: "PIX R$ 1.990,00 (Nº RESN9268080091) + Boleto 4x R$ 625,00 (total R$ 2.500,00, 1ª 15/11/2025)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2025-10-05",
    telefone: "(43) 99123-1904",
    email: "pri_oliveira19@hotmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/145-priscila-oliveira-gran-valley-resort-blb-b415-cota10--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 9.890,45 (informado pelo usuário).\n" +
      "Corretagem total: R$ 4.490,00. Valor total da cota: R$ 72.114,10.\n" +
      "Saldo: 80x R$ 800,23 boleto (1ª 15/07/2026).\n" +
      "FORA DO PRAZO — contrato 05/10/2025, prazo arrependimento venceu 12/10/2025.\n" +
      "D4Sign eb9ebebd-41fd-4c41-9336-e2af231f402b. Assinatura presencial 05/10/2025 16:42.\n" +
      "Corretor: Marcel Rossi Abbes (CPF/CNPJ 53843230000189).\n" +
      "Tipo unidade: Cama Queen mais Sofá-Cama. Capacidade: 4 pessoas.\n" +
      "Nasc: 19/04/1993. Profissão: Empresário.\n" +
      "End: Rua Jose Leite de Carvalho, 102, Jardim Lilian, Londrina/PR, CEP 86015-290."
  },

  /* ── Ficha 146 ─────────────────────────────────────────────── */
  {
    id: 146,
    nome: "Bruno Cunha Lopes de Souza",
    cpf: "015.545.952-07",
    rg: "6761567 PC/PA",
    estadoCivil: "Solteiro",
    empresa: "WAM",
    razaoSocial: "Consórcio Dom Pedro Laguna",
    cnpj: "43.740.923/0001-92",
    empreendimento: "Hotel Dom Pedro Laguna",
    bloco: "01204",
    apartamento: "",
    andar: "",
    cota: "09",
    fracao: "1/52",
    localizacao: "Aquiraz/CE",
    valorPago: 2600,
    parcelas: [
      { tipo: "Intermediação Depósito", qtd: 1, valor: 2600, forma: "Depósito Bancário / Transferência Eletrônica", vencimento: "" },
      { tipo: "CDU Saldo", qtd: 98, valor: 227.62, forma: "Boleto", vencimento: "2027-04-20" }
    ],
    formaPagamentoEntrada: "Intermediação (corretagem): 1x R$ 2.600 Depósito Bancário / Transferência Eletrônica | CDU: 98x R$ 227,62 boleto (1ª 20/04/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-05",
    telefone: "(31) 98314-1453",
    email: "lopes.brunocs@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/146-bruno-cunha-lopes-dom-pedro-laguna-bl01204-cota09--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 2.600,00 — corretagem via Depósito Bancário / Transferência Eletrônica. Nenhum boleto vencido (1ª parcela saldo 20/04/2027).\n" +
      "CONTRATO CDU/TIMESHARE — cessão de direito de uso, prazo 10 anos, sem transferência de propriedade.\n" +
      "Corretagem R$ 2.600 devida à W7 Brasil Negócios Inteligentes Ltda. Entrada: inexistente.\n" +
      "CDU R$ 22.606,94: 98x R$ 227,62 boleto mensal (1ª 20/04/2027). Valor total: R$ 25.206,94.\n" +
      "DENTRO DO PRAZO — contrato 05/09/2026, prazo arrependimento vence 12/09/2026.\n" +
      "Nº contrato: 02-01.204/09. Tipo unidade: DELUXE - 1Q (Bloco 01204/Cota 09).\n" +
      "Cedente representada por Dom Pedro Laguna Resort Empreendimentos Imobiliários Ltda (CNPJ 41.928.634/0001-96).\n" +
      "GSign Document ID: 1LZ53OUDGL-ADA8I1G-QA3J7JKKPZ7OXF-CG2NI. CSign: K7W6L9BWI5EW. Assinatura 05/09/2026.\n" +
      "Taxa anual serviços/manutenção: R$ 1.300 por UH (capacidade máxima apartamento).\n" +
      "Nasc: 28/03/1998. Profissão: Engenheiro de Produção.\n" +
      "End: Rua Osvaldo Cruz APT 1101, 188, Meireles, Fortaleza/CE, CEP 60125150."
  },

  /* ── Ficha 147 ─────────────────────────────────────────────── */
  {
    id: 147,
    nome: "Acson Santos Bezerra",
    cpf: "058.485.245-21",
    rg: "1313086967 SSP/BA",
    estadoCivil: "Casado(a)",
    empresa: "GAV",
    razaoSocial: "GAV Barra de São Miguel Empreendimento Imobiliário SPE Ltda.",
    cnpj: "45.298.124/0001-33",
    empreendimento: "Areya Barra Resort",
    bloco: "01",
    apartamento: "313",
    andar: "3",
    cota: "04",
    fracao: "1/52",
    localizacao: "Barra de São Miguel/AL",
    valorPago: 1275,
    parcelas: [
      { tipo: "Corretagem Cartão", qtd: 1, valor: 1275, forma: "Cartão Crédito à Vista (Master ****3305)", vencimento: "2026-10-07" },
      { tipo: "Corretagem Boleto", qtd: 4, valor: 678.75, forma: "Boleto", vencimento: "2026-11-07" },
      { tipo: "Sinal", qtd: 4, valor: 640.40, forma: "Boleto", vencimento: "2027-03-10" },
      { tipo: "Saldo", qtd: 74, valor: 603.79, forma: "Boleto", vencimento: "2027-07-10" }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.275 Cartão Crédito à Vista (Master) + 4x R$ 678,75 boleto (1ª 07/11/2026) | Sinal: 4x R$ 640,40 boleto (1ª 10/03/2027) | Saldo: 74x R$ 603,79 boleto (1ª 10/07/2027)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-07",
    telefone: "(71) 991682925",
    email: "acson.bezerra@gmail.com",
    conjuge: {},
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/147-acson-santos-bezerra-areya-barra-resort-bl01-313-cota04--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.275,00 — cartão crédito à vista (Master ****3305, CV 178626954). Valor cheio.\n" +
      "Comprovante de máquina mostra R$ 2.550,00 (CV 178626954) — possível 2 contratos na mesma transação (2× R$ 1.275). Neste contrato: R$ 1.275.\n" +
      "Corretagem total: R$ 3.990. Boletos corretagem (4× R$ 678,75, 1ª 07/11/2026) — nenhum vencido.\n" +
      "Sinal R$ 2.561,59 (4× R$ 640,40, 1ª 10/03/2027) — nenhum vencido. Saldo R$ 44.680,46 (74× R$ 603,79, 1ª 10/07/2027) — nenhum vencido.\n" +
      "Valor total cota: R$ 51.232,05. Contrato nº 358965.\n" +
      "DENTRO DO PRAZO — contrato 07/09/2026, prazo arrependimento vence 14/09/2026.\n" +
      "2 semanas/ano de utilização (Período de Utilização 2 semanas por Ano-Calendário).\n" +
      "Assinatura ZapSign 07/09/2026 15:48:30 (comprador). Token: 52d887b2-fb7e-424a-b61b-c56c7665cbb2.\n" +
      "Consultor: Felipe Rocha Gama Sobra.\n" +
      "Nasc: 31/08/1994. Profissão: Vendedor(a).\n" +
      "End: Rua Pedro Ivo, 12, Caixa D Agua, Salvador/BA, CEP 40320010."
  },

  /* ── Ficha 148 ─────────────────────────────────────────────── */
  {
    id: 148,
    nome: "Jackson Bruno Ribeiro de Aguiar",
    cpf: "106.125.696-08",
    rg: "MG16565211 SSP/MG",
    estadoCivil: "Casado",
    empresa: "WAM",
    razaoSocial: "SPE Porto Seguro 02 Empreendimentos Imobiliários S.A.",
    cnpj: "22.059.167/0001-60",
    empreendimento: "Ondas Praia Resort",
    bloco: "C",
    apartamento: "C206",
    andar: "",
    cota: "16",
    fracao: "1/52",
    localizacao: "Porto Seguro/BA",
    valorPago: 3004,
    parcelas: [
      { tipo: "Intermediação Depósito", qtd: 1, valor: 1000, forma: "Depósito Bancário / Transferência Eletrônica", vencimento: "" },
      { tipo: "Intermediação Boleto", qtd: 5, valor: 952, forma: "Boleto - Cobrança W Palmerston", vencimento: "" },
      { tipo: "Preço Entrada", qtd: 4, valor: 50, forma: "Boleto", vencimento: "2026-07-15" },
      { tipo: "Preço Saldo", qtd: 96, valor: 635.55, forma: "Boleto", vencimento: "2026-11-15" }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 1.000 Depósito/Transferência + 5x R$ 952 boleto (W Palmerston) | Preço: 4x R$ 50 boleto (1ª 15/07/2026) + 96x R$ 635,55 boleto (1ª 15/11/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-06-25",
    telefone: "(31) 99355-0973",
    email: "jackson.bruno.r.a@gmail.com",
    conjuge: {
      nome: "Lorraine Rodrigues de Oliveira",
      cpf: "135.692.486-74",
      rg: "MG17847176 SSP/MG"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/148-jackson-bruno-ondas-praia-resort-blc-c206-cota16--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.004,00 (estimado) — depósito R$ 1.000 (intermediação) + 2 boletos intermediação vencidos R$ 1.904 (2× R$ 952, datas não especificadas no contrato) + 2 boletos preço vencidos R$ 100 (2× R$ 50).\n" +
      "Intermediação total: R$ 5.760 (devida a WAM Comercialização S.A., CNPJ 17.919.649/0001-03). Boletos via W Palmerston — vencimentos NÃO informados no contrato.\n" +
      "Preço cota (sem intermediação): R$ 61.213,00. 96x R$ 635,55 boleto (1ª 15/11/2026) — nenhum vencido.\n" +
      "Contrato nº 299876. Regime de bens: Comunhão Parcial.\n" +
      "FORA DO PRAZO — contrato 25/06/2026, prazo arrependimento venceu 02/07/2026.\n" +
      "2 semanas/ano de utilização. Habite-se: 00046/2021 a 00611/2021 (a partir de 02/03/2021).\n" +
      "GSign Document ID: LBQA2ZSGQ2-PWHOTYM-K6L910HIBIE3C5-BT1HP. Assinatura 25/06/2026.\n" +
      "Cônjuge Lorraine: nasc 23/06/1996, pedagogo, tel (31) 99360-9536, e-mail lorraine.olive24@gmail.com.\n" +
      "Nasc: 20/06/1996. Profissão: Motorista(a).\n" +
      "End: Não informado no contrato (endereço residencial não preenchido no quadro-resumo)."
  },

  // ── Ficha 149 ── Lidia dos Santos Chaves — Praias do Lago Eco Resort (contrato 1/4) ──
  {
    id: 149,
    nome: "Lidia dos Santos Chaves",
    cpf: "344.893.648-06",
    rg: "MG24083029 - SSP/MG",
    nascimento: "1986-07-25",
    estadoCivil: "União Estável",
    profissao: "Professor(a)",
    empresa: "WAM",
    empreendimento: "Praias do Lago Eco Resort",
    cidade: "Caldas Novas/GO",
    bloco: "N",
    unidade: "101",
    andar: "",
    cota: "04",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 46446.75,
    precoIntermediacao: 6160.00,
    precoTotal: 52606.75,
    valorPago: 875.00,
    entradas: [
      { descricao: "Cartão de débito intermediação (1x R$ 750)", valor: 750.00 },
      { descricao: "PIX (R$ 500 total / 4 contratos)", valor: 125.00 }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 750 cartão débito + 11x R$ 491,81 crédito recorrente | Preço: 4x R$ 50 boleto (1ª 10/09/2026) + 88x R$ 525,53 boleto (1ª 10/01/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-15",
    telefone: "(34) 98308-0069",
    email: "LIDIASANTOS1508@gMAIL.COM",
    conjuge: {
      nome: "Renan Alves dos Santos",
      cpf: "130.286.556-08",
      rg: "MG20367608 - SSP/MG"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/149-lidia-dos-santos-chaves-praias-do-lago-bln-101-cota04--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 875 (R$ 3.500 total / 4 contratos) — débito R$ 750 + PIX R$ 125.\n" +
      "Pagamento total informado pelo cliente: R$ 3.000 cartão débito (4× R$ 750) + R$ 500 PIX = R$ 3.500.\n" +
      "Crédito recorrente intermediação (11× R$ 491,81) NÃO cobrado ainda.\n" +
      "Intermediação contratual: R$ 6.160 (devida a WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Preço cota (sem intermediação): R$ 46.446,75. Boletos preço não pagos.\n" +
      "FORA DO PRAZO — contrato 15/08/2026, prazo arrependimento venceu 22/08/2026.\n" +
      "3 semanas/ano de utilização. Habite-se: 2020001124, expedido 20/11/2020.\n" +
      "Vendedora: NG20 Empreendimentos Imobiliários S/A (CNPJ 19.829.219/0001-26).\n" +
      "GSign Document ID: 4839QODHQ6-BO5OXQR-DN4G3R6HMM8WHB-ZY3DS.\n" +
      "Cônjuge Renan: nasc 28/05/1996, serralheiro, e-mail alvesdossantosrenan422@gmail.com.\n" +
      "4 contratos mesma pessoa/cônjuge no mesmo resort — fichas 140, 149, 150, 151 (unidades N/003/11, N/101/04, H/207/03, H/202/12)."
  },

  // ── Ficha 150 ── Lidia dos Santos Chaves — Praias do Lago Eco Resort (contrato 2/4) ──
  {
    id: 150,
    nome: "Lidia dos Santos Chaves",
    cpf: "344.893.648-06",
    rg: "MG24083029 - SSP/MG",
    nascimento: "1986-07-25",
    estadoCivil: "União Estável",
    profissao: "Professor(a)",
    empresa: "WAM",
    empreendimento: "Praias do Lago Eco Resort",
    cidade: "Caldas Novas/GO",
    bloco: "H",
    unidade: "207",
    andar: "",
    cota: "03",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 46446.75,
    precoIntermediacao: 6160.00,
    precoTotal: 52606.75,
    valorPago: 875.00,
    entradas: [
      { descricao: "Cartão de débito intermediação (1x R$ 750)", valor: 750.00 },
      { descricao: "PIX (R$ 500 total / 4 contratos)", valor: 125.00 }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 750 cartão débito + 11x R$ 491,81 crédito recorrente | Preço: 4x R$ 50 boleto (1ª 10/09/2026) + 88x R$ 525,53 boleto (1ª 10/01/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-15",
    telefone: "(34) 98308-0069",
    email: "LIDIASANTOS1508@gMAIL.COM",
    conjuge: {
      nome: "Renan Alves dos Santos",
      cpf: "130.286.556-08",
      rg: "MG20367608 - SSP/MG"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/150-lidia-dos-santos-chaves-praias-do-lago-blh-207-cota03--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 875 (R$ 3.500 total / 4 contratos) — débito R$ 750 + PIX R$ 125.\n" +
      "Pagamento total informado pelo cliente: R$ 3.000 cartão débito (4× R$ 750) + R$ 500 PIX = R$ 3.500.\n" +
      "Crédito recorrente intermediação (11× R$ 491,81) NÃO cobrado ainda.\n" +
      "Intermediação contratual: R$ 6.160 (devida a WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Preço cota (sem intermediação): R$ 46.446,75. Boletos preço não pagos.\n" +
      "FORA DO PRAZO — contrato 15/08/2026, prazo arrependimento venceu 22/08/2026.\n" +
      "3 semanas/ano de utilização. Habite-se: 2020001124, expedido 20/11/2020.\n" +
      "Vendedora: NG20 Empreendimentos Imobiliários S/A (CNPJ 19.829.219/0001-26).\n" +
      "GSign Document ID: ECGRNL7ADI-H1T0EP6-XXT1Y4EYAF1ZT9-JTH8V.\n" +
      "Cônjuge Renan: nasc 28/05/1996, serralheiro, e-mail alvesdossantosrenan422@gmail.com.\n" +
      "4 contratos mesma pessoa/cônjuge no mesmo resort — fichas 140, 149, 150, 151 (unidades N/003/11, N/101/04, H/207/03, H/202/12)."
  },

  // ── Ficha 151 ── Lidia dos Santos Chaves — Praias do Lago Eco Resort (contrato 3/4) ──
  {
    id: 151,
    nome: "Lidia dos Santos Chaves",
    cpf: "344.893.648-06",
    rg: "MG24083029 - SSP/MG",
    nascimento: "1986-07-25",
    estadoCivil: "União Estável",
    profissao: "Professor(a)",
    empresa: "WAM",
    empreendimento: "Praias do Lago Eco Resort",
    cidade: "Caldas Novas/GO",
    bloco: "H",
    unidade: "202",
    andar: "",
    cota: "12",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 46446.75,
    precoIntermediacao: 6160.00,
    precoTotal: 52606.75,
    valorPago: 875.00,
    entradas: [
      { descricao: "Cartão de débito intermediação (1x R$ 750)", valor: 750.00 },
      { descricao: "PIX (R$ 500 total / 4 contratos)", valor: 125.00 }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 750 cartão débito + 11x R$ 491,81 crédito recorrente | Preço: 4x R$ 50 boleto (1ª 10/09/2026) + 88x R$ 525,53 boleto (1ª 10/01/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-15",
    telefone: "(34) 98308-0069",
    email: "LIDIASANTOS1508@gMAIL.COM",
    conjuge: {
      nome: "Renan Alves dos Santos",
      cpf: "130.286.556-08",
      rg: "MG20367608 - SSP/MG"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/151-lidia-dos-santos-chaves-praias-do-lago-blh-202-cota12--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 875 (R$ 3.500 total / 4 contratos) — débito R$ 750 + PIX R$ 125.\n" +
      "Pagamento total informado pelo cliente: R$ 3.000 cartão débito (4× R$ 750) + R$ 500 PIX = R$ 3.500.\n" +
      "Crédito recorrente intermediação (11× R$ 491,81) NÃO cobrado ainda.\n" +
      "Intermediação contratual: R$ 6.160 (devida a WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Preço cota (sem intermediação): R$ 46.446,75. Boletos preço não pagos.\n" +
      "FORA DO PRAZO — contrato 15/08/2026, prazo arrependimento venceu 22/08/2026.\n" +
      "3 semanas/ano de utilização. Habite-se: 2020001124, expedido 20/11/2020.\n" +
      "Vendedora: NG20 Empreendimentos Imobiliários S/A (CNPJ 19.829.219/0001-26).\n" +
      "GSign Document ID: N2FJBG6KVM-Q40JBVM-1ZPADZZYBQQ8JJ-RJ7DZ.\n" +
      "Cônjuge Renan: nasc 28/05/1996, serralheiro, e-mail alvesdossantosrenan422@gmail.com.\n" +
      "4 contratos mesma pessoa/cônjuge no mesmo resort — fichas 140, 149, 150, 151 (unidades N/003/11, N/101/04, H/207/03, H/202/12)."
  },

  // ── Ficha 152 ── Acson Santos Bezerra — Areya Barra Resort (Bl 01 / Apto 649 / Cota 30) ──
  {
    id: 152,
    nome: "Acson Santos Bezerra",
    cpf: "058.485.245-21",
    rg: "1313086967 - SSP/BA",
    nascimento: "1994-08-31",
    estadoCivil: "Casado",
    profissao: "Vendedor(a)",
    empresa: "GAV",
    empreendimento: "Areya Barra Resort",
    cidade: "Barra de São Miguel/AL",
    bloco: "01",
    unidade: "649",
    andar: "6",
    cota: "30",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 30253.51,
    precoIntermediacao: 1995.00,
    precoTotal: 32248.51,
    valorPago: 1440.00,
    entradas: [
      { descricao: "PIX corretagem (1x R$ 1.440, doc RESV091270094845425AL0WUXWZ139E8B9)", valor: 1440.00 }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.440 PIX (07/09/2026) + 4x R$ 138,75 boleto (1ª 07/10/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-07",
    telefone: "(71) 99168-2925",
    email: "acson.bezerra@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/152-acson-santos-bezerra-areya-barra-resort-bl01-649-cota30--contrato.pdf" }
    ],
    pix: "RESV091270094845425AL0WUXWZ139E8B9",
    observacoes:
      "VALOR PAGO = R$ 1.440 (PIX corretagem, 07/09/2026). 4 boletos R$ 138,75 (1ª 07/10/2026) NÃO vencidos ainda.\n" +
      "Corretagem total: R$ 1.995 = R$ 1.440 PIX + 4x R$ 138,75 boleto (R$ 555).\n" +
      "Preço fração de tempo: R$ 30.253,51. Sinal negócio R$ 1.512,69 + 4x R$ 378,17 boleto (1ª 10/02/2027). Saldo R$ 26.745,82 + 74x R$ 361,43 boleto (1ª 10/06/2027).\n" +
      "DENTRO DO PRAZO — contrato 07/09/2026, prazo arrependimento vence 14/09/2026.\n" +
      "Vendedora: GAV Barra de São Miguel Empreendimento Imobiliário SPE Ltda (CNPJ 45.298.124/0001-33). Proposta nº 358963.\n" +
      "Assinatura ZapSign 07/09/2026. ZapSign ID: 43558432-9469-4747-8b72-ed4d861a80b2.\n" +
      "Cônjuge não informado no contrato (Estado Civil: Casado, mas dados do cônjuge em branco).\n" +
      "1 semana/ano de utilização. Fração ideal 0,0053589759347%. Área 76,66m² (privativa 35,37 + comum 41,29).\n" +
      "Empreendimento em construção (previsão conclusão dez/2027)."
  },

  // ── Ficha 153 ── Acson Santos Bezerra — Areya Barra Resort (Bl 01 / Apto 649 / Cota 44) ──
  {
    id: 153,
    nome: "Acson Santos Bezerra",
    cpf: "058.485.245-21",
    rg: "1313086967 - SSP/BA",
    nascimento: "1994-08-31",
    estadoCivil: "Casado",
    profissao: "Vendedor(a)",
    empresa: "GAV",
    empreendimento: "Areya Barra Resort",
    cidade: "Barra de São Miguel/AL",
    bloco: "01",
    unidade: "649",
    andar: "6",
    cota: "44",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 30253.51,
    precoIntermediacao: 1995.00,
    precoTotal: 32248.51,
    valorPago: 1275.00,
    entradas: [
      { descricao: "Cartão crédito à vista Master corretagem (CV 178626954, Rede)", valor: 1275.00 }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.275 cartão crédito à vista Master (Rede, CV 178626954) + 4x R$ 180 boleto (1ª 07/11/2026)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-07",
    telefone: "(71) 99168-2925",
    email: "acson.bezerra@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/153-acson-santos-bezerra-areya-barra-resort-bl01-649-cota44--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.275 (cartão crédito à vista, valor cheio). 4 boletos R$ 180 (1ª 07/11/2026) NÃO vencidos ainda.\n" +
      "Corretagem total: R$ 1.995 = R$ 1.275 cartão + 4x R$ 180 boleto (R$ 720).\n" +
      "CARTÃO CV 178626954 = MESMO da ficha 147 (cota 04). Comprovante máquina R$ 2.550 = 2 contratos juntos (2× R$ 1.275). MISTÉRIO DA FICHA 147 RESOLVIDO.\n" +
      "Preço fração de tempo: R$ 30.253,51. Sinal negócio R$ 1.512,69 + 4x R$ 378,17 boleto (1ª 10/03/2027). Saldo R$ 26.745,82 + 74x R$ 361,43 boleto (1ª 10/07/2027).\n" +
      "DENTRO DO PRAZO — contrato 07/09/2026, prazo arrependimento vence 14/09/2026.\n" +
      "Vendedora: GAV Barra de São Miguel Empreendimento Imobiliário SPE Ltda (CNPJ 45.298.124/0001-33). Proposta nº 358964.\n" +
      "Assinatura ZapSign 07/09/2026. ZapSign ID: 6425b152-08a0-496a-8b3d-7c876dbed778.\n" +
      "Cônjuge não informado no contrato (Estado Civil: Casado, mas dados do cônjuge em branco).\n" +
      "1 semana/ano de utilização. Fração ideal 0,0053589759347%. Área 76,66m² (privativa 35,37 + comum 41,29).\n" +
      "Empreendimento em construção (previsão conclusão dez/2027)."
  },

  // ── Ficha 154 ── Leticia de Moraes Bueno — Kawana Residence ──
  {
    id: 154,
    nome: "Leticia de Moraes Bueno",
    cpf: "754.177.901-68",
    rg: "5766202 - SSP/GO",
    nascimento: "1991-12-16",
    estadoCivil: "Casado",
    profissao: "Autônomo(a)",
    empresa: "WAM",
    empreendimento: "Kawana Residence",
    cidade: "Caldas Novas/GO",
    bloco: "03",
    unidade: "302",
    andar: "",
    cota: "O/M",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 55190.00,
    precoIntermediacao: 6100.00,
    precoTotal: 61290.00,
    valorPago: 6100.00,
    entradas: [
      { descricao: "TED/DOC/Depósito intermediação (1x R$ 610)", valor: 610.00 },
      { descricao: "Crédito recorrente intermediação — Galax Pay (5x R$ 1.098)", valor: 5490.00 }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 610 TED/DOC/Depósito + 5x R$ 1.098 Crédito Recorrente (Galax Pay) | Preço: 3x R$ 50 boleto (1ª 15/10/2026) + 84x R$ 655,24 boleto (1ª 20/01/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-05",
    telefone: "(62) 99925-2631",
    email: "bueno4668@gmail.com",
    conjuge: {
      nome: "Paulo Giovane Moreira Passos",
      cpf: "029.486.831-30",
      rg: "5142766 - SSP/GO"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/154-leticia-moraes-bueno-kawana-residence-bl03-302-cotaom--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 6.100 (estimado) — TED/DOC/Depósito R$ 610 + crédito recorrente 5× R$ 1.098 = R$ 5.490 (valor cheio contratual). CONFIRMAR se recorrente foi realmente cobrado.\n" +
      "Intermediação total: R$ 6.100 (devida a WAM Comercialização S.A., CNPJ 17.919.649/0001-03). Recorrente via Galax Pay.\n" +
      "Preço cota (sem intermediação): R$ 55.190,00. 3x R$ 50 boleto (1ª 15/10/2026) + 84x R$ 655,24 boleto (1ª 20/01/2027) — nenhum boleto vencido ainda.\n" +
      "Forma de reembolso: Reembolso (instrumento principal = TED/DOC/Depósito, listado primeiro).\n" +
      "DENTRO DO PRAZO — contrato 05/09/2026, prazo arrependimento vence 12/09/2026 (AMANHÃ).\n" +
      "2 semanas/ano de utilização. Habite-se PREVISTO para 31/12/2027 — empreendimento em construção.\n" +
      "Vendedora: S.P.E. Mirante Investimento Imobiliários S/A (CNPJ 18.622.215/0001-00), Caldas Novas/GO. Matrícula 77.345 — R5-77.345.\n" +
      "Contrato nº 314334. GSign Document ID: 9KE1RNQB0M-4TB2V2J-EYAG3KW5B5X1S3-LY39R.\n" +
      "ATENÇÃO: contrato indica que NÃO conheceu o Empreendimento pessoalmente (opção 'Não' marcada) — pode fortalecer direito de arrependimento fora de estande.\n" +
      "Cônjuge Paulo Giovane: nasc 30/07/1986, eletricista, tel (62) 99337-8062, e-mail paulogiovane2@hotmail.com."
  },

  // ── Ficha 155 ── Aline Moraes Godinho — Oikos Maragogi Resort ──
  {
    id: 155,
    nome: "Aline Moraes Godinho",
    cpf: "009.628.101-42",
    rg: "2251102 - SSP/DF",
    nascimento: "1983-10-18",
    estadoCivil: "Casado",
    profissao: "Servidor Público(a)",
    empresa: "GAV",
    empreendimento: "Oikos Maragogi Resort",
    cidade: "Maragogi/AL",
    bloco: "02",
    unidade: "UH 241",
    andar: "2",
    cota: "13",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 63370.04,
    precoIntermediacao: 3990.00,
    precoTotal: 67360.04,
    valorPago: 1000.00,
    entradas: [
      { descricao: "Cartão crédito à vista Master corretagem (CV 180013630, Rede)", valor: 1000.00 }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.000 cartão crédito à vista Master (Rede, CV 180013630) + 5x R$ 598 boleto (1ª 06/11/2026)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-06",
    telefone: "(61) 99294-6494",
    email: "aline_moraesg@hotmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/155-aline-moraes-godinho-oikos-maragogi-bl02-uh241-cota13--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000 (cartão crédito à vista, valor cheio). 5 boletos R$ 598 (1ª 06/11/2026) NÃO vencidos ainda.\n" +
      "Corretagem total: R$ 3.990 = R$ 1.000 cartão + 5x R$ 598 boleto (R$ 2.990).\n" +
      "Preço fração de tempo: R$ 63.370,04. Sinal negócio R$ 3.168,52 + 4x R$ 792,13 boleto (1ª 10/04/2027). Saldo R$ 56.211,52 + 68x R$ 826,64 boleto (1ª 10/08/2027).\n" +
      "Beneficiários da corretagem: Johnata Guimarães Cardoso, Heber Pereira Galiza, Wirlen da Silva Alves.\n" +
      "DENTRO DO PRAZO — contrato 06/09/2026, prazo arrependimento vence 13/09/2026 (em 2 dias).\n" +
      "Vendedora: GAV Maragogi Empreendimento Imobiliário SPE Ltda (CNPJ 39.757.445/0001-56). Proposta nº 358731.\n" +
      "Assinatura em Pirenópolis-GO, 06/09/2026. ZapSign ID: c413d64e-0fa9-43cc-ae21-1e8205c0a473.\n" +
      "Cônjuge não informado no contrato (Estado Civil: Casado, mas dados do cônjuge em branco).\n" +
      "2 semanas/ano de utilização. Fração ideal 0,0099148606792%. Área 90,26m² (privativa 32,72 + comum 57,54).\n" +
      "Empreendimento em construção (previsão conclusão junho/2027, habite-se não emitido). Alvará 105298/2022.\n" +
      "End cliente: Quadra SQN 316 Bloco C, 209, Asa Norte, Brasília/DF, CEP 70775030."
  },

  // ── Ficha 156 ── Andresa Lucas Carvalho — GAV Vacation Club (PONTOS/Timeshare) ──
  {
    id: 156,
    nome: "Andresa Lucas Carvalho Lourenço dos Santos",
    cpf: "968.529.500-00",
    rg: "5076600864 - SSP/RS",
    nascimento: "1978-06-30",
    estadoCivil: "Casado",
    profissao: "Cuidador(a) de Idosos",
    empresa: "GAV",
    empreendimento: "GAV Vacation Club (Timeshare — 100.000 Pontos)",
    cidade: "Goiânia/GO",
    bloco: "",
    unidade: "",
    andar: "",
    cota: "",
    fracao: "",
    checkIn: "",
    checkOut: "",
    precoCota: 12900.00,
    precoIntermediacao: 0,
    precoTotal: 12900.00,
    valorPago: 215.00,
    entradas: [
      { descricao: "Cartão CREDAV 2 Sinal/Princípio (CV 930907, venc 06/10/2026)", valor: 215.00 }
    ],
    formaPagamentoEntrada: "Sinal: 1x R$ 215 cartão CREDAV 2 (venc 06/10/2026) | Saldo: 59x R$ 215 boleto (1ª 05/11/2026)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-06",
    telefone: "(51) 98966-9140",
    email: "desadosul@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/156-andresa-lucas-gav-vacation-club-100mil-pontos--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "CONTRATO DE PONTOS (GAV Vacation Club — Timeshare por pontos, semelhante à ficha 58/Hyan). NÃO é multipropriedade — não há bloco/unidade/cota.\n" +
      "VALOR PAGO = R$ 215 (cartão CREDAV 2, valor cheio). Boleto 05/11/2026 ainda não vencido.\n" +
      "Produto: 100.000 Pontos (utilizáveis em qualquer empreendimento GAV, conforme tabela de pontos).\n" +
      "Preço total: R$ 12.900,00. Sinal R$ 215 (cartão) + Saldo R$ 12.685,00 em 59x R$ 215 boleto (1ª 05/11/2026).\n" +
      "Prazo do contrato: 5 anos. Reajuste anual pelo IPCA.\n" +
      "DENTRO DO PRAZO — contrato 06/09/2026, prazo arrependimento vence 13/09/2026 (em 2 dias).\n" +
      "Cedente: GAV TS Administração Unipessoal Ltda (CNPJ 47.008.570/0001-91), Goiânia/GO.\n" +
      "Escritório de vendas: Gramado - NOITE. Contrato assinado em Salinópolis/PA.\n" +
      "Contrato nº 100.000-005429. ZapSign ID: 8abccde2-d321-4fac-8067-a5d483732c23.\n" +
      "Cônjuge não informado no contrato (Estado Civil: Casado, mas dados do cônjuge em branco).\n" +
      "Endereço cliente: Outros PELOTAS 178 CASA, Bairro Aparecida, Alvorada/RS, CEP 94853030."
  },

  // ── Ficha 158 ── Cristiane Souza de Arruda — Porto 2 Life Resort ──
  {
    id: 158,
    nome: "Cristiane Souza de Arruda",
    cpf: "715.277.914-75",
    rg: "71527791475 - IITB/PE",
    nascimento: "1985-11-04",
    estadoCivil: "Casado",
    profissao: "Empresário(a)",
    empresa: "GAV",
    empreendimento: "Porto 2 Life Resort",
    cidade: "Ipojuca/PE",
    bloco: "03",
    unidade: "0215",
    andar: "1",
    cota: "17",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 79186.37,
    precoIntermediacao: 3990.00,
    precoTotal: 83176.37,
    valorPago: 3990.00,
    entradas: [
      { descricao: "PIX corretagem (1x R$ 1.000, doc RESV1452130095158073JKKOOAPA816B7C9, 06/09/2026)", valor: 1000.00 },
      { descricao: "Cartão crédito à vista Master corretagem (CV 180081550, Rede, 06/10/2026)", valor: 2990.00 }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.000 PIX (06/09/2026) + 1x R$ 2.990 cartão crédito à vista Master (Rede)",
    formaReembolso: "Reembolso + Estorno",
    dataAssinatura: "2026-09-06",
    telefone: "(81) 99314-4187",
    email: "jamersonmonteiro68@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/158-cristiane-souza-arruda-porto-2-life-resort-bl03-0215-cota17--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990 — R$ 1.000 PIX (06/09/2026) + R$ 2.990 cartão crédito à vista Master (valor cheio).\n" +
      "PAGAMENTO MISTO — Reembolso R$ 1.000 (via PIX na chave do cliente) + Estorno R$ 2.990 (no cartão Master utilizado na compra).\n" +
      "Corretagem total: R$ 3.990 (integral pago). Beneficiários: Israel Xavier Silva, Marcus Vinicius Miranda Urpia, Joelson Joaquim da Silva, Jesyca L. de Oliveira Ltda.\n" +
      "Preço fração de tempo: R$ 79.186,37. Sinal negócio R$ 3.959,29 + 4x R$ 989,82 boleto (1ª 10/11/2026). Saldo R$ 71.237,08 + 67x R$ 1.063,24 boleto (1ª 10/03/2027).\n" +
      "DENTRO DO PRAZO — contrato 06/09/2026, prazo arrependimento vence 13/09/2026 (em 2 dias).\n" +
      "Vendedora: GAV Muro Alto 2 Empreendimento Imobiliário SPE Ltda (CNPJ 39.673.888/0001-69). Proposta nº 358738.\n" +
      "ATENÇÃO email: 'jamersonmonteiro68@gmail.com' parece ser email do cônjuge/marido (Jamerson Monteiro), não da titular Cristiane. Confirmar.\n" +
      "ATENÇÃO RG: campo mostra número IGUAL ao CPF (71527791475 IITB PE) — dado do contrato pode estar errado, confirmar com o cliente.\n" +
      "Assinatura em Ipojuca-PE, 06/09/2026. ZapSign ID: 62f1f708-ff79-4179-8294-e1c6df863a24.\n" +
      "Cônjuge não informado no contrato (Estado Civil: Casado, mas dados do cônjuge em branco).\n" +
      "2 semanas/ano de utilização. Fração ideal 0,0036808742200%. Área 69,89m² (privativa 32,54 + comum 37,35). 1 quarto.\n" +
      "Empreendimento em construção (obras previstas outubro/2025 + 180 dias tolerância).\n" +
      "End cliente: Rua do Borges, 160, Bairro Matriz, Vitória de Santo Antão/PE, CEP 55602030."
  },

  // ── Ficha 159 ── Sthefanny Kelly de Araujo Santos Lima — Gran Garden Resort ──
  {
    id: 159,
    nome: "Sthefanny Kelly de Araujo Santos Lima",
    cpf: "702.156.314-04",
    rg: "4048929 - SSDS/PB",
    nascimento: "2000-03-17",
    estadoCivil: "Solteiro",
    profissao: "Dentista",
    empresa: "GAV",
    empreendimento: "Gran Garden Resort",
    cidade: "Gramado/RS",
    bloco: "B4",
    unidade: "101",
    andar: "1",
    cota: "34",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 75784.47,
    precoIntermediacao: 3990.00,
    precoTotal: 79774.47,
    valorPago: 1500.00,
    entradas: [
      { descricao: "Cartão de débito VISA corretagem (1x R$ 1.500, CV 189801802, Rede)", valor: 1500.00 }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.500 cartão débito VISA (Rede, CV 189801802) + 3x R$ 830 boleto (1ª 15/08/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-07-16",
    telefone: "(83) 98641-7128",
    email: "sthefanny-kelly@live.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/159-sthefanny-kelly-gran-garden-resort-blB4-101-cota34--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.500 — apenas a entrada (cartão débito VISA, valor cheio). Confirmado pelo usuário: nenhum boleto foi pago.\n" +
      "Boletos NÃO pagos: 3x R$ 830 (vencimentos 15/08, 15/09, 15/10/2026). Cliente parou de pagar após a entrada.\n" +
      "Corretagem total contratual: R$ 3.990 = R$ 1.500 débito + 3x R$ 830 boleto (R$ 2.490 — não quitados). Beneficiários: Victoria Regina Silva de Moura, Francisco Kennedy Matos, Washington Luiz Pereira de Sou, Nubia Magalhães de Lima.\n" +
      "Preço fração de tempo: R$ 75.784,47. Sinal R$ 3.789,26 + 5x R$ 757,85 boleto (1ª 10/11/2026). Saldo R$ 68.005,21 + 91x R$ 747,31 boleto (1ª 10/04/2027).\n" +
      "Forma reembolso: Reembolso (cartão de débito é o instrumento principal — devolve por PIX/TED, não por estorno).\n" +
      "FORA DO PRAZO — contrato 16/07/2026, prazo arrependimento venceu 23/07/2026 (há ~50 dias).\n" +
      "Vendedora: GAV Gramado Três Empreendimento Imobiliário SPE Ltda (CNPJ 50.094.155/0001-02). Proposta nº 348446.\n" +
      "Assinatura em Ipojuca-PE, 16/07/2026 (cliente é de Campina Grande/PB, resort é em Gramado/RS). ZapSign ID: 2b635ca8-c72a-449f-84a7-996f74048cb8.\n" +
      "ATENÇÃO email: quadro-resumo mostra 'www@www.com.br' (obviamente errado). Email real da proposta: sthefanny-kelly@live.com. Cadastrei o real.\n" +
      "Solteira, 26 anos (nasc 17/03/2000). Cônjuge não se aplica.\n" +
      "1 semana/ano de utilização. Fração ideal 0,0106837606838%. Área 126,33m² (privativa 86,2 + comum 40,13). 2 quartos.\n" +
      "Empreendimento em construção (obras previstas julho/2027).\n" +
      "End cliente: Rua Manoel Martins de Oliveira, 93, Bairro Serrotão, Campina Grande/PB, CEP 58434073."
  },

  // ── Ficha 160 ── Sandra Aparecida Rodrigues Santos — Kawana Residence ──
  {
    id: 160,
    nome: "Sandra Aparecida Rodrigues Santos",
    cpf: "053.915.058-44",
    rg: "16707595 - SSP/SP",
    nascimento: "1964-08-04",
    estadoCivil: "Viúvo",
    profissao: "Contador",
    empresa: "WAM",
    empreendimento: "Kawana Residence",
    cidade: "Caldas Novas/GO",
    bloco: "01",
    unidade: "507",
    andar: "",
    cota: "D/F",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 67824.92,
    precoIntermediacao: 10200.00,
    precoTotal: 78024.92,
    valorPago: 10200.00,
    entradas: [
      { descricao: "Cartão de débito VISA intermediação (1x R$ 1.000)", valor: 1000.00 },
      { descricao: "Cartão de crédito VISA intermediação (1x R$ 9.200)", valor: 9200.00 }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 1.000 VISA débito + 1x R$ 9.200 VISA crédito | Preço: 1x R$ 50 boleto (1ª 15/10/2026) + 84x R$ 806,84 boleto (1ª 20/11/2026)",
    formaReembolso: "Reembolso + Estorno",
    dataAssinatura: "2026-09-11",
    telefone: "(11) 99928-2053",
    email: "ars.sandra@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/160-sandra-aparecida-kawana-residence-bl01-507-cota-df--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 10.200 — R$ 1.000 débito VISA + R$ 9.200 crédito VISA (integral da intermediação).\n" +
      "PAGAMENTO MISTO — Reembolso R$ 1.000 (via PIX/TED do valor do débito) + Estorno R$ 9.200 (no cartão de crédito VISA utilizado).\n" +
      "Intermediação total: R$ 10.200 (devida a WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Preço cota (sem intermediação): R$ 67.824,92. 1x R$ 50 boleto (1ª 15/10/2026) + 84x R$ 806,84 boleto (1ª 20/11/2026) — nenhum vencido ainda.\n" +
      "DENTRO DO PRAZO — contrato 11/09/2026 (HOJE), prazo arrependimento vence 18/09/2026 (7 dias inteiros).\n" +
      "4 semanas/ano de utilização (mais que os típicos 2 do Kawana). Habite-se PREVISTO para 31/12/2027 — empreendimento em construção.\n" +
      "Vendedora: S.P.E. Mirante Investimento Imobiliários S/A (CNPJ 18.622.215/0001-00), Caldas Novas/GO.\n" +
      "Contrato nº 315136. GSign Document ID: 56T5RMKO5W-SH7VQZW-O3POVEDJGS4QVA-PJFG9.\n" +
      "ATENÇÃO: contrato indica que NÃO conheceu o Empreendimento pessoalmente (opção 'Não' marcada) — fortalece direito de arrependimento fora de estande.\n" +
      "Viúva, 62 anos. Sem cônjuge.\n" +
      "Testemunhas: Wanderson Santos da Silveira, Yasmin Lorrane Silva Gomes (CPF 058.624.011-05)."
  },

  // ── Ficha 161 ── Erik Amador Silva Nobre + Nagyla Sofia — Ondas Praia Resort ──
  {
    id: 161,
    nome: "Erik Amador Silva Nobre",
    cpf: "118.077.916-96",
    rg: "MG18205053 - SSP/MG",
    nascimento: "1994-06-13",
    estadoCivil: "Casado",
    profissao: "Analista de Rede",
    empresa: "WAM",
    empreendimento: "Ondas Praia Resort",
    cidade: "Porto Seguro/BA",
    bloco: "C",
    unidade: "C242",
    andar: "",
    cota: "05",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 62663.17,
    precoIntermediacao: 5100.00,
    precoTotal: 67763.17,
    valorPago: 510.00,
    entradas: [
      { descricao: "Depósito bancário/Transferência intermediação (1x R$ 510)", valor: 510.00 }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 510 depósito/transferência + 2x R$ 2.295 boleto W Palmerston | Preço: 2x R$ 50 boleto (1ª 10/10/2026) + 96x R$ 651,70 boleto (1ª 20/12/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-04",
    telefone: "(38) 99905-8705",
    email: "eriknetsys@gmail.com",
    conjuge: {
      nome: "Nagyla Sofia Santos Barbosa",
      cpf: "114.434.396-81",
      rg: "MG17673511 - SSP/MG"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/161-erik-amador-ondas-praia-resort-blC-C242-cota05--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 510 (só o depósito bancário / transferência inicial). CONFIRMAR se os 2 boletos de R$ 2.295 (intermediação, W Palmerston) e boletos de preço foram pagos.\n" +
      "Boletos intermediação: 2x R$ 2.295 via W Palmerston — vencimentos NÃO informados no contrato (típico WAM Palmerston).\n" +
      "Boletos preço: 2x R$ 50 (1ª 10/10/2026) + 96x R$ 651,70 (1ª 20/12/2026) — nenhum vencido ainda.\n" +
      "Intermediação total: R$ 5.100 (devida a WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "ÚLTIMO DIA DO PRAZO — contrato 04/09/2026, prazo arrependimento vence HOJE (11/09/2026).\n" +
      "2 semanas/ano de utilização. Habite-se: 00046/2021 a 00611/2021 (a partir de 02/03/2021) — empreendimento ENTREGUE.\n" +
      "Vendedora: SPE Porto Seguro 02 Empreendimentos Imobiliários S.A. (CNPJ 22.059.167/0001-60). End vendedora: Av Deputado Jamel Cecílio, 2690, Goiânia/GO.\n" +
      "Contrato nº 314178. GSign Document ID: 5RE3ZEGNF0-U1QNLI3-KGN5SAEJRYZS4I-VESB1.\n" +
      "ATENÇÃO: contrato indica que NÃO conheceu o Empreendimento pessoalmente (opção 'Não' marcada) — fortalece direito de arrependimento fora de estande.\n" +
      "Regime de bens: Comunhão Parcial. Cônjuge Nagyla Sofia: nasc 20/11/1992, do lar, tel (38) 99969-5148, e-mail nagylasofia26@gmail.com.\n" +
      "Testemunhas: Noendell Leonnardo Coelho Barreto, Yasmin Lorrane Silva Gomes (CPF 058.624.011-05).\n" +
      "PDF veio duplicado do WhatsApp — foi arquivado apenas 1x."
  },

  // ── Ficha 162 ── Catia Cristina Araujo dos Santos — Areya Barra Resort ──
  {
    id: 162,
    nome: "Catia Cristina Araujo dos Santos",
    cpf: "629.510.095-34",
    rg: "424406969 - SSP/BA",
    nascimento: "1973-11-03",
    estadoCivil: "Casado",
    profissao: "Autônomo(a)",
    empresa: "GAV",
    empreendimento: "Areya Barra Resort",
    cidade: "Barra de São Miguel/AL",
    bloco: "01",
    unidade: "316",
    andar: "3",
    cota: "18",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 46854.80,
    precoIntermediacao: 3990.00,
    precoTotal: 50844.80,
    valorPago: 6403.36,
    entradas: [
      { descricao: "Cartão crédito parcelado Master corretagem (4x R$ 997,50, CV 25818244, Rede)", valor: 3990.00 },
      { descricao: "Boletos sinal pagos (5x, venc 15/04 a 15/08/2026, reajustados INCC)", valor: 2413.36 }
    ],
    formaPagamentoEntrada: "Corretagem: 4x R$ 997,50 cartão crédito parcelado Master (Rede, CV 25818244, 1ª venc 28/12/2025) | Sinal: 5x boleto (R$ 468,55 + R$ 479,52 + R$ 484,32 + R$ 488,58 + R$ 492,39 = R$ 2.413,36, venc 15/04 a 15/08/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2025-11-28",
    telefone: "(71) 98895-2811",
    email: "jel_cal@hotmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/162-catia-cristina-santos-areya-barra-resort-bl01-316-cota18--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 6.403,36 — cartão crédito corretagem R$ 3.990 + 5 boletos sinal R$ 2.413,36 (reajustados INCC: R$ 468,55 + R$ 479,52 + R$ 484,32 + R$ 488,58 + R$ 492,39).\n" +
      "Boletos sinal confirmados pagos pelo cliente (15/04 a 15/08/2026). Valor nominal era 5x R$ 468,55 = R$ 2.342,75 mas com reajuste INCC totalizou R$ 2.413,36.\n" +
      "Corretagem total: R$ 3.990. Beneficiários: Elias Moises da Silva Junior, Jose Lucas Paixao de Arruda, Sulamita Leal.\n" +
      "Preço fração de tempo: R$ 46.854,80. Saldo R$ 40.522,05 em 85x R$ 476,73 boleto (1ª 15/09/2026).\n" +
      "FORA DO PRAZO — contrato 28/11/2025, prazo arrependimento venceu 05/12/2025 (há ~9 meses e meio).\n" +
      "Vendedora: GAV Barra de São Miguel Empreendimento Imobiliário SPE Ltda (CNPJ 45.298.124/0001-33). Proposta nº 302935.\n" +
      "Assinatura em Ipojuca-PE, 28/11/2025. D4Sign ID: 3a34045b-e704-48b3-87bf-f7e8de61342c (contrato ANTIGO via D4Sign, não ZapSign como os recentes GAV).\n" +
      "Cônjuge não informado no contrato (Estado Civil: Casado, mas dados do cônjuge em branco).\n" +
      "2 semanas/ano de utilização. Fração ideal 0,0103058394990%. Área 73,72m² (privativa 34,01 + comum 39,71). 1 quarto.\n" +
      "Empreendimento em construção (previsão conclusão dez/2027).\n" +
      "End cliente: Rua Cacilda da Silva Santos, 94 Casa 3, Bairro Ipitanga, Lauro de Freitas/BA, CEP 42706270."
  },

  // ── Ficha 163 ── José Alfredo Baccoli Vieira — Areya Barra Resort (INCOMPLETA — só ficha de negociação, sem contrato) ──
  {
    id: 163,
    nome: "José Alfredo Baccoli Vieira",
    cpf: "137.863.336-96",
    rg: "",
    nascimento: "",
    estadoCivil: "",
    profissao: "",
    empresa: "GAV",
    empreendimento: "Areya Barra Resort",
    cidade: "Barra de São Miguel/AL",
    bloco: "01",
    unidade: "140",
    andar: "",
    cota: "06",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 52058.04,
    precoIntermediacao: 0,
    precoTotal: 52058.04,
    valorPago: 1000.00,
    entradas: [
      { descricao: "Cartão de débito entrada (1x R$ 1.000, venc 10/09/2026)", valor: 1000.00 }
    ],
    formaPagamentoEntrada: "Entrada: 1x R$ 1.000 cartão débito (10/09/2026) + 4x R$ 747,50 boleto (1ª 09/10/2026) | Sinal: 3x R$ 650,72 boleto (1ª 10/02/2027) + 1x R$ 650,74 boleto (10/05/2027) | Saldo: 74x R$ 614,39 boleto (1ª 10/06/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-09",
    telefone: "",
    email: "",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Termo de Negociação (Ficha de Cota)", arquivo: "contratos-pdf/163-jose-alfredo-baccoli-vieira-areya-barra-bl01-140-cota06--termo-negociacao.pdf" },
      { titulo: "Termo de Ciência (Checklist)", arquivo: "contratos-pdf/163-jose-alfredo-baccoli-vieira-areya-barra-bl01-140-cota06--termo-ciencia.pdf" }
    ],
    pix: "",
    observacoes:
      "FICHA INCOMPLETA — cadastrada a partir do TERMO DE CIÊNCIA + FICHA DE NEGOCIAÇÃO DE COTA, não do contrato oficial (semelhante à ficha 48/Carolina). AGUARDANDO CONTRATO OFICIAL para completar: RG, nascimento, estado civil, profissão, telefone, e-mail, endereço, razão social e CNPJ da vendedora, cônjuge.\n" +
      "VALOR PAGO = R$ 1.000 (só o cartão débito da entrada, venc 10/09/2026 — provavelmente já cobrado).\n" +
      "Preço total da cota: R$ 52.058,04. Estrutura:\n" +
      "  - Entrada: R$ 1.000 (débito) + R$ 2.990 (4 boletos de R$ 747,50, 1ª venc 09/10/2026)\n" +
      "  - Sinal: R$ 1.952,16 (3 boletos de R$ 650,72, 1ª venc 10/02/2027) + R$ 650,74 (1 boleto, venc 10/05/2027)\n" +
      "  - Saldo: R$ 45.464,86 (74 boletos de R$ 614,39, 1ª venc 10/06/2027)\n" +
      "DENTRO DO PRAZO — Termo de Ciência assinado 09/09/2026 (validação facial + assinatura digital). Ficha de negociação data 12/09/2026 (data do relatório).\n" +
      "Se o contrato oficial usar 09/09 como data-base, prazo arrependimento vence 16/09/2026. Se usar 12/09, vence 19/09. Em qualquer caso ainda DENTRO do prazo.\n" +
      "Empreendimento: Areya Barra Resort - Blocos, Bloco 01 / Apto 140 / Cota 06. Vista: Telhado - Praia. Modalidade: Padrão.\n" +
      "Sala: PORTO DE GALINHAS - NOITE. Consultor: Claudio Cesar Barbosa da Silva Melo.\n" +
      "Vendedora: presumivelmente GAV Barra de São Miguel Empreendimento Imobiliário SPE Ltda (CNPJ 45.298.124/0001-33) — CONFIRMAR quando chegar contrato.\n" +
      "Administração: GAV Administração Hoteleira (GFP Gestão Empresarial Ltda).\n" +
      "IP validação facial: 104.28.63.108 (09/09/2026 23:37:33). Foto e assinatura digital estão no PDF."
  },

  // ── Ficha 164 ── Rafael Caillet Guibor — Jeriquiá Dunas Resort ──
  {
    id: 164,
    nome: "Rafael Caillet Guibor",
    cpf: "041.437.579-31",
    rg: "79937118 - SESP/PR",
    nascimento: "1983-11-18",
    estadoCivil: "Casado",
    profissao: "Empresário",
    empresa: "GAV",
    empreendimento: "Jeriquiá Dunas Resort",
    cidade: "Cruz/CE",
    bloco: "02",
    unidade: "003",
    andar: "0",
    cota: "47",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 29164.21,
    precoIntermediacao: 3990.00,
    precoTotal: 33154.21,
    valorPago: 1330.00,
    entradas: [
      { descricao: "Cartão crédito à vista Master corretagem (CV 36941558, Rede)", valor: 1330.00 }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.330 cartão crédito à vista Master (Rede, CV 36941558, venc 08/07/2026) + 2x R$ 1.330 boleto (1ª 08/08/2026)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-06-08",
    telefone: "(41) 99156-1938",
    email: "raguibor@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/164-rafael-caillet-guibor-jeriquia-dunas-resort-bl02-003-cota47--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.330 (cartão crédito à vista Master, valor cheio). CONFIRMAR se os 2 boletos R$ 1.330 (venc 08/08 e 08/09/2026, ambos vencidos hoje 11/09) foram pagos. Se sim: valorPago sobe pra R$ 3.990 e forma vira 'Reembolso + Estorno' (R$ 1.330 estorno + R$ 2.660 reembolso via PIX/TED).\n" +
      "Corretagem total: R$ 3.990. Beneficiários: Daniele Laura dos Santos Soares, Paulo Henrique Almeida da Silva, Jairo Fraga de Assis Neto Ltda, Natalia Goncalves da Silva Col.\n" +
      "Preço fração de tempo: R$ 29.164,21. Sinal negócio R$ 1.458,21 + 4x R$ 364,55 boleto (1ª 10/10/2026, não vencido). Saldo R$ 23.716,00 + 80x R$ 296,45 boleto (1ª 10/02/2027).\n" +
      "FORA DO PRAZO — contrato 08/06/2026, prazo arrependimento venceu 15/06/2026 (há ~3 meses).\n" +
      "Vendedora: JERI-2 Empreendimento Imobiliário SPE Ltda (CNPJ 33.598.849/0001-68). Proposta nº 342203.\n" +
      "Assinatura em Gramado-RS, 08/06/2026. D4Sign ID: 8fdea55c-2645-4086-a14e-6a2fb838aa31.\n" +
      "Cônjuge não informado no contrato (Estado Civil: Casado, mas dados do cônjuge em branco).\n" +
      "1 semana/ano de utilização. Fração ideal 0,0054448946421%. Área 98,07m² (privativa 35,29 + comum 62,78). 1 quarto.\n" +
      "Empreendimento em LANÇAMENTO (lançamento previsto nov/2025, obras nov/2029 — MUITO longe). Alvará 057/2019.\n" +
      "MESMO CLIENTE tem outro contrato — ficha 165 (Gran Garden Resort). 2 contratos assinados no mesmo dia (08/06/2026) em Gramado-RS.\n" +
      "End cliente: Rua Manoel de Souza Dias Negrao, S/N, Bairro Boa Vista, Curitiba/PR, CEP 82540070."
  },

  // ── Ficha 165 ── Rafael Caillet Guibor — Gran Garden Resort ──
  {
    id: 165,
    nome: "Rafael Caillet Guibor",
    cpf: "041.437.579-31",
    rg: "79937118 - SESP/PR",
    nascimento: "1983-11-18",
    estadoCivil: "Casado",
    profissao: "Empresário",
    empresa: "GAV",
    empreendimento: "Gran Garden Resort",
    cidade: "Gramado/RS",
    bloco: "A2",
    unidade: "103",
    andar: "1",
    cota: "25",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 75034.83,
    precoIntermediacao: 4490.00,
    precoTotal: 79524.83,
    valorPago: 1500.00,
    entradas: [
      { descricao: "Cartão crédito à vista Master corretagem (CV 188991408, Rede)", valor: 1500.00 }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.500 cartão crédito à vista Master (Rede, CV 188991408, venc 08/07/2026) + 2x R$ 1.495 boleto (1ª 08/08/2026)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-06-08",
    telefone: "(41) 99156-1938",
    email: "raguibor@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/165-rafael-caillet-guibor-gran-garden-resort-blA2-103-cota25--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.500 (cartão crédito à vista Master, valor cheio). CONFIRMAR se os 2 boletos R$ 1.495 (venc 08/08 e 08/09/2026, ambos vencidos hoje 11/09) foram pagos. Se sim: valorPago sobe pra R$ 4.490 e forma vira 'Reembolso + Estorno' (R$ 1.500 estorno + R$ 2.990 reembolso via PIX/TED).\n" +
      "Corretagem total: R$ 4.490 (mais alta que outros GAV, geralmente R$ 3.990). Beneficiários: Daniele Laura dos Santos Soares, Paulo Henrique Almeida da Silva, Jairo Fraga de Assis Neto Ltda, Natalia Goncalves da Silva Col.\n" +
      "Preço fração de tempo: R$ 75.034,83. Sinal negócio R$ 3.751,74 + 5x R$ 750,35 boleto (1ª 10/10/2026, não vencido). Saldo R$ 66.793,09 + 91x R$ 733,99 boleto (1ª 10/03/2027).\n" +
      "FORA DO PRAZO — contrato 08/06/2026, prazo arrependimento venceu 15/06/2026 (há ~3 meses).\n" +
      "Vendedora: GAV Gramado Três Empreendimento Imobiliário SPE Ltda (CNPJ 50.094.155/0001-02). Proposta nº 342202.\n" +
      "Assinatura em Gramado-RS, 08/06/2026. D4Sign ID: ecf47743-a36b-493b-b6e6-03ef16d0f76b.\n" +
      "ATENÇÃO email: quadro-resumo mostra 'www@www.com.br' (obviamente errado). Email real da proposta: raguibor@gmail.com. Cadastrei o real.\n" +
      "Cônjuge não informado no contrato (Estado Civil: Casado, mas dados do cônjuge em branco).\n" +
      "1 semana/ano de utilização. Fração ideal 0,0106837606838%. Área 126,33m² (privativa 86,2 + comum 40,13). 2 quartos.\n" +
      "Empreendimento em construção (obras previstas julho/2027).\n" +
      "MESMO CLIENTE tem outro contrato — ficha 164 (Jeriquiá Dunas Resort). 2 contratos assinados no mesmo dia (08/06/2026) em Gramado-RS.\n" +
      "End cliente: Rua Manoel de Souza Dias Negrao, S/N, Bairro Boa Vista, Curitiba/PR, CEP 82540070."
  },

  // ── Ficha 166 ── Angela Maria Aparecida Boatto — Kawana Residence ──
  {
    id: 166,
    nome: "Angela Maria Aparecida Boatto",
    cpf: "051.103.928-03",
    rg: "12907630 - SSP/SP",
    nascimento: "1961-06-22",
    estadoCivil: "Viúvo",
    profissao: "Corretor de Seguros",
    empresa: "WAM",
    empreendimento: "Kawana Residence",
    cidade: "Caldas Novas/GO",
    bloco: "01",
    unidade: "506",
    andar: "",
    cota: "D/A",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 67824.92,
    precoIntermediacao: 10200.00,
    precoTotal: 78024.92,
    valorPago: 10200.00,
    entradas: [
      { descricao: "Cartão de débito Master intermediação (1x R$ 1.000)", valor: 1000.00 },
      { descricao: "Cartão de crédito Master intermediação (1x R$ 9.200)", valor: 9200.00 }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 1.000 Master débito + 1x R$ 9.200 Master crédito | Preço: 1x R$ 50 boleto (1ª 15/10/2026) + 84x R$ 806,84 boleto (1ª 20/11/2026)",
    formaReembolso: "Reembolso + Estorno",
    dataAssinatura: "2026-09-11",
    telefone: "(31) 99426-9635",
    email: "sbcorretoraseguros@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/166-angela-maria-boatto-kawana-residence-bl01-506-cota-da--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 10.200 — R$ 1.000 débito Master + R$ 9.200 crédito Master (integral da intermediação).\n" +
      "PAGAMENTO MISTO — Reembolso R$ 1.000 (via PIX/TED do valor do débito) + Estorno R$ 9.200 (no cartão de crédito Master utilizado).\n" +
      "Intermediação total: R$ 10.200 (devida a WAM Comercialização S.A., CNPJ 17.919.649/0001-03).\n" +
      "Preço cota (sem intermediação): R$ 67.824,92. 1x R$ 50 boleto (1ª 15/10/2026) + 84x R$ 806,84 boleto (1ª 20/11/2026) — nenhum vencido ainda.\n" +
      "DENTRO DO PRAZO — contrato 11/09/2026 (HOJE), prazo arrependimento vence 18/09/2026 (7 dias inteiros).\n" +
      "4 semanas/ano de utilização (dobro do padrão do Kawana). Habite-se PREVISTO para 31/12/2027 — empreendimento em construção.\n" +
      "Vendedora: S.P.E. Mirante Investimento Imobiliários S/A (CNPJ 18.622.215/0001-00), Caldas Novas/GO.\n" +
      "Contrato nº 315117. GSign Document ID: DV12L9HCZ2-05F4FWF-82P8KP6C6QCJFS-TBE02.\n" +
      "ATENÇÃO: contrato indica que NÃO conheceu o Empreendimento pessoalmente (opção 'Não' marcada) — fortalece direito de arrependimento fora de estande.\n" +
      "Viúva, 65 anos. Sem cônjuge. Profissão: Corretora de Seguros (SB Corretora Seguros).\n" +
      "PADRÃO IDÊNTICO À FICHA 160 (Sandra Aparecida): ambas viúvas, Kawana Residence, 4 semanas/ano, mesmas condições financeiras, mesmas testemunhas, ambas assinadas HOJE 11/09/2026. Provavelmente venda do mesmo dia/campanha (Sandra Bloco 01/507/D/F, Angela Bloco 01/506/D/A).\n" +
      "Testemunhas: Wanderson Santos da Silveira, Yasmin Lorrane Silva Gomes (CPF 058.624.011-05)."
  },

  // ── Ficha 167 ── Gislaine Cristina dos Santos Vertelo — Praias do Lago (DISTRATO JÁ ASSINADO) ──
  {
    id: 167,
    nome: "Gislaine Cristina dos Santos Vertelo",
    cpf: "018.021.566-31",
    rg: "MG16778894 - SSP/MG",
    nascimento: "",
    estadoCivil: "Solteiro",
    profissao: "",
    empresa: "WAM",
    empreendimento: "Praias do Lago Eco Resort",
    cidade: "Caldas Novas/GO",
    bloco: "",
    unidade: "M-203/06 e O-206/07",
    andar: "",
    cota: "",
    fracao: "1/18",
    checkIn: "",
    checkOut: "",
    precoCota: 0,
    precoIntermediacao: 0,
    precoTotal: 0,
    valorPago: 12400.00,
    entradas: [
      { descricao: "Valor a devolver (conforme termo de distrato assinado)", valor: 12400.00 }
    ],
    formaPagamentoEntrada: "Não temos o contrato original — dados de pagamento não disponíveis",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-07-27",
    telefone: "",
    email: "",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Termo de Distrato Assinado", arquivo: "contratos-pdf/167-gislaine-cristina-vertelo-praias-do-lago--distrato-assinado.pdf" }
    ],
    pix: "Bradesco Ag 2520 Conta 10102987 Poupança - Gislaine Cristina dos Santos Vertelo (CPF 018.021.566-31)",
    observacoes:
      "CASO ESPECIAL — DISTRATO JÁ ASSINADO em 27/07/2026 (Caldas Novas). NÃO temos o contrato de compra e venda original arquivado.\n" +
      "VALOR A DEVOLVER = R$ 12.400,00 (via Reembolso, marcado (X) no termo).\n" +
      "Praias do Lago Eco Resort — WAM Comercialização S/A - Caldas Novas.\n" +
      "Apartamentos M-203/06 e O-206/07 (dois apartamentos), fração de 1/18 (atípico — geralmente 1/52 nas fichas). Provavelmente contrato mais antigo com modelo diferente.\n" +
      "Prazo do reembolso: 30 dias úteis a partir da data de recebimento do termo assinado (27/07/2026) → prazo estimado até ~ meados de setembro/2026.\n" +
      "DADOS BANCÁRIOS PARA REEMBOLSO:\n" +
      "  · Banco: Bradesco\n" +
      "  · Agência: 2520\n" +
      "  · Conta: 10102987 Poupança\n" +
      "  · Titular: Gislaine Cristina dos Santos Vertelo (CPF 018.021.566-31)\n" +
      "GSign Document ID: K0OSMXQS49-JLA4MYC-UI5WYY7NDDI718-EUZN5.\n" +
      "FALTAM: nascimento, profissão, telefone, e-mail, endereço. Se precisar completar, buscar no contrato original ou pedir ao cliente."
  },

  // ── Ficha 168 ── Wanderson de Mendonça Custódio — Kawana Residence Bl 02/405/Cota P/G (INCOMPLETA — só contrato de cessão Kawana Park) ──
  {
    id: 168,
    nome: "Wanderson de Mendonça Custódio",
    cpf: "992.602.121-20",
    rg: "4072416 - DGPC/GO",
    nascimento: "1983-05-13",
    estadoCivil: "Solteiro",
    profissao: "Outra",
    empresa: "WAM",
    empreendimento: "Kawana Residence",
    cidade: "Caldas Novas/GO",
    bloco: "02",
    unidade: "405",
    andar: "",
    cota: "P/G",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 0,
    precoIntermediacao: 0,
    precoTotal: 0,
    valorPago: 0,
    entradas: [],
    formaPagamentoEntrada: "NÃO temos o contrato principal — dados de pagamento não disponíveis",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-07",
    telefone: "(62) 98235-9776",
    email: "wandersongo@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato de Cessão Kawana Park", arquivo: "contratos-pdf/168-wanderson-mendonca-kawana-residence-bl02-405-cotapg--contrato-cessao-kawana-park.pdf" }
    ],
    pix: "",
    observacoes:
      "FICHA INCOMPLETA — cadastrada a partir do CONTRATO DE CESSÃO DE DIREITOS DE UTILIZAÇÃO DO KAWANA PARK (contrato ACESSÓRIO), não do contrato principal de compra da cota. AGUARDANDO CONTRATO PRINCIPAL para completar: preço da cota, intermediação, valorPago, forma de pagamento.\n" +
      "Este contrato dá direito de acesso ao parque aquático Kawana Park por 3 anos, VINCULADO à aquisição da cota. Cessante: TALLIN SPE LTDA (CNPJ 54.272.360/0001-71), Barueri/SP.\n" +
      "Empreendimento: Kawana Residence, Caldas Novas/GO. Bloco 02 / Apto 405 / Cota P/G.\n" +
      "Data assinatura: 07/09/2026 em Caldas Novas. GSign Doc ID: O9SC8MSJYQ-ATHY46H-YQD83AVUYHN5AX-P3TCZ.\n" +
      "Prazo arrependimento (do contrato principal): dependerá da data do contrato principal, mas se assinado hoje (07/09), venceria 14/09/2026.\n" +
      "MESMO CLIENTE tem outra cota — ficha 169 (Bloco 03 / 405 / Cota B/B2). 2 cotas assinadas no mesmo dia (07/09/2026).\n" +
      "Vendedora presumida (do contrato principal): S.P.E. Mirante Investimento Imobiliários S/A (CNPJ 18.622.215/0001-00) — mesma vendedora das outras cotas Kawana.\n" +
      "End cliente: Rua Santarém, S/N, Parque Amazônia, Goiânia/GO, CEP 74835170. Sexo Masculino."
  },

  // ── Ficha 169 ── Wanderson de Mendonça Custódio — Kawana Residence Bl 03/405/Cota B/B2 (INCOMPLETA — só contrato de cessão Kawana Park) ──
  {
    id: 169,
    nome: "Wanderson de Mendonça Custódio",
    cpf: "992.602.121-20",
    rg: "4072416 - DGPC/GO",
    nascimento: "1983-05-13",
    estadoCivil: "Solteiro",
    profissao: "Outra",
    empresa: "WAM",
    empreendimento: "Kawana Residence",
    cidade: "Caldas Novas/GO",
    bloco: "03",
    unidade: "405",
    andar: "",
    cota: "B/B2",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 0,
    precoIntermediacao: 0,
    precoTotal: 0,
    valorPago: 0,
    entradas: [],
    formaPagamentoEntrada: "NÃO temos o contrato principal — dados de pagamento não disponíveis",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-07",
    telefone: "(62) 98235-9776",
    email: "wandersongo@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato de Cessão Kawana Park", arquivo: "contratos-pdf/169-wanderson-mendonca-kawana-residence-bl03-405-cotabb2--contrato-cessao-kawana-park.pdf" }
    ],
    pix: "",
    observacoes:
      "FICHA INCOMPLETA — cadastrada a partir do CONTRATO DE CESSÃO DE DIREITOS DE UTILIZAÇÃO DO KAWANA PARK (contrato ACESSÓRIO), não do contrato principal de compra da cota. AGUARDANDO CONTRATO PRINCIPAL para completar: preço da cota, intermediação, valorPago, forma de pagamento.\n" +
      "Este contrato dá direito de acesso ao parque aquático Kawana Park por 3 anos, VINCULADO à aquisição da cota. Cessante: TALLIN SPE LTDA (CNPJ 54.272.360/0001-71), Barueri/SP.\n" +
      "Empreendimento: Kawana Residence, Caldas Novas/GO. Bloco 03 / Apto 405 / Cota B/B2.\n" +
      "Data assinatura: 07/09/2026 em Caldas Novas. GSign Doc ID: PIRNWZA9KX-DSVKTWP-9WUQD86BT80AG6-DZS2D.\n" +
      "Prazo arrependimento (do contrato principal): dependerá da data do contrato principal, mas se assinado hoje (07/09), venceria 14/09/2026.\n" +
      "MESMO CLIENTE tem outra cota — ficha 168 (Bloco 02 / 405 / Cota P/G). 2 cotas assinadas no mesmo dia (07/09/2026).\n" +
      "Vendedora presumida (do contrato principal): S.P.E. Mirante Investimento Imobiliários S/A (CNPJ 18.622.215/0001-00) — mesma vendedora das outras cotas Kawana.\n" +
      "End cliente: Rua Santarém, S/N, Parque Amazônia, Goiânia/GO, CEP 74835170. Sexo Masculino."
  },

  // ── Ficha 157 ── Adryelle Delgado Viana — Beach GAV Resorts (movida pro final — distrato assinado 11/09/2026) ──
  {
    id: 157,
    nome: "Adryelle Delgado Viana",
    cpf: "022.238.352-60",
    rg: "000763219 - COREN/PA",
    nascimento: "1999-11-06",
    estadoCivil: "União Estável",
    profissao: "Enfermeira",
    empresa: "GAV",
    empreendimento: "Beach GAV Resorts",
    cidade: "Salinópolis/PA",
    bloco: "2",
    unidade: "0803",
    andar: "8",
    cota: "16",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 44554.76,
    precoIntermediacao: 3990.00,
    precoTotal: 48544.76,
    valorPago: 3990.00,
    entradas: [
      { descricao: "PIX corretagem (1x R$ 1.330, doc E228964312026...HS2C, 26/07/2026)", valor: 1330.00 },
      { descricao: "2 boletos corretagem vencidos (R$ 1.330 cada, 10/08/2026 e 10/09/2026)", valor: 2660.00 }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 1.330 PIX (26/07/2026) + 2x R$ 1.330 boleto (10/08 e 10/09/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-07-26",
    telefone: "(91) 99299-4995",
    email: "adryellevianaa@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/157-adryelle-delgado-viana-beach-gav-resorts-bl2-0803-cota16--contrato.pdf" },
      { titulo: "Distrato Assinado 11/09/2026", arquivo: "contratos-pdf/157-adryelle-delgado-viana-beach-gav-resorts-bl2-0803-cota16--distrato-assinado.pdf" }
    ],
    pix: "adryellevianaa@gmail.com",
    observacoes:
      "DISTRATO ASSINADO 11/09/2026 via gov.br (assinatura digital). Chave PIX para reembolso: adryellevianaa@gmail.com. Valor confirmado R$ 3.990 (Reembolso marcado no termo).\n" +
      "VALOR PAGO = R$ 3.990 (CONFIRMADO no distrato — integral da corretagem). PIX R$ 1.330 (26/07/2026) + 2 boletos R$ 1.330 (venc 10/08/2026 e 10/09/2026).\n" +
      "Corretagem total: R$ 3.990. Beneficiários: 52.710.385 Janaina de Souza da, Lucas Emiliano, 61.579.420 Anthony Ferreira MA.\n" +
      "Preço fração de tempo: R$ 44.554,76. Sinal negócio R$ 2.227,72 + 4x R$ 556,93 boleto (1ª 10/10/2026, NÃO vencido). Saldo R$ 38.337,04 + 68x R$ 563,78 boleto (1ª 10/02/2027).\n" +
      "FORA DO PRAZO — contrato 26/07/2026, prazo arrependimento venceu 02/08/2026 (há ~40 dias).\n" +
      "Vendedora: Beach GAV Resorts Empreendimentos Imobiliários SPE Ltda (CNPJ 33.531.685/0001-51). Proposta nº 351279.\n" +
      "Assinatura em Jijoca de Jericoacoara-CE, 26/07/2026. ZapSign ID: fe805cec-226d-4f8f-9307-b116a5b0c0cf.\n" +
      "Cônjuge não informado no contrato (Estado Civil: União Estável, mas dados do cônjuge em branco).\n" +
      "2 semanas/ano de utilização. Fração ideal 0,0048562548563%. Área 61,268m² (privativa 30 + comum 31,268). 1 quarto.\n" +
      "Empreendimento em construção (obras previstas até julho/2026 + tolerância 180 dias).\n" +
      "End cliente: Av Conselheiro Furtado, 2693, Bairro Cremacao, Belém/PA, CEP 66063060."
  },

  // ── Ficha 170 ── Raimundo Gerson Ferreira Lobato — Beach GAV Resorts Bl 01/1116/Cota 21 ──
  {
    id: 170,
    nome: "Raimundo Gerson Ferreira Lobato",
    cpf: "620.584.102-97",
    rg: "2413027 - PC/PA",
    nascimento: "1975-10-31",
    estadoCivil: "União Estável",
    profissao: "Empresário",
    empresa: "GAV",
    empreendimento: "Beach GAV Resorts",
    cidade: "Salinópolis/PA",
    bloco: "01",
    unidade: "1116",
    andar: "11",
    cota: "21",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 47227.55,
    precoIntermediacao: 3990.00,
    precoTotal: 51217.55,
    valorPago: 3990.00,
    entradas: [
      { descricao: "Cartão crédito Master parcelado corretagem (3x R$ 1.330, CV 21154664, Rede)", valor: 3990.00 }
    ],
    formaPagamentoEntrada: "Corretagem: 3x R$ 1.330 cartão crédito Master parcelado (1ª 06/10/2026) | Sinal: R$ 2.361,39 em 4x R$ 590,35 boleto (1ª 10/10/2026) | Saldo: R$ 40.876,16 em 68x R$ 601,12 boleto (1ª 10/02/2027)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-06",
    telefone: "(91) 98815-3680",
    email: "marcenariamonte1sinai@gmail.com",
    conjuge: {
      nome: "Ana Celia Silva Moreira",
      cpf: "454.239.892-72",
      rg: "2410792 - SSP/PA"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/170-raimundo-gerson-beach-gav-resorts-bl01-1116-cota21--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990 (cartão crédito Master parcelado, valor cheio — 3x R$ 1.330). Somente corretagem paga.\n" +
      "Boletos sinal (4x R$ 590,35, 1ª 10/10/2026) e saldo (68x R$ 601,12, 1ª 10/02/2027) NÃO vencidos ainda.\n" +
      "Corretagem R$ 3.990 (3 parcelas). Beneficiários: Jose Luis Nobre Coelho (50627278000161), Adao Junior (39757212000153), Renata Pimenta Duarte (21192671000171).\n" +
      "Preço fração de tempo: R$ 47.227,55. Sinal R$ 2.361,39 (4x R$ 590,35 boleto). Saldo R$ 40.876,16 (68x R$ 601,12 boleto).\n" +
      "FORA DO PRAZO — contrato 06/09/2026, prazo arrependimento venceu 13/09/2026 (1 dia atrás).\n" +
      "Proposta nº 358630. ZapSign ID: e7825500-39eb-4903-8df9-3238c32f5d69.\n" +
      "Vendedora: Beach GAV Resorts Empreendimentos Imobiliários SPE Ltda (CNPJ 33.531.685/0001-51).\n" +
      "Empreendimento em construção — obras civis previstas julho/2026 + tolerância 180 dias.\n" +
      "2 semanas/ano. Fração ideal 0,0048562548563%. Área total 61,268m² (privativa 30 + comum 31,268). 1 quarto.\n" +
      "Cônjuge Ana Celia: nasc 06/06/1974, pedagoga, cel (91) 99639-7764.\n" +
      "End: Rodovia do Mario Covas, 18, Cond. Porto Esmaralda - BL12 - Apto 406, Bairro Coqueiro, Ananindeua/PA, CEP 67115000."
  },

  // ── Ficha 171 ── Mauricio Fernandes Lacerda — Ondas Praia Resort Bl C/C209/Cota 07 ──
  {
    id: 171,
    nome: "Mauricio Fernandes Lacerda",
    cpf: "112.504.496-93",
    rg: "MG14837972 - SSP/MG",
    nascimento: "1991-07-26",
    estadoCivil: "Casado",
    profissao: "Agricultor",
    empresa: "WAM",
    empreendimento: "Ondas Praia Resort",
    cidade: "Porto Seguro/BA",
    bloco: "C",
    unidade: "C209",
    andar: "",
    cota: "07",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 62663.17,
    precoIntermediacao: 6120.00,
    precoTotal: 68783.17,
    valorPago: 660.00,
    entradas: [
      { descricao: "Cartão de débito intermediação (1x R$ 660)", valor: 660.00 }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 660 cartão débito + 5x R$ 1.092 boleto W Palmerston (total R$ 6.120) | Cota: 5x R$ 50 boleto (1ª 15/10/2026) + 96x R$ 650,14 boleto (1ª 20/03/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-13",
    telefone: "(37) 98414-8924",
    email: "mauricio.f.lacerda@gmail.com",
    conjuge: {
      nome: "Cintia Alves Fernandes Lacerda",
      cpf: "070.246.956-41",
      rg: "MG12309060 - SSP/MG"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/171-mauricio-fernandes-lacerda-ondas-praia-resort-blc-c209-cota07--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 660 (cartão de débito intermediação). Somente a entrada em débito foi paga.\n" +
      "Boletos intermediação (5x R$ 1.092, cobrança W Palmerston) NÃO vencidos — sem data de vencimento explícita no contrato.\n" +
      "Boletos cota: 5x R$ 50 (1ª 15/10/2026) e 96x R$ 650,14 (1ª 20/03/2027) NÃO vencidos.\n" +
      "Intermediação R$ 6.120 devida à WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Preço cota (sem intermediação): R$ 62.663,17. Total contrato: R$ 68.783,17.\n" +
      "DENTRO DO PRAZO — contrato 13/09/2026, prazo arrependimento vence 20/09/2026.\n" +
      "GSign Document ID: 0Q3JPTC15I-OU2B3KQ-VWV4ZWSXG7PE68-ME1DE.\n" +
      "Vendedora: SPE Porto Seguro 02 Empreendimentos Imobiliários S.A. (CNPJ 22.059.167/0001-60).\n" +
      "Casado — regime de comunhão parcial de bens.\n" +
      "Cônjuge Cintia: nasc 23/09/1984, administradora, tel (37) 98404-7958, e-mail cintiaalvescruz@gmail.com.\n" +
      "Cliente NÃO conheceu pessoalmente a unidade/empreendimento.\n" +
      "2 semanas/ano. Habite-se: 00046/2021 a 00611/2021 (a partir de 02/03/2021). Matrícula 38.236.\n" +
      "Nasc: 26/07/1991. Profissão: Agricultor.\n" +
      "Testemunhas: Noendell Leonnardo Coelho Barreto; Alan Guilherme Guimarães (CPF 416.740.568-77)."
  },

  // ── Ficha 172 ── Lucas Pereira Lima — Ondas Praia Resort Bl B/B123/Cota 05 ──
  {
    id: 172,
    nome: "Lucas Pereira Lima",
    cpf: "047.100.995-45",
    rg: "1659144248 - SSP/BA",
    nascimento: "1993-06-30",
    estadoCivil: "Casado",
    profissao: "Empresário",
    empresa: "WAM",
    empreendimento: "Ondas Praia Resort",
    cidade: "Porto Seguro/BA",
    bloco: "B",
    unidade: "B123",
    andar: "",
    cota: "05",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 61213.00,
    precoIntermediacao: 5359.00,
    precoTotal: 66572.00,
    valorPago: 9755.61,
    entradas: [
      { descricao: "Pagamento 1 (confirmado pelo cliente)", valor: 4791.00 },
      { descricao: "Pagamento 2 (confirmado pelo cliente)", valor: 4964.61 }
    ],
    formaPagamentoEntrada: "Intermediação: 1x R$ 1.253 depósito/transferência + 3x R$ 1.368,66 crédito recorrente (total R$ 5.359) | Cota: 3x R$ 50 boleto (1ª 15/09/2025) + 120x R$ 508,86 boleto (1ª 20/12/2025)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2025-08-12",
    telefone: "(77) 99211-3626",
    email: "lucas.sr09@gmail.com",
    conjuge: {
      nome: "Quêila de Oliveira Nascimento Lima",
      cpf: "047.073.155-93",
      rg: "04707315593 - SSP/BA"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/172-lucas-pereira-lima-ondas-praia-resort-blb-b123-cota05--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 9.755,61 (R$ 4.791 + R$ 4.964,61, confirmado pelo cliente). Contrato de ago/2025.\n" +
      "Intermediação contratual: depósito R$ 1.253 + recorrente 3x R$ 1.368,66. Cota: 3x R$ 50 boleto (1ª 15/09/2025) + 120x R$ 508,86 boleto (1ª 20/12/2025).\n" +
      "Intermediação R$ 5.359 devida à WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Preço cota (sem intermediação): R$ 61.213. Total contrato: R$ 66.572.\n" +
      "FORA DO PRAZO — contrato 12/08/2025, prazo arrependimento venceu 19/08/2025 (mais de 1 ano).\n" +
      "GSign Document ID: 0V6GVGXDJA-VMSP5GT-QGW3JPOX6DRPEG-JHE21.\n" +
      "Vendedora: SPE Porto Seguro 02 Empreendimentos Imobiliários S.A. (CNPJ 22.059.167/0001-60).\n" +
      "Casado — regime de comunhão parcial de bens.\n" +
      "Cônjuge Quêila: nasc 08/12/1993, empresária, e-mail keilaoliveiralima@gmail.com. ATENÇÃO: RG cônjuge no contrato = CPF repetido (04707315593).\n" +
      "Cliente conheceu pessoalmente a unidade/empreendimento.\n" +
      "2 semanas/ano. Habite-se: 00046/2021 a 00611/2021 (a partir de 02/03/2021). Matrícula 38.236.\n" +
      "Testemunhas: Abqueila Amorim; Yasmin Lorrane Silva Gomes (CPF 05862401105).\n" +
      "CLIENTE CONCORDOU com reembolso de R$ 9.755,61 (16/09/2026). Pede antes de assinar: (1) prazo/data para efetivação do reembolso no distrato; (2) confirmação de que R$ 9.755,61 é valor líquido, sem descontos posteriores."
  },

  // ── Ficha 173 ── Neria dos Santos Matias Oliveira — Gran Garden Resort Bl B4/205/Cota 10 ──
  {
    id: 173,
    nome: "Neria dos Santos Matias Oliveira",
    cpf: "033.099.581-24",
    rg: "033.099.581-24 - SSP/GO",
    nascimento: "1991-07-02",
    estadoCivil: "Casado",
    profissao: "Médico(a)",
    empresa: "GAV",
    empreendimento: "Gran Garden Resort",
    cidade: "Gramado/RS",
    bloco: "B4",
    unidade: "205",
    andar: "2",
    cota: "10",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 76732.22,
    precoIntermediacao: 4490.00,
    precoTotal: 81222.22,
    valorPago: 6024.64,
    entradas: [
      { descricao: "PIX corretagem (1x R$ 4.490, doc RESV0820700093, 24/07/2026)", valor: 4490.00 },
      { descricao: "Boletos sinal pagos (2x R$ 767,32, venc 10/08 e 10/09/2026)", valor: 1534.64 }
    ],
    formaPagamentoEntrada: "Corretagem: 1x R$ 4.490 PIX (24/07/2026) | Sinal: R$ 3.836,61 em 5x R$ 767,32 boleto (1ª 10/08/2026) | Saldo: R$ 68.405,61 em 91x R$ 751,71 boleto (1ª 10/01/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-07-24",
    telefone: "(64) 99297-4541",
    email: "neriasmatias2@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/173-neria-dos-santos-matias-oliveira-gran-garden-resort-blb4-205-cota10--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 6.024,64 — PIX corretagem R$ 4.490 + 2 boletos sinal pagos R$ 1.534,64 (2x R$ 767,32, venc 10/08 e 10/09/2026).\n" +
      "Boletos sinal restantes (3x R$ 767,32, venc 10/10, 10/11, 10/12/2026) NÃO vencidos.\n" +
      "Boletos saldo (91x R$ 751,71, 1ª 10/01/2027) NÃO vencidos.\n" +
      "Corretagem R$ 4.490 (1 parcela PIX). Beneficiários: Leonardo Souza da Silva (46988364000122), Alan Tavares Santos (67197720000160), Daniela Costa do Nascimento (25055093000182).\n" +
      "Preço fração de tempo: R$ 76.732,22. Sinal R$ 3.836,61 (5x R$ 767,32 boleto). Saldo R$ 68.405,61 (91x R$ 751,71 boleto).\n" +
      "FORA DO PRAZO — contrato 24/07/2026, prazo arrependimento venceu 31/07/2026.\n" +
      "Proposta nº 350651. ZapSign ID: 80b2583a-3e41-45fc-b838-8d07589fbb10.\n" +
      "Vendedora: GAV Gramado Três Empreendimento Imobiliário SPE Ltda (CNPJ 50.094.155/0001-02).\n" +
      "Empreendimento em construção — obras civis prazo 48 meses a partir de jun/2023 + tolerância 180 dias.\n" +
      "1 semana/ano (NÃO 2). Fração ideal 0,0106837606838%. Área total 126,33m² (privativa 86,2 + comum 40,13). 2 quartos.\n" +
      "Casado(a) mas cônjuge NÃO INFORMADO no contrato (todos os campos do cônjuge em branco).\n" +
      "ATENÇÃO: RG no contrato = CPF repetido (03309958124). E-mail no quadro-resumo do contrato é placeholder (www@www.com.br) — usado o e-mail da proposta.\n" +
      "End: Jacinto Ferreira de Souza, SN, Casa, Centro, Santa Helena de Goias/GO, CEP 75920000."
  },

  // ── Ficha 174 ──────────────────────────────────────────────
  {
    id: 174,
    nome: "Maria Janyelem Nascimento da Silva",
    cpf: "067.812.772-78",
    rg: "7803580 PC/PA",
    empresa: "GAV",
    razaoSocial: "SALINAS BEACH RESORT EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "33.531.685/0001-51",
    empreendimento: "Salinas Beach Resort",
    localizacao: "Salinópolis/PA",
    bloco: "2",
    unidade: "1513",
    cota: "20",
    fracao: "1/52",
    valorTotal: 43444.60,
    valorPago: 9812.25,
    entradas: [
      { descricao: "Cartão crédito corretagem (MASTER/CreditoAVista, 1x R$ 1.000)", valor: 1000.00 },
      { descricao: "Demais pagamentos confirmados pelo cliente", valor: 8812.25 }
    ],
    formaPagamentoEntrada: "Corretagem: R$ 1.000 cartão crédito (MASTER, Nº 34667852, venc 26/05/2025) + R$ 2.990 em 4x R$ 747,50 boleto (1ª 15/06/2025) | Sinal: R$ 2.172,24 em 4x R$ 543,06 (1ª 15/10/2025) | Saldo: R$ 37.282,36 em 68x R$ 548,27 (1ª 15/02/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2025-04-26",
    telefone: "(91) 99246-8492",
    email: "mariajanyelem@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/174-maria-janyelem-salinas-beach-resort-bl02-1513-cota20--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000 — cartão crédito corretagem (MASTER/CreditoAVista).\n" +
      "Corretagem total R$ 3.990: R$ 1.000 cartão + R$ 2.990 em 4x R$ 747,50 boleto (1ª 15/06/2025) — boletos NÃO confirmados pagos.\n" +
      "Sinal R$ 2.172,24 em 4x R$ 543,06 (1ª 15/10/2025) — sem confirmação de pagamento.\n" +
      "Saldo R$ 37.282,36 em 68x R$ 548,27 (1ª 15/02/2026).\n" +
      "FORA DO PRAZO — contrato 26/04/2025, prazo arrependimento venceu 03/05/2025.\n" +
      "Proposta/contrato nº 259624. D4Sign: 7d7aa715-d0a9-4971-b881-ecb84d4bfa16.\n" +
      "Vendedora: Salinas Beach Resort Empreendimento Imobiliário SPE Ltda (CNPJ 33.531.685/0001-51).\n" +
      "Beneficiários corretagem: A Souza da Silva (43363546000110), Simara S Rachid Ltda (53245160000167), N.M. de Lima (39259640000156).\n" +
      "Preço fração de tempo: R$ 43.444,60. Tipo: 1 quarto. Área total 61,268m² (privativa 30 + comum 31,268). 2 semanas/ano.\n" +
      "Solteira, sem cônjuge. Nascimento 07/08/2008. Profissão: bancária.\n" +
      "End: Rua Santo Antonio, 330, Centro, Aurora do Pará/PA, CEP 68658-000."
  },

  // ── Ficha 175 ──────────────────────────────────────────────
  {
    id: 175,
    nome: "Jakeline Aparecida da Silva Costa",
    cpf: "013.760.351-70",
    rg: "18089720 SSP/MT",
    empresa: "GAV",
    razaoSocial: "SALINAS PREMIUM RESORT EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "28.883.561/0001-03",
    empreendimento: "Premium GAV Resorts",
    localizacao: "Salinópolis/PA",
    bloco: "02",
    unidade: "1603",
    cota: "07",
    fracao: "1/52",
    valorTotal: 66961.32,
    valorPago: 1000.00,
    entradas: [
      { descricao: "Cartão crédito corretagem (MASTER ****7117, 1x R$ 1.000)", valor: 1000.00 }
    ],
    formaPagamentoEntrada: "Corretagem: R$ 1.000 cartão crédito (MASTER, CV 20776006, 13/08/2026) + R$ 2.990 em 5x R$ 598 boleto (1ª 13/09/2026) | Sinal: R$ 3.348,07 em 5x R$ 669,61 (1ª 10/02/2027) | Saldo: R$ 59.623,25 em 85x R$ 701,45 (1ª 10/07/2027)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-08-13",
    telefone: "(66) 99612-4135",
    email: "geovanasomotos@hotmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/175-jakeline-aparecida-premium-gav-resorts-bl02-1603-cota07--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000 — cartão crédito corretagem (MASTER ****7117, crédito à vista).\n" +
      "Corretagem total R$ 3.990: R$ 1.000 cartão + R$ 2.990 em 5x R$ 598 boleto (1ª 13/09/2026) — boletos NÃO confirmados pagos.\n" +
      "Sinal R$ 3.348,07 em 5x R$ 669,61 (1ª 10/02/2027). Saldo R$ 59.623,25 em 85x R$ 701,45 (1ª 10/07/2027).\n" +
      "FORA DO PRAZO — contrato 13/08/2026, prazo arrependimento venceu 20/08/2026.\n" +
      "Proposta nº 354565. ZapSign: 4870617a-0f2f-4ad4-abad-e3d6f1c99224.\n" +
      "Vendedora: Salinas Premium Resort Empreendimento Imobiliário SPE Ltda (CNPJ 28.883.561/0001-03).\n" +
      "Beneficiários corretagem: Rafaela Amorim Canedo (54125145000148), Pedro Henrique Frank Dutra (53866278000102), Samara Mauro Vieira (50438113000141), Allan Wendel R Simoes Ltda (59385554000105).\n" +
      "Preço fração: R$ 66.961,32. 1 quarto. Área total 72,22m² (privativa 30 + comum 42,22). 4 semanas/ano.\n" +
      "Casada mas cônjuge NÃO INFORMADO no contrato. Nascimento 02/05/1986. Profissão: auxiliar contábil.\n" +
      "End: Rua Cefet, SN, Santa Luzia, Confresa/MT, CEP 78652-000."
  },

  // ── Ficha 176 ──────────────────────────────────────────────
  {
    id: 176,
    nome: "Renata Correia Torres",
    cpf: "035.302.354-07",
    rg: "5126340 SSP/PE",
    empresa: "GAV",
    razaoSocial: "GAV MURO ALTO EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "34.832.326/0001-05",
    empreendimento: "Porto Alto Resort",
    localizacao: "Ipojuca/PE",
    bloco: "01",
    unidade: "0118",
    cota: "19",
    fracao: "1/52",
    valorTotal: 72824.90,
    valorPago: 1000.00,
    entradas: [
      { descricao: "PIX corretagem (R$ 1.000, 13/09/2026)", valor: 1000.00 }
    ],
    formaPagamentoEntrada: "Corretagem: R$ 1.000 PIX (13/09/2026) + R$ 2.990 em 4x R$ 747,50 boleto (1ª 13/10/2026) | Sinal: R$ 3.641,26 em 4x R$ 910,32 (1ª 10/02/2027) | Saldo: R$ 65.193,64 em 68x R$ 958,73 (1ª 10/06/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-13",
    telefone: "(81) 99426-2680",
    email: "rtorres@informa.com.br",
    conjuge: {
      nome: "Edmilson Manoel da Silva",
      cpf: "060.619.174-73",
      rg: "6029456 SDS/PE"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/176-renata-correia-torres-porto-alto-resort-bl01-0118-cota19--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000 — PIX corretagem (Nº RESN8860630095/158146OC5HW9U/334CF245).\n" +
      "Corretagem total R$ 3.990: R$ 1.000 PIX + R$ 2.990 em 4x R$ 747,50 boleto (1ª 13/10/2026) — boletos NÃO vencidos.\n" +
      "Sinal R$ 3.641,26 em 4x R$ 910,32 (1ª 10/02/2027). Saldo R$ 65.193,64 em 68x R$ 958,73 (1ª 10/06/2027).\n" +
      "DENTRO DO PRAZO — contrato 13/09/2026, prazo arrependimento vence 20/09/2026.\n" +
      "Proposta nº 359984. ZapSign: 41ec8dd7-14c7-4dcc-acc0-3bc382c175fa.\n" +
      "Vendedora: GAV Muro Alto Empreendimento Imobiliário SPE Ltda (CNPJ 34.832.326/0001-05).\n" +
      "Beneficiários corretagem: Rafaela Amorim Canedo (54125145000148), Pedro Henrique Frank Dutra (53866278000102), Samara Mauro Vieira (50438113000141), Allan Wendel R Simoes Ltda (59385554000105).\n" +
      "1 quarto. Área total 64,54m² (privativa 32,54 + comum 32). 2 semanas/ano.\n" +
      "Casada. Cônjuge Edmilson Manoel da Silva, CPF 060.619.174-73, nasc 27/09/1982, administrador, email edmilsonsilvamelo79@gmail.com, cel (81) 99529-7382.\n" +
      "Nascimento 25/02/1979. Profissão: administradora.\n" +
      "End: Rua Medusa, 584, Brasilia Teimosa, Recife/PE, CEP 51010-030."
  },

  // ── Ficha 177 ── Eliezer dos Santos Rosario — Gran Haus Resort Bl 5/201/Cota 08 ──
  {
    id: 177,
    nome: "Eliezer dos Santos Rosario",
    cpf: "032.394.520-14",
    rg: "03239452014 SSP/RS",
    empresa: "GAV",
    razaoSocial: "GAV GRAMADO 4 EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA",
    cnpj: "62.986.874/0001-17",
    empreendimento: "Gran Haus Resort",
    localizacao: "Gramado/RS",
    bloco: "5",
    unidade: "201",
    cota: "08",
    fracao: "1/52",
    valorTotal: 57817.32,
    valorPago: 4490.00,
    entradas: [
      { descricao: "PIX corretagem (R$ 4.490, 12/09/2026)", valor: 4490.00 }
    ],
    formaPagamentoEntrada: "Corretagem: R$ 4.490 PIX (12/09/2026, CV 35307170) | Sinal: R$ 2.890,87 em 5x R$ 578,17 (1ª 10/10/2026) | Saldo: R$ 50.436,45 em 85x R$ 593,37 (1ª 10/03/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-12",
    telefone: "(55) 99638-1459",
    email: "eliezersantos838@gmail.com",
    conjuge: {
      nome: "Elisiane Vargas da Silveira",
      cpf: "012.191.940-42",
      rg: "9088621165 SJS/RS"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/177-eliezer-dos-santos-rosario-gran-haus-resort-bl05-201-cota08--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 4.490 — PIX corretagem (CV 35307170, ID RESV88142801061084500FTDO3H74A96C6D0).\n" +
      "Sinal R$ 2.890,87 em 5x R$ 578,17 (1ª 10/10/2026). Saldo R$ 50.436,45 em 85x R$ 593,37 (1ª 10/03/2027).\n" +
      "DENTRO DO PRAZO — contrato 12/09/2026, prazo arrependimento vence 19/09/2026.\n" +
      "Proposta nº 359781. ZapSign: 82e4c1f4-91c5-40f8-b420-357967270a6f.\n" +
      "Vendedora: GAV Gramado 4 Empreendimentos Imobiliários SPE Ltda (CNPJ 62.986.874/0001-17).\n" +
      "2 quartos. Área total 131,41m² (privativa 73,67 + comum 57,741). 1 semana/ano.\n" +
      "ATENÇÃO: RG no contrato = CPF repetido (03239452014).\n" +
      "Casado. Cônjuge Elisiane Vargas da Silveira, CPF 012.191.940-42, nasc 21/07/1986, técnica em enfermagem, email elisiane-eliezer@outlook.com, cel (55) 99999-7414.\n" +
      "Nascimento 02/04/1992. Profissão: secretária.\n" +
      "End: Rua Laguna, 313, Casa, Centro, Três Passos/RS, CEP 98600-000."
  },

  // ── Ficha 178 ── Eliezer dos Santos Rosario — Gran Haus Resort Bl 5/201/Cota 09 ──
  {
    id: 178,
    nome: "Eliezer dos Santos Rosario",
    cpf: "032.394.520-14",
    rg: "03239452014 SSP/RS",
    empresa: "GAV",
    razaoSocial: "GAV GRAMADO 4 EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA",
    cnpj: "62.986.874/0001-17",
    empreendimento: "Gran Haus Resort",
    localizacao: "Gramado/RS",
    bloco: "5",
    unidade: "201",
    cota: "09",
    fracao: "1/52",
    valorTotal: 57817.32,
    valorPago: 4490.00,
    entradas: [
      { descricao: "Cartão débito corretagem (MASTER ****0214, R$ 4.490, 12/09/2026)", valor: 4490.00 }
    ],
    formaPagamentoEntrada: "Corretagem: R$ 4.490 cartão débito (MASTER ****0214, CV 34415910, 12/09/2026) | Sinal: R$ 2.890,87 em 5x R$ 578,17 (1ª 10/10/2026) | Saldo: R$ 50.436,45 em 85x R$ 593,37 (1ª 10/03/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-12",
    telefone: "(55) 99638-1459",
    email: "eliezersantos838@gmail.com",
    conjuge: {
      nome: "Elisiane Vargas da Silveira",
      cpf: "012.191.940-42",
      rg: "9088621165 SJS/RS"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/178-eliezer-dos-santos-rosario-gran-haus-resort-bl05-201-cota09--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 4.490 — cartão débito corretagem (MASTERCARD DEBITO ****0214, CV 34415910).\n" +
      "Sinal R$ 2.890,87 em 5x R$ 578,17 (1ª 10/10/2026). Saldo R$ 50.436,45 em 85x R$ 593,37 (1ª 10/03/2027).\n" +
      "DENTRO DO PRAZO — contrato 12/09/2026, prazo arrependimento vence 19/09/2026.\n" +
      "Proposta nº 359782. ZapSign: 3d7f5846-bba5-4b20-aae8-85d7f0a04636.\n" +
      "Vendedora: GAV Gramado 4 Empreendimentos Imobiliários SPE Ltda (CNPJ 62.986.874/0001-17).\n" +
      "2 quartos. Área total 131,41m² (privativa 73,67 + comum 57,741). 1 semana/ano.\n" +
      "ATENÇÃO: RG no contrato = CPF repetido (03239452014). Débito = Reembolso (não Estorno).\n" +
      "Mesma pessoa/cônjuge da ficha 177 (Cota 08, mesmo apt).\n" +
      "End: Rua Laguna, 313, Casa, Centro, Três Passos/RS, CEP 98600-000."
  },

  // ── Ficha 179 ── Lusivanio Sousa Pereira Bandeira — Gran Haus Resort Bl 6/203/Cota 52 ──
  {
    id: 179,
    nome: "Lusivanio Sousa Pereira Bandeira",
    cpf: "570.571.683-49",
    rg: "038932 PM/TO",
    empresa: "GAV",
    razaoSocial: "GAV GRAMADO 4 EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA",
    cnpj: "62.986.874/0001-17",
    empreendimento: "Gran Haus Resort",
    localizacao: "Gramado/RS",
    bloco: "6",
    unidade: "203",
    andar: "1",
    cota: "52",
    fracao: "1/52",
    valorTotal: 45125.99,
    valorPago: 3990.00,
    entradas: [
      { descricao: "Cartão crédito corretagem (VISA ****7747, 5x R$ 798, CV 177532700, 08/09/2026)", valor: 3990.00 }
    ],
    formaPagamentoEntrada: "Corretagem: R$ 3.990 cartão crédito (VISA ****7747, 5x R$ 798, CV 177532700, 08/09/2026) | Sinal: R$ 2.256,31 em 4x R$ 564,08 (1ª 05/03/2027) | Saldo: R$ 38.879,68 em 68x R$ 571,76 (1ª 05/07/2027)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-08",
    telefone: "(99) 98423-8973",
    email: "lusivaniosousa@gmail.com",
    conjuge: {
      nome: "Teresa Lucia Bandeira dos Reis Pereira",
      cpf: "576.688.683-72",
      rg: "226788520026 SESP/MA"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/179-lusivanio-sousa-pereira-bandeira-gran-haus-resort-bl06-203-cota52--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990 — cartão crédito corretagem (VISA ****7747, crédito parcelado estab. 5x R$ 798, CV 177532700).\n" +
      "Sinal R$ 2.256,31 em 4x R$ 564,08 (1ª 05/03/2027). Saldo R$ 38.879,68 em 68x R$ 571,76 (1ª 05/07/2027).\n" +
      "FORA DO PRAZO — contrato 08/09/2026, prazo arrependimento venceu 15/09/2026.\n" +
      "Proposta nº 359063. ZapSign: 1f497f65-b400-459c-880a-19a708cbe940.\n" +
      "Vendedora: GAV Gramado 4 Empreendimentos Imobiliários SPE Ltda (CNPJ 62.986.874/0001-17).\n" +
      "2 quartos. Área total 86,62m² (privativa 48,56 + comum 38,06). 1 semana/ano.\n" +
      "Casado. Cônjuge Teresa Lucia Bandeira dos Reis Pereira, CPF 576.688.683-72, nasc 14/01/1976, professora municipal, email tluciareis2018@gmail.com, cel (99) 98407-1472.\n" +
      "Nascimento 13/12/1971. Profissão: policial militar.\n" +
      "End: Chacara Vale do Santana, SN, Zona Rural, Lajeado Novo/MA, CEP 65937-000."
  },

  // ── Ficha 180 ── Ana Paula Fernandes Lima Fonseca — Praias do Lago Eco Resort Bl I/301/Cota 05 ──
  {
    id: 180,
    nome: "Ana Paula Fernandes Lima Fonseca",
    cpf: "030.417.481-50",
    rg: "5335601 SSP/GO",
    empresa: "WAM",
    razaoSocial: "NG20 EMPREENDIMENTOS IMOBILIÁRIOS S/A",
    cnpj: "19.829.219/0001-26",
    empreendimento: "Praias do Lago Eco Resort",
    localizacao: "Caldas Novas/GO",
    bloco: "I",
    unidade: "301",
    cota: "05",
    fracao: "1/52",
    valorTotal: 51726.75,
    valorPago: 5280.00,
    entradas: [
      { descricao: "Cartão crédito intermediação (6x R$ 616,66 + 6x R$ 263,33 CIELO)", valor: 5280.00 }
    ],
    formaPagamentoEntrada: "Intermediação: R$ 5.280 cartão crédito (6x R$ 616,66 + 6x R$ 263,33 CIELO) | Cota: 4x R$ 50 boleto (1ª 15/10/2026) + 88x R$ 525,53 boleto (1ª 20/02/2027)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-13",
    telefone: "(62) 9845-0961",
    email: "paula_fernandes04@hotmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/180-ana-paula-fernandes-lima-fonseca-praias-do-lago-eco-resort-blI-301-cota05--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 5.280 — cartão crédito intermediação (6x R$ 616,66 + 6x R$ 263,33 CIELO).\n" +
      "Intermediadora: WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Preço da cota (sem intermediação): R$ 46.446,75. 4x R$ 50 boleto (1ª 15/10/2026) + 88x R$ 525,53 boleto (1ª 20/02/2027) — nenhum boleto vencido.\n" +
      "DENTRO DO PRAZO — contrato 13/09/2026, prazo arrependimento vence 20/09/2026.\n" +
      "Contrato nº 315437. GSign: N6R5A7AWY3-GJRLPZU-INAWS4D9BICXIB-LGC49.\n" +
      "Vendedora: NG20 Empreendimentos Imobiliários S/A (CNPJ 19.829.219/0001-26).\n" +
      "1 quarto. 3 semanas/ano.\n" +
      "Solteira, sem cônjuge. Nascimento 15/09/1988. Profissão: professora.\n" +
      "End: Rua 13, S/N, Residencial Recanto Sonhado, Inhumas/GO, CEP 75405-449."
  },

  // ── Ficha 181 ── Lusivanio Sousa Pereira Bandeira — Premium GAV Resorts Bl 01/0412/Cota 10 ──
  {
    id: 181,
    nome: "Lusivanio Sousa Pereira Bandeira",
    cpf: "570.571.683-49",
    rg: "038932 PM/TO",
    empresa: "GAV",
    razaoSocial: "SALINAS PREMIUM RESORT EMPREENDIMENTO IMOBILIÁRIO SPE LTDA",
    cnpj: "28.883.561/0001-03",
    empreendimento: "Premium GAV Resorts",
    localizacao: "Salinópolis/PA",
    bloco: "01",
    unidade: "0412",
    andar: "4",
    cota: "10",
    fracao: "1/52",
    valorTotal: 100941.63,
    valorPago: 3990.00,
    entradas: [
      { descricao: "PIX corretagem (R$ 3.990, CV 21768960, 08/09/2026)", valor: 3990.00 }
    ],
    formaPagamentoEntrada: "Corretagem: R$ 3.990 PIX (CV 21768960, 08/09/2026) | Sinal: R$ 5.047,08 em 5x R$ 1.009,42 (1ª 05/10/2026) | Saldo: R$ 91.904,55 em 85x R$ 1.081,23 (1ª 05/03/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-08",
    telefone: "(99) 98423-8973",
    email: "lusivaniosousa@gmail.com",
    conjuge: {
      nome: "Teresa Lucia Bandeira dos Reis Pereira",
      cpf: "576.688.683-72",
      rg: "226788520026 SESP/MA"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/181-lusivanio-sousa-pereira-bandeira-premium-gav-resorts-bl01-0412-cota10--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990 — PIX corretagem (CV 21768960, ID RESN77199300952333326KJEMMA5SA984830).\n" +
      "Sinal R$ 5.047,08 em 5x R$ 1.009,42 (1ª 05/10/2026). Saldo R$ 91.904,55 em 85x R$ 1.081,23 (1ª 05/03/2027).\n" +
      "FORA DO PRAZO — contrato 08/09/2026, prazo arrependimento venceu 15/09/2026.\n" +
      "Proposta nº 359062. ZapSign: 13650af5-eddf-43ea-a9f0-613091e9aa01.\n" +
      "Vendedora: Salinas Premium Resort Empreendimento Imobiliário SPE Ltda (CNPJ 28.883.561/0001-03).\n" +
      "2 quartos. Área total 130m² (privativa 54 + comum 76). 2 semanas/ano.\n" +
      "Mesma pessoa da ficha 179 (Gran Haus Resort, Bl 6/203/Cota 52).\n" +
      "Casado. Cônjuge Teresa Lucia Bandeira dos Reis Pereira, CPF 576.688.683-72.\n" +
      "End: Chacara Vale do Santana, SN, Zona Rural, Lajeado Novo/MA, CEP 65937-000."
  },

  // ── Ficha 182 ── Uriel Adonias Rocha dos Santos — GAV TS (100.000 pontos) ──
  {
    id: 182,
    nome: "Uriel Adonias Rocha dos Santos",
    cpf: "108.134.494-64",
    rg: "36024945 SSPAL",
    empresa: "GAV",
    razaoSocial: "GAV TS ADMINISTRAÇÃO UNIPESSOAL LTDA",
    cnpj: "47.008.570/0001-91",
    empreendimento: "GAV Vacation Club (Pontos)",
    localizacao: "",
    bloco: "",
    unidade: "",
    cota: "",
    fracao: "",
    valorTotal: 12900.00,
    valorPago: 215.00,
    entradas: [
      { descricao: "Dinheiro sinal (R$ 215, venc 17/09/2026)", valor: 215.00 }
    ],
    formaPagamentoEntrada: "Sinal: R$ 215 dinheiro (venc 17/09/2026) | Saldo: R$ 12.685 em 59x R$ 215 boleto (1ª 10/10/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-16",
    telefone: "(82) 99174-7125",
    email: "urieladonias12345@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/182-uriel-adonias-rocha-dos-santos-gav-ts-100mil-pontos--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 215 — dinheiro (sinal).\n" +
      "Contrato de PONTOS (100.000 pontos, 5 anos) — sem resort/unidade/cota.\n" +
      "Saldo R$ 12.685 em 59x R$ 215 boleto (1ª 10/10/2026) — nenhum vencido.\n" +
      "DENTRO DO PRAZO — contrato 16/09/2026, prazo arrependimento vence 23/09/2026.\n" +
      "Contrato nº 100.000-005479 (+(63369)). ZapSign: a4a97f98-70b4-48a1-ab61-8dfa4fb3accc.\n" +
      "ATENÇÃO: ZapSign status 'Em-Curso' — 3 assinaturas pendentes (Alan Clebson da Silva, Karolayne Ismenia, Ingrid Vitoria Ribeiro dos Santos Bezerra).\n" +
      "Escritório de vendas: Praia do Francês (AL).\n" +
      "Casado mas cônjuge NÃO INFORMADO. Nascimento 12/03/1990. Profissão: autônomo.\n" +
      "End: Rua Marechal Castelo Branco, 120, Centro, Tanque d'Arca/AL, CEP 57635-000."
  },

  // ── Ficha 183 ── Sarah Martins Kiihn Batista — Ilhas do Lago Eco Resort ──
  {
    id: 183,
    nome: "Sarah Martins Kiihn Batista",
    cpf: "707.133.541-94",
    rg: "3445082 - SESP DF",
    empresa: "WAM",
    razaoSocial: "Ilhas do Lago Incorporação SPE S.A.",
    cnpj: "15.797.526/0001-11",
    empreendimento: "Ilhas do Lago Eco Resort",
    localizacao: "Caldas Novas/GO",
    bloco: "H",
    unidade: "201",
    cota: "35",
    fracao: "1/52",
    valorTotal: 32780.82,
    valorPago: 2900.00,
    entradas: [
      { descricao: "Depósito bancário intermediação (R$ 290)", valor: 290.00 },
      { descricao: "Crédito recorrente intermediação (2x R$ 1.305)", valor: 2610.00 }
    ],
    formaPagamentoEntrada: "Intermediação R$ 2.900: 1x R$ 290 depósito bancário + 2x R$ 1.305 crédito recorrente | Cota R$ 29.880,82: 5x R$ 50 boleto (1ª 10/10/2026) + 76x R$ 389,88 boleto (1ª 20/03/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-12",
    telefone: "(61) 99551-0797",
    email: "sarahmkiihn@outlook.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/183-sarah-martins-kiihn-batista--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 2.900 — intermediação (R$ 290 depósito + R$ 2.610 crédito recorrente).\n" +
      "Boletos da cota NÃO iniciados (1ª parcela 10/10/2026).\n" +
      "DENTRO DO PRAZO — contrato 12/09/2026, prazo arrependimento vence 19/09/2026.\n" +
      "Contrato nº 315302. GSign: LCGBDRXY6B-461W9HU-1KEAF5EGJPQ88A-9GOSO.\n" +
      "Inclui Passaporte +Diversão (Clube Privé / Náutico Praia Clube), contrato I04-H201/35.\n" +
      "Solteira. Nasc 28/07/1998. Profissão: outra.\n" +
      "End: Quadra QR 47, Itapuã I, Planaltina/GO, CEP 73754047."
  },

  // ── Ficha 184 ── Ana Clara do Nascimento Silva — Ondas Praia Resort ──
  {
    id: 184,
    nome: "Ana Clara do Nascimento Silva",
    cpf: "462.590.128-61",
    rg: "39791127 - SSP SP",
    empresa: "WAM",
    razaoSocial: "SPE Porto Seguro 02 Empreendimentos Imobiliários S.A.",
    cnpj: "22.059.167/0001-60",
    empreendimento: "Ondas Praia Resort",
    localizacao: "Porto Seguro/BA",
    bloco: "A",
    unidade: "A232",
    cota: "13",
    fracao: "1/52",
    valorTotal: 72513.17,
    valorPago: 765.00,
    entradas: [
      { descricao: "Depósito bancário intermediação (R$ 765)", valor: 765.00 }
    ],
    formaPagamentoEntrada: "Intermediação R$ 7.650: 1x R$ 765 depósito bancário + 9x R$ 765 boleto W Palmerston | Cota R$ 64.863,17: 5x R$ 50 boleto (1ª 15/10/2026) + 96x R$ 673,05 boleto (1ª 20/03/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-11",
    telefone: "(11) 91414-0257",
    email: "ana.clara.nasc0@gmail.com",
    conjuge: {
      nome: "Victor Hugo Calabresi Dias Claro",
      cpf: "401.390.038-60",
      rg: "508402426 - SSP SP"
    },
    arquivos: [],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 765 — depósito bancário (intermediação).\n" +
      "Boletos intermediação (9x R$ 765 W Palmerston) e boletos cota NÃO iniciados.\n" +
      "DENTRO DO PRAZO — contrato 11/09/2026, prazo arrependimento vence 18/09/2026.\n" +
      "GSign: 6HXXN5AE0I-QYIHAT2-DEWBPZYPYF10RN-84QEF.\n" +
      "2 semanas de uso por ano. Não conheceu o empreendimento pessoalmente.\n" +
      "União estável. Nasc 08/03/1999. Profissão: cirurgião dentista.\n" +
      "Cônjuge: Victor Hugo Calabresi Dias Claro, CPF 401.390.038-60, nasc 09/09/1998, autônomo.\n" +
      "Contrato enviado via screenshots (20 imgs). Sem PDF original armazenado."
  },

  // ── Ficha 185 ── Vanilson Dias Alencar — Gran Garden Resort ──
  {
    id: 185,
    nome: "Vanilson Dias Alencar",
    cpf: "612.594.891-91",
    rg: "33090244063023 - SSP GO",
    empresa: "GAV",
    razaoSocial: "GAV Gramado Três Empreendimento Imobiliário SPE Ltda.",
    cnpj: "50.094.155/0001-02",
    empreendimento: "Gran Garden Resort",
    localizacao: "Gramado/RS",
    bloco: "A3",
    unidade: "201",
    cota: "16",
    fracao: "1/52",
    valorTotal: 79573.47,
    valorPago: 1990.00,
    entradas: [
      { descricao: "Cartão crédito Mastercard (R$ 1.990 corretagem)", valor: 1990.00 }
    ],
    formaPagamentoEntrada: "Corretagem R$ 4.490: 1x R$ 1.990 cartão crédito Master + 2x boleto (R$ 833,33 em 10/11/2026 + R$ 833,34 em 10/01/2027) | Sinal R$ 3.978,67: 5x R$ 795,73 boleto (1ª 10/02/2027) | Saldo R$ 71.104,80: 86x R$ 826,80 boleto (1ª 07/07/2027)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-14",
    telefone: "(63) 98428-5464",
    email: "vanilsonalencar@yahoo.com.br",
    conjuge: {
      nome: "Silvia Rodrigues Lima Alencar",
      cpf: "014.405.731-07",
      rg: "853415 - SSP TO"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/185-vanilson-dias-alencar--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.990 — cartão crédito Mastercard (corretagem, CV 25527072).\n" +
      "Boletos corretagem (R$ 833,33 + R$ 833,34) e parcelas sinal/saldo NÃO vencidos.\n" +
      "DENTRO DO PRAZO — contrato 14/09/2026, prazo arrependimento vence 21/09/2026.\n" +
      "Contrato nº 360058. ZapSign: f5c80aa4-cd20-4711-9eb3-4daeb86574de.\n" +
      "Bloco A3, 2º andar, Apto 201, 2 quartos. 1 semana/ano.\n" +
      "Casado. Nasc 30/10/1977. Profissão: funcionário público.\n" +
      "Cônjuge: Silvia Rodrigues Lima Alencar, CPF 014.405.731-07, nasc 09/11/1986, autônoma.\n" +
      "End: Quadra ARNE 51, Alameda 2, SN, Lote 2, Plano Diretor Norte, Palmas/TO, CEP 77006426."
  },

  // ── Ficha 186 ──────────────────────────────────────────────
  {
    id: "359843-rufino-jlr-bloco02-323-cota-13",
    vispiId: "",
    nContrato: "359843",
    empresa: "GAV",
    empreendimento: "Jeriquiá Lagoa Resort",
    cidade: "Cruz/CE",
    bloco: "02",
    unidade: "323",
    cota: "13",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Rufino de Barros Pereira Netto",
    cpf: "009.887.719-42",
    rg: "4439695 SSP/SC",
    dataNascimento: "23/07/1982",
    estadoCivil: "Casado(a)",
    profissao: "Empresário(a)",
    nacionalidade: "Brasileiro(a)",
    endereco: "Rua Joao da Cruz Kreiling, 1013, Casa, Centro, Canoinhas/SC, CEP 89460154",
    valorTotal: 58029.88,
    valorPago: 1330.00,
    entradas: [
      { descricao: "Cartão débito Mastercard (R$ 1.330 corretagem)", valor: 1330.00 }
    ],
    formaPagamentoEntrada: "Corretagem R$ 3.990: 1x R$ 1.330 débito Mastercard (CV 172631726) + 2x boleto (R$ 886,67 em 10/10/2026 + R$ 886,66 em 10/12/2026) | Sinal R$ 2.901,48: 4x R$ 725,37 boleto (1ª 10/01/2027) | Saldo R$ 51.138,40: 80x R$ 639,23 boleto (1ª 10/05/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-13",
    telefone: "(47) 99977-0538",
    email: "rufinodebarros@gmail.com",
    conjuge: {
      nome: "Não informado",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/186-rufino-de-barros-pereira-netto--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.330 — débito Mastercard ****0645 (corretagem, CV 172631726).\n" +
      "Boletos corretagem (R$ 886,67 + R$ 886,66) e parcelas sinal/saldo NÃO vencidos.\n" +
      "DENTRO DO PRAZO — contrato 13/09/2026, prazo arrependimento vence 20/09/2026 (ÚLTIMO DIA HOJE!).\n" +
      "Contrato nº 359843. ZapSign: d4983424-4899-4d4f-b11d-26996b3d652c.\n" +
      "Torre Bloco 02, 3º andar, Apto 323, Cota 13. 2 semanas/ano.\n" +
      "Casado. Nasc 23/07/1982. Profissão: empresário.\n" +
      "Cônjuge não informado no contrato.\n" +
      "End: Rua Joao da Cruz Kreiling, 1013, Casa, Centro, Canoinhas/SC, CEP 89460154."
  },

  // ── Ficha 188 ──────────────────────────────────────────────
  {
    id: "bfr-luizane-mello-bl20-20106-cota-18",
    vispiId: "",
    nContrato: "",
    empresa: "WAM",
    empreendimento: "Búzios Fractional Resort",
    cidade: "Armação dos Búzios/RJ",
    bloco: "20",
    unidade: "20106",
    cota: "18",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Luizane de Mello Mendes",
    cpf: "055.657.897-02",
    rg: "122771645 IFP/RJ",
    dataNascimento: "23/04/1979",
    estadoCivil: "Solteiro",
    profissao: "Empresário",
    nacionalidade: "Brasileira",
    endereco: "",
    valorTotal: 54829.72,
    valorPago: 1200.00,
    entradas: [
      { descricao: "Depósito bancário/transferência eletrônica (R$ 1.200 intermediação)", valor: 1200.00 }
    ],
    formaPagamentoEntrada: "Intermediação R$ 4.200: 1x R$ 1.200 depósito/transferência + 2x R$ 1.500 boleto (Cobrança W Palmerston) | Preço cota R$ 54.829,72: 2x R$ 25 boleto (1ª 15/08/2026) + 96x R$ 570,62 boleto (1ª 20/10/2026)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-07-11",
    telefone: "(21) 97003-3726",
    email: "luizanedemello@gmail.com",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/188-luizane-de-mello-mendes--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.200 — depósito/transferência eletrônica (intermediação).\n" +
      "Boletos intermediação 2x R$ 1.500 (Cobrança W Palmerston) — sem data de vencimento no contrato, verificar se pagos.\n" +
      "Parcelas cota: 2x R$ 25 boleto (1ª 15/08/2026) + 96x R$ 570,62 boleto (1ª 20/10/2026).\n" +
      "FORA DO PRAZO — contrato 11/07/2026, prazo arrependimento venceu 18/07/2026.\n" +
      "GSign ID: TV4WMFP582-X7VG4YA-1PGMFO4H1VRZV9-P3C69.\n" +
      "Bloco 20, Unidade 20106, Cota 18. 2 semanas/ano. Solteiro.\n" +
      "Nasc 23/04/1979. Profissão: empresário.\n" +
      "Endereço não consta no contrato.\n" +
      "Vendedora: W50 Empreendimentos Imobiliários Ltda (CNPJ 33.770.634/0001-82).\n" +
      "Empreendimento em retrofit (cláusula 7 do contrato)."
  },

  // ── Ficha 189 ──────────────────────────────────────────────
  {
    id: "pdl-jackson-cardoso-l-501-cota-12",
    vispiId: "",
    nContrato: "",
    empresa: "WAM",
    empreendimento: "Praias do Lago Eco Resort",
    cidade: "Caldas Novas/GO",
    bloco: "L",
    unidade: "501",
    cota: "12",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Jackson Santos Cardoso",
    cpf: "091.470.296-33",
    rg: "MG14827772 SSP/MG",
    dataNascimento: "19/10/1987",
    estadoCivil: "Casado",
    profissao: "Autônomo(a)",
    nacionalidade: "Brasileiro",
    endereco: "Rua Ouro Minas, 62, Padre Miguel, Santa Luzia/MG, CEP 33082012",
    valorTotal: 46446.75,
    valorPago: 615.99,
    entradas: [
      { descricao: "Depósito/transferência eletrônica (R$ 382,66 intermediação)", valor: 382.66 },
      { descricao: "Cartão crédito Cielo (R$ 233,33 intermediação)", valor: 233.33 }
    ],
    formaPagamentoEntrada: "Intermediação R$ 6.160: 1x R$ 382,66 depósito/transferência + 1x R$ 233,33 cartão crédito Cielo + 9x R$ 616 boleto (Cobrança W Palmerston) | Preço cota R$ 46.446,75: 4x R$ 50 boleto (1ª 15/09/2026) + 88x R$ 525,53 boleto (1ª 20/01/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-17",
    telefone: "(31) 99280-8902",
    email: "jacksonsantosc1@gmail.com",
    conjuge: {
      nome: "Priscila Soares Cardoso",
      cpf: "103.403.376-05",
      rg: "MG16897852 PC/MG"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/189-jackson-santos-cardoso-l501-cota12--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 615,99 — depósito R$ 382,66 + cartão crédito Cielo R$ 233,33 (intermediação).\n" +
      "Boletos intermediação 9x R$ 616 (Cobrança W Palmerston) — sem vencimento no contrato.\n" +
      "Parcelas cota: 4x R$ 50 boleto (1ª 15/09/2026) + 88x R$ 525,53 boleto (1ª 20/01/2027).\n" +
      "FORA DO PRAZO — contrato 17/08/2026, prazo arrependimento venceu 24/08/2026.\n" +
      "GSign: 26N23GUIBI-RJGTM7P-1UNISOJKDM3MXN-RUSP7.\n" +
      "Bloco L, Apto 501, Cota 12. 3 semanas/ano. Não conheceu o empreendimento.\n" +
      "Casado (comunhão parcial). Nasc 19/10/1987.\n" +
      "Cônjuge: Priscila Soares Cardoso, CPF 103.403.376-05, nasc 21/02/1992, gerente.\n" +
      "Náutico Praia Clube: Nº 11-L501/12.\n" +
      "End: Rua Ouro Minas, 62, Padre Miguel, Santa Luzia/MG, CEP 33082012."
  },

  // ── Ficha 190 ──────────────────────────────────────────────
  {
    id: "pdl-jackson-cardoso-m-201-cota-17",
    vispiId: "",
    nContrato: "",
    empresa: "WAM",
    empreendimento: "Praias do Lago Eco Resort",
    cidade: "Caldas Novas/GO",
    bloco: "M",
    unidade: "201",
    cota: "17",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Jackson Santos Cardoso",
    cpf: "091.470.296-33",
    rg: "MG14827772 SSP/MG",
    dataNascimento: "19/10/1987",
    estadoCivil: "Casado",
    profissao: "Autônomo(a)",
    nacionalidade: "Brasileiro",
    endereco: "Rua Ouro Minas, 62, Padre Miguel, Santa Luzia/MG, CEP 33082012",
    valorTotal: 46446.75,
    valorPago: 615.99,
    entradas: [
      { descricao: "Depósito/transferência eletrônica (R$ 382,66 intermediação)", valor: 382.66 },
      { descricao: "Cartão crédito Cielo (R$ 233,33 intermediação)", valor: 233.33 }
    ],
    formaPagamentoEntrada: "Intermediação R$ 6.160: 1x R$ 382,66 depósito/transferência + 1x R$ 233,33 cartão crédito Cielo + 9x R$ 616 boleto (Cobrança W Palmerston) | Preço cota R$ 46.446,75: 4x R$ 50 boleto (1ª 15/09/2026) + 88x R$ 525,53 boleto (1ª 20/01/2027)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-17",
    telefone: "(31) 99280-8902",
    email: "jacksonsantosc1@gmail.com",
    conjuge: {
      nome: "Priscila Soares Cardoso",
      cpf: "103.403.376-05",
      rg: "MG16897852 PC/MG"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/190-jackson-santos-cardoso-m201-cota17--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 615,99 — depósito R$ 382,66 + cartão crédito Cielo R$ 233,33 (intermediação).\n" +
      "Boletos intermediação 9x R$ 616 (Cobrança W Palmerston) — sem vencimento no contrato.\n" +
      "Parcelas cota: 4x R$ 50 boleto (1ª 15/09/2026) + 88x R$ 525,53 boleto (1ª 20/01/2027).\n" +
      "FORA DO PRAZO — contrato 17/08/2026, prazo arrependimento venceu 24/08/2026.\n" +
      "GSign: 3E3IZL8E8M-P2ALR1A-WSILIC399JHQJB-Z10A0.\n" +
      "Bloco M, Apto 201, Cota 17. 3 semanas/ano. Não conheceu o empreendimento.\n" +
      "Casado (comunhão parcial). Nasc 19/10/1987.\n" +
      "Cônjuge: Priscila Soares Cardoso, CPF 103.403.376-05, nasc 21/02/1992, gerente.\n" +
      "Náutico Praia Clube: Nº 07-M201/05.\n" +
      "End: Rua Ouro Minas, 62, Padre Miguel, Santa Luzia/MG, CEP 33082012."
  },

  // ── Ficha 191 ── Ana Paula Oliveira Saraiva — Salinas Beach Resort Bl 01/0307/Cota 14 ──
  {
    id: 191,
    nome: "Ana Paula Oliveira Saraiva",
    cpf: "671.613.082-91",
    rg: "2793477 PC/PA",
    nascimento: "1980-06-09",
    estadoCivil: "Casado(a)",
    profissao: "Autônoma (Loja de Cosméticos)",
    empresa: "GAV",
    empreendimento: "Salinas Beach Resort",
    cidade: "Salinópolis/PA",
    bloco: "01",
    unidade: "0307",
    andar: "3",
    cota: "14",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 37305.27,
    precoIntermediacao: 3990.00,
    precoTotal: 37305.27,
    valorPago: 3990.00,
    entradas: [
      { descricao: "Corretagem — cartão crédito Master à vista", valor: 1000.00 },
      { descricao: "Corretagem — boleto 4x R$ 747,50", valor: 2990.00 }
    ],
    formaPagamentoEntrada: "Cartão Crédito Master à Vista R$ 1.000,00 + Boleto 4x R$ 747,50 (R$ 2.990,00)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2024-11-10",
    telefone: "(91) 98137-1061",
    email: "anapaula680@hotmail.com",
    conjuge: {
      nome: "Gilmar Barros da Silva",
      cpf: "671.080.832-72",
      rg: "3193930 PC/PA"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/191-ana-paula-oliveira-saraiva--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.990,00 (corretagem) — cartão crédito Master à vista R$ 1.000 (doc 16660798) + boleto 4x R$ 747,50 = R$ 2.990 (1º venc. 15/01/2025).\n" +
      "Boletos da corretagem: todos com vencimento até ~abr/2025. Regra boleto = só o quitado — confirmar quitação se necessário.\n" +
      "Sinal de Negócio R$ 1.865,27 em 4 parcelas de R$ 466,32 (1ª 15/05/2025) — forma de pagamento não especificada no contrato. NÃO incluído no valorPago.\n" +
      "Saldo Devedor R$ 31.450,00 em 68 parcelas de R$ 462,50 (1ª 15/09/2025) — NÃO incluído no valorPago.\n" +
      "FORA DO PRAZO — contrato 10/11/2024, prazo arrependimento venceu 17/11/2024.\n" +
      "D4Sign: 4ffc60bd-7727-4e83-92be-ee27f1c421a6. Assinatura presencial 10/11/2024 em Salinópolis/PA.\n" +
      "Empreendimento: Salinas Beach Resort, ROD. PA 144, Quadra 152, Salinópolis/PA, CEP 68721-000.\n" +
      "Torre Bloco 1, 3º andar, Apto 0307, Cota 14. 1 quarto. Área privativa 30m², comum 31,268m², total 61,268m².\n" +
      "Cônjuge: Gilmar Barros da Silva, CPF 671.080.832-72, RG 3193930 PC/PA, professor, nasc 28/04/1980, tel (91) 98138-6418.\n" +
      "End: Passagem Ana Cristina, 84, Residência Casa 02, Águas Brancas, Ananindeua/PA, CEP 67033680."
  },

  // ── Ficha 192 ── Mariliza Silva — Areya Barra Resort Bl 01/226/Cota 13 ──
  {
    id: 192,
    nome: "Mariliza Silva",
    cpf: "574.545.236-68",
    rg: "57454523668 PCMG/MG",
    nascimento: "1966-12-31",
    estadoCivil: "União Estável",
    profissao: "Bancária",
    empresa: "GAV",
    empreendimento: "Areya Barra Resort",
    cidade: "Barra de São Miguel/AL",
    bloco: "01",
    unidade: "226",
    andar: "2",
    cota: "13",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 52884.22,
    precoIntermediacao: 3990.00,
    precoTotal: 52884.22,
    valorPago: 1200.00,
    entradas: [
      { descricao: "Corretagem — cartão crédito Elo à vista", valor: 1200.00 }
    ],
    formaPagamentoEntrada: "Cartão Crédito Elo à Vista R$ 1.200,00 + Boleto 3x R$ 930,00 (R$ 2.790,00 — 1º venc. 20/11/2026, NÃO vencidos)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-20",
    telefone: "(31) 98874-6647",
    email: "marilizasilva@yahoo.com.br",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/192-mariliza-silva--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "DENTRO DO PRAZO — contrato 20/09/2026, prazo arrependimento vence 27/09/2026.\n" +
      "VALOR PAGO = R$ 1.200,00 — cartão crédito Elo à vista (final 2117, CV 18764108, Laranjinha Itaú, 20/09/2026 11h15, aprovado com senha).\n" +
      "Boletos corretagem 3x R$ 930 = R$ 2.790 (1º venc. 20/11/2026) — NÃO vencidos, NÃO incluídos no valorPago.\n" +
      "Sinal de Negócio R$ 2.644,22 em 4 parcelas de R$ 661,06 (1ª 10/02/2027) — NÃO incluído no valorPago.\n" +
      "Saldo Devedor R$ 46.250,00 em 74 parcelas de R$ 625,00 (1ª 10/06/2027) — NÃO incluído no valorPago.\n" +
      "ATENÇÃO: RG no contrato (57454523668) é idêntico ao CPF — provável erro de digitação no campo Identidade.\n" +
      "Estado civil: União estável, mas cônjuge NÃO INFORMADO no contrato.\n" +
      "ZapSign: 85c4fa19-021f-4165-b444-27eb0a00ca8f. Assinatura 20/09/2026 12:27:24, Marechal Deodoro/AL.\n" +
      "Consultora: Barbara Vitoria Conegundes de Souza.\n" +
      "Empreendimento: Areya Barra Resort, Av. Moema Cavalcante Bastos 23, Barra Mar, Barra de São Miguel/AL, CEP 57180-000.\n" +
      "Bloco 01, 2º andar, Apto 226, Cota 13. 1 quarto. Área privativa 34,01m², comum 39,71m², total 73,72m².\n" +
      "Contrato nº 360915. Vendedora: GAV Barra de São Miguel Empreendimento Imobiliário SPE LTDA (CNPJ 45.298.124/0001-33).\n" +
      "End: Rua Pouso Alegre, 2495, Ap 403, Horto, Belo Horizonte/MG, CEP 31015025."
  },

  // ── Ficha 193 ── Pedro Henrique Teixeira Silva — Jeriquiá Lagoa Resort Bl 03/007/Cota 18 ──
  {
    id: 193,
    nome: "Pedro Henrique Teixeira Silva",
    cpf: "069.330.776-59",
    rg: "MG14441637 SSP/MG",
    nascimento: "1984-06-25",
    estadoCivil: "Casado(a)",
    profissao: "Motorista",
    empresa: "GAV",
    empreendimento: "Jeriquiá Lagoa Resort",
    cidade: "Cruz/CE",
    bloco: "03",
    unidade: "007",
    andar: "0",
    cota: "18",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    precoCota: 52387.79,
    precoIntermediacao: 3990.00,
    precoTotal: 52387.79,
    valorPago: 1000.00,
    entradas: [
      { descricao: "Corretagem — PIX", valor: 1000.00 }
    ],
    formaPagamentoEntrada: "PIX R$ 1.000,00 + Boleto 5x R$ 598,00 (R$ 2.990,00 — 1º venc. 11/10/2026, NÃO vencidos)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-11",
    telefone: "(31) 99909-5460",
    email: "bethaniafisiotavares@yahoo.com.br",
    conjuge: {
      nome: "",
      cpf: "",
      rg: ""
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/193-pedro-henrique-teixeira-silva--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "FORA DO PRAZO — contrato 11/09/2026, prazo arrependimento venceu 18/09/2026.\n" +
      "VALOR PAGO = R$ 1.000,00 — PIX (Laranjinha Itaú, JERI1 BEACH, CV 181823898, 11/09/2026 13h23, ID RESN5161620917867706ZY6HPB2A281788).\n" +
      "Boletos corretagem 5x R$ 598 = R$ 2.990 (1º venc. 11/10/2026) — NÃO vencidos, NÃO incluídos no valorPago.\n" +
      "Sinal de Negócio R$ 2.619,39 em 4 parcelas de R$ 654,85 (1ª 10/03/2027) — NÃO incluído no valorPago.\n" +
      "Saldo Devedor R$ 45.778,40 em 80 parcelas de R$ 572,23 (1ª 10/07/2027) — NÃO incluído no valorPago.\n" +
      "Estado civil: Casado, mas cônjuge NÃO INFORMADO no contrato.\n" +
      "ZapSign: 1a7f5b37-1448-408f-b6bb-6a7b2687bf70. Assinatura 11/09/2026 14:55:24, Pipa/RN.\n" +
      "Consultor: Lyjorsson Palhares.\n" +
      "Contrato nº 359507. Vendedora: JERI 1 Empreendimento Imobiliário SPE LTDA (CNPJ 33.578.977/0001-40).\n" +
      "Bloco 03, térreo, Apto 007, Cota 18. 1 quarto. Área privativa 35,29m², comum 62,78m², total 98,07m².\n" +
      "End: Rua Minas Gerais, 637, Apto 401, Celvia, Vespasiano/MG, CEP 33200606."
  },

  // ── Ficha 187 ── Lucas Vinicius Ferrreira de Lima — Solar das Águas Park Resort Bl D/1005/Cota 13.2 (movida pro final) ──
  {
    id: "sapr-lucas-vinicius-d-1005-cota-132",
    vispiId: "",
    nContrato: "",
    empresa: "WAM",
    empreendimento: "Solar das Águas Park Resort",
    cidade: "Olímpia/SP",
    bloco: "D",
    unidade: "1005",
    cota: "13.2",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Lucas Vinicius Ferrreira de Lima",
    cpf: "427.841.068-96",
    rg: "368595250 SSP/SP",
    dataNascimento: "07/06/1996",
    estadoCivil: "Casado",
    profissao: "Motorista(a)",
    nacionalidade: "Brasileiro",
    endereco: "Rua Baltazar Nunes, 467, Vila Carmosina, São Paulo/SP, CEP 08290220",
    valorTotal: 33390.62,
    valorPago: 6311.00,
    entradas: [
      { descricao: "Corretagem — dinheiro", valor: 800.00 },
      { descricao: "Corretagem — TED/DOC/depósito", valor: 1200.00 },
      { descricao: "Corretagem — cartão crédito Elo 8x R$ 538,87", valor: 4311.00 }
    ],
    formaPagamentoEntrada: "Dinheiro R$ 800 + TED/DOC/Depósito R$ 1.200 + Cartão Crédito Elo 8x R$ 538,87 (R$ 4.311)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-02-20",
    telefone: "(11) 96637-3433",
    email: "lucaspalio.31@gmail.com",
    conjuge: {
      nome: "Kathleen Soares Ferreira Santos",
      cpf: "409.794.518-17",
      rg: "374815732 SSP/SP"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/187-lucas-vinicius-ferrreira-de-lima--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 6.311,00 (corretagem/sinal) — dinheiro R$ 800 + TED/DOC/depósito R$ 1.200 + cartão crédito Elo 8x R$ 538,87 = R$ 4.311.\n" +
      "Dados de pagamento extraídos da PROPOSTA WAM (última página do PDF), não do quadro-resumo do contrato (que estava em branco).\n" +
      "Preço total de venda: R$ 39.701,62 (sinal/corretagem R$ 6.311 + saldo R$ 33.390,62).\n" +
      "FORA DO PRAZO — contrato 20/02/2026, prazo arrependimento venceu 27/02/2026.\n" +
      "GSign ID: O19RSY4SO2-6T3GBXV-QXXWUSTT6NXGLL-33M7E.\n" +
      "Bloco D, Pav 10, Apto 1005, Cota 13.2. 1 quarto. 1 semana/ano.\n" +
      "Casado (comunhão parcial). Nasc 07/06/1996. Profissão: motorista.\n" +
      "Cônjuge: Kathleen Soares Ferreira Santos, CPF 409.794.518-17, nasc 17/05/1998.\n" +
      "ATENÇÃO: nome no contrato grafado 'FERRREIRA' (3 R) — possível erro.\n" +
      "Parcelas: 7x R$ 150 (a partir 15/04/2026) + 60x R$ 539,01 (a partir 15/11/2026).\n" +
      "Corretor: Jose Roberto Domenico (CRECI).\n" +
      "End: Rua Baltazar Nunes, 467, Vila Carmosina, São Paulo/SP, CEP 08290220."
  },

  // ── Ficha 194 ── Erikes Vianna Honorato — Hotel Fazenda China Park Apto 233/Cota 14 ──
  {
    id: "hfcp-erikes-vianna-233-cota-14",
    vispiId: "",
    nContrato: "",
    empresa: "Chalé",
    razaoSocial: "CHALE CONSTRUTORA E INCORPORADORA LTDA",
    cnpj: "04.733.546/0001-02",
    empreendimento: "Hotel Fazenda China Park",
    localizacao: "Domingos Martins/ES",
    cidade: "Domingos Martins/ES",
    bloco: "",
    unidade: "233",
    cota: "14",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Erikes Vianna Honorato",
    cpf: "174.914.927-38",
    rg: "3825499-ES SESP/ES",
    dataNascimento: "30/07/1997",
    estadoCivil: "Casado",
    profissao: "Empresário",
    nacionalidade: "Brasileiro",
    endereco: "Rua Alcides Simões, 50, Camurugi, Guarapari/ES, CEP 29210342",
    valorTotal: 50820.00,
    valorPago: 3300.00,
    entradas: [
      { descricao: "Corretagem — cartão crédito (Cielo)", valor: 3300.00 }
    ],
    formaPagamentoEntrada: "Cartão Crédito (Cielo) — 3x R$ 500 + 1x R$ 266,68 + 2x R$ 266,66 + 1x R$ 333,34 + 2x R$ 333,33 = R$ 3.300",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2022-04-17",
    telefone: "(27) 99885-5383 / (27) 99689-2430",
    email: "Erikesvianna@gmail.com",
    conjuge: {
      nome: "Shirley de Souza da Silva Honorato",
      cpf: "147.959.217-09",
      rg: "3545428-ES SESP/ES"
    },
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/194-erikes-vianna-honorato--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.300,00 (corretagem/sinal) — todo via cartão de crédito (Cielo), parcelado em múltiplas transações.\n" +
      "Empresa vendedora: CHALE CONSTRUTORA E INCORPORADORA LTDA (CNPJ 04.733.546/0001-02) — NÃO é GAV nem WAM.\n" +
      "Empreendimento: Hotel Fazenda China Park / Condomínio Chalé 2.\n" +
      "Preço total de venda: R$ 50.820,00 (entrada/corretagem R$ 3.300 + saldo R$ 47.520).\n" +
      "FORA DO PRAZO — contrato 17/04/2022, prazo arrependimento venceu 24/04/2022.\n" +
      "DocuSign Envelope ID: D54CC8DC-E1CC-4E19-B97F-322A78ADF739.\n" +
      "Apartamento 233, Fração/Cota 14. 26 cotas por apartamento. Diária(s): 14.\n" +
      "Fração ideal: 0,0013 (38,12 m²). Área privativa: 1,466153. Tipo: Unidade.\n" +
      "Casado. Nasc 30/07/1997. Profissão: empresário.\n" +
      "Cônjuge: Shirley de Souza da Silva Honorato, CPF 147.959.217-09, RG 3545428-ES, nasc 30/06/1993, empresária.\n" +
      "Parcelas fidelização: 3x R$ 50 (a partir 15/05/2022). Saldo: 96x R$ 493,44 (a partir 15/08/2022).\n" +
      "Corretora: Silva Dalvi de Abreu (CRECI 010108-P).\n" +
      "Beneficiário corretagem: W7 Brasil Negócios Inteligentes LTDA (CNPJ 26.649.045/0003-47).\n" +
      "E-mails: Erikesvianna@gmail.com / Shirleyecaiosilva@gmail.com.\n" +
      "End: Rua Alcides Simões, 50, Camurugi, Guarapari/ES, CEP 29210342."
  },

  // ── Ficha 195 ── Lucas Francisco Pinheiro — Hotel Dom Pedro Laguna Bl 01/205/Cota 03 ──
  {
    id: "dpl-lucas-francisco-01-205-cota-03",
    vispiId: "",
    nContrato: "02-01.205/03",
    empresa: "WAM",
    razaoSocial: "CONSÓRCIO DOM PEDRO LAGUNA",
    cnpj: "43.740.923/0001-92",
    empreendimento: "Hotel Dom Pedro Laguna",
    localizacao: "Aquiraz/CE",
    cidade: "Aquiraz/CE",
    bloco: "01",
    unidade: "205",
    cota: "03",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Lucas Francisco Pinheiro",
    cpf: "438.211.258-37",
    rg: "40576913 SSP/SP",
    dataNascimento: "07/11/1995",
    estadoCivil: "Solteiro",
    profissao: "Empresário",
    nacionalidade: "Brasileiro",
    endereco: "Rua Ítalo Primo Bellini, 302, Jardim Florestal, Jundiaí/SP, CEP 13215660",
    valorTotal: 25746.94,
    valorPago: 3140.00,
    entradas: [
      { descricao: "Corretagem — depósito bancário/transferência eletrônica", valor: 3140.00 }
    ],
    formaPagamentoEntrada: "Depósito Bancário / Transferência Eletrônica 1x R$ 3.140,00",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-08-09",
    telefone: "(11) 94735-8059",
    email: "DIAMONDCOMPONENTES@GMAIL.COM",
    conjuge: null,
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/195-lucas-francisco-pinheiro--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 3.140,00 (corretagem) — depósito bancário/transferência eletrônica.\n" +
      "Contrato de CESSÃO DE DIREITO DE USO (CDU) — time-share por 10 anos, NÃO é multipropriedade.\n" +
      "Cedente: Consórcio Dom Pedro Laguna (CNPJ 43.740.923/0001-92), representado por Dom Pedro Laguna Resort Empreendimentos Imobiliários Ltda (CNPJ 41.928.634/0001-96).\n" +
      "Preço total: R$ 25.746,94 (CDU R$ 22.606,94 + corretagem R$ 3.140).\n" +
      "Saldo devedor: 98x R$ 230,68 (primeira parcela 20/09/2026).\n" +
      "FORA DO PRAZO — contrato 09/08/2026, prazo arrependimento venceu 16/08/2026.\n" +
      "GSign ID: 1RLUIVP29P-YQGQT72-FIAOTUV16V8ZSB-I45KA.\n" +
      "CDU: Bloco 01 / 205 / Cota 03. Tipo: Deluxe 1Q (1 quarto, 1 banheiro, 1 varanda).\n" +
      "Período de vigência: 10 anos. 1 semana/ano (7 dias consecutivos).\n" +
      "Solteiro. Nasc 07/11/1995. Profissão: empresário.\n" +
      "Taxa anual de serviços e manutenção: R$ 1.300,00/ano.\n" +
      "Beneficiária corretagem: W7 Brasil Negócios Inteligentes Ltda.\n" +
      "Inclui Termo de Adesão WAM Pass (empreendimento: DPL TIMESHARE).\n" +
      "Corretora: Sara Melo (CRECI).\n" +
      "End: Rua Ítalo Primo Bellini, 302, Jardim Florestal, Jundiaí/SP, CEP 13215660."
  },

  // ── Ficha 196 ── Everton Jaques Canhestro — Ondas Praia Resort Bl A / A211 / Cota 04 ──
  {
    id: "316137-everton-jaques-opr-a-a211-cota-04",
    vispiId: "",
    nContrato: "316137",
    empresa: "WAM",
    razaoSocial: "SPE PORTO SEGURO 02 EMPREENDIMENTOS IMOBILIÁRIOS S.A.",
    cnpj: "22.059.167/0001-60",
    empreendimento: "Ondas Praia Resort",
    localizacao: "Porto Seguro/BA",
    cidade: "Porto Seguro/BA",
    bloco: "A",
    unidade: "A211",
    cota: "04",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Everton Jaques Canhestro",
    cpf: "582.587.366-04",
    rg: "03860199775 - SSPMG",
    dataNascimento: "03/07/1965",
    estadoCivil: "Casado",
    profissao: "Supervisor Administrativo",
    nacionalidade: "Brasileiro",
    endereco: "",
    valorTotal: 70983.17,
    valorPago: 660.00,
    entradas: [
      { descricao: "Corretagem — cartão de crédito Cielo", valor: 660.00 }
    ],
    formaPagamentoEntrada: "Cartão de Crédito 1x R$ 660,00 (Cielo) + Boleto 5x R$ 1.092,00 (W Palmerston)",
    formaReembolso: "Estorno Cartão",
    dataAssinatura: "2026-09-18",
    telefone: "(31) 98107-0585",
    email: "DENIZEDIASCANHESTRO@HOTMAIL.COM",
    conjuge: null,
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/196-everton-jaques-canhestro--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 660,00 (corretagem) — cartão de crédito Cielo.\n" +
      "Corretagem total R$ 6.120,00: 1x R$ 660 cartão crédito + 5x R$ 1.092 boleto (W Palmerston).\n" +
      "Vendedora: SPE Porto Seguro 02 Empreendimentos Imobiliários S.A. (CNPJ 22.059.167/0001-60).\n" +
      "Intermediadora: WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Preço total: R$ 70.983,17 (cota R$ 64.863,17 + corretagem R$ 6.120,00).\n" +
      "Saldo devedor cota: 5x R$ 50,00 (boleto, 15/10/2026) + 96x R$ 673,05 (boleto, 20/03/2027).\n" +
      "DENTRO DO PRAZO — contrato 18/09/2026, prazo arrependimento vence 25/09/2026.\n" +
      "GSign ID: ZDS8J7I2ZV-BN9JOTZ-QKGEFR44AYXNIH-DX09A.\n" +
      "Bloco A / Unidade A211 / Cota 04. 2 semanas de uso por ano.\n" +
      "CASADO (comunhão parcial de bens) — cônjuge não consta no contrato.\n" +
      "ATENÇÃO: nome do arquivo diz 'SOLTEIRO' mas contrato diz CASADO.\n" +
      "Endereço não consta no quadro-resumo do contrato.\n" +
      "Nasc 03/07/1965. Profissão: Supervisor Administrativo.\n" +
      "Tel: (31) 98107-0585. E-mail: DENIZEDIASCANHESTRO@HOTMAIL.COM."
  },

  // ── Ficha 197 ── Brenda Mota da Costa Mattos — Búzios Fractional Resort Bl 19 / 19104 / Cota 25 ──
  {
    id: "315421-brenda-mota-bfr-19-19104-cota-25",
    vispiId: "",
    nContrato: "315421",
    empresa: "WAM",
    razaoSocial: "W50 EMPREENDIMENTOS IMOBILIARIOS LTDA.",
    cnpj: "33.770.634/0001-82",
    empreendimento: "Búzios Fractional Resort",
    localizacao: "Armação dos Búzios/RJ",
    cidade: "Armação dos Búzios/RJ",
    bloco: "19",
    unidade: "19104",
    cota: "25",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Brenda Mota da Costa Mattos",
    cpf: "188.966.497-90",
    rg: "0 - Detran RJ",
    dataNascimento: "29/08/2000",
    estadoCivil: "Solteiro",
    profissao: "Autônomo(a)",
    nacionalidade: "Brasileiro",
    endereco: "",
    valorTotal: 60376.79,
    valorPago: 504.00,
    entradas: [
      { descricao: "Corretagem — depósito bancário/transferência eletrônica", valor: 504.00 }
    ],
    formaPagamentoEntrada: "Depósito Bancário/Transferência Eletrônica 1x R$ 504,00 + Boleto 5x R$ 907,20 (W Palmerston)",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-13",
    telefone: "(22) 99982-7211",
    email: "brendamattos2808@gmail.com",
    conjuge: null,
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/197-brenda-mota-da-costa-mattos--contrato.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 504,00 (corretagem) — depósito bancário/transferência eletrônica.\n" +
      "Corretagem total R$ 5.040,00: 1x R$ 504 depósito/transferência + 5x R$ 907,20 boleto (W Palmerston).\n" +
      "Vendedora: W50 Empreendimentos Imobiliários Ltda. (CNPJ 33.770.634/0001-82).\n" +
      "Intermediadora: WAM Comercialização S.A. (CNPJ 17.919.649/0001-03).\n" +
      "Preço total: R$ 60.376,79 (cota R$ 55.336,79 + corretagem R$ 5.040,00).\n" +
      "Saldo devedor cota: 6x R$ 50,00 (boleto, 15/10/2026) + 96x R$ 573,30 (boleto, 20/04/2027).\n" +
      "FORA DO PRAZO — contrato 13/09/2026, prazo arrependimento venceu 20/09/2026.\n" +
      "GSign ID: M9HB7OBD6L-2WNX94X-BPMSJJ7SUAQJ33-P1GDV.\n" +
      "Bloco 19 / Unidade 19104 / Cota 25. 2 semanas de uso por ano.\n" +
      "Solteira. Nasc 29/08/2000. Profissão: Autônoma.\n" +
      "RG consta como '0 - Detran RJ' no contrato.\n" +
      "Endereço não consta no quadro-resumo do contrato.\n" +
      "Sala de venda: Armação de Búzios - Búzios Beach Resort.\n" +
      "Consultora: Hadassa Taysa Rodrigues da Silva.\n" +
      "Tel: (22) 99982-7211. E-mail: brendamattos2808@gmail.com."
  },

  // ── Ficha 198 ── Marlussi Scarsi Panato — Gran Garden Resort Bl C2 / 105A / Cota 01 ──
  {
    id: "ggr-marlussi-c2-105a-cota-01",
    vispiId: "",
    nContrato: "361046",
    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA.",
    cnpj: "50.094.155/0001-02",
    empreendimento: "Gran Garden Resort",
    localizacao: "Gramado/RS",
    cidade: "Gramado/RS",
    bloco: "C2",
    unidade: "105A",
    cota: "01",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Marlussi Scarsi Panato",
    cpf: "059.643.709-93",
    rg: "4874283 SSP/SC",
    dataNascimento: "17/02/1988",
    estadoCivil: "Casado(a)",
    profissao: "Empresário(a)",
    nacionalidade: "Brasileiro(a)",
    endereco: "Rua Alfredo Pessi, SN, Centro, Nova Veneza/SC, CEP 88865-000",
    valorTotal: 50744.84,
    valorPago: 1000.00,
    entradas: [
      { descricao: "Corretagem — PIX", valor: 1000.00 }
    ],
    formaPagamentoEntrada: "PIX 1x R$ 1.000,00 + Boleto 5x R$ 698,00",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-20",
    telefone: "(48) 99944-5749",
    email: "marlussipanatto3@gmail.com",
    conjuge: null,
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/198-marlussi-scarsi-panato--contrato-c2-105a-cota01.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (corretagem) — PIX.\n" +
      "Corretagem total R$ 4.490,00: 1x R$ 1.000 PIX + 5x R$ 698 boleto.\n" +
      "Sinal de Negócio: R$ 2.537,24 (4x R$ 634,31, venc. 10/03/2027).\n" +
      "Saldo: R$ 43.717,60 (80x R$ 546,47, venc. 10/07/2027).\n" +
      "DENTRO DO PRAZO — contrato 20/09/2026, prazo vence 27/09/2026.\n" +
      "Contrato 1 de 4 (mesma pessoa). PIX Nº Doc: RESN9712060093 / ADB8378.\n" +
      "Comprovante PIX R$ 1.000 em 20/09/2026 (extrato Caixa Ag 4878 Cc 581924979-4).\n" +
      "Casada — cônjuge não informado no contrato.\n" +
      "ZapSign: c57487ea-38dc-49e3-803a-d7db1fb817d6."
  },

  // ── Ficha 199 ── Marlussi Scarsi Panato — Gran Garden Resort Bl C3 / 01B / Cota 10 ──
  {
    id: "ggr-marlussi-c3-01b-cota-10",
    vispiId: "",
    nContrato: "361045",
    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA.",
    cnpj: "50.094.155/0001-02",
    empreendimento: "Gran Garden Resort",
    localizacao: "Gramado/RS",
    cidade: "Gramado/RS",
    bloco: "C3",
    unidade: "01B",
    cota: "10",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Marlussi Scarsi Panato",
    cpf: "059.643.709-93",
    rg: "4874283 SSP/SC",
    dataNascimento: "17/02/1988",
    estadoCivil: "Casado(a)",
    profissao: "Empresário(a)",
    nacionalidade: "Brasileiro(a)",
    endereco: "Rua Alfredo Pessi, SN, Centro, Nova Veneza/SC, CEP 88865-000",
    valorTotal: 51701.47,
    valorPago: 1000.00,
    entradas: [
      { descricao: "Corretagem — PIX", valor: 1000.00 }
    ],
    formaPagamentoEntrada: "PIX 1x R$ 1.000,00 + Boleto 5x R$ 698,00",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-20",
    telefone: "(48) 99944-5749",
    email: "marlussipanatto3@gmail.com",
    conjuge: null,
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/199-marlussi-scarsi-panato--contrato-c3-01b-cota10.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (corretagem) — PIX.\n" +
      "Corretagem total R$ 4.490,00: 1x R$ 1.000 PIX + 5x R$ 698 boleto.\n" +
      "Sinal de Negócio: R$ 2.585,07 (4x R$ 646,27, venc. 10/03/2027).\n" +
      "Saldo: R$ 44.626,40 (80x R$ 557,83, venc. 10/07/2027).\n" +
      "DENTRO DO PRAZO — contrato 20/09/2026, prazo vence 27/09/2026.\n" +
      "Contrato 2 de 4 (mesma pessoa). PIX Nº Doc: RESN9712060093 / 09EB5FA.\n" +
      "ATENÇÃO: Nº Doc PIX idêntico nos contratos 2, 3 e 4 — conferir se foi 1 PIX rateado ou separados.\n" +
      "Comprovante PIX R$ 3.000 em 21/09/2026 (Conta Poupança, doc 92.101) cobre contratos 2-4.\n" +
      "Casada — cônjuge não informado no contrato.\n" +
      "ZapSign: a88db773-f068-403c-9720-8db0931b6927."
  },

  // ── Ficha 200 ── Marlussi Scarsi Panato — Gran Garden Resort Bl C2 / 05A / Cota 05 ──
  {
    id: "ggr-marlussi-c2-05a-cota-05",
    vispiId: "",
    nContrato: "361044",
    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA.",
    cnpj: "50.094.155/0001-02",
    empreendimento: "Gran Garden Resort",
    localizacao: "Gramado/RS",
    cidade: "Gramado/RS",
    bloco: "C2",
    unidade: "05A",
    cota: "05",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Marlussi Scarsi Panato",
    cpf: "059.643.709-93",
    rg: "4874283 SSP/SC",
    dataNascimento: "17/02/1988",
    estadoCivil: "Casado(a)",
    profissao: "Empresário(a)",
    nacionalidade: "Brasileiro(a)",
    endereco: "Rua Alfredo Pessi, SN, Centro, Nova Veneza/SC, CEP 88865-000",
    valorTotal: 51701.47,
    valorPago: 1000.00,
    entradas: [
      { descricao: "Corretagem — PIX", valor: 1000.00 }
    ],
    formaPagamentoEntrada: "PIX 1x R$ 1.000,00 + Boleto 5x R$ 698,00",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-20",
    telefone: "(48) 99944-5749",
    email: "marlussipanatto3@gmail.com",
    conjuge: null,
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/200-marlussi-scarsi-panato--contrato-c2-05a-cota05.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (corretagem) — PIX.\n" +
      "Corretagem total R$ 4.490,00: 1x R$ 1.000 PIX + 5x R$ 698 boleto.\n" +
      "Sinal de Negócio: R$ 2.585,07 (4x R$ 646,27, venc. 10/03/2027).\n" +
      "Saldo: R$ 44.626,40 (80x R$ 557,83, venc. 10/07/2027).\n" +
      "DENTRO DO PRAZO — contrato 20/09/2026, prazo vence 27/09/2026.\n" +
      "Contrato 3 de 4 (mesma pessoa). PIX Nº Doc: RESN9712060093 / 09EB5FA.\n" +
      "ATENÇÃO: Nº Doc PIX idêntico nos contratos 2, 3 e 4.\n" +
      "Casada — cônjuge não informado no contrato.\n" +
      "ZapSign: c05b1ed3-a6e3-4f43-9098-db5fb75cf113."
  },

  // ── Ficha 201 ── Marlussi Scarsi Panato — Gran Garden Resort Bl C2 / 02A / Cota 06 ──
  {
    id: "ggr-marlussi-c2-02a-cota-06",
    vispiId: "",
    nContrato: "361043",
    empresa: "GAV",
    razaoSocial: "GAV GRAMADO TRÊS EMPREENDIMENTO IMOBILIÁRIO SPE LTDA.",
    cnpj: "50.094.155/0001-02",
    empreendimento: "Gran Garden Resort",
    localizacao: "Gramado/RS",
    cidade: "Gramado/RS",
    bloco: "C2",
    unidade: "02A",
    cota: "06",
    fracao: "1/52",
    checkIn: "",
    checkOut: "",
    nome: "Marlussi Scarsi Panato",
    cpf: "059.643.709-93",
    rg: "4874283 SSP/SC",
    dataNascimento: "17/02/1988",
    estadoCivil: "Casado(a)",
    profissao: "Empresário(a)",
    nacionalidade: "Brasileiro(a)",
    endereco: "Rua Alfredo Pessi, SN, Centro, Nova Veneza/SC, CEP 88865-000",
    valorTotal: 51701.47,
    valorPago: 1000.00,
    entradas: [
      { descricao: "Corretagem — PIX", valor: 1000.00 }
    ],
    formaPagamentoEntrada: "PIX 1x R$ 1.000,00 + Boleto 5x R$ 698,00",
    formaReembolso: "Reembolso",
    dataAssinatura: "2026-09-20",
    telefone: "(48) 99944-5749",
    email: "marlussipanatto3@gmail.com",
    conjuge: null,
    arquivos: [
      { titulo: "Contrato", arquivo: "contratos-pdf/201-marlussi-scarsi-panato--contrato-c2-02a-cota06.pdf" }
    ],
    pix: "",
    observacoes:
      "VALOR PAGO = R$ 1.000,00 (corretagem) — PIX.\n" +
      "Corretagem total R$ 4.490,00: 1x R$ 1.000 PIX + 5x R$ 698 boleto.\n" +
      "Sinal de Negócio: R$ 2.585,07 (4x R$ 646,27, venc. 10/03/2027).\n" +
      "Saldo: R$ 44.626,40 (80x R$ 557,83, venc. 10/07/2027).\n" +
      "DENTRO DO PRAZO — contrato 20/09/2026, prazo vence 27/09/2026.\n" +
      "Contrato 4 de 4 (mesma pessoa). PIX Nº Doc: RESN9712060093 / 09EB5FA.\n" +
      "ATENÇÃO: Nº Doc PIX idêntico nos contratos 2, 3 e 4.\n" +
      "Casada — cônjuge não informado no contrato."
  }
];
