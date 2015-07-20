/**
 * @overview Life Is Life RolePlay Gamemode
 * @author Eugene "Funtik" Pogrebnyak, Ivan "Lalka" Baturin
 * @copyright (c) LiL Team
 */
"use strict";
let commands = module.exports = new Map();

let broadcast = (command, player, args) => {
    if(gm.users[player.client.networkId].admin == 0) {
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }
    if(args.length == 0) {
        player.SendChatMessage("USAGE: /" + command + " [message]", Colors.Silver);
        return 1;
    }
    gm.utility.broadcastMessage("Admin " + player.name + ": " + args.join(" "), new RGB(125, 0, 0));
    return 1;
};
commands.set("broadcast", broadcast);
commands.set("bc", broadcast);

let setCloth = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }
    if (args.length < 5 || isNaNEx(args[1]) || isNaNEx(args[2]) || isNaNEx(args[3]) || isNaNEx(args[4])) {
        player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [component id] [draw id] [texture id] [palette id]", Colors.Silver);
        return 1;
    }
    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Silver);
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
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }

    if (args.length < 2) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [id or name] ([ammo])", Colors.Silver);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Silver);
        return 1;
    }

    let weapon;
    let ammo = parseInt(args[2]);
    if (isNaNEx(ammo)) {
        ammo = 300;
    }

    let num = parseInt(args[1]);
    if (isNaNEx(num)) {
        weapon = gm.utility.hashes.findByName(gm.utility.hashes.weapons, args[1]);
    }
    else {
        if (num < 0 || num >= gm.utility.hashes.weapons.length) {
            num = 0;
        }
        weapon = gm.utility.hashes.weapons[num];
    }

    if (typeof weapon === "undefined") {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [id or name] ([ammo])", Colors.Silver);
    }

    //FUTURE: target.AddWeapon(weapon.h, ammo, true);
    target.SendChatMessage("Administrator " + player.name + " gave you weapon " + weapon.n + " with " + ammo + " ammo.", new RGB(125, 0, 0));
    player.SendChatMessage("You gave " + target.name + " weapon " + weapon.n + " with " + ammo + " ammo.", new RGB(125, 0, 0));
};
commands.set('s_weapon', setWeapon);
commands.set('setweapon', setWeapon);

let goto = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }

    if (args.length === 0) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID]", Colors.Silver);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Silver);
        return 1;
    }

    player.position = target.position;
    player.SendChatMessage("You was teleported to " + target.name, new RGB(125, 0, 0));
    return 1;
};
commands.set("goto", goto);

let kick = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 1) {
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }

    if (args.length === 0) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [reason]", RGB(125,125,125));
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Silver);
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
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }

    if (args.length < 1 || isNaNEx(args[0])) {
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
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }

    if (args.length < 2) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [Model id|hash]", RGB(125,125,125));
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Silver);
        return 1;
    }

    let model;
    if (isNaNEx(args[1]) && !(typeof args[1] === "string" && args[1].indexOf('0x') === 0)) {
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

        if (isNaNEx(model)) {
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
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }

    if (args.length < 1 || isNaNEx(args[0])) {
        return player.SendChatMessage("USAGE: /" + command + " [value]", Colors.Silver);
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
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }

    if (args.length < 1 || isNaNEx(args[0])) {
        return player.SendChatMessage("USAGE: /" + command + " [id]", Colors.Silver);
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
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }

    if (args.length < 1 || isNaNEx(args[0])) {
        return player.SendChatMessage("USAGE: /" + command + " [value]", Colors.Silver);
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

let makeAdmin = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 5) {
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }
    if(args.length < 2 || isNaNEx(args[1]))
    {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [level]", Colors.Silver);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Silver);
        return 1;
    }

    let level = parseInt(args[1]);

    gm.users[target.client.networkId].admin = level;

    target.SendChatMessage("Your admin level changed to " + level.toString() + " by " + player.name, new RGB(125, 0, 0));
    player.SendChatMessage("You changed " + target.name + "\'s admin level to " + level.toString(), new RGB(125, 0, 0));
};
commands.set("makeadmin", makeAdmin);

let invite = (command, player, args) => {
    if(gm.users[player.client.networkId].faction == 0 || gm.users[player.client.networkId].rank < 11) {
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }
    if(args.length < 1)
    {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID]", Colors.Silver);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Silver);
        return 1;
    }

    if(player.client.networkId == target.client.networkId) {
        player.SendChatMessage("You can\'t invite yourself", Colors.Silver);
        return 1;
    }

    if(gm.users[target.client.networkId].faction != 0) {
        player.SendChatMessage("Player is already in faction", Colors.Silver);
        return 1;
    }

    if(!gm.utility.isPlayerInRangeOfPlayer(player, 3.0, target)) {
        player.SendChatMessage("Player is too far from you", Colors.Silver);
        return 1;
    }

    gm.users[target.client.networkId].conversation = {
        type: 1,//Faction invite
        expires: Date.now() + 30000,
        issuer: player,
        info : {
            faction: gm.users[player.client.networkId].faction
        }
    }

    target.SendChatMessage(player.name + " propose you to join " + gm.faction.GetFactionName(gm.users[player.client.networkId].faction) + " faction", Colors.Mint);
    player.SendChatMessage("You proposed " + target.name + " to join your faction", Colors.Mint);
};
commands.set("invite", invite);

let accept = (command, player, args) => {
    gm.users[player.client.networkId].answerPropose(true);
};
commands.set("accept", accept);
commands.set("+", accept);

let decline = (command, player, args) => {
    gm.users[player.client.networkId].answerPropose(false);
};
commands.set("decline", decline);
commands.set("-", decline);

let test = (command, player, args) => {
    gm.users[player.client.networkId].faction = parseInt(args[0]);
    gm.users[player.client.networkId].rank = parseInt(args[1]);
};
commands.set("test", test);

let makeLeader = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }
    if(args.length < 2 || isNaNEx(args[1]))
    {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [faction id]", Colors.Silver);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Silver);
        return 1;
    }

    let faction = parseInt(args[1]);
    if(faction > (gm.faction.Count() - 1)) {
        return player.SendChatMessage("Faction number should be 0-"+gm.faction.Names.length, Colors.Silver);
    }

    gm.users[target.client.networkId].faction = faction;
    gm.users[target.client.networkId].rank = 12;
    target.SendChatMessage(player.name + " assigned you a leader of faction " + gm.faction.GetFactionName(faction), Colors.Rufous);
    player.SendChatMessage("You assigned " + target.name + " a leader of faction " + gm.faction.GetFactionName(faction), Colors.Rufous);
}
commands.set("makeleader", makeLeader);

let setRank = (command, player, args) => {
    if(gm.users[player.client.networkId].faction == 0 || gm.users[player.client.networkId].rank < 11) {
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }
    if(args.length < 2 || isNaNEx(args[1]))
    {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [rank]", Colors.Silver);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Silver);
        return 1;
    }

    if(player.client.networkId == target.client.networkId) {
        player.SendChatMessage("You can\'t change your rank", Colors.Silver);
        return 1;
    }

    let rank = parseInt(args[1]);
    if(rank > gm.users[player.client.networkId].rank) {
        return player.SendChatMessage("You can\'t set rank higher then yours", Colors.Silver);
    }

    gm.users[target.client.networkId].rank = rank;
    target.SendChatMessage(player.name + " changed your rank to " + rank, Colors.Rufous);
    player.SendChatMessage("You changed " + target.name + " rank to " + rank, Colors.Rufous);
}
commands.set("setrank", setRank);

let getWeapon = (command, player, args) => {
    if(gm.users[player.client.networkId].faction == 0) {
        player.SendChatMessage("Insufficient permissions", Colors.Silver);
        return 1;
    }
    if(!gm.isPlayerInRangeOfPoint(player, 10.0, gm.faction.homePositions[gm.users[player.networkId].faction])) {
        player.SendChatMessage("You are not at your faction\'s home", Colors.Silver);
        return 1;
    }
    let weaponArray = gm.faction.GetWeaponsByRank(gm.users[player.networkId].faction, gm.users[player.networkId].rank);
    for(let item of weaponArray) {
        //FUTURE: target.AddWeapon(item.weapon, item.ammo, true);
    }
    player.SendChatMessage("You got your duty weapons", Colors.Pear);
    return true;
};
commands.set("getweapon", getWeapon);
