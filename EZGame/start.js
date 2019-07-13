// by horex
let _modPath;

exports.initialize = (modPath, settings) =>{                     
    _modPath = modPath;
	
	exports.views = [
        {
            name: 'cheat',
            viewPath: _modPath + 'view.html',
            controller: function ($rootScope) {
                this.giveMoney = (amount) => {
                    Cheats.GetMoney(amount); // Give Money
                    console.log("Player got " + amount + " $")
                }
                this.removeMoney = (amount) => {
                    Cheats.GetMoney(amount); // Remove Money
                    console.log("Player remove " + amount + " $")
                }
                this.removeAllMoney = () => {
                	console.log("Player remove all money " + $rootScope.settings.balance + " $")
                	Cheats.GetMoney(-$rootScope.settings.balance)
                }
                this.removeRpoints = (amount) => {
                    GetRootScope().settings.researchPoints -= amount // Remove rPoints
                    console.log("Player remove " + amount + " rPoints")
                }
                this.removeAllrPoints = () => {
                	console.log("Player remove " + $rootScope.settings.researchPoints + " rPoints")
                	GetRootScope().settings.researchPoints -= $rootScope.settings.researchPoints
                }
				this.givePoints = (amount) => {
					GetRootScope().settings.researchPoints += amount // Give researchPoints
					console.log("Player got " + amount + " RP")
				}
				this.unlockAll = (truefalse) => {
					Cheats.UnlockEverything(truefalse); // Unlock Everything
					console.log("Player UnlockEverything")
				}
				this.giveComponents = (components) => {
					Cheats.GetComponents(components);
					console.log("Player got " + components + " components")
				}
				this.setESpeed = (espeed) => {
					GetRootScope().settings.office.workstations.forEach(ws => {
						if (ws.employee != null) {
							ws.employee.speed = espeed // 500 % speed employee
						}
						console.log("Player set " + espeed + "% speed employee")
					});
				}
            }
        }
    ]
	
	Modding.setMenuItem({
    name: 'cheat',
    tooltip: "EZGame Menu",
    tooltipPosition: 'right',
    faIcon: 'fa-bomb',
	});
};

exports.onLoadGame = settings => {
	settings.office.workstations.forEach(ws => {
		if (ws.employee != null) {
			ws.employee.mood = 100 // 100 % mood employee
			//ws.employee.speed = 500 // 500 % speed employee
		}
	});
};

exports.onNewHour = settings => {
	settings.office.workstations.forEach(ws => {
		if (ws.employee != null) {
			ws.employee.mood = 100
			//ws.employee.speed = 500 // 500 % speed employee
		}
	});
};
// by horex