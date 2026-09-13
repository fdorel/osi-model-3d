/**
 * OSITower.jsx — The central 3D tower made of 7 layered cylinders.
 * Each layer is a translucent cylinder with glowing edge rings, wireframe overlay,
 * and orbiting protocol nodes.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { OSI_LAYERS } from '../../data/osi-layers';

export default function OSITower({ view, selectedLayer, onHover }) {
  const meshRefs = useRef({});
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      if (view === 'tower') {
        groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.3;
      } else if (view === 'flow') {
        groupRef.current.rotation.y = t * 0.1 + 0.8;
      } else if (view === 'encapsulation') {
        groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
      }
    }
  });

  const layerSpacing = 2.8;
  const startY = 8.4;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Connection pillars — vertical energy lines */}
      {OSI_LAYERS.map((layer, idx) => {
        const y = startY - idx * layerSpacing;
        const nextY = startY - (idx + 1) * layerSpacing;
        const color = new THREE.Color(layer.color);

        return (
          <group key={layer.id}>
            {/* Main cylinder */}
            <mesh
              ref={(el) => { meshRefs.current[layer.id] = el; }}
              position={[0, y, 0]}
              onClick={(e) => { e.stopPropagation(); onHover?.(layer.id); }}
              onPointerOver={() => document.body.style.cursor = 'pointer'}
              onPointerOut={() => document.body.style.cursor = 'default'}
            >
              <cylinderGeometry args={[1.9, 1.7, 2.0, 32, 1, true]} />
              <meshPhysicalMaterial
                color={color}
                transparent
                opacity={selectedLayer === layer.id ? 0.45 : 0.22}
                side={THREE.DoubleSide}
                metalness={0.7}
                roughness={0.25}
                emissive={color}
                emissiveIntensity={selectedLayer === layer.id ? 0.35 : 0.1}
              />
            </mesh>

            {/* Wireframe overlay */}
            <mesh position={[0, y, 0]}>
              <cylinderGeometry args={[1.92, 1.72, 2.0, 32, 1, true]} />
              <meshBasicMaterial
                color={color} wireframe transparent opacity={selectedLayer === layer.id ? 0.15 : 0.06}
              />
            </mesh>

            {/* Top glow ring */}
            <mesh position={[0, y + 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.95, 0.03, 8, 64]} />
              <meshBasicMaterial color={color} transparent opacity={selectedLayer === layer.id ? 0.9 : 0.6} />
            </mesh>

            {/* Bottom glow ring */}
            <mesh position={[0, y - 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.75, 0.03, 8, 64]} />
              <meshBasicMaterial color={color} transparent opacity={selectedLayer === layer.id ? 0.9 : 0.6} />
            </mesh>

            {/* Vertical energy beam to next layer */}
            {idx < OSI_LAYERS.length - 1 && (
              <line>
                <bufferGeometry>
                  <float32BufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([0, y - 1.0, 0, 0, nextY + 1.0, 0])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial
                  color={color.clone().lerp(new THREE.Color(OSI_LAYERS[idx + 1].color), 0.5)}
                  transparent opacity={0.25}
                />
              </line>
            )}

            {/* Layer number sprite */}
            <mesh position={[-3.8, y, 0]}>
              <planeGeometry args={[2.2, 2.2]} />
              <meshBasicMaterial
                color={color} transparent opacity={selectedLayer === layer.id ? 0.25 : 0.1}
                depthWrite={false}
              />
            </mesh>
            <Text
              position={[-3.8, y, 0.01]}
              fontSize={0.9}
              color={color}
              fontFamily="Orbitron"
              fontStyle="bold"
              anchorX="center"
              anchorY="middle"
            >
              {String(layer.id).padStart(2, '0')}
            </Text>

            {/* Layer name sprite */}
            <Text
              position={[3.5, y, 0]}
              fontSize={0.28}
              color={color}
              fontFamily="Orbitron"
              fontStyle="bold"
              anchorX="left"
              anchorY="middle"
              letterSpacing={0.15}
            >
              {layer.name}
            </Text>

            {/* Protocol nodes orbiting the layer */}
            {layer.protocols.map((proto, pIdx) => {
              const angle = (pIdx / layer.protocols.length) * Math.PI * 2;
              const r = 2.7;

              return (
                <Sphere
                  key={proto.name}
                  args={[0.1, 16, 16]}
                  position={[Math.cos(angle) * r, y + Math.sin(pIdx) * 0.5, Math.sin(angle) * r]}
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  <meshPhysicalMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={selectedLayer === layer.id ? 1.2 : 0.6}
                    metalness={0.5}
                    roughness={0.3}
                    transparent
                    opacity={0.9}
                  />
                </Sphere>
              );
            })}
          </group>
        );
      })}

      {/* Floor grid */}
      <gridHelper args={[60, 60, '#0a1628', '#0a1628']} position={[0, -12.5, 0]}>
        <meshBasicMaterial transparent opacity={0.25} />
      </gridHelper>

      {/* Glowing floor plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -12.49, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#050a18" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
