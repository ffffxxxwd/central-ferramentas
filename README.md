# Central de Ferramentas

Site único que reúne todas as ferramentas de trabalho em um só lugar, com menu de navegação.

## Como usar

Abra o arquivo **`index.html`** no navegador (duplo clique). Não precisa instalar nada.

> Se alguma ferramenta não carregar dentro da página por causa de restrição do navegador
> em abrir arquivos locais, é só pedir pro Claude ligar um servidor local — aí funciona 100%.

## Estrutura das pastas

```
Organização/
├─ index.html                 → o site principal (menu + área das ferramentas)
├─ README.md                  → este arquivo
├─ assets/
│  ├─ css/style.css           → aparência do site
│  └─ js/
│     ├─ tools.js             → LISTA das ferramentas (editar aqui p/ adicionar)
│     └─ app.js               → funcionamento do menu/navegação
└─ ferramentas/
   ├─ termo-distrato/         → cada ferramenta fica na sua própria pasta
   └─ comprovante-reembolso/
```

## Como adicionar uma ferramenta nova

1. Copie a pasta da ferramenta para dentro de `ferramentas/` (ex.: `ferramentas/minha-ferramenta/`).
   O arquivo principal dela precisa se chamar `index.html`.
2. Abra `assets/js/tools.js` e acrescente um item na lista:

   ```js
   {
     id: "minha-ferramenta",
     nome: "Minha Ferramenta",
     descricao: "O que ela faz.",
     icone: "🔧",
     categoria: "Documentos",
     url: "ferramentas/minha-ferramenta/index.html",
     pronta: true
   }
   ```

3. Pronto — ela aparece no menu e na página inicial.

> As ferramentas rodam isoladas (cada uma na sua pasta). Os arquivos originais nunca
> são alterados: o hub só coloca um menu em volta delas.
