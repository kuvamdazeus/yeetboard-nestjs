"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const rooms_service_1 = require("./rooms.service");
const socket_io_1 = require("socket.io");
const events_1 = require("./events");
let RoomsGateway = class RoomsGateway {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    handleConnection(socket) {
        socket.on(events_1.SocketActions.JOIN_ROOM.toString(), ({ roomId }) => {
            this.roomsService.joinRoom(this.server, socket, roomId);
            socket.on('disconnect', async () => {
                const socketCount = (await this.server.in(roomId).allSockets()).size;
                this.server
                    .to(roomId)
                    .emit(events_1.SocketActions.UPDATE_PEOPLE_COUNT.toString(), socketCount);
                socket.leave(roomId);
                this.roomsService.performCleanup(this.server, roomId);
            });
        });
    }
    broadcastCanvasAction(data, socket) {
        this.roomsService.broadcastCanvasActions(this.server, socket, data);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RoomsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_1.SocketActions.CANVAS_ACTION.toString()),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], RoomsGateway.prototype, "broadcastCanvasAction", null);
RoomsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } }),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsGateway);
exports.RoomsGateway = RoomsGateway;
//# sourceMappingURL=rooms.gateway.js.map