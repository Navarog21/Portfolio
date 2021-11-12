import * as THREE from 'https://unpkg.com/three@0.119.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.119.0/examples/jsm/loaders/GLTFLoader.js';
import { FlakesTexture } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/textures/FlakesTexture.js';
import { RGBELoader } from 'https://unpkg.com/three@0.119.0/examples/jsm/loaders/RGBELoader.js';

let canvas = document.querySelector('#background');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  autoclear: true,
  canvas: canvas
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 10000 );
camera.position.z = 30;

const light = new THREE.PointLight('white', 1, 100);
light.position.y = 20;
scene.add(light);

const light2 = new THREE.PointLight('white', 1, 100);
light2.position.y = -20;
scene.add(light2);

const light3 = new THREE.PointLight('white', 1, 100);
light3.position.z = 20;
scene.add(light3);

let SIZE = 11;
let SHAPE;

class Particle
{
  constructor()
  {
    this.x = getRandomNumber(-100, 100);
    this.y = getRandomNumber(-100, 100);
    this.z = getRandomNumber(-100, 100);;
    this.color = "purple";
    this.radius = 0.2;
  }

  draw()
  {
    let particleGeometry = new THREE.SphereGeometry(this.radius, 8, 8);
    let particleMaterial = new THREE.MeshPhongMaterial({color: "purple", transmission: 1})
    let particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.x = this.x;
    particle.position.y = this.y;
    particle.position.z = this.z;
    scene.add(particle)
  }
}

let PARTICLES = [];
function createParticle()
{
  for (let i = 0; i < 3000; i++)
  {
    PARTICLES.push(new Particle());
  }

  for (let i = 0; i < PARTICLES.length; i++)
  {
    PARTICLES[i].draw();
  }
}

createParticle();
let geometriesArray = [new THREE.TetrahedronGeometry(SIZE, 0),new THREE.BoxGeometry(SIZE, SIZE, SIZE),
                      new THREE.OctahedronGeometry(SIZE, 0),new THREE.DodecahedronGeometry(SIZE, 0),
                      new THREE.IcosahedronGeometry(SIZE, 0)];

createShape();

function createShape()
{
  let randomGeometryIndex = getRandomNumber(0, geometriesArray.length-1);
  let geometry = geometriesArray[randomGeometryIndex];
  let material = randomMaterial();
  SHAPE = new THREE.Mesh(geometry, material)
  scene.add(SHAPE);
}

function randomMaterial()
{
  let shapeColors = ["red", "#7b2fd5", "#8726bf", "#2652bf", '#2679bf']
  let color = shapeColors[getRandomNumber(0, shapeColors.length-1)]
  let material = new THREE.MeshPhongMaterial({
    color: shapeColors[getRandomNumber(0, shapeColors.length-1)],
    side: THREE.DoubleSide,
    transparent: true,
    reflectivity: 1,
    opacity: 0.6,
    shininess: 100,
    wireframe: getRandomBoolean()
  })
  PARTICLES.color = color;
  return material;
}

let backgroundMusic = new Audio('sounds/background2.mp3');

window.addEventListener('click', () =>
{
  let audio = new Audio('sounds/magic.wav');
  backgroundMusic.play();
  audio.volume = 0.1;
  audio.play();
  scene.remove(SHAPE)
  createShape()
  let reduceScale = setInterval(() =>
  {
    SHAPE.geometry.radius -= 0.01;
    if (SHAPE.scale.x <= 0) clearInterval(reduceScale);
    setTimeout(() =>
    {

    }, 500)
  },10)

  function extendScale()
  {
    let extend = setInterval(() =>
    {
      if (SHAPE.scale.x > 0.5) clearInterval(extend);
      SHAPE.geometry.radius += 0.01;
    },10)
  }
})



function createLight(color = "white")
{
  const light = new THREE.PointLight(color, 1, 100);
  light.setPosition(x, y, z)
  scene.add(light);
}



let control = new OrbitControls(camera, renderer.domElement);
scene.add(control)

let gameLoop = function () {
  control.update();
  renderer.render(scene, camera);
  SHAPE.rotation.x += 0.013;
  SHAPE.rotation.y += 0.013;
  requestAnimationFrame(gameLoop);
};

gameLoop()
