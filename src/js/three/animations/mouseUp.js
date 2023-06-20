import gsap from 'gsap';

export function mouseUp (mousePressed) {
  gsap.to(mousePressed, {
    duration: 1,
    value: 0,
    ease: 'elastic.out(1, 0.3)'
  })
}