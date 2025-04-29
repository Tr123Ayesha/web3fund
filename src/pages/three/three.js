import React, { useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import './three.css';

const ThreeDComponent = () => {
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 60;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-5';
    document.body.appendChild(renderer.domElement);

    // Load particle texture
    const textureLoader = new THREE.TextureLoader();
    
    const particleTexture = textureLoader.load('/sparkle.png'); 

    // Create particle system
    const particleCount = 300;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      colors[i * 3] = 0.1 + Math.random() * 0.1; // R
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.2; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // 
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle material with texture and additive blending
    const particleMaterial = new THREE.PointsMaterial({
      size: 1,
      map: particleTexture,
      transparent: false,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Post-processing setup
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    composer.addPass(bloomPass);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      particleSystem.rotation.x = time * 0.1;
      particleSystem.rotation.y = time * 0.2;

      const positions = particles.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(time + i) * 0.01;
        positions[i3 + 1] += Math.cos(time + i * 0.1) * 0.01;
        positions[i3 + 2] += Math.sin(time * 0.5 + i * 0.01) * 0.01;
      }
      particles.attributes.position.needsUpdate = true;

      composer.render();
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mouse interaction
    const handleClick = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
      const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(camera);
    
      const dir = vector.sub(camera.position).normalize();
      const distance = (40 - camera.position.z) / dir.z;
      const clickPosition = camera.position.clone().add(dir.multiplyScalar(distance));
    
      const burstCount = 50;
      const geom = new THREE.BufferGeometry();
      const burstPositions = new Float32Array(burstCount * 3);
      const velocities = [];
    
      for (let i = 0; i < burstCount; i++) {
        burstPositions[i * 3] = clickPosition.x;
        burstPositions[i * 3 + 1] = clickPosition.y;
        burstPositions[i * 3 + 2] = clickPosition.z;
    
        velocities.push({
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 2
        });
      }
    
      geom.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
    
      const mat = new THREE.PointsMaterial({
        size: 3,
        map: particleTexture,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        color: 0xffffff,
        depthWrite: false
      });
    
      const burst = new THREE.Points(geom, mat);
      scene.add(burst);
    
      const startTime = Date.now();
      const animateBurst = () => {
        const elapsed = (Date.now() - startTime) / 1000;
    
        const positions = geom.attributes.position.array;
        for (let i = 0; i < burstCount; i++) {
          positions[i * 3] += velocities[i].x * 0.5;
          positions[i * 3 + 1] += velocities[i].y * 0.5;
          positions[i * 3 + 2] += velocities[i].z * 0.5;
        }
        geom.attributes.position.needsUpdate = true;
    
        if (elapsed < 2) {
          requestAnimationFrame(animateBurst);
        } else {
          scene.remove(burst);
        }
      };
      animateBurst();
    };
    
    
    
    window.addEventListener('click', handleClick);
    
    const handleMouseMove = (event) => {
      particleSystem.rotation.y = (event.clientX / window.innerWidth) * 2;
      particleSystem.rotation.x = (event.clientY / window.innerHeight) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.body.removeChild(renderer.domElement);
    };
    
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          color: 'white',
          textAlign: 'center',
          maxWidth: '800px',
          padding: '20px'
        }}
      >
        <h1 style={{ color: 'black' , color:"white" }}>Your Content Here</h1>
        <p style={{ color: 'black', color:"white" }}>
          this is the content with the different background colour.
        </p>
      </div>
    </div>
  );
};

export default ThreeDComponent;
