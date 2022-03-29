import * as THREE from 'https://unpkg.com/three@0.119.0/build/three.module.js';
import {rightToLeftAnimation, oddAndEvenAnimation, randomAnimation, scaleCube} from './animations.js';
import {colorPallets, getRandomColorPallet} from './color.js';
import {scene} from './base.js';

let LITTLE_CUBE_NEXT_POSITION = new THREE.Vector3(-5, -5, -5); // Point de départ
let CUBE_SIZE = 5;
let COLOR_PALLET = getRandomColorPallet();
let CUBES_ARRAY = [];
let ANIMATIONS_LIST = [rightToLeftAnimation, oddAndEvenAnimation, randomAnimation];
let ANIMATIONS_PLAY = ANIMATIONS_LIST[getRandomNumber(0, ANIMATIONS_LIST.length-1)];
let CUBES_COORDINATES = getCubesCoordinates();

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


// Sert à obtenir l'emplacement de chacun des cubes
// Obtenus en partant du coin inférieur gauche arrière
function getCubesCoordinates(size)
{
  let coordinates = [];
  let x = -5;
  let y = -5;
  let z = -5;
  for (let i = 0; i < Math.pow(CUBE_SIZE,3); i++)
  {
    let vector = new THREE.Vector3(x, y, z);
    coordinates.push(vector);
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
  return coordinates;
}
export {Cube, CUBES_ARRAY, addCube};
