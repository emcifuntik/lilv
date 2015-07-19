"use strict";
let Faction = module.exports;

let Names =  [
    "None",
    "Health",
    "FireMan",
    "Ministry",
    "Police",
    "Hitman Agency",
    "Education"
];

let Commands = [
    "None",
    "/heal",
    "/fire",
    "",
    "/cuff",
    "/portable",
    "/license"
];

Faction.GetFactionName = id => {
    return Names[id];
};

Faction.GetFactionCommands = id => {
    return Commands[id];
};
