import { circleAnimation } from './src/js/2d/animations/circle/circleAnimation';
import { hideAnimation } from './src/js/2d/animations/hideNav/hideAnimation';
import { mouseLeave } from './src/js/2d/animations/horisontalLines/mouseLeave';
import { mouseMove } from './src/js/2d/animations/horisontalLines/mouseMove';

const navButton = document.querySelector('.nav-button');
const navBar = document.querySelector('.menu');
const line = document.querySelector('.line');
const liSpan = document.querySelectorAll('li');
const horisontalLines = document.querySelectorAll('hr');
const spiner = document.querySelector('.spiner');

export let counter = 0;
export const setCounter = (value) => counter = value;

navButton.addEventListener('click', () => {
  
  if(counter === 0) {
    circleAnimation(spiner, navBar, line, horisontalLines, liSpan);
  };
  if(counter === 1) {
    hideAnimation(line, liSpan, horisontalLines, navBar)
  };
});

navBar.addEventListener('mousemove', (e) => mouseMove(horisontalLines, e));

navBar.addEventListener('mouseleave', () => mouseLeave(horisontalLines));