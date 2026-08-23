# Extensão "Leads do WhatsApp" (Chrome / Brave)

Coloca o seu organizador **num painel na lateral do WhatsApp Web**. Você abre a conversa,
clica em **＋ Salvar**, ajusta (nome, número, etiqueta, status, observação) e o contato entra
no painel na hora — tudo na mesma tela, sem trocar de aba.

## Como instalar (uma vez só)

1. Abra **`chrome://extensions`** (ou **`brave://extensions`**)
   - Se você usa vários logins, escolha primeiro o **perfil** onde quer a extensão.
2. Ligue o **"Modo do desenvolvedor"** (canto superior direito).
3. Clique em **"Carregar sem compactação"** e escolha esta pasta:
   `...\Organização\ferramentas\leads-whatsapp\extensao-chrome`
4. Pronto. (Não precisa mais de "acesso a URLs de arquivo" — o organizador agora é uma
   página da própria extensão.)

## Como usar

1. Abra **`web.whatsapp.com`**. Na direita aparece a aba **CONTATOS** — clique pra abrir/fechar o painel.
2. Entre numa conversa. No topo dela tem o botão **＋ Salvar**.
3. Clique: abre um formulário pra ajustar **nome, número, etiqueta (com cor), status e observação**.
   - Nome vazio → entra o número no lugar.
   - Número **não salvo**: o WhatsApp mostra o número, então salva certinho.
4. Confirme. O contato aparece no painel do lado, já organizado.

Tudo fica guardado na extensão (no seu navegador). Dá pra **exportar/importar** um backup
pelo menu "Mais ▾" do painel.

## Opções (ícone da extensão, ao lado da barra de endereço)

- **Contatos salvos**: total.
- **Salvar automático**: liga a captura sozinha ao abrir conversa de **número novo** (sem o formulário).
- **Abrir organizador em aba**: abre o painel em tela cheia numa aba separada.

## Se o painel não aparecer / o botão sumir

- Recarregue a página do WhatsApp Web.
- No Brave, se o site reclamar, baixe o **Shields** pra `web.whatsapp.com`.
- Se o **＋ Salvar** não aparecer ou salvar errado, me avise: o WhatsApp muda o site às vezes,
  e o ajuste fica num trecho só do `wa-capture.js` (função `headerTituloEl`).

> Observação honesta: isso é um "puxadinho" no WhatsApp Web (não é API oficial). Funciona
> bem pra uso pessoal, mas depende de como o WhatsApp mostra as coisas na tela.
