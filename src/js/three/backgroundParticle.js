import * as THREE from 'three';

import backgroundFragment from './shaders/backgroundFragment.glsl';
import backgroundVertex from './shaders/backgroundVertex.glsl';

import letter from '../../img/letter-w-min.png';

export function backgroundParticle (time) {
  let numberOfPoints = 48 * 48;
  const bgGeometry = new THREE.BufferGeometry();

  const bgPosition = new THREE.BufferAttribute(new Float32Array(numberOfPoints * 3), 3);


  let bgIndex = 0;
  for(let i = 0; i < 48; i++) {
      let posX = i - 24;
      for(let j = 0; j < 48; j++){
          bgPosition.setXYZ(bgIndex, posX * 50, (j - 24) * 50, Math.random() * 20000);
          bgIndex++;
      }
  }

  const bgMaterial = new THREE.ShaderMaterial({
      fragmentShader: backgroundFragment,
      vertexShader: backgroundVertex,
      uniforms: {
          time: {type: 'f', time},
          texture1: {type: 't', value: new THREE.TextureLoader().load(letter)}
      },
      transparent: true,
      depthTest: false,
      depthWrite: false
  });

  const bgMesh = new THREE.Points(bgGeometry, bgMaterial);

  bgMesh.position.z = -2010;

  bgGeometry.setAttribute('position', bgPosition);

  return { bgMesh, bgMaterial };
}
