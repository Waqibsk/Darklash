import { MenuProps } from '../types/Menu'
export default function Menu({setMode}:MenuProps) {
  return (
    <div className=' relative w-full' >
      <img src="https://wallpapercave.com/wp/wp9077587.jpg" alt="" className='w-full'/>
          <div className='bg-[rgb(0,0,0,0.3)] text-white font-retro  w-[50%] absolute top-[40%] left-[25%]  p-4 flex flex-col'>
            <h1 className='text-center font-retro2 text-5xl'>Welcome to the <span className='text-blue-700'> Arena</span></h1>  
              <div className='p-2 text-3xl'>
Select match type
              </div>
              <div className=''>
          <div className='px-2 pt-2  cursor-pointer text-2xl' onClick={() => { setMode("single") }} >
                      Single player
                  </div>
          <div className='p-2 cursor-pointer  text-2xl' onClick={() => { setMode("multi") }}>
                      Multiplayer
                  </div>
              </div>
          </div> 
    </div>
  )
}
