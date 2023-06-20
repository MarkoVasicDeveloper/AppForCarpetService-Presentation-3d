import gsap from 'gsap';

export function mouseDown (mousePressed) {
  gsap.to(mousePressed, {
    duration: 1,
    value: 1,
    ease: 'elastic.out(1, 0.3)'
  })
}