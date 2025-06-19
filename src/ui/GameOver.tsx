import React from 'react'

export default function GameOver() {
   function handlePlayAgain() {
    window.location.reload(); 
  } 
  return (

    <div id='gameOver' className='bg-black/80 rounded-2xl w-[400px] h-[200px] p-4 hidden '>
      <div className='flex justify-between  flex-col h-full'>
        <div>

      <h1 id='gameOverTitle' className='text-4xl font-serif text-white font-bold flex justify-center  '>GameOver </h1>
        </div>
        <div className='flex justify-center'>
      <div className='bg-white/80 rounded-2xl w-[40%]  cursor-pointer m-4 p-2 font-serif text-center text-2xl' onClick={handlePlayAgain}>
        Play Agian 
    </div>


        </div>
      </div>
    </div>
  )
}
