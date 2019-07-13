let _modPath;

exports.initialize = (modPath) => {
    _modPath = modPath;

    // Add new menu item
    Modding.setMenuItem({
        name: 'smartinventory',
        tooltip: "Smart Inventory",
        tooltipPosition: 'top',
        faIcon: 'fa-archive',
        badgeCount: 0,
    });

    exports.views = [
        {
            name: 'smartinventory',
            viewPath: _modPath + 'view.html',
            controller: ["$scope", "$rootScope", "$timeout", function ($scope, $rootScope) {
                $('.smartinventory-dialog').parent().css("width", 1124);
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
    if($rootScope.options.language === "br") {
        Language['search'] = "Pesquisar";
        Language['buy'] = "Comprar";
        Language['sell'] = "Vender";
        Language['sold-component-items'] = "Você vendeu {quantity} componentes ({componentname})";
        Language['buy-component-items'] = "Você comprou {quantity} unidades de componente ({componentname})";
        Language['buy-winout-product-first'] = "É necessario que seja criado pelo menos 1 de cada componente antes de poder comprar.";
        Language['explain-buy'] = "Para comprar so é aceito numeros positivos. <u>(1,5,10,100)</u>";
        Language['explain-sell'] = "Para vender é aceito tanto valores positivos quanto negativos.<u>(1,5,10,100) or ( -1, -5, -10, -100)</u>";
        Language['about-mod'] = "Aqui você poderá fazer compras e vendas de componentes para acelerar o crescimento de sua <strong> Startup </strong>, " +
            "seja com compras para <strong> upgrades de recursos </strong> ou vendendo componentes para ajudar no saldo bancário <strong> da empresa </strong>";
    } else {
        Language['search'] = "Search";
        Language['buy'] = "Buy";
        Language['sell'] = "Sell";
        Language['sold-component-items'] = "You have sold {quantity} in components ({componentname})";
        Language['buy-component-items'] = "You have purchase {quantity} in components ({componentname})";
        Language['buy-winout-product-first'] = "It is necessary to at least have created one of each component to be able to buy more units.";
        Language['explain-buy'] = "To buy is accepted whole and positive values. <u>(1,5,10,100)</u>.";
        Language['explain-sell'] = "To sell is accepted whole values being negative or positive.<u>(1,5,10,100) or ( -1, -5, -10, -100)</u>";
        Language['about-mod'] = "Here you will be able to make purchases and sales of components to accelerate the growth of your <strong>Startup</strong>, " +
            "either with purchases for <strong>resource upgrades</strong> or selling components to help with your <strong>company's bank balance</strong>";
    }
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
