uniform sampler2D texture;

varying vec2 vUv;

void main() {
    vec2 transformedUV = vec2(vUv.x, vUv.y/(7.5/3.)+0.38);
    gl_FragColor = texture2D(texture, transformedUV);
}