let _modPath;

exports.initialize = (modPath) =>{                     
    _modPath = modPath;
};

exports.onLoadGame  = settings => {
	settings.office.workstations.forEach(ws => {
		if (ws.employee != null) {
			ws.employee.mood = 100
		}
	});
};

exports.onNewHour = settings => {
	/*Game.Lifecycle.EmployeeStats.forEach(employeeStat => {
		employeeStat.employee.mood = 100;
	});*/
	settings.office.workstations.forEach(ws => {
		if (ws.employee != null) {
			ws.employee.mood = 100
		}
	});
};