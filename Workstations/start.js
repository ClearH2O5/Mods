let _modPath;

exports.initialize = (modPath) =>{

// Buildings[0].workstations = 12;	
Buildings[0].floors = 1;
// Buildings[1].workstations = 25;	
Buildings[1].floors = 2;
// Buildings[2].workstations = 65;	
Buildings[2].floors = 3;
// Buildings[3].workstations = 600;	
Buildings[3].floors = 7;
// Buildings[7].workstations = 1000;
Buildings[4].floors = 4;
Buildings[5].floors = 3;
Buildings[6].floors = 3;


exports.onLoadGame = settings => { };
exports.onNewHour = settings => { };
exports.onNewDay = settings => { };
exports.onUnsubscribe = done => {

    const re = /^sg_.*json$/;

    stats('unsubscribe');

    delete rs.options.Floor;
    rs.saveOptions();
    debug('Deleted \'$rootscope.options.Floor\'.');

    Remote.app.getAllFiles(files => {

        const savegames = files.filter(file => re.test(file));

        savegames.forEach((file, index) => Helpers.LoadSettings(file, settings => {
            assignToAllInArray(settings.competitorProducts, originalCompetitorProducts);
            Remote.app.saveFile(file, JSON.stringify(settings));
            debug(`Restored \'$rootscope.settings.competitorProducts\' for savegame ${file}.`);

            if (index === savegames.length - 1) {
                debug('Uninstall successful!')
                done();
            }

        }));
    });
}

};
exports.onNewHour = settings => {};
exports.onNewDay = settings => {};


