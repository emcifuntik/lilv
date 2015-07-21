/**
 * @overview Life Is Life RolePlay Gamemode
 * @author Eugene "Funtik" Pogrebnyak, Ivan "Lalka" Baturin
 * @copyright (c) LiL Team
 */
"use strict";
let commands = module.exports = new Map();

let broadcast = (command, player, args) => {
    if(gm.users[player.client.networkId].admin == 0) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }
    if(args.length == 0) {
        player.SendChatMessage("USAGE: /" + command + " [message]", Colors.Notice);
        return 1;
    }
    gm.utility.broadcastMessage("Admin " + player.name + ": " + args.join(" "), Colors.Broadcast);
    return 1;
};
commands.set("broadcast", broadcast);
commands.set("bc", broadcast);

let setCloth = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }
    if (args.length < 5 || isNaNEx(args[1]) || isNaNEx(args[2]) || isNaNEx(args[3]) || isNaNEx(args[4])) {
        player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [component id] [draw id] [texture id] [palette id]", Colors.Norice);
        return 1;
    }
    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    //FUTURE: target.SetComponentVariation(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]), parseInt(args[4]));
    player.SendChatMessage(target.name + "\'s clothes changed", Colors.Admin);
    target.SendChatMessage(player.name + " changed your clothes", Colors.Admin);
    return 1;
};
commands.set("s_cloth", setCloth);
commands.set("setcloth", setCloth);

let setWeapon = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 2) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [id or name] ([ammo])", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
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
        return player.SendChatMessage("Undefined weapon", Colors.Error);
    }

    //FUTURE: target.AddWeapon(weapon.h, ammo, true);
    target.SendChatMessage("Administrator " + player.name + " gave you weapon " + weapon.n + " with " + ammo + " ammo.", Colors.Admin);
    player.SendChatMessage("You gave " + target.name + " weapon " + weapon.n + " with " + ammo + " ammo.", Colors.Admin);
};
commands.set('s_weapon', setWeapon);
commands.set('setweapon', setWeapon);

let setHealth = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 2 || isNaNEx(args[1])) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [health]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    let health = parseFloat(args[1]);
    if(health < 0.0 || health > 100.0) {
        player.SendChatMessage("Health value must be in range 0-100", Colors.Warning);
        return 1;
    }

    target.health = health;
    target.SendChatMessage("Administrator " + player.name + " set your health to " + health, Colors.Admin);
    player.SendChatMessage("You set " + target.name + " health to " + health, Colors.Admin);
};
commands.set('s_health', setHealth);
commands.set('sethealth', setHealth);

let setArmor = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 2 || isNaNEx(args[1])) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [armor]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    let armor = parseFloat(args[1]);
    if(armor < 0.0 || armor > 100.0) {
        player.SendChatMessage("Armor value must be in range 0-100", Colors.Warning);
        return 1;
    }

    target.armor = armor;
    target.SendChatMessage("Administrator " + player.name + " set your armor to " + armor, Colors.Admin);
    player.SendChatMessage("You set " + target.name + " armor to " + armor, Colors.Admin);
};
commands.set('s_armor', setArmor);
commands.set('setarmor', setArmor);

let giveMoney = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 5) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 2 || isNaNEx(args[1])) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [money]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    let money = parseInt(args[1]);

    gm.users[target.client.networkId].giveMoney(money);
    target.SendChatMessage("Administrator " + player.name + " gave you $" + money, Colors.Admin);
    player.SendChatMessage("You gave " + target.name + " $" + money, Colors.Admin);
};
commands.set('givemoney', giveMoney);

let goto = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length === 0) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    player.position = target.position;
    player.SendChatMessage("You was teleported to " + target.name, Colors.Admin);
    return 1;
};
commands.set("goto", goto);

let kick = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 1) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length === 0) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [reason]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    args.splice(0, 1);
    gm.utility.broadcastMessage("Player " + target.name + " was kicked from the server by " + player.name + ". Reason: " + args.join(" "), Colors.Broadcast);
    target.Kick("You were kicked from the Server by " + player.name);
};
commands.set("kick", kick);

let ban = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 3 || isNaNEx(args[1])) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [days] [reason]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    let days = parseInt(args[1]);

    args.splice(0, 2);
    gm.utility.broadcastMessage("Player " + target.name + " was banned on the server by " + player.name + " for " + days + " days. Reason: " + args.join(" "), Colors.Broadcast);
    gm.users[target.client.networkId].banned = Date.now() + (days * 24 * 60 * 60 * 1000);
    gm.users[target.client.networkId].admin = 0;
    target.Kick("You were banned on the Server by " + player.name);
};
commands.set("ban", ban);

let unban = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 5) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 1) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name]", Colors.Notice);
    }

    let name = args[0];

    gm.connection.query('SELECT user_banned FROM `users` WHERE `user_name`=? LIMIT 1', [
		name
	], (error, rows, fields) => {
        if(rows.length == 0) {
            player.SendChatMessage("User account does not exist", Colors.Warning);
            return true;
        }
        else {
            if(rows[0].user_banned == 0) {
                player.SendChatMessage("User is not banned", Colors.Warning);
                return true;
            }
            else {
                gm.connection.query('UPDATE `users` SET `user_banned`=0 WHERE `user_name`=? LIMIT 1', [
            		name
            	], (error, result, fields) => {
                    if(result.affectedRows != 0) {
                        gm.utility.broadcastMessage("Player " + name + " was unbanned on the server by " + player.name, Colors.Broadcast);
                        return true;
                    }
                    else {
                        player.SendChatMessage("Unknown error", Colors.Error);
                        return true;
                    }
                });
            }
        }
    });
};
commands.set("unban", unban);

let mute = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 1) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 3 || isNaNEx(args[1])) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [minutes] [reason]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    let minutes = parseInt(args[1]);

    args.splice(0, 2);
    gm.utility.broadcastMessage("Player " + target.name + " was muted on the server by " + player.name + " for " + minutes + " minutes. Reason: " + args.join(" "), Colors.Broadcast);
    gm.users[target.client.networkId].muted = Date.now() + (minutes * 60 * 1000);
    return true;
};
commands.set("mute", mute);

let unmute = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 1) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 1) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    if(gm.users[target.client.networkId].muted == 0) {
        player.SendChatMessage("Player is not muted", Colors.Warning);
        return 1;
    }

    gm.utility.broadcastMessage("Player " + target.name + " was unmuted on the server by " + player.name, Colors.Broadcast);
    gm.users[target.client.networkId].muted = 0;
    return true;
};
commands.set("unmute", unmute);

let playAnim = (command, player, args) => {
    if (args.length < 2) {
        return player.SendChatMessage("USAGE: /" + command + " [dict] [anim]", Colors.Notice);
    }
    player.PlayAnim(args[0], args[1]);
};
commands.set("p_anim", playAnim);
commands.set("playanim", playAnim);

let setRain = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 1 || isNaNEx(args[0])) {
        return player.SendChatMessage("USAGE: /" + command + " [value]", Colors.Notice);
    }

    let v = parseFloat(args[0]);
    if (v < 0.0 || v > 2.5) {
        v = 0.0;
    }
    gm.config.rainLevel = v;
    gm.utility.broadcastMessage("Administrator " + player.name + " changed the rain level to " + v, Colors.Admin);
    for (let p of g_players) {
        p.world.rainLevel = v;
    }
};
commands.set("s_rain", setRain);
commands.set("setrain", setRain);

let setModel = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 2) {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [Model id|hash]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    let model;
    if (isNaNEx(args[1]) && !(typeof args[1] === "string" && args[1].indexOf('0x') === 0)) {
        model = gm.utility.hashes.findByName(gm.utility.hashes.peds, args[1]);
        if (typeof model === "undefined") {
            return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [Model id|hash]", Colors.Notice);
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
            return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [Model id|hash]", Colors.Notice);
        }

        if (model < 0 || model >= gm.utility.hashes.peds.length) {
            model = 0;
        }
        model = gm.utility.hashes.peds[model];
    }

    target.model = model.h;
    target.SendChatMessage("Administrator " + player.name + " changed your Model to " + model.n + ", hash: 0x" + model.h.toString(16), Colors.Admin);
    player.SendChatMessage("You changed " + target.name + "\'s Model to " + model.n + ", hash: 0x" + model.h.toString(16), Colors.Admin);
};
commands.set('s_model', setModel);
commands.set('setmodel', setModel);

let setSnow = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 1 || isNaNEx(args[0])) {
        return player.SendChatMessage("USAGE: /" + command + " [value]", Colors.Notice);
    }

    let v = parseFloat(args[0]);
    if (v < 0.0 || v > 2.5) {
        v = 0.0;
    }
    gm.config.snowLevel = v;
    gm.utility.broadcastMessage("Administrator " + player.name + " changed the snow level to " + v, Colors.Admin);
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
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 1 || isNaNEx(args[0])) {
        return player.SendChatMessage("USAGE: /" + command + " [id]", Colors.Notice);
    }

    let v = parseInt(args[0]);
    if (v < 1 || v > 12) {
        v = 1;
    }
    gm.config.weather = v;
    gm.utility.broadcastMessage("Administrator " + player.name + " changed the weather to " + v, Colors.Admin);
    for (let p of g_players) {
        p.world.weatherPersistNow = v;
    }
};
commands.set("s_weather", setWeather);
commands.set("setweather", setWeather);

let setWind = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if (args.length < 1 || isNaNEx(args[0])) {
        return player.SendChatMessage("USAGE: /" + command + " [value]", Colors.Notice);
    }

    let v = parseFloat(args[0]);
    if (v < 0.0 || v > 2.5) {
        v = 0.0;
    }
    gm.config.windLevel = v;
    gm.utility.broadcastMessage("Administrator " + player.name + " changed the wind level to " + v, Colors.Admin);
    for (let p of g_players) {
        p.world.windLevel = v;
    }
};
commands.set("s_wind", setWind);
commands.set("setwind", setWind);

let makeAdmin = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 5) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }
    if(args.length < 2 || isNaNEx(args[1]))
    {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [level]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    let level = parseInt(args[1]);

    gm.users[target.client.networkId].admin = level;

    target.SendChatMessage("Your admin level changed to " + level.toString() + " by " + player.name, Colors.Admin);
    player.SendChatMessage("You changed " + target.name + "\'s admin level to " + level.toString(), Colors.Admin);
};
commands.set("makeadmin", makeAdmin);

let invite = (command, player, args) => {
    if(gm.users[player.client.networkId].faction == 0 || gm.users[player.client.networkId].rank < 11) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }
    if(args.length < 1)
    {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    if(player.client.networkId == target.client.networkId) {
        player.SendChatMessage("You can\'t invite yourself", Colors.Warning);
        return 1;
    }

    if(gm.users[target.client.networkId].faction != 0) {
        player.SendChatMessage("Player is already in faction", Colors.Warning);
        return 1;
    }

    if(!gm.utility.isPlayerInRangeOfPlayer(player, 3.0, target)) {
        player.SendChatMessage("Player is too far from you", Colors.Warning);
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

    target.SendChatMessage(player.name + " propose you to join " + gm.faction.GetFactionName(gm.users[player.client.networkId].faction) + " faction", Colors.Propose);
    player.SendChatMessage("You proposed " + target.name + " to join your faction", Colors.Propose);
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
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }
    if(args.length < 2 || isNaNEx(args[1]))
    {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [faction id]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    let faction = parseInt(args[1]);
    if(faction > (gm.faction.Count() - 1)) {
        return player.SendChatMessage("Faction number should be 0-"+gm.faction.Names.length, Colors.Warning);
    }

    gm.users[target.client.networkId].faction = faction;
    gm.users[target.client.networkId].rank = 12;
    target.SendChatMessage(player.name + " assigned you a leader of faction " + gm.faction.GetFactionName(faction), Colors.Admin);
    player.SendChatMessage("You assigned " + target.name + " a leader of faction " + gm.faction.GetFactionName(faction), Colors.Admin);
}
commands.set("makeleader", makeLeader);

let setRank = (command, player, args) => {
    if(gm.users[player.client.networkId].faction == 0 || gm.users[player.client.networkId].rank < 11) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }
    if(args.length < 2 || isNaNEx(args[1]))
    {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [rank]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    if(player.client.networkId == target.client.networkId) {
        player.SendChatMessage("You can\'t change your rank", Colors.Warning);
        return 1;
    }

    let rank = parseInt(args[1]);
    if(rank > gm.users[player.client.networkId].rank) {
        return player.SendChatMessage("You can\'t set rank higher then yours", Colors.Error);
    }

    if(gm.users[target.client.networkId].rank == rank) {
        return player.SendChatMessage("Player has the same rank", Colors.Warning);
    }

    let previous = gm.users[target.client.networkId].rank;
    gm.users[target.client.networkId].rank = rank;
    target.SendChatMessage(player.name + " changed your rank to " + rank, (previous < rank) ? Colors.Success : Colors.Fail);
    player.SendChatMessage("You changed " + target.name + " rank to " + rank, (previous < rank) ? Colors.Success : Colors.Fail);
    return true;
}
commands.set("setrank", setRank);

let getWeapon = (command, player, args) => {
    if(gm.users[player.client.networkId].faction == 0) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }
    if(!gm.isPlayerInRangeOfPoint(player, 10.0, gm.faction.homePositions[gm.users[player.networkId].faction])) {
        player.SendChatMessage("You are not at your faction\'s home", Colors.Error);
        return 1;
    }
    if(gm.users[player.client.networkId].lastGetWeapon > Date.now()) {
        player.SendChatMessage("You can request weapon once in 15 minutes", Colors.Warning);
        return 1;
    }
    let weaponArray = gm.faction.GetWeaponsByRank(gm.users[player.networkId].faction, gm.users[player.networkId].rank);
    for(let item of weaponArray) {
        //FUTURE: target.AddWeapon(item.weapon, item.ammo, true);
    }
    gm.users[player.client.networkId].lastGetWeapon = Date.now() + (15*60*1000);
    player.SendChatMessage("You got your duty weapons", Colors.Success);
    return true;
};
commands.set("getweapon", getWeapon);

let setPosition = (command, player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", Colors.Error);
        return 1;
    }

    if(args.length < 4 || isNaNEx(args[1]) || isNaNEx(args[2]) || isNaNEx(args[3]))
    {
        return player.SendChatMessage("USAGE: /" + command + " [Player name|ID] [x] [y] [z]", Colors.Notice);
    }

    let target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", Colors.Error);
        return 1;
    }

    let newPos = {x:parseFloat(args[1]), y:parseFloat(args[2]), z:parseFloat(args[3])};

    target.position.x = newPos.x;
    target.position.y = newPos.y;
    target.position.z = newPos.z;
    target.SendChatMessage("You was teleported to " + newPos.x + ", " + newPos.y + ", " + newPos.z + " by " + player.name, Colors.Admin);
    target.SendChatMessage("You teleported player " + target.name + " to " + newPos.x + ", " + newPos.y + ", " + newPos.z, Colors.Admin);
};
commands.set("setposition", setPosition);
commands.set("setpos", setPosition);
