varying vec2 vCoordinates;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float moveImage;

void main() {
  vec2 myUv = vec2(vCoordinates.x / 512., vCoordinates.y / 512.);
  vec4 image = texture2D(texture1, myUv);
  vec4 image2 = texture2D(texture2, myUv);

  vec4 final = mix(image, image2, smoothstep(0., 1., moveImage));
  
  gl_FragColor = final;
}