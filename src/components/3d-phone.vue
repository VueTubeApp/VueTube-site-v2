<template>
  <div class="phone z-50">
    <canvas ref="canvas" class="phone__canvas top-0 h-full w-full"></canvas>
  </div>
</template>
<script setup>
import * as Three from "three";
import { onMounted, ref } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
onMounted(() => {
  const canvas = ref(null);
  const scene = new Three.Scene();
  const camera = new Three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new Three.WebGLRenderer({ canvas: canvas.value });
  const loader = new GLTFLoader();
  const controls = new OrbitControls(camera, renderer.domElement);
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  // set camera position
  camera.position.x = 0;
  camera.position.y = 0;

  camera.position.z = 5;

  // set renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // add lights

  const light = new Three.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 1).normalize();
  scene.add(light);

  // load '/vuephone.gltf'

  loader.load("/vuephone.gltf", (gltf) => {
    scene.add(gltf.scene);
  });

  // add global lights

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  animate();
});
</script>
