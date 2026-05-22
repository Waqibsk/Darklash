import { MenuProps } from '../types/Menu';
import menuBG from '../assets/background/menu/menuBG.jpg';
export default function Menu({ setMode }: MenuProps) {
  return (
    <div className=" relative w-full">
      <img src={menuBG} alt="" className="w-full" />
      <div className="bg-[rgb(0,0,0,0.5)] text-white font-retro  w-[50%] absolute top-[40%] left-[25%]  p-4 flex flex-col">
        <h1 className="text-center font-retro2 text-5xl">
          Welcome to the <span className=""> Arena</span>
        </h1>
        <div className="p-2 text-3xl">Select match type</div>
        <div className="">
          <div
            className="px-2 pt-2  cursor-pointer text-2xl"
            onClick={() => {
              setMode('single');
            }}
          >
            Single player
          </div>
          <div
            className="p-2 cursor-pointer  text-2xl"
            onClick={() => {
              setMode('multi');
            }}
          >
            Multiplayer
          </div>
        </div>
      </div>
    </div>
  );
}
