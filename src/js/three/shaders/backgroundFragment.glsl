varying vec2 vUv;

uniform sampler2D texture1;
void main( void ) {
  vec4 image = texture2D(texture1, gl_PointCoord);
       
  gl_FragColor = image;
}