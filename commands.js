/**
 * @overview Life Is Life RolePlay Gamemode
 * @author Eugene "Funtik" Pogrebnyak, Ivan "Lalka" Baturin
 * @copyright (c) LiL Team
 */
"use strict";
let commands = module.exports = new Map();

var broadcast = (player, args) => {
    if(gm.users[player.client.networkId].admin == 0) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }
    if(args.length == 0) {
        player.SendChatMessage("USAGE: /broadcast [message]", new RGB(125, 125, 125));
        return 1;
    }
    gm.utility.broadcastMessage("Admin " + player.name + ": " + args.join(" "), new RGB(125, 0, 0));
    return 1;
};
commands.set("broadcast", broadcast);
commands.set("bc", broadcast);

commands.set("setcloth", (player, args) => {
    if(gm.users[player.client.networkId].admin < 3) {
        player.SendChatMessage("Insufficient permissions", new RGB(125, 125, 125));
        return 1;
    }
    if (args.length < 5 || isNaN(args[1]) || isNaN(args[2]) || isNaN(args[3]) || isNaN(args[4])) {
        player.SendChatMessage("USAGE: /setcloth [name|ID] [component id] [draw id] [texture id] [palette id]", new RGB(125, 125, 125));
        return 1;
    }
    var target = gm.utility.getPlayer(args[0]);
    if(target === false) {
        player.SendChatMessage("Player not found", new RGB(125, 125, 125));
        return 1;
    }

    //FUTURE: target.SetComponentVariation(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]), parseInt(args[4]));
    player.SendChatMessage(target.name + "\'s clothes changed", new RGB(125, 0, 0));
    target.SendChatMessage(player.name + " changed your clothes", new RGB(125, 0, 0));
    return 1;
});

commands.set('setweapon', (player, args) => {
    if (args.length < 2) {
        return player.SendChatMessage("USAGE: /setweapon [name|ID] [id or name] ([ammo])", new RGB(125, 125, 125));
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
        return player.SendChatMessage("USAGE: /setweapon [name|ID] [id or name] ([ammo])", new RGB(125, 125, 125));
    }

    //FUTURE: target.AddWeapon(weapon.h, ammo, true);
    target.SendChatMessage("Administrator " + player.name + " gave you weapon " + weapon.n + " with " + ammo + " ammo.", new RGB(125, 0, 0));
    player.SendChatMessage("You gave " + target.name + " weapon " + weapon.n + " with " + ammo + " ammo.", new RGB(125, 0, 0));
});

commands.set("goto", (player, args) => {
  if (args.length === 0) {
  	return player.SendChatMessage("USAGE: /goto [id or name]", new RGB(255, 0, 0));
  }

  let targets = gm.utility.getPlayer(args[0], true);

  if (targets.length === 0) {
  	return player.SendChatMessage("Unknown Target.", new RGB(255, 0, 0));
  }
  else if (targets.length > 1) {
  	let msg = "found multiple targets: ";
  	for (let p of targets) {
  		msg += p.name + ", ";
  	}
  	msg = msg.slice(0, msg.length - 2);
  	return player.SendChatMessage(msg, new RGB(255, 0, 0));
  }

  player.position = targets[0].position;
  player.SendChatMessage("teleported to " + targets[0].name, new RGB(255, 255, 0));
  targets[0].SendChatMessage(player.name + " teleported to you.", new RGB(255, 255, 0));
});

commands.set("kick", (player, args) => {
  if (args.length === 0) {
  	return player.SendChatMessage("USAGE: /kick [id or name]", new RGB(255, 0, 0));
  }

  let targets = gm.utility.getPlayer(args[0], true);

  if (targets.length === 0) {
  	return player.SendChatMessage("Unknown Target.", new RGB(255, 0, 0));
  }
  else if (targets.length > 1) {
  	let msg = "found multiple targets: ";
  	for (let p of targets) {
  		msg += p.name + ", ";
  	}
  	msg = msg.slice(0, msg.length - 2);
  	return player.SendChatMessage(msg, new RGB(255, 0, 0));
  }

  targets[0].Kick("You were kicked from the Server by " + player.name);
});

commands.set("playAnim", (player, args) => {
  if (args.length < 2) {
    return player.SendChatMessage("USAGE: /playAnim [dict] [anim]");
  }

  player.PlayAnim(args[0], args[1]);
});

commands.set("rain", (player, args) => {
  if (args.length < 1 || isNaN(args[0])) {
    return player.SendChatMessage("USAGE: /rain [value]", new RGB(255, 255, 0));
  }
  let v = parseFloat(args[0]);
  if (v < 0.0 || v > 2.5) {
    v = 0.0;
  }
  gm.config.rainLevel = v;
  gm.utility.broadcastMessage(player.name + " changed the rain level to " + v);
  for (let p of g_players) {
    p.world.rainLevel = v;
  }
});

commands.set('setModel', (player, args) => {
  if (args.length < 1) {
    return player.SendChatMessage("USAGE: /setModel [model id or hash]");
  }

  let model;
  if (isNaN(args[0]) && !(typeof args[0] === "string" && args[0].indexOf('0x') === 0)) {
    model = gm.utility.hashes.findByName(gm.utility.hashes.peds, args[0]);
    if (typeof model === "undefined") {
      return player.SendChatMessage("USAGE: /setModel [model id or hash]");
    }
    model = model;
  }
  else {
    if ((typeof args[0] === "string" && args[0].indexOf('0x') === 0)) {
      model = parseInt(args[0], 16);
    }
    else {
      model = parseInt(args[0]);
    }

    if (isNaN(model)) {
      return player.SendChatMessage("USAGE: /setModel [model id or hash]");
    }

    if (model < 0 || model >= gm.utility.hashes.peds.length) {
      model = 0;
    }
    model = gm.utility.hashes.peds[model];
  }

  player.model = model.h;
  player.SendChatMessage("Changed your Model to " + model.n + ", hash: 0x" + model.h.toString(16));
});

commands.set("snow", (player, args) => {
  if (args.length < 1 || isNaN(args[0])) {
    return player.SendChatMessage("USAGE: /snow [value]", new RGB(255, 255, 0));
  }
  let v = parseFloat(args[0]);
  if (v < 0.0 || v > 2.5) {
    v = 0.0;
  }
  gm.config.snowLevel = v;
  gm.utility.broadcastMessage(player.name + " changed the snow level to " + v);
  for (let p of g_players) {
    p.world.snowLevel = v;
  }
});

commands.set("stopAnim", player => {
  player.StopAnim();
});

commands.set("weather", (player, args) => {
  if (args.length < 1 || isNaN(args[0])) {
    return player.SendChatMessage("USAGE: /weather [id]", new RGB(255, 255, 0));
  }
  let v = parseInt(args[0]);
  if (v < 1 || v > 12) {
    v = 1;
  }
  gm.config.weather = v;
  gm.utility.broadcastMessage(player.name + " changed the weather to " + v);
  for (let p of g_players) {
    p.world.weatherPersistNow = v;
  }
});

commands.set("wind", (player, args) => {
  if (args.length < 1 || isNaN(args[0])) {
    return player.SendChatMessage("USAGE: /wind [value]", new RGB(255, 255, 0));
  }
  let v = parseFloat(args[0]);
  if (v < 0.0 || v > 2.5) {
    v = 0.0;
  }
  gm.config.windLevel = v;
  gm.utility.broadcastMessage(player.name + " changed the wind level to " + v);
  for (let p of g_players) {
    p.world.windLevel = v;
  }
});
commands.set("g_fraction", (player,args) =>{
  if(args.length < 1 || isNaN(args[0]))
  {
    return player.SendChatMessage("USAGE: /g_fraction [id]", new RGB(255,255,0));
  }
  let str = "";
  str += gm.fractions.GetNameFraction(args[0]) + "\n" + gm.fractions.GetDiscriptionFraction(args[0]);
  player.SendChatMessage(str, new RGB(255,255,0));
});
