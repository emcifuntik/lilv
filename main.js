/**
 * @overview Life Is Life RolePlay Gamemode
 * @author Eugene "Funtik" Pogrebnyak, Ivan "Lalka" Baturin
 * @copyright (c) LiL Team
 */
"use strict";

let User = require('./user.js');

// Creating a global namespace to prevent naming issues with GTA:MP
/**
 * @namespace
 */
global.gm = {
  config: require('./config.js'),
  connection: require('./mysql.js'),
  events: require('./events.js'),
  utility: require('./utility.js'),
  rcon: require('./rcon.js')
};

/**
 * The main function of this package.
 */
 
function main () {
  console.log("Registering Events...");
  gm.events.register();
  gm.connection.init();
  console.log("Server started!");
}

main();
