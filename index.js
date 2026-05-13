const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const https = require('https');
const { parseStringPromise } = require('xml2js');

const PLAYLIST_ZAPPR = 'https://easyproxy.stremioms.dpdns.org/playlist?url=https%3A%2F%2Fraw.githubusercontent.com%2FManuelStanghe%2FPlaylist%2Frefs%2Fheads%2Fmain%2Fplaylist_zappr.m3u%7Cnoproxy%3Dtrue&api_password=ep';
const PLAYLIST_UAZNAO = 'https://easyproxy.stremioms.dpdns.org/playlist?url=https%3A%2F%2Fraw.githubusercontent.com%2FManuelStanghe%2FPlaylist%2Frefs%2Fheads%2Fmain%2Fplaylist_uaznao.m3u&api_password=ep';
const EPG_URL = 'https://raw.githubusercontent.com/leanhhu061206/LIVETV/refs/heads/main/epg.xml';
const BG_DEFAULT = 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/bg.jpg';
const LOGO_BASE = 'https://raw.githubusercontent.com/ManuelStanghe/Playlist/main/Loghi/';
const COVER_P = 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/generated-covers-world/portrait/';
const COVER_L = 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/generated-covers-world/landscape/';

const manifest = {
    id: 'org.mpdtv',
    version: '1.0.0',
    name: 'MPDTv',
    description: 'Canali ZAPPR + UAZNAO con EPG integrata',
    types: ['tv'],
    catalogs: [
        {
            type: 'tv',
            id: 'italiantv',
            name: 'MPDTv',
            extra: [
                {
                    name: 'genre',
                    options: ['Rai', 'Mediaset', 'Sky Cinema', 'Sky Sport', 'Sky Serie', 'Sky Intrattenimento', 'Sky Documentari', 'Sky News', 'Sport', 'Bambini', 'Documentari', 'Musica', 'Altro'],
                    isRequired: false
                },
                { name: 'skip', isRequired: false }
            ]
        }
    ],
    resources: ['catalog', 'meta', 'stream'],
    idPrefixes: ['mpdtv:']
};

const CANALI = [
    // RAI
    { id: 'mpdtv:rai1', name: 'Rai 1', epgId: 'rai1.it', poster: COVER_P+'rai-1.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'rai-1.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:rai2', name: 'Rai 2', epgId: 'rai2.it', poster: COVER_P+'rai-2.jpg', logo: LOGO_BASE+'rai-2-it.png', bg: COVER_L+'rai-2.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:rai3', name: 'Rai 3', epgId: 'rai3.it', poster: COVER_P+'rai-3.jpg', logo: LOGO_BASE+'rai-3-it.png', bg: COVER_L+'rai-3.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:rai4', name: 'Rai 4', epgId: 'rai4.it', poster: COVER_P+'rai-4.jpg', logo: LOGO_BASE+'rai-4-it.png', bg: COVER_L+'rai-4.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:rai5', name: 'Rai 5', epgId: 'rai5.it', poster: COVER_P+'rai-5.jpg', logo: LOGO_BASE+'rai-5-it.png', bg: COVER_L+'rai-5.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:raimovie', name: 'Rai Movie', epgId: 'raimovie.it', poster: COVER_P+'rai-movie.jpg', logo: LOGO_BASE+'rai-movie-it.png', bg: COVER_L+'rai-movie.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:raipremium', name: 'Rai Premium', epgId: 'raipremium.it', poster: COVER_P+'rai-premium.jpg', logo: LOGO_BASE+'rai-premium-it.png', bg: COVER_L+'rai-premium.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:raigulp', name: 'Rai Gulp', epgId: 'raigulp.it', poster: COVER_P+'rai-gulp.jpg', logo: LOGO_BASE+'rai-gulp-it.png', bg: COVER_L+'rai-gulp.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:raiyoyo', name: 'Rai Yoyo', epgId: 'raiyoyo.it', poster: COVER_P+'rai-yoyo.jpg', logo: LOGO_BASE+'rai-yoyo-it.png', bg: COVER_L+'rai-yoyo.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:rainews24', name: 'Rai News 24', epgId: 'rainews24.it', poster: COVER_P+'rai-news-24.jpg', logo: LOGO_BASE+'rai-news-24-it.png', bg: COVER_L+'rai-news-24.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:raistoria', name: 'Rai Storia', epgId: 'raistoria.it', poster: COVER_P+'rai-storia.jpg', logo: LOGO_BASE+'rai-storia-it.png', bg: COVER_L+'rai-storia.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:raiscuola', name: 'Rai Scuola', epgId: 'raiscuola.it', poster: COVER_P+'rai-scuola.jpg', logo: LOGO_BASE+'rai-scuola-it.png', bg: COVER_L+'rai-scuola.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:raisport', name: 'Rai Sport', epgId: 'raisport+hd.it', poster: COVER_P+'rai-sport.jpg', logo: LOGO_BASE+'rai-sport-it.png', bg: COVER_L+'rai-sport.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    { id: 'mpdtv:rai4k', name: 'Rai 4K', epgId: null, poster: COVER_P+'rai-4k.jpg', logo: LOGO_BASE+'rai_4k.png', bg: COVER_L+'rai-4k.jpg', catalog: 'italiantv', genre: 'Rai', playlist: 'zappr' },
    // MEDIASET
    { id: 'mpdtv:canale5', name: 'Canale 5', epgId: 'canale5.it', poster: COVER_P+'canale-5.jpg', logo: LOGO_BASE+'canale5-it.png', bg: COVER_L+'canale-5.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    { id: 'mpdtv:italia1', name: 'Italia 1', epgId: 'italia1.it', poster: COVER_P+'italia-1.jpg', logo: LOGO_BASE+'italia1-it.png', bg: COVER_L+'italia-1.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    { id: 'mpdtv:italia2', name: 'Italia 2', epgId: 'italia2.it', poster: COVER_P+'italia-2.jpg', logo: LOGO_BASE+'italia2-it.png', bg: COVER_L+'italia-2.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    { id: 'mpdtv:rete4', name: 'Rete 4', epgId: 'rete4.it', poster: COVER_P+'rete-4.jpg', logo: LOGO_BASE+'rete4-it.png', bg: COVER_L+'rete-4.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    { id: 'mpdtv:iris', name: 'Iris', epgId: 'iris.it', poster: COVER_P+'iris.jpg', logo: LOGO_BASE+'iris-it.png', bg: COVER_L+'iris.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    { id: 'mpdtv:la5', name: 'La5', epgId: 'la5.it', poster: COVER_P+'la-5.jpg', logo: LOGO_BASE+'la5-it.png', bg: COVER_L+'la-5.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    { id: 'mpdtv:twentyseven', name: 'TwentySeven', epgId: 'twentyseven.it', poster: COVER_P+'twenty-seven.jpg', logo: LOGO_BASE+'twenty-seven-it.png', bg: COVER_L+'twenty-seven.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    { id: 'mpdtv:20mediaset', name: '20 Mediaset', epgId: '20.it', poster: COVER_P+'20-mediaset.jpg', logo: LOGO_BASE+'20-it.png', bg: COVER_L+'20-mediaset.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    { id: 'mpdtv:mediasetextra', name: 'Mediaset Extra', epgId: 'mediasetextra.it', poster: COVER_P+'mediaset-extra.jpg', logo: LOGO_BASE+'mediaset-extra-it.png', bg: COVER_L+'mediaset-extra.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    { id: 'mpdtv:topcrime', name: 'Top Crime', epgId: 'topcrime.it', poster: COVER_P+'top-crime.jpg', logo: LOGO_BASE+'top-crime-it.png', bg: COVER_L+'top-crime.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    { id: 'mpdtv:focus', name: 'Focus', epgId: 'focus.it', poster: COVER_P+'focus.jpg', logo: LOGO_BASE+'focus-it.png', bg: COVER_L+'focus.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    { id: 'mpdtv:cine34', name: 'Cine34', epgId: 'cine34.it', poster: COVER_P+'cine-34.jpg', logo: LOGO_BASE+'cine34-it.png', bg: COVER_L+'cine-34.jpg', catalog: 'italiantv', genre: 'Mediaset', playlist: 'zappr' },
    // SKY CINEMA
    { id: 'mpdtv:skycinemauno', name: 'Sky Cinema Uno', epgId: 'sky.cinema.uno.it', poster: COVER_P+'sky-cinema-uno.jpg', logo: LOGO_BASE+'sky-cinema-uno-it.png', bg: COVER_L+'sky-cinema-uno.jpg', catalog: 'italiantv', genre: 'Sky Cinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemadue', name: 'Sky Cinema Due', epgId: 'sky.cinema.due.it', poster: COVER_P+'sky-cinema-due.jpg', logo: LOGO_BASE+'sky-cinema-due-it.png', bg: COVER_L+'sky-cinema-due.jpg', catalog: 'italiantv', genre: 'Sky Cinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemaaction', name: 'Sky Cinema Action', epgId: 'sky.cinema.action.it', poster: COVER_P+'sky-cinema-action.jpg', logo: LOGO_BASE+'sky-cinema-action-it.png', bg: COVER_L+'sky-cinema-action.jpg', catalog: 'italiantv', genre: 'Sky Cinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemacollection', name: 'Sky Cinema Collection', epgId: 'sky.cinema.collection.it', poster: COVER_P+'sky-cinema-collection.jpg', logo: LOGO_BASE+'sky-cinema-collection-it.png', bg: COVER_L+'sky-cinema-collection.jpg', catalog: 'italiantv', genre: 'Sky Cinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemacomedy', name: 'Sky Cinema Comedy', epgId: 'sky.cinema.comedy.it', poster: COVER_P+'sky-cinema-comedy.jpg', logo: LOGO_BASE+'sky-cinema-comedy-it.png', bg: COVER_L+'sky-cinema-comedy.jpg', catalog: 'italiantv', genre: 'Sky Cinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemadrama', name: 'Sky Cinema Drama', epgId: 'sky.cinema.drama.it', poster: COVER_P+'sky-cinema-drama.jpg', logo: LOGO_BASE+'sky-cinema-drama-it.png', bg: COVER_L+'sky-cinema-drama.jpg', catalog: 'italiantv', genre: 'Sky Cinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemaillumination', name: 'Sky Cinema Illumination', epgId: 'sky.cinema.family.it', poster: COVER_P+'sky-cinema-family.jpg', logo: LOGO_BASE+'sky-cinema-family-it.png', bg: COVER_L+'sky-cinema-family.jpg', catalog: 'italiantv', genre: 'Sky Cinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemaromance', name: 'Sky Cinema Romance', epgId: 'sky.cinema.romance.it', poster: COVER_P+'sky-cinema-romance.jpg', logo: LOGO_BASE+'sky-cinema-romance-it.png', bg: COVER_L+'sky-cinema-romance.jpg', catalog: 'italiantv', genre: 'Sky Cinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemasuspense', name: 'Sky Cinema Suspense', epgId: 'sky.cinema.suspense.it', poster: COVER_P+'sky-cinema-suspense.jpg', logo: LOGO_BASE+'sky-cinema-suspense-it.png', bg: COVER_L+'sky-cinema-suspense.jpg', catalog: 'italiantv', genre: 'Sky Cinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycrime', name: 'Sky Crime', epgId: 'sky.crime.it', poster: COVER_P+'sky-crime.jpg', logo: LOGO_BASE+'sky-crime-it.png', bg: COVER_L+'sky-crime.jpg', catalog: 'italiantv', genre: 'Sky Cinema', playlist: 'uaznao' },
    // SKY SERIE
    { id: 'mpdtv:skyatlantic', name: 'Sky Atlantic', epgId: 'sky.atlantic.it', poster: COVER_P+'sky-atlantic.jpg', logo: LOGO_BASE+'sky-atlantic-it.png', bg: COVER_L+'sky-atlantic.jpg', catalog: 'italiantv', genre: 'Sky Serie', playlist: 'uaznao' },
    { id: 'mpdtv:skyserie', name: 'Sky Serie', epgId: 'sky.serie.it', poster: COVER_P+'sky-serie.jpg', logo: LOGO_BASE+'sky-serie-it.png', bg: COVER_L+'sky-serie.jpg', catalog: 'italiantv', genre: 'Sky Serie', playlist: 'uaznao' },
    // SKY INTRATTENIMENTO
    { id: 'mpdtv:skyuno', name: 'Sky Uno', epgId: 'sky.uno.it', poster: COVER_P+'sky-uno.jpg', logo: LOGO_BASE+'sky-uno-it.png', bg: COVER_L+'sky-uno.jpg', catalog: 'italiantv', genre: 'Sky Intrattenimento', playlist: 'uaznao' },
    { id: 'mpdtv:skycollection', name: 'Sky Collection', epgId: null, poster: COVER_P+'sky-collection.jpg', logo: LOGO_BASE+'sky-collection-it.png', bg: COVER_L+'sky-collection.jpg', catalog: 'italiantv', genre: 'Sky Intrattenimento', playlist: 'uaznao' },
    { id: 'mpdtv:skyadventure', name: 'Sky Adventure', epgId: 'sky.adventure.it', poster: COVER_P+'sky-adventure.jpg', logo: LOGO_BASE+'sky-adventure-it.png', bg: COVER_L+'sky-adventure.jpg', catalog: 'italiantv', genre: 'Sky Intrattenimento', playlist: 'uaznao' },
    { id: 'mpdtv:skyinvestigation', name: 'Sky Investigation', epgId: 'sky.investigation.it', poster: COVER_P+'sky-investigation.jpg', logo: LOGO_BASE+'sky-investigation-it.png', bg: COVER_L+'sky-investigation.jpg', catalog: 'italiantv', genre: 'Sky Intrattenimento', playlist: 'uaznao' },
    // SKY SPORT
    { id: 'mpdtv:skysportuno', name: 'Sky Sport Uno', epgId: 'sky.sport.uno.it', poster: COVER_P+'sky-sport-uno.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-uno.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportmax', name: 'Sky Sport Max', epgId: 'sky.sport.max.it', poster: COVER_P+'sky-sport-max.jpg', logo: LOGO_BASE+'sky-sport-max-it.png', bg: COVER_L+'sky-sport-max.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportcalcio', name: 'Sky Sport Calcio', epgId: 'sky.sport.calcio.it', poster: COVER_P+'sky-sport-calcio.jpg', logo: LOGO_BASE+'sky-sport-calcio-it.png', bg: COVER_L+'sky-sport-calcio.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportf1', name: 'Sky Sport F1', epgId: 'sky.sport.f1.it', poster: COVER_P+'sky-sport-f1.jpg', logo: LOGO_BASE+'sky-sport-f1-it.png', bg: COVER_L+'sky-sport-f1.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportmotogp', name: 'Sky Sport MotoGP', epgId: 'sky.sport.motogp.it', poster: COVER_P+'sky-sport-motogp.jpg', logo: LOGO_BASE+'sky-sport-motogp-it.png', bg: COVER_L+'sky-sport-motogp.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysporttennis', name: 'Sky Sport Tennis', epgId: 'sky.sport.tennis.it', poster: COVER_P+'sky-sport-tennis.jpg', logo: LOGO_BASE+'sky-sport-tennis-it.png', bg: COVER_L+'sky-sport-tennis.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportgolf', name: 'Sky Sport Golf', epgId: 'sky.sport.golf.it', poster: COVER_P+'sky-sport-golf.jpg', logo: LOGO_BASE+'sky-sport-golf-it.png', bg: COVER_L+'sky-sport-golf.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportbasket', name: 'Sky Sport Basket', epgId: 'sky.sport.nba.it', poster: COVER_P+'sky-sport-basket.jpg', logo: LOGO_BASE+'sky-sport-basket.png', bg: COVER_L+'sky-sport-basket.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportarena', name: 'Sky Sport Arena', epgId: 'sky.sport.arena.it', poster: COVER_P+'sky-sport-arena.jpg', logo: LOGO_BASE+'sky-sport-arena-it.png', bg: COVER_L+'sky-sport-arena.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportlegend', name: 'Sky Sport Legend', epgId: 'sky.sport.legend.it', poster: COVER_P+'sky-sport-legend.jpg', logo: LOGO_BASE+'sky-sport-legend-it.png', bg: COVER_L+'sky-sport-legend.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportmix', name: 'Sky Sport Mix', epgId: 'sky.sport.mix.it', poster: COVER_P+'sky-sport-mix.jpg', logo: LOGO_BASE+'sky-sport-mix-it.png', bg: COVER_L+'sky-sport-mix.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport24', name: 'Sky Sport 24', epgId: 'sky.sport.24.it', poster: COVER_P+'sky-sport-24.jpg', logo: LOGO_BASE+'sky-sport-24-it.png', bg: COVER_L+'sky-sport-24.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport251', name: 'Sky Sport 251', epgId: 'sky.sport..251.it', poster: COVER_P+'sky-sport-251.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-251.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport252', name: 'Sky Sport 252', epgId: 'sky.sport..252.it', poster: COVER_P+'sky-sport-252.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-252.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport253', name: 'Sky Sport 253', epgId: 'sky.sport..253.it', poster: COVER_P+'sky-sport-253.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-253.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport254', name: 'Sky Sport 254', epgId: 'sky.sport..254.it', poster: COVER_P+'sky-sport-254.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-254.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport255', name: 'Sky Sport 255', epgId: 'sky.sport..255.it', poster: COVER_P+'sky-sport-255.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-255.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport256', name: 'Sky Sport 256', epgId: 'sky.sport..256.it', poster: COVER_P+'sky-sport-256.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-256.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport257', name: 'Sky Sport 257', epgId: 'sky.sport..257.it', poster: COVER_P+'sky-sport-257.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-257.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport258', name: 'Sky Sport 258', epgId: 'sky.sport..258.it', poster: COVER_P+'sky-sport-258.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-258.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport259', name: 'Sky Sport 259', epgId: 'sky.sport..259.it', poster: COVER_P+'sky-sport-259.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-259.jpg', catalog: 'italiantv', genre: 'Sky Sport', playlist: 'uaznao' },
    // SKY DOCUMENTARI
    { id: 'mpdtv:skyarte', name: 'Sky Arte', epgId: 'sky.arte.it', poster: COVER_P+'sky-arte.jpg', logo: LOGO_BASE+'sky-arte-it.png', bg: COVER_L+'sky-arte.jpg', catalog: 'italiantv', genre: 'Sky Documentari', playlist: 'uaznao' },
    { id: 'mpdtv:skydocumentaries', name: 'Sky Documentaries', epgId: 'sky.documentaries.it', poster: COVER_P+'sky-documentaries.jpg', logo: LOGO_BASE+'sky-documentaries-it.png', bg: COVER_L+'sky-documentaries.jpg', catalog: 'italiantv', genre: 'Sky Documentari', playlist: 'uaznao' },
    { id: 'mpdtv:skynature', name: 'Sky Nature', epgId: 'sky.nature.it', poster: COVER_P+'sky-nature.jpg', logo: LOGO_BASE+'sky-nature-it.png', bg: COVER_L+'sky-nature.jpg', catalog: 'italiantv', genre: 'Sky Documentari', playlist: 'uaznao' },
    // SKY NEWS
    { id: 'mpdtv:skytg24', name: 'Sky TG24', epgId: 'sky.tg24.it', poster: COVER_P+'sky-tg-24.jpg', logo: LOGO_BASE+'sky-tg24-it.png', bg: COVER_L+'sky-tg-24.jpg', catalog: 'italiantv', genre: 'Sky News', playlist: 'uaznao' },
    // SPORT
    { id: 'mpdtv:dazn1', name: 'Dazn 1', epgId: 'dazn.1.it.it', poster: COVER_P+'dazn-1.jpg', logo: LOGO_BASE+'dazn-channel-it.png', bg: COVER_L+'dazn-1.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:dazn2', name: 'Dazn 2', epgId: 'dazn.2.it.it', poster: COVER_P+'dazn-2.jpg', logo: LOGO_BASE+'dazn-channel-it.png', bg: COVER_L+'dazn-2.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:dazn3', name: 'Dazn 3', epgId: 'dazn.3.it.it', poster: COVER_P+'dazn-3.jpg', logo: LOGO_BASE+'dazn-channel-it.png', bg: COVER_L+'dazn-3.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:dazn4', name: 'Dazn 4', epgId: 'dazn4.it', poster: COVER_P+'dazn-4.jpg', logo: LOGO_BASE+'dazn-channel-it.png', bg: COVER_L+'dazn-4.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:dazn5', name: 'Dazn 5', epgId: 'dazn5.it', poster: COVER_P+'dazn-1.jpg', logo: LOGO_BASE+'dazn-channel-it.png', bg: COVER_L+'dazn-1.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport1', name: 'Eurosport 1', epgId: 'eurosport.1.italia.it', poster: COVER_P+'eurosport-1.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-1.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport2', name: 'Eurosport 2', epgId: 'eurosport.2.italia.it', poster: COVER_P+'eurosport-2.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-2.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport3', name: 'Eurosport 3', epgId: null, poster: COVER_P+'eurosport-3.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-3.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport4', name: 'Eurosport 4', epgId: null, poster: COVER_P+'eurosport-4.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-4.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport5', name: 'Eurosport 5', epgId: null, poster: COVER_P+'eurosport-5.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-5.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport6', name: 'Eurosport 6', epgId: null, poster: COVER_P+'eurosport-6.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-6.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv1', name: 'Sport TV 1', epgId: null, poster: COVER_P+'sport-tv-1.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-1.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv2', name: 'Sport TV 2', epgId: null, poster: COVER_P+'sport-tv-2.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-2.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv3', name: 'Sport TV 3', epgId: null, poster: COVER_P+'sport-tv-3.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-3.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv4', name: 'Sport TV 4', epgId: null, poster: COVER_P+'sport-tv-4.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-4.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv5', name: 'Sport TV 5', epgId: null, poster: COVER_P+'sport-tv-5.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-5.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv6', name: 'Sport TV 6', epgId: null, poster: COVER_P+'sport-tv-6.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-6.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'uaznao' },
    { id: 'mpdtv:sportitalia', name: 'Sportitalia', epgId: 'sportitalia.it', poster: COVER_P+'sport-italia.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-italia.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'zappr' },
    { id: 'mpdtv:supertennis', name: 'SuperTennis', epgId: 'supertennis.hd.it', poster: COVER_P+'supertennis.jpg', logo: LOGO_BASE+'super-tennis-it.png', bg: COVER_L+'supertennis.jpg', catalog: 'italiantv', genre: 'Sport', playlist: 'zappr' },
    // BAMBINI
    { id: 'mpdtv:boomerang', name: 'Boomerang', epgId: 'boomerang.it', poster: COVER_P+'boomerang.jpg', logo: LOGO_BASE+'boomerang-it.png', bg: COVER_L+'boomerang.jpg', catalog: 'italiantv', genre: 'Bambini', playlist: 'uaznao' },
    { id: 'mpdtv:cartoonnetwork', name: 'Cartoon Network', epgId: 'cartoon.network.it', poster: COVER_P+'cartoon-network.jpg', logo: LOGO_BASE+'cartoon-network-it.png', bg: COVER_L+'cartoon-network.jpg', catalog: 'italiantv', genre: 'Bambini', playlist: 'uaznao' },
    { id: 'mpdtv:deakids', name: 'DeAKids', epgId: 'deakids.it', poster: COVER_P+'deakids.jpg', logo: LOGO_BASE+'dea-kids-it.png', bg: COVER_L+'deakids.jpg', catalog: 'italiantv', genre: 'Bambini', playlist: 'uaznao' },
    { id: 'mpdtv:nickjr', name: 'Nick Jr', epgId: 'nick.jr.it', poster: COVER_P+'nick-jr.jpg', logo: LOGO_BASE+'nick-jr-it.png', bg: COVER_L+'nick-jr.jpg', catalog: 'italiantv', genre: 'Bambini', playlist: 'uaznao' },
    { id: 'mpdtv:nickelodeon', name: 'Nickelodeon', epgId: 'nickelodeon.it', poster: COVER_P+'nickelodeon.jpg', logo: LOGO_BASE+'nickelodeon-it.png', bg: COVER_L+'nickelodeon.jpg', catalog: 'italiantv', genre: 'Bambini', playlist: 'uaznao' },
    { id: 'mpdtv:boing', name: 'Boing', epgId: 'boing.it', poster: COVER_P+'boing.jpg', logo: LOGO_BASE+'boing-it.png', bg: COVER_L+'boing.jpg', catalog: 'italiantv', genre: 'Bambini', playlist: 'zappr' },
    { id: 'mpdtv:boingplus', name: 'Boing Plus', epgId: 'boingplus.it', poster: COVER_P+'boing.jpg', logo: LOGO_BASE+'boing-it.png', bg: COVER_L+'boing.jpg', catalog: 'italiantv', genre: 'Bambini', playlist: 'zappr' },
    { id: 'mpdtv:k2', name: 'K2', epgId: 'k2.it', poster: COVER_P+'k2.jpg', logo: LOGO_BASE+'k2-it.png', bg: COVER_L+'k2.jpg', catalog: 'italiantv', genre: 'Bambini', playlist: 'zappr' },
    { id: 'mpdtv:frisbee', name: 'Frisbee', epgId: 'frisbee.it', poster: COVER_P+'frisbee.jpg', logo: LOGO_BASE+'frisbee-it.png', bg: COVER_L+'frisbee.jpg', catalog: 'italiantv', genre: 'Bambini', playlist: 'zappr' },
    { id: 'mpdtv:cartoonito', name: 'Cartoonito', epgId: 'cartoonito.it', poster: COVER_P+'cartoonito.jpg', logo: LOGO_BASE+'cartoonito-it.png', bg: COVER_L+'cartoonito.jpg', catalog: 'italiantv', genre: 'Bambini', playlist: 'zappr' },
    { id: 'mpdtv:super', name: 'Super!', epgId: 'super!.it', poster: COVER_P+'super.jpg', logo: LOGO_BASE+'super-it.png', bg: COVER_L+'super.jpg', catalog: 'italiantv', genre: 'Bambini', playlist: 'zappr' },
    // DOCUMENTARI
    { id: 'mpdtv:history', name: 'History', epgId: 'history.it', poster: COVER_P+'history.jpg', logo: LOGO_BASE+'history-channel-it.png', bg: COVER_L+'history.jpg', catalog: 'italiantv', genre: 'Documentari', playlist: 'uaznao' },
    { id: 'mpdtv:discovery', name: 'Discovery', epgId: 'discovery.it', poster: COVER_P+'discovery-channel.jpg', logo: LOGO_BASE+'discovery-channel-it.png', bg: COVER_L+'discovery-channel.jpg', catalog: 'italiantv', genre: 'Documentari', playlist: 'zappr' },
    { id: 'mpdtv:discoveryturbo', name: 'Discovery Turbo', epgId: 'discoveryturbo.it', poster: COVER_P+'discovery-turbo.jpg', logo: LOGO_BASE+'discovery-turbo-it.png', bg: COVER_L+'discovery-turbo.jpg', catalog: 'italiantv', genre: 'Documentari', playlist: 'zappr' },
    // MUSICA
    { id: 'mpdtv:mtv', name: 'MTV', epgId: 'mtv.hd.it', poster: COVER_P+'mtv.jpg', logo: LOGO_BASE+'mtv-it.png', bg: COVER_L+'mtv.jpg', catalog: 'italiantv', genre: 'Musica', playlist: 'uaznao' },
    { id: 'mpdtv:deejaytv', name: 'Deejay TV', epgId: 'deejaytv.it', poster: COVER_P+'deejay-tv.jpg', logo: LOGO_BASE+'deejay-tv-it.png', bg: COVER_L+'deejay-tv.jpg', catalog: 'italiantv', genre: 'Musica', playlist: 'zappr' },
    { id: 'mpdtv:kisskisstv', name: 'Kiss Kiss TV', epgId: null, poster: COVER_P+'kiss-kiss.jpg', logo: LOGO_BASE+'radio-kiss-kiss-tv-it.png', bg: COVER_L+'kiss-kiss.jpg', catalog: 'italiantv', genre: 'Musica', playlist: 'zappr' },
    // ALTRO
    { id: 'mpdtv:la7', name: 'LA7', epgId: 'la7.it', poster: COVER_P+'la-7.jpg', logo: LOGO_BASE+'la7-it.png', bg: COVER_L+'la-7.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:la7cinema', name: 'LA7 Cinema', epgId: 'la7cinema.it', poster: COVER_P+'la-7-d.jpg', logo: LOGO_BASE+'la7d-it.png', bg: COVER_L+'la-7-d.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:tv8', name: 'TV8', epgId: 'tv8.hd.it', poster: COVER_P+'tv-8.jpg', logo: LOGO_BASE+'tv8-it.png', bg: COVER_L+'tv-8.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:nove', name: 'NOVE', epgId: 'nove.it', poster: COVER_P+'discovery-nove.jpg', logo: LOGO_BASE+'nove-it.png', bg: COVER_L+'discovery-nove.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:cielo', name: 'Cielo', epgId: 'cielo.it', poster: COVER_P+'cielo.jpg', logo: LOGO_BASE+'cielo-it.png', bg: COVER_L+'cielo.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:realtime', name: 'Real Time', epgId: 'realtime.it', poster: COVER_P+'real-time.jpg', logo: LOGO_BASE+'real-time-it.png', bg: COVER_L+'real-time.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:qvc', name: 'QVC', epgId: 'qvc.it', poster: COVER_P+'qvc.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'qvc.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:foodnetwork', name: 'Food Network', epgId: 'foodnetwork.it', poster: COVER_P+'food-network.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'food-network.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:giallo', name: 'Giallo', epgId: 'giallo.it', poster: COVER_P+'giallo.jpg', logo: LOGO_BASE+'giallo-it.png', bg: COVER_L+'giallo.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:dmax', name: 'DMAX', epgId: 'dmax.it', poster: COVER_P+'dmax.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'dmax.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:hgtv', name: 'HGTV - Home & Garden', epgId: 'hgtvhomeandgarden.it', poster: COVER_P+'hgtv.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'hgtv.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:france24', name: 'France 24', epgId: 'france24.it', poster: COVER_P+'france-24.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'france-24.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:tgcom24', name: 'TGcom24', epgId: 'tgcom24.it', poster: COVER_P+'tgcom-24.jpg', logo: LOGO_BASE+'tgcom24-it.png', bg: COVER_L+'tgcom-24.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
    { id: 'mpdtv:tv2000', name: 'TV2000', epgId: 'tv2000.it', poster: COVER_P+'tv-2000.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'tv-2000.jpg', catalog: 'italiantv', genre: 'Altro', playlist: 'zappr' },
];

let cacheZappr = null;
let cacheUaznao = null;
let epgCache = null;
let lastFetchZappr = 0;
let lastFetchUaznao = 0;
let lastFetchEpg = 0;
const CACHE_TTL = 30 * 60 * 1000;
const EPG_CACHE_TTL = 60 * 60 * 1000;

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
        parseInt(s.slice(0,4)),
        parseInt(s.slice(4,6)) - 1,
        parseInt(s.slice(6,8)),
        parseInt(s.slice(8,10)),
        parseInt(s.slice(10,12)),
        parseInt(s.slice(12,14))
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

const builder = new addonBuilder(manifest);

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
                    description = 'Prossimi programmi:\n' + info.upcoming.map(p => {
                        const start = parseEpgTime(p.$.start);
                        const sHH = (start.getUTCHours() + (isSky ? 2 : 0)).toString().padStart(2, '0');
                        const sMM = start.getUTCMinutes().toString().padStart(2, '0');
                        return `◉ ${sHH}:${sMM} - ${epgText(p.title)}`;
                    }).join('\n');
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

builder.defineStreamHandler(async ({ type, id }) => {
    const canale = CANALI.find(c => c.id === id);
    if (!canale) return { streams: [] };
    try {
        const content = await getPlaylist(canale.playlist);
        const streamInfo = parseStream(content, canale.name);
        if (!streamInfo) return { streams: [] };
        const stream = { title: canale.name, url: streamInfo.url };
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

const express = require('express');
const { getRouter } = require('stremio-addon-sdk');

const app = express();

// Pagina home con pulsante copia manifest
app.get('/', (req, res) => {
    const manifestUrl = `https://mpdtv.stremioms.dpdns.org/manifest.json`;
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

// Tutto il resto va all'addon SDK
app.use(getRouter(builder.getInterface()));

app.listen(7777, () => {
    console.log('MPDTv addon in ascolto su http://localhost:7777');
});
