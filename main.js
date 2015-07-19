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
	//fs: require('fs'),
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
		host     : gm.config.mysql.host,
		user     : gm.config.mysql.user,
		password : gm.config.mysql.password,
		database : gm.config.mysql.database
	});
	gm.query(8080);
}

main();
