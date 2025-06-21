import React, { useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'

export default function Rooms() {
  const [waiting,setWaiting]=useState(false)
  const [roomId,setRoomId]=useState("")
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
  },[roomId,socket])

  function createRoom() {
    socket.emit("createRoom", (res: any) => {
      setRoomId(res.roomId)
      setWaiting(true)
      
    });
    
  }
 
  function joinRoom(roomId: string) {
    socket.emit("joinRoom", roomId
 );

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
            waiting for others... <br />
ROOM ID: <span className='font-bold'> {roomId}
            </span>
            <div className='bg-white text-black cursor-pointer' onClick={() => {
              deleteRoom(roomId)}}>
              delete room 
            </div>          </div>
        ) :isPlaying? (
            <div>
              game started
        </div>
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
