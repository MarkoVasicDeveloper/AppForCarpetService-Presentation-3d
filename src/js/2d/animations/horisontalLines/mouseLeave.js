import gsap from 'gsap';

export function mouseLeave (horisontalLines) {
  const lines = Array.from(horisontalLines);
  lines.forEach(line => {
    gsap.to(line, {
      duration: 0.5,
      x: 80
    })
  })
};