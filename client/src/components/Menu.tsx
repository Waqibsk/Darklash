import React from 'react'
import { MenuProps } from '../types/Menu'
export default function Menu({setMode}:MenuProps) {
  return (
    <div className=' flex justify-center items-center min-h-[100vh]'>
          <div className='bg-amber-400 w-[50%]  p-4 flex flex-col'>
            <h1 className='text-center'>Welcome to the Arena</h1>  
              <div className='p-2'>
Select match type
              </div>
              <div className=''>
          <div className='p-2 cursor-pointer' onClick={() => { setMode("single") }} >
                      Single player
                  </div>
          <div className='p-2 cursor-pointer ' onClick={() => { setMode("multi") }}>
                      Multiplayer
                  </div>
              </div>
          </div> 
    </div>
  )
}
