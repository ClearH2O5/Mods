let modPath;

exports.initialize = (modPath) => {
   

    // Add new menu item
    Modding.setMenuItem({
        name: 'smartinventory',
        tooltip: "Smart Inventory",
        tooltipPosition: 'top',
        faIcon: 'fa-archive',
    });

    exports.views = [
        {
            name: 'smartinventory',
            viewPath: `${modPath}/view.html`,
            controller: ["$scope", "$rootScope", "$timeout", function ($scope, $rootScope) {
                $('.smartinventory-dialog').parent().css("width", 1720);
                this.search = '';
                this.quantity = [];

                this.componentsPrice = {
                    Beginner: {
                        Designer: 3,
                        Developer: 3,
                        SysAdmin: 4,
                        Marketer: 5,
                        LeadDeveloper: 7
                    },
                    Intermediate: {
                        Designer: 8,
                        Developer: 9,
                        SysAdmin: 10,
                        Marketer: 11,
                        LeadDeveloper: 12
                    },
                    Expert: {
                        Designer: 12,
                        Developer: 15,
                        SysAdmin: 13,
                        Marketer: 15,
                        LeadDeveloper: 15
                    },
                }
            
                this.componentList = () => {
                    var array = [];
                    for (var i = 0; i < Components.length; i++) {
                        var obj = Components[i];

                        obj.inventory = this.getInventory(obj.name);
                        if(!obj.employeeTypeName) {
                            obj.employeeTypeName = '';
                        }

                        array.push(obj);
                    }

                    array = _.filter(array, item => {
                        return _.includes(Helpers.GetLocalized(item.name).toString().toLowerCase(), this.search.toLowerCase());
                    });

                    return array;
                };

                this.getPrice = component => {
                    let obj = this.getComponentByName(component);
                    return parseInt(this.componentsPrice[obj.employeeLevel][obj.employeeTypeName] * (this.quantity[obj.name] ? this.quantity[obj.name] : 1));
                }

                this.getComponentByName = component =>  {
                    for (var i = 0; i < Components.length; i++) {
                        var obj = Components[i];

                        if(obj.name === component) {
                            return obj;
                        }
                    }
                }

                this.getInventory = function (component) {
                    if ($rootScope.settings.inventory[component]) {
                        return $rootScope.settings.inventory[component];
                    }

                    return 0;
                };

                this.buyComponents = function (component) {
                    let inventoryValueBefore = $rootScope.settings.inventory[component];
                    if(parseInt(this.quantity[component]) > 0) {
                        let newValue = parseInt($rootScope.settings.inventory[component]) + parseInt(this.quantity[component]);
                        $rootScope.settings.inventory[component] = newValue

                        if($rootScope.settings.inventory[component] == newValue) {
                            $rootScope.settings.balance -= this.getPrice(component);

                            $rootScope.addTransaction(Helpers.GetLocalized("buy-component-items", {
                                componentname: Helpers.GetLocalized(component),
                                quantity: this.quantity[component]
                            }), -this.getPrice(component));
                        } else {
                            $rootScope.settings.inventory[component] = inventoryValueBefore;
                        }
                    }
                }

                this.sellComponents = function (component) {
                    let newValue = parseInt($rootScope.settings.inventory[component]) - parseInt(this.quantity[component]);
                    if(newValue >= 0) {
                        $rootScope.settings.inventory[component] = newValue;
                        $rootScope.settings.balance += this.getPrice(component);

                        $rootScope.addTransaction(Helpers.GetLocalized("sold-component-items", {
                            componentname: Helpers.GetLocalized(component),
                            quantity: this.quantity[component]
                        }), this.getPrice(component));
                    }
                }
            }]
        }]
}

exports.onLoadGame = () => {
     $rootScope = GetRootScope();
        Language['search'] = "Search";
        Language['buy'] = "Buy";
        Language['sell'] = "Sell";
        Language['sold-component-items'] = "You have sold {quantity} components ({componentname})";
        Language['buy-component-items'] = "You have purchased {quantity} components ({componentname})";     
        Language['purchase'] = "Total";
    }


exports.onUnsubscribe = done => {
    //Restores everything to prepare for unsubscription from Steam Workshop
    const re = /^sg_.*json$/;
    Remote.app.getAllFiles(files => {

        const savegames = files.filter(file => re.test(file));

        savegames.forEach((file, index) => Helpers.LoadSettings(file, settings => {
            //TODO: Clean up settings object
            Remote.app.saveFile(file, JSON.stringify(settings));

            if (index === savegames.length - 1) {
                done();
            }
        }));
    });
}
