/**
 * Tooltip.jsx — Floating tooltip for hovered layers/protocols.
 */
import { useEffect, useState } from 'react';
import { OSI_LAYERS } from '../../data/osi-layers';

export default function Tooltip() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [content, setContent] = useState(null);

  useEffect(() => {
    const handleMove = (e) => {
      const target = e.target;
      if (target.dataset?.layerId !== undefined || target.dataset?.protocolName !== undefined) {
        setPos({ x: e.clientX + 15, y: e.clientY - 10 });

        if (target.dataset.protocolName) {
          const layer = OSI_LAYERS.find(l => l.id === Number(target.dataset.layerId));
          const proto = layer?.protocols.find(p => p.name === target.dataset.protocolName);
          setContent({ title: proto?.name, desc: `${layer?.id}. ${layer?.name} — ${proto?.desc}`, color: layer?.color });
        } else if (target.dataset.layerId !== undefined) {
          const layer = OSI_LAYERS.find(l => l.id === Number(target.dataset.layerId));
          setContent({ title: `${layer?.id}. ${layer?.name}`, desc: layer?.description, color: layer?.color });
        } else {
          setContent(null);
        }
      } else {
        setContent(null);
      }
    };

    document.addEventListener('mousemove', handleMove);
    return () => document.removeEventListener('mousemove', handleMove);
  }, []);

  if (!content) return null;

  return (
    <div id="tooltip" className="fixed z-[300] pointer-events-none" style={{ left: pos.x, top: pos.y }}>
      <div className="bg-osi-bg/95 border border-cyan-500/40 rounded-lg px-4 py-3 max-w-[260px] shadow-[0_0_30px_rgba(0,212,255,0.3)]">
        <p className="font-display text-sm font-bold tracking-[2px] mb-1" style={{ color: content.color }}>{content.title}</p>
        <p className="text-xs text-white/50 leading-relaxed">{content.desc}</p>
      </div>
    </div>
  );
}
