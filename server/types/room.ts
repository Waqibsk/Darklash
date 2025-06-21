import { Socket } from "socket.io"
export type Room={
    id: string,
sockets:Socket[]
}