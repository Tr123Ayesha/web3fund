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
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(3, 6, 3);
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.5;
    spotLight.decay = 2;
    spotLight.distance = 20;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 204;
    spotLight.shadow.mapSize.height = 500;
    scene.add(spotLight);
    const target = new THREE.Object3D();
    target.position.set(0, 0, 0);
    scene.add(target);
    spotLight.target = target;
    const loader = new GLTFLoader().setPath('/millenium_falcon/');
    loader.load('scene.gltf', (gltf) => {
      const mesh = gltf.scene;
      mesh.scale.set(0.01, 0.01, 0.01);
      mesh.position.set(1, 1, -1);
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

   <div style={{
        position: "absolute",
        top: "50%",
        right: "30%",
        transform: "translateY(-50%)",
        width: "450px",
        padding: "2rem",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        zIndex: 10,
      }}>
        <h2 style={{
          color: "white",
          textAlign: "center",
          marginBottom: "1.5rem",
          fontSize: "1.8rem",
          fontWeight: "600",
        }}>Login to Admin Panel</h2>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{
            display: "block",
            color: "rgba(255, 255, 255, 0.8)",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
          }}>Username</label>
          <input
            style={{
              width: "94%",
              padding: "0.8rem",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              color: "white",
              fontSize: "1rem",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            placeholder="Enter your username"
          />
        </div>
        
        <div style={{ marginBottom: "2rem" }}>
          <label style={{
            display: "block",
            color: "rgba(255, 255, 255, 0.8)",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
          }}>Password</label>
          <input
            type="password"
            style={{
              width: "94%",
              padding: "0.8rem",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              color: "white",
              fontSize: "1rem",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            placeholder="Enter your password"
          />
        </div>
        
        <button style={{
          width: "100%",
          padding: "0.8rem",
          background: "linear-gradient(135deg, #6e8efb, #a777e3)",
          border: "none",
          borderRadius: "8px",
          color: "white",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
        }}>
          Login
        </button>
        
        <div style={{
          marginTop: "1.5rem",
          textAlign: "center",
        }}>
          <a href="#" style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.9rem",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}>
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScrollAnimation;