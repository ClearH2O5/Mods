// Pretty easy code, right?
let _self = this;
const rs = GetRootScope();
let _modPath;
this.loadLanguage = function (lang) {
    $.getJSON(_modPath + '/locales/' + lang + '.json',
            function (jsonData) {
                $.each(jsonData, function (name, value) {
                    GetRootScope().Language[name] = value;
                });

                GetRootScope().settings.nitrosoft_2019.language = lang;
            }
    )
    .fail(function () {
        _self.loadLanguage('en');
        rs.settings.nitrosoft_2019.language = 'en';
    });

    return;
};


exports.initialize = (modPath) => {
    FrameworkNames['nitrosoft2019'] = 'nitrosoft2019';
    Frameworks.push({
    order: 8,
    name: 'nitrosoft2019',
    licenseCost: 10e6,
    researchPoints: 8000,
    pricePerUser: 28e-5,
    cuPerMs: .01,
    logoPath: "images/logos/frameworks/nitrosoft.png",
    maxFeatures: 15,
    maxFeatureLevel: 9e3
    });
    _modPath = modPath;
};

exports.onBackgroundWorkerStart = () => {
    FrameworkNames['nitrosoft2019'] = 'nitrosoft2019';
    Frameworks.push({
    order: 8,
    name: 'nitrosoft2019',
    licenseCost: 10e6,
    researchPoints: 8000,
    pricePerUser: 28e-5,
    cuPerMs: .01,
    logoPath: "images/logos/frameworks/nitrosoft.png",
    maxFeatures: 15,
    maxFeatureLevel: 9e3
    });
};

ResearchItemNames.nitrosoft2019 = "nitrosoft2019";

  ResearchItems.push({
      name: "nitrosoft2019",
      category: ResearchCategories.Frameworks,
      points: 8000,
      unlockType: "Framework"
  })


exports.onLoadGame = settings => {if 
    (settings.nitrosoft_2019 !== undefined) {
    _self.loadLanguage(settings.nitrosoft_2019.language);
} else {

    settings.nitrosoft_2019 = {language: rs.options.language};
    _self.loadLanguage(rs.options.language);
}};
        
exports.onNewHour = settings => {};
exports.onNewDay = settings =>  {};
exports.onUnsubscribe = done => {};