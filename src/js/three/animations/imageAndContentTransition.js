import gsap from 'gsap';
import { textures } from '../textures';

export const tl = gsap.timeline({paused: true});

const lampDiv = document.querySelectorAll('.uvLampDiv');
const lampDivArray = Array.from(lampDiv);
const lamp = document.querySelectorAll('.lamp');
const lampArray = Array.from(lamp);

const content = document.querySelectorAll('.transform');
const contentArray = Array.from(content);

export let prev = 0;
export let next = 1;

let contentCounter = 0;

let last = true;

export function imageAndContentTransition (transition, moveImage) {
  if (tl.isActive()) return;
  tl.play()

  contentCounter++;
  if (contentCounter > contentArray.length - 1) contentCounter = 0;

  contentArray.forEach(item => {
    tl.to(item, {
      duration: 0.01,
      xPercent: -200
    })
  });

  lampArray.forEach(item => {
    tl.to(item, {
      duration: 0.001,
      scale: 0
    })
  });

  lampDivArray.forEach(item => {
    tl.to(item, {
      duration: 0.001,
      width: '100%'
    })
  })
  
  tl.to(transition, {
      duration: 1.5,
      value: 0
  })
  .to(moveImage, {
      duration: 0.05,
      value: last ? 1 : 0,
      onComplete: () => {

          if (!last) {
              prev += 2;
              return;
          }

          if(prev >= textures.length){
                  prev = 0;
              }

          if(next >= textures.length - 1 && last){
              next = 1;
              return;
          }
          next += 2;
      }
  })
  .to(transition, {
      duration: 0.5,
      value: 1,
  })

  .to(contentArray[contentCounter], {
    delay: 0.5,
    duration: 0.01,
    xPercent: 200
  })

  .to(lampArray[contentCounter], {
    duration: 0.5,
    scale: 1
  })

  .to(lampDivArray[contentCounter], {
    duration: 1,
    width: 5
  })

  .to(lampArray[contentCounter], {
    duration: 0.5,
    scale: 0
  })

  .to(lampDivArray[contentCounter], {
    duration: 0.1,
    width: 0,
    onComplete: () => {
          tl.pause()
      }
  })
  last = !last;
};
