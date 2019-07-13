let _modPath;
const scope = GetRootScope();

exports.initialize = (modPath) => {
    _modPath = modPath;

    Helpers.ConsoleInfo(`[MOD] More Tech Stuff: MTS has started loading it's own stuff.`);

    ComponentNames.inputSanitizing = 'inputsanitizing';
    ComponentNames.regExpSupport = 'regexpsupport';


    Components.push({
            name: ComponentNames.inputSanitizing,
            employeeLevel: EmployeeLevels.Beginner,
            icon: modPath + 'images/inputSanitizing.png',
            employeeTypeName: EmployeeTypeNames.Developer,
            type: ComponentTypes.Component,
            produceHours: 4
        },
        {
            name: ComponentNames.regExpSupport,
            employeeLevel: EmployeeLevels.Intermediate,
            icon: modPath + 'images/regExpSupport.png',
            employeeTypeName: EmployeeTypeNames.Developer,
            type: ComponentTypes.Component,
            produceHours: 6
        }
    );
    Helpers.ConsoleInfo(`[MOD] More Tech Stuff: MTS loaded components successfully.`);

    ComponentNames.receiveFilter = 'receivefilter';
    ComponentNames.autoUpdates = 'autoupdates';

    Components.push({
            name: ComponentNames.receiveFilter,
            employeeLevel: EmployeeLevels.Intermediate,
            employeeTypeName: EmployeeTypeNames.LeadDeveloper,
            icon: modPath + 'images/receiveFilter.png',
            type: ComponentTypes.Module,
            requirements: {
                BackendModule: 4,
                NetworkComponent: 8,
                SemanticComponent: 5,
                EncryptionComponent: 3,
                DatabaseLayer: 1,
                Firewall: 4
            }
        },
        {
            name: ComponentNames.autoUpdates,
            employeeLevel: EmployeeLevels.Intermediate,
            employeeTypeName: EmployeeTypeNames.LeadDeveloper,
            icon: modPath + 'images/autoUpdates.png',
            type: ComponentTypes.Module,
            requirements: {
                NetworkComponent: 5,
                FilesystemComponent: 2,
                CompressionComponent: 3,
                FrontendModule: 1,
                VirtualHardware: 2
            }
        }
    );
    Helpers.ConsoleInfo(`[MOD] More Tech Stuff: MTS loaded modules successfully.`);

    // Frameworks declaration
    Frameworks.push({
            order: 9,
            name: 'dotnet',
            licenseCost: 0,
            maxFeatures: 2,
            maxFeatureLevel: 2,
            cuPerMs: 0.09,
            pricePerUser: 0,
            logoPath: modPath + 'images/frameworks/dotnetFramework.png'
        },
        {
            order: 11,
            name: 'xamarin',
            licenseCost: 350000,
            maxFeatures: 10,
            maxFeatureLevel: 75,
            cuPerMs: 0.05,
            pricePerUser: 0,
            logoPath: modPath + 'images/frameworks/xamarinFramework.png'
        },
        {
            order: 10,
            name: 'struts',
            licenseCost: 0,
            maxFeatures: 7,
            maxFeatureLevel: 5,
            cuPerMs: 0.07,
            pricePerUser: 0,
            logoPath: modPath + 'images/frameworks/strutsFramework.png'
        },
        {
            order: 12,
            name: 'angular',
            licenseCost: 0,
            maxFeatures: 6,
            maxFeatureLevel: 25,
            cuPerMs: 0.08,
            pricePerUser: 0,
            logoPath: modPath + 'images/frameworks/angularjsFramework.png'
        },
        {
            order: 13,
            name: 'javaee',
            licenseCost: 0,
            maxFeatures: 15,
            maxFeatureLevel: 30,
            cuPerMs: 0.13,
            pricePerUser: 0,
            logoPath: modPath + 'images/frameworks/javaeeFramework.png'
        }
    );
    Helpers.ConsoleInfo(`[MOD] More Tech Stuff: MTS loaded frameworks successfully.`);
    // Features declaration
    FeatureNames.screenCapturing = 'screencapturing';
    FeatureNames.liveStreaming = 'livestreaming';
    FeatureNames.serverRedundancy = 'serverredundancy';
    FeatureNames.securityIPS = 'securityips';

    Features.push({
            name: FeatureNames.screenCapturing,
            employeeLevel: EmployeeLevels.Expert,
            requirements: {
                FrontendModule: 3,
                InputModule: 20,
                VideoComponent: 15,
                NetworkComponent: 12
            },
            requiredComputeUnit: 100,
            hype: 25,
        },
        {
            name: FeatureNames.liveStreaming,
            employeeLevel: EmployeeLevels.Expert,
            requirements: {
                FrontendModule: 5,
                InputModule: 3,
                VideoComponent: 25,
                WireframeComponent: 5,
                BandwidthCompressionModule: 3,
                VideoPlaybackModule: 2,
                NetworkComponent: 20
            },
            requiredComputeUnit: 75,
            hype: 45,
        },
        {
            name: FeatureNames.serverRedundancy,
            employeeLevel: EmployeeLevels.Expert,
            requirements: {
                BackendModule: 13,
                NetworkComponent: 10,
                SemanticComponent: 1,
                StorageModule: 2,
                autoupdates: 1
            },
            requiredComputeUnit: 5,
            hype: 15,
        },
        {
            name: FeatureNames.securityIPS,
            employeeLevel: EmployeeLevels.Expert,
            requirements: {
                BackendModule: 10,
                NetworkComponent: 20,
                SemanticComponent: 5,
                StorageModule: 1,
                receivefilter: 10
            },
            requiredComputeUnit: 25,
            hype: 50,
        }
    );
    Helpers.ConsoleInfo(`[MOD] More Tech Stuff: MTS loaded features successfully.`)

};

exports.onLoadGame = settings => {
    if (scope.options.language == 'cs') {
        Language['inputsanitizing'] = 'Ošetření výstupu';
        Language['regexpsupport'] = 'Podpora Regulárních výrazů';
        Language['receivefilter'] = 'Filtr příchozích požadavků';
        Language['autoupdates'] = 'Automatické aktualizace';
        Language['screencapturing'] = 'Záznam obrazovky';
        Language['livestreaming'] = 'Živé streamování';
        Language['serverredundancy'] = 'Redundance serverů';
        Language['securityips'] = 'Systém prevence cizího vniknutí';
    } else {
        Language['inputsanitizing'] = 'Input Sanitizing';
        Language['regexpsupport'] = 'Regular Expressions Support';
        Language['receivefilter'] = 'Incoming Requests Filter';
        Language['autoupdates'] = 'Automatic Updates';
        Language['screencapturing'] = 'Screen Capturing';
        Language['livestreaming'] = 'Live Streaming';
        Language['serverredundancy'] = 'Server Redundancy';
        Language['securityips'] = 'Intrusion Prevention System';
    }
    Language['dotnet'] = '.NET Framework';
    Language['xamarin'] = 'Xamarin';
    Language['struts'] = 'Struts 2';
    Language['angular'] = 'AngularJS 2';
    Language['javaee'] = 'Java EE';
    if (settings) {
        if (!scope.options.mts_mod || !scope.options.mts_mod.loadedBefore || !scope.options.mts_mod.seenNewInstructions) {
            scope.sendMail('Jiří Bartušek', 'More Tech Stuff - quick thanks',
                `Hi,
        
        I see, that you have just subscribed to my mod. Thanks for that!
        
        Don't forget, if you have any new ideas for something I should add or fix, please, let me know at mod's Steam discussion.
        
        Take care,
        
        Jiří Bartušek a.k.a. bartusek27`
            );
            scope.options.mts_mod = {loadedBefore: true, seenNewInstructions: true, seenUpdate3: false};
            Helpers.ConsoleInfo(`[MOD] More Tech Stuff: First-time email has been sent.`);
            scope.saveOptions();
        }
        if (scope.options.mts_mod && !scope.options.mts_mod.seenUpdate3 && scope.options.mts_mod.loadedBefore) {
            scope.sendMail('Jiří Bartušek', 'More Tech Stuff - new major version',
                `Hi,
        
        MTS Mod has just been updated to a major version v2! It has already been installed to your
        game, so there is no need to do anything!
        
        In case you are wondering, what changes has been made, visit official Workshop page!
        
        Take care,
        
        Jiří Bartušek a.k.a. bartusek27`
            );
            scope.options.mts_mod = {loadedBefore: true, seenNewInstructions: true, seenUpdate3: true};
            Helpers.ConsoleInfo(`[MOD] More Tech Stuff: First-time email has been sent.`);
            scope.saveOptions();
        }
    }
};

exports.onUnsubscribe = done => {
    delete scope.options.mts_mod;
    scope.saveOptions();
    const regexp = /^sg_.*json$/;

    function findAndRemove(array, property, value) {
        array.forEach(function (result, index) {
            if (result[property] === value) {
                //Remove from array
                array.splice(index, 1);
            }
        });
    }

    function findAndReplace(array, property, value, toValue) {
        array.forEach(function (result, index) {
            if (result[property] === value) {
                //Replace entry in array
                array.result[property] = toValue;
            }
        });
    }

    //noinspection JSUnresolvedFunction
    Remote.app.getAllFiles(files => {

        const savegames = files.filter(file => re.test(file));

        savegames.forEach((file, index) => Helpers.LoadSettings(file, settings => {
            var componentArray = office.workstations.components;
            var researchInv = researchInventory;
            var currTask = office.workstations.employee.task;
            findAndRemove(componentArray, 'name', 'inputsanitizing');
            findAndRemove(componentArray, 'name', 'regexpsupport');
            findAndRemove(componentArray, 'name', 'receivefilter');
            findAndRemove(componentArray, 'name', 'autoupdates');
            findAndRemove(componentArray, 'name', 'screencapturing');
            findAndRemove(componentArray, 'name', 'livestreaming');
            findAndRemove(componentArray, 'name', 'serverredundancy');
            findAndRemove(componentArray, 'name', 'securityips');

            findAndReplace(currTask, 'name', 'inputsanitizing', null);
            findAndReplace(currTask, 'name', 'regexpsupport', null);
            findAndReplace(currTask, 'name', 'receivefilter', null);
            findAndReplace(currTask, 'name', 'autoupdates', null);
            findAndReplace(currTask, 'name', 'screencapturing', null);
            findAndReplace(currTask, 'name', 'livestreaming', null);
            findAndReplace(currTask, 'name', 'serverredundancy', null);
            findAndReplace(currTask, 'name', 'securityips', null);

            findAndRemove(researchInv, 'frameworkName', 'xamarin');
            findAndRemove(researchInv, 'frameworkName', 'dotnet');
            findAndRemove(researchInv, 'frameworkName', 'struts');
            findAndRemove(researchInv, 'frameworkName', 'angular');
            findAndRemove(researchInv, 'frameworkName', 'javaee');

            Remote.app.saveFile(file, JSON.stringify(settings));

        }));
    });

    Helpers.ConsoleInfo(`[MOD] More Tech Stuff: User has just unsubscribed from this mod... Good Bye!`);
    done();
};