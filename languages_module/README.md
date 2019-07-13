This mod is used by mod developers to handle languages in their mods.

[b][u]For developers :[/u][/b] check [url=https://gist.github.com/Nits77/6b824fd70c09ad7618d22fc2fbcd5f87]Documentation[/url] to use it in your mods.

Feel free to translate this mod to another language (or improve translation) on [url=https://app.localizor.io/game/4/translations]Localizor[/url].

Translations by :
- Chinese (simplified) : [url=https://steamcommunity.com/profiles/76561198226833692]Degh_Cilon_[/url], [url=https://steamcommunity.com/id/biovoodoo]Osmazome[/url],
- Danish : [url=https://steamcommunity.com/id/magn0053]Magn0053[/url],
- English : [url=https://steamcommunity.com/id/Nitrous77/]NiTroUs*[/url],
- French : [url=https://steamcommunity.com/id/Nitrous77/]NiTroUs*[/url],
- German : [url=https://steamcommunity.com/profiles/76561198254829171]Tom_Builder[/url], [url=https://steamcommunity.com/id/Zagrthos]Zagrthos[/url], [url=https://discord.gg/hovgaardgames]Luca Feger[/url],
- Italian : [url=https://steamcommunity.com/id/NiceDeveloper]NiceDeveloper(mariomarietto)[/url],
- Korean : [url=https://steamcommunity.com/profiles/76561198863315201]quddls1227[/url],
- Norwegian : [url=https://steamcommunity.com/id/ViRuSSZZ]ViRuSZ[/url],
- Portuguese (Brazilian) : [url=https://steamcommunity.com/id/omeghacrazy]-=ZK=-0M3GH4 CR4ZY[/url],
- Russian : [url=https://steamcommunity.com/id/dimon_7147]dimon_7147[/url],
- Spanish : [url=https://steamcommunity.com/id/felieppe]felieppe[/url], [url=https://steamcommunity.com/profiles/76561198081503746]djsparrow[/url],
- Swedish : [url=https://steamcommunity.com/id/wqube]Dylsexia[/url],
- Turkish : [url=https://steamcommunity.com/profiles/76561198005943956]Mihawk[/url], whatismyname


Thanks to :
- [url=https://steamcommunity.com/id/jhovgaard]jhovgaard[/url] for his amazing game (and future releases),
- [url=https://www.freepik.com]Freepik[/url] for the icon (licensed by [url=https://file000.flaticon.com/downloads/license/license.pdf]Flaticon Basic License[/url]),
- All translators (check credits above)

If any problems : @Azul#8005 at [url=https://discord.gg/hovgaardgames]discord.gg/hovgaardgames[/url]

-----------

# Languages Module
I created this module to make language support easier for mods for [Startup Company](https://store.steampowered.com/app/606800/Startup_Company/).

**You are absolutely free to use it ([License](#license)).** I'm just asking you to credit me for the respect of my work.

You can add it in credits like this (feel free to adapt it as you want) : Languages Module by [NiTroUs*](https://steamcommunity.com/id/Nitrous77/myworkshopfiles/?appid=606800) or Languages Module by [Azul#8005 (Discord)](https://discord.gg/hovgaardgames) or anything else you think is good. :-)


## Contributing
If you find a bug or have difficulties using this mod, please contact me on [Discord (Azul#8005)](https://discord.gg/hovgaardgames).

If you want to suggest improvements, you can also contact me.

## Installation
Add "Languages Module" mod (https://steamcommunity.com/sharedfiles/filedetails/?id=1737281395) in your required items : Your mod page > Owner controls (on the right) > Add / Remove Required Items.

## Usage
The module is handling translations through your "locales" folder. You must put your translation files like this :
```text
test_mod (your mod folder)
  |__locales/
    |__en.json
    |__fr.json
    |__...
```

The following code shows how to import, init and declare languages module in your start.js
```javascript
// Your start.js

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
    // If we don't have a missing lib (such as "Languages Module")
    if (missingLib === false) {
        // Define view name
        let viewName = 'testmod';

        // Provide languages you are supporting in your mod (e.g : English, Spanish, German, ...)
        languagesModule.init(this, [{name: 'English', code: 'en'}, {name: 'French', code: 'fr'}, ...], viewName);

        // Creating a new menu item (for view)
        Modding.setMenuItem({
            name: viewName,
            tooltip: "Test Mod",
            tooltipPosition: 'top',
            faIcon: 'fa-balance-scale',
            badgeCount: 0,
        });

        // Create view
        exports.views = [
            {
                name: viewName,
                viewPath: `${modPath}/views/main.html`,
                controller: ["$scope", function ($scope) {
                        // Add Languages Module to the scope
                        $scope.languagesModule = languagesModule;
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
```

The following code shows how to import language selector
```html
<!-- main.html (your view) -->

<!-- Insert the language selector anywhere you want in your view -->
<ng-include src="languagesModule.getView()"></ng-include>
```

## License
[Creative Commons License BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)