"use strict";

let Timer = module.exports;

Timer.register = () => {
    Timer.oneMinuteTimer = setInterval(Timer.oneMinuteFunction, 60000);
    Timer.fiveMinuteTimer = setInterval(Timer.fiveMinuteFunction, 5*60000);
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
