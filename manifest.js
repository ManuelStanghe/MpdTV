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

module.exports = manifest;
