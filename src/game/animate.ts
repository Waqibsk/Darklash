import { keys } from "./utils/controls";
import { player, enemy } from "./classes/Fighter";
import { GameFinished } from "./utils/stopGame";
import { backGround } from "./classes/Background";
export function animate(c: CanvasRenderingContext2D) {
  let animationID = window.requestAnimationFrame(() => {
    animate(c);
  });
  c.fillStyle = "black";
  c.fillRect(0, 0, c.canvas.width, c.canvas.height);
  backGround.update(c)
  player.update(c);
  enemy.update(c);
  player.velocity.x = 0;
  enemy.velocity.x = 0;

  
  if (keys.a.pressed && player.lastkey === "a") {

player.switchSprite("run")
    player.velocity.x = -6;
  } else if (keys.d.pressed && player.lastkey === "d") {
player.switchSprite("run")
player.velocity.x = 6;
  }
  else {
  player.switchSprite("idle")
  }
  if (keys.j.pressed && enemy.lastkey === "j") {
    enemy.velocity.x = -6;
  } else if (keys.l.pressed && enemy.lastkey === "l") {
    enemy.velocity.x = 6;
  }
  if (GameFinished) {
    window.cancelAnimationFrame(animationID);
  }
}
