import * as THREE from 'three';

export function Stage () {
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerWidth, 0.1, 3000);
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({antialias: true});
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.set(0, 0, 1000);

  const ambientalLight = new THREE.AmbientLight(0xffffff, 10);

  renderer.autoClear = false;
  renderer.setClearColor(new THREE.Color('#111111'));
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene.add(camera, ambientalLight)

  return {camera, scene, renderer }
}