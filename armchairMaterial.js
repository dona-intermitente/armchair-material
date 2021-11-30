import * as THREE from './three.js-master/build/three.module.js';

import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x58DDC8);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 200);
camera.position.set(0, 1.5, 2.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 1.5;
controls.maxDistance = 5;

scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 1, 1);
scene.add(light)

let texture

new GLTFLoader().load('src/model/sofa.glb', function (gltf) {
    const model = gltf.scene;
    const cloth = model.children[0].children[1];
    const legs = model.children[0].children[0];
    legs.material.color = new THREE.Color("black");

    texture = new THREE.TextureLoader().load('src/materials/blue.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    cloth.material.map = texture;
    scene.add(model);

    document.addEventListener('click', myFunction)
    function myFunction(e) {
        if (e.target.checked == true) {
            texture = new THREE.TextureLoader().load('src/materials/' + e.target.id + '.jpg');
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
            cloth.material.map = texture;
        }
    }
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