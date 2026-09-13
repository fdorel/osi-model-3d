/**
 * LayerSidebar.jsx — Left sidebar with clickable layer list.
 */
import { useRef, useEffect } from 'react';

export default function LayerSidebar({ layers, selectedLayer, hoveredLayer, onSelect, onHover, listRef }) {
  const ref = useRef([]);

  useEffect(() => {
    listRef.current = ref.current;
  }, [listRef]);

  return (
    <aside className="layer-sidebar fixed top-16 left-0 bottom-[52px] w-72 z-50 bg-osi-card/95 backdrop-blur-xl border-r border-cyan-500/20 p-4 overflow-y-auto osi-scroll">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-cyan-500/20">
        <h3 className="font-display text-xs tracking-[4px] text-cyan-400">LAYERS</h3>
        <span className="font-mono text-[10px] text-white/40 bg-cyan-500/10 px-2 py-1 rounded-full">7 LAYERS</span>
      </div>

      <ul className="layer-list flex flex-col gap-2">
        {layers.map((layer, idx) => (
          <li
            key={layer.id}
            ref={el => ref.current[idx] = el}
            onClick={() => onSelect(layer.id)}
            onMouseEnter={() => onHover?.(layer.id)}
            onMouseLeave={() => onHover?.(null)}
            className={`layer-item relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
              selectedLayer === layer.id ? 'active' : ''
            }`}
            style={{ '--layer-color': layer.color }}
          >
            {/* Left accent bar */}
            <span
              className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg transition-all duration-300"
              style={{
                backgroundColor: layer.color,
                opacity: selectedLayer === layer.id ? 1 : hoveredLayer === layer.id ? 0.7 : 0.3,
              }}
            />

            {/* Layer number */}
            <span className="layer-number font-display text-xl font-black" style={{ color: layer.color }}>
              {String(layer.id).padStart(2, '0')}
            </span>

            {/* Info */}
            <div className="layer-info">
              <p className="layer-name font-display font-bold tracking-[2px] text-white truncate">{layer.name}</p>
              <p className="layer-count truncate mt-0.5">{layer.protocols.length} protocols</p>
            </div>

            {/* Arrow */}
            <span className="text-cyan-400 opacity-0 transition-opacity duration-200" style={{ opacity: hoveredLayer === layer.id ? 1 : 0 }}>
              ›
            </span>
          </li>
        ))}
      </ul>

      {/* Bottom note */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <p className="font-mono text-[9px] text-white/20 tracking-widest leading-relaxed">
          CLICK A LAYER<br />TO EXPLORE PROTOCOLS
        </p>
      </div>
    </aside>
  );
}
