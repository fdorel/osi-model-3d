/**
 * LayerCell.jsx — Individual OSI layer cell (reusable component).
 * Can be used standalone or within a different layout.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function LayerCell({ layer, y, isSelected, onClick }) {
  const meshRef = useRef();
  const ringTopRef = useRef();
  const ringBotRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      const pulse = 1 + Math.sin(t * 2 + layer.id) * 0.015;
      meshRef.current.scale.set(pulse, 1, pulse);
      meshRef.current.material.emissiveIntensity = isSelected ? 0.4 : 0.1 + Math.sin(t * 3 + layer.id * 0.5) * 0.05;
    }
    if (ringTopRef.current) {
      ringTopRef.current.material.opacity = isSelected ? 1 : 0.6;
      ringTopRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.02);
    }
    if (ringBotRef.current) {
      ringBotRef.current.material.opacity = isSelected ? 1 : 0.6;
    }
  });

  const color = new THREE.Color(layer.color);
  const rTop = 1.8 + Math.sin(layer.id * 0.5) * 0.2;
  const rBot = 1.6 + Math.sin(layer.id * 0.5) * 0.2;

  return (
    <group position={[0, y, 0]}>
      <mesh ref={meshRef} onClick={onClick}>
        <cylinderGeometry args={[rTop, rBot, 2.0, 32, 1, true]} />
        <meshPhysicalMaterial
          color={color} transparent opacity={isSelected ? 0.45 : 0.22}
          side={THREE.DoubleSide} metalness={0.7} roughness={0.25}
          emissive={color} emissiveIntensity={isSelected ? 0.35 : 0.1}
        />
      </mesh>

      {/* Wireframe */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[rTop + 0.01, rBot + 0.01, 2.0, 32, 1, true]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={isSelected ? 0.15 : 0.06} />
      </mesh>

      {/* Top ring */}
      <mesh ref={ringTopRef} position={[0, 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[rTop + 0.05, 0.03, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>

      {/* Bottom ring */}
      <mesh ref={ringBotRef} position={[0, -1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[rBot + 0.05, 0.03, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}
