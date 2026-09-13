/**
 * ProtocolPanel.jsx — Right-side detail panel for a selected layer's protocols.
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { OSI_LAYERS } from '../../data/osi-layers';

export default function ProtocolPanel({ layerId, onClose }) {
  const panelRef = useRef();

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(panelRef.current, { x: '100%', opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
    }
    // Scroll to top
    panelRef.current?.querySelector('.panel-inner')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [layerId]);

  const layer = OSI_LAYERS.find(l => l.id === layerId);
  if (!layer) return null;

  const color = layer.color;

  const protoTags = (proto, idx) => {
    const tagColor = ['#00d4ff','#7b2fff','#ff9f1c','#06d6a0','#ff4d6d','#3a7bd5','#ffd700','#ff006e'][idx % 8];
    return (
      <div key={proto.name} className="proto-card p-3 rounded-lg border bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 cursor-pointer"
        style={{ borderColor: `${tagColor}30` }}
        onClick={() => {}}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-sm font-bold" style={{ color: tagColor }}>{proto.name}</span>
          {proto.port && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 font-mono text-white/50">
              :{proto.port}
            </span>
          )}
        </div>
        <p className="proto-full text-[10px] mb-1" style={{ color }}>{proto.full}</p>
        <p className="proto-desc text-[11px] leading-relaxed">{proto.desc}</p>
      </div>
    );
  };

  return (
    <aside
      ref={panelRef}
      className="protocol-panel fixed top-16 right-0 bottom-[52px] w-96 z-50 bg-osi-card/95 backdrop-blur-xl border-l border-cyan-500/20 overflow-y-auto osi-scroll panel-inner"
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-cyan-400 text-lg transition-colors z-10">
        ✕
      </button>

      <div className="p-6 pt-8">
        {/* Layer header */}
        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-cyan-500/20">
          <span className="font-display text-5xl font-black" style={{ color }}>{String(layer.id).padStart(2,'0')}</span>
          <div>
            <h2 className="font-display text-lg font-bold tracking-[3px]" style={{ color }}>{layer.name}</h2>
            <p className="text-sm text-white/40 mt-1">{layer.description}</p>
          </div>
        </div>

        {/* Protocols */}
        <div className="mb-6">
          <p className="font-mono text-[10px] tracking-[3px] text-cyan-400 mb-3 uppercase">// PROTOCOLS ({layer.protocols.length})</p>
          <div className="grid grid-cols-1 gap-2">
            {layer.protocols.map((proto, i) => protoTags(proto, i))}
          </div>
        </div>

        {/* Functions */}
        <div>
          <p className="font-mono text-[10px] tracking-[3px] text-cyan-400 mb-3 uppercase">// CORE FUNCTIONS</p>
          <ul className="space-y-2">
            {layer.functions.map((fn, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 text-sm text-white/60 leading-relaxed">
                <span style={{ color }} className="text-base mt-0.5 flex-shrink-0">▸</span>
                {fn}
              </li>
            ))}
          </ul>
        </div>

        {/* Mini protocol flow diagram */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="font-mono text-[10px] tracking-[3px] text-cyan-400 mb-3 uppercase">// LAYER RELATIONSHIP</p>
          <div className="flex items-center gap-2 flex-wrap">
            {OSI_LAYERS.map(l => (
              <div key={l.id} className="flex items-center gap-1">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-display font-bold border transition-all"
                  style={{
                    borderColor: l.color,
                    color: l.id === layer.id ? l.color : 'white/30',
                    backgroundColor: l.id === layer.id ? `${l.color}20` : 'transparent',
                  }}
                >
                  {l.id}
                </span>
                {l.id !== OSI_LAYERS[OSI_LAYERS.length - 1].id && (
                  <span className="text-white/20 text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
