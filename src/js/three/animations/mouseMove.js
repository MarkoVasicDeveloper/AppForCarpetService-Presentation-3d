import gsap from 'gsap';
import { mousePoints } from '../raycaster/raycasterIntercept';

export function mouseMove (mouseMoveX, mouseMoveY) {
  gsap.to(mouseMoveX, {
    duration: 1,
    value: mousePoints.x,
    ease: 'ease.InOut'
  });

  gsap.to(mouseMoveY, {
    duration: 1,
    value: mousePoints.y,
    ease: 'ease.InOut'
  })
}