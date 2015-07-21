"use strict";

function Query(port) {
    let http = require('http');

    //We need a function which handles requests and send response
    function handleRequest(request, response){
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Content-Type", "application/json");
        let param = request.url.split("/");
        let action = param[param.length - 1];
        if(action == "serverInfo") {
            let server_config = JSON.parse(g_server.config);
            let server_info = GetServer();

            let data = {
                name: server_info.serverName,
                maxPlayers: server_info.maxPlayers,
                serverMode: server_config.mode,
                serverMap: server_config.map,
                playersOnline: g_players.length
            };
            response.end(JSON.stringify(data));
        }
        else if(action == "playersList") {
            let players = [];
            for(let p of g_players) {
                if(gm.users[player.client.networkId].loggedIn == true) {
                    players.push({id: p.client.networkId, name: p.name});
                }
            }
            response.end(JSON.stringify(players));
        }
        else if(action == "playersInfo") {
            let players = [];
            for(let p of g_players) {
                if(gm.users[player.client.networkId].loggedIn == true) {
                    players.push({id: p.client.networkId, name: p.name, position: {
                        x:p.position.x,
                        y:p.position.y,
                        z:p.position.z,
                    }});
                }
            }
            response.end(JSON.stringify(players));
        }
        response.end("/serverInfo - Server info\n/playerList - List of players");
    }

    let server = http.createServer(handleRequest);
    server.listen(port, function(){
        console.log("Server listening on: http://localhost:%s", port);
    });
}

module.exports = Query;
