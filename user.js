function User(player) {
}

User.Users = new Array();

User.prototype.connect = function(player) {
	this.player = player;
	this.loggedIn = false;
	this.ID = 0;
	this.bank = 0;
	this.cash = 0;
	this.health = 0;
	this.armor = 0;
	this.faction = 0;
	this.rank = 0;
	this.position = {x:0.0, y:0.0, z:0.0};
	this.rotation = {x:0.0, y:0.0, z:0.0};
	this.model = 0;

	this.admin = 0;
	this.level = 1;
	this.respect = 0;

	this.waitForPassword = false;
	this.isLogin = false;

	User.Users[player.networkId] = this;

	//player.SendChatMessage("Привет.", new RGB(0, 255, 0));
	var query = gm.connection.query('SELECT * FROM `users` WHERE `user_name`=?', [
		this.player.name
	], function (error, rows, fields) {
		if(rows.length == 0) {
			console.log("Player " + player.name + " is not registered");
			setTimeout(function() {
				player.SendChatMessage("You are not registered! Enter your password to register:", new RGB(0, 255, 0));
				User.Users[player.networkId].waitForPassword = true;
				User.Users[player.networkId].isLogin = false;
			}, 50);
			//player.SendChatMessage("Привет.", new RGB(0, 255, 0));
		}
		else {
			console.log("Player registered");
			setTimeout(function() {
				player.SendChatMessage("You are registered! Enter your password to login:", new RGB(0, 255, 0));
				User.Users[player.networkId].waitForPassword = true;
				User.Users[player.networkId].isLogin = true;
			}, 50);
		}
	});
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
	var query = gm.connection.query('UPDATE `users` SET `user_pos_x`=?,\
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
`user_rank`=?,\
`user_model`=?,\
`user_last_login`=NOW(),\
`user_last_ip`=? WHERE `user_id`=? LIMIT 1', [
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
		this.rank,
		this.model,
		this.player.client.ipAddress,
		this.ID
	], function (error, result, fields) {
		if(result.affectedRows == 0) {
			console.log("Player not found");
		}
		else {
			console.log("Player data saved");
		}
	});
	console.log(query.sql);
};

User.prototype.register = function(password) {
	var curry = function(user) {
		return function (error, result, fields) {
			if(result.affectedRows == 0) {
				console.log("Player register failed");
				user.player.Kick();
			}
			else {
				console.log("Player register successfull");
				user.ID = result.insertId;
				user.player.SendChatMessage("Your account successfuly registered" , new RGB(0, 255, 0));
				user.loggedIn = true;
			}
		};
	};

	var query_text = gm.connection.query('INSERT INTO `users` (`user_name`,`user_password`,`user_steam`) VALUES (?, md5(?), NULL)', [
		this.player.name,
		password
	], curry(this));
};

User.prototype.login = function(password) {
	var curry = function(user) {
		return function (error, rows, fields) {
			if(rows.length == 0) {
				console.log("User with this combination of username and password not found");
				user.player.SendChatMessage("Invalid password! You will be kicked." , new RGB(255, 0, 0));
				user.player.Kick("Invalid password");
			}
			else {
				console.log("Player logged in successfully");
				user.player.SendChatMessage("You are successfuly logged in" , new RGB(0, 255, 0));
				user.ID = rows[0].user_id;
				user.loggedIn = true;
				user.bank = rows[0].user_bank;
				user.cash = rows[0].user_cash;

				user.health = rows[0].user_health;
				user.player.health = user.health;

				user.armor = rows[0].user_armor;
				user.player.armor = user.armor;

				user.faction = rows[0].user_faction;
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
			}
		};
	};
	var query = gm.connection.query('SELECT * FROM `users` WHERE `user_name`=? AND `user_password`=md5(?) LIMIT 1', [
		this.player.name,
		password
	], curry(this));
};

module.exports = User;
