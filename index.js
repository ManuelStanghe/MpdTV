const { addonBuilder } = require('stremio-addon-sdk');
const { getRouter } = require('stremio-addon-sdk');
const express = require('express');

const manifest = require('./manifest');
const { defineCatalogHandler, defineMetaHandler, defineStreamHandler } = require('./handlers');

const builder = new addonBuilder(manifest);

defineCatalogHandler(builder);
defineMetaHandler(builder);
defineStreamHandler(builder);

const app = express();

app.get('/', (req, res) => {
    const manifestUrl = 'https://mpdtv.stremioms.dpdns.org/manifest.json';
    res.send(`<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MPDTv</title>
    <style>
        body { font-family: sans-serif; background: #111; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
        h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        p { color: #aaa; margin-bottom: 2rem; }
        .btn { padding: 12px 28px; border-radius: 8px; font-size: 1rem; cursor: pointer; border: none; margin: 8px; }
        .btn-install { background: #7b5ea7; color: #fff; text-decoration: none; }
        .btn-copy { background: #333; color: #fff; }
        .btn-copy:hover { background: #555; }
        #msg { margin-top: 12px; color: #7b5ea7; font-size: 0.9rem; height: 1.2em; }
    </style>
</head>
<body>
    <h1>📺 MPDTv</h1>
    <p>Canali ZAPPR + UAZNAO con EPG integrata</p>
    <a class="btn btn-install" href="stremio://mpdtv.stremioms.dpdns.org/manifest.json">▶ Installa su Stremio</a>
    <button class="btn btn-copy" onclick="copia()">📋 Copia URL Manifest</button>
    <div id="msg"></div>
    <script>
        function copia() {
            navigator.clipboard.writeText('${manifestUrl}').then(() => {
                document.getElementById('msg').textContent = '✓ Copiato!';
                setTimeout(() => document.getElementById('msg').textContent = '', 2000);
            });
        }
    </script>
</body>
</html>`);
});

app.use(getRouter(builder.getInterface()));

app.listen(7777, () => {
    console.log('MPDTv addon in ascolto su http://localhost:7777');
});
