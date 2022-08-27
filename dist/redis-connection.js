"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
let client;
async function getClient() {
    if (client && client.isOpen)
        return client;
    client = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
    console.log('CONNECTING to redis');
    await client.connect();
    console.log('CONNECTED to redis');
    return client;
}
exports.default = getClient;
//# sourceMappingURL=redis-connection.js.map