import gsap from 'gsap';

import { counter, setCounter } from "../../../..";
import { tl3 } from '../circle/circleAnimation';

const tl2 = gsap.timeline({paused: true});

export function hideAnimation (line, liSpan, horisontalLines, navBar) {
  tl2.add('start');
  tl2.play();
  horisontalLines.forEach((line, index) => {
    tl2.to(line, { 
      x: 100,
      duration: 0.001,
      ease: "back.out(1.7)"
    }, index === 0 ? 'start' : '<=0.05');
  });

  tl2.to(line, { 
    scaleY: 0,
    duration: 0.5
  }, 'start');

  liSpan.forEach((element) => {
    tl2.to(element, { 
      opacity: 0,
      duration: 0.5,
      ease: "slow(0.7, 0.7, false)"
    }, '<=0.3');
  });

  gsap.delayedCall(1, () => tl3.reverse());

  tl2.to(navBar, { 
    x: 400,
    duration: 0.01,
    delay: 0.4
  });

  setCounter(0);
}