import React, { useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'
import GameMP from '../game/multiplayer/GameMP'
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
      localStorage.setItem("role1","player")
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

      localStorage.setItem("role2","enemy")
}
  function deleteRoom(roomId: string) {
  socket.emit("deleteRoom",roomId)
 
      window.location.reload();
}
  return (

    <div className='flex justify-center items-center min-h-[100vh] ' >

          <div className='   text-white  '>
        {waiting &&!isPlaying ? (
          <div>
             <span className='font-bold'>{roomId}
            </span>
            <div className='bg-white text-black cursor-pointer' onClick={() => {
              deleteRoom(roomId)}}>
              delete room 
            </div>          </div>
        ) :isPlaying? (
        <GameMP role={role ?? ""} />
        ):(
          <div>
 <div onClick={createRoom} className='cursor-pointer'>
             Create Room 
            </div>
              <div className='flex  mt-5'>
          <div className='bg-white text-black p-2' onClick={() => { joinRoom(roomId) }}>
          Join Room
          </div>
          <div className='px-6'>
            <input type="text" placeholder='enter room id ' value={roomId} onChange={(e) => {
              setRoomId(e.target.value)
                      }} />
                  </div>
            </div>
 
          </div>
       )
              
              }
             
          </div> 
    </div>
  )
}
