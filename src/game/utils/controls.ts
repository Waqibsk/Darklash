import { Player } from "../../types/sprite";

export const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  j: {
    pressed: false,
  },
  l: {
    pressed: false,
  },
};

export function setControls(player: Player, enemy: Player) {
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "a":
        keys.a.pressed = true;
        player.lastkey = "a";
        break;
      case "d":
        keys.d.pressed = true;
        player.lastkey = "d";
        break;
      case "w":
        player.velocity.y = -15;
        break;
      case "j":
        keys.j.pressed = true;
        enemy.lastkey = "j";
        break;
      case "l":
        keys.l.pressed = true;
        enemy.lastkey = "l";
        break;
      case "i":
        enemy.velocity.y = -15;
        break;
      case "e":
        player.isAttacking = true;
        break;
      case " ":
        enemy.isAttacking = true;
        break;
    }
  });
  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "a":
        keys.a.pressed = false;

        break;
      case "d":
        keys.d.pressed = false;
        break;
      case "j":
        keys.j.pressed = false;

        break;
      case "l":
        keys.l.pressed = false;
        break;
    }
  });
}
