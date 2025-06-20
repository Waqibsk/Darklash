import { Player } from "../../types/sprite"
export function RectangleCollison(rect1:Player , rect2 :Player ){
    return (
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
        rect1.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.attackBox.position.x<=rect2.position.x+rect2.width
    )
}