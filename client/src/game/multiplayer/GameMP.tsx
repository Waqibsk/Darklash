import React from "react";
import TopBar from "../../ui/TopBar";
import GameOver from "../../ui/GameOver";
import CanvasMP from "./CanvasMP";
import { CanvasProps } from "../../types/canvas";
export default function GameMP({role}:CanvasProps) {

  return (
    <div>
      <div className="w-screen relative ">
        <TopBar />

        <div className="absolute  top-[40%] left-[32%] ">
          <GameOver />
        </div>
        <CanvasMP role={role} />
      </div>
    </div>
  );
}
