import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const ScrollAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    groundGeometry.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      side: THREE.DoubleSide,
    });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Add SpotLight
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(3, 6, 3); // Position light above and to the side
    spotLight.angle = Math.PI / 5;   // A wider spotlight cone
    spotLight.penumbra = 0.5;        // Softer edges
    spotLight.decay = 2;
    spotLight.distance = 20;         // Focused within a certain range
    spotLight.castShadow = true;
    
    // Improve shadow quality
    spotLight.shadow.mapSize.width = 204
    spotLight.shadow.mapSize.height = 500;

    scene.add(spotLight);

    // Target for SpotLight
    const target = new THREE.Object3D();
    target.position.set(0, 0, 0); // Adjust if needed
    scene.add(target);
    spotLight.target = target;

    const loader = new GLTFLoader().setPath('/millenium_falcon/');
    loader.load('scene.gltf', (gltf) => {
      const mesh = gltf.scene;
      mesh.scale.set(0.01, 0.01, 0.01);
      mesh.position.set(1, 1, -1);

      // Enable shadows on model
      mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(mesh);
    });

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
    const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 2;   
controls.maxDistance = 8;  
controls.minPolarAngle = Math.PI / 4; 
controls.maxPolarAngle = Math.PI / 2; 
controls.autoRotate = false; 
controls.target.set(0, 0.5, -1); 
controls.update();


    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "black",
      }}
    >
      <div ref={mountRef} style={{ height: "100%", width: "100%" }} />

      <p
        style={{
          color: "white",
          fontSize: "30px",
          margin: 0,
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        The 3D Model
      </p>
    </div>
  );
};

export default ScrollAnimation;
