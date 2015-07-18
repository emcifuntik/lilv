/**
 * @overview Life Is Life RolePlay Gamemode
 * @author Eugene "Funtik" Pogrebnyak, Ivan "Lalka" Baturin
 * @copyright (c) LiL Team
 */
"use strict";

// Creating a global namespace to prevent naming issues with GTA:MP
/**
 * @namespace
 */
global.gm = {
	user: require('./user.js'),
	config: require('./config.js'),
	mysql: require('./mysql/index.js'),
	events: require('./events.js'),
	utility: require('./utility.js'),
	rcon: require('./rcon.js'),
	faction: require('./faction.js'),
	query: require('./query.js'),
	fs: require('fs'),
	users: []
};

/**
 * The main function of this package.
 */

function main () {
	console.log("Registering Events...");
	gm.events.register();
	console.log("Server started!");
	gm.connection = gm.mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  password : '1232356',
	  database : 'lilv'
	});
	gm.connection.connect(function(err) {
		if (err) {
			console.log('MySQL connection error: ' + err.stack);
			return;
		}
		console.log('MySQL connection successful [Thread:' + gm.connection.threadId + ']');
	});
	gm.query(8080);
}

main();
