import * as THREE from 'https://unpkg.com/three@0.119.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://unpkg.com/three@0.119.0/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.119.0/examples/jsm/loaders/GLTFLoader.js';

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
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10000);
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

const colorPallets =
[
  ['#507255', "#488B49", "#4AAD52"],
  ['#D72323', "orange", "#E0CA3C", "#000500", "#191102"],
  ['#0051A8', "#D9F0FF", "#A3D5FF", "#83C9F4"],
  ['#00A83B', "#F0EC57", "#34190C"]
]

let COLOR_PALLET = getRandomColorPallet();
let LITTLE_CUBE_NEXT_POSITION = new THREE.Vector3(-5, -5, -5); // Point de départ
let CUBES_ARRAY = [];
let CUBES_COORDINATES = []

let x = -5;
let y = -5;
let z = -5;

function randomAnimation()
{
  let randomNumber = getRandomNumber(0, CUBES_COORDINATES.length-1);
  let clone = CUBES_COORDINATES[randomNumber];
  CUBES_COORDINATES.splice(randomNumber, 1);
  return clone;
}

class Cube
{
  constructor()
  {
    this.bigCubeSize = 10;
    this.bigCubePosition = new THREE.Vector3();
    this.size = 2;
    this.position = randomAnimation();
    this.scale = false;
  }

  create()
  {
    const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    const material = new THREE.MeshStandardMaterial({
      color: COLOR_PALLET[getRandomNumber(0,COLOR_PALLET.length-1)],
      transparent: true,
      opacity: 0.8
    })
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "cube";
    mesh.position.set(this.position.x, this.position.y, this.position.z);
    Object.defineProperty(mesh, 'grow',{value: false, writable: true})
    CUBES_ARRAY.push(mesh);
    scene.add(mesh);
  }
}

function addCube()
{
  let cube = new Cube();
  cube.create();
  CUBES_ARRAY.push(cube);
}

function scaleCube()
{
  CUBES_ARRAY.forEach((cube) =>
  {
    if (cube.grow === false)
    {
      cube.scale.subScalar(0.012);
      if (cube.scale.x <= 0.1)
      {
        cube.grow = true;
      }
    }
    if (cube.grow === true)
    {
      cube.scale.addScalar(0.009);
      if (cube.scale.x >= 0.9)
      {
        cube.grow = false;
      }
    }
  });
}

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
control.enablePan = true;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const loop = () =>
{
  raycaster.setFromCamera(pointer, camera);
  let intersects = raycaster.intersectObjects(scene.children)

  if (CUBES_COORDINATES.length != 0) {
    addCube();
  }
  else {
    window.addEventListener('click', resetShape);
  }
  scaleCube();
  control.update();
  renderer.render(scene, camera);
  requestAnimationFrame(loop)
}


getCubesCoordinates();
function getCubesCoordinates(size)
{
  for (let i = 0; i < 125; i++)
  {
    let vector = new THREE.Vector3(x, y, z);
    CUBES_COORDINATES.push(vector);
    if(z <= 3){
      if (z == 3){
        z = -5;
        if (y <= 3){
          if (y == 3) {
            y = -5;
            x += 2;
          }
          else {
            y += 2;
          }
        }
      }
      else {
        z += 2
      }
    }
  }
  loop();
}

window.addEventListener('pointermove', onPointerMove)

function getRandomColorPallet()
{
  return colorPallets[getRandomNumber(0,colorPallets.length-1)];
}

function onPointerMove(event)
{
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function resetShape()
{
  console.log(CUBES_ARRAY);
  CUBES_ARRAY.forEach((cube) =>
  {
    cube.rotate();
  });
}

// Je n'ai besoin de créer les cubes qu'une seule fois. Seul la visibilité change afin de créer l'illusion d'une animation
function basicAnimation(size, bigCubeSize)
{
  let vectors = [];
  CUBES_COORDINATES.forEach((cube) =>
  {
    if (cube.x == -3)
    {
      vectors.push(cube)
    }
  });
  console.log(vectors);

}
