import * as THREE from 'https://unpkg.com/three@0.119.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://unpkg.com/three@0.119.0/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.119.0/examples/jsm/loaders/GLTFLoader.js';
import {canvas, renderer, scene, camera, control, getRandomNumber} from './base.js'
import vShader from './shaders/vertexShader.glsl.js';
import fShader from './shaders/fragmentShader.glsl.js';
import menu from './menu.js';
import {colorPallets, getRandomColorPallet} from './color.js';
import {rightToLeftAnimation, oddAndEvenAnimation, randomAnimation, scaleCube} from './animations.js';


let CUBE_SIZE = 5;
let COLOR_PALLET = getRandomColorPallet();
let LITTLE_CUBE_NEXT_POSITION = new THREE.Vector3(-5, -5, -5); // Point de départ
let CUBES_ARRAY = [];
let CUBES_COORDINATES = []
let ANIMATIONS_LIST = [rightToLeftAnimation, oddAndEvenAnimation, randomAnimation];
let ANIMATIONS_PLAY = ANIMATIONS_LIST[getRandomNumber(0, ANIMATIONS_LIST.length-1)];

let x = -5;
let y = -5;
let z = -5;

class Cube
{
  constructor()
  {
    this.size = 1.8;
    this.position = ANIMATIONS_PLAY(CUBES_COORDINATES);
    this.scale = false;
  }

  create()
  {
    let geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    let material = new THREE.MeshStandardMaterial({
      color: COLOR_PALLET[getRandomNumber(0,COLOR_PALLET.length-1)],
      transparent: true,
      opacity: 0.8
    })
    let mesh = new THREE.Mesh(geometry, material);
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
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const loop = () =>
{
  raycaster.setFromCamera(pointer, camera);
  let intersects = raycaster.intersectObjects(scene.children)

  for (let i = 0; i < intersects.length; i++)
  {
    if (intersects[i].object.name === "menu")
    {
      document.body.style.cursor = "pointer";
      intersects[i].object.material.color.set("red");
      window.addEventListener('click', () =>
      {
        window.location.href = "https://github.com/Navarog21";
      })
    }
  }
  if (CUBES_ARRAY.length <= 124) {
    addCube();
  }
  else {
    // window.addEventListener('click', resetShape);
  }

  scaleCube(CUBES_ARRAY);
  control.update();
  renderer.render(scene, camera);
  requestAnimationFrame(loop)
}

getCubesCoordinates();
// Sert à obtenir l'emplacement de chacun des cubes
// Obtenus en partant du coin inférieur gauche arrière
function getCubesCoordinates(size)
{
  for (let i = 0; i < Math.pow(CUBE_SIZE,3); i++)
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


function onPointerMove(event)
{
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

/*
function resetShape()
{
  CUBES_ARRAY.forEach((cube) => {
    cube.visible = false;
  });

  setTimeout( ()=>
  {
    let cubeBehind = CUBES_ARRAY.filter(cube => cube.position.z == -5 && cube.position.y == -5);
    cubeBehind.sort((a, b) => a.position.x - b.position.x);
    let cubeRight = CUBES_ARRAY.filter(cube => cube.position.x == 3 && cube.position.y == -5);
    cubeRight.sort((a, b) => a.position.z - b.position.z);
    let cubeFront = CUBES_ARRAY.filter(cube => cube.position.z == 3 && cube.position.y == -5);
    cubeFront.sort((a, b) => b.position.x - a.position.x);
    let cubeLeft = CUBES_ARRAY.filter(cube => cube.position.x == -5 && cube.position.y == -5);
    cubeLeft.sort((a, b) => b.position.z - a.position.z);

    let cubeBehindS = CUBES_ARRAY.filter(cube => cube.position.z == -5 && cube.position.y == 3);
    cubeBehindS.sort((a, b) => a.position.x - b.position.x);
    let cubeRightS = CUBES_ARRAY.filter(cube => cube.position.x == 3 && cube.position.y == 3);
    cubeRightS.sort((a, b) => a.position.z - b.position.z);
    let cubeFrontS = CUBES_ARRAY.filter(cube => cube.position.z == 3 && cube.position.y == 3);
    cubeFrontS.sort((a, b) => b.position.x - a.position.x);
    let cubeLeftS = CUBES_ARRAY.filter(cube => cube.position.x == -5 && cube.position.y == 3);
    cubeLeftS.sort((a, b) => b.position.z - a.position.z);

    let cubeBehind2 = CUBES_ARRAY.filter(cube => cube.position.z == -3 && cube.position.y == -3 && (cube.position.x >= -3 && cube.position.x <= 1));
    cubeBehind2.sort((a, b) => a.position.x - b.position.x);
    let cubeRight2 = CUBES_ARRAY.filter(cube => cube.position.x == 1 && cube.position.y == -3 && (cube.position.z >= -3 && cube.position.z <= 1));
    cubeRight2.sort((a, b) => a.position.z - b.position.z);
    let cubeFront2 = CUBES_ARRAY.filter(cube => cube.position.z == 1 && cube.position.y == -3 && (cube.position.x >= -3 && cube.position.x <= 1));
    cubeFront2.sort((a, b) => b.position.x - a.position.x);
    let cubeLeft2 = CUBES_ARRAY.filter(cube => cube.position.x == -3 && cube.position.y == -3 && (cube.position.z >= -3 && cube.position.z <= 1));
    cubeLeft2.sort((a, b) => b.position.z - a.position.z);

    let cubeBehindS2 = CUBES_ARRAY.filter(cube => cube.position.z == -3 && cube.position.y == 1 && (cube.position.x >= -3 && cube.position.x <= 1));
    cubeBehindS2.sort((a, b) => a.position.x - b.position.x);
    let cubeRightS2 = CUBES_ARRAY.filter(cube => cube.position.x == 1 && cube.position.y == 1 && (cube.position.z >= -3 && cube.position.z <= 1));
    cubeRightS2.sort((a, b) => a.position.z - b.position.z);
    let cubeFrontS2 = CUBES_ARRAY.filter(cube => cube.position.z == 1 && cube.position.y == 1 && (cube.position.x >= -3 && cube.position.x <= 1));
    cubeFrontS2.sort((a, b) => b.position.x - a.position.x);
    let cubeLeftS2 = CUBES_ARRAY.filter(cube => cube.position.x == -3 && cube.position.y == 1 && (cube.position.z >= -3 && cube.position.z <= 1));
    cubeLeftS2.sort((a, b) => b.position.z - a.position.z);

    let animation = cubeBehind.concat(cubeRight, cubeFront, cubeLeft, cubeBehind2, cubeRight2, cubeFront2, cubeLeft2);
    let symetrize = cubeBehindS.concat(cubeRightS, cubeFrontS, cubeLeftS, cubeBehindS2, cubeRightS2, cubeFrontS2, cubeLeftS2);
    let i = 0;

    let startAnimation = setInterval(() =>
    {
      if (i == animation.length)
      {
        clearInterval(startAnimation);
      }
      else {
        symetrize[i].visible = true;
        animation[i].visible = true;
        i++;
      }
    }, 10)


  }, 400)
}*/
