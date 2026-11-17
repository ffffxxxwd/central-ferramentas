/* Decide quais PDFs de contratos sobem para o GitHub e quais ficam só aqui.

   O site publicado tem limite de 1 GB no GitHub Pages. Com todos os PDFs ele
   passava de 2,2 GB e os deploys começaram a falhar de forma intermitente.
   Como as fichas arquivadas são casos encerrados, os PDFs delas ficam apenas
   no computador: continuam abrindo normalmente no localhost e deixam de ser
   publicados.

   O que sobe: os PDFs das fichas ativas (não arquivadas).
   O que fica local: os das fichas arquivadas e os arquivos sem ficha vinculada.

   Como usar, a partir da pasta do projeto:

     node ferramentas/contratos/pdfs-locais.js

   Ele reescreve contratos-pdf/.gitignore e mostra o que mudou. Depois disso,
   se algum arquivo já versionado passou a ser ignorado, rode o comando que ele
   sugerir para tirá-lo do índice sem apagar do disco.

   Rode de novo sempre que arquivar ou desarquivar muitas fichas. */
"use strict";

var fs = require("fs");
var path = require("path");

var AQUI = __dirname;
var PASTA = path.join(AQUI, "contratos-pdf");

global.window = global;
require(path.join(AQUI, "clientes.js"));

var store = {};
try {
  store = JSON.parse(fs.readFileSync(path.join(AQUI, "store.json"), "utf8"));
} catch (e) {
  console.error("Não consegui ler o store.json:", e.message);
  process.exit(1);
}

var bruto = store.arquivados || {};
var arquivadas = new Set(
  Array.isArray(bruto)
    ? bruto.map(String)
    : Object.keys(bruto).filter(function (k) { return bruto[k]; }).map(String)
);

// mapeia cada arquivo para a ficha dona dele
var deFichaAtiva = new Set();
var deFichaArquivada = new Set();
(window.CLIENTES || []).forEach(function (c) {
  (c.arquivos || []).forEach(function (a) {
    var nome = String(a.arquivo || "").replace(/^contratos-pdf\//, "");
    if (!nome) return;
    if (arquivadas.has(String(c.id))) deFichaArquivada.add(nome);
    else deFichaAtiva.add(nome);
  });
});

var noDisco = fs.readdirSync(PASTA).filter(function (f) { return f !== ".gitignore"; });

var sobem = [], ficamLocais = [], orfaos = [];
noDisco.forEach(function (f) {
  if (deFichaAtiva.has(f)) sobem.push(f);
  else if (deFichaArquivada.has(f)) ficamLocais.push(f);
  else { orfaos.push(f); ficamLocais.push(f); }
});

function mb(lista) {
  var t = 0;
  lista.forEach(function (f) {
    try { t += fs.statSync(path.join(PASTA, f)).size; } catch (e) {}
  });
  return (t / 1048576).toFixed(0) + " MB";
}

ficamLocais.sort();

var cabecalho = [
  "# Gerado por pdfs-locais.js — não edite à mão.",
  "#",
  "# PDFs de fichas arquivadas e arquivos sem ficha vinculada. Ficam só no",
  "# computador: o site publicado tem limite de 1 GB e com tudo isso passava",
  "# de 2,2 GB. Para regenerar:  node ferramentas/contratos/pdfs-locais.js",
  ""
].join("\n");

fs.writeFileSync(path.join(PASTA, ".gitignore"), cabecalho + ficamLocais.join("\n") + "\n");

console.log("  fichas arquivadas no store: " + arquivadas.size);
console.log("");
console.log("  sobem para o GitHub : " + String(sobem.length).padStart(3) + " arquivos  " + mb(sobem));
console.log("  ficam só no local   : " + String(ficamLocais.length).padStart(3) + " arquivos  " + mb(ficamLocais));
if (orfaos.length) {
  console.log("    (desses, " + orfaos.length + " não estão vinculados a nenhuma ficha)");
}
console.log("");
console.log("  contratos-pdf/.gitignore reescrito.");
