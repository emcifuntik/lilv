/**
 * @overview Life Is Life RolePlay Gamemode
 * @author Eugene "Funtik" Pogrebnyak, Ivan "Lalka" Baturin
 * @copyright (c) LiL Team
 */
"use strict";
let commands = module.exports = new Map();

let broadcast = (command, player, args) => {
    if(gm.users[player.client.networkId].admin == 0) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }
    if(args.length == 0) {
        player.SendChatMessage("USAGE: /" + command + " [message]", new RGB(125, 125, 125));
        return 1;
    }
    gm.utility.broadcastMessage("Admin " + player.name + ": " + args.join(" "), new RGB(125, 0, 0));
    return 1;
};
commands.set("broadcast", broadcast);
commands.set("bc", broadcast);

let setCloth = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }
    if (args.length < 5 || isNaN(args[1]) || isNaN(args[2]) || isNaN(args[3]) || isNaN(args[4])) {
        player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [component id] [draw id] [texture id] [palette id]", new RGB(125, 125, 125));
        return 1;
    }
    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", new RGB(125, 125, 125));
        return 1;
    }

    //FUTURE: target.SetComponentVariation(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]), parseInt(args[4]));
    player.SendChatMessage(target.name + "\'s clothes changed", new RGB(125, 0, 0));
    target.SendChatMessage(player.name + " changed your clothes", new RGB(125, 0, 0));
    return 1;
};
commands.set("s_cloth", setCloth);
commands.set("setcloth", setCloth);

let setWeapon = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }

    if (args.length < 2) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [id or name] ([ammo])", new RGB(125, 125, 125));
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", new RGB(125, 125, 125));
        return 1;
    }

    let weapon;
    let ammo = parseInt(args[2]);
    if (isNaN(ammo)) {
        ammo = 300;
    }

    let num = parseInt(args[1]);
    if (isNaN(num)) {
        weapon = gm.utility.hashes.findByName(gm.utility.hashes.weapons, args[1]);
    }
    else {
        if (num < 0 || num >= gm.utility.hashes.weapons.length) {
            num = 0;
        }
        weapon = gm.utility.hashes.weapons[num];
    }

    if (typeof weapon === "undefined") {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [id or name] ([ammo])", new RGB(125, 125, 125));
    }

    //FUTURE: target.AddWeapon(weapon.h, ammo, true);
    target.SendChatMessage("Administrator " + player.name + " gave you weapon " + weapon.n + " with " + ammo + " ammo.", new RGB(125, 0, 0));
    player.SendChatMessage("You gave " + target.name + " weapon " + weapon.n + " with " + ammo + " ammo.", new RGB(125, 0, 0));
};
commands.set('s_weapon', setWeapon);
commands.set('setweapon', setWeapon);

let goto = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }

    if (args.length === 0) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID]", new RGB(125, 125, 125));
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", new RGB(125, 125, 125));
        return 1;
    }

    player.position = target.position;
    player.SendChatMessage("You was teleported to " + target.name, new RGB(125, 0, 0));
    return 1;
};
commands.set("goto", goto);

let kick = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 1) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }

    if (args.length === 0) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [reason]", RGB(125,125,125));
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", new RGB(125, 125, 125));
        return 1;
    }

    args.splice(0, 1);
    gm.utility.broadcastMessage("Player " + target.name + " was kicked from the server by " + player.name + ". Reason: " + args.join(" "));
    target.Kick("You were kicked from the Server by " + player.name);
};
commands.set("kick", kick);

let playAnim = (command, player, args) => {
    if (args.length < 2) {
        return player.SendChatMessage("USAGE: /" + command + " [dict] [anim]", RGB(125,125,125));
    }
    player.PlayAnim(args[0], args[1]);
};
commands.set("p_anim", playAnim);
commands.set("playanim", playAnim);

let setRain = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }

    if (args.length < 1 || isNaN(args[0])) {
        return player.SendChatMessage("USAGE: /" + command + " [value]", RGB(125,125,125));
    }

    let v = parseFloat(args[0]);
    if (v < 0.0 || v > 2.5) {
        v = 0.0;
    }
    gm.config.rainLevel = v;
    gm.utility.broadcastMessage("Administrator " + player.name + " changed the rain level to " + v, RGB(125,0,0));
    for (let p of g_players) {
        p.world.rainLevel = v;
    }
};
commands.set("s_rain", setRain);
commands.set("setrain", setRain);

let setModel = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }

    if (args.length < 2) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [Model id|hash]", RGB(125,125,125));
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", new RGB(125, 125, 125));
        return 1;
    }

    let model;
    if (isNaN(args[1]) && !(typeof args[1] === "string" && args[1].indexOf('0x') === 0)) {
        model = gm.utility.hashes.findByName(gm.utility.hashes.peds, args[1]);
        if (typeof model === "undefined") {
            return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [Model id|hash]", RGB(125,125,125));
        }
        model = model;
    }
    else {
        if ((typeof args[1] === "string" && args[1].indexOf('0x') === 0)) {
            model = parseInt(args[1], 16);
        }
        else {
            model = parseInt(args[1]);
        }

        if (isNaN(model)) {
            return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [Model id|hash]", RGB(125,125,125));
        }

        if (model < 0 || model >= gm.utility.hashes.peds.length) {
            model = 0;
        }
        model = gm.utility.hashes.peds[model];
    }

    target.model = model.h;
    target.SendChatMessage("Administrator " + player.name + " changed your Model to " + model.n + ", hash: 0x" + model.h.toString(16), RGB(125,0,0));
    player.SendChatMessage("You changed " + target.name + "\'s Model to " + model.n + ", hash: 0x" + model.h.toString(16), RGB(125,0,0));
};
commands.set('s_model', setModel);
commands.set('setmodel', setModel);

let setSnow = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }

    if (args.length < 1 || isNaN(args[0])) {
        return player.SendChatMessage("USAGE: /" + command + " [value]", new RGB(125, 125, 125));
    }

    let v = parseFloat(args[0]);
    if (v < 0.0 || v > 2.5) {
        v = 0.0;
    }
    gm.config.snowLevel = v;
    gm.utility.broadcastMessage("Administrator " + player.name + " changed the snow level to " + v, new RGB(125, 0, 0));
    for (let p of g_players) {
        p.world.snowLevel = v;
    }
};
commands.set("s_snow", setSnow);
commands.set("setsnow", setSnow);

commands.set("stopanim", player => {
  player.StopAnim();
});

let setWeather = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }

    if (args.length < 1 || isNaN(args[0])) {
        return player.SendChatMessage("USAGE: /" + command + " [id]", new RGB(125, 125, 125));
    }

    let v = parseInt(args[0]);
    if (v < 1 || v > 12) {
        v = 1;
    }
    gm.config.weather = v;
    gm.utility.broadcastMessage("Administrator " + player.name + " changed the weather to " + v, new RGB(125, 0, 0));
    for (let p of g_players) {
        p.world.weatherPersistNow = v;
    }
};
commands.set("s_weather", setWeather);
commands.set("setweather", setWeather);

let setWind = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }

    if (args.length < 1 || isNaN(args[0])) {
        return player.SendChatMessage("USAGE: /" + command + " [value]", new RGB(125, 125, 125));
    }

    let v = parseFloat(args[0]);
    if (v < 0.0 || v > 2.5) {
        v = 0.0;
    }
    gm.config.windLevel = v;
    gm.utility.broadcastMessage("Administrator " + player.name + " changed the wind level to " + v, new RGB(125, 0, 0));
    for (let p of g_players) {
        p.world.windLevel = v;
    }
};
commands.set("s_wind", setWind);
commands.set("setwind", setWind);

let makeAdmin = (command,player,args) =>{
    if(gm.users[player.client.networkId].admin < 5) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }
    if(args.length < 2 || isNaN(args[1]))
    {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [level]", new RGB(125,125,125));
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", new RGB(125, 125, 125));
        return 1;
    }

    let level = parseInt(args[1]);

    gm.users[target.client.networkId].admin = level;

    target.SendChatMessage("Your admin level changed to " + level.toString() + " by " + player.name, new RGB(125, 0, 0));
    player.SendChatMessage("You changed " + target.name + "\'s admin level to " + level.toString(), new RGB(125, 0, 0));
};
commands.set("makeadmin", makeAdmin);
