/**
 * EncapsulationPacket.jsx — Animated torus packets traveling up the tower.
 * Each packet is a wrapped set of colored rings representing layered encapsulation.
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OSI_LAYERS } from '../../data/osi-layers';

function pseudoNoise(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export default function EncapsulationPacket({ delay = 0 }) {
  const groupRef = useRef();
  const ringRefs = useRef([]);
  const startY = useRef(-(OSI_LAYERS.length * 2.8) / 2 - 2);
  const progress = useRef(0);
  const zOffset = useMemo(() => (pseudoNoise(delay + 12.7) - 0.5) * 4, [delay]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = (clock.getElapsedTime() + delay) % 14;
    progress.current = Math.min(t / 7, 1);

    // Move upward
    groupRef.current.position.y = startY.current + progress.current * (OSI_LAYERS.length * 2.8 + 6);
    groupRef.current.rotation.y += 0.03;
    groupRef.current.rotation.z = Math.sin(t * 2) * 0.1;

    // Pulse rings
    ringRefs.current.forEach((ref, i) => {
      if (ref) ref.scale.setScalar(1 + Math.sin(t * 4 + i) * 0.15);
    });

    // Reset when off-screen
    if (progress.current >= 1) progress.current = -1;
  });

  const layerCount = OSI_LAYERS.length;
  const startYVal = -(layerCount * 2.8) / 2 - 1;

  return (
    <group ref={groupRef} position={[0, startYVal, zOffset]}>
      {OSI_LAYERS.map((layer, idx) => {
        const color = new THREE.Color(layer.color);
        const r = 0.7 - idx * 0.06;
        return (
          <mesh key={idx} ref={el => ringRefs.current[idx] = el} position={[0, -idx * 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.04, 8, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.7 - idx * 0.05} />
          </mesh>
        );
      })}
      {/* Core bright particle */}
      <mesh>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}
