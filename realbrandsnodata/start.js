let customCompetitorProducts
let customCompetitorNames = [
    { name: 'Google LLC' },
    { name: 'Facebook Inc.' },
    { name: 'Vimeo Interactive' },
    { name: 'Vivendi' },
    { name: 'Twitter LLC' },
    { name: 'Advance Publications' },
    { name: 'Nextdoor Inc.' },
    { name: 'Oath Inc.' },
    { name: 'Match Group Inc.' },
    { name: 'Wix.com Ltd.' },
    { name: 'Hulu LLC' },
    { name: 'Amazon.com Inc.' },
    { name: 'Otter Media' },
    { name: 'Walmart Inc.' },
    { name: 'eBay Inc.' },
    { name: 'Alibaba Group' },
    { name: 'The Collective LLC' },
    { name: 'Defy Media' },
    { name: 'ByteDance' },
    { name: 'Yahoo LLC' },
    { name: 'Qlipso' },
    { name: 'Twitter Inc.' },
    { name: 'Liveleak LLC' },
    { name: 'Snap Inc.' },
    { name: 'Dish Network' },
    { name: 'Sony Corporation' },
    { name: 'Philo LLC' },
    { name: 'HBO Inc.' },
    { name: 'Netflix Inc.' },
    { name: 'Newmark' },
    { name: 'Saks Inc.' },
    { name: 'Advance Auto Parts Inc.' },
    { name: "Macy's Inc." },
    { name: 'Target Corporation' },
    { name: 'Hangzhou New Century Co. Ltd.' }
]

const rs = GetRootScope()
const debug = str => Helpers.ConsoleInfo(`[MOD] Real Logos: ${str}`)
const originalCompetitorProducts = CompetitorProducts.map(({ logoColorDegree, logoPath, name, owner }) => ({ logoColorDegree, logoPath, name, owner }))
const assignToAllInArray = (arr, obj) => arr.map((item, index) => Object.assign(item, obj[index]))

exports.initialize = modPath => {
    customCompetitorProducts = [
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/youtube.png`,
            name: 'YouTube',
            owner: 'Google LLC'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/vimeo.png`,
            name: 'Vimeo',
            owner: 'Vimeo Interactive'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/dailymotion.png`,
            name: 'DailyMotion',
            owner: 'Vivendi'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/facebook.png`,
            name: 'Facebook',
            owner: 'Facebook Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/twitter.png`,
            name: 'Twitter',
            owner: 'Twitter LLC'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/reddit.png`,
            name: 'Reddit',
            owner: 'Advance Publications'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/nextdoor.png`,
            name: 'NextDoor',
            owner: 'Nextdoor Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/tumblr.png`,
            name: 'Tumblr',
            owner: 'Oath Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/tinder.png`,
            name: 'Tinder',
            owner: 'Match Group Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/deviantart.png`,
            name: 'DeviantArt',
            owner: 'Wix.com Ltd.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/hulu.png`,
            name: 'Hulu',
            owner: 'Hulu LLC'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/twitch.png`,
            name: 'Twitch',
            owner: 'Amazon.com Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/crunchyroll.png`,
            name: 'Crunchyroll',
            owner: 'Otter Media'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/walmart.png`,
            name: 'Walmart',
            owner: 'Walmart Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/ebay.png`,
            name: 'Ebay',
            owner: 'eBay Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/alibaba.png`,
            name: 'Alibaba',
            owner: 'Alibaba Group'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/metacafe.png`,
            name: 'Metacafe',
            owner: 'The Collective LLC'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/break.png`,
            name: 'Break',
            owner: 'Defy Media'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/tiktok.png`,
            name: 'TikTok',
            owner: 'ByteDance'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/flickr.png`,
            name: 'Flickr',
            owner: 'Yahoo LLC'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/veoh.png`,
            name: 'VEOH',
            owner: 'Qlipso'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/vine.png`,
            name: 'Vine',
            owner: 'Twitter Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/liveleak.png`,
            name: 'LiveLeak',
            owner: 'Liveleak LLC'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/blogger.png`,
            name: 'Blogger',
            owner: 'Google LLC'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/instagram.png`,
            name: 'Instagram',
            owner: 'Facebook Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/snapchat.png`,
            name: 'Snapchat',
            owner: 'Snap Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/sling.png`,
            name: 'Sling.tv',
            owner: 'Dish Network'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/imdb.png`,
            name: 'IMDb',
            owner: 'Amazon.com Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/crackle.png`,
            name: 'Crackle',
            owner: 'Sony Corporation'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/philotv.png`,
            name: 'Philo.tv',
            owner: 'Philo LLC'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/hbogo.png`,
            name: 'HBO GO',
            owner: 'HBO Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/netflix.png`,
            name: 'Netflix',
            owner: 'Netflix Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/googleplay.png`,
            name: 'Google Play',
            owner: 'Google LLC'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/craigslist.png`,
            name: 'Craigslist',
            owner: 'Newmark'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/saksofffifth.png`,
            name: 'Saks Off Fifth',
            owner: 'Saks Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/autoparts.png`,
            name: 'Advance Auto Parts',
            owner: 'Advance Auto Parts Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/macys.png`,
            name: "Macy's",
            owner: "Macy's Inc."
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/target.png`,
            name: 'Target',
            owner: 'Target Corporation'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/amazon.png`,
            name: 'Amazon',
            owner: 'Amazon.com Inc.'
        },
        {
            logoColorDegree: 0,
            logoPath: `${modPath}/logos/newegg.png`,
            name: 'Newegg',
            owner: 'Hangzhou New Century Co. Ltd.'
        }
    ]

    $('head').append(`<link rel="stylesheet" type="text/css" href="${modPath}/css/style.css">`)

    assignToAllInArray(Database.competitors, customCompetitorNames)

    assignToAllInArray(CompetitorProducts, customCompetitorProducts)
}

exports.onGameLoad = settings => {
    if (settings) {
        assignToAllInArray(settings.competitorProducts, customCompetitorProducts)
          }
    }
    exports.onNewHour = settings => { }
    exports.onNewDay = settings => { }
    exports.onUnsubscribe = done => {
        //Restores everything to prepare for unsubscription from Steam Workshop
        const re = /^sg_.*json$/;
        Remote.app.getAllFiles(files => {

            const savegames = files.filter(file => re.test(file))

            savegames.forEach((file, index) => Helpers.LoadSettings(file, settings => {
                //TODO: Clean up settings object
                Remote.app.saveFile(file, JSON.stringify(settings))

                if (index === savegames.length - 1) {
                    done();
                }
            }))
        })
    }