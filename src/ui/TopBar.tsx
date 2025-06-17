import { useEffect, useState } from "react";
export let timerId: ReturnType<typeof setInterval> | null = null;
export default function TopBar() {
  const [seconds, setSeconds] = useState(10);
  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    timerId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [seconds]);

  return (
    <div className="bg-red-500 flex  w-full items-center text-sm text-white">
      <div className="flex w-full h-[32px] justify-end">
        <div id="player-health" className=" w-[100%]  bg-green-600 block"></div>
      </div>
      <div id="timer" className="bg-amber-500 h-[32px] text-center w-[10%] ">
        {seconds}
      </div>
      <div className="flex w-full h-[32px]  justify-start">
        <div id="enemy-health" className=" w-[100%] bg-green-600 block"></div>
      </div>
    </div>
  );
}
