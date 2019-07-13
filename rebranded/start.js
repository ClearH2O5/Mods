let rebrandedProducts
let rebrandedCompanies = [
    { name: 'Alphabet, Inc.' },
    { name: 'Twitter, Inc.' },
    { name: 'Facebook, Inc.' },
    { name: 'Vevo LLC' },
    { name: 'InterActiveCorp' },
    { name: 'The Collective LLC' },
    { name: 'Vivendi SA' },
    { name: 'Qlipso, Inc.' },
    { name: 'Bit Kitchen, Inc.' },
    { name: 'Snap, Inc.' },
    { name: 'Reddit, Inc.' },
    { name: 'Tencent Holdings, Ltd.' },
    { name: 'Verizon Communications, Inc.' },
    { name: 'Vero Labs, Inc.' },
    { name: 'Mail.ru Group' },
    { name: 'Amazon.com, Inc.' },
    { name: 'Netflix, Inc.' },
    { name: 'Hulu LLC' },
    { name: 'Rakuten K.K.' },
    { name: 'Azubu, Inc.' },
    { name: '3Logic Systems GmbH' },
    { name: 'Microsoft Corporation' },
    { name: 'Ellation, Inc.' },
    { name: 'Walmart, Inc.' },
    { name: 'Shopify, Inc.' },
    { name: 'eBay, Inc.' },
    { name: 'ContextLogic, Inc.' },
    { name: 'Alibaba Group Holding, Ltd.' },
    { name: 'Best Buy Co., Inc.' },
    { name: 'Target Corporation' },
    { name: 'Etsy, Inc.' },
    { name: 'ASOS plc' },
]
 
const productRestore = CompetitorProducts.map(({ logoPath, name, owner }) => ({  logoPath, name, owner }))
const updateData = (arr, obj) => arr.map((item, index) => Object.assign(item, obj[index]))

exports.initialize = modPath => {
  rebrandedProducts = [
    {logoPath: `${modPath}/icons/video_youtube.png`, name: 'YouTube', owner: 'Alphabet, Inc.'},
    {logoPath: `${modPath}/icons/video_vimeo.png`, name: 'Vimeo', owner: 'InterActiveCorp'},
    {logoPath: `${modPath}/icons/video_dailymotion.png`, name: 'Dailymotion', owner: 'Vivendi SA'},
    {logoPath: `${modPath}/icons/social_facebook.png`, name: 'Facebook', owner: 'Facebook, Inc.'},
    {logoPath: `${modPath}/icons/social_twitter.png`, name: 'Twitter', owner: 'Twitter, Inc.'},
    {logoPath: `${modPath}/icons/social_reddit.png`, name: 'reddit', owner: 'Reddit, Inc.'},
    {logoPath: `${modPath}/icons/social_vk.png`, name: 'VK', owner: 'Mail.ru Group' },
    {logoPath: `${modPath}/icons/social_whatsapp.png`, name: 'WhatsApp', owner: 'Facebook, Inc.'},
    {logoPath: `${modPath}/icons/social_tumblr.png`, name: 'Tumblr', owner: 'Verizon Communications, Inc.'},
    {logoPath: `${modPath}/icons/social_wechat.png`, name: 'WeChat', owner: 'Tencent Holdings, Ltd.'},
    {logoPath: `${modPath}/icons/streaming_netflix.png`, name: 'Netflix', owner: 'Netflix, Inc.'},
    {logoPath: `${modPath}/icons/streaming_twitch.png`, name: 'Twitch', owner: 'Amazon.com, Inc.'},
    {logoPath: `${modPath}/icons/streaming_smashcast.png`, name: 'Smashcast.tv', owner: 'Azubu, Inc.'},
    {logoPath: `${modPath}/icons/shopping_amazon.png`, name: 'Amazon', owner: 'Amazon.com, Inc.'},
    {logoPath: `${modPath}/icons/shopping_ebay.png`, name: 'eBay', owner: 'eBay, Inc.'},
    {logoPath: `${modPath}/icons/shopping_alibaba.png`, name: 'Alibaba', owner: 'Alibaba Group Holding, Ltd.'},
    {logoPath: `${modPath}/icons/video_metacafe.png`, name: 'Metacafe', owner: 'The Collective LLC'},
    {logoPath: `${modPath}/icons/video_watch.png`, name: 'Watch', owner: 'Facebook, Inc.'},
    {logoPath: `${modPath}/icons/video_vevo.png`, name: 'Vevo', owner: 'Vevo LLC'},
    {logoPath: `${modPath}/icons/video_veoh.png`, name: 'Veoh', owner: 'Qlipso, Inc.'},
    {logoPath: `${modPath}/icons/video_vidme.png`, name: 'Vidme', owner: 'Bit Kitchen, Inc.'},
    {logoPath: `${modPath}/icons/video_igtv.png`, name: 'IGTV', owner: 'Facebook, Inc.'},
    {logoPath: `${modPath}/icons/video_vine.png`, name: 'Vine', owner: 'Twitter, Inc.'},
    {logoPath: `${modPath}/icons/social_vero.png`, name: 'Vero', owner: 'Vero Labs, Inc.'},
    {logoPath: `${modPath}/icons/social_instagram.png`, name: 'Instagram', owner: 'Facebook, Inc.'},
    {logoPath: `${modPath}/icons/social_snapchat.png`, name: 'Snapchat', owner: 'Snap, Inc.'},
    {logoPath: `${modPath}/icons/streaming_mixer.png`, name: 'Mixer', owner: 'Microsoft Corporation'},
    {logoPath: `${modPath}/icons/streaming_picarto.png`, name: 'Picarto.tv', owner: '3Logic Systems GmbH'},
    {logoPath: `${modPath}/icons/streaming_crunchyroll.png`, name: 'Crunchyroll', owner: 'Ellation, Inc.'},
    {logoPath: `${modPath}/icons/streaming_periscope.png`, name: 'Periscope', owner: 'Twitter, Inc.'},
    {logoPath: `${modPath}/icons/streaming_hulu.png`, name: 'Hulu', owner: 'Hulu LLC'},
    {logoPath: `${modPath}/icons/streaming_primevideo.png`, name: 'Amazon Video', owner: 'Amazon.com, Inc.'},
    {logoPath: `${modPath}/icons/streaming_rakuten.png`, name: 'Rakuten.tv', owner: 'Rakuten K.K.'},
    {logoPath: `${modPath}/icons/shopping_asos.png`, name: 'ASOS', owner: 'ASOS plc'},
    {logoPath: `${modPath}/icons/shopping_etsy.png`, name: 'Etsy', owner: 'Etsy, Inc.'},
    {logoPath: `${modPath}/icons/shopping_target.png`, name: 'Target', owner: 'Target Corporation'},
    {logoPath: `${modPath}/icons/shopping_bestbuy.png`, name: 'Best Buy', owner: 'Best Buy Co., Inc.'},
    {logoPath: `${modPath}/icons/shopping_wish.png`, name: 'Wish', owner: 'ContextLogic, Inc.'},
    {logoPath: `${modPath}/icons/shopping_walmart.png`, name: 'Walmart', owner: 'Walmart, Inc.'},
    {logoPath: `${modPath}/icons/shopping_shopify.png`, name: 'Shopify', owner: 'Shopify, Inc.'}
  ]

updateData(Database.competitors, rebrandedCompanies)
updateData(CompetitorProducts, rebrandedProducts)
}

exports.onLoadGame = settings => {
  if (settings) {
    updateData(settings.competitorProducts, rebrandedProducts)}
}

exports.onUnsubscribe = done => {
    const re = /^sg_.*json$/;
    Remote.app.getAllFiles(files => {
        const savegames = files.filter(file => re.test(file));
        savegames.forEach((file, index) => Helpers.LoadSettings(file, settings => {
            updateData(settings.CompetitorProducts, oldCompetitors);
            Remote.app.saveFile(file, JSON.stringify(settings));
            
            if (index === savegames.length - 1) {
                done();
            }
        }));
    });
}
