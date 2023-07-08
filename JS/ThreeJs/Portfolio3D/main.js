import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//DECLARE SCENE, CAMERA AND RENDERER 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
});

//RENDER VIEW PIXEL RATIO AND SIZE
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//SET CAMERA POSITION
camera.position.setZ(0);
camera.position.setX(0);

//RENDER SCENE WITH CAMERA
renderer.render(scene, camera);

//RING OBJECT 
const geometry = new THREE.TorusGeometry(10,3,16,100); //object or 3d shape
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347}); //like a wrapping material for objects
const torus = new THREE.Mesh( geometry, material);
scene.add(torus)

//POINT LIGHT AND AMBIENT LIGHT
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(pointLight, ambientLight)

//HELPERS
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper)

//ORBIT CONTROLLER WITH MOUSE 
const controls = new OrbitControls(camera, renderer.domElement);

//ADD STARS RANDOMLY
function addstars() {
  const geometry = new THREE.SphereGeometry(0.2,24,24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread( 100 ));
  star.position.set(x,y,z)
  scene.add(star)
}
Array(200).fill().forEach(addstars)

//BACKGROUND TEXTURE
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//DOGO
const dogoTexture = new THREE.TextureLoader().load('dogo.jpg');
const dogo = new THREE.Mesh(
  new THREE.BoxGeometry(4,4,4),
  new THREE.MeshStandardMaterial( {map: dogoTexture})
);
scene.add(dogo)
dogo.position.z = -5;
dogo.position.x = 2;

//MOON
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial( {map: moonTexture, normalMap: normalTexture})
);
scene.add(moon)
moon.position.z = 40;
moon.position.x = (-15);

//MOVE CAMERA WITH MOUSE SCROLL AND CONTINUE OTHER ANIMATION ON SAME EVENT AS WELL
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  dogo.rotation.x += 0.01;
  dogo.rotation.y += 0.01;

  camera.position.z = t* -0.01;
  camera.position.x = t* -0.0002;
  camera.rotation.y = t* -0.00015;

}

document.body.onscroll = moveCamera;

//INFINITE RENDERING TO ANIMATE
function animate() {
  requestAnimationFrame( animate );

  //RING ROTATION ANIMATION
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //UPDATE ORBIT CONTROL WITH MOUSE
  //controls.update();

  //FREQUENT RENDERING OF SCENE
  renderer.render(scene, camera);
}


animate()