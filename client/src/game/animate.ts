import { keys } from "./utils/controls";
import { player, enemy } from "./classes/Fighter";
import { GameFinished } from "./utils/stopGame";
import { backGround } from "./classes/Background";
import { Socket } from "socket.io-client";
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
 console.log("current sprite",player.currentSprite)
 if (keys.j.pressed && enemy.lastkey === "j") {
   enemy.switchSprite("run");

    enemy.velocity.x = -6;
  } else if (keys.l.pressed && enemy.lastkey === "l") {
   enemy.switchSprite("run");
    enemy.velocity.x = 6;
  }
 else {
enemy.switchSprite("idle")
  }
  if (GameFinished) {
    window.cancelAnimationFrame(animationID);
  }
}
let lastEmit = Date.now();

export function animateMP(c: CanvasRenderingContext2D, socket: Socket,role:string) {
  let animationID = window.requestAnimationFrame(() => {
    animateMP(c, socket,role);
  });
  c.fillStyle = "black";
  c.fillRect(0, 0, c.canvas.width, c.canvas.height);
  backGround.update(c);
  const localFighter = role === "player" ? player : enemy;
  const remoteFighter = role === "player" ? enemy : player;


  console.log("HELLEO THIS IS THE ROLE",role)
  localFighter.update(c);

  localFighter.velocity.x = 0;
  // console.log("localfigther", localFighter.color)

  //   console.log("remoteFighter", remoteFighter.color)

  if (keys.a.pressed && localFighter.lastkey === "a") {

    localFighter.switchSprite("run");
    localFighter.velocity.x = -6;
  } else if (keys.d.pressed && localFighter.lastkey === "d") {
    localFighter.switchSprite("run");
    localFighter.velocity.x = 6;
  } else {
    localFighter.switchSprite("idle");
  }

  if (Date.now() - lastEmit > 50) {
    socket.emit("updateFighters",localFighter.toJSON());
    lastEmit = Date.now();
  }

  remoteFighter.update(c);
  if (GameFinished) {
    window.cancelAnimationFrame(animationID);
  }
}