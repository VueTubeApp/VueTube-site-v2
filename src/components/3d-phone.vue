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
  let mesh, mylight;
  let composer;
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
    controls.autoRotateSpeed = 1;
    // setInterval(() => {
    //   controls.autoRotateSpeed == 2
    //     ? (controls.autoRotateSpeed = 10)
    //     : (controls.autoRotateSpeed = 2);
    // }, 2345);
    setTimeout(() => {
      setInterval(() => {
        if (
          controls.getAzimuthalAngle() < 1.55 &&
          controls.getAzimuthalAngle() > -0.5
        ) {
          if (controls.autoRotateSpeed > 1) controls.autoRotateSpeed -= 5;
          else controls.autoRotateSpeed = 1;
        } else {
          if (controls.autoRotateSpeed < 20) controls.autoRotateSpeed += 2;
          else controls.autoRotateSpeed = 20;
        }
      }, 100);
    }, 500);

    // animation loop

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

    // has to be mylight, used onmousemove below
    mylight = createDirectionalLight(0x777fff, 2, 0, 0, 0);
    scene.add(mylight);

    scene.add(createDirectionalLight(0x404040, 0.75, 5, 20, 0));

    scene.add(createDirectionalLight(0xffffff, 0.5, 0, -20, 15));

    scene.add(createDirectionalLight(0xffffff, 0.5, 0, 20, 15));

    scene.add(createDirectionalLight(0xffffff, 0.5, 0, 8, -20));
    scene.add(createDirectionalLight(0xffffff, 0.5, 0, 20, -20));

    // lights on the right matching the hero title
    scene.add(createDirectionalLight(0xffffff, 0.5, 10, 3, 6));
    scene.add(createDirectionalLight(0xffffff, 0.5, 10, 1.5, 6));
    scene.add(createDirectionalLight(0x00e4bf, 0.5, 10, 0, 6));
    // same as above but for when the phone has been rotated
    scene.add(createDirectionalLight(0xffffff, 0.5, -15, 3, -6));
    scene.add(createDirectionalLight(0xffffff, 0.5, -15, 1.5, -6));
    scene.add(createDirectionalLight(0x00e4bf, 0.5, -15, 0, -6));
    // TODO: add hemispheric light or a spotlight at the bottom

    // // backlight
    // scene.add(createDirectionalLight(0xffffff, 1, 0, 0, -20));

    // Load 3D phone model
    const gloader = new GLTFLoader();
    gloader.setPath("/phon/").load("Project Name.gltf", function (gltf) {
      scene.add(gltf.scene);
      mesh = gltf.scene;
      // change the position of the phone
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.rotation.set(0.15, -0.15, 0);
    });

    // Resize Handler
    // window.addEventListener("resize", onWindowResize, false);
  }
  // on scroll
  window.onscroll = function () {
    mesh.position.set(
      0,
      (document.documentElement.scrollTop || document.body.scrollTop) / -5000,
      0
    );
    mesh.rotation.set(
      0.15,
      -0.15 -
        (document.documentElement.scrollTop || document.body.scrollTop) / -100,
      0
    );
  };

  function onMouseMove(event) {
    // mesh.position.set(0, (event.clientY || event.pageY) / -5000, 0);
    // mesh.rotation.set(0.15, -0.15 - (event.clientX || event.pageX) / -100, 0);
    mylight.position.set(
      ((event.clientX || event.pageX) / container.clientWidth - 1.33) * 10, // -0.5 to center the light, gives a range from -1 to 1
      ((event.clientY || event.pageY) / container.clientHeight - 0.6) * -20,
      10
    );
  }
  window.addEventListener("mousemove", onMouseMove, false);

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
