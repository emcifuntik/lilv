/**
 * @overview Life Is Life RolePlay Gamemode
 * @author Eugene "Funtik" Pogrebnyak, Ivan "Lalka" Baturin
 * @copyright (c) LiL Team
 */

"use strict";

var Command = {};

function consoleHandler(data)
{
    let args = data.split(" ");

    let commandName = args.splice(0, 1)[0];

    if(typeof Command[commandName] == 'function'){
        Command[commandName](args);
        return true;
    }
    else return false;
}
g_server.AddInputHandler(consoleHandler);

Command.test = function (args) {
  console.log("Args -> "+args);
};

Command.restart = function (args) {
  g_server.Restart();
};

Command.config = function(args) {
	var config = JSON.parse(g_server.config);
	console.log("\n\n======================GTA:Multiplayer======================");
	console.log(" Host: "+(GetServer().host == "" ? "Listen to 0.0.0.0" : "Listen to "+GetServer().host));
	console.log(" Port: "+config.port);
	console.log(" Name: "+GetServer().serverName);
	console.log(" Maximum Players: "+GetServer().maxPlayers);
	console.log(" Server Mode: "+config.mode);
	console.log(" Server Map: "+config.map);
	console.log(" Password: "+(config.password == "" ? "No Password entered" : config.password));
	console.log(" ---------------");
	console.log(" Announced to Masterlist: "+(config.announce == 1 ? "Yes" : "No"));
	console.log(" Verified Key: "+(config.masterkey == "" ? "Not found" : "Found"));
	console.log(" Masterlist Port: "+config.masterPort);
	console.log(" Network Latency Port: "+config.latencyPort);
	console.log(" Maximum Tickrate: "+GetServer().maxTickRate);
	console.log(" ---------------\n\n");
};

Command.fp = function(args) {
	var exec = require('child_process').execFile;
	var spawn = require('child_process').spawn;

	var playerProcess = spawn("./FakePlayer.exe", ["Peter"]);
	// exec('./FakePlayer.exe Peter', function(err, data) {
	  // console.log(err);
	  // console.log(data.toString());
	// });
}