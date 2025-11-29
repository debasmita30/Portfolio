// src/Background.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* simple animated particle field */
function Stars() {
  const ref = useRef();
  const count = 4000;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 20;
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 40;
    ref.current.rotation.y -= delta / 60;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions}>
        <PointMaterial transparent color="#ec4899" size={0.03} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

export default function Background() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 75 }} style={{ position: "fixed", inset: 0, zIndex: 0 }}>
      <color attach="background" args={["#05060d"]} />
      <Stars />
    </Canvas>
  );
}
