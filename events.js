/**
 * @overview Life Is Life RolePlay Gamemode
 * @author Eugene "Funtik" Pogrebnyak, Ivan "Lalka" Baturin
 * @copyright (c) LiL Team
 */
"use strict";

/**
 * @namespace
 */
let Events = module.exports;
let commands = require('./commands');

/**
 * Registers all Events.
 *
 */
Events.register = () => {
    // Note: 'events' is the GTA:MP Event-System.
    events.Add("ClientConnected", Events.onClientConnected);
    events.Add("ClientDisconnected", Events.onClientDisconnected);

    events.Add("ChatMessage", Events.onChatMessage);
    events.Add("ChatCommand", Events.onChatCommand);

    events.Add("PlayerCreated", Events.onPlayerCreated);
    events.Add("PlayerDestroyed", Events.onPlayerDestroyed);

    events.Add("PlayerShot", Events.onPlayerShot);
    events.Add("PlayerDeath", Events.onPlayerDeath);
};

/**
 * Called when a Client connects
 *
 * @param {Client} client the new client
 */
Events.onClientConnected = client => {
    console.log("Client (ip: " + client.ipAddress + ") [ID:" + client.networkId + "] connected.");

};

/**
 * Called when a Client disconnects
 *
 * @param {Client} client the new client
 * @param {integer} reason disconnect reason
 */
Events.onClientDisconnected = (client, reason) => {
    console.log("Client (ip: " + client.ipAddress + ") disconnected. Reason: " + (reason === 1 ? "Timeout" : "Normal quit"));
};

/**
 * Called when a Player typed a message in the chat.
 *
 * @param {Player} player the player
 * @param {string} message the message
 * @returns {boolean} whether the chat message should be blocked or not.
 */
Events.onChatMessage = (player, message) => {
    // basic example on blocking swearing players
    if(gm.users[player.client.networkId].waitForPassword === true) {
        if(gm.users[player.client.networkId].isLogin) {
            gm.users[player.client.networkId].login(message);
        }
        else {
            gm.users[player.client.networkId].register(message);
        }
        gm.users[player.client.networkId].waitForPassword = false;
        return true;
    }
    if(gm.users[player.client.networkId].muted > Date.now()) {
        let muteTime = gm.users[player.client.networkId].muted - Date.now();
        let minutes = muteTime/(60*1000) >> 0;
        muteTime -= minutes * (60*1000);
        let seconds = muteTime/(1000) >> 0;
        muteTime -= seconds * (1000);
        player.SendChatMessage("You are muted! Unmute in " + minutes + " minutes " + seconds + " seconds.", Colors.Fail);
        return true;
    }
    else if(gm.users[player.client.networkId].muted != 0) {
        gm.users[player.client.networkId].muted = 0;
    }
    let lowMsg = message.toLowerCase();
    for (let badWord of gm.config.badWords) {
        if (lowMsg.indexOf(badWord.toLowerCase()) !== -1) {
            player.SendChatMessage("Please be nice.", new RGB(255, 0 ,0));
            return true;
        }
    }
    return false;
};

/**
 * Called when a Player types in a chat command (e.g. /command)
 *
 * @param {Player} player the player
 * @param {string} command the command
 */
Events.onChatCommand = (player, command) => {
    if(!gm.users[player.client.networkId].loggedIn) {
        player.SendChatMessage("You can\'t use commands until not logged in", Colors.Warning);
        return 1;
    }
    let args = command.split(" ");

    // Let's check if this crazy thing ever happens.
    if (args.length === 0) {
        throw "This should NEVER happen.";
    }
    let commandName = args.splice(0, 1)[0];

    if (commands.has(commandName)) {
        commands.get(commandName)(commandName, player, args);
    }
    else {
        player.SendChatMessage("Unknown command.", Colors.Error);
    }
};

/**
 * Called when a new Player was created (after he connected)
 *
 * @param {Player} player the new player
 */
Events.onPlayerCreated = player => {
	console.log("Player " + player.name + "[" + player.client.networkId + "] has successfully joined the server.");
	gm.users[player.client.networkId] = new gm.user();
    gm.users[player.client.networkId].connect(player);

	// Set world for the player
	let now = new Date();
	player.world.SetTime(now.getHours(), now.getMinutes(), now.getSeconds());
	player.world.timeScale = gm.config.world.timeScale;
	player.world.weather = gm.config.world.defaultWeather;

	for (let ipl of gm.config.world.IPLs) {
		player.world.RequestIPL(ipl);
	}
	for (let interior of gm.config.world.interiors) {
		player.world.EnableInterior(interior);
		if (!gm.config.world.capInteriors) {
			player.world.UnCapInterior(interior);
		}
	}

	player.SendChatMessage("Welcome to my Life Is Life RolePlay Server!", Colors.Welcome);
};

/**
 * Called when a Player dies
 *
 * @param {Player} player the player that is no more :'(
 * @param {integer} reason the reason (hash)
 */
Events.onPlayerDeath = player => {
	for (let tempPlayer of g_players) {
		//tempPlayer.graphics.ui.DisplayMessage("~r~" + player.name + "~s~ died.");
	}
};

/**
* Called when a Player shot
*
* @param {Player} player the shooting player
* @param {integer} weaponType the weapon he used to shoot
* @param {Vector3f} aimPos aim position
*/
Events.onPlayerShot = player => {
	player.graphics.ui.DisplayMessage("~r~SHOTS FIRED");
};

/**
* Called when a Player is leaving the Server
*
* @param {Player} player the leaving player
*/
Events.onPlayerDestroyed = player => {
	console.log("Player " + player.name + " is leaving the server.");
    if(gm.users[player.client.networkId].loggedIn) {
        gm.users[player.client.networkId].saveData();
    }
	delete gm.users[player.client.networkId];
};
