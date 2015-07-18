"use strict";
let Faction = module.exports;

let fName =  {
    0:"None",
    1:"Health",
    2:"FireMan",
    3:"Ministry",
    4:"Police",
    5:"Hitman Agency",
    6:"Education"
};

let fDescription = {
    0:"None",
    1:"/heal",
    2:"/fire",
    3:"",
    4:"/cuff",
    5:"/portable",
    6:"/license"
};

Faction.GetFactionName = (fId) => {
    return fName[fId];
};

Faction.GetFactionDescription = (fId) => {
    return fDescription[fId];
};
