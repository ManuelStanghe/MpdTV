const { getMeta } = require('./canali');
const { getEpg, parseEpgTime, getEpgInfo, epgText } = require('./epg');
const { getAllChannels, getPlaylist, parseStream } = require('./playlist');

const BG_DEFAULT = 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/bg.jpg';

// Costruisce un id stremio dal nome del canale
function nameToId(name) {
    return 'mpdtv:' + name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Costruisce un canale completo unendo dati playlist + metadati
function buildCanale(ch) {
    const meta = getMeta(ch.name);
    return {
        id: nameToId(ch.name),
        name: ch.name,
        playlist: ch.playlist,
        url: ch.url,
        licenseType: ch.licenseType,
        licenseKey: ch.licenseKey,
        epgId: meta.epgId,
        poster: meta.poster,
        logo: meta.logo,
        genre: meta.genre,
    };
}

// Cache canali costruiti dalla playlist
let canaliCache = null;
let lastFetchCanali = 0;
const CANALI_TTL = 30 * 60 * 1000;

async function getCanali() {
    const now = Date.now();
    if (canaliCache && now - lastFetchCanali < CANALI_TTL) return canaliCache;
    const raw = await getAllChannels();
    canaliCache = raw.map(buildCanale);
    lastFetchCanali = now;
    return canaliCache;
}

function defineCatalogHandler(builder) {
    builder.defineCatalogHandler(async ({ type, id, extra }) => {
        try {
            let canali = await getCanali();
            if (extra && extra.genre) {
                canali = canali.filter(c => c.genre === extra.genre);
            }
            if (extra && extra.search) {
                const q = extra.search.toLowerCase();
                canali = canali.filter(c => c.name.toLowerCase().includes(q));
            }
            const metas = canali.map(c => ({
                id: c.id,
                type: 'tv',
                name: c.name,
                poster: c.poster,
                logo: c.logo,
                background: BG_DEFAULT,
                genres: [c.genre]
            }));
            return { metas };
        } catch (e) {
            console.error('Catalog error:', e);
            return { metas: [] };
        }
    });
}

function defineMetaHandler(builder) {
    builder.defineMetaHandler(async ({ type, id }) => {
        try {
            const canali = await getCanali();
            const canale = canali.find(c => c.id === id);
            if (!canale) return { meta: null };

            let releaseInfo = null;
            let description = null;

            if (canale.epgId) {
                try {
                    const epgData = await getEpg();
                    const isSky = canale.epgId.includes('sky.');
                    const offset = isSky ? 0 : -2;
                    const info = getEpgInfo(epgData, canale.epgId, offset);
                    if (info && info.current) {
                        const currentStart = parseEpgTime(info.current.$.start);
                        const csHH = (currentStart.getUTCHours() + (isSky ? 2 : 0)).toString().padStart(2, '0');
                        const csMM = currentStart.getUTCMinutes().toString().padStart(2, '0');

                        releaseInfo = `⫸  ${epgText(info.current.title)} (${csHH}:${csMM})`;

                        if (info.upcoming && info.upcoming.length > 0) {
                            description = 'Prossimi programmi:\n\n' + info.upcoming.map(p => {
                                const start = parseEpgTime(p.$.start);
                                const sHH = (start.getUTCHours() + (isSky ? 2 : 0)).toString().padStart(2, '0');
                                const sMM = start.getUTCMinutes().toString().padStart(2, '0');
                                const titolo = epgText(p.title);
                                const desc = epgText(p.desc);
                                return `◉ ${sHH}:${sMM} - ${titolo}${desc ? '\n' + desc : ''}`;
                            }).join('\n\n');
                        }
                    }
                } catch (e) {
                    console.error('EPG error:', e);
                }
            }

            return {
                meta: {
                    id: canale.id,
                    type: 'tv',
                    name: canale.name,
                    poster: canale.poster,
                    logo: canale.logo,
                    background: BG_DEFAULT,
                    genres: [canale.genre],
                    releaseInfo,
                    description,
                }
            };
        } catch (e) {
            console.error('Meta error:', e);
            return { meta: null };
        }
    });
}

function defineStreamHandler(builder) {
    builder.defineStreamHandler(async ({ type, id }) => {
        try {
            const canali = await getCanali();
            const canale = canali.find(c => c.id === id);
            if (!canale) return { streams: [] };

            const stream = { name: '⫸', title: canale.name, url: canale.url };
            if (canale.licenseKey && canale.licenseType === 'org.w3.clearkey') {
                const parts = canale.licenseKey.split(':');
                if (parts.length === 2) {
                    stream.drm = { type: 'clearkey', clearkeys: { [parts[0]]: parts[1] } };
                }
            }
            return { streams: [stream] };
        } catch (e) {
            console.error('Stream error:', e);
            return { streams: [] };
        }
    });
}

module.exports = { defineCatalogHandler, defineMetaHandler, defineStreamHandler };
