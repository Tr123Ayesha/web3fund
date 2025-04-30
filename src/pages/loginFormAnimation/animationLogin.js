import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const LoginFormAnimation = () => {
  const mountRef = useRef(null); // Reference to attach the renderer

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.z = 10;  // Adjusted for better visibility
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 1;
    
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Ambient light
    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    // Fog effect
    scene.fog = new THREE.Fog(0x03544e, 0.01);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color);

    // Attach the renderer to the mountRef div
    mountRef.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.load('/smoke.png', function(texture) {
      const CloudGeo = new THREE.PlaneGeometry(100, 120); // Increase the size to make it more noticeable
      const cloudMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

      // Create 50 cloud meshes
      for (let p = 0; p < 50; p++) {
        const cloudMesh = new THREE.Mesh(CloudGeo, cloudMaterial);

        // Position cloud meshes in the center but with random distribution
        cloudMesh.position.set(Math.random() * 600 - 300, Math.random() * 200 - 100, Math.random() * 100 - 50);  // Random position but centered

        cloudMesh.rotation.x = 1.16; // Randomize rotation on all axes
        cloudMesh.rotation.y = 1;
        cloudMesh.rotation.z = Math.random() * Math.PI * 2;

        cloudMesh.material.opacity = 0.55; // Set cloud opacity

        // Scale down the cloud size
        cloudMesh.scale.set(0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5); // Random scale for each cloud

        scene.add(cloudMesh);
      }
    });

    // Animation/render function
    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    // Start rendering loop
    render();

    // Cleanup on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="login-form-animation" ref={mountRef} style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Your login form or content can go here */}
    </div>
  );
};

export default LoginFormAnimation;
