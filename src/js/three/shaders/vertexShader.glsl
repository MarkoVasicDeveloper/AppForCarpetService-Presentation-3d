varying vec2 vUv;
varying vec2 vCoordinates;
varying vec3 vPos;

attribute vec3 aCoordinates;
attribute float aSpeed;
attribute float aOffset;
attribute float aDirection;
attribute float aPress;

uniform float move;
uniform float time;
uniform vec2 mouse;
uniform float mousePressed;
uniform float transition;
uniform float mouseMoveX;
uniform float mouseMoveY;

void main() {
  vUv = uv;

  vec3 pos = position;

  //not stable
  pos.x += sin(aSpeed) * 5000.;
  pos.y += sin(aSpeed) * 500.;
  pos.z = mod(position.z + move * 200. * aSpeed + aOffset, 2000.) - 1000.;

  //stable
  vec3 stable = position;
  float dist = distance(stable.xy, mouse);
  float area = 1. - smoothstep(0., 300., dist);

  stable.x += 50. * sin(time*aPress * 10.) * aDirection * area * mousePressed + (-mouseMoveX) * 0.2;
  stable.y += 50. * sin(time*aPress * 10.) * aDirection * area * mousePressed + (-mouseMoveY) * 0.2;
  stable.z += 50. * cos(time*aPress) * aDirection * area * mousePressed;

  pos = mix(pos, stable, transition);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);
  gl_PointSize = 3500. * (1. / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;

  vCoordinates = aCoordinates.xy;
  pos = vPos;
}