import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// Setup scene, camera, renderer, texture loader
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth/ window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'), alpha: true})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(120);

// Setup controls
const controls = new OrbitControls(camera, renderer.domElement);

// Setup Planets
const sun = new THREE.Mesh(new THREE.SphereGeometry(4, 20, 20),new THREE.MeshBasicMaterial({map: textureLoader.load('sun.jpg')}));
const mercury = new THREE.Mesh(new THREE.SphereGeometry(.5),new THREE.MeshStandardMaterial({map: textureLoader.load('mercury.jpg')}));
const venus = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshStandardMaterial({map: textureLoader.load('venus.jpg')}));
const earth = new THREE.Mesh(new THREE.SphereGeometry(1.5),new THREE.MeshStandardMaterial({map: textureLoader.load('earth.jpg')}));
const moon = new THREE.Mesh(new THREE.SphereGeometry(.5), new THREE.MeshStandardMaterial({map: textureLoader.load('moon.jpg')}));
const mars = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshStandardMaterial({map: textureLoader.load('mars.jpg')}));
const jupiter = new THREE.Mesh(new THREE.SphereGeometry(3), new THREE.MeshStandardMaterial({map: textureLoader.load('jupiter.jpg')}));
const saturn = new THREE.Mesh(new THREE.SphereGeometry(2), new THREE.MeshStandardMaterial({map: textureLoader.load('saturn.jpg')}));
const uranus = new THREE.Mesh(new THREE.SphereGeometry(1.5), new THREE.MeshStandardMaterial({map: textureLoader.load('uranus.jpg')}));
const neptune = new THREE.Mesh(new THREE.SphereGeometry(1),new THREE.MeshStandardMaterial({map: textureLoader.load('neptune.jpg')}));

// Setup orbit rings
const geometry = new THREE.TorusGeometry(5,0.05,100,100);
const material = new THREE.MeshBasicMaterial({color: 0xbababa});
const torus = new THREE.Mesh(geometry, material)

const mercuryOrbit = new THREE.Mesh(new THREE.TorusGeometry(3,1,100,100), new THREE.MeshBasicMaterial({color: 0xbababa}))
const venusOrbit = new THREE.Mesh(new THREE.TorusGeometry(6,.3,100,100), new THREE.MeshBasicMaterial({color: 0xbababa}))
const earthOrbit = new THREE.Mesh(new THREE.TorusGeometry(9,.3,100,100), new THREE.MeshBasicMaterial({color: 0xbababa}))
const marsOrbit = new THREE.Mesh(new THREE.TorusGeometry(12,.3,100,100), new THREE.MeshBasicMaterial({color: 0xbababa}))
const jupiterOrbit = new THREE.Mesh(new THREE.TorusGeometry(24,.3,100,100), new THREE.MeshBasicMaterial({color: 0xbababa}))
const saturnOrbit = new THREE.Mesh(new THREE.TorusGeometry(48,.3,100,100), new THREE.MeshBasicMaterial({color: 0xbababa}))
const uranusOrbit = new THREE.Mesh(new THREE.TorusGeometry(86,.3,100,100), new THREE.MeshBasicMaterial({color: 0xbababa}))
const neptuneOrbit = new THREE.Mesh(new THREE.TorusGeometry(100,.3,100,100), new THREE.MeshBasicMaterial({color: 0xbababa}))


// Setup saturn ring // NOT WORKING
const saturngeometry = new THREE.TorusGeometry(2.5,0.15,100,100);
const saturnMaterial =new THREE.MeshBasicMaterial({map: textureLoader.load('saturn_ring.png')});
const satTorus = new THREE.Mesh(saturngeometry, saturnMaterial);

//Setup Light
const light = new THREE.PointLight(0xffffff)
light.position.set(0,0,0)

// Add items to scene
scene.add(light)
scene.add(torus);
scene.add(sun);
scene.add(earth);
scene.add(moon);
scene.add(mercury);
scene.add(venus);
scene.add(mars);
scene.add(jupiter);
scene.add(saturn);
scene.add(satTorus);
scene.add(uranus);
scene.add(neptune);
scene.add(mercuryOrbit);
scene.add(venusOrbit);
scene.add(earthOrbit);
scene.add(marsOrbit);
scene.add(jupiterOrbit);
scene.add(saturnOrbit);
scene.add(uranusOrbit);
scene.add(neptuneOrbit);




function addStar() {
  const starGeometry = new THREE.SphereGeometry(0.05, 24 ,24);
  const starMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
  const star = new THREE.Mesh( starGeometry, starMaterial);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

function orbit(time, object, x, y, radius, speed){
  var radian = speed * time;
  object.position.x = x + radius * Math.cos(radian);
  object.position.y = y + radius * Math.sin(radian);
}

function animate(time){
  requestAnimationFrame(animate);
  // Move objects
  earth.rotation.y += 0.01;
  moon.rotation.y += 0.005;
  
  orbit(time, mercury, sun.position.x, sun.position.y, 3, 0.0100)
  orbit(time, venus, sun.position.x, sun.position.y, 6, 0.0050)
  orbit(time, earth, sun.position.x, sun.position.y, 9, 0.0010)
  orbit(time, torus, sun.position.x, sun.position.y, 9, 0.0010)
  orbit(time, moon, earth.position.x, earth.position.y, 1, 0.005)
  orbit(time, mars, sun.position.x, sun.position.y, 12, 0.00010)
  orbit(time, jupiter, sun.position.x, sun.position.y, 24, 0.00010)
  orbit(time, saturn, sun.position.x, sun.position.y, 48, 0.00005)
  orbit(time, satTorus, saturn.position.x, saturn.position.y, 0, 0.00005)
  orbit(time, uranus, sun.position.x, sun.position.y, 86, 0.00002)
  orbit(time, neptune, sun.position.x, sun.position.y, 100, 0.00001)


  // Update view based on control changes
  controls.update()
  
  // Update view based on window size changes
  camera.aspect = window.innerWidth/ window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Finally, Render
  renderer.render(scene, camera);
}

// Generate Stars
Array(200).fill().forEach(addStar)

// Launch the animation
animate(0);