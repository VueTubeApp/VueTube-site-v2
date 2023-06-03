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
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

onMounted(() => {
  let camera, scene, renderer;
  let mesh;
  init();
  render();
  //
  function init() {
    let container = document.getElementById("container");
    camera = new THREE.PerspectiveCamera(
      5, // fov
      container.clientWidth / container.clientWidth, // aspect ratio
      0.25,
      0
    );
    camera.position.set(0, 0, 0);

    scene = new THREE.Scene();

    new RGBELoader()
      .setPath("/phon/")
      .load("royal_esplanade_1k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;

        render();

        // model

        const loader = new GLTFLoader();
        loader.setPath("/phon/").load("vuephone.gltf", function (gltf) {
          scene.add(gltf.scene);
          // chnage the position of the phone
          gltf.scene.position.set(0, -0.1, 0);

          render();
        });
      });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientWidth);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 5;
    controls.target.set(0, -0.05, -0.02);
    controls.update();

    window.addEventListener("resize", onWindowResize);
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
