import { player,enemy } from "./Fighters/sprite"
import { animate } from "./animate";
import { setControls } from "./utils/controls";
export function startGame(c: CanvasRenderingContext2D) {
    c.fillStyle="red"
    c.fillRect(0, 0, c.canvas.width, c.canvas.height)
    player.draw(c);
    enemy.draw(c);
    setControls(player,enemy)
    animate(c);
}