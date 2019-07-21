let _modPath;

exports.initialize = (modPath) =>{
	_modPath = modPath;

	RackDeviceNames.WebbyClearwater = 'Web by Clearwater';
	RackDeviceNames.CachebyClearwater = 'Cache by Clearwater';
	RackDeviceNames.DatabyClearwater = 'Data by Clearwater';

	RackDevices.WebbyClearwater = {
		"name":	"Web by Clearwater",
		"units": 4,
		"price": 1,
		"clockRate": 100,
		"power": 1000,
		"producedHeat": 10,
		"webserverThroughput": 1000000,
		"url":"images/racks/WebserverX.png",
		"requirements": {
			"Firewall": 1,
			"VirtualHardware": 1,
			"OperatingSystem": 1
		}
	};

	RackDevices.CachebyClearwater = {
		"name": "Cache by Clearwater",
		"units": 4,
		"price": 1,
		"clockRate":100,
		"power":1000,
		"producedHeat" :10,
		"cacheThroughput":1000000,
		"url":"images/racks/CacheserverX.png",
		"requirements": {
			"Firewall":1,
			"VirtualHardware":1,
			"OperatingSystem":1
		}
	};

	RackDevices.DatabyClearwater = {
		"name": "Data by Clearwater",
		"units": 4,
		"price": 1,
		"clockRate": 100,
		"power": 1000,
		"producedHeat": 10,
		"databaseThroughput": 1000000,
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
			name: "Servers by Clearwater",
			points: 1,
			unlockType: "RackDevices",
			unlocks: [
				"Web by Clearwater",
				"Cache by Clearwater",
				"Data by Clearwater",
			]
	});

};

exports.onLoadGame = settings => {
	Language['Clearwater Frameworks'] = 'Clearwater Framework';
	Language['Web by Clearwater'] = 'Clearwater Inc. Webserver';
	Language['Cache by Clearwater'] = 'Clearwater Inc. Cache Runners';
	Language['Data by Clearwater'] = 'Clearwater Inc. DataStorage';
	Language['Clearwater Inc. ServerPack'] = 'Clearwater Inc. ServerPack';
	Language['Clearwater Inc. ServerPack_description'] = 'Clearwater Inc. enjoyed Bobnards work so much we wanted to improve it ;)';

}

exports.onBackgroundWorkerStart = () => {
	RackDeviceNames.WebbyClearwater = 'Web by Clearwater';
	RackDeviceNames.CachebyClearwater = 'Cache by Clearwater';
	RackDeviceNames.DatabyClearwater = 'Data by Clearwater';

	RackDevices.WebbyClearwater = {
		"name":	"Web by Clearwater",
		"units": 4,
		"price": 1,
		"clockRate": 100,
		"power": 1000,
		"producedHeat": 10,
		"webserverThroughput": 1000000,
		"url":"images/racks/WebserverX.png",
		"requirements": {
			"Firewall": 1,
			"VirtualHardware": 1,
			"OperatingSystem": 1
		}
	};

	RackDevices.CachebyClearwater = {
		"name": "Cache by Clearwater",
		"units": 4,
		"price": 1,
		"clockRate":100,
		"power":1000,
		"producedHeat":10,
		"cacheThroughput":1000000,
		"url":"images/racks/CacheserverX.png",
		"requirements": {
			"Firewall":1,
			"VirtualHardware":1,
			"OperatingSystem":1
		}
	};

	RackDevices.DatabyClearwater = {
		"name": "Data by Clearwater",
		"units": 4,
		"price": 1,
		"clockRate": 100,
		"power": 1000,
		"producedHeat": 10,
		"databaseThroughput": 1000000,
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
			name: "Clearwater Inc. Serverpack",
			points: 1,
			unlockType: "RackDevices",
			unlocks: [
				"Web by Clearwater",
				"Cache by Clearwater",
				"Data by Clearwater",
			]
	});

}
