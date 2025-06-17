import { keys } from "./utils/controls";
import { player,enemy } from "./Fighters/sprite";
import { GameFinished } from "./utils/stopGame";
export function animate(c: CanvasRenderingContext2D) {
let animationID=window.requestAnimationFrame(() => { animate(c)});
  c.fillStyle = "black";
  c.fillRect(0, 0, c.canvas.width, c.canvas.height);
  player.update(c);
  enemy.update(c);
  player.velocity.x = 0;
  enemy.velocity.x = 0;
  if (keys.a.pressed && player.lastkey === "a") {
    player.velocity.x = -6;
  } else if (keys.d.pressed && player.lastkey === "d") {
    player.velocity.x = 6;
  }
  if (keys.j.pressed && enemy.lastkey === "j") {
    enemy.velocity.x = -6;
  } else if (keys.l.pressed && enemy.lastkey === "l") {
    enemy.velocity.x = 6;
  }
  if (GameFinished) {
   window.cancelAnimationFrame(animationID)
 }

}

