const https = require('https');

const PLAYLIST_ZAPPR = 'https://easyproxy.stremioms.dpdns.org/playlist?url=https%3A%2F%2Fraw.githubusercontent.com%2FManuelStanghe%2FPlaylist%2Frefs%2Fheads%2Fmain%2Fplaylist_zappr.m3u%7Cnoproxy%3Dtrue&api_password=ep';
const PLAYLIST_UAZNAO = 'https://easyproxy.stremioms.dpdns.org/playlist?url=https%3A%2F%2Fraw.githubusercontent.com%2FManuelStanghe%2FPlaylist%2Frefs%2Fheads%2Fmain%2Fplaylist_uaznao.m3u&api_password=ep';
const CACHE_TTL = 30 * 60 * 1000;

let cacheZappr = null;
let cacheUaznao = null;
let lastFetchZappr = 0;
let lastFetchUaznao = 0;

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function getPlaylist(type) {
    const now = Date.now();
    if (type === 'zappr') {
        if (cacheZappr && now - lastFetchZappr < CACHE_TTL) return cacheZappr;
        cacheZappr = await fetchUrl(PLAYLIST_ZAPPR);
        lastFetchZappr = now;
        return cacheZappr;
    } else {
        if (cacheUaznao && now - lastFetchUaznao < CACHE_TTL) return cacheUaznao;
        cacheUaznao = await fetchUrl(PLAYLIST_UAZNAO);
        lastFetchUaznao = now;
        return cacheUaznao;
    }
}

function parseStream(content, channelName) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF') && lines[i].includes(`,${channelName}`)) {
            const streamInfo = { url: null, licenseType: null, licenseKey: null };
            let j = i + 1;
            while (j < lines.length && !lines[j].startsWith('#EXTINF')) {
                if (lines[j].startsWith('#KODIPROP:inputstream.adaptive.license_type='))
                    streamInfo.licenseType = lines[j].split('=')[1].trim();
                else if (lines[j].startsWith('#KODIPROP:inputstream.adaptive.license_key='))
                    streamInfo.licenseKey = lines[j].split('=').slice(1).join('=').trim();
                else if (lines[j].startsWith('http'))
                    streamInfo.url = lines[j].trim();
                j++;
            }
            if (streamInfo.url) return streamInfo;
        }
    }
    return null;
}

module.exports = { getPlaylist, parseStream };
