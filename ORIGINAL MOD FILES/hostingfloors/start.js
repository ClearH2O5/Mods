let _modPath;

exports.initialize = modPath => {
    _modPath = modPath;
    Buildings[6].floors = 3;

    let $rootScope = GetRootScope();

    let cview = angular.element('ui').scope();

    Helpers.changeFloor = (e) => {
        let t = angular.element('ui').scope();
        null != t && (t.ctrl.changeFloor(e), Helpers.SafeApply());

        $rootScope.settings.hosting.grid.forEach((g) => {
     
            if(typeof g.rackId !== 'undefined') {
                if (g.floor == e) {
                    isodomHelpers.setOverlay(g,iso.cell(g.x,g.y))
                } else {
                    $(`#overlay-${g.rackId}`).remove()
                }
            }
        })
		
        Helpers.UpdateRackOverlays();

    };

    Helpers.PrepareSavegameCompatibility = e => {
        let t = `${Configuration.BETA_VERSION}.${Configuration.BETA_SUBVERSION}`;
        e.lastVersion = e.lastVersion || '8.0', e.selectedFloor = e.selectedFloor || 1, e.resignedEmployees = e.resignedEmployees || [], e.competitorProducts = e.competitorProducts || Helpers.Clone(CompetitorProducts), e.featureInstances = e.featureInstances || [], e.maxContractHours = e.maxContractHours || 5, e.contractsCompleted = e.contractsCompleted || e.contracts.filter(e => e.completed).length, e.marketingInsight = e.marketingInsight || [], e.progress = e.progress || {products: {}}, e.selectedBuildingName = e.selectedBuildingName || e.office.buildingName;
        let n = Helpers.GetAllEmployees(!0, e);
        if (Helpers.VersionCompare('9.0', e.lastVersion) > 0) {
            e.notifications = e.notifications || [], e.activatedBenefits = e.activatedBenefits || [], e.contracts = [];
            for (let t = 0; t < e.inventory.length; t++) {
                let n = Components.find(n => n.name == e.inventory[t].name);
                null != n && (e.inventory[t] = Helpers.Clone(n));
            }
            _.remove(e.inventory, e => 'ResponsiveComponent' == e.name), _.remove(e.inventory, e => 'WebDesignComponent' == e.name), _.remove(e.inventory, e => 'WebFrontendModule' == e.name), e.products = [];
        }
        if (Helpers.VersionCompare('10.0', e.lastVersion), Helpers.VersionCompare('17.0', e.lastVersion) > 0 && (EmailGenerator.Beta17(), e.disableUserLoss = !0), 1 == e.disableUserLoss) {
            for (const t of e.products) {
                t.disableUserLoss = !0;
            }
            delete e.disableUserLoss;
        }
        if (e.researchPoints = e.researchPoints || 0, null == e.completedResearching) {
            e.completedResearching = {
                features: [],
                frameworks: [],
            };
            let t = _.groupBy(e.researchInventory, e => e.frameworkName || e.featureName);
            for (const n of Object.entries(t)) {
                let t = Features.find(e => e.name == n[0]),
                    r = Frameworks.find(e => e.name == n[0]),
                    i = Helpers.CalculateRequiredResearchPoints(n[0], n[0]);
                n[1].some(e => e.researchPoints == i) && (t ? e.completedResearching.features.push(t.name) : e.completedResearching.frameworks.push(r.name));
            }
        }
        e.office.workstations.forEach(e => {
            null != e.deskId && (e.deskName = _.toArray(Database.workstationTypes).find(t => t.id == e.deskId).name), null == e.bonus && (e.bonus = 0), null != e.employee && (null != e.employee.task && null == e.employee.task.state && (e.employee.task = null), e.employee.employeeTypeName == Enums.EmployeeTypeNames.ChiefTechnologyOfficer && (e.employee = null), e.employee.employeeTypeName == Enums.EmployeeTypeNames.Manager && null != e.employee.employees && e.employee.employees.forEach(t => {
                n.some(e => e.id == t) || _.remove(e.employee.employees, e => e == t);
            }), e.employee.minutesTillNextEmotion = e.employee.minutesTillNextEmotion || _.random(200, 480), e.employee.idleMinutes = e.employee.idleMinutes || 0);
        });
        for (const t of[
            ...e.office.workstations.map(e => ({
                employee: e.employee,
                workstation: e,
            })), ...e.unassignedEmployees.map(e => ({employee: e}))]) {
            let e = t.employee;
            if (null != e) {
                if ('DevOps' == e.employeeTypeName && (e.employeeTypeName = Enums.EmployeeTypeNames.SysAdmin), null != e && (null == e.workingHours || null == e.newWorkingHours)) {
                    let t = Helpers.Clone(e.schedule);
                    e.workingHours = t, e.newWorkingHours = t;
                }
                if (null != e.workingHours && null == e.schedule && (e.schedule = Object.assign(e.workingHours, {daysOff: []})), e.employeeTypeName == Enums.EmployeeTypeNames.Manager && (e.production = e.production || {}), e.employeeTypeName == Enums.EmployeeTypeNames.SalesExecutive && null != e.task && null != e.task.contractType && (e.task = null), null == e.maxSpeed) {
                    switch (e.level) {
                        case Enums.EmployeeLevels.Beginner:
                            e.maxSpeed = _.random(140, 200);
                            break;
                        case Enums.EmployeeLevels.Intermediate:
                            e.maxSpeed = _.random(175, 250);
                            break;
                        case Enums.EmployeeLevels.Expert:
                            e.maxSpeed = _.random(280, 400);
                    }
                    e.speed = _.random(.5 * e.maxSpeed, .7 * e.maxSpeed);
                }
                null == e.sendHomeDaysLeft && (e.sendHomeDaysLeft = 0), null == e.demands ? Helpers.AddDemandsForNewEmployee(e, null != t.workstation ? t.workstation.deskName : null) : _.remove(e.demands, e => null == e);
            }
        }
        e.products.forEach(t => {
            t.activeMarketingPackages = t.activeMarketingPackages || [], t.hostingAllocation = null != t.hostingAllocation ? t.hostingAllocation : 1 == e.products.length ? 100 : 0, t.history = t.history || [], t.mergers = t.mergers || [], t.investments = t.investments || [], t.ads = t.ads || [], t.features.forEach(e => {
                null == e.released && e.level > 0 && (e.released = !0);
            });
            let n = e.progress.products[t.id];
            if (null == n && (n = Helpers.CreateProductProgressObject(), e.progress.products[t.id] = n, t.campaigns = [], delete t.users), n.users.total <= 0 && (n.users.total = 0), null == t.stats.onlineUsers && (t.stats = {
                onlineUsers: [],
                registeredUsers: [],
            }), n.mergers = n.mergers || [], Frameworks.find(e => e.name == t.frameworkName) || (t.frameworkName = FrameworkNames.BasicFramework), ProductTypes.find(e => e.name == t.productTypeName) || (t.productTypeName = Object.keys(ProductTypeNames)[0]), null != t.investor) {
                let n = Investors.find(e => e.id == t.investor.id);
                t.investor.milestones.length != n.milestones.length && (t.investor.milestones = Helpers.Clone(n.milestones), GetRootScope().updateFinanceData(), _.times(t.investor.milestones.length, () => {
                    Helpers.RunMilestones(t, e, GetRootScope().financeData, !0);
                }));
            }
            let r = GetDateDiffInDays(e.date);
            _.remove(t.ads, e => e.day > r + Configuration.AD_SPACE_MAX_QUEUE), _.remove(t.campaigns, e => null == e.type);
        }), _.flatten(_.toArray(_.groupBy(e.contracts, e => e.id)).filter(e => e.length > 1)).forEach(t => {
            _.remove(e.contracts, e => e.id == t.id);
        });
        for (const t of CompetitorProducts) {
            let n = e.competitorProducts.find(e => e.id == t.id);
            null == n ? e.competitorProducts.push(t) : n.logoPath = t.logoPath;
        }
        if (e.competitorProducts.forEach(t => {
            if (t.stockVolume = t.stockVolume || Helpers.GetStockVolume(t), t.ownedStocks = t.ownedStocks || 0, t.growth = t.growth || _.random(-5, 5), t.history = t.history || [], (null == t.priceExpectations || isNaN(t.priceExpectations)) && (t.priceExpectations = Helpers.ToFixed(_.random(1.9, 6.5), 1)), t.dealResults = t.dealResults || [], null == t.users || null != t.users.Web) {
                let n = CompetitorProducts.find(e => e.id == t.id);
                null == n ? _.remove(e.competitorProducts, e => e.id == t.id) : t.users = n.users;
            }
        }), null == e.office.grid) {
            e.office.grid = [];

            function r(e, t, n, r) {
                let i = e % n,
                    a = Math.floor(parseInt(e) / n);
                switch (r) {
                    case IsoDom.ORIENTATION_NW:
                    case IsoDom.ORIENTATION_SE:
                        i -= t[1] - 1, a -= t[0] - 1;
                        break;
                    case IsoDom.ORIENTATION_NE:
                    case IsoDom.ORIENTATION_SW:
                        i -= t[0] - 1, a -= t[1] - 1;
                }
                return {
                    x: i,
                    y: a,
                };
            }

            let t = e => {
                    switch (e) {
                        case 1:
                            return IsoDom.ORIENTATION_NW;
                        case 2:
                            return IsoDom.ORIENTATION_NE;
                        case 3:
                            return IsoDom.ORIENTATION_SE;
                        case 4:
                            return IsoDom.ORIENTATION_SW;
                    }
                },
                n = Buildings.find(t => t.name == e.office.buildingName);
            null != e.office.items && e.office.items.forEach(i => {
                'meeting_table1' == i.item.name && (i.orientation += 1, i.orientation > 4 && (i.orientation = 1));
                let a = Database.items[i.item.name],
                    o = t(i.orientation),
                    s = r(i.cellId, a.size, n.width, o);
                e.office.grid.push({
                    itemName: i.item.name,
                    x: s.x,
                    y: s.y,
                    orientation: o,
                });
            }), e.office.workstations.forEach(i => {
                let a = Database.workstationTypes[i.deskName],
                    o = t(i.orientation),
                    s = r(i.cellId, a.size, n.width, o);
                e.office.grid.push({
                    itemName: i.deskName,
                    x: s.x,
                    y: s.y,
                    orientation: o,
                    workstationId: i.id,
                });
            });
        }
        e.office.grid.forEach(e => {
            null == e.floor && (e.floor = 1);
        }), _.remove(e.office.grid, e => 'christmas_tree2' == e.itemName), e.contracts.length > 20 && (e.contracts = _.takeRight(e.contracts, 20));
        for (const t of e.mails) {
            null == t.id && (t.id = chance.guid());
        }
        for (const t of e.featureInstances) {
            t.efficiency.current > 104 && (t.efficiency.current = 104);
        }
        if (Helpers.VersionCompare('15.0', e.lastVersion) > 0) {
            for (const t of e.featureInstances) {
                t.activated = !0;
            }
        }
        if (null != e.hosting) {
            for (cell of e.hosting.grid) {
                null != cell.rackId && null == e.hosting.racks.find(e => e.id == cell.rackId) && _.remove(e.hosting.grid, e => e.x == cell.x && e.y == cell.y);
            }
        }
        e.loadedMods = LoadedMods.map(e => e.modId), e.lastVersion = t;
    };

};

exports.onLoadGame = settings => {

    let cview = angular.element('ui').scope();

    cview.ctrl.changeFloor = (t => {
        let e = $rootScope;
        if (1 == e.activeBuilding.floors || !_.inRange(t, 1, e.activeBuilding.floors + 1)) {
            return;
        }
        let n = dragAndDrop.item;
        if (null != n) {
            let e = dragAndDrop.item;
            iso.removeItem(e), Helpers.SaveGrid(), dragAndDrop.cancel(), dragAndDrop.dirtyFloor = !0;
        }
        e.settings.selectedFloor = t, 'Office' == e.activeBuilding.type ? e.settings.office.lastSelectedFloor = t : e.settings.hosting.lastSelectedFloor = t, Helpers.InitializeFloor(), null != n && dragAndDrop.start(n);

        $rootScope.settings.hosting.grid.forEach((g) => {
            if(typeof g.rackId !== 'undefined') {
                if (g.floor == t) {
                    isodomHelpers.setOverlay(g,iso.cell(g.x,g.y))
                } else {
                    $(`#overlay-${g.rackId}`).remove()
                }
            }
        })

        Helpers.UpdateRackOverlays();
    });
	
	let cssPath = _modPath.replaceAll("\\\\/","/").replaceAll("\\\\","/")+"css/style.css";

    $('head').append(`<link id="hosting_stylesheet" rel="stylesheet" type="text/css" href="file:///${cssPath}">`);


};
