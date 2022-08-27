import type { Server, Socket } from 'socket.io';
export declare class RoomsService {
    joinRoom(server: Server, socket: Socket, roomId: string): Promise<void>;
    broadcastCanvasActions(server: Server, socket: Socket, data: any[]): Promise<void>;
    performCleanup(server: Server, roomId: string): Promise<void>;
}
