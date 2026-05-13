const CANALI = require('./canali');
const { getEpg, parseEpgTime, getEpgInfo, epgText } = require('./epg');
const { getPlaylist, parseStream } = require('./playlist');

const BG_DEFAULT = 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/bg.jpg';

function defineCatalogHandler(builder) {
    builder.defineCatalogHandler(({ type, id, extra }) => {
        let canali = CANALI.filter(c => c.catalog === id);
        if (extra && extra.genre) {
            canali = canali.filter(c => c.genre === extra.genre);
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
        return Promise.resolve({ metas });
    });
}

function defineMetaHandler(builder) {
    builder.defineMetaHandler(async ({ type, id }) => {
        const canale = CANALI.find(c => c.id === id);
        if (!canale) return Promise.resolve({ meta: null });

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

        return Promise.resolve({
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
        });
    });
}

function defineStreamHandler(builder) {
    builder.defineStreamHandler(async ({ type, id }) => {
        const canale = CANALI.find(c => c.id === id);
        if (!canale) return { streams: [] };
        try {
            const content = await getPlaylist(canale.playlist);
            const streamInfo = parseStream(content, canale.name);
            if (!streamInfo) return { streams: [] };
            const stream = { name: '⫸', title: canale.name, url: streamInfo.url };
            if (streamInfo.licenseKey && streamInfo.licenseType === 'org.w3.clearkey') {
                const parts = streamInfo.licenseKey.split(':');
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
