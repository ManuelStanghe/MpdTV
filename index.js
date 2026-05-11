const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');

const manifest = {
    id: 'org.manueltv',
    version: '1.0.0',
    name: 'Manuel TV',
    description: 'Canali italiani live',
    types: ['tv'],
    catalogs: [
        {
            type: 'tv',
            id: 'italiantv',
            name: 'Canali Italiani',
            extra: [{ name: 'search', isRequired: false }]
        }
    ],
    resources: ['catalog', 'meta', 'stream'],
    idPrefixes: ['manueltv:']
};

const builder = new addonBuilder(manifest);

// Catalogo canali (per ora vuoto, lo popoliamo dopo)
const CANALI = [
    {
        id: 'manueltv:rai1',
        name: 'Rai 1',
        poster: 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/generated-covers-world/portrait/rai-1.jpg',
        logo: 'https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/italy/rai-1-it.png',
        background: 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/generated-covers-world/landscape/rai-1.jpg',
        stream: 'https://netplus.zappr.stream/rai1.m3u8',
        genre: ['Rai']
    },
    {
        id: 'manueltv:rai2',
        name: 'Rai 2',
        poster: 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/generated-covers-world/portrait/rai-2.jpg',
        logo: 'https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/italy/rai-2-it.png',
        background: 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/generated-covers-world/landscape/rai-2.jpg',
        stream: 'https://netplus.zappr.stream/rai2.m3u8',
        genre: ['Rai']
    },
];

builder.defineCatalogHandler(({ type, id }) => {
    if (type === 'tv' && id === 'italiantv') {
        return Promise.resolve({
            metas: CANALI.map(c => ({
                id: c.id,
                type: 'tv',
                name: c.name,
                poster: c.poster,
                logo: c.logo,
                background: c.background,
                genres: c.genre
            }))
        });
    }
    return Promise.resolve({ metas: [] });
});

builder.defineMetaHandler(({ type, id }) => {
    const canale = CANALI.find(c => c.id === id);
    if (canale) {
        return Promise.resolve({
            meta: {
                id: canale.id,
                type: 'tv',
                name: canale.name,
                poster: canale.poster,
                logo: canale.logo,
                background: canale.background,
                genres: canale.genre
            }
        });
    }
    return Promise.resolve({ meta: null });
});

builder.defineStreamHandler(({ type, id }) => {
    const canale = CANALI.find(c => c.id === id);
    if (canale) {
        return Promise.resolve({
            streams: [{ url: canale.stream, title: canale.name }]
        });
    }
    return Promise.resolve({ streams: [] });
});

serveHTTP(builder.getInterface(), { port: 7777 });
console.log('Addon TV in ascolto su http://localhost:7777');
