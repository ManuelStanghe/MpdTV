const https = require('https');
const { parseStringPromise } = require('xml2js');

const EPG_URL = 'https://raw.githubusercontent.com/leanhhu061206/LIVETV/refs/heads/main/epg.xml';
const EPG_CACHE_TTL = 60 * 60 * 1000;

let epgCache = null;
let lastFetchEpg = 0;

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function getEpg() {
    const now = Date.now();
    if (epgCache && now - lastFetchEpg < EPG_CACHE_TTL) return epgCache;
    try {
        const xml = await fetchUrl(EPG_URL);
        epgCache = await parseStringPromise(xml);
        lastFetchEpg = now;
    } catch (e) {
        console.error('EPG fetch error:', e);
    }
    return epgCache;
}

function parseEpgTime(t) {
    const s = t.replace(/\s.*/, '');
    return new Date(Date.UTC(
        parseInt(s.slice(0, 4)),
        parseInt(s.slice(4, 6)) - 1,
        parseInt(s.slice(6, 8)),
        parseInt(s.slice(8, 10)),
        parseInt(s.slice(10, 12)),
        parseInt(s.slice(12, 14))
    ));
}

function getEpgInfo(epgData, epgId, offset = 0) {
    if (!epgData || !epgId) return null;
    try {
        const programmes = epgData.tv.programme || [];
        const now = new Date(Date.now() - offset * 60 * 60 * 1000);
        const channelProg = programmes.filter(p => p.$.channel === epgId);
        const current = channelProg.find(p => {
            const start = parseEpgTime(p.$.start);
            const stop = parseEpgTime(p.$.stop);
            return start <= now && stop > now;
        });
        const upcoming = channelProg
            .filter(p => parseEpgTime(p.$.start) > now)
            .slice(0, 5);
        return { current, upcoming };
    } catch (e) {
        return null;
    }
}

function epgText(field) {
    if (!field) return null;
    const val = field[0];
    if (typeof val === 'string') return val;
    if (typeof val === 'object' && val._) return val._;
    return null;
}

module.exports = { getEpg, parseEpgTime, getEpgInfo, epgText };
