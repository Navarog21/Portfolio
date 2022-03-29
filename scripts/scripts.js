import * as THREE from 'https://unpkg.com/three@0.119.0/build/three.module.js';
import { RGBELoader } from 'https://unpkg.com/three@0.119.0/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.119.0/examples/jsm/loaders/GLTFLoader.js';
import {canvas, renderer, scene, camera, control} from './base.js'
import vShader from './shaders/vertexShader.glsl.js';
import fShader from './shaders/fragmentShader.glsl.js';
import menu from './menu.js';
import { Cube, CUBES_ARRAY, addCube } from './cube.js';
import {scaleCube} from './animations.js';

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
loop()



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
