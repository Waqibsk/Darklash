export default function TopBar() {
  return (
    <div className="bg-red-500 flex  w-full items-center text-sm text-white">
      <div className="flex w-full h-[32px] justify-end">
        <div id="player-health" className=" w-[100%]  bg-green-600 block"></div>
      </div>
      <div className="bg-amber-500 h-[32px] ">timer</div>
      <div className="flex w-full h-[32px]  justify-start">
        <div id="enemy-health" className=" w-[100%] bg-green-600 block"></div>
      </div>
    </div>
  );
}
