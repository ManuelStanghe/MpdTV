const LOGO_BASE = 'https://raw.githubusercontent.com/ManuelStanghe/Playlist/main/Loghi/';
const COVER_P = 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/generated-covers-world/portrait/';
const COVER_L = 'https://raw.githubusercontent.com/ManuelStanghe/logo/main/generated-covers-world/landscape/';

// Dizionario metadati canali: chiave = nome esatto come nella playlist
const METADATI = {
    // RAI
    'Rai 1':        { epgId: 'rai1.it',        poster: COVER_P+'rai-1.jpg',        logo: LOGO_BASE+'rai-1-it.png',        genre: 'Rai' },
    'Rai 2':        { epgId: 'rai2.it',        poster: COVER_P+'rai-2.jpg',        logo: LOGO_BASE+'rai-2-it.png',        genre: 'Rai' },
    'Rai 3':        { epgId: 'rai3.it',        poster: COVER_P+'rai-3.jpg',        logo: LOGO_BASE+'rai-3-it.png',        genre: 'Rai' },
    'Rai 4':        { epgId: 'rai4.it',        poster: COVER_P+'rai-4.jpg',        logo: LOGO_BASE+'rai-4-it.png',        genre: 'Rai' },
    'Rai 5':        { epgId: 'rai5.it',        poster: COVER_P+'rai-5.jpg',        logo: LOGO_BASE+'rai-5-it.png',        genre: 'Rai' },
    'Rai Movie':    { epgId: 'raimovie.it',    poster: COVER_P+'rai-movie.jpg',    logo: LOGO_BASE+'rai-movie-it.png',    genre: 'Rai' },
    'Rai Premium':  { epgId: 'raipremium.it',  poster: COVER_P+'rai-premium.jpg',  logo: LOGO_BASE+'rai-premium-it.png',  genre: 'Rai' },
    'Rai Gulp':     { epgId: 'raigulp.it',     poster: COVER_P+'rai-gulp.jpg',     logo: LOGO_BASE+'rai-gulp-it.png',     genre: 'Rai' },
    'Rai Yoyo':     { epgId: 'raiyoyo.it',     poster: COVER_P+'rai-yoyo.jpg',     logo: LOGO_BASE+'rai-yoyo-it.png',     genre: 'Rai' },
    'Rai News 24':  { epgId: 'rainews24.it',   poster: COVER_P+'rai-news-24.jpg',  logo: LOGO_BASE+'rai-news-24-it.png',  genre: 'Rai' },
    'Rai Storia':   { epgId: 'raistoria.it',   poster: COVER_P+'rai-storia.jpg',   logo: LOGO_BASE+'rai-storia-it.png',   genre: 'Rai' },
    'Rai Scuola':   { epgId: 'raiscuola.it',   poster: COVER_P+'rai-scuola.jpg',   logo: LOGO_BASE+'rai-scuola-it.png',   genre: 'Rai' },
    'Rai Sport':    { epgId: 'raisport+hd.it', poster: COVER_P+'rai-sport.jpg',    logo: LOGO_BASE+'rai-sport-it.png',    genre: 'Rai' },
    'Rai 4K':       { epgId: null,             poster: COVER_P+'rai-4k.jpg',       logo: LOGO_BASE+'rai_4k.png',          genre: 'Rai' },
    // MEDIASET
    'Canale 5':     { epgId: 'canale5.it',     poster: COVER_P+'canale-5.jpg',     logo: LOGO_BASE+'canale5-it.png',      genre: 'Mediaset' },
    'Italia 1':     { epgId: 'italia1.it',     poster: COVER_P+'italia-1.jpg',     logo: LOGO_BASE+'italia1-it.png',      genre: 'Mediaset' },
    'Italia 2':     { epgId: 'italia2.it',     poster: COVER_P+'italia-2.jpg',     logo: LOGO_BASE+'italia2-it.png',      genre: 'Mediaset' },
    'Rete 4':       { epgId: 'rete4.it',       poster: COVER_P+'rete-4.jpg',       logo: LOGO_BASE+'rete4-it.png',        genre: 'Mediaset' },
    'Iris':         { epgId: 'iris.it',        poster: COVER_P+'iris.jpg',         logo: LOGO_BASE+'iris-it.png',         genre: 'Mediaset' },
    'La5':          { epgId: 'la5.it',         poster: COVER_P+'la-5.jpg',         logo: LOGO_BASE+'la5-it.png',          genre: 'Mediaset' },
    'TwentySeven':  { epgId: 'twentyseven.it', poster: COVER_P+'twenty-seven.jpg', logo: LOGO_BASE+'twenty-seven-it.png', genre: 'Mediaset' },
    '20 Mediaset':  { epgId: '20.it',          poster: COVER_P+'20-mediaset.jpg',  logo: LOGO_BASE+'20-it.png',           genre: 'Mediaset' },
    'Mediaset Extra':{ epgId: 'mediasetextra.it', poster: COVER_P+'mediaset-extra.jpg', logo: LOGO_BASE+'mediaset-extra-it.png', genre: 'Mediaset' },
    'Top Crime':    { epgId: 'topcrime.it',    poster: COVER_P+'top-crime.jpg',    logo: LOGO_BASE+'top-crime-it.png',    genre: 'Mediaset' },
    'Focus':        { epgId: 'focus.it',       poster: COVER_P+'focus.jpg',        logo: LOGO_BASE+'focus-it.png',        genre: 'Mediaset' },
    'Cine34':       { epgId: 'cine34.it',      poster: COVER_P+'cine-34.jpg',      logo: LOGO_BASE+'cine34-it.png',       genre: 'Mediaset' },
    // SKY CINEMA
    'Sky Cinema Uno':        { epgId: 'sky.cinema.uno.it',        poster: COVER_P+'sky-cinema-uno.jpg',        logo: LOGO_BASE+'sky-cinema-uno-it.png',        genre: 'Sky Cinema' },
    'Sky Cinema Due':        { epgId: 'sky.cinema.due.it',        poster: COVER_P+'sky-cinema-due.jpg',        logo: LOGO_BASE+'sky-cinema-due-it.png',        genre: 'Sky Cinema' },
    'Sky Cinema Stories':    { epgId: null,                       poster: COVER_P+'sky-cinema-due.jpg',        logo: LOGO_BASE+'sky-cinema-due-it.png',        genre: 'Sky Cinema' },
    'Sky Cinema Action':     { epgId: 'sky.cinema.action.it',     poster: COVER_P+'sky-cinema-action.jpg',     logo: LOGO_BASE+'sky-cinema-action-it.png',     genre: 'Sky Cinema' },
    'Sky Cinema Collection': { epgId: 'sky.cinema.collection.it', poster: COVER_P+'sky-cinema-collection.jpg', logo: LOGO_BASE+'sky-cinema-collection-it.png', genre: 'Sky Cinema' },
    'Sky Cinema Comedy':     { epgId: 'sky.cinema.comedy.it',     poster: COVER_P+'sky-cinema-comedy.jpg',     logo: LOGO_BASE+'sky-cinema-comedy-it.png',     genre: 'Sky Cinema' },
    'Sky Cinema Drama':      { epgId: 'sky.cinema.drama.it',      poster: COVER_P+'sky-cinema-drama.jpg',      logo: LOGO_BASE+'sky-cinema-drama-it.png',      genre: 'Sky Cinema' },
    'Sky Cinema Illumination':{ epgId: 'sky.cinema.family.it',    poster: COVER_P+'sky-cinema-family.jpg',     logo: LOGO_BASE+'sky-cinema-family-it.png',     genre: 'Sky Cinema' },
    'Sky Cinema Romance':    { epgId: 'sky.cinema.romance.it',    poster: COVER_P+'sky-cinema-romance.jpg',    logo: LOGO_BASE+'sky-cinema-romance-it.png',    genre: 'Sky Cinema' },
    'Sky Cinema Suspense':   { epgId: 'sky.cinema.suspense.it',   poster: COVER_P+'sky-cinema-suspense.jpg',   logo: LOGO_BASE+'sky-cinema-suspense-it.png',   genre: 'Sky Cinema' },
    'Sky Crime':             { epgId: 'sky.crime.it',             poster: COVER_P+'sky-crime.jpg',             logo: LOGO_BASE+'sky-crime-it.png',             genre: 'Sky Cinema' },
    // SKY SERIE
    'Sky Atlantic': { epgId: 'sky.atlantic.it', poster: COVER_P+'sky-atlantic.jpg', logo: LOGO_BASE+'sky-atlantic-it.png', genre: 'Sky Serie' },
    'Sky Serie':    { epgId: 'sky.serie.it',    poster: COVER_P+'sky-serie.jpg',    logo: LOGO_BASE+'sky-serie-it.png',    genre: 'Sky Serie' },
    // SKY INTRATTENIMENTO
    'Sky Uno':        { epgId: 'sky.uno.it',        poster: COVER_P+'sky-uno.jpg',        logo: LOGO_BASE+'sky-uno-it.png',        genre: 'Sky Intrattenimento' },
    'Sky Uno Plus':   { epgId: null,                poster: COVER_P+'sky-uno.jpg',        logo: LOGO_BASE+'sky-uno-it.png',        genre: 'Sky Intrattenimento' },
    'Sky Collection': { epgId: null,                poster: COVER_P+'sky-collection.jpg', logo: LOGO_BASE+'sky-collection-it.png', genre: 'Sky Intrattenimento' },
    'Sky Adventure':  { epgId: 'sky.adventure.it',  poster: COVER_P+'sky-adventure.jpg',  logo: LOGO_BASE+'sky-adventure-it.png',  genre: 'Sky Intrattenimento' },
    'Sky Investigation':{ epgId: 'sky.investigation.it', poster: COVER_P+'sky-investigation.jpg', logo: LOGO_BASE+'sky-investigation-it.png', genre: 'Sky Intrattenimento' },
    // SKY SPORT
    'Sky Sport Uno':    { epgId: 'sky.sport.uno.it',    poster: COVER_P+'sky-sport-uno.jpg',    logo: LOGO_BASE+'sky-sport-uno-it.png',    genre: 'Sky Sport' },
    'Sky Sport Max':    { epgId: 'sky.sport.max.it',    poster: COVER_P+'sky-sport-max.jpg',    logo: LOGO_BASE+'sky-sport-max-it.png',    genre: 'Sky Sport' },
    'Sky Sport Calcio': { epgId: 'sky.sport.calcio.it', poster: COVER_P+'sky-sport-calcio.jpg', logo: LOGO_BASE+'sky-sport-calcio-it.png', genre: 'Sky Sport' },
    'Sky Sport F1':     { epgId: 'sky.sport.f1.it',     poster: COVER_P+'sky-sport-f1.jpg',     logo: LOGO_BASE+'sky-sport-f1-it.png',     genre: 'Sky Sport' },
    'Sky Sport MotoGP': { epgId: 'sky.sport.motogp.it', poster: COVER_P+'sky-sport-motogp.jpg', logo: LOGO_BASE+'sky-sport-motogp-it.png', genre: 'Sky Sport' },
    'Sky Sport Tennis': { epgId: 'sky.sport.tennis.it', poster: COVER_P+'sky-sport-tennis.jpg', logo: LOGO_BASE+'sky-sport-tennis-it.png', genre: 'Sky Sport' },
    'Sky Sport Golf':   { epgId: 'sky.sport.golf.it',   poster: COVER_P+'sky-sport-golf.jpg',   logo: LOGO_BASE+'sky-sport-golf-it.png',   genre: 'Sky Sport' },
    'Sky Sport Basket': { epgId: 'sky.sport.nba.it',    poster: COVER_P+'sky-sport-basket.jpg', logo: LOGO_BASE+'sky-sport-basket.png',    genre: 'Sky Sport' },
    'Sky Sport Arena':  { epgId: 'sky.sport.arena.it',  poster: COVER_P+'sky-sport-arena.jpg',  logo: LOGO_BASE+'sky-sport-arena-it.png',  genre: 'Sky Sport' },
    'Sky Sport Legend': { epgId: 'sky.sport.legend.it', poster: COVER_P+'sky-sport-legend.jpg', logo: LOGO_BASE+'sky-sport-legend-it.png', genre: 'Sky Sport' },
    'Sky Sport Mix':    { epgId: 'sky.sport.mix.it',    poster: COVER_P+'sky-sport-mix.jpg',    logo: LOGO_BASE+'sky-sport-mix-it.png',    genre: 'Sky Sport' },
    'Sky Sport 24':     { epgId: 'sky.sport.24.it',     poster: COVER_P+'sky-sport-24.jpg',     logo: LOGO_BASE+'sky-sport-24-it.png',     genre: 'Sky Sport' },
    'Sky Sport 251':    { epgId: 'sky.sport..251.it',   poster: COVER_P+'sky-sport-251.jpg',    logo: LOGO_BASE+'sky-sport-uno-it.png',    genre: 'Sky Sport' },
    'Sky Sport 252':    { epgId: 'sky.sport..252.it',   poster: COVER_P+'sky-sport-252.jpg',    logo: LOGO_BASE+'sky-sport-uno-it.png',    genre: 'Sky Sport' },
    'Sky Sport 253':    { epgId: 'sky.sport..253.it',   poster: COVER_P+'sky-sport-253.jpg',    logo: LOGO_BASE+'sky-sport-uno-it.png',    genre: 'Sky Sport' },
    'Sky Sport 254':    { epgId: 'sky.sport..254.it',   poster: COVER_P+'sky-sport-254.jpg',    logo: LOGO_BASE+'sky-sport-uno-it.png',    genre: 'Sky Sport' },
    'Sky Sport 255':    { epgId: 'sky.sport..255.it',   poster: COVER_P+'sky-sport-255.jpg',    logo: LOGO_BASE+'sky-sport-uno-it.png',    genre: 'Sky Sport' },
    'Sky Sport 256':    { epgId: 'sky.sport..256.it',   poster: COVER_P+'sky-sport-256.jpg',    logo: LOGO_BASE+'sky-sport-uno-it.png',    genre: 'Sky Sport' },
    'Sky Sport 257':    { epgId: 'sky.sport..257.it',   poster: COVER_P+'sky-sport-257.jpg',    logo: LOGO_BASE+'sky-sport-uno-it.png',    genre: 'Sky Sport' },
    'Sky Sport 258':    { epgId: 'sky.sport..258.it',   poster: COVER_P+'sky-sport-258.jpg',    logo: LOGO_BASE+'sky-sport-uno-it.png',    genre: 'Sky Sport' },
    'Sky Sport 259':    { epgId: 'sky.sport..259.it',   poster: COVER_P+'sky-sport-259.jpg',    logo: LOGO_BASE+'sky-sport-uno-it.png',    genre: 'Sky Sport' },
    // SKY DOCUMENTARI
    'Sky Arte':         { epgId: 'sky.arte.it',         poster: COVER_P+'sky-arte.jpg',         logo: LOGO_BASE+'sky-arte-it.png',         genre: 'Sky Documentari' },
    'Sky Documentaries':{ epgId: 'sky.documentaries.it',poster: COVER_P+'sky-documentaries.jpg',logo: LOGO_BASE+'sky-documentaries-it.png',genre: 'Sky Documentari' },
    'Sky Nature':       { epgId: 'sky.nature.it',       poster: COVER_P+'sky-nature.jpg',       logo: LOGO_BASE+'sky-nature-it.png',        genre: 'Sky Documentari' },
    // SKY NEWS
    'Sky TG24': { epgId: 'sky.tg24.it', poster: COVER_P+'sky-tg-24.jpg', logo: LOGO_BASE+'sky-tg24-it.png', genre: 'Sky News' },
    // SPORT
    'Dazn 1':     { epgId: 'dazn.1.it.it',         poster: COVER_P+'dazn-1.jpg',    logo: LOGO_BASE+'dazn-channel-it.png', genre: 'Sport' },
    'Dazn 2':     { epgId: 'dazn.2.it.it',         poster: COVER_P+'dazn-2.jpg',    logo: LOGO_BASE+'dazn-channel-it.png', genre: 'Sport' },
    'Dazn 3':     { epgId: 'dazn.3.it.it',         poster: COVER_P+'dazn-3.jpg',    logo: LOGO_BASE+'dazn-channel-it.png', genre: 'Sport' },
    'Dazn 4':     { epgId: 'dazn4.it',             poster: COVER_P+'dazn-4.jpg',    logo: LOGO_BASE+'dazn-channel-it.png', genre: 'Sport' },
    'Dazn 5':     { epgId: 'dazn5.it',             poster: COVER_P+'dazn-1.jpg',    logo: LOGO_BASE+'dazn-channel-it.png', genre: 'Sport' },
    'Eurosport 1':{ epgId: 'eurosport.1.italia.it', poster: COVER_P+'eurosport-1.jpg', logo: LOGO_BASE+'rai-1-it.png',     genre: 'Sport' },
    'Eurosport 2':{ epgId: 'eurosport.2.italia.it', poster: COVER_P+'eurosport-2.jpg', logo: LOGO_BASE+'rai-1-it.png',     genre: 'Sport' },
    'Eurosport 3':{ epgId: null,                    poster: COVER_P+'eurosport-3.jpg', logo: LOGO_BASE+'rai-1-it.png',     genre: 'Sport' },
    'Eurosport 4':{ epgId: null,                    poster: COVER_P+'eurosport-4.jpg', logo: LOGO_BASE+'rai-1-it.png',     genre: 'Sport' },
    'Eurosport 5':{ epgId: null,                    poster: COVER_P+'eurosport-5.jpg', logo: LOGO_BASE+'rai-1-it.png',     genre: 'Sport' },
    'Eurosport 6':{ epgId: null,                    poster: COVER_P+'eurosport-6.jpg', logo: LOGO_BASE+'rai-1-it.png',     genre: 'Sport' },
    'Sport TV 1': { epgId: null, poster: COVER_P+'sport-tv-1.jpg', logo: LOGO_BASE+'rai-1-it.png', genre: 'Sport' },
    'Sport TV 2': { epgId: null, poster: COVER_P+'sport-tv-2.jpg', logo: LOGO_BASE+'rai-1-it.png', genre: 'Sport' },
    'Sport TV 3': { epgId: null, poster: COVER_P+'sport-tv-3.jpg', logo: LOGO_BASE+'rai-1-it.png', genre: 'Sport' },
    'Sport TV 4': { epgId: null, poster: COVER_P+'sport-tv-4.jpg', logo: LOGO_BASE+'rai-1-it.png', genre: 'Sport' },
    'Sport TV 5': { epgId: null, poster: COVER_P+'sport-tv-5.jpg', logo: LOGO_BASE+'rai-1-it.png', genre: 'Sport' },
    'Sport TV 6': { epgId: null, poster: COVER_P+'sport-tv-6.jpg', logo: LOGO_BASE+'rai-1-it.png', genre: 'Sport' },
    'Sportitalia': { epgId: 'sportitalia.it', poster: COVER_P+'sport-italia.jpg', logo: LOGO_BASE+'rai-1-it.png',       genre: 'Sport' },
    'SuperTennis': { epgId: 'supertennis.hd.it', poster: COVER_P+'supertennis.jpg', logo: LOGO_BASE+'super-tennis-it.png', genre: 'Sport' },
    // BAMBINI
    'Boomerang':      { epgId: 'boomerang.it',      poster: COVER_P+'boomerang.jpg',      logo: LOGO_BASE+'boomerang-it.png',      genre: 'Bambini' },
    'Cartoon Network':{ epgId: 'cartoon.network.it',poster: COVER_P+'cartoon-network.jpg',logo: LOGO_BASE+'cartoon-network-it.png',genre: 'Bambini' },
    'DeAKids':        { epgId: 'deakids.it',        poster: COVER_P+'deakids.jpg',        logo: LOGO_BASE+'dea-kids-it.png',       genre: 'Bambini' },
    'Nick Jr':        { epgId: 'nick.jr.it',        poster: COVER_P+'nick-jr.jpg',        logo: LOGO_BASE+'nick-jr-it.png',        genre: 'Bambini' },
    'Nickelodeon':    { epgId: 'nickelodeon.it',    poster: COVER_P+'nickelodeon.jpg',    logo: LOGO_BASE+'nickelodeon-it.png',    genre: 'Bambini' },
    'Boing':          { epgId: 'boing.it',          poster: COVER_P+'boing.jpg',          logo: LOGO_BASE+'boing-it.png',          genre: 'Bambini' },
    'Boing Plus':     { epgId: 'boingplus.it',      poster: COVER_P+'boing.jpg',          logo: LOGO_BASE+'boing-it.png',          genre: 'Bambini' },
    'K2':             { epgId: 'k2.it',             poster: COVER_P+'k2.jpg',             logo: LOGO_BASE+'k2-it.png',             genre: 'Bambini' },
    'Frisbee':        { epgId: 'frisbee.it',        poster: COVER_P+'frisbee.jpg',        logo: LOGO_BASE+'frisbee-it.png',        genre: 'Bambini' },
    'Cartoonito':     { epgId: 'cartoonito.it',     poster: COVER_P+'cartoonito.jpg',     logo: LOGO_BASE+'cartoonito-it.png',     genre: 'Bambini' },
    'Super!':         { epgId: 'super!.it',         poster: COVER_P+'super.jpg',          logo: LOGO_BASE+'super-it.png',          genre: 'Bambini' },
    // DOCUMENTARI
    'History':          { epgId: 'history.it',         poster: COVER_P+'history.jpg',          logo: LOGO_BASE+'history-channel-it.png',  genre: 'Documentari' },
    'Discovery':        { epgId: 'discovery.it',       poster: COVER_P+'discovery-channel.jpg', logo: LOGO_BASE+'discovery-channel-it.png',genre: 'Documentari' },
    'Discovery Turbo':  { epgId: 'discoveryturbo.it',  poster: COVER_P+'discovery-turbo.jpg',  logo: LOGO_BASE+'discovery-turbo-it.png',  genre: 'Documentari' },
    // MUSICA
    'MTV':        { epgId: 'mtv.hd.it',   poster: COVER_P+'mtv.jpg',       logo: LOGO_BASE+'mtv-it.png',               genre: 'Musica' },
    'Deejay TV':  { epgId: 'deejaytv.it', poster: COVER_P+'deejay-tv.jpg', logo: LOGO_BASE+'deejay-tv-it.png',         genre: 'Musica' },
    'Kiss Kiss TV':{ epgId: null,         poster: COVER_P+'kiss-kiss.jpg',  logo: LOGO_BASE+'radio-kiss-kiss-tv-it.png',genre: 'Musica' },
    // ALTRO
    'LA7':                { epgId: 'la7.it',            poster: COVER_P+'la-7.jpg',       logo: LOGO_BASE+'la7-it.png',       genre: 'Altro' },
    'LA7 Cinema':         { epgId: 'la7cinema.it',      poster: COVER_P+'la-7-d.jpg',     logo: LOGO_BASE+'la7d-it.png',      genre: 'Altro' },
    'TV8':                { epgId: 'tv8.hd.it',         poster: COVER_P+'tv-8.jpg',       logo: LOGO_BASE+'tv8-it.png',       genre: 'Altro' },
    'NOVE':               { epgId: 'nove.it',           poster: COVER_P+'discovery-nove.jpg', logo: LOGO_BASE+'nove-it.png',  genre: 'Altro' },
    'Cielo':              { epgId: 'cielo.it',          poster: COVER_P+'cielo.jpg',      logo: LOGO_BASE+'cielo-it.png',     genre: 'Altro' },
    'Real Time':          { epgId: 'realtime.it',       poster: COVER_P+'real-time.jpg',  logo: LOGO_BASE+'real-time-it.png', genre: 'Altro' },
    'QVC':                { epgId: 'qvc.it',            poster: COVER_P+'qvc.jpg',        logo: LOGO_BASE+'rai-1-it.png',     genre: 'Altro' },
    'Food Network':       { epgId: 'foodnetwork.it',    poster: COVER_P+'food-network.jpg',logo: LOGO_BASE+'rai-1-it.png',    genre: 'Altro' },
    'Giallo':             { epgId: 'giallo.it',         poster: COVER_P+'giallo.jpg',     logo: LOGO_BASE+'giallo-it.png',    genre: 'Altro' },
    'DMAX':               { epgId: 'dmax.it',           poster: COVER_P+'dmax.jpg',       logo: LOGO_BASE+'rai-1-it.png',     genre: 'Altro' },
    'HGTV - Home & Garden':{ epgId: 'hgtvhomeandgarden.it', poster: COVER_P+'hgtv.jpg',  logo: LOGO_BASE+'rai-1-it.png',     genre: 'Altro' },
    'France 24':          { epgId: 'france24.it',       poster: COVER_P+'france-24.jpg',  logo: LOGO_BASE+'rai-1-it.png',     genre: 'Altro' },
    'TGcom24':            { epgId: 'tgcom24.it',        poster: COVER_P+'tgcom-24.jpg',   logo: LOGO_BASE+'tgcom24-it.png',   genre: 'Altro' },
    'TV2000':             { epgId: 'tv2000.it',         poster: COVER_P+'tv-2000.jpg',    logo: LOGO_BASE+'rai-1-it.png',     genre: 'Altro' },
};

// Default per canali senza metadati
const DEFAULT_META = {
    epgId: null,
    poster: null,
    logo: null,
    genre: 'Altro'
};

function getMeta(nome) {
    return METADATI[nome] || { ...DEFAULT_META };
}

module.exports = { METADATI, getMeta };
