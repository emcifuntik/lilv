/**
 * @overview GTA:Multiplayer Default Package: Utility File
 * @author Jan "Waffle" C.
 * @copyright (c) GTA:Multiplayer [gta-mp.net]
 * @license https://master.gta-mp.net/LICENSE
 */
"use strict";

let Utility = module.exports;
Utility.hashes = require('./hashes/hashes');

/**
 * Broadcasts a Message to all Players.
 *
 * @param {string} message the message to broadcast.
 * @param {RGB=} [opt_color] color of the message
 */
Utility.broadcastMessage = (message, opt_color) => {
  for (let player of g_players) {
    player.SendChatMessage(message, opt_color);
  }
};



/**
 * Returns the player from his id or (part of his) Name
 *
 * @param  {string/number} idOrName Networkid or name of the player (or some digits of the name)
 * @param  {boolean=} [allowDuplicates=false] False: If multiple players have the same Name only the first one found is returned.
 *                                            True: Returns an array with all duplicate players with the name
 * @param  {boolean=} [caseSensitive=false] True if case sensitive, false if not
 * @return {Player} An array with the players found with the id or the name,
 *                  only contains the first one found if allowDuplicates was false, empty array if no player was found
 */
Utility.getPlayer = (idOrName, opt_allowDuplicates, opt_caseSensitive) => {
  let allowDuplicates = opt_allowDuplicates || false;
  let caseSensitive = opt_caseSensitive || false;
	let id = parseInt(idOrName);
	let fnCheck;

	if (isNaN(id)) {
		if(caseSensitive === false) {
			idOrName = idOrName.toLowerCase();
		}

		// define fnCheck to check the players name
		fnCheck = target => {
			let targetName;
			if(caseSensitive === false) {
				//ignore capital letters
				targetName = target.name.toLowerCase();
			}
      else {
				// do not ignore capital letters
				targetName = target.name;
			}
			if (targetName.indexOf(idOrName) === 0) {
				return true;
			}
			return false;
		};
	}
  else {
		fnCheck = target => target.client.networkId === id;
	}

	let playerArray = [];
	for (let tempPlayer of g_players) {
		if (fnCheck(tempPlayer)) {
			playerArray.push(tempPlayer);
			if(allowDuplicates === false) {
				// exit the loop, because we just return the first player found
				break;
			}
		}
	}
	return playerArray;
};
