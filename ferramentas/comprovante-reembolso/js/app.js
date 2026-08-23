$(document).ready(function() {

  const selectEmpreendimento = $('#empreendimento');
  const selectForma = $('#forma');
  const selectStatus = $('#status');
  const submitButton = $('#formReembolso button[type="submit"]');
  const botaoOriginal = submitButton.html();

  let protocoloAtual = '';

  // Toast reutilizável (SweetAlert2)
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2800,
    timerProgressBar: true
  });

  // Empreendimentos GAV Resorts
  const empreendimentos = [
    'Areya Barra Resort', 'Beach GAV Resorts', 'Exclusive GAV Resorts',
    'Gran Garden Resort', 'Gran Haus Resort', 'Gran Valley Resort',
    'Jeriquiá Dunas Resort', 'Jeriquiá Lagoa Resort', 'Oikos Maragogi Resort',
    'Park GAV Resorts', 'Porto 2 Life Resort', 'Porto Alto Resort',
    'Premium GAV Resorts', 'Pyrenéus Residence', 'Outro (não listado)'
  ];
  $.each(empreendimentos, function(i, value) {
    selectEmpreendimento.append($('<option>', { value: value, text: value }));
  });

  // --- Máscaras ---
  $('#cpf').mask('000.000.000-00');
  $('#valor').mask('000.000.000,00', { reverse: true });

  // --- Configuração por status: cor, ícone, título e aviso do comprovante ---
  const AVISO_OK = 'O valor foi creditado na forma selecionada, conforme confirmação do adquirente. Guarde este comprovante e o número de protocolo para acompanhamento.';
  const AVISO_PROCESSAMENTO = 'O reembolso está <strong>em processamento</strong>. O valor <strong>será creditado</strong> na forma selecionada assim que o processamento for concluído.';
  const AVISO_ANALISE = 'A solicitação está <strong>em análise</strong>. Após a aprovação, o valor <strong>será creditado</strong> na forma selecionada.';
  const AVISO_PENDENTE = 'A solicitação está <strong>pendente</strong> de processamento. O valor <strong>será creditado</strong> após a confirmação.';
  const AVISO_NEGADO = 'Reembolso <strong>não aprovado</strong> por <strong>falha técnica no sistema de pagamentos</strong>. Não foi possível concluir o processamento, portanto <strong>nenhum valor será creditado</strong>.';
  const AVISO_CANCELADO = 'Esta solicitação de reembolso foi <strong>cancelada</strong> e <strong>nenhum valor será creditado</strong>. Se necessário, gere uma nova solicitação.';

  // Conteúdo interno do SVG (viewBox 0 0 24 24, stroke branco)
  const ICONES = {
    check:   '<polyline points="4 12 10 18 20 6" stroke-linecap="round" stroke-linejoin="round"></polyline>',
    x:       '<line x1="7" y1="7" x2="17" y2="17" stroke-linecap="round"></line><line x1="17" y1="7" x2="7" y2="17" stroke-linecap="round"></line>',
    relogio: '<circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15 14" stroke-linecap="round" stroke-linejoin="round"></polyline>'
  };

  const STATUS_CFG = {
    'Efetivado':        { fg: '#0B306B', bg: '#e8eef6', icone: 'check',   titulo: 'Reembolso efetivado',        aviso: AVISO_OK },
    'Aprovado':         { fg: '#0B306B', bg: '#e8eef6', icone: 'check',   titulo: 'Reembolso aprovado',         aviso: AVISO_OK },
    'Concluído':        { fg: '#0B306B', bg: '#e8eef6', icone: 'check',   titulo: 'Reembolso concluído',        aviso: AVISO_OK },
    'Estornado':        { fg: '#0B306B', bg: '#e8eef6', icone: 'check',   titulo: 'Reembolso estornado',        aviso: AVISO_OK },
    'Em processamento': { fg: '#0d5bbf', bg: '#e7f0fb', icone: 'relogio', titulo: 'Reembolso em processamento', aviso: AVISO_PROCESSAMENTO },
    'Em análise':       { fg: '#a9720a', bg: '#fdf3e0', icone: 'relogio', titulo: 'Reembolso em análise',       aviso: AVISO_ANALISE },
    'Pendente':         { fg: '#a9720a', bg: '#fdf3e0', icone: 'relogio', titulo: 'Reembolso pendente',         aviso: AVISO_PENDENTE },
    'Negado':           { fg: '#c62828', bg: '#fdecec', icone: 'x',       titulo: 'Reembolso negado',           aviso: AVISO_NEGADO },
    'Cancelado':        { fg: '#5b6470', bg: '#f0f2f4', icone: 'x',       titulo: 'Reembolso cancelado',        aviso: AVISO_CANCELADO }
  };

  function hexParaRgba(hex, alpha) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function aplicarStatus() {
    const status = selectStatus.val();
    const cfg = STATUS_CFG[status] || STATUS_CFG['Efetivado'];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">${ICONES[cfg.icone]}</svg>`;

    $('#statusTexto').text(status);
    $('#statusBadge').css({ 'background-color': cfg.bg, 'color': cfg.fg });
    $('#cpCheck').html(svg).css({
      'background-color': cfg.fg,
      'box-shadow': `0 0 0 6px ${hexParaRgba(cfg.fg, 0.12)}`
    });
    // setProperty com 'important' para vencer a regra .comprovante__destaque
    document.getElementById('cpValor').style.setProperty('color', cfg.fg, 'important');
    document.getElementById('cpProtocolo').style.setProperty('color', cfg.fg, 'important');
    $('#cpTitulo').text(cfg.titulo);
    $('#cpAviso').html(cfg.aviso);
  }
  selectStatus.on('change', aplicarStatus);

  // --- Campos condicionais por forma de reembolso ---
  selectForma.on('change', function() {
    $('.forma-campos').attr('hidden', true);
    const forma = selectForma.val();
    if (forma === 'PIX') $('#camposPix').removeAttr('hidden');
    else if (forma === 'Transferência bancária') $('#camposBanco').removeAttr('hidden');
  });

  // --- Utilitários ---
  function gerarProtocolo() {
    const d = new Date();
    const data = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    const seq = String(Math.floor(1000 + Math.random() * 9000));
    return `REEMB-${data}-${seq}`;
  }

  function dataHoraAtual() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  function toggleLinha(linhaSel, valorSel, valor) {
    if (valor) {
      $(valorSel).text(valor);
      $(linhaSel).removeAttr('hidden');
    } else {
      $(linhaSel).attr('hidden', true);
    }
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

      let destino = '';
      if (forma === 'PIX') {
        destino = $('#chavePix').val().trim();
      } else if (forma === 'Transferência bancária') {
        const banco = $('#banco').val().trim();
        const agencia = $('#agencia').val().trim();
        const conta = $('#conta').val().trim();
        destino = [banco, agencia && `Ag. ${agencia}`, conta && `C/C ${conta}`].filter(Boolean).join(' · ');
      } else if (forma === 'Estorno no cartão') {
        destino = 'Estorno na fatura do cartão de origem';
      }

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
          .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processando reembolso...');

        // Simula o processamento (a efetivação real ocorre por outro meio)
        setTimeout(function() {
          protocoloAtual = gerarProtocolo();

          $('#cpValor').text(`R$ ${valor}`);
          $('#cpCliente').text(cliente);
          $('#cpForma').text(forma);
          $('#cpProtocolo').text(protocoloAtual);
          $('#cpData').text(dataHoraAtual());

          toggleLinha('#linhaCpf', '#cpCpf', $('#cpf').val().trim());
          toggleLinha('#linhaEmpreendimento', '#cpEmpreendimento', selectEmpreendimento.val());
          toggleLinha('#linhaCota', '#cpCota', $('#cota').val().trim());
          toggleLinha('#linhaDestino', '#cpDestino', destino);
          toggleLinha('#linhaProtocoloRef', '#cpProtocoloRef', $('#protocolo').val().trim());

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

  // --- Capturar comprovante e copiar para a área de transferência ---
  const btnCapturar = $('#btnCapturar');
  const capturaOriginal = btnCapturar.html();

  btnCapturar.on('click', async function() {
    const alvo = document.getElementById('comprovante');
    btnCapturar.prop('disabled', true)
      .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Capturando...');

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
        // Fallback: baixa a imagem quando o navegador não permite copiar
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `comprovante-${protocoloAtual || 'reembolso'}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        Toast.fire({ icon: 'info', title: 'Não foi possível copiar aqui — imagem baixada.' });
      }
    } catch (err) {
      Swal.fire('Erro', 'Não foi possível capturar o comprovante. Tente novamente.', 'error');
    } finally {
      btnCapturar.prop('disabled', false).html(capturaOriginal);
    }
  });

  // --- Imprimir ---
  $('#btnImprimir').on('click', () => window.print());

  // --- Novo reembolso ---
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
