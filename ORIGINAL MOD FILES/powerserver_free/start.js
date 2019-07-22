let _modPath;

exports.initialize = (modPath) =>{
	_modPath = modPath;

	RackDeviceNames.WebserverBobnardFree = 'webserverbobnardfree';
	RackDeviceNames.CacheserverBobnardFree = 'cacheserverbobnardfree';
	RackDeviceNames.DatabaseserverBobnardFree = 'databaseserverbobnardfree';

	RackDevices.WebserverBobnardFree = {
		"name":	"WebserverBobnardFree",
		"units": 8,
		"price": 1,
		"clockRate": 100,
		"power": 140000,
		"producedHeat": 20,
		"webserverThroughput": 210000,
		"url":"images/racks/WebserverX.png",
		"requirements": {
			"Firewall": 1,
			"VirtualHardware": 1,
			"OperatingSystem": 1
		}
	};

	RackDevices.CacheserverBobnardFree = {
		"name": "CacheserverBobnardFree",
		"units": 8,
		"price": 1,
		"clockRate":100,
		"power":140000,
		"producedHeat":20,
		"cacheThroughput":420000,
		"url":"images/racks/CacheserverX.png",
		"requirements": {
			"Firewall":1,
			"VirtualHardware":1,
			"OperatingSystem":1
		}
	};

	RackDevices.DatabaseserverBobnardFree = {
		"name": "DatabaseserverBobnardFree",
		"units": 8,
		"price": 1,
		"clockRate": 100,
		"power": 140000,
		"producedHeat": 20,
		"databaseThroughput": 300000,
		"url":"images/racks/DatabaseserverX.png",
		"requirements": {
			"Firewall": 1,
			"VirtualHardware": 1,
			"OperatingSystem": 1
		}
	};

	// Also add an research entry
	ResearchItems.push({
			category: "Hosting",
			faIcon: "fa-server",
			name: "ServerPackBobnardFree",
			points: 1,
			unlockType: "RackDevices",
			unlocks: [
				"WebserverBobnardFree",
				"CacheserverBobnardFree",
				"DatabaseserverBobnardFree",
			]
	});

};

exports.onLoadGame = settings => {
	Language['endgameframeworkfree'] = 'Bobnards Framework - Easy';
	Language['webserverbobnardfree'] = 'Bobnards Webserver - Easy';
	Language['cacheserverbobnardfree'] = 'Bobnards Cacheserver - Easy';
	Language['databaseserverbobnardfree'] = 'Bobnards Databaseserver - Easy';
	Language['serverpackbobnardfree'] = 'Bobnards Serverpack - Easy';
	Language['serverpackbobnardfree_description'] = 'Bobnards EASY Serverpack brings the last X-Server * 10!';

}

exports.onBackgroundWorkerStart = () => {
	RackDeviceNames.WebserverBobnardFree = 'webserverbobnardfree';
	RackDeviceNames.CacheserverBobnardFree = 'cacheserverbobnardfree';
	RackDeviceNames.DatabaseserverBobnardFree = 'databaseserverbobnardfree';

	RackDevices.WebserverBobnardFree = {
		"name":	"WebserverBobnardFree",
		"units": 8,
		"price": 1,
		"clockRate": 100,
		"power": 140000,
		"producedHeat": 20,
		"webserverThroughput": 210000,
		"url":"images/racks/WebserverX.png",
		"requirements": {
			"Firewall": 1,
			"VirtualHardware": 1,
			"OperatingSystem": 1
		}
	};

	RackDevices.CacheserverBobnardFree = {
		"name": "CacheserverBobnardFree",
		"units": 8,
		"price": 1,
		"clockRate":100,
		"power":140000,
		"producedHeat":20,
		"cacheThroughput":420000,
		"url":"images/racks/CacheserverX.png",
		"requirements": {
			"Firewall":1,
			"VirtualHardware":1,
			"OperatingSystem":1
		}
	};

	RackDevices.DatabaseserverBobnardFree = {
		"name": "DatabaseserverBobnardFree",
		"units": 8,
		"price": 1,
		"clockRate": 100,
		"power": 140000,
		"producedHeat": 20,
		"databaseThroughput": 300000,
		"url":"images/racks/DatabaseserverX.png",
		"requirements": {
			"Firewall": 1,
			"VirtualHardware": 1,
			"OperatingSystem": 1
		}
	};

	// Also add an research entry
	ResearchItems.push({
			category: "Hosting",
			faIcon: "fa-server",
			name: "ServerPackBobnardFree",
			points: 1,
			unlockType: "RackDevices",
			unlocks: [
				"WebserverBobnardFree",
				"CacheserverBobnardFree",
				"DatabaseserverBobnardFree",
			]
	});

}
