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
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
import { TAARenderPass } from "three/addons/postprocessing/TAARenderPass.js";

onMounted(() => {
  let camera, scene, renderer, controls;
  let mesh;
  let composer;
  let back = false;
  init();
  setPostProcessing();
  render();
  //
  function init() {
    let container = document.getElementById("container");

    // camera
    camera = new THREE.PerspectiveCamera(
      90,
      container.clientWidth / container.clientHeight,
      0.001,
      1000
    );
    camera.position.set(0, 0.075, 0.15);

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, container.parentElement.parentElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minDistance = 0.135;
    controls.maxDistance = 0.135;
    controls.target.set(0, 0.075, 0.0015);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    // setInterval(() => {
    //   controls.autoRotateSpeed == 2
    //     ? (controls.autoRotateSpeed = 10)
    //     : (controls.autoRotateSpeed = 2);
    // }, 2345);

    setInterval(() => {
      // console.log(controls.rotation);
      // TODO: use controls current rotation angle instead of "back"
      if (back) {
        controls.autoRotateSpeed -= 0.1;
        if (controls.autoRotateSpeed <= 2) back = false;
      } else {
        controls.autoRotateSpeed += 0.1;
        if (controls.autoRotateSpeed >= 10) back = true;
      }
    }, 30);

    controls.enableDamping = true;

    // Vertical axis locked
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // Resize
    // window.addEventListener("resize", onWindowResize);

    // Scene
    scene = new THREE.Scene();

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    scene.add(createDirectionalLight(0x404040, 0.75, 5, 20, 0));

    scene.add(createDirectionalLight(0xffffff, 0.5, 0, -20, 15));

    scene.add(createDirectionalLight(0xffffff, 0.5, 0, 20, 15));

    scene.add(createDirectionalLight(0xffffff, 0.5, 0, 8, -20));
    scene.add(createDirectionalLight(0xffffff, 0.5, 0, 20, -20));
    // TODO: add hemispheric light or a spotlight at the bottom

    // // backlight
    // scene.add(createDirectionalLight(0xffffff, 1, 0, 0, -20));

    // Load 3D phone model
    const gloader = new GLTFLoader();
    gloader.setPath("/phon/").load("Project Name.gltf", function (gltf) {
      scene.add(gltf.scene);
      // change the position of the phone
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.rotation.set(0.15, -0.15, 0);
    });

    // Resize Handler
    // window.addEventListener("resize", onWindowResize, false);
  }

  function createDirectionalLight(color, intensity, x, y, z) {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    return light;
  }

  function setPostProcessing() {
    composer = new EffectComposer(renderer);

    const taaRenderPass = new TAARenderPass(scene, camera);
    taaRenderPass.unbiased = false;
    composer.addPass(taaRenderPass);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // const outputPass = new ShaderPass(GammaCorrectionShader);
    // composer.addPass(outputPass);
  }

  function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);
  }

  function render() {
    requestAnimationFrame(render);
    controls.update();
    composer.render(scene, camera);
  }
});
</script>
