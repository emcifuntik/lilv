"use strict";

function User() {
}

User.prototype.connect = function(player) {
	this.player = player;
	this.loggedIn = false;
	this.ID = 0;
	this.bank = 0;
	this.cash = 0;
	this.health = 0;
	this.armor = 0;
	this.faction = 0;
	this.gang = 0;
	this.job = 0;
	this.rank = 0;
	this.position = {x:0.0, y:0.0, z:0.0};
	this.rotation = {x:0.0, y:0.0, z:0.0};
	this.model = 0;
	this.admin = 0;
	this.level = 1;
	this.respect = 0;
	this.waitForPassword = false;
	this.isLogin = false;
	this.conversation = false;
	this.duty = false;
	this.lastGetWeapon = 0;
	this.banned = 0;
	this.muted = 0;
	this.jailed = 0;
	let curry = function(user) {
		return function (error, rows, fields) {
			if(rows.length == 0) {
				console.log("Player " + player.name + " is not registered");
				player.SendChatMessage("You are not registered! Enter your password to register:", Colors.Success);
				user.waitForPassword = true;
				user.isLogin = false;
				//player.SendChatMessage("Привет.", Colors.Pear);
			}
			else {
				console.log("Player registered");
				player.SendChatMessage("You are registered! Enter your password to login:", Colors.Success);
				user.waitForPassword = true;
				user.isLogin = true;
			}
		};
	};

	//player.SendChatMessage("Привет.", Colors.Pear);
	gm.connection.query('SELECT * FROM `users` WHERE `user_name`=?', [
		this.player.name
	], curry(this));
};

User.prototype.giveMoney = function(value) {
	//TODO: this.player.stat.money += value;
	this.cash += value;
};

User.prototype.saveData = function() {
	this.health = this.player.health;
	this.armor = this.player.armor;
	this.position = {x:this.player.position.x, y:this.player.position.y, z:this.player.position.z};
	this.rotation = {x:this.player.rotation.x, y:this.player.rotation.y, z:this.player.rotation.z};
	this.model = this.player.model;
	gm.connection.query('UPDATE `users` SET `user_pos_x`=?,\
`user_pos_y`=?,\
`user_pos_z`=?,\
`user_rot_x`=?,\
`user_rot_y`=?,\
`user_rot_z`=?,\
`user_admin`=?,\
`user_level`=?,\
`user_respect`=?,\
`user_health`=?,\
`user_armor`=?,\
`user_bank`=?,\
`user_cash`=?,\
`user_faction`=?,\
`user_gang`=?,\
`user_rank`=?,\
`user_model`=?,\
`user_last_login`=NOW(),\
`user_last_ip`=?,\
`user_banned`=?,\
`user_muted`=?,\
`user_jailed`=?,\
 WHERE `user_id`=? LIMIT 1', [
		this.position.x,
		this.position.y,
		this.position.z,
		this.rotation.x,
		this.rotation.y,
		this.rotation.z,
		this.admin,
		this.level,
		this.respect,
		this.health,
		this.armor,
		this.bank,
		this.cash,
		this.faction,
		this.gang,
		this.rank,
		this.model,
		this.player.client.ipAddress,
		this.banned,
		this.muted,
		this.jailed
		this.ID
	], function (error, result, fields) {
		if(result.affectedRows == 0) {
			console.log("Player not found");
		}
		else {
			console.log("Player data saved");
		}
	});
};

User.prototype.register = function(password) {
	let curry = function(user) {
		return function (error, result, fields) {
			if(result.affectedRows == 0) {
				console.log("Player register failed");
				user.player.Kick();
			}
			else {
				console.log("Player register successfull");
				user.ID = result.insertId;
				user.player.SendChatMessage("Your account successfuly registered" , Colors.Success);
				user.loggedIn = true;
			}
		};
	};

	gm.connection.query('INSERT INTO `users` (`user_name`,`user_password`,`user_steam`) VALUES (?, md5(?), NULL)', [
		this.player.name,
		password
	], curry(this));
};

User.prototype.login = function(password) {
	let curry = function(user) {
		return function (error, rows, fields) {
			if(rows.length == 0) {
				console.log("User with this combination of username and password not found");
				user.player.SendChatMessage("Invalid password! You will be kicked." , Colors.Fail);
				user.player.Kick("Invalid password");
				return true;
			}
			else {
				if(rows[0].user_banned > Date.now()) {
					let banTime = rows[0].user_banned - Date.now();
					let days = banTime/(24*60*60*1000) >> 0;
					banTime -= days * (24*60*60*1000);
					let hours = banTime/(60*60*1000) >> 0;
					banTime -= hours * (60*60*1000);
					let minutes = banTime/(60*1000) >> 0;
					banTime -= minutes * (60*1000);
					let seconds = banTime/(1000) >> 0;
					banTime -= seconds * (1000);
					user.player.SendChatMessage("You are banned! Unban in " + days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds.", Colors.Fail);
					user.player.Kick("Banned");
					return true;
				}
				console.log("Player logged in successfully");
				user.player.SendChatMessage("You are successfuly logged in" , Colors.Success);
				user.ID = rows[0].user_id;
				user.loggedIn = true;
				user.bank = rows[0].user_bank;
				user.cash = rows[0].user_cash;

				user.health = rows[0].user_health;
				user.player.health = user.health;

				user.armor = rows[0].user_armor;
				user.player.armor = user.armor;

				user.faction = rows[0].user_faction;
				user.gang = rows[0].user_gang;
				user.rank = rows[0].user_rank;

				user.player.position.x = user.position.x = rows[0].user_pos_x;
				user.player.position.y = user.position.y = rows[0].user_pos_y;
				user.player.position.z = user.position.z = rows[0].user_pos_z;

				user.player.rotation.x = user.rotation.x = rows[0].user_rot_x;
				user.player.rotation.y = user.rotation.y = rows[0].user_rot_y;
				user.player.rotation.z = user.rotation.z = rows[0].user_rot_z;

				user.model = rows[0].user_model;
				user.player.model = user.model;

				user.admin = rows[0].user_admin;
				user.level = rows[0].user_level;
				user.respect = rows[0].user_respect;
				user.muted = rows[0].user_muted;
				user.jailed = rows[0].user_jailed;
			}
		};
	};
	gm.connection.query('SELECT * FROM `users` WHERE `user_name`=? AND `user_password`=md5(?) LIMIT 1', [
		this.player.name,
		password
	], curry(this));
};

User.prototype.answerPropose = (answer) => {
	if(this.conversation === false) {
		this.player.SendChatMessage("You have no offers", Colors.Notice);
		return true;
	}
	if(this.conversation.expires < Date.now()) {
		this.player.SendChatMessage("Offer is expired", Colors.Warning);
		this.conversation = false;
		return true;
	}
	if(!gm.utility.isPlayerInRangeOfPlayer(this.player, 3.0, this.conversation.issuer)) {
		this.player.SendChatMessage("Offer issuer is too far from you", Colors.Warning);
		this.conversation = false;
		return true;
	}

	if(answer === true) {
		let issuer = (this.conversation.issuer != false) ? gm.users[this.conversation.issuer.client.networkId] : false;
		switch(this.conversation.type) {
			case 1: {
				if(this.conversation.info.faction > 0)
				{
					this.faction = this.conversation.info.faction;
					this.rank = 1;
					this.player.SendChatMessage("You joined \"" + gm.faction.GetFactionName(this.faction) + "\" faction", Colors.Success);
				}
				else if (this.conversation.info.gang > 0) {
					this.gang = this.conversation.info.gang;
					this.rank = 1;
					this.player.SendChatMessage("You joined \"" + gm.gang.GetGangName(this.gang) + "\" gang", Colors.Success);
				}
			}//Вступление во фракцию
			case 2: {
				if(this.cash < this.conversation.info.price) {
					this.player.SendChatMessage("You do not have enough money", Colors.Fail);
					this.conversation.issuer.SendChatMessage("Player " + this.player.name + " do not have enough money", Colors.Fail);
				}
				else {
					this.giveMoney(-this.conversation.info.price);
					issuer.giveMoney(this.conversation.info.price);
					this.player.SendChatMessage("Now you are healthy", Colors.Success);
				}
			}//Диалог о лечении
		}
		this.conversation.issuer.SendChatMessage("Player " + this.player.name + " accept you proposal", Colors.Success);
		this.conversation = false;
		return true;
	}
	else if(answer === false) {
		this.conversation.issuer.SendChatMessage("Player " + this.player.name + " declined you proposal", Colors.Fail);
		this.conversation = false;
		return true;
	}
};

module.exports = User;
