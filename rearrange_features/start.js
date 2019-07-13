const rs = GetRootScope();
let _modPath;

// Import Languages module
let languagesModule;
let missingLib = false;
try {
    const lm = require('../languages_module/languages.module.min');
    languagesModule = new lm.LanguagesModule();
} catch (exception) {
    missingLib = true;
}


exports.initialize = (modPath) => {
    // If we don't have a missing lib (such as "Languages Module")
    if (missingLib === false) {
        _modPath = modPath;
        // Define view name
        let viewName = 'rearrangefeatures';

        // Init Languages Module
        languagesModule.init(this, [{code: 'en'}, {code: 'fr'}, {code: 'de'}, {code: 'it'}], viewName);

        // Add a new menu item
        Modding.setMenuItem({
            name: viewName,
            tooltip: "Rearrange Features",
            tooltipPosition: 'top',
            faIcon: 'fa-cubes',
            badgeCount: 0,
        });

        // Create view and logic
        exports.views = [
            {
                name: viewName,
                viewPath: `${modPath}/views/main.html`,
                controller: ["$scope", function ($scope) {
                        // Add Languages Module to the scope
                        $scope.languagesModule = languagesModule;
                        $scope.templatePath = `${modPath}/views`;
                        $scope.websites = [];
                        $scope.productFeatures = [];
                        $scope.selectedWebsite = null;

                        // Get all websites
                        $scope.getAllWebsites = () => {
                            // Init websites array
                            $scope.websites = [];

                            // Get all websites
                            rs.settings.products.forEach(function (website) {
                                $scope.websites.push(website);
                            });
                        };

                        // Get all features for this website
                        $scope.updatedSelectedWebsite = (selectedWebsite) => {
                            $scope.productFeatures = rs.settings.featureInstances
                                    .filter(fi => fi.productId == selectedWebsite.id)
                                    .map(n => {
                                        return {
                                            instance: n,
                                            friendlyName: Helpers.GetFriendlyFeatureName(n),
                                            feature: Features.find(e => e.name == n.featureName)
                                        }
                                    });
                        };

                        // Switch features position
                        $scope.updateFeaturePosition = (feature, movePosition) => {
                            // Get website
                            let website = rs.settings.products.find(function (p) {
                                return p.id == feature.instance.productId;
                            });

                            // Get features
                            let features = rs.settings.featureInstances;

                            // Get features for this website only
                            var websiteFeatures = features.filter(function (f) {
                                return f.productId == website.id;
                            });

                            // Get feature to move and his index
                            let wfSelectedIndex = websiteFeatures.indexOf(feature.instance);
                            let wfSelected = websiteFeatures[wfSelectedIndex];

                            // Check feature
                            if ((!wfSelected || typeof (wfSelected) === 'undefined') || wfSelectedIndex < 0) {
                                console.error("Error #1 : Features can't be found in your product. Contact me on Discord, this should not happend.");
                                PlaySound(Sounds.error);
                                return;
                            }

                            // Get target feature, and his index, who will switch this the selecte feature
                            let wfTargetIndex = (movePosition < 0 ? wfSelectedIndex - 1 : wfSelectedIndex + 1);
                            let wfTarget = websiteFeatures[wfTargetIndex];

                            // Check feature
                            if ((!wfTarget || typeof (wfTarget) === 'undefined') || wfTargetIndex < 0) {
                                console.error("Error #2 : Features can't be found in your product. Contact me on Discord, this should not happend.");
                                PlaySound(Sounds.error);
                                return;
                            }

                            // Get real indexes in featureInstances
                            let fiSelectedIndex = features.indexOf(features.find(function (f) {
                                return f.id == wfSelected.id;
                            }));

                            let fiTargetIndex = features.indexOf(features.find(function (f) {
                                return f.id == wfTarget.id;
                            }));

                            // Check we have both index
                            if (fiSelectedIndex < 0 || fiTargetIndex < 0) {
                                console.error("Error #3 : Features can't be found in your product. Contact me on Discord, this should not happend.");
                                PlaySound(Sounds.error);
                                return;
                            }

                            // Switch the features
                            rs.settings.featureInstances[fiTargetIndex] = wfSelected;
                            rs.settings.featureInstances[fiSelectedIndex] = wfTarget;

                            // Play sound of success
                            PlaySound(Sounds.stamp);

                            // Refresh features order
                            $scope.updatedSelectedWebsite(website);
                        };
                    }]
            }];
    }
}

exports.onLoadGame = (settings) => {
    // Init Languages module settings
    if (missingLib === false) {
        languagesModule.initSettings(settings);
    } else {
        let _self = this;
        let impactedMod = Game.mods.find(function (m) {
            return m.id === _self.modId;
        });

        rs.showMessage(``, impactedMod.name + ' mod requires "Languages Module" mod.<br><br>You must subscribe to it in Startup Company\'s Workshop.', function () {
            // Reset the image to avoid display it in the future showMessage()
            rs.Message.image = null;
            console.error(impactedMod.name + ' mod requires "Languages Module" mod. You must subscribe to it in Startup Company\'s Workshop.');
        }, impactedMod.modPath + impactedMod.imageUrl);
    }
}

exports.onUnsubscribe = done => {
    // Restores everything to prepare for unsubscription from Steam Workshop
    const re = /^sg_.*json$/;
    Remote.app.getAllFiles(files => {
        // Get savegames
        const savegames = files.filter(file => re.test(file));

        // Check each savegames that can contains my mod settings
        savegames.forEach((file, index) => Helpers.LoadSettings(file, settings => {
                // Remove settings of the mod
                delete settings.rearrange_features;

                // Save cleaned file
                Remote.app.saveFile(file, JSON.stringify(settings));

                // If this is the last savegame, tell we are done
                if (index === savegames.length - 1) {
                    done();
                }
            }));
    });
}