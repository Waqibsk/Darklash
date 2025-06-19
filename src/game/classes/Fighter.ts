import { PlayerConfig, sprite, Vector } from "../../types/sprite";
import { RectangleCollison } from "../utils/rectangleCollison";
import { gravity } from "../utils/constants";
import { FinishGame } from "../utils/stopGame";
import heroJump from "../../assets/Knight_1/Jump.png";
import { Sprites } from "../../types/sprite";
import heroIdle from "../../assets/Knight_1/Idle2.png";
import enemyIdle from "../../assets/Knight_2/Idle3.png";
import enemyRun from "../../assets/Knight_2/Run.png";
import heroRun from "../../assets/Knight_1/Run.png";
import heroAttack from "../../assets/Knight_1/Attack 2.png";

import enemyAttack from "../../assets/Knight_2/Attack 1.png";
class Fighter {
  position: Vector;
  velocity: Vector;
  color: string;
  height: number = 70;
  width: number = 60;
  lastkey: string = "";
  health: number = 100;
hasHit:boolean
  isAttacking: boolean = false;
  attackBox: {
    position: Vector;
    offset: Vector;
    width: number;
    height: number;
  };
  image: HTMLImageElement;
  animationComplete: boolean;
  scale: number;
  maxFrames: number;
  currentFrame: number;
  frameDelay: number;
  frameCount: number;
  sprites: Sprites;
  offset: Vector;
  currentSprite: string;
  constructor({
    position,
    velocity,
    sprites,
    scale,
    maxFrames,
    offset,
    color,
    attackOffset,
  }: PlayerConfig) {
    this.position = position;
    this.velocity = velocity;
    this.color = color;
    this.height = 170;
    this.width = 60;
    this.lastkey;
    this.hasHit=false
    this.offset = offset;
    this.health = 100;
    this.isAttacking = false;
    this.animationComplete = false;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackOffset,
      width: 120,
      height: 30,
    };
    this.sprites = sprites;
    this.image = new Image();
    this.image.src = sprites.idle.imageSrc;
    this.scale = scale;
    this.maxFrames = maxFrames;
    this.currentFrame = 0;
    this.frameDelay = 8;
    this.frameCount = 0;
    this.currentSprite="idle"
  }

  draw(c: CanvasRenderingContext2D) {
    const viewWidth = this.image.width / this.maxFrames;
    c.drawImage(
      this.image,
      //croping image
      this.currentFrame * viewWidth,
      0,
      viewWidth,
      this.image.height,

      //croping ended
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      viewWidth * this.scale,
      this.image.height * this.scale
    );
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c);

    this.frameCount++;
    if (this.frameCount % this.frameDelay === 0) {
      if (this.currentFrame < this.maxFrames - 1) {
      this.currentFrame++
    }
      else {
        this.animationComplete=true
        this.currentFrame = 0;
    }
    }
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y - this.attackBox.offset.y;
    // c.fillStyle = "pink"; c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    // console.log(this.velocity.y);

    if (
      this.position.y + this.height + this.velocity.y >=
      c.canvas.height - 40
    ) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }

    if (
      RectangleCollison(player, enemy) &&
      this.color === player.color &&
      player.isAttacking && player.currentFrame===this.sprites.attack1.Maxframes-1 && !player.hasHit
    ) {
      console.log("hero  attacked:");
      player.hasHit=true
      enemy.health -= 20;
      const enemyHealthBar = document.getElementById(
        "enemy-health"
      ) as HTMLElement | null;
      if (enemyHealthBar) {
        if (enemy.health >= 0) {
          enemyHealthBar.style.width = enemy.health + "%";
        }
      }
    }
    if (
      RectangleCollison(enemy, player) &&
      this.color == enemy.color &&
      enemy.isAttacking && enemy.currentFrame==2 && !enemy.hasHit
    ) {
      console.log("enemy attacked");
      enemy.hasHit=true
      player.health -= 20;
      const playerHealthBar = document.getElementById(
        "player-health"
      ) as HTMLElement | null;
      if (playerHealthBar) {
        if (player.health >= 0) {
          playerHealthBar.style.width = player.health + "%";
        }
      }
    }

  if(this.isAttacking &&this.currentFrame===this.maxFrames-1 ) {
this.isAttacking=false
    this.hasHit = false
    console.log("HI")
    this.switchSprite("idle")
  }
    const time = document.getElementById("timer") as HTMLElement | null;
    if (
      (time && parseInt(time.innerText) === 0) ||
      player.health === 0 ||
      enemy.health === 0
    ) {

      const gameOverBox = document.getElementById(
        "gameOver"
      ) as HTMLElement | null;
      const gameOverTitle = document.getElementById(
        "gameOverTitle"
      ) as HTMLElement | null;

      if (gameOverTitle && gameOverBox) {
        if (time && parseInt(time.innerText) === 0) {
          if (player.health === enemy.health) {
            gameOverTitle.innerText = "TIED";
          } else if (player.health > enemy.health) {
            gameOverTitle.innerText = "HERO WINS";
          } else {
            gameOverTitle.innerText = "ENEMY WINS";
          }
        } else {
          if (player.health === 0) {
            gameOverTitle.innerText = "ENEMY WINS";
          } else if (enemy.health === 0) {
            gameOverTitle.innerText = "HERO WINS";
          }
        }
        // FinishGame(true);
        // gameOverBox.classList.remove("hidden");
      }
    }
  }


  attack() {
    this.animationComplete=false
    this.isAttacking = true;
    this.switchSprite("attack1")
   
  }

  switchSprite(sprite: string) {
    if(this.currentSprite==="attack1"&&!this.animationComplete ) return
    switch (sprite) {
      case "idle":
        if (this.currentSprite!=="idle") {
          this.image.src = this.sprites.idle.imageSrc;
          this.maxFrames = this.sprites.idle.Maxframes;

          this.currentFrame=0
          this.currentSprite="idle"
        }

        break;
      case "run":
        if (this.currentSprite!=="run") {
          this.image.src = this.sprites.run.imageSrc;
          this.maxFrames = this.sprites.run.Maxframes;
          this.currentSprite="run"
          this.currentFrame=0
        }

        break;
      case "attack1":
        if (this.currentSprite!=="attack1") {
          this.image.src = this.sprites.attack1.imageSrc;
          this.maxFrames = this.sprites.attack1.Maxframes;
          this.currentFrame=0
          this.currentSprite="attack1"
        }
        

        break;
      default:
        break;
    }
  }
}
export const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 60 },
  color: "pink",
  sprites: {
    idle: {
      imageSrc: heroIdle,
      Maxframes: 4,
    },
    run: {
      imageSrc: heroRun,
      Maxframes: 7,
    },
    attack1: {
      imageSrc: heroAttack,
      Maxframes:4
    },
  },
  attackOffset: {
    x: -50,
    y:-80,
  },
  maxFrames: 4,
  scale: 3,
});
export const enemy = new Fighter({
  position: { x: 560, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 60 },
  color: "orange",
  sprites: {
    idle: {
      imageSrc: enemyIdle,
      Maxframes: 4,
    },
    run: {
      imageSrc: enemyRun,
      Maxframes: 7,
    },
    attack1: {
      imageSrc: enemyAttack,
      Maxframes:5
    }
  },
 attackOffset: {
    x: 0,
    y:-80,
  },
  maxFrames: 4,
  scale: 3,
});
