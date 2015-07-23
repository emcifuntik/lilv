"use strict";

let Timer = module.exports;

Timer.register = () => {
    Timer.oneMinuteTimer = setInterval(Timer.oneMinuteFunction, 60000);
    Timer.fiveMinuteTimer = setInterval(Timer.fiveMinuteFunction, 5*60000);
    Timer.oneHourTime = setInterval(Timer.oneHourFunction, 60*60000);
}

Timer.oneMinuteFunction = () => {
    for(let player of g_players) {
        if(gm.users[player.client.networkId].loggedIn == true) {
            player.health--;
        }
    }
};

Timer.fiveMinuteFunction = () => {

};
Timer.oneHourFunction = () => {
    for(let player of g_players) {
        if(gm.users[player.client.networkId].loggedIn == true)
        {
            let factionid = gm.users[player.client.networkId].faction;
            let rank = gm.users[player.client.networkId].rank;
            let money = gm.faction.CashOut[factionid] * rank;
            player.giveMoney(money);

        }
    }
};
