/**
 * InfoBar.jsx — Bottom status bar with live stats.
 */
export default function InfoBar({ packetCount, fps, hoveredLayer }) {
  const layer = hoveredLayer ? OSI_LAYERS.find(l => l.id === hoveredLayer) : null;

  return (
    <div className="info-bar fixed bottom-0 left-0 right-0 z-[100] h-13 bg-osi-bg/95 backdrop-blur-xl border-t border-cyan-500/20 flex items-center justify-center gap-12 px-8">
      {[
        { label: 'STATUS', value: hoveredLayer ? `${layer?.name} ACTIVE` : '● LIVE' },
        { label: 'PACKETS FLOWING', value: packetCount.toLocaleString() },
        { label: 'CURRENT LAYER', value: hoveredLayer ? String(hoveredLayer).padStart(2, '0') : '—' },
        { label: 'FPS', value: fps.toString() },
      ].map((item, i) => (
        <div key={i} className="info-item flex flex-col items-center gap-1">
          <span className="font-mono text-[9px] tracking-[3px] text-white/40 uppercase">{item.label}</span>
          <span className="font-display text-sm tracking-[2px]" style={{ color: item.value.includes('LIVE') ? '#06d6a0' : item.value.includes('ACTIVE') ? (layer?.color || '#00d4ff') : '#00d4ff' }}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// Need to import OSI_LAYERS for InfoBar
import { OSI_LAYERS } from '../../data/osi-layers';
