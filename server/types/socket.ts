import "socket.io"
declare module "socket.io" {
 interface Socket {
        isPlaying:boolean
     roomId:string
        
    }

}