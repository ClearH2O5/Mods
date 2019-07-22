const rs = GetRootScope();
let jobs;
let levels;
let _modPath;
let _self = this;

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
    _modPath = modPath;

    // If we don't have a missing lib (such as "Languages Module")
    if (missingLib === false) {
        // Define view name
        let viewName = 'manageinventory';

        // Init Languages Module
        languagesModule.init(this, [{code: 'en'}, {code: 'fr'}, {code: 'de'}, {code: 'es'}, {code: 'ru'}, {code: 'it'}, {code: 'cn'}, {code: 'da'}], viewName);
        jobs = [rs.Enums.EmployeeTypeNames.Designer, rs.Enums.EmployeeTypeNames.Developer, rs.Enums.EmployeeTypeNames.LeadDeveloper, rs.Enums.EmployeeTypeNames.Marketer, rs.Enums.EmployeeTypeNames.SysAdmin];
        levels = rs.Enums.EmployeeLevels;

        // Add a new menu item
        Modding.setMenuItem({
            name: viewName,
            tooltip: "Manage Inventory",
            tooltipPosition: 'top',
            faIcon: 'fa-archive',
            badgeCount: 0,
        });

        // Create view and logic
        exports.views = [
            {
                name: viewName,
                viewPath: `${modPath}/views/main.html`,
                controller: ["$scope", "$timeout", function ($scope, $timeout) {
                        $('#main-dialog').parent().css('width', 1800);
                        // Add Languages Module to the scope
                        $scope.languagesModule = languagesModule;
                        this.quantity = [];
                        this.employeesState = [];
                        this.hasDevicesToSell = false;
                        this.templatePath = `${modPath}/views`;
                        // Init number of employees for each type and level
                        this.initEmployeesState = function () {
                            // Parse all jobs and levels
                            jobs.forEach(function (job) {
                                $scope.manageinventoryCtrl.employeesState[job] = [];
                                $.each(levels, function (level) {
                                    $scope.manageinventoryCtrl.employeesState[job][level] = 0;
                                });
                            });
                            // Assign number of employees for each type
                            rs.Helpers.GetAllEmployees()
                                    .filter(function (e) {
                                        return jobs.indexOf(e.employeeTypeName) >= 0;
                                    })
                                    .forEach(function (employee) {
                                        $scope.manageinventoryCtrl.employeesState[employee.employeeTypeName][employee.level] += 1;
                                    });
                        };
                        // Get the stock of the component
                        this.getComponentStock = function (component) {
                            // If component was found, return stock
                            if (rs.settings.inventory[component.name]) {
                                return rs.settings.inventory[component.name];
                            }

                            // Otherwise, no stock
                            return 0;
                        };
                        // Returns employee type's components depending on his level
                        this.componentList = (employeeType, componentLevel) => {
                            let cmpList = [];
                            // Check all components for this employee type
                            Components.filter(function (c) {
                                return c.employeeTypeName === employeeType && c.employeeLevel === componentLevel;
                            })
                                    .forEach(function (component) {
                                        component.stock = $scope.manageinventoryCtrl.getComponentStock(component);
                                        cmpList.push(component);
                                        // If no stock, set default quantity to 1
                                        if (isNaN($scope.manageinventoryCtrl.quantity[component.name])) {
                                            $scope.manageinventoryCtrl.quantity[component.name] = 1;
                                        }

                                        // Check if we can buy this component
                                        let es = $scope.manageinventoryCtrl.employeesState[employeeType];
                                        // Check if research for this type and level are unlocked
                                        let researches = {
                                            Designer: {Beginner: ResearchItemNames.BeginnerDesignerKit, Intermediate: ResearchItemNames.IntermediateDesignerKit, Expert: ResearchItemNames.ExpertDesignerKit},
                                            Developer: {Beginner: ResearchItemNames.BeginnerDevkit, Intermediate: ResearchItemNames.IntermediateDevkit, Expert: ResearchItemNames.ExpertDevkit},
                                            LeadDeveloper: {Beginner: ResearchItemNames.BeginnerLeadDevkit, Intermediate: ResearchItemNames.IntermediateLeadDevkit, Expert: ResearchItemNames.ExpertLeadDevkit},
                                            Marketer: {Beginner: ResearchItemNames.BeginnerMarketingKit, Intermediate: ResearchItemNames.IntermediateMarketingKit, Expert: ResearchItemNames.ExpertMarketingKit},
                                            SysAdmin: {Beginner: ResearchItemNames.BeginnerSysAdminKit, Intermediate: ResearchItemNames.IntermediateSysAdminKit, Expert: ResearchItemNames.ExpertSysAdminKit}
                                        };
                                        // If the reseach has been unlocked
                                        if (rs.settings.researchedItems.indexOf(researches[component.employeeTypeName][component.employeeLevel]) >= 0) {
                                            if (component.employeeLevel === levels.Expert) {
                                                if (es[component.employeeLevel] > 0) {
                                                    component.can_buy = true;
                                                } else {
                                                    component.can_buy = false;
                                                }
                                            } else if (component.employeeLevel === levels.Intermediate) {
                                                if (es[component.employeeLevel] > 0 || es[levels.Expert] > 0) {
                                                    component.can_buy = true;
                                                } else {
                                                    component.can_buy = false;
                                                }
                                            } else {
                                                if (es[component.employeeLevel] > 0 || es[levels.Intermediate] > 0 || es[levels.Expert] > 0) {
                                                    component.can_buy = true;
                                                } else {
                                                    component.can_buy = false;
                                                }
                                            }
                                        } else {
                                            component.can_buy = false;
                                        }
                                    });
                            return cmpList;
                        };
                        // Calculate price of component / rack device
                        this.getUnitPrice = function (componentName, action) {
                            // Check if this is a rack device
                            if (RackDeviceNames[componentName]) {
                                return RackDevices[componentName].price;
                            }

                            // Multipliers applied for each employee level
                            let multipliers = {
                                Beginner: 1,
                                Intermediate: 2,
                                Expert: 5
                            };
                            let salary = {
                                Beginner: 13000,
                                Intermediate: 18000,
                                Expert: 23000
                            };
                            // Approx. hours worked by month (7 hours per day - 5 working days in a week)
                            let monthlyHours = 152;
                            let component = $(Components).filter(function () {
                                return this.name == componentName;
                            })[0];
                            let price = (rs.Helpers.CalculateComponentProductionHours(component) * salary[component.employeeLevel] / monthlyHours) * multipliers[component.employeeLevel];
                            // If action is buy, add a 5x multiplier
                            if (action === 'buy') {
                                price *= 5;
                            }

                            return parseInt(price);
                        }

                        // Buy or sell X quantity of component
                        this.manageComponent = function (componentName, action) {
                            if (parseInt(this.quantity[componentName]) > 0) {
                                let currentInventory = 0;
                                let quantity = parseInt(this.quantity[componentName]);
                                let amount = parseInt(quantity * $scope.manageinventoryCtrl.getUnitPrice(componentName, action));
                                let newStock;
                                // Check if this is a rack device
                                if (RackDeviceNames[componentName]) {
                                    let equipmentInventory = rs.settings.hosting.inventory[componentName];
                                    // If he's in the inventory
                                    if (equipmentInventory) {
                                        // Set it as current inventory
                                        currentInventory = equipmentInventory;
                                    }
                                } else {
                                    // Should be a number
                                    if (typeof (rs.settings.inventory[componentName]) === "number") {
                                        currentInventory = rs.settings.inventory[componentName];
                                    }
                                }

                                // If we buy a component, add to the inventory. Otherwise, remove it.
                                let hasError = true;
                                if (action === 'buy') {
                                    newStock = (currentInventory + quantity);
                                    // Safe buy
                                    rs.safeBuy(function () {
                                        // If buyed without error
                                        hasError = false;
                                    }, amount, rs.Helpers.GetLocalized("manage_inventory.purchased_components", {
                                        componentName: rs.Helpers.GetLocalized(componentName),
                                        quantity: quantity
                                    }
                                    ));
                                    // If we have an error while buying
                                    if (hasError) {
                                        return;
                                    }
                                } else {
                                    // New stock
                                    newStock = currentInventory - parseInt(this.quantity[componentName]);
                                    // The stock can't be negative, cancel
                                    if (newStock < 0) {
                                        return;
                                    }

                                    // Money sound
                                    PlaySound(Sounds.money);
                                    // Add amount to balance
                                    rs.settings.balance += amount;
                                    // Log transaction
                                    rs.addTransaction(rs.Helpers.GetLocalized("manage_inventory.sold_components", {
                                        componentName: rs.Helpers.GetLocalized(componentName),
                                        quantity: quantity
                                    }
                                    ), amount);
                                }

                                // Update Topbar
                                Helpers.UpdateTopbar();
                                // Set new inventory (rack device)
                                if (RackDeviceNames[componentName]) {
                                    rs.settings.hosting.inventory[componentName] = newStock;
                                } else {
                                    // Set new inventory (components)
                                    rs.settings.inventory[componentName] = newStock;
                                }
                            }

                            return;
                        }

                        // Returns hosting equipments that are in inventory (not in the racks)
                        this.hostingEquipementsList = function () {
                            let hosting = rs.settings.hosting;
                            let devicesInventory = 0;
                            $scope.manageinventoryCtrl.hasDevicesToSell = false;
                            // If we have hosting
                            if (hosting) {
                                Object.keys(hosting.inventory).forEach(function (name) {
                                    // If no stock, set default quantity to 1
                                    if (isNaN($scope.manageinventoryCtrl.quantity[name])) {
                                        $scope.manageinventoryCtrl.quantity[name] = 1;
                                    }

                                    // Add inventory of this device in devices inventory (could be 0)
                                    devicesInventory += hosting.inventory[name];
                                });
                                // Set devices message flag
                                $scope.manageinventoryCtrl.hasDevicesToSell = devicesInventory > 0 ? true : false;
                                return hosting.inventory;
                            }
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
            // Reset the image to avoid display it in the futures showMessage()
            rs.Message.image = null;
            console.error(impactedMod.name + ' mod requires "Languages Module" mod. You must subscribe to it in Startup Company\'s Workshop.');
        }, impactedMod.modPath + impactedMod.imageUrl);
    }
}

exports.onUnsubscribe = (done) => {
    // Restores everything to prepare for unsubscription from Steam Workshop
    const re = /^sg_.*json$/;
    Remote.app.getAllFiles(files => {
        // Get savegames
        const savegames = files.filter(file => re.test(file));

        // Check each savegames that can contains my mod settings
        savegames.forEach((file, index) => Helpers.LoadSettings(file, settings => {
                // Remove settings of the mod
                delete settings.manage_inventory;

                // Save cleaned file
                Remote.app.saveFile(file, JSON.stringify(settings));

                // If this is the last savegame, tell we are done
                if (index === savegames.length - 1) {
                    done();
                }
            }));
    });
}
