/* Senha de acesso da Central de Ferramentas.

   Aqui fica só o SHA-256 da senha, nunca a senha em si. Para trocar, rode no
   terminal, dentro da pasta do projeto:

     printf '%s' 'central-ferramentas:SUA-NOVA-SENHA' | sha256sum | cut -d' ' -f1

   e cole o resultado abaixo. Depois faça o push. Quem já estava logado continua
   logado por até 12 horas; passado isso, a senha nova passa a valer.

   Para desligar a tela de senha, deixe a string vazia. */
window.SENHA_HASH = "aedf943151866f03478858dcbd4cd1a1855516e23e5aacb6106f8e32f9cef870";
