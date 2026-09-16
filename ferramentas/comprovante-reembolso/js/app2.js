$(document).ready(function() {

  const selectEmpreendimento = $('#empreendimento');
  const selectForma = $('#forma');
  const selectStatus = $('#status');
  const submitButton = $('#formReembolso button[type="submit"]');
  const botaoOriginal = submitButton.html();

  let protocoloAtual = '';

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2800,
    timerProgressBar: true
  });

  const empreendimentos = [
    'Areya Barra Resort', 'Beach GAV Resorts', 'Búzios Fractional Resort',
    'Condomínio Chalé', 'Dom Pedro Laguna', 'Encontro das Águas',
    'Exclusive GAV Resorts', 'GAV Vacation Club (Pontos)',
    'Gran Garden Resort', 'Gran Haus Resort', 'Gran Valley Resort',
    'Hotel Dom Pedro Laguna', 'Hotel Fazenda China Park',
    'Ilhas do Lago Eco Resort', 'Jeriquiá Dunas Resort', 'Jeriquiá Lagoa Resort',
    'Kawana Residence', 'Le Charmant Maison de Luxe',
    'Magic Home Residence Park', 'Mandala dos Pirineus Eco Village',
    'Oikos Maragogi Resort', 'Olímpia Park Resort', 'Ondas Praia Resort',
    'Park GAV Resorts', 'Porto 2 Life Resort', 'Porto Alto Resort',
    'Praias do Lago Eco Resort', 'Premium GAV Resorts', 'Pyrenéus Residence',
    'Refúgio das Lontras', 'Resort do Lago', 'Salinas Beach Resort',
    'Solar das Águas Park Resort', 'Terra Nova Ondas Resort',
    'Tree Bies Beach Resort', 'WVC Time Share', 'Outro (não listado)'
  ];
  $.each(empreendimentos, function(i, value) {
    selectEmpreendimento.append($('<option>', { value: value, text: value }));
  });

  $('#cpf').mask('000.000.000-00');
  $('#valor').mask('000.000.000,00', { reverse: true });

  // Conteúdo interno do SVG (viewBox 0 0 24 24)
  const ICONES = {
    check:   '<polyline points="4 12 10 18 20 6" stroke-linecap="round" stroke-linejoin="round"></polyline>',
    x:       '<line x1="7" y1="7" x2="17" y2="17" stroke-linecap="round"></line><line x1="17" y1="7" x2="7" y2="17" stroke-linecap="round"></line>',
    relogio: '<circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15 14" stroke-linecap="round" stroke-linejoin="round"></polyline>'
  };

  const VERDE = '#1a8a3f';

  const STATUS_CFG = {
    'Efetivado':        { fg: '#0B306B', bg: '#e8eef6', icone: 'check',   origem: 'Processamento concluído com sucesso.',        fluxo: 'Reembolso Finalizado',                fluxoIcone: 'check',   fluxoFg: VERDE,     rodape: 'O valor foi creditado na forma selecionada.' },
    'Aprovado':         { fg: '#0B306B', bg: '#e8eef6', icone: 'check',   origem: 'Solicitação aprovada pelo setor financeiro.', fluxo: 'Crédito Aprovado',                    fluxoIcone: 'check',   fluxoFg: VERDE,     rodape: 'O valor será creditado em breve.' },
    'Concluído':        { fg: '#0B306B', bg: '#e8eef6', icone: 'check',   origem: 'Processamento finalizado.',                   fluxo: 'Reembolso Concluído',                 fluxoIcone: 'check',   fluxoFg: VERDE,     rodape: 'O valor foi creditado na forma selecionada.' },
    'Estornado':        { fg: '#0B306B', bg: '#e8eef6', icone: 'check',   origem: 'Estorno processado com sucesso.',             fluxo: 'Estorno Finalizado',                  fluxoIcone: 'check',   fluxoFg: VERDE,     rodape: 'O valor foi estornado na forma original.' },
    'Em processamento': { fg: '#0d5bbf', bg: '#e7f0fb', icone: 'relogio', origem: 'Solicitação recebida pelo sistema.',          fluxo: 'Processamento em Andamento',          fluxoIcone: 'relogio', fluxoFg: '#0d5bbf', rodape: 'Aguardando conclusão do processamento.' },
    'Em análise':       { fg: '#a9720a', bg: '#fdf3e0', icone: 'relogio', origem: 'Solicitação em análise pelo setor financeiro.', fluxo: 'Análise Financeira',                fluxoIcone: 'relogio', fluxoFg: '#a9720a', rodape: 'Aguardando parecer do setor financeiro.' },
    'Pendente':         { fg: '#a9720a', bg: '#fdf3e0', icone: 'relogio', origem: 'Solicitação pendente de processamento.',      fluxo: 'Processamento Pendente',              fluxoIcone: 'relogio', fluxoFg: '#a9720a', rodape: 'Aguardando início do processamento.' },
    'Bloqueado':        { fg: '#c62828', bg: '#fdecec', icone: 'x',       origem: 'Falha técnica no sistema de pagamentos.',     fluxo: 'Procedimento de Regularização Financeira', fluxoIcone: 'check', fluxoFg: VERDE,  rodape: 'Aguardando execução do procedimento.' },
    'Negado':           { fg: '#c62828', bg: '#fdecec', icone: 'x',       origem: 'Solicitação negada pelo setor financeiro.',   fluxo: 'Reembolso Negado',                    fluxoIcone: 'x',       fluxoFg: '#c62828', rodape: 'Nenhum valor será creditado.' },
    'Cancelado':        { fg: '#5b6470', bg: '#f0f2f4', icone: 'x',       origem: 'Solicitação cancelada.',                      fluxo: 'Reembolso Cancelado',                 fluxoIcone: 'x',       fluxoFg: '#5b6470', rodape: 'Nenhum valor será creditado.' }
  };

  function hexParaRgba(hex, alpha) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function svgIcone(nome, cor, tamanho, sw) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${tamanho}" height="${tamanho}" fill="none" stroke="${cor}" stroke-width="${sw}" viewBox="0 0 24 24">${ICONES[nome]}</svg>`;
  }

  function aplicarStatus() {
    const status = selectStatus.val();
    const cfg = STATUS_CFG[status] || STATUS_CFG['Efetivado'];

    // Badge no topo
    $('#tkStatusBadgeTexto').text(status);
    $('#statusBadge').css({ 'background-color': cfg.bg, 'color': cfg.fg });

    // Círculo grande com o ícone do status
    $('#tkIconeCirculo').html(svgIcone(cfg.icone, '#ffffff', 34, 3)).css({
      'background-color': cfg.fg,
      'box-shadow': `0 0 0 6px ${hexParaRgba(cfg.fg, 0.12)}`
    });

    // Linha "Status atual"
    $('#tkStatusIconeSvg').html(svgIcone(cfg.icone, cfg.fg, 18, 2.5));
    $('#tkStatusTexto').text(status).css('color', cfg.fg);

    // Linha "Origem da ocorrência"
    $('#tkOrigem').text(cfg.origem);

    // Linha "Fluxo operacional disponível"
    $('#tkFluxoIconeSvg').html(svgIcone(cfg.fluxoIcone, cfg.fluxoFg, 18, 2.5));
    $('#tkFluxo').text(cfg.fluxo).css('color', cfg.fluxoFg);

    // Rodapé
    $('#tkRodape').text(cfg.rodape);
  }
  selectStatus.on('change', aplicarStatus);

  // --- Modo de edição de textos do comprovante ---
  const btnEditar = $('#btnEditarTextos');
  const $editaveis = $('.txt-edit');
  let modoEdicao = false;

  function setModoEdicao(ativo) {
    modoEdicao = ativo;
    $editaveis.attr('contenteditable', ativo ? 'true' : 'false').toggleClass('editavel', ativo);
    btnEditar.toggleClass('ativo', ativo)
      .html(ativo
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" class="me-1" viewBox="0 0 24 24" aria-hidden="true"><polyline points="4 12 10 18 20 6" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>Concluir edição'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" class="me-1" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9" stroke-linecap="round"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" stroke-linecap="round" stroke-linejoin="round"></path></svg>Editar textos');
    if (ativo) Toast.fire({ icon: 'info', title: 'Clique nos textos do comprovante para editar.' });
  }

  btnEditar.on('click', () => setModoEdicao(!modoEdicao));

  // Enter em textos de uma linha sai do campo em vez de quebrar (rótulos/status/etc.)
  $('.txt-edit').not('#tkRodape, #tkOrigem').on('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); this.blur(); }
  });

  // --- Campos condicionais por forma de reembolso ---
  selectForma.on('change', function() {
    $('.forma-campos').attr('hidden', true);
    const forma = selectForma.val();
    if (forma === 'PIX') $('#camposPix').removeAttr('hidden');
    else if (forma === 'Transferência bancária') $('#camposBanco').removeAttr('hidden');
  });

  // --- Utilitários ---
  function gerarProtocolo() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  // --- Validação ---
  $.validator.addMethod('nomeCompleto', function(value) {
    const partes = value.trim().split(/\s+/);
    return partes.length >= 2 && partes.every(p => p.length >= 2);
  }, 'Informe o nome completo do cliente.');

  $.validator.addMethod('valorPositivo', function(value) {
    const numero = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    return !isNaN(numero) && numero > 0;
  }, 'Informe um valor maior que zero.');

  $.extend($.validator.messages, { required: 'Este campo é obrigatório.' });

  const validator = $('#formReembolso').validate({
    rules: {
      cliente: { required: true, nomeCompleto: true },
      valor: { required: true, valorPositivo: true },
      forma: { required: true }
    },
    messages: {
      valor: { required: 'Informe o valor do reembolso.' },
      forma: { required: 'Selecione a forma de reembolso.' }
    },
    errorElement: 'label',
    errorClass: 'error',
    highlight: (el) => $(el).addClass('is-invalid'),
    unhighlight: (el) => $(el).removeClass('is-invalid'),
    submitHandler: function() {
      const cliente = $('#cliente').val().trim();
      const valor = $('#valor').val();
      const forma = selectForma.val();

      Swal.fire({
        title: 'Gerar comprovante?',
        html: `Reembolso de <strong>R$ ${valor}</strong><br>para <strong>${cliente}</strong> via <strong>${forma}</strong>.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Gerar comprovante',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0B306B',
        cancelButtonColor: '#6c757d',
        reverseButtons: true
      }).then((result) => {
        if (!result.isConfirmed) return;

        submitButton.prop('disabled', true)
          .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processando...');

        setTimeout(function() {
          protocoloAtual = gerarProtocolo();
          $('#tkProtocolo').text('#' + protocoloAtual);

          selectStatus.val('Efetivado');
          aplicarStatus();

          $('#formReembolso').attr('hidden', true);
          $('#reembolsoSucesso').removeAttr('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });

          submitButton.prop('disabled', false).html(botaoOriginal);
        }, 1600);
      });
    }
  });

  // --- Capturar comprovante ---
  const btnCapturar = $('#btnCapturar');
  const capturaOriginal = btnCapturar.html();

  btnCapturar.on('click', async function() {
    const alvo = document.getElementById('comprovante');
    btnCapturar.prop('disabled', true)
      .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Capturando...');

    // Remove o destaque de edição durante a captura (para não sair na imagem)
    const editavaAntes = modoEdicao;
    $editaveis.removeClass('editavel');

    try {
      const canvas = await html2canvas(alvo, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false
      });

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

      let copiado = false;
      if (navigator.clipboard && window.ClipboardItem) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          copiado = true;
        } catch (e) { copiado = false; }
      }

      if (copiado) {
        Toast.fire({ icon: 'success', title: 'Comprovante copiado! Cole com Ctrl+V.' });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `comprovante-${protocoloAtual || 'reembolso'}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        Toast.fire({ icon: 'info', title: 'Não foi possível copiar — imagem baixada.' });
      }
    } catch (err) {
      Swal.fire('Erro', 'Não foi possível capturar o comprovante.', 'error');
    } finally {
      if (editavaAntes) $editaveis.addClass('editavel');
      btnCapturar.prop('disabled', false).html(capturaOriginal);
    }
  });

  $('#btnImprimir').on('click', () => window.print());

  $('#btnNovo').on('click', function() {
    document.getElementById('formReembolso').reset();
    validator.resetForm();
    $('#formReembolso .is-invalid').removeClass('is-invalid');
    $('.forma-campos').attr('hidden', true);
    $('#reembolsoSucesso').attr('hidden', true);
    $('#formReembolso').removeAttr('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('#cliente').focus();
  });

});
