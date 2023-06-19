import * as THREE from 'three';

import { Stage } from "./Stage";

const { camera, scene, renderer } = Stage();

scene.add(bgMesh);
scene.add(mesh);

function animation() {
    
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame( animation );
}

animation();