import { player, enemy } from './classes/Fighter';
import { animate, animateMP } from './animate';
import { setControls, setControlsMP } from './utils/controls';
import { Socket } from 'socket.io-client';

export function startGame(c: CanvasRenderingContext2D) {
  c.fillStyle = 'red';
  c.fillRect(0, 0, c.canvas.width, c.canvas.height);
  player.draw(c);
  enemy.draw(c);
  setControls(player, enemy);
  animate(c);
}

export function startMultiplayerGame(
  c: CanvasRenderingContext2D,
  socket: Socket,
  role: string,
) {
  c.fillStyle = 'red';
  c.fillRect(0, 0, c.canvas.width, c.canvas.height);
  player.draw(c);
  enemy.draw(c);
  const localFighter = role === 'player' ? player : enemy;
  setControlsMP(localFighter);
  animateMP(c, socket, role);
}
