import * as THREE from 'three';

import { Stage } from "./Stage";
import { imageParticle } from './imageParticle';
import { textures } from './textures';

import { imageAndContentTransition, next, prev } from './animations/imageAndContentTransition';
import { mouseDown } from './animations/mouseDown';
import { mouseUp } from './animations/mouseUp';

import { mousePoints, raycasterIntercept } from './raycaster/raycasterIntercept';
import { backgroundParticle } from './backgroundParticle';

let time = new THREE.Clock();
let move = 0;

const { camera, scene, renderer } = Stage();

const { mesh, material } = imageParticle();
const { bgMesh, bgMaterial } = backgroundParticle(time);

scene.add(mesh);
scene.add(bgMesh);

window.addEventListener('resize', () => onResize(camera, renderer));

window.addEventListener('wheel', (e) => {
    move += e.deltaY / 1000;
    imageAndContentTransition(material.uniforms.transition, material.uniforms.moveImage);
});

window.addEventListener('touchmove', () => {
    imageAndContentTransition(material.uniforms.transition, material.uniforms.moveImage);
});

window.addEventListener('mousedown', (e) => mouseDown(material.uniforms.mousePressed));
window.addEventListener('mouseup', () => mouseUp(material.uniforms.mousePressed));

function animation() {
  material.uniforms.texture1.value = textures[prev];
  material.uniforms.texture2.value = textures[next];
  
  material.uniforms.move.value = move;
  if(move > 10 || move < -10) move = 0;
  material.uniforms.mouse.value = mousePoints;
  material.uniforms.time.value = time.getElapsedTime();
  bgMaterial.uniforms.time.value = time.getElapsedTime();
  
  renderer.clear();
  renderer.render(scene, camera);
  requestAnimationFrame( animation );
}

animation();