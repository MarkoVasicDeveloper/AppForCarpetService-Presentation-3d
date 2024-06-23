import gsap from 'gsap';
import { setAnimating } from '../../../..';

const socialLinks = document.querySelectorAll('.socialLinks span');
const reversedSocialLinks = Array.from(socialLinks).reverse();

let timelineCreated = false;
let socialTimeline = gsap.timeline({ paused: true });

function createTimeline() {
  let totalHeight = 0;
  reversedSocialLinks.forEach((link, index) => {
    const linkRect = link.getBoundingClientRect();
    totalHeight -= index === reversedSocialLinks.length - 1 ? linkRect.height / 2 + 25 : linkRect.height + 10;

    socialTimeline.to(link, {
      duration: 0.1,
      scale: 0.5,
      onStart: () => index === 0 ? setAnimating(true) : null
    })
    .to(link, {
      duration: 0.1,
      rotate: index === reversedSocialLinks.length - 1 ? -90 : 0,
      x: totalHeight,
      y: index === reversedSocialLinks.length - 1 ? window.innerHeight - linkRect.bottom + linkRect.height / 2 - linkRect.width / 3: window.innerHeight - linkRect.bottom
    })
    .to(link, {
      duration: 0.1,
      scale: 1
    });
  });
  timelineCreated = true;
}

export function socialLinksMove() {
  if(!timelineCreated) createTimeline();
  socialTimeline.play();
}

export function socialLinkBack() {
  setTimeout(() => socialTimeline.reverse(), 1000);
}
