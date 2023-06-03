<template>
  <div
    id="container"
    class="z-50 grid w-full place-items-center overflow-hidden rounded-3xl"
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
      40, // fov
      container.clientWidth / container.clientWidth, // aspect ratio
      0.25,
      0
    );
    camera.position.set(0, 0, 0.15);

    // renderer
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientWidth);
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
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    window.addEventListener("resize", onWindowResize);

    // red backdrop
    const dirlight = new THREE.DirectionalLight(0xff0000, 25);
    dirlight.position.set(0, -0.15, -10);
    scene.add(dirlight);

    // white top right
    const dirlight2 = new THREE.DirectionalLight(0xffffff, 25);
    dirlight2.position.set(0.15, 0.15, -5);
    scene.add(dirlight2);
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
