import React, { useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'
import GameMP from '../game/multiplayer/GameMP'
import roomBG from "../assets/background/menu/menu2.jpg"
export default function Rooms() {
  const [waiting,setWaiting]=useState(false)
  const [roomId,setRoomId]=useState("")
const [role, setRole] = useState<"player"|"enemy"|null>(null);
  const socket = useSocket()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const handleGameStarted = () => {
  setIsPlaying(true)
    }
    const handleDisconnect = () => {
      window.location.reload()
    }
    socket.on("disconnected",handleDisconnect)
    socket.on("gameStarted",handleGameStarted)
return () => {
      socket.off("gameStarted", handleGameStarted);
    };
  },[roomId,socket,role])

  function createRoom() {
    socket.emit("createRoom", (res: any) => {
      setRoomId(res.roomId)
      setWaiting(true)
      if (res.size === 1) {
        if (!role) {
        setRole("player");
        }
      }
    });
    
  }
 
  function joinRoom(roomId: string) {
    socket.emit("joinRoom", roomId, (res: any) => {
if (res.size === 2) {
        if (!role) {

        setRole("enemy");
        }
      }
    }

 );

}
  function deleteRoom(roomId: string) {
  socket.emit("deleteRoom",roomId)
 
      window.location.reload();
}
  return (

    <div className="relative">
      {isPlaying ? "" : (<img src={roomBG} alt="" className='w-full' />)}
      {isPlaying ? <GameMP role={role ?? ""} /> : (
           <div className=' bg-[rgb(0,0,0,0.8)] p-4 text-white  absolute top-[40%] left-[40%]'>
        {waiting &&!isPlaying ? (
          <div className=''>
            <div
              className='font-bold m-2'> Share Room ID: <br />
              {roomId}
            </div>
            <div className=' cursor-pointer bg-white text-black m-2 p-2 w-[40%]' onClick={() => {
              deleteRoom(roomId)}}>
              Delete Room 
            </div>          </div>
        ) :(
          <div>
 <div onClick={createRoom} className='cursor-pointer'>
             Create Room 
            </div>
              <div className='flex  mt-5'>
          <div className='bg-white text-black p-2' onClick={() => { joinRoom(roomId) }}>
          Join Room
          </div>
          <div className='px-6'>
            <input type="text" placeholder='Enter room id ' className='p-2' value={roomId} onChange={(e) => {
              setRoomId(e.target.value)
                      }} />
                  </div>
            </div>
 
          </div>
       )
              
              }
             
          </div> 
       

      )} 
        
    
    </div>
  )
}
