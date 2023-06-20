import gsap from 'gsap';

const socialLinks = document.querySelectorAll('.socialLinks span');

const socialTimeline = gsap.timeline();

export function socialLinksMove () {
  socialTimeline.to(socialLinks[0], {
    duration: 0.1,
    scale: 0.5
  })
  .to(socialLinks[0], {
    duration: 0.1,
    rotate: -90,
    x: -180,
    yPercent: 70
  })
  .to(socialLinks[0], {
    duration: 0.1,
    scale: 1
  });
}

const socialTimelineBack = gsap.timeline();
export function socialLinkBack () {
  socialTimelineBack.to(socialLinks[0], {
    delay: 1,
    duration: 0.1,
    scaleY: 0
  })
  .to(socialLinks[0], {
    duration: 0.1,
    rotate: 0,
    x: 0,
    yPercent: 0
  })
  .to(socialLinks[0], {
    duration: 0.1,
    scaleY: 1
  })
}