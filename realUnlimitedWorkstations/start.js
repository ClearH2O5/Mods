let _modPath;

exports.initialize = (modPath) => {    
    Buildings.forEach((b) => {
        console.log(b.workstations);
        if(b.workstations != undefined)
        {
            b.workstations = 9999;
            console.log(b.workstations);
        }
    });
};
