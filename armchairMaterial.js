import * as THREE from './three.js-master/build/three.module.js';

import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x58DDC8);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 200);
camera.position.set(0,0.5,3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 1.5;
controls.maxDistance = 5;

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.y = 1;
scene.add(light)

new GLTFLoader().load('src/model/sofa.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(model);
});

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    controls.update();
}

render();

window.onresize = function () {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    render();
};