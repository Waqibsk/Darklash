import {SpriteConfig,Vector } from "../../types/sprite";
import { RectangleCollison } from "../utils/rectangleCollison";
import { gravity } from "../utils/constants";




class Sprite {
    position:Vector;
  velocity: Vector;
  color: string;
  height: number = 70;
  width: number = 60;
  lastkey: string = '';
  health: number = 100;
  isAttacking: boolean = false;
  attackBox: {
    position:Vector;
    offset: Vector;
    width: number;
    height: number;
  };
  constructor({ position, velocity, offset, color }: SpriteConfig) {
    this.position = position;
    this.velocity = velocity;
    this.color = color;
    this.height = 70;
    this.width = 60;
    this.lastkey;
    this.health = 100;
    this.isAttacking = false;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: offset,
      width: 100,
      height: 30,
    };
  }

  draw(c:CanvasRenderingContext2D) {
    if (this.isAttacking) {
    c.fillStyle = "red";
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
 
    }
   c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(c:CanvasRenderingContext2D) {
    this.draw(c);
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y - this.attackBox.offset.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    // console.log(this.velocity.y);


    if (this.position.y + this.height + this.velocity.y >= c.canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }

    if (RectangleCollison( player, enemy ) && this.color===player.color&& player.isAttacking) {
      console.log("hero  attacked:");
      enemy.health -= 20;
      const enemyHealthBar = document.getElementById("enemy-health") as HTMLElement | null;
      if (enemyHealthBar) {
        if (enemy.health >= 0) {
          
        enemyHealthBar.style.width = enemy.health + '%';
        }
        console.log("yo")
      }

    }
    if (RectangleCollison(enemy, player) && this.color==enemy.color&& enemy.isAttacking) {
      console.log("enemy attacked")
      player.health -= 20;
      const playerHealthBar = document.getElementById("player-health") as HTMLElement | null;
      if (playerHealthBar) {
        if (player.health >= 0) {
          playerHealthBar.style.width=player.health+'%'
        }
      }
    }
    if (this.isAttacking) {
      setTimeout(() => {
  this.isAttacking=false
},0.1)

    }
  }
}
export const player = new Sprite({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: -60, y: 0 },
  color: "pink",
});
export const enemy = new Sprite({
  position: { x: 560, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 60, y: 0 },
  color: "orange",
});