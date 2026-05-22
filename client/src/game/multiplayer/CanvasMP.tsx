import { useEffect } from 'react';
import { useRef } from 'react';
import { startMultiplayerGame } from '../gameLoader';
import { useSocket } from '../../components/SocketProvider';
import { enemy, player } from '../classes/Fighter';
import { CanvasProps } from '../../types/canvas';
export default function CanvasMP({ role }: CanvasProps) {
  const socket = useSocket();
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

    const remoteFighter = role === 'player' ? enemy : player;
    socket.on('updatingFighters', (data) => {
      remoteFighter.updateFromJSON(data);
    });
    startMultiplayerGame(canvasContext, socket, role);
    //     return (() => {
    //   socket.off("updateEnemy")
    // })

    return () => {
      socket.off('updatingFighters');
    };
  }, [socket]);

  return <canvas ref={canvasRef} />;
}
