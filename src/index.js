import { circleAnimation } from './js/2d/animations/circle/circleAnimation';
import { hideAnimation } from './js/2d/animations/hideNav/hideAnimation';
import { mouseLeave } from './js/2d/animations/horisontalLines/mouseLeave';
import { mouseMove } from './js/2d/animations/horisontalLines/mouseMove';

import { socialLinksMove, socialLinkBack } from './js/2d/animations/socialLink/socialLink';``

const navButton = document.querySelector('.nav-button');
const navBar = document.querySelector('.menu');
const line = document.querySelector('.line');
const liSpan = document.querySelectorAll('li');
const horisontalLines = document.querySelectorAll('hr');
const spiner = document.querySelector('.spiner');

export let counter = 0;
export const setCounter = (value) => counter = value;

export let isAnimating = false;
export const setAnimating = (value) => isAnimating = value;

navButton.addEventListener('click', () => {
  if (isAnimating) return;
  if(counter === 0) {
    socialLinksMove();
    circleAnimation(spiner, navBar, line, horisontalLines, liSpan);
  };
  if(counter === 1) {
    socialLinkBack();
    hideAnimation(line, liSpan, horisontalLines, navBar)
  };
});

navBar.addEventListener('mousemove', (e) => mouseMove(horisontalLines, e));

navBar.addEventListener('mouseleave', () => mouseLeave(horisontalLines));