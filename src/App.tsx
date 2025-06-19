import './App.css'
import Canvas from './components/Canvas'
import GameOver from './ui/GameOver'
GameOver
import TopBar from './ui/TopBar'
function App() {
  return (
    <>
      <div className='w-screen relative ' >
<TopBar/>

        <div className='absolute  top-[40%] left-[32%] bg-black '>
<GameOver />
</div>
<Canvas/>
      </div>
            </>
  )
}

export default App
