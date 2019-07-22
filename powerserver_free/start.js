let _modPath;

exports.initialize = (modPath) =>{
	_modPath = modPath;

	RackDeviceNames.WebbyClearwater = 'webbyclearwater';
	RackDeviceNames.CachebyClearwater = 'cachebyclearwater';
	RackDeviceNames.DatabyClearwater = 'databyclearwater';

	RackDevices.WebbyClearwater = {
		"name":	"WebbyClearwater",
		"units": 4,
		"price": 1,
		"clockRate": 100,
		"power": 1000,
		"producedHeat": 10,
		"webserverThroughput": 1000000,
		// "url":"images/racks/WebserverX.png",
		"requirements": {
			"Firewall": 1,
			"VirtualHardware": 1,
			"OperatingSystem": 1
		}
	};

	RackDevices.CachebyClearwater = {
		"name": "CachebyClearwater",
		"units": 4,
		"price": 1,
		"clockRate":100,
		"power":1000,
		"producedHeat" :10,
		"cacheThroughput":1000000,
		// "url":"images/racks/CacheserverX.png",
		"requirements": {
			"Firewall":1,
			"VirtualHardware":1,
			"OperatingSystem":1
		}
	};

	RackDevices.DatabyClearwater = {
		"name": "DatabyClearwater",
		"units": 4,
		"price": 1,
		"clockRate": 100,
		"power": 1000,
		"producedHeat": 10,
		"databaseThroughput": 1000000,
		// "url":"images/racks/DatabaseserverX.png",
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
			name: "ClearwaterIncServerPack",
			points: 1,
			unlockType: "RackDevices",
			unlocks: [
				"WebbyClearwater",
				"CachebyClearwater",
				"DatabyClearwater",
			]
	});

};

exports.onLoadGame = settings => {
	// Language['ClearwaterFrameworks'] = 'Clearwater Framework';
	Language['webbyclearwater'] = 'Clearwater Inc Webserver';
	Language['cachebyclearwater'] = 'Clearwater Inc Cache Runners';
	Language['databyclearwater'] = 'Clearwater Inc DataStorage';
	Language['clearwaterincserverpack'] = 'Clearwater Inc ServerPack';
	Language['clearwaterincserverpack_description'] = 'Clearwater Inc enjoyed Bobnards work so much we wanted to improve it';

}

exports.onBackgroundWorkerStart = () => {
	RackDeviceNames.WebbyClearwater = 'webbyclearwater';
	RackDeviceNames.CachebyClearwater = 'cachebyclearwater';
	RackDeviceNames.DatabyClearwater = 'databyclearwater';

	RackDevices.WebbyClearwater = {
		"name":	"WebbyClearwater",
		"units": 4,
		"price": 1,
		"clockRate": 100,
		"power": 1000,
		"producedHeat": 10,
		"webserverThroughput": 1000000,
		// "url":"images/racks/WebserverX.png",
		"requirements": {
			"Firewall": 1,
			"VirtualHardware": 1,
			"OperatingSystem": 1
		}
	};

	RackDevices.CachebyClearwater = {
		"name": "CachebyClearwater",
		"units": 4,
		"price": 1,
		"clockRate":100,
		"power":1000,
		"producedHeat":10,
		"cacheThroughput":1000000,
		// "url":"images/racks/CacheserverX.png",
		"requirements": {
			"Firewall":1,
			"VirtualHardware":1,
			"OperatingSystem":1
		}
	};

	RackDevices.DatabyClearwater = {
		"name": "DatabyClearwater",
		"units": 4,
		"price": 1,
		"clockRate": 100,
		"power": 1000,
		"producedHeat": 10,
		"databaseThroughput": 1000000,
		// "url":"images/racks/DatabaseserverX.png",
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
			name: "ClearwaterIncServerpack",
			points: 1,
			unlockType: "RackDevices",
			unlocks: [
				"WebbyClearwater",
				"CachebyClearwater",
				"DatabyClearwater",
			]
	});

}
