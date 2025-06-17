import { PlayerConfig, sprite, Vector } from "../../types/sprite";
import { RectangleCollison } from "../utils/rectangleCollison";
import { gravity } from "../utils/constants";
import { FinishGame } from "../utils/stopGame";
import heroJump from "../../assets/Knight_1/Jump.png"
import { Sprites } from "../../types/sprite";
import heroIdle from "../../assets/Knight_1/Idle2.png";
import enemyIdle from "../../assets/Knight_2/Idle2.png";
import enemyRun from "../../assets/Knight_2/Run.png";
import heroRun from "../../assets/Knight_1/Run.png";
class Fighter {
  position: Vector;
  velocity: Vector;
  color: string;
  height: number = 70;
  width: number = 60;
  lastkey: string = "";
  health: number = 100;

  isAttacking: boolean = false;
  attackBox: {
    position: Vector;
    offset: Vector;
    width: number;
    height: number;
  };
  image: HTMLImageElement;
  scale: number;
  maxFrames: number;
  currentFrame: number;
  frameDelay: number;
  frameCount: number;
  sprites: Sprites;
  offset:Vector
  constructor({
    position,
    velocity,
    sprites,
    scale,
    maxFrames,
    offset,
    color,
  }: PlayerConfig) {
    this.position = position;
    this.velocity = velocity;
    this.color = color;
    this.height = 170;
    this.width = 60;
    this.lastkey;
    this.offset=offset
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
    this.sprites = sprites;
    this.image = new Image();
    this.image.src = sprites.idle.imageSrc;
    this.scale = scale;
    this.maxFrames = maxFrames;
    this.currentFrame = 0;
    this.frameDelay = 25;
    this.frameCount = 0;
  }

  draw(c: CanvasRenderingContext2D) {
    const viewWidth= (this.image.width / this.maxFrames )
    console.log("view",viewWidth)
    c.drawImage(
      this.image,
      //croping image
      this.currentFrame *viewWidth
      ,
    0,
      viewWidth,
      this.image.height,

      //croping ended
      this.position.x-this.offset.x,
      this.position.y-this.offset.y,
      (viewWidth) *this.scale,
      this.image.height *this.scale
    );
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c);
    
      this.frameCount++;
    if (this.frameCount % this.frameDelay === 0) {
      this.currentFrame = (this.currentFrame + 1) % this.maxFrames;
    }
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y - this.attackBox.offset.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    // console.log(this.velocity.y);

    if (this.position.y + this.height + this.velocity.y >= c.canvas.height-40) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }

    if (
      RectangleCollison(player, enemy) &&
      this.color === player.color &&
      player.isAttacking
    ) {
      console.log("hero  attacked:");
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
      enemy.isAttacking
    ) {
      console.log("enemy attacked");
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
    const time = document.getElementById("timer") as HTMLElement | null;
    if (
      (time && parseInt(time.innerText) === 0) ||
      player.health === 0 ||
      enemy.health === 0
    ) {
      console.log("time up");

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

    if (this.isAttacking) {
      setTimeout(() => {
        this.isAttacking = false;
      }, 0.1);
    }
  }

  switchSprite(sprite: string) {
switch (sprite) {
  case "idle":
    if (player.image.src != this.sprites.idle.imageSrc) {
    player.image.src = this.sprites.idle.imageSrc
      player.maxFrames = this.sprites.idle.Maxframes;
    }

    break;
  case "run":
      if (player.image.src != this.sprites.run.imageSrc) {
    player.image.src = this.sprites.run.imageSrc
    player.maxFrames = this.sprites.run.Maxframes; 

    }

    break;
  case "jump":
      if (player.image.src != this.sprites.run.imageSrc) {
    player.image.src = this.sprites.run.imageSrc
    player.maxFrames = this.sprites.run.Maxframes; 

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
  offset: { x: 0, y: 0 },
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
  },
  maxFrames: 4,
  scale:2,
});
export const enemy = new Fighter({
  position: { x: 560, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
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
  },
  maxFrames: 4,
  scale: 2,
});
