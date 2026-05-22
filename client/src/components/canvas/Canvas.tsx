import { useEffect } from 'react';
import { useRef } from 'react';
import { startGame } from '../../game/gameLoader';
export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) {
      return;
    }
    startGame(canvasContext);
  }, []);

  return <canvas ref={canvasRef} />;
}
