/* global GetRootScope, Helpers, CompetitorProducts, Remote, $, Database */
let customCompetitorProducts
let customCompetitorNames = [
    { name: 'Reddit, Inc.' },
    { name: 'DailyMotion' },
    { name: 'Facebook, Inc.' },
    { name: 'Twitter, Inc.' },
    { name: 'Google, Inc.' },
    { name: 'Amazon.com, Inc.' },
    { name: 'InterActiveCorp' }
]

const rs = GetRootScope()
const debug = str => Helpers.ConsoleInfo(`[MOD] Real Brands: ${str}`)
const originalCompetitorProducts = CompetitorProducts.map(({ logoColorDegree, logoPath, name, owner }) => ({ logoColorDegree, logoPath, name, owner }))
const assignToAllInArray = (arr, obj) => arr.map((item, index) => Object.assign(item, obj[index]))

exports.initialize = modPath => {
  customCompetitorProducts = [
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/youtube.png`,
      name: 'YouTube',
      owner: 'Google, Inc.'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/vimeo.png`,
      name: 'Vimeo',
      owner: 'InterActiveCorp'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/dailymotion.png`,
      name: 'DailyMotion',
      owner: 'DailyMotion'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/facebook.png`,
      name: 'Facebook',
      owner: 'Facebook, Inc.'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/twitter.png`,
      name: 'Twitter',
      owner: 'Twitter, Inc.'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/reddit.png`,
      name: 'Reddit',
      owner: 'Reddit, Inc.'
    },
    null, // "ClosedDoor"
    null, // "Cenren"
    null, // "MeetyMe" match.com??
    null, // "Socialize.me"
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/netflix.png`,
      name: 'Netflix',
      owner: 'Netflix, Inc.'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/twitch.png`,
      name: 'Twitch',
      owner: 'Amazon.com, Inc.'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/hitbox.png`,
      name: 'Hitbox.tv',
      owner: 'Azubu, Inc.'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/amazon.png`,
      name: 'Amazon',
      owner: 'Amazon.com, Inc.'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/ebay.png`,
      name: 'eBay',
      owner: 'eBay, Inc.'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/alibaba.png`,
      name: 'Alibaba',
      owner: 'Alibaba Group'
    },
    null, // "Megacafe"
    null, // "Wawo"
    null, // "Clipser"
    null, // "UltraVideo"
    null, // "SnappyClips"
    null, // "VlogStop"
    null, // "Auch"
    null, // "ZeroZone"
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/instagram.png`,
      name: 'Instagram',
      owner: 'Facebook, Inc.'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/snapchat.png`,
      name: 'Snapchat',
      owner: 'Snap, Inc.'
    },
    {
      logoColorDegree: 0,
      logoPath: `${modPath}/logos/hulu.png`,
      name: 'Hulu',
      owner: 'Hulu LLC'
    }
  /* null, // "MovieTimes"
    null, // "Flixer"
    null, // "LimeVideo"
    null, // "Ching!"
    null, // "TeeVee"
    null, // "IndieShows"
    null, // "WhoSells" craigslist???
    null, // "TenDollarShops" dollarstore??
    null, // "Global Car Parts"
    null, // "GreenBook"
    null, // "Searcha"
    null, // "UberBuy"
    null  // "Commercy" */
  ]
  // Modifies Database.competitors, which is used to display other bidders when bidding for a contract
  assignToAllInArray(Database.competitors, customCompetitorNames)
  debug('Updated \'Database.competitors\' properties')

  // Modifies CompetitorProducts which is used to display which competitor product a contract is for
  assignToAllInArray(CompetitorProducts, customCompetitorProducts)
  debug('Updated \'CompetitorProducts\' properties')
}

// TODO: kolla om settings är null först för att slippa ett error i consolen när det inte finns något spel laddat direkt när du startar
exports.onLoadGame = settings => {
  if (settings) {
    // Modifies $rootscope.settings.competitorProducts which is used to display competitor products in the competitors view
    assignToAllInArray(settings.competitorProducts, customCompetitorProducts)
    debug('Updated \'$rootscope.settings.competitorProducts\' properties')
    }
  }
exports.onNewHour = settings => { }
exports.onNewDay = settings => { }
exports.onUnsubscribe = done => {
  // Restores everything to prepare for unsubscription from Steam Workshop
  const re = /^sg_.*json$/

  delete rs.options.realbrands
  rs.saveOptions()
  debug('Deleted \'$rootscope.options.realbrands\'.')

  Remote.app.getAllFiles(files => {
    const savegames = files.filter(file => re.test(file))

    savegames.forEach((file, index) => Helpers.LoadSettings(file, settings => {
      // TODO: Fixa så att done inte callas innan alla savefiles är klara, lös med en callback som räknar hur många gånger den kallats och när den har kallats savegames.length gånger kallar den done
      assignToAllInArray(settings.competitorProducts, originalCompetitorProducts)
      Remote.app.saveFile(file, JSON.stringify(settings))
      debug(`Restored '$rootscope.settings.competitorProducts' for savegame ${file}.`)

      if (index === savegames.length - 1) {
        debug('Uninstall successful!')
        done()
      }
    }))
  })
}
