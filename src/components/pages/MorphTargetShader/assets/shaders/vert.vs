attribute vec3 position;
attribute vec3 secondPosition;
uniform float sliderValue;
void main() {
    float progress = sliderValue;

    vec3 pos = mix(position, secondPosition, progress);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}