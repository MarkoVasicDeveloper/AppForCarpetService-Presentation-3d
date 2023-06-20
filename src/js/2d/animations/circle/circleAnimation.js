import gsap from 'gsap';
import { paths } from './circlePath';
import { counter } from '../../../../..';
import { showAnimation } from '../showNav/showAnimation';

export const tl3 = gsap.timeline({paused: true});

export function circleAnimation (spiner, navBar, line, horisontalLines, liSpan) {
  tl3.play();

  tl3.to(navBar, { 
    x: 0,
    duration: 0.01,
  });
  
  paths.forEach((path, index) => {
    tl3.to(spiner, {
      clipPath: path,
      duration: index % 2 === 0 ? 0.01 : 0.02,
      onComplete: index === paths.length - 1 ?
        () => {
          if (counter === 0 ) showAnimation(line, horisontalLines, liSpan); tl3.pause()} : null
    })
  });
}