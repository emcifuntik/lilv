/**
 * @overview Life Is Life RolePlay Gamemode
 * @author Eugene "Funtik" Pogrebnyak, Ivan "Lalka" Baturin
 * @copyright (c) LiL Team
 */
"use strict";
let commands = module.exports = new Map();

commands.set("broadcast", (player, args) => {
  gm.utility.broadcastMessage("((BROADCAST)) " + player.name + ": " + args.join(" "));
});

commands.set("cloth", (player, args) => {
  if (args.length < 4 || isNaN(args[0]) || isNaN(args[1]) || isNaN(args[2]) || isNaN(args[3])) {
    return player.SendChatMessage("USAGE: /cloth [component id] [draw id] [texture id] [palette id]");
  }

  player.SetComponentVariation(parseInt(args[0]), parseInt(args[1]), parseInt(args[2]), parseInt(args[3]));
});

commands.set('getWeapon', (player, args) => {
  if (args.length < 1) {
    return player.SendChatMessage("USAGE: /getWeapon [id or name] ([ammo])");
  }
  let weapon;
  let ammo = parseInt(args[1]);
  if (isNaN(ammo)) {
    ammo = 300;
  }

  let num = parseInt(args[0]);
  if (isNaN(num)) {
    weapon = gm.utility.hashes.findByName(gm.utility.hashes.weapons, args[0]);
  }
  else {
    if (num < 0 || num >= gm.utility.hashes.weapons.length) {
      num = 0;
    }
    weapon = gm.utility.hashes.weapons[num];
  }

  if (typeof weapon === "undefined") {
    return player.SendChatMessage("USAGE: /getWeapon [id or name] ([ammo])");
  }

  player.AddWeapon(weapon.h, ammo, true);
  player.SendChatMessage("Congratulations for your new " + weapon.n + ".");
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
