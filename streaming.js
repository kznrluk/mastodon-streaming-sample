const WebSocket = require('websocket').client;
const ws = new WebSocket;

ws.on('connectFailed', e => console.log(e));
ws.on('connect', connection =>{
    const timeline = new Map();
    // Recieve Message
    connection.on('message', message => {
        const json = JSON.parse(message.utf8Data);
        const toot = JSON.parse(json.payload);
        switch(json.event){
            case 'delete':
            const deletedToot = timeline.get(json.payload);
            if(deletedToot){
                console.log(`\u001b[33mDELETED ID : @${deletedToot.account.username}  Name: ${deletedToot.account.display_name}\n    ${deletedToot.content}\u001b[0m\n`);
            } else {
                console.log(`\u001b[33mDELETED ID : ${json.payload}\u001b[0m`);
            }
            break;

            case 'update':
            console.log(`ID: @${toot.account.username}  Name: ${toot.account.display_name}\n    \u001b[32m${toot.content}\u001b[0m\n`);
            timeline.set(toot.id, toot);
            break;

            default:
            console.log(`EVENT : ${json.event}`);
        }
    });
});

ws.connect('wss://pawoo.net/api/v1/streaming/?stream=public:local');