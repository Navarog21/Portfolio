import * as THREE from 'https://unpkg.com/three@0.119.0/build/three.module.js';

const canvas = document.querySelector('#background');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  autoclear: true,
  canvas: canvas,
  antialiasing: true
});

window.addEventListener('resize', () =>
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

renderer.setSize(canvas.width, canvas.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

const scene = new THREE.Scene();
const gridHelper = new THREE.GridHelper(64,64);
scene.add(gridHelper);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.set(-10, 10, 8);

let light, light2, light3, light4, light5, light6;

light = new THREE.PointLight('white', 1, 100);
light2 = new THREE.PointLight('white', 1, 100);
light3 = new THREE.PointLight('white', 1, 100);
light4 = new THREE.PointLight('white', 1, 100);
light5 = new THREE.PointLight('white', 1, 100);
light6 = new THREE.PointLight('white', 1, 100);
//---------------------------//
light.position.set(0, 0, 10);
light2.position.set(0, 0, -10);
light3.position.set(-10, 0, 0);
light4.position.set(10, 0, 0);
light5.position.set(0, -10, 0);
light6.position.set(0, 10, 0);

scene.add(light, light2, light3, light4, light5, light6);

function getRandomNumber(min, max)
{
  const number = Math.round(Math.random() * (max - min) + min);
  return number;
}

function getRandomBoolean()
{
  let boolean;
  let digit = getRandomNumber(0, 1);
  if (digit == 0) boolean = false;
  else boolean = true;
  return boolean;
}

export {canvas, renderer, scene, camera, getRandomNumber};
export {getRandomNumber as randomNumber};