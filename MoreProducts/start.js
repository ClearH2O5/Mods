let _modPath;

const newStuff = require('./newStuff.json');
const languageStrings = require('./lang.json');

exports.initialize = (modPath) => {
    _modPath = modPath;

    for (let feature of newStuff.features) {
        const {name} = feature;
        FeatureNames[name] = name;
        Features.push(feature);
    }

    const defaultProducts = ProductTypes;
    console.log(defaultProducts);
    for (let product of newStuff.products) {
        const {name} = product;
        ProductTypeNames[name] = name;
        ProductTypes.push(product);
    }

    for (let competitor of newStuff.competitors) {
        competitor.history = [];
        competitor.controlled = false;
        CompetitorProducts.push(competitor);
    }

    // Investors.push(...newStuff.investors);

    // Frameworks.push(...newStuff.frameworks);

    // const largeHosting = Buildings.find(entry => entry.name === 'LargeHosting');
    // largeHosting.floors = 5;

    // TODO: Add Menu Item for creating new items
    // Modding.setMenuItem({
    //     name: 'addstuff',
    //     tooltip: 'Add new Stuff',
    //     tooltipPosition: 'top',
    //     faIcon: 'fa-plus',
    //     badgeCount: 0
    // });

    // exports.views = [
    //     {
    //         name: 'addstuff',
    //         viewPath: _modPath + 'view.html',
    //         controller: function ($rootScope, $scope) {
    //             this.tab = 'product';
    //
    //             this.employeeLevels = [
    //                 {
    //                     name: 'Beginner',
    //                     title: 'Beginner',
    //                     unlocked: true
    //                 },
    //                 {
    //                     name: 'Intermediate',
    //                     title: 'Intermediate',
    //                     unlocked: true
    //                 },
    //                 {
    //                     name: 'Expert',
    //                     title: 'Expert',
    //                     unlocked: true
    //                 }
    //             ];
    //
    //             this.product = {
    //                 name: '',
    //                 faIcon: 'fa-',
    //                 maxLevel: 5000,
    //                 usersFactor: 100,
    //                 requirements: {},
    //                 employeeLevel: this.employeeLevels[0]
    //             };
    //
    //             this.requirement = '';
    //             this.addRequirement = () => {
    //                 if (!ComponentNames[this.requirement])
    //                     return;
    //
    //                 if (!this.product.requirements[this.requirement]) {
    //                     this.product.requirements[this.requirement] = 0;
    //                 }
    //                 this.product.requirements[this.requirement]++;
    //                 this.requirement = '';
    //                 console.log(this.product);
    //             }
    //         }
    //     }
    // ];

    // TODO: Add multiple layer support to LargeHosting building
    // isodomHelpers.setOverlay = (e, t) => {
    //     if (null == e.rackId)
    //         return;
        // console.log(e, t, GetRootScope().settings.selectedFloor);
        // const rack = GetRootScope().settings.hosting.grid.find(element => element.rackId === e.rackId);
        // if(GetRootScope().settings.selectedFloor !== rack.floor)
        //     return;
        // let n = $(`#overlay-${e.rackId}`);
        // n.length || (n = $(`<div class="rack-overlay" id="overlay-${e.rackId}">\n                                                <span class="name"></span>\n                                                <i class="fa fa-circle"></i>\n                                                <span class="units"></span>\n                                            </div>`),
        // $(".overlays").append(n));
        // let r = t.position();
        // n.css("top", r.top);
        // n.css("left", r.left);
    // }

    // TODO: Add remove all button to inbox
};

exports.onLoadGame = settings => {
    Language.gamingservice = "Gaming Service";
    Language.searchengine = "Search Engine";
    Language.operatingsystem = "Operating System";

    Language.downloadsystem = "Download System";
    Language.sponsoredcontent = "Sponsored Content";
    Language.augmentedreality = "Augmented Reality";

    // loadLanguage();

    // $('body').append('<style>#floor-selector{z-index: 100001} body.bigUi product-frameworks .item img{height:auto}</style>');
};

function loadLanguage(lang = 'en') {
    for(let key of languageStrings[lang]) {
        console.log(key, languageStrings[lang][key]);
    }
}

exports.onUnsubscribe = done => {
    const re = /^sg_.*json$/;
    Remote.app.getAllFiles(files => {
        const savegames = files.filter(file => re.test(file));

        savegames.forEach((file, index) => Helpers.LoadSettings(file, settings => {
            // TODO: Cleaning up everything
            for (let i = 0; i < settings.products.length; i++) {
                if (newStuff.products.find(product => product.productTypeName === settings.products[i].productTypeName)) {
                    settings.products.splice(i, 1);
                    i--;
                }
            }

            for (let i = 0; i < settings.competitorProducts.length; i++) {
                if (newStuff.products.find(product => product.productTypeName === settings.competitorProducts[i].productTypeName)) {
                    settings.competitorProducts.splice(i, 1);
                    i--;
                }
            }

            for(let i = 0; i < settings.investors.length; i++) {
                if(newStuff.investors.find(investor => investor.id === settings.investors.id)) {
                    settings.investors.splice(i, 1);
                    i--;
                }
            }

            Remote.app.saveFile(file, JSON.stringify(settings));

            if (index === savegames.length - 1) {
                done();
            }
        }));
    });
};