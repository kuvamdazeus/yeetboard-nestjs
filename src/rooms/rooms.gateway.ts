import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
import { Server, Socket } from 'socket.io';
import { SocketActions } from './events';

@WebSocketGateway({ cors: { origin: '*' } })
export class RoomsGateway {
  constructor(private readonly roomsService: RoomsService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    socket.on(SocketActions.JOIN_ROOM.toString(), ({ roomId }: any) => {
      this.roomsService.joinRoom(this.server, socket, roomId);

      socket.on('disconnect', async () => {
        const socketCount = (await this.server.in(roomId).allSockets()).size;

        this.server
          .to(roomId)
          .emit(SocketActions.UPDATE_PEOPLE_COUNT.toString(), socketCount);

        socket.leave(roomId);

        this.roomsService.performCleanup(this.server, roomId);
      });
    });
  }

  @SubscribeMessage(SocketActions.CANVAS_ACTION.toString())
  broadcastCanvasAction(
    @MessageBody() data,
    @ConnectedSocket() socket: Socket,
  ) {
    this.roomsService.broadcastCanvasActions(this.server, socket, data);
  }
}
