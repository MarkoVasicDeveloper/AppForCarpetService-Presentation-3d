varying vec2 vUv;

uniform float time;

void main() {
  vUv = uv;
  
  vec3 pos = position;
  
  pos.z += mod(100. * time, 2000.) - 1000.;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);
  gl_PointSize = 5000. * (1. / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}