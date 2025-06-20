import React from 'react'

export default function Rooms() {
  return (

    <div className='flex justify-center items-center min-h-[100vh] ' >
          <div className='   text-white  '>
              <div>
             Create Room 
            </div>
              <div className='flex  mt-5'>
                  Join room <div className='px-6'>
                      <input type="text" placeholder='enter room id ' />
                  </div>
            </div>
          </div> 
    </div>
  )
}
