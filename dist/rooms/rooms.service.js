"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const redis_connection_1 = require("../redis-connection");
const events_1 = require("./events");
let RoomsService = class RoomsService {
    async joinRoom(server, socket, roomId) {
        socket.join(roomId);
        const socketCount = (await server.in(roomId).allSockets()).size;
        server
            .to(roomId)
            .emit(events_1.SocketActions.UPDATE_PEOPLE_COUNT.toString(), socketCount);
        const client = await (0, redis_connection_1.default)();
        const canvasData = await client.json.get('rooms:' + roomId);
        socket.emit(events_1.SocketActions.LOAD_CANVAS.toString(), canvasData);
    }
    async broadcastCanvasActions(server, socket, data) {
        const roomId = Array.from(socket.rooms.entries())[1][1];
        server.to(roomId).emit(events_1.SocketActions.CANVAS_ACTION.toString(), data);
        const client = await (0, redis_connection_1.default)();
        const savedActions = await client.json.get('rooms:' + roomId);
        if (savedActions) {
            if (data.length > 0)
                await client.json.arrAppend('rooms:' + roomId, '$', ...data);
        }
        else {
            await client.json.set('rooms:' + roomId, '$', data);
        }
    }
    async performCleanup(server, roomId) {
        const client = await (0, redis_connection_1.default)();
        const socketCount = (await server.in(roomId).allSockets()).size;
        if (socketCount === 0) {
            await client.json.del('rooms:' + roomId);
        }
    }
};
RoomsService = __decorate([
    (0, common_1.Injectable)()
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map