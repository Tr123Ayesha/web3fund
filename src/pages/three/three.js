import React, { useEffect } from 'react';
import * as THREE from 'three';
import "./three.css"; // Import your CSS file for styling

const ThreeDComponent = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    document.body.appendChild(renderer.domElement);
  
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  
    camera.position.z = 5; // Keep it small for the cube
  
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  
    return () => {
      document.body.removeChild(renderer.domElement); // Important: Clean up on unmount
    };
  }, []);
  

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "relative" }}>
      {/* <p style={{ color: "white", fontSize: "24px" }}>Your content goes here</p> */}

      <div className="info" style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        color: 'white', 
        fontSize: '18px', 
        zIndex: '1' 
      }}>
        This is your description, which will be displayed over the 3D background.
      </div>
    </div>
  );
};

export default ThreeDComponent;
