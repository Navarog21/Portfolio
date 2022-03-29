import * as THREE from 'https://unpkg.com/three@0.119.0/build/three.module.js';
import scene from './base.js';

const loader = new THREE.FontLoader();
loader.load('../fonts/test.json', createMenu)

function createMenu(font)
{
  let geometry = new THREE.TextGeometry( 'Contact', {
    font: font,
    size: 1,
    height: 0.1,
  } );
  let material = new THREE.MeshPhongMaterial({color: "white"});
  let mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI/2;
  mesh.rotation.z = Math.PI/2;
  mesh.rotation.y = Math.PI;
  mesh.position.set(1,0,8)
  mesh.name = "menu";
  scene.add(mesh);
}

export default createMenu
