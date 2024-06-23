import gsap from 'gsap';

import { counter, setAnimating, setCounter } from "../../../..";

const tl = gsap.timeline({paused: true});

export function showAnimation (line, horisontalLines, liSpan) {
  tl.play()

  tl.add('start');

  tl.to(line, { 
    scaleY: 1,
    transformOrigin: 'top bottom',
    duration: 1,
    ease: "power2.out"
  });

  horisontalLines.forEach((line, index) => {
    tl.to(line, { 
      x: 80,
      duration: 0.2,
      ease: "back.out(1.7)"
    }, index === 0 ? 'start' : '<=0.1');
  })

  liSpan.forEach((element, index) => {
    tl.to(element, { 
      opacity: 1,
      duration: 2,
      delay: index === 0 ? 0.2 : 0,
      ease: "slow(0.7, 0.7, false)",
      onComplete: () => index === liSpan.length - 1 ? setAnimating(false) : null
    }, index === 0 ? 'start' : '<=0.3');
  });
  setCounter(counter + 1);
}