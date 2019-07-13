let _self = this;
let _modPath;
const rs = GetRootScope();
this.loadLanguage = function (lang) {
    $.getJSON(_modPath + '/locales/' + lang + '.json',
            function (jsonData) {
                $.each(jsonData, function (name, value) {
                    GetRootScope().Language[name] = value;
                });

                GetRootScope().settings.newfeatures.language = lang;
            }
    )
    .fail(function () {
        _self.loadLanguage('en');
        rs.settings.newfeatures.language = 'en';
    });

    return;
};

exports.initialize = (modPath) => {
    _modPath = modPath;

    
    FeatureNames.features_1 = 'newfeatures_features_1';
    FeatureNames.features_2 = 'newfeatures_features_2';
    FeatureNames.features_3 = 'newfeatures_features_3';
    FeatureNames.features_4 = 'newfeatures_features_4';
    FeatureNames.features_5 = 'newfeatures_features_5';
    FeatureNames.features_6 = 'newfeatures_features_6';
    FeatureNames.features_7 = 'newfeatures_features_7';
    FeatureNames.features_8 = 'newfeatures_features_8';
    FeatureNames.features_9 = 'newfeatures_features_9';
    FeatureNames.features_10 = 'newfeatures_features_10';

    
    Features.push({
        name: FeatureNames.features_1,
        level: Enums.EmployeeLevels.Expert,
        requirements: {ContentManagementModule: 1,
        UiComponent: 1,
        BlueprintComponent: 1},
        faIcon: "fa-file-video-o ",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_1,
        category: ResearchCategories.Features, 
        points: 30,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_2,
        level: Enums.EmployeeLevels.Expert,
        requirements: {UiComponent: 1,
        BlueprintComponent: 1,
        UiElement: 1,},
        faIcon: "fa-pencil-square-o ",
        categoryName: Enums.FeatureCategories.Users
    });

    ResearchItems.push({
        name: FeatureNames.features_2,
        category: ResearchCategories.Features, 
        points: 100,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_3,
        level: Enums.EmployeeLevels.Expert,
        requirements: {InterfaceModule: 1,
            BackendModule: 1,
        NotificationModule: 1,
    ApiClientModule: 1},
        faIcon: "fa-download",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_3,
        category: ResearchCategories.Features, 
        points: 200,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_4,
        level: Enums.EmployeeLevels.Expert,
        requirements: {UiComponent: 1,
        StorageModule: 1,
    EncryptionComponent: 1},
        faIcon: "fa-cloud-download",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_4,
        category: ResearchCategories.Features, 
        points: 300,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_5,
        level: Enums.EmployeeLevels.Expert,
        requirements: {ContentManagementModule: 1,
        FrontendModule: 1,
     AuthenticationModule: 1,
     NotificationModule: 1},
        faIcon: "fa-gamepad",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_5,
        category: ResearchCategories.Features, 
        points: 350,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_6,
        level: Enums.EmployeeLevels.Expert,
        requirements: {EmailModule: 1,
        PaymentGatewayModule: 1},
        faIcon: "fa-money",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_6,
        category: ResearchCategories.Features, 
        points: 400,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_7,
        level: Enums.EmployeeLevels.Expert,
        requirements: {UiComponent: 1,
        UiSet: 1,
        UiElement: 1,
        EmailModule: 1,
         NotificationModule: 1},
        faIcon: "fa-life-ring",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_7,
        category: ResearchCategories.Features, 
        points: 450,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_8,
        level: Enums.EmployeeLevels.Expert,
        requirements: {ResponsiveUi: 1,
        UiSet: 1,
        ApiClientModule: 1,
        AuthenticationModule: 1,
        NotificationModule: 1},
        faIcon: "fa-question-circle",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_8,
        category: ResearchCategories.Features, 
        points: 500,
        unlockType: "Feature" 
    });

    Features.push({
        name: FeatureNames.features_9,
        level: Enums.EmployeeLevels.Expert,
        requirements: {ResponsiveUi: 1,
            UiSet: 1,
            ApiClientModule: 1,
            AuthenticationModule: 1,
            NotificationModule: 1},
        faIcon: "fa-truck",
        categoryName: Enums.FeatureCategories.Users
    });


    ResearchItems.push({
        name: FeatureNames.features_9,
        category: ResearchCategories.Features,
        points: 500,
        unlockType: "Feature"
    });

    Features.push({
        name: FeatureNames.features_10,
        level: Enums.EmployeeLevels.Expert,
        requirements: {ResponsiveUi: 1,
            UiSet: 1,
            ApiClientModule: 1,
            AuthenticationModule: 1,
            NotificationModule: 1},
        faIcon: "fa-question-circle",
        categoryName: Enums.FeatureCategories.Users
    });


    ResearchItems.push({
        name: FeatureNames.features_10,
        category: ResearchCategories.Features,
        points: 500,
        unlockType: "Feature"
    });

    ProductTypes.forEach(function(pt) {
    pt.features.push(FeatureNames.feature_1, FeatureNames.feature_2,FeatureNames.features_3, FeatureNames.features_4,FeatureNames.features_5, FeatureNames.features_6,FeatureNames.features_7, FeatureNames.features_8, FeatureNames.features_9 ,FeatureNames.features_10);
});

    let sp = ProductTypes.find(pt => pt.name === ProductTypeNames.ShoppingPlatform);
    sp.features.push(FeatureNames.features_2, FeatureNames.features_5, FeatureNames.features_6, FeatureNames.features_8, FeatureNames.features_9);


    let sm = ProductTypes.find(pt => pt.name === ProductTypeNames.SocialMedia);
    sm.features.push(FeatureNames.features_1, FeatureNames.features_3, FeatureNames.features_7, FeatureNames.features_8, FeatureNames.features_10);

    let ss = ProductTypes.find(pt => pt.name === ProductTypeNames.StreamingService);
    ss.features.push(FeatureNames.features_2, FeatureNames.features_7);


    let vss = ProductTypes.find(pt => pt.name === ProductTypeNames.VideoSharingService);
    vss.features.push(FeatureNames.features_1, FeatureNames.features_2, FeatureNames.features_4);
};

exports.onBackgroundWorkerStart = () => {
    
    FeatureNames.features_1 = 'newfeatures_features_1';
    FeatureNames.features_2 = 'newfeatures_features_2';
    FeatureNames.features_3 = 'newfeatures_features_3';
    FeatureNames.features_4 = 'newfeatures_features_4';
    FeatureNames.features_5 = 'newfeatures_features_5';
    FeatureNames.features_6 = 'newfeatures_features_6';
    FeatureNames.features_7 = 'newfeatures_features_7';
    FeatureNames.features_8 = 'newfeatures_features_8';
    FeatureNames.features_9 = 'newfeatures_features_9';
    FeatureNames.features_10 = 'newfeatures_features_10';

    
    Features.push({
        name: FeatureNames.features_1,
        level: Enums.EmployeeLevels.Expert,
        requirements: {ContentManagementModule: 1,
        UiComponent: 1,
        BlueprintComponent: 1},
        faIcon: "fa-file-video-o",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_1,
        category: ResearchCategories.Features, 
        points: 30,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_2,
        level: Enums.EmployeeLevels.Expert,
        requirements: {UiComponent: 1,
        BlueprintComponent: 1,
        UiElement: 1,},
        faIcon: "fa-pencil-square-o ",
        categoryName: Enums.FeatureCategories.Users
    });

    ResearchItems.push({
        name: FeatureNames.features_2,
        category: ResearchCategories.Features, 
        points: 100,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_3,
        level: Enums.EmployeeLevels.Expert,
        requirements: {InterfaceModule: 1,
            BackendModule: 1,
        NotificationModule: 1,
    ApiClientModule: 1},
        faIcon: "fa-download",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_3,
        category: ResearchCategories.Features, 
        points: 200,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_4,
        level: Enums.EmployeeLevels.Expert,
        requirements: {UiComponent: 1,
        StorageModule: 1,
    EncryptionModule: 1},
        faIcon: "fa-cloud-download",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_4,
        category: ResearchCategories.Features, 
        points: 300,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_5,
        level: Enums.EmployeeLevels.Expert,
        requirements: {ContentManagementModule: 1,
        FrontendModule: 1,
     AuthenticationModule: 1,
     NotificationModule: 1},
        faIcon: "fa-gamepad",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_5,
        category: ResearchCategories.Features, 
        points: 350,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_6,
        level: Enums.EmployeeLevels.Expert,
        requirements: {EmailModule: 1,
        PaymentGatewayModule: 1},
        faIcon: "fa-money",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_6,
        category: ResearchCategories.Features, 
        points: 400,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_7,
        level: Enums.EmployeeLevels.Expert,
        requirements: {UiComponent: 1,
        UiSet: 1,
        UiElement: 1,
        EmailModule: 1,
         NotificationModule: 1},
        faIcon: "fa-life-ring",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_7,
        category: ResearchCategories.Features, 
        points: 450,
        unlockType: "Feature" 
    });
    Features.push({
        name: FeatureNames.features_8,
        level: Enums.EmployeeLevels.Expert,
        requirements: {ResponsiveUi: 1,
        UiSet: 1,
        ApiClientModule: 1,
        AuthenticationModule: 1,
        NotificationModule: 1},
        faIcon: "fa-question-circle",
        categoryName: Enums.FeatureCategories.Users
    });

    
    ResearchItems.push({
        name: FeatureNames.features_8,
        category: ResearchCategories.Features, 
        points: 500,
        unlockType: "Feature" 
    });

    Features.push({
        name: FeatureNames.features_9,
        level: Enums.EmployeeLevels.Expert,
        requirements: {ResponsiveUi: 1,
            UiSet: 1,
            UiComponent : 1,
            AuthenticationModule: 1,
            NotificationModule: 1},
        faIcon: "fa-truck",
        categoryName: Enums.FeatureCategories.Users
    });


    ResearchItems.push({
        name: FeatureNames.features_9,
        category: ResearchCategories.Features,
        points: 550,
        unlockType: "Feature"
    });

    Features.push({
        name: FeatureNames.features_10,
        level: Enums.EmployeeLevels.Expert,
        requirements: {ResponsiveUi: 1,
            UiSet: 1,
            ApiClientModule: 1,
            AuthenticationModule: 1,
            NotificationModule: 1},
        faIcon: "fa-question-circle",
        categoryName: Enums.FeatureCategories.Users
    });


    ResearchItems.push({
        name: FeatureNames.features_10,
        category: ResearchCategories.Features,
        points: 600,
        unlockType: "Feature"
    });


    ProductTypes.forEach(function(pt) {
        pt.features.push(FeatureNames.feature_1, FeatureNames.feature_2,FeatureNames.features_3, FeatureNames.features_4,FeatureNames.features_5, FeatureNames.features_6,FeatureNames.features_7, FeatureNames.features_8, FeatureNames.features_9 ,FeatureNames.features_10);
    });
    let sp = ProductTypes.find(pt => pt.name === ProductTypeNames.ShoppingPlatform);
    sp.features.push(FeatureNames.features_2, FeatureNames.features_5, FeatureNames.features_6, FeatureNames.features_8, FeatureNames.features_9);

    
    let sm = ProductTypes.find(pt => pt.name === ProductTypeNames.SocialMedia);
    sm.features.push(FeatureNames.features_1, FeatureNames.features_3, FeatureNames.features_7, FeatureNames.features_8, FeatureNames.features_10);
    
    let ss = ProductTypes.find(pt => pt.name === ProductTypeNames.StreamingService);
    ss.features.push(FeatureNames.features_2, FeatureNames.features_7);

    
    let vss = ProductTypes.find(pt => pt.name === ProductTypeNames.VideoSharingService);
    vss.features.push(FeatureNames.features_1, FeatureNames.features_2, FeatureNames.features_4);
}

exports.onLoadGame = settings => {if 
    (settings.newfeatures !== undefined) {
    _self.loadLanguage(settings.newfeatures.language);
} else {

    settings.newfeatures = {language: rs.options.language};
    _self.loadLanguage(rs.options.language);
}};