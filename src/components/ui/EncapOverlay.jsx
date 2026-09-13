/**
 * EncapOverlay.jsx — Full-screen encapsulation animation overlay.
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { OSI_LAYERS } from '../../data/osi-layers';

export default function EncapOverlay({ visible, onClose }) {
  const stepsRef = useRef([]);

  useEffect(() => {
    if (visible) {
      stepsRef.current.forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, delay: i * 0.15, ease: 'power2.out' });
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="encap-overlay fixed inset-0 z-[200] bg-osi-bg/95 backdrop-blur-3xl flex items-center justify-center">
      <div className="max-w-3xl w-full mx-8 text-center">
        {/* Title */}
        <h2 className="font-display text-3xl font-black tracking-[6px] mb-2"
          style={{ background: 'linear-gradient(90deg, #00d4ff, #7b2fff, #ffd700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          DATA ENCAPSULATION
        </h2>
        <p className="text-white/50 text-base mb-8">Watch data get wrapped with headers at each layer</p>

        {/* Steps */}
        <div className="flex flex-col gap-3" ref={el => { stepsRef.current[0] = el; }}>
          {OSI_LAYERS.map((layer) => (
            <div key={layer.id} className="encap-step flex items-center gap-6 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
              <span className="font-display text-2xl font-black min-w-[48px]" style={{ color: layer.color }}>
                {String(layer.id).padStart(2, '0')}
              </span>
              <div className="flex-1 text-left">
                <p className="font-display text-sm font-bold tracking-[3px]">{layer.name}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {layer.protocols.slice(0, 5).map(p => (
                    <span key={p.name} className="text-[10px] px-2 py-1 rounded font-mono" style={{ color: layer.color, border: `1px solid ${layer.color}40`, background: `${layer.color}15` }}>
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-cyan-400 text-xl opacity-50">▼</span>
            </div>
          ))}
        </div>

        {/* Close button */}
        <button onClick={onClose} className="mt-8 px-6 py-2 font-mono text-[10px] tracking-[3px] border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 rounded transition-all">
          CLOSE OVERLAY
        </button>
      </div>
    </div>
  );
}
