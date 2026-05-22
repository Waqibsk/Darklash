import { useEffect, useState } from 'react';
export let timerId: ReturnType<typeof setInterval> | null = null;
export default function TopBar() {
  const [seconds, setSeconds] = useState(60);
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
    <div className="bg-black flex  w-full items-center text-sm text-white">
      <div className="flex w-full h-[42px] justify-end m-2">
        <div
          id="player-health"
          className=" w-[100%]   rounded-xl bg-green-900 block"
        ></div>
      </div>
      <div
        id="timer"
        className="bg-black h-[42px] text-center font-retro2 text-3xl  w-[10%] "
      >
        {seconds}
      </div>
      <div className="flex w-full h-[42px]  justify-start">
        <div
          id="enemy-health"
          className=" w-[100%]  rounded-xl bg-green-900 block"
        ></div>
      </div>
    </div>
  );
}
