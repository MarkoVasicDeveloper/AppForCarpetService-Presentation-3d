import gsap from 'gsap';

export function onLoad (transition) {
  gsap.to(transition, {
    delay: 1,
    duration: 2,
    value: 1
  });
}