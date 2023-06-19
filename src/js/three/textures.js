import * as THREE from 'three';

import washerGirl from '../../img/laptop-min.png';
import laptop from '../../img/laptop-3-min.png';
import free from '../../img/free-min.png';
import businessman from '../../img/businessman-money-min.png';
import fast from '../../img/fast-min.png';
import paper from '../../img/paper-min.png';

export const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

export const textures = [
  textureLoader.load(washerGirl),
  textureLoader.load(laptop),
  textureLoader.load(free),
  textureLoader.load(businessman),
  textureLoader.load(fast),
  textureLoader.load(paper)
]