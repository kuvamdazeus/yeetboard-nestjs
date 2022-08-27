import { Injectable } from '@nestjs/common';
import type { Server, Socket } from 'socket.io';
import getClient from 'src/redis-connection';
import { CanvasActions, SocketActions } from './events';

@Injectable()
export class RoomsService {
  async joinRoom(server: Server, socket: Socket, roomId: string) {
    socket.join(roomId);

    const socketCount = (await server.in(roomId).allSockets()).size;

    server
      .to(roomId)
      .emit(SocketActions.UPDATE_PEOPLE_COUNT.toString(), socketCount);

    const client = await getClient();
    const canvasData = await client.json.get('rooms:' + roomId);
    socket.emit(SocketActions.LOAD_CANVAS.toString(), canvasData);
  }

  async broadcastCanvasActions(server: Server, socket: Socket, data: any[]) {
    const roomId = Array.from(socket.rooms.entries())[1][1];

    server.to(roomId).emit(SocketActions.CANVAS_ACTION.toString(), data);

    const client = await getClient();
    const savedActions = await client.json.get('rooms:' + roomId);

    if (savedActions) {
      if (data.length > 0)
        await client.json.arrAppend('rooms:' + roomId, '$', ...data);
    } else {
      // console.log('SET', data);
      await client.json.set('rooms:' + roomId, '$', data);
    }
  }

  async performCleanup(server: Server, roomId: string) {
    const client = await getClient();

    const socketCount = (await server.in(roomId).allSockets()).size;

    if (socketCount === 0) {
      await client.json.del('rooms:' + roomId);
    }
  }
}
