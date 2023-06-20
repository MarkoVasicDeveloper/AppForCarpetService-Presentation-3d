import gsap from 'gsap';

export function mouseMove (horisontalLines, e) {
  let lineWidth = 10;
  let lineUp = true;
  const line = Array.from(horisontalLines);
  line.forEach(singleLine => {
    let linePosition = singleLine.getBoundingClientRect();
    let y = e.clientY;

    if (y + 75 >= Number(linePosition.top.toFixed(0)) && Number(linePosition.top.toFixed(0)) > y - 25) {
      gsap.to(singleLine, {
        duration: 0.5,
        x: 80 - lineWidth,
      })
      if(lineUp) {
        lineWidth += 10;
        if(lineWidth === 60) lineUp = false;
      }else {
        lineWidth -= 10;
        if(lineWidth === 0) lineUp = true;
      }
    } else {
      gsap.to(singleLine, {
        duration: 0.5,
        x: 80
      })
    }
  });
}