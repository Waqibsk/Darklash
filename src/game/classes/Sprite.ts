import { Vector } from "../../types/sprite";
import { SpriteConfig } from "../../types/sprite";
import bgImage from "../../assets/fightingbg.jpg"
class Sprite{
    position:Vector
    height: number
    width:number
      image: HTMLImageElement;
    constructor({ position,imageSrc }:SpriteConfig ) {
        this.position = position;
        this.height = 80
        this.width = 70;  
        this.image=new Image()
        this.image.src=imageSrc
    }
    draw(c:CanvasRenderingContext2D) {
c.drawImage(this.image,this.position.x,this.position.y,c.canvas.width,c.canvas.height)
    }
    update(c:CanvasRenderingContext2D) {
        this.draw(c)
    }
}
export const backGround = new Sprite({
    position: {
        x: 0,
        y:0,
    },imageSrc:bgImage

})