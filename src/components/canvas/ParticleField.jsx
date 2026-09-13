/**
 * ParticleField.jsx — Floating ambient particles around the tower.
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function deterministicNoise(i) {
  const value = Math.sin(i * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export default function ParticleField() {
  const count = 200;
  const meshRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (deterministicNoise(i * 1.41) - 0.5) * 16;
      arr[i * 3 + 1] = (deterministicNoise(i * 2.73) - 0.5) * 24;
      arr[i * 3 + 2] = (deterministicNoise(i * 3.19) - 0.5) * 12;
    }
    return arr;
  }, []);

  const velocities = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: (deterministicNoise(i * 8.91) - 0.5) * 0.01,
      y: (deterministicNoise(i * 4.57) - 0.5) * 0.008,
      z: (deterministicNoise(i * 6.13) - 0.5) * 0.01,
    })), []
  );

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      pos[i * 3 + 2] += velocities[i].z;
      if (pos[i * 3 + 1] > 12) pos[i * 3 + 1] = -12;
      if (pos[i * 3 + 1] < -12) pos[i * 3 + 1] = 12;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#00d4ff" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}
