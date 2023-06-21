import * as THREE from 'three';

import { Stage } from "./Stage";

import { onResize } from "./onResize";

import { backgroundParticle } from './backgroundParticle';
import { imageParticle } from './imageParticle';
import { textures } from './textures';

import { mouseUp } from './animations/mouseUp';
import { mouseDown } from './animations/mouseDown';
import { mouseMove } from './animations/mouseMove';
import { imageAndContentTransition, next, prev } from './animations/imageAndContentTransition';

import { mousePoints, raycasterIntercept } from './raycaster/raycasterIntercept';

import { goodOrientation, screenOrientation } from './animations/screenOrientation';
import { enter } from './loadingBar';

const label = document.querySelector('label');
const enterButton = document.getElementById('enter');
const loadingContent = document.querySelector('.loadingContent');

let time = new THREE.Clock();
let move = 0;

const { camera, scene, renderer } = Stage();

const { bgMesh, bgMaterial } = backgroundParticle(time);
const { mesh, material } = imageParticle();

scene.add(bgMesh);
scene.add(mesh);

screen.orientation.addEventListener('change', () => screenOrientation(loadingContent, label, material.uniforms.transition));

enterButton.addEventListener('click', () => {
  enter(material.uniforms.transition);

  window.addEventListener('wheel', (e) => {
    move += e.deltaY / 1000;
    imageAndContentTransition(material.uniforms.transition, material.uniforms.moveImage);
  });
  window.addEventListener('mousemove', (event) => {
    raycasterIntercept(event, camera);
    mouseMove(material.uniforms.mouseMoveX, material.uniforms.mouseMoveY);
  });

  window.addEventListener('touchmove', () => {
    if(goodOrientation)
      imageAndContentTransition(material.uniforms.transition, material.uniforms.moveImage);
  });

  window.addEventListener('mousedown', (e) => mouseDown(material.uniforms.mousePressed))
  window.addEventListener('mouseup', () => mouseUp(material.uniforms.mousePressed));
});

window.addEventListener('resize', () => onResize(camera, renderer));

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