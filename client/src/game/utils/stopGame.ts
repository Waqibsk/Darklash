import { timerId } from '../../ui/TopBar';
export let GameFinished = false;
export function FinishGame(value: boolean) {
  GameFinished = value;
  if (timerId) {
    clearInterval(timerId);
  }
}
