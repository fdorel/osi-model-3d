/**
 * App.jsx — Root React component.
 * Composes all UI panels and the Three.js canvas.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import Scene from './components/canvas/Scene';
import Header from './components/ui/Header';
import LayerSidebar from './components/ui/LayerSidebar';
import ProtocolPanel from './components/ui/ProtocolPanel';
import InfoBar from './components/ui/InfoBar';
import EncapOverlay from './components/ui/EncapOverlay';
import Tooltip from './components/ui/Tooltip';
import { Anim } from './lib/gsap-animations';
import { OSI_LAYERS } from './data/osi-layers';

export default function App() {
  const [activeView, setActiveView] = useState('tower');
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [showEncap, setShowEncap] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [packetCount, setPacketCount] = useState(0);
  const [fps, setFps] = useState(60);
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const layerListRef = useRef([]);

  // Trigger entrance animation on mount
  useEffect(() => {
    Anim.playEntrance();
    Anim.animateLayerList(layerListRef.current);
  }, []);

  // View switcher
  const switchView = useCallback((view) => {
    setActiveView(view);
    setShowEncap(false);
    switch (view) {
      case 'tower': Anim.animateTowerView(); break;
      case 'flow':
        Anim.animateFlowView();
        setPacketCount(c => c + 30);
        break;
      case 'encapsulation':
        setShowEncap(true);
        break;
    }
  }, []);

  // Auto-play sequence
  useEffect(() => {
    if (!autoPlay) return;
    const views = ['tower', 'flow', 'encapsulation'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % views.length;
      switchView(views[idx]);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay, switchView]);

  // Packet count ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount(c => c + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // FPS counter
  useEffect(() => {
    let frame = 0, lastTime = performance.now();
    const tick = () => {
      frame++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(frame);
        frame = 0;
        lastTime = now;
      }
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {/* Loader */}
      <div id="loader" className="fixed inset-0 z-[9999] bg-osi-bg flex items-center justify-center transition-opacity duration-700">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full loader-ring relative" />
          <p className="font-mono text-osi-cyan text-xs tracking-[4px] mb-4">INITIALIZING OSI ENGINE...</p>
          <div className="w-48 h-0.5 bg-white/10 rounded overflow-hidden">
            <div className="h-full bg-gradient-to-r from-osi-cyan to-purple-500 loader-progress" />
          </div>
        </div>
      </div>

      {/* Header */}
      <Header
        activeView={activeView}
        onViewSwitch={switchView}
        autoPlay={autoPlay}
        onAutoToggle={() => setAutoPlay(v => !v)}
      />

      {/* 3D Canvas */}
      <div id="canvas-container" className="absolute inset-0 z-10">
        <Canvas
          shadows
          camera={{ position: [0, 2, 18], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={['#050a18']} />
          <fog attach="fog" args={['#050a18', 0.012, 80]} />
          <ambientLight intensity={0.4} color="#1a2a4a" />
          <directionalLight position={[5, 10, 7]} intensity={0.8} color="#00d4ff" castShadow />
          <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#7b2fff" />
          <pointLight position={[0, 8, -8]} intensity={0.5} color="#ffd700" distance={30} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
          <Environment preset="city" />
          <Scene
            view={activeView}
            selectedLayer={selectedLayer}
            onLayerHover={setHoveredLayer}
          />
          <OrbitControls
            enablePan={false}
            minDistance={8}
            maxDistance={40}
            autoRotate={activeView === 'tower'}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Sidebar */}
      <LayerSidebar
        layers={OSI_LAYERS}
        selectedLayer={selectedLayer}
        hoveredLayer={hoveredLayer}
        onSelect={(id) => {
          setSelectedLayer(id === selectedLayer ? null : id);
        }}
        onHover={setHoveredLayer}
        listRef={layerListRef}
      />

      {/* Protocol Detail Panel */}
      <ProtocolPanel
        layerId={selectedLayer}
        onClose={() => { setSelectedLayer(null); }}
      />

      {/* Info Bar */}
      <InfoBar packetCount={packetCount} fps={fps} hoveredLayer={hoveredLayer} />

      {/* Encapsulation Overlay */}
      <EncapOverlay visible={showEncap} onClose={() => setShowEncap(false)} />

      {/* Tooltip */}
      <Tooltip />
    </>
  );
}
