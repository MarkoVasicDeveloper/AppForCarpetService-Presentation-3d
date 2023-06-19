import * as THREE from 'three';
import { rand } from './rand';

import fragment from './shaders/fragmentShader.glsl';
import vertex from './shaders/vertexShader.glsl';
import { textures } from './textures';

export function imageParticle () {
  const geometry = new THREE.BufferGeometry();

  let points = 512 * 512;

  let positions = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
  let coordinates = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
  let speed = new THREE.BufferAttribute(new Float32Array(points), 1);
  let offset = new THREE.BufferAttribute(new Float32Array(points), 1);
  let direction = new THREE.BufferAttribute(new Float32Array(points), 1);
  let press = new THREE.BufferAttribute(new Float32Array(points), 1);

  let index = 0;
  for (let i = 0; i < 512; i++) {
      let posX = i - 128;
      for (let j = 0; j < 512; j++) {
          positions.setXYZ(index, posX * 2, (j - 256) * 2, 0);
          coordinates.setXYZ(index, i, j, 0);
          speed.setX(index, rand(0.1, 10));
          offset.setX(index, rand(-1000, 1000));
          direction.setX(index, Math.random() > 0.5 ? 1 : -1);
          press.setX(index, rand(0.4, 1));
          index++
      }
  };

  geometry.setAttribute('position', positions);
  geometry.setAttribute('aCoordinates', coordinates);
  geometry.setAttribute('aSpeed', speed);
  geometry.setAttribute('aOffset', offset);
  geometry.setAttribute('aDirection', direction);
  geometry.setAttribute('aPress', press);

  const material = new THREE.ShaderMaterial({
    uniforms: {
        progress: {type: 'f', value: 0},
        texture1: {type: 't', value: textures[0]},
        texture2: {type: 't', value: textures[1]},
        move: {type: 'f', value: 0},
        time: {type: 'f', value: 0},
        mouse: {type: 'v2', value: null},
        mousePressed: {type: 'float', value: 0},
        mouseMoveX: {type: 'f', value: 0},
        mouseMoveY: {type: 'f', value: 0},
        transition: {type: 'f', value: 0},
        moveImage: {type: 'f', value: 0},
    },
    fragmentShader: fragment,
    vertexShader: vertex,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    depthTest: false
  });
  const mesh = new THREE.Points(geometry, material);

  return { mesh, material }
}