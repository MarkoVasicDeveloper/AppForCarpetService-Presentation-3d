import gsap from 'gsap';

const home = document.querySelector('.home');

const lampDiv = document.querySelectorAll('.uvLampDiv');
const lampDivArray = Array.from(lampDiv);
const lamp = document.querySelectorAll('.lamp');
const lampArray = Array.from(lamp);

const lampTimeline = gsap.timeline();

export let loaded = false;

export function contentOnLoad () {
  if (loaded) return;
  lampTimeline.to(home, {
    delay: 2.7,
    duration: 0.1,
    xPercent: 200
  })
  .to(lampArray[0], {
    duration: 0.5,
    scale: 1
  })
  .to(lampDivArray[0], {
    duration: 1,
    width: 5
  })
  .to(lampArray[0], {
    duration: 0.5,
    scale: 0
  });
  loaded = true;
}