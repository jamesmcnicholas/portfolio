import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// Setup scene, camera, renderer, texture loader
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(10, 500/ 200, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'), alpha: true})

renderer.setPixelRatio(window.devicePixelRatio);
var width = document.getElementById('wglpane').offsetWidth;
renderer.setSize(width ,width/2);
camera.position.setZ(200);

// Setup controls
const controls = new OrbitControls(camera, renderer.domElement);

// Setup Earth
const earth = new THREE.Mesh(new THREE.SphereGeometry(10),new THREE.MeshStandardMaterial({map: textureLoader.load('earth.jpg')}));

//Setup Light
const light = new THREE.PointLight(0xffffff)
light.position.set(-300,150,400)

// Add items to scene
scene.add(light)
scene.add(earth);

var offset = 0;

function addSatellite() {
  offset = offset + 1;
  const satelliteGeometry = new THREE.SphereGeometry(0.3, 24 ,24);
  const satelliteMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
  const satellite = new THREE.Mesh( satelliteGeometry, satelliteMaterial);
  const [x, y, z, spread] = Array(4).fill().map(() => 11);

  // satellite.position.set(x-spread*Math.cos(0.0005),y+spread*Math.cos(offset*0.0005),z);
  scene.add(satellite);
  sats.push({key: satellite, value: spread});
}

function orbitStars(time, object, x, y, z, radius, speed){
  var radian = speed * time;
  object.position.x = x - radius * Math.cos(radian);
  object.position.y = y + radius * Math.sin(radian);
  object.position.z = z + radius * Math.sin(radian);
}


function animate(time){
  requestAnimationFrame(animate);

  // Move objects
  earth.rotation.y += 0.01;

  // Update view based on control changes
  controls.update()
  
  // Update view based on window size changes
  // camera.aspect = window.innerWidth/ window.innerHeight;
  var width = document.getElementById('wglpane').offsetWidth;
  renderer.setSize(width ,width/2);
  camera.updateProjectionMatrix();
  sats.forEach(s => orbitStars(time, s.key, 0, 0, 0, s.value, 0.0005));

  // Finally, Render
  renderer.render(scene, camera);
}

// Generate Stars
var sats = []
Array(10).fill().forEach(addSatellite)
console.log(sats)

// Launch the animation
animate(0);