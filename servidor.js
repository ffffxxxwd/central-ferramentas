#!/usr/bin/env node
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORTA = 8765;
const DIR = __dirname;
const STORE_PATH = path.join(DIR, "ferramentas", "contratos", "store.json");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

function getMime(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

function sendJSON(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  // GET /api/store — lê o store do disco
  if (req.method === "GET" && req.url === "/api/store") {
    try {
      const data = fs.readFileSync(STORE_PATH, "utf-8");
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      });
      return res.end(data);
    } catch (e) {
      return sendJSON(res, 200, {});
    }
  }

  // POST /api/store — grava o store no disco
  if (req.method === "POST" && req.url === "/api/store") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        JSON.parse(body);
        fs.writeFileSync(STORE_PATH, body, "utf-8");
        return sendJSON(res, 200, { ok: true });
      } catch (e) {
        return sendJSON(res, 400, { error: "JSON inválido" });
      }
    });
    return;
  }

  // Arquivos estáticos
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  const filePath = path.join(DIR, urlPath);
  if (!filePath.startsWith(DIR)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const indexPath = path.join(filePath, "index.html");
      fs.stat(indexPath, (err2, stats2) => {
        if (err2 || !stats2.isFile()) {
          res.writeHead(404);
          return res.end("Not found");
        }
        serveFile(res, indexPath);
      });
      return;
    }
    serveFile(res, filePath);
  });
});

function serveFile(res, filePath) {
  const stream = fs.createReadStream(filePath);
  res.writeHead(200, {
    "Content-Type": getMime(filePath),
    "Cache-Control": "no-cache",
  });
  stream.pipe(res);
  stream.on("error", () => {
    res.writeHead(500);
    res.end("Erro ao ler arquivo");
  });
}

server.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
  console.log(`Pasta: ${DIR}`);
  console.log(`Store: ${STORE_PATH}`);
  console.log("");
  console.log("Ctrl+C para parar.");
});
