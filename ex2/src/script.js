import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const loader = new THREE.TextureLoader();

// Scene
const scene = new THREE.Scene();

// plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
plane.rotation.x = -Math.PI * 0.5;
scene.add(plane);

// sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshBasicMaterial({
    map: loader.load("textures/raw_plank_wall_diff_1k.jpg"),
  })
);
sphere.position.x = 1.5;
sphere.position.y = 1.5;
sphere.position.z = 0.5;
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

// sphere2
const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
sphere2.position.x = 0;
sphere2.position.y = 1.5;
sphere2.position.z = 0.5;
scene.add(sphere2);

// sphere3
const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshBasicMaterial({
    map: loader.load("textures/raw_plank_wall_disp_1k.png"),
  })
);
sphere3.position.x = -1.5;
sphere3.position.y = 1.5;
sphere3.position.z = 0.5;
scene.add(sphere3);

// spot light
const spotLight = new THREE.SpotLight(0xff0000);
spotLight.position.set(100, 1000, 100);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight);
// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height);
camera.position.set(0, 0, 4);
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Animate
const animate = () => {
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
