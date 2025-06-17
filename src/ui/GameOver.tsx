import React from 'react'

export default function GameOver() {
   function handlePlayAgain() {
    window.location.reload(); 
  } 
  return (

    <div id='gameOver' className='bg-amber-400 w-[400px] h-[200px] hidden'>
      <h1 id='gameOverTitle'>GameOver </h1>
      <div className='bg-white' onClick={handlePlayAgain}>
        play Agian 
    </div>
    </div>
  )
}
