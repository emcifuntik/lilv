/**
 * @overview Life Is Life RolePlay Gamemode
 * @author Eugene "Funtik" Pogrebnyak, Ivan "Lalka" Baturin
 * @copyright (c) LiL Team
 */
"use strict";
/**
 * @namespace
 */
let connection = module.exports;
let mysql      = require('./mysql/index.js');

connection.init = () => {
	connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '1232356',
	  database : 'lilv'
	});
	connection.connect(function(err) {
		if (err) {
			console.log('MySQL connection error: ' + err.stack);
			return;
		}
		console.log('MySQL connection successful [Thread:' + connection.threadId + ']');
	});
};