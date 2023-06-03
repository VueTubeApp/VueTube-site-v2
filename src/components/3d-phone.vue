<template>
  <div
    id="container"
    class="z-50 grid h-full w-full place-items-center overflow-hidden rounded-3xl"
  ></div>
</template>
<script setup>
import { onMounted } from "vue";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
onMounted(() => {
  let camera, scene, renderer;
  let mesh;
  init();
  render();
  //
  function init() {
    let container = document.getElementById("container");

    // camera
    camera = new THREE.PerspectiveCamera(
      75, // fov
      container.clientWidth / container.clientHeight, // aspect ratio
      0.001,
      1000
    );
    camera.position.set(0, 0, 0.1);

    // renderer
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render); // use if there is no animation loop
    controls.minDistance = 0;
    controls.maxDistance = 99999999;
    controls.target.set(0, -0.05, -0.02);
    controls.update();

    // the 3d phone
    const gloader = new GLTFLoader();
    gloader.setPath("/phon/").load("Project Name.gltf", function (gltf) {
      scene.add(gltf.scene);
      // chnage the position of the phone
      gltf.scene.position.set(0, -0.15, 0);
      render();
    });

    // lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    // white top light
    const dirlight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    dirlight2.position.set(0, 20, 15);
    scene.add(dirlight2);

    // white bottom light
    const dirlight3 = new THREE.DirectionalLight(0xffffff, 0.5);
    dirlight3.position.set(0, -20, 15);
    scene.add(dirlight3);

    // white left light
    const dirlight4 = new THREE.DirectionalLight(0xffffff, 0.5);
    dirlight4.position.set(20, 0, 15);
    scene.add(dirlight4);

    // white right light
    const dirlight5 = new THREE.DirectionalLight(0xffffff, 0.5);
    dirlight5.position.set(-20, 0, 15);
    scene.add(dirlight5);

    // backlight
    const dirlight6 = new THREE.DirectionalLight(0xffffff, 1);
    dirlight6.position.set(0, -0.15, -20);
    scene.add(dirlight6);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
  }

  function render() {
    renderer.render(scene, camera);
  }
});
</script>
