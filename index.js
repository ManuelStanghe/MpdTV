const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const https = require('https');

const PLAYLIST_ZAPPR = 'https://raw.githubusercontent.com/ManuelStanghe/Playlist/refs/heads/main/playlist_zappr.m3u';
const PLAYLIST_UAZNAO = 'https://raw.githubusercontent.com/ManuelStanghe/Playlist/refs/heads/main/playlist_uaznao.m3u';

const LOGO_BASE = 'https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/italy/';
const COVER_P = 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/generated-covers-world/portrait/';
const COVER_L = 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/generated-covers-world/landscape/';

const manifest = {
    id: 'org.mpdtv',
    version: '1.0.0',
    name: 'MpdTV',
    description: 'Canali italiani live',
    types: ['tv'],
    catalogs: [
        { type: 'tv', id: 'rai', name: 'Rai' },
        { type: 'tv', id: 'mediaset', name: 'Mediaset' },
        { type: 'tv', id: 'skycinema', name: 'Sky Cinema' },
        { type: 'tv', id: 'skysport', name: 'Sky Sport' },
        { type: 'tv', id: 'skyserie', name: 'Sky Serie' },
        { type: 'tv', id: 'skyintrattenimento', name: 'Sky Intrattenimento' },
        { type: 'tv', id: 'skydoc', name: 'Sky Documentari' },
        { type: 'tv', id: 'skynews', name: 'Sky News' },
        { type: 'tv', id: 'sport', name: 'Sport' },
        { type: 'tv', id: 'bambini', name: 'Bambini' },
        { type: 'tv', id: 'documentari', name: 'Documentari' },
        { type: 'tv', id: 'musica', name: 'Musica' },
        { type: 'tv', id: 'altro', name: 'Altro' },
    ],
    resources: ['catalog', 'meta', 'stream'],
    idPrefixes: ['mpdtv:']
};

const CANALI = [
    // RAI
    { id: 'mpdtv:rai1', name: 'Rai 1', epgId: 'rai1.it', poster: COVER_P+'rai-1.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'rai-1.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:rai2', name: 'Rai 2', epgId: 'rai2.it', poster: COVER_P+'rai-2.jpg', logo: LOGO_BASE+'rai-2-it.png', bg: COVER_L+'rai-2.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:rai3', name: 'Rai 3', epgId: 'rai3.it', poster: COVER_P+'rai-3.jpg', logo: LOGO_BASE+'rai-3-it.png', bg: COVER_L+'rai-3.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:rai4', name: 'Rai 4', epgId: 'rai4.it', poster: COVER_P+'rai-4.jpg', logo: LOGO_BASE+'rai-4-it.png', bg: COVER_L+'rai-4.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:rai5', name: 'Rai 5', epgId: 'rai5.it', poster: COVER_P+'rai-5.jpg', logo: LOGO_BASE+'rai-5-it.png', bg: COVER_L+'rai-5.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:raimovie', name: 'Rai Movie', epgId: 'raimovie.it', poster: COVER_P+'rai-movie.jpg', logo: LOGO_BASE+'rai-movie-it.png', bg: COVER_L+'rai-movie.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:raipremium', name: 'Rai Premium', epgId: 'raipremium.it', poster: COVER_P+'rai-premium.jpg', logo: LOGO_BASE+'rai-premium-it.png', bg: COVER_L+'rai-premium.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:raigulp', name: 'Rai Gulp', epgId: 'raigulp.it', poster: COVER_P+'rai-gulp.jpg', logo: LOGO_BASE+'rai-gulp-it.png', bg: COVER_L+'rai-gulp.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:raiyoyo', name: 'Rai Yoyo', epgId: 'raiyoyo.it', poster: COVER_P+'rai-yoyo.jpg', logo: LOGO_BASE+'rai-yoyo-it.png', bg: COVER_L+'rai-yoyo.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:rainews24', name: 'Rai News 24', epgId: 'rainews24.it', poster: COVER_P+'rai-news-24.jpg', logo: LOGO_BASE+'rai-news-24-it.png', bg: COVER_L+'rai-news-24.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:raistoria', name: 'Rai Storia', epgId: 'raistoria.it', poster: COVER_P+'rai-storia.jpg', logo: LOGO_BASE+'rai-storia-it.png', bg: COVER_L+'rai-storia.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:raiscuola', name: 'Rai Scuola', epgId: 'raiscuola.it', poster: COVER_P+'rai-scuola.jpg', logo: LOGO_BASE+'rai-scuola-it.png', bg: COVER_L+'rai-scuola.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:raisport', name: 'Rai Sport', epgId: 'raisport+hd.it', poster: COVER_P+'rai-sport.jpg', logo: LOGO_BASE+'rai-sport-it.png', bg: COVER_L+'rai-sport.jpg', catalog: 'rai', playlist: 'zappr' },
    { id: 'mpdtv:rai4k', name: 'Rai 4K', epgId: null, poster: COVER_P+'rai-4k.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'rai-4k.jpg', catalog: 'rai', playlist: 'zappr' },

    // MEDIASET
    { id: 'mpdtv:canale5', name: 'Canale 5', epgId: 'canale5.it', poster: COVER_P+'canale-5.jpg', logo: LOGO_BASE+'canale5-it.png', bg: COVER_L+'canale-5.jpg', catalog: 'mediaset', playlist: 'zappr' },
    { id: 'mpdtv:italia1', name: 'Italia 1', epgId: 'italia1.it', poster: COVER_P+'italia-1.jpg', logo: LOGO_BASE+'italia1-it.png', bg: COVER_L+'italia-1.jpg', catalog: 'mediaset', playlist: 'zappr' },
    { id: 'mpdtv:italia2', name: 'Italia 2', epgId: 'italia2.it', poster: COVER_P+'italia-2.jpg', logo: LOGO_BASE+'italia2-it.png', bg: COVER_L+'italia-2.jpg', catalog: 'mediaset', playlist: 'zappr' },
    { id: 'mpdtv:rete4', name: 'Rete 4', epgId: 'rete4.it', poster: COVER_P+'rete-4.jpg', logo: LOGO_BASE+'rete4-it.png', bg: COVER_L+'rete-4.jpg', catalog: 'mediaset', playlist: 'zappr' },
    { id: 'mpdtv:iris', name: 'Iris', epgId: 'iris.it', poster: COVER_P+'iris.jpg', logo: LOGO_BASE+'iris-it.png', bg: COVER_L+'iris.jpg', catalog: 'mediaset', playlist: 'zappr' },
    { id: 'mpdtv:la5', name: 'La5', epgId: 'la5.it', poster: COVER_P+'la-5.jpg', logo: LOGO_BASE+'la5-it.png', bg: COVER_L+'la-5.jpg', catalog: 'mediaset', playlist: 'zappr' },
    { id: 'mpdtv:twentyseven', name: 'TwentySeven', epgId: 'twentyseven.it', poster: COVER_P+'twenty-seven.jpg', logo: LOGO_BASE+'twenty-seven-it.png', bg: COVER_L+'twenty-seven.jpg', catalog: 'mediaset', playlist: 'zappr' },
    { id: 'mpdtv:20mediaset', name: '20 Mediaset', epgId: '20.it', poster: COVER_P+'20-mediaset.jpg', logo: LOGO_BASE+'20-it.png', bg: COVER_L+'20-mediaset.jpg', catalog: 'mediaset', playlist: 'zappr' },
    { id: 'mpdtv:mediasetextra', name: 'Mediaset Extra', epgId: 'mediasetextra.it', poster: COVER_P+'mediaset-extra.jpg', logo: LOGO_BASE+'mediaset-extra-it.png', bg: COVER_L+'mediaset-extra.jpg', catalog: 'mediaset', playlist: 'zappr' },
    { id: 'mpdtv:topcrime', name: 'Top Crime', epgId: 'topcrime.it', poster: COVER_P+'top-crime.jpg', logo: LOGO_BASE+'top-crime-it.png', bg: COVER_L+'top-crime.jpg', catalog: 'mediaset', playlist: 'zappr' },
    { id: 'mpdtv:focus', name: 'Focus', epgId: null, poster: COVER_P+'focus.jpg', logo: LOGO_BASE+'focus-it.png', bg: COVER_L+'focus.jpg', catalog: 'mediaset', playlist: 'zappr' },
    { id: 'mpdtv:cine34', name: 'Cine34', epgId: null, poster: COVER_P+'cine-34.jpg', logo: LOGO_BASE+'cine34-it.png', bg: COVER_L+'cine-34.jpg', catalog: 'mediaset', playlist: 'zappr' },

    // SKY CINEMA
    { id: 'mpdtv:skycinemauno', name: 'Sky Cinema Uno', epgId: null, poster: COVER_P+'sky-cinema-uno.jpg', logo: LOGO_BASE+'sky-cinema-uno-it.png', bg: COVER_L+'sky-cinema-uno.jpg', catalog: 'skycinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemadue', name: 'Sky Cinema Due', epgId: null, poster: COVER_P+'sky-cinema-due.jpg', logo: LOGO_BASE+'sky-cinema-due-it.png', bg: COVER_L+'sky-cinema-due.jpg', catalog: 'skycinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemaaction', name: 'Sky Cinema Action', epgId: null, poster: COVER_P+'sky-cinema-action.jpg', logo: LOGO_BASE+'sky-cinema-action-it.png', bg: COVER_L+'sky-cinema-action.jpg', catalog: 'skycinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemacollection', name: 'Sky Cinema Collection', epgId: null, poster: COVER_P+'sky-cinema-collection.jpg', logo: LOGO_BASE+'sky-cinema-collection-it.png', bg: COVER_L+'sky-cinema-collection.jpg', catalog: 'skycinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemacomedy', name: 'Sky Cinema Comedy', epgId: null, poster: COVER_P+'sky-cinema-comedy.jpg', logo: LOGO_BASE+'sky-cinema-comedy-it.png', bg: COVER_L+'sky-cinema-comedy.jpg', catalog: 'skycinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemadrama', name: 'Sky Cinema Drama', epgId: null, poster: COVER_P+'sky-cinema-drama.jpg', logo: LOGO_BASE+'sky-cinema-drama-it.png', bg: COVER_L+'sky-cinema-drama.jpg', catalog: 'skycinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemaillumination', name: 'Sky Cinema Illumination', epgId: null, poster: COVER_P+'sky-cinema-family.jpg', logo: LOGO_BASE+'sky-cinema-family-it.png', bg: COVER_L+'sky-cinema-family.jpg', catalog: 'skycinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemaromance', name: 'Sky Cinema Romance', epgId: null, poster: COVER_P+'sky-cinema-romance.jpg', logo: LOGO_BASE+'sky-cinema-romance-it.png', bg: COVER_L+'sky-cinema-romance.jpg', catalog: 'skycinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycinemasuspense', name: 'Sky Cinema Suspense', epgId: null, poster: COVER_P+'sky-cinema-suspense.jpg', logo: LOGO_BASE+'sky-cinema-suspense-it.png', bg: COVER_L+'sky-cinema-suspense.jpg', catalog: 'skycinema', playlist: 'uaznao' },
    { id: 'mpdtv:skycrime', name: 'Sky Crime', epgId: null, poster: COVER_P+'sky-crime.jpg', logo: LOGO_BASE+'sky-crime-it.png', bg: COVER_L+'sky-crime.jpg', catalog: 'skycinema', playlist: 'uaznao' },

    // SKY SERIE
    { id: 'mpdtv:skyatlantic', name: 'Sky Atlantic', epgId: null, poster: COVER_P+'sky-atlantic.jpg', logo: LOGO_BASE+'sky-atlantic-it.png', bg: COVER_L+'sky-atlantic.jpg', catalog: 'skyserie', playlist: 'uaznao' },
    { id: 'mpdtv:skyserie', name: 'Sky Serie', epgId: null, poster: COVER_P+'sky-serie.jpg', logo: LOGO_BASE+'sky-serie-it.png', bg: COVER_L+'sky-serie.jpg', catalog: 'skyserie', playlist: 'uaznao' },

    // SKY INTRATTENIMENTO
    { id: 'mpdtv:skyuno', name: 'Sky Uno', epgId: null, poster: COVER_P+'sky-uno.jpg', logo: LOGO_BASE+'sky-uno-it.png', bg: COVER_L+'sky-uno.jpg', catalog: 'skyintrattenimento', playlist: 'uaznao' },
    { id: 'mpdtv:skycollection', name: 'Sky Collection', epgId: null, poster: COVER_P+'sky-collection.jpg', logo: LOGO_BASE+'sky-collection-it.png', bg: COVER_L+'sky-collection.jpg', catalog: 'skyintrattenimento', playlist: 'uaznao' },
    { id: 'mpdtv:skyadventure', name: 'Sky Adventure', epgId: null, poster: COVER_P+'sky-adventure.jpg', logo: LOGO_BASE+'sky-adventure-it.png', bg: COVER_L+'sky-adventure.jpg', catalog: 'skyintrattenimento', playlist: 'uaznao' },
    { id: 'mpdtv:skyinvestigation', name: 'Sky Investigation', epgId: null, poster: COVER_P+'sky-investigation.jpg', logo: LOGO_BASE+'sky-investigation-it.png', bg: COVER_L+'sky-investigation.jpg', catalog: 'skyintrattenimento', playlist: 'uaznao' },

    // SKY SPORT
    { id: 'mpdtv:skysportuno', name: 'Sky Sport Uno', epgId: null, poster: COVER_P+'sky-sport-uno.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-uno.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportmax', name: 'Sky Sport Max', epgId: null, poster: COVER_P+'sky-sport-max.jpg', logo: LOGO_BASE+'sky-sport-max-it.png', bg: COVER_L+'sky-sport-max.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportcalcio', name: 'Sky Sport Calcio', epgId: null, poster: COVER_P+'sky-sport-calcio.jpg', logo: LOGO_BASE+'sky-sport-calcio-it.png', bg: COVER_L+'sky-sport-calcio.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportf1', name: 'Sky Sport F1', epgId: null, poster: COVER_P+'sky-sport-f1.jpg', logo: LOGO_BASE+'sky-sport-f1-it.png', bg: COVER_L+'sky-sport-f1.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportmotogp', name: 'Sky Sport MotoGP', epgId: null, poster: COVER_P+'sky-sport-motogp.jpg', logo: LOGO_BASE+'sky-sport-motogp-it.png', bg: COVER_L+'sky-sport-motogp.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysporttennis', name: 'Sky Sport Tennis', epgId: null, poster: COVER_P+'sky-sport-tennis.jpg', logo: LOGO_BASE+'sky-sport-tennis-it.png', bg: COVER_L+'sky-sport-tennis.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportgolf', name: 'Sky Sport Golf', epgId: null, poster: COVER_P+'sky-sport-golf.jpg', logo: LOGO_BASE+'sky-sport-golf-it.png', bg: COVER_L+'sky-sport-golf.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportbasket', name: 'Sky Sport Basket', epgId: null, poster: COVER_P+'sky-sport-basket.jpg', logo: LOGO_BASE+'sky-sport-nba-it.png', bg: COVER_L+'sky-sport-basket.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportarena', name: 'Sky Sport Arena', epgId: null, poster: COVER_P+'sky-sport-arena.jpg', logo: LOGO_BASE+'sky-sport-arena-it.png', bg: COVER_L+'sky-sport-arena.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportlegend', name: 'Sky Sport Legend', epgId: null, poster: COVER_P+'sky-sport-legend.jpg', logo: LOGO_BASE+'sky-sport-legend-it.png', bg: COVER_L+'sky-sport-legend.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysportmix', name: 'Sky Sport Mix', epgId: null, poster: COVER_P+'sky-sport-mix.jpg', logo: LOGO_BASE+'sky-sport-mix-it.png', bg: COVER_L+'sky-sport-mix.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport24', name: 'Sky Sport 24', epgId: null, poster: COVER_P+'sky-sport-24.jpg', logo: LOGO_BASE+'sky-sport-24-it.png', bg: COVER_L+'sky-sport-24.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport251', name: 'Sky Sport 251', epgId: null, poster: COVER_P+'sky-sport-251.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-251.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport252', name: 'Sky Sport 252', epgId: null, poster: COVER_P+'sky-sport-252.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-252.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport253', name: 'Sky Sport 253', epgId: null, poster: COVER_P+'sky-sport-253.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-253.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport254', name: 'Sky Sport 254', epgId: null, poster: COVER_P+'sky-sport-254.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-254.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport255', name: 'Sky Sport 255', epgId: null, poster: COVER_P+'sky-sport-255.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-255.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport256', name: 'Sky Sport 256', epgId: null, poster: COVER_P+'sky-sport-256.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-256.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport257', name: 'Sky Sport 257', epgId: null, poster: COVER_P+'sky-sport-257.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-257.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport258', name: 'Sky Sport 258', epgId: null, poster: COVER_P+'sky-sport-258.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-258.jpg', catalog: 'skysport', playlist: 'uaznao' },
    { id: 'mpdtv:skysport259', name: 'Sky Sport 259', epgId: null, poster: COVER_P+'sky-sport-259.jpg', logo: LOGO_BASE+'sky-sport-uno-it.png', bg: COVER_L+'sky-sport-259.jpg', catalog: 'skysport', playlist: 'uaznao' },

    // SKY DOCUMENTARI
    { id: 'mpdtv:skyarte', name: 'Sky Arte', epgId: null, poster: COVER_P+'sky-arte.jpg', logo: LOGO_BASE+'sky-arte-it.png', bg: COVER_L+'sky-arte.jpg', catalog: 'skydoc', playlist: 'uaznao' },
    { id: 'mpdtv:skydocumentaries', name: 'Sky Documentaries', epgId: null, poster: COVER_P+'sky-documentaries.jpg', logo: LOGO_BASE+'sky-documentaries-it.png', bg: COVER_L+'sky-documentaries.jpg', catalog: 'skydoc', playlist: 'uaznao' },
    { id: 'mpdtv:skynature', name: 'Sky Nature', epgId: null, poster: COVER_P+'sky-nature.jpg', logo: LOGO_BASE+'sky-nature-it.png', bg: COVER_L+'sky-nature.jpg', catalog: 'skydoc', playlist: 'uaznao' },

    // SKY NEWS
    { id: 'mpdtv:skytg24', name: 'Sky TG24', epgId: 'skytg24.it', poster: COVER_P+'sky-tg-24.jpg', logo: LOGO_BASE+'sky-tg24-it.png', bg: COVER_L+'sky-tg-24.jpg', catalog: 'skynews', playlist: 'uaznao' },

    // SPORT
    { id: 'mpdtv:dazn1', name: 'Dazn 1', epgId: null, poster: COVER_P+'dazn-1.jpg', logo: LOGO_BASE+'dazn-channel-it.png', bg: COVER_L+'dazn-1.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:dazn2', name: 'Dazn 2', epgId: null, poster: COVER_P+'dazn-2.jpg', logo: LOGO_BASE+'dazn-channel-it.png', bg: COVER_L+'dazn-2.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:dazn3', name: 'Dazn 3', epgId: null, poster: COVER_P+'dazn-3.jpg', logo: LOGO_BASE+'dazn-channel-it.png', bg: COVER_L+'dazn-3.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:dazn4', name: 'Dazn 4', epgId: null, poster: COVER_P+'dazn-4.jpg', logo: LOGO_BASE+'dazn-channel-it.png', bg: COVER_L+'dazn-4.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:dazn5', name: 'Dazn 5', epgId: null, poster: COVER_P+'dazn-1.jpg', logo: LOGO_BASE+'dazn-channel-it.png', bg: COVER_L+'dazn-1.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport1', name: 'Eurosport 1', epgId: null, poster: COVER_P+'eurosport-1.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-1.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport2', name: 'Eurosport 2', epgId: null, poster: COVER_P+'eurosport-2.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-2.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport3', name: 'Eurosport 3', epgId: null, poster: COVER_P+'eurosport-3.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-3.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport4', name: 'Eurosport 4', epgId: null, poster: COVER_P+'eurosport-4.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-4.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport5', name: 'Eurosport 5', epgId: null, poster: COVER_P+'eurosport-5.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-5.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:eurosport6', name: 'Eurosport 6', epgId: null, poster: COVER_P+'eurosport-6.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'eurosport-6.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv1', name: 'Sport TV 1', epgId: null, poster: COVER_P+'sport-tv-1.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-1.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv2', name: 'Sport TV 2', epgId: null, poster: COVER_P+'sport-tv-2.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-2.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv3', name: 'Sport TV 3', epgId: null, poster: COVER_P+'sport-tv-3.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-3.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv4', name: 'Sport TV 4', epgId: null, poster: COVER_P+'sport-tv-4.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-4.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv5', name: 'Sport TV 5', epgId: null, poster: COVER_P+'sport-tv-5.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-5.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:sporttv6', name: 'Sport TV 6', epgId: null, poster: COVER_P+'sport-tv-6.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-tv-6.jpg', catalog: 'sport', playlist: 'uaznao' },
    { id: 'mpdtv:sportitalia', name: 'Sportitalia', epgId: 'sportitalia.it', poster: COVER_P+'sport-italia.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'sport-italia.jpg', catalog: 'sport', playlist: 'zappr' },
    { id: 'mpdtv:supertennis', name: 'SuperTennis', epgId: 'supertennis.it', poster: COVER_P+'supertennis.jpg', logo: LOGO_BASE+'super-tennis-it.png', bg: COVER_L+'supertennis.jpg', catalog: 'sport', playlist: 'zappr' },

    // BAMBINI
    { id: 'mpdtv:boomerang', name: 'Boomerang', epgId: null, poster: COVER_P+'boomerang.jpg', logo: LOGO_BASE+'boomerang-it.png', bg: COVER_L+'boomerang.jpg', catalog: 'bambini', playlist: 'uaznao' },
    { id: 'mpdtv:cartoonnetwork', name: 'Cartoon Network', epgId: null, poster: COVER_P+'cartoon-network.jpg', logo: LOGO_BASE+'cartoon-network-it.png', bg: COVER_L+'cartoon-network.jpg', catalog: 'bambini', playlist: 'uaznao' },
    { id: 'mpdtv:deakids', name: 'DeAKids', epgId: null, poster: COVER_P+'deakids.jpg', logo: LOGO_BASE+'dea-kids-it.png', bg: COVER_L+'deakids.jpg', catalog: 'bambini', playlist: 'uaznao' },
    { id: 'mpdtv:nickjr', name: 'Nick Jr', epgId: null, poster: COVER_P+'nick-jr.jpg', logo: LOGO_BASE+'nick-jr-it.png', bg: COVER_L+'nick-jr.jpg', catalog: 'bambini', playlist: 'uaznao' },
    { id: 'mpdtv:nickelodeon', name: 'Nickelodeon', epgId: null, poster: COVER_P+'nickelodeon.jpg', logo: LOGO_BASE+'nickelodeon-it.png', bg: COVER_L+'nickelodeon.jpg', catalog: 'bambini', playlist: 'uaznao' },
    { id: 'mpdtv:boing', name: 'Boing', epgId: 'boing.it', poster: COVER_P+'boing.jpg', logo: LOGO_BASE+'boing-it.png', bg: COVER_L+'boing.jpg', catalog: 'bambini', playlist: 'zappr' },
    { id: 'mpdtv:boingplus', name: 'Boing Plus', epgId: 'boingplus.it', poster: COVER_P+'boing.jpg', logo: LOGO_BASE+'boing-it.png', bg: COVER_L+'boing.jpg', catalog: 'bambini', playlist: 'zappr' },
    { id: 'mpdtv:k2', name: 'K2', epgId: 'k2.it', poster: COVER_P+'k2.jpg', logo: LOGO_BASE+'k2-it.png', bg: COVER_L+'k2.jpg', catalog: 'bambini', playlist: 'zappr' },
    { id: 'mpdtv:frisbee', name: 'Frisbee', epgId: 'frisbee.it', poster: COVER_P+'frisbee.jpg', logo: LOGO_BASE+'frisbee-it.png', bg: COVER_L+'frisbee.jpg', catalog: 'bambini', playlist: 'zappr' },
    { id: 'mpdtv:cartoonito', name: 'Cartoonito', epgId: 'cartoonito.it', poster: COVER_P+'cartoonito.jpg', logo: LOGO_BASE+'cartoonito-it.png', bg: COVER_L+'cartoonito.jpg', catalog: 'bambini', playlist: 'zappr' },
    { id: 'mpdtv:super', name: 'Super!', epgId: null, poster: COVER_P+'super.jpg', logo: LOGO_BASE+'super-it.png', bg: COVER_L+'super.jpg', catalog: 'bambini', playlist: 'zappr' },

    // DOCUMENTARI
    { id: 'mpdtv:history', name: 'History', epgId: null, poster: COVER_P+'history.jpg', logo: LOGO_BASE+'history-channel-it.png', bg: COVER_L+'history.jpg', catalog: 'documentari', playlist: 'uaznao' },
    { id: 'mpdtv:discovery', name: 'Discovery', epgId: 'discovery.it', poster: COVER_P+'discovery-channel.jpg', logo: LOGO_BASE+'discovery-channel-it.png', bg: COVER_L+'discovery-channel.jpg', catalog: 'documentari', playlist: 'zappr' },
    { id: 'mpdtv:discoveryturbo', name: 'Discovery Turbo', epgId: 'discoveryturbo.it', poster: COVER_P+'discovery-turbo.jpg', logo: LOGO_BASE+'discovery-turbo-it.png', bg: COVER_L+'discovery-turbo.jpg', catalog: 'documentari', playlist: 'zappr' },

    // ALTRO
    { id: 'mpdtv:la7', name: 'LA7', epgId: 'la7.it', poster: COVER_P+'la-7.jpg', logo: LOGO_BASE+'la7-it.png', bg: COVER_L+'la-7.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:la7cinema', name: 'LA7 Cinema', epgId: 'la7cinema.it', poster: COVER_P+'la-7-d.jpg', logo: LOGO_BASE+'la7d-it.png', bg: COVER_L+'la-7-d.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:tv8', name: 'TV8', epgId: 'tv8.it', poster: COVER_P+'tv-8.jpg', logo: LOGO_BASE+'tv8-it.png', bg: COVER_L+'tv-8.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:nove', name: 'NOVE', epgId: 'nove.it', poster: COVER_P+'discovery-nove.jpg', logo: LOGO_BASE+'nove-it.png', bg: COVER_L+'discovery-nove.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:cielo', name: 'Cielo', epgId: 'cielo.it', poster: COVER_P+'cielo.jpg', logo: LOGO_BASE+'cielo-it.png', bg: COVER_L+'cielo.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:realtime', name: 'Real Time', epgId: 'realtime.it', poster: COVER_P+'real-time.jpg', logo: LOGO_BASE+'real-time-it.png', bg: COVER_L+'real-time.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:qvc', name: 'QVC', epgId: 'qvc.it', poster: COVER_P+'qvc.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'qvc.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:foodnetwork', name: 'Food Network', epgId: 'foodnetwork.it', poster: COVER_P+'food-network.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'food-network.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:giallo', name: 'Giallo', epgId: 'giallo.it', poster: COVER_P+'giallo.jpg', logo: LOGO_BASE+'giallo-it.png', bg: COVER_L+'giallo.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:dmax', name: 'DMAX', epgId: null, poster: COVER_P+'dmax.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'dmax.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:hgtv', name: 'HGTV - Home & Garden', epgId: null, poster: COVER_P+'hgtv.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'hgtv.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:france24', name: 'France 24', epgId: 'france24.it', poster: COVER_P+'france-24.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'france-24.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:tgcom24', name: 'TGcom24', epgId: 'tgcom24.it', poster: COVER_P+'tgcom-24.jpg', logo: LOGO_BASE+'tgcom24-it.png', bg: COVER_L+'tgcom-24.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:tv2000', name: 'TV2000', epgId: 'tv2000.it', poster: COVER_P+'tv-2000.jpg', logo: LOGO_BASE+'rai-1-it.png', bg: COVER_L+'tv-2000.jpg', catalog: 'altro', playlist: 'zappr' },
    { id: 'mpdtv:mtv', name: 'MTV', epgId: null, poster: COVER_P+'mtv.jpg', logo: LOGO_BASE+'mtv-it.png', bg: COVER_L+'mtv.jpg', catalog: 'musica', playlist: 'uaznao' },
    { id: 'mpdtv:deejaytv', name: 'Deejay TV', epgId: 'deejaytv.it', poster: COVER_P+'deejay-tv.jpg', logo: LOGO_BASE+'deejay-tv-it.png', bg: COVER_L+'deejay-tv.jpg', catalog: 'musica', playlist: 'zappr' },
    { id: 'mpdtv:kisskisstv', name: 'Kiss Kiss TV', epgId: null, poster: COVER_P+'kiss-kiss.jpg', logo: LOGO_BASE+'radio-kiss-kiss-tv-it.png', bg: COVER_L+'kiss-kiss.jpg', catalog: 'musica', playlist: 'zappr' },
];

// Cache playlist
let cacheZappr = null;
let cacheUaznao = null;
let lastFetchZappr = 0;
let lastFetchUaznao = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30 minuti

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

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(({ type, id }) => {
    const metas = CANALI
        .filter(c => c.catalog === id)
        .map(c => ({
            id: c.id,
            type: 'tv',
            name: c.name,
            poster: c.poster,
            logo: c.logo,
            background: c.bg,
        }));
    return Promise.resolve({ metas });
});

builder.defineMetaHandler(({ type, id }) => {
    const canale = CANALI.find(c => c.id === id);
    if (!canale) return Promise.resolve({ meta: null });
    return Promise.resolve({
        meta: {
            id: canale.id,
            type: 'tv',
            name: canale.name,
            poster: canale.poster,
            logo: canale.logo,
            background: canale.bg,
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
            stream.behaviorHints = {
                notWebReady: true,
                bingeGroup: canale.id,
            };
            stream.title = canale.name;
            // Per i canali DRM passiamo le info clearkey
            const parts = streamInfo.licenseKey.split(':');
            if (parts.length === 2) {
                stream.url = streamInfo.url;
                stream.drm = {
                    type: 'clearkey',
                    clearkeys: { [parts[0]]: parts[1] }
                };
            }
        }

        return { streams: [stream] };
    } catch (e) {
        console.error('Stream error:', e);
        return { streams: [] };
    }
});

serveHTTP(builder.getInterface(), { port: 7777 });
console.log('MpdTV addon in ascolto su http://localhost:7777');
