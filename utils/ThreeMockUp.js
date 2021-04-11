import React from "react";
import * as THREE from "three";
import styled from "styled-components";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const ThreeMockUp = () => {
  React.useEffect(() => {
    ThreejsStart();
  }, []);

  const ThreejsStart = () => {
    // +-------------------------------------------------------------------+
    // |  CANVAS INIT
    // +-------------------------------------------------------------------+
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const aspectRatio = sizes.width / sizes.height;
    const canvas = document.querySelector(".webgl");
    const scene = new THREE.Scene();

    // +-------------------------------------------------------------------+
    // |  DEBUG PARAMETER
    // +-------------------------------------------------------------------+
    const Parameters = {
      color: 0xffff00,
      spin: () => {
        gsap.to(mesh.rotation, {
          y: mesh.rotation.y + Math.PI * 2,
          duration: 1,
        });
      },
    };

    // +-------------------------------------------------------------------+
    // |  OBJECT
    // +-------------------------------------------------------------------+
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: "#444444",
        metalness: 0,
        roughness: 0.5,
      })
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    scene.add(floor);

    const box = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
      color: Parameters.color,
      wireframe: true,
    });
   
    const mesh = new THREE.Mesh(box, material);
    mesh.position.y = 1;
    scene.add(mesh);

    // +-------------------------------------------------------------------+
    // |  Lights
    // +-------------------------------------------------------------------+
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // +-------------------------------------------------------------------+
    // |  CAMERA
    // +-------------------------------------------------------------------+
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
    camera.position.z = 4;
    camera.position.y = 2;
    camera.lookAt(mesh.position);
    scene.add(camera);

    // +-------------------------------------------------------------------+
    // |  CONTROLS RENDER
    // +-------------------------------------------------------------------+
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // +-------------------------------------------------------------------+
    // |  REZIZE
    // +-------------------------------------------------------------------+
    window.addEventListener("resize", (e) => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // +-------------------------------------------------------------------+
    // |  DEBUG
    // +-------------------------------------------------------------------+
    const gui = new dat.GUI({ closed: true });

    // +-------------------------------------------------------------------+
    // |  FRAME ACTION
    // +-------------------------------------------------------------------+
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  };
  return (
    <Container>
      <canvas className="webgl"></canvas>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
export default ThreeMockUp;
