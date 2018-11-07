attribute vec3 morphPositions;
uniform float progress;

void main() {
    vec3 pos = mix(position, morphPositions, 0.5);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}