import { attackBox } from "./attackBox"
export type Vector = {
    x:number,y:number
}
export type PlayerConfig = {
    position: Vector,
    velocity: Vector,
    offset: Vector,
    color: string,
    sprites:Sprites
    scale:number
    maxFrames: number;

}

export type BGConfig = {
    position: Vector,
    imageSrc:string
}
export type sprite = {
    // image: HTMLImageElement;
    imageSrc: string;
    Maxframes:number
}
export type Sprites = {
    idle: sprite,
    run:sprite,
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
