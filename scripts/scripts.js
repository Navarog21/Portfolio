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
camera.position.z = 60;

const light = new THREE.PointLight('white', 2, 100);
light.position.y = 20;
scene.add(light);

const light2 = new THREE.PointLight('white', 2, 100);
light2.position.y = -20;
scene.add(light2);

const light3 = new THREE.PointLight('white', 2, 100);
light3.position.z = 20;
scene.add(light3);

const light4 = new THREE.PointLight('white', 3, 100);
light4.position.x = -20;
scene.add(light4);

let SIZE = 12;
let SHAPES = [];
let PARTICLES = [];


let geometriesArray = [new THREE.TetrahedronGeometry(SIZE, 0),new THREE.BoxGeometry(SIZE, SIZE, SIZE),
                      new THREE.OctahedronGeometry(SIZE, 0),new THREE.DodecahedronGeometry(SIZE, 0),
                      new THREE.IcosahedronGeometry(SIZE, 0)];

let vectorsArray = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-50, 50, -50),
                    new THREE.Vector3(50, 50, -50), new THREE.Vector3(0, 50, -100)];

createShape();





function placeShape()
{

}

function createShape()
{
  let randomGeometryIndex = getRandomNumber(0, geometriesArray.length-1);
  let geometry = geometriesArray[randomGeometryIndex];
  geometry.elementsNeedUpdate = true;
  let material = randomMaterial();
  let mesh = new THREE.Mesh(geometry, material);
  mesh.scale.setScalar(0);

  for (let i = 0; i < vectorsArray.length; i++)
  {
    let clone = mesh.clone();
    clone.position.set(vectorsArray[i].x, vectorsArray[i].y, vectorsArray[i].z)
    SHAPES.push(clone)
    scene.add(clone);
  }

  let reduceScale = setInterval(() =>
  {
    for (let i = 0; i < SHAPES.length; i++)
    {
      SHAPES[i].scale.addScalar(0.08);
    }
    if (SHAPES[0].scale.x >= 1) clearInterval(reduceScale)
  },10)

}

function randomMaterial()
{
  let shapeColors = ["#2652bf", '#2679bf']
  let color = shapeColors[getRandomNumber(0, shapeColors.length-1)]
  let material = new THREE.MeshPhongMaterial({
    color: shapeColors[getRandomNumber(0, shapeColors.length-1)],
    side: THREE.DoubleSide,
    transparent: true,
    reflectivity: 0.6,
    opacity: 0.9,
    shininess: 150
  })

  return material;
}

let backgroundMusic = new Audio('sounds/background2.mp3');

canvas.addEventListener('click', () =>
{
  let audio = new Audio('sounds/magic.wav');
  backgroundMusic.play();
  audio.volume = 0.1;
  audio.play();
  let reduceScale = setInterval(() =>
  {
    for (let i = 0; i < SHAPES.length; i++) {
      SHAPES[i].scale.subScalar(0.05);
    }
    if (SHAPES[0].scale.x <= 0)
    {
      clearInterval(reduceScale);
      setTimeout(() =>
      {
        SHAPES = [];
        createShape()
      }, 300)
    }
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

class Particle
{
  constructor()
  {
    this.x = getRandomNumber(-100, 100);
    this.y = getRandomNumber(-100, 100);
    this.z = getRandomNumber(-100, 100);;
    this.color = "#0256df";
    this.radius = 0.1;
    this.vertices = [];
  }

  draw()
  {
    let particleGeometry = new THREE.Geometry();
    particleGeometry.vertices.push(new THREE.Vector3(this.x, this.y, this.z))
    let particleMaterial = new THREE.PointsMaterial({color: this.color})
    let particle = new THREE.Points(particleGeometry, particleMaterial);
    particle.position.set(this.x, this.y, this.z)
    scene.add(particle)
  }
}

function createParticle()
{
  for (let i = 0; i < 2500; i++)
  {
    PARTICLES.push(new Particle());
    PARTICLES[i].draw();
  }
}

createParticle();

function createLight(color = "white")
{
  const light = new THREE.PointLight(color, 1, 100);
  light.setPosition(x, y, z)
  scene.add(light);
}



let control = new OrbitControls(camera, renderer.domElement);
control.autoRotate = true;
control.autoRotateSpeed = 8;
control.enableDamping = true;
control.enablePan = false;

let gameLoop = () => {
  control.update();
  renderer.render(scene, camera);

  for (let i = 0; i < SHAPES.length; i++)
  {
    SHAPES[i].geometry.radius += 0.01;
    SHAPES[i].rotation.x += 0.013;
    SHAPES[i].rotation.y += 0.013;
  }


  requestAnimationFrame(gameLoop);
};

gameLoop()
