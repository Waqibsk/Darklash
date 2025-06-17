import { attackBox } from "./attackBox"
export type Vector = {
    x:number,y:number
}
export type PlayerConfig = {
    position: Vector,
    velocity: Vector,
    offset: Vector,
    color:string,
}

export type SpriteConfig = {
    position: Vector,
    imageSrc:string
}

export type Player = {
    position:Vector,
    velocity:Vector,
    color: string,
    height: number,
    width:number,
    lastkey: string,
    attackBox:attackBox,
    isAttacking: boolean,
    draw: (c:CanvasRenderingContext2D) => void,
    update: (c:CanvasRenderingContext2D) => void,
    
}
