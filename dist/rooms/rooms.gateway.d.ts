import { RoomsService } from './rooms.service';
import { Server, Socket } from 'socket.io';
export declare class RoomsGateway {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    server: Server;
    handleConnection(socket: Socket): void;
    broadcastCanvasAction(data: any, socket: Socket): void;
}
