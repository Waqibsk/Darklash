import './App.css'
import Canvas from './components/Canvas'
import GameOver from './ui/GameOver'
import TopBar from './ui/TopBar'
import Menu from './components/Menu'
import Rooms from './components/Rooms'
import { useState } from 'react'
import { useSocket } from './components/SocketProvider'

function App() {
  const [mode, setMode] = useState("");
  return (

    <>
      {!mode ? <Menu setMode={setMode} /> :
        mode !== "single"? 
          
        ( <Rooms/> ):

        <div className='w-screen relative ' >
          <TopBar />

          <div className='absolute  top-[40%] left-[32%] '>
            <GameOver />
          </div>
          <Canvas />

        </div>
      }
            </>
  )
}

export default App
