// src/components/AnimatedBackground.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function AnimatedBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Geometry (Particle field)
    const geometry = new THREE.BufferGeometry();
    const particles = 1500;
    const positions = new Float32Array(particles * 3);
    for (let i = 0; i < particles * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xff66cc,
      size: 0.03,
      transparent: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.x += 0.0008;
      points.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    // Responsive resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ background: "transparent" }}
    />
  );
}
