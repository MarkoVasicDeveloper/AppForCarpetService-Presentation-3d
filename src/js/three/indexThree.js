import * as THREE from 'three';

import { Stage } from "./Stage";
import { imageParticle } from './imageParticle';
import { textures, loadingManager } from './textures';

import { imageAndContentTransition, next, prev } from './animations/imageAndContentTransition';
import { mouseDown } from './animations/mouseDown';
import { mouseUp } from './animations/mouseUp';
import { onLoad } from './onLoad';
import { contentOnLoad } from '../2d/animations/contentOnLoad/contentOnLoad';
import { launchFullScreen } from '../fullScreen';

import { mousePoints, raycasterIntercept } from './raycaster/raycasterIntercept';
import { backgroundParticle } from './backgroundParticle';
import { mouseMove } from '../2d/animations/horisontalLines/mouseMove';

let time = new THREE.Clock();
let move = 0;

const progressBar = document.getElementById('progressBar');
const label = document.querySelector('label');
const enterButton = document.getElementById('enter');
const loadingContent = document.querySelector('.loadingContent');
const logo = document.querySelector('svg text');

let strokeOfset = 2550;

loadingManager.onProgress = function(url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
    strokeOfset -= ((loaded / total) * 100 * 4);
    if(strokeOfset < 0) strokeOfset = 0;
    logo.style.strokeDashoffset = strokeOfset;
}

loadingManager.onLoad = function() {
    enterButton.classList.remove('hidden');
    progressBar.classList.add('hidden');
    label.innerText = 'Ready!';
}

screen.orientation.addEventListener('change', () => {
    launchFullScreen(document.documentElement);
    if(screen.orientation.type === 'landscape-secondary' || screen.orientation.type === 'landscape-primary' ) {
        loadingContent.style.display = 'none';
        onLoad(material.uniforms.transition);
        contentOnLoad();
        return;
    }
    loadingContent.style.display = 'flex';
    label.innerText = 'Rotate device!';
    return;
})

enterButton.onclick = () => {
    if(window.innerHeight > window.innerWidth) {
        enterButton.style.display = 'none';
        launchFullScreen(document.documentElement);
        if(screen.orientation.type === 'landscape' || screen.orientation.type === 'landscape-primary' ) {
            loadingContent.style.display = 'none';
            onLoad(material.uniforms.transition);
            contentOnLoad();
            return;
        }
        loadingContent.style.display = 'flex';
        label.innerText = 'Rotate device!';
        return;
    }
    loadingContent.style.display = 'none';
    onLoad(material.uniforms.transition);
    contentOnLoad();
}

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

window.addEventListener('mousemove', (event) => {
    raycasterIntercept(event, camera);
    mouseMove(material.uniforms.mouseMoveX, material.uniforms.mouseMoveY);
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