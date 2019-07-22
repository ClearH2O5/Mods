let _modPath;

exports.initialize = (modPath) =>{                     
    _modPath = modPath;
};

exports.onLoadGame  = settings => {
	settings.office.workstations.forEach(ws => {
		if (ws.employee != null) {
			if (ws.employee.mood <= 28) {
				ws.employee.mood = 28
			}
		}
	});
};

exports.onNewHour = settings => {
	settings.office.workstations.forEach(ws => {
		if (ws.employee != null) {
			if (ws.employee.mood <= 28) {
				ws.employee.mood = 28
			}
		}
	});
};