module.exports = function User(player) {
	this.player = player;
	this.money = 0;

	this.giveMoney = function(value) {
		//TODO: this.player.stat.money += value;
		this.money += value;
	};
}