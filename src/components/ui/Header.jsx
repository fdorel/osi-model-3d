/**
 * Header.jsx — Top navigation bar with view switcher and controls.
 */
export default function Header({ activeView, onViewSwitch, autoPlay, onAutoToggle }) {
  const views = [
    { id: 'tower', label: 'Tower View' },
    { id: 'flow', label: 'Data Flow' },
    { id: 'encapsulation', label: 'Encapsulation' },
  ];

  return (
    <header className="app-header fixed top-0 left-0 right-0 z-[100] h-16 bg-osi-bg/90 backdrop-blur-xl border-b border-cyan-500/20 flex items-center justify-between px-8">
      {/* Logo */}
      <div className="logo flex items-center gap-3">
        <span className="font-display text-3xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]">
          ⟁
        </span>
        <span className="font-display text-xl font-bold tracking-[3px]">
          OSI<span className="text-cyan-400">3D</span>
        </span>
      </div>

      {/* Nav buttons */}
      <nav className="flex gap-2">
        {views.map(v => (
          <button
            key={v.id}
            onClick={() => onViewSwitch(v.id)}
            className={`nav-btn px-5 py-2 font-mono text-[10px] tracking-[2px] uppercase border transition-all duration-300 ${
              activeView === v.id ? 'active' : ''
            }`}
            aria-pressed={activeView === v.id}
          >
            {v.label}
          </button>
        ))}
      </nav>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={onAutoToggle}
          className={`control-btn px-4 py-2 font-mono text-[10px] tracking-[2px] border transition-all duration-300 ${
            autoPlay
              ? 'border-yellow-400/50 text-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_rgba(255,215,0,0.2)]'
              : 'border-white/10 text-white/40 hover:border-yellow-500/40'
          }`}
        >
          {autoPlay ? '⏸ AUTO' : '▶ AUTO'}
        </button>
        <button
          onClick={() => onViewSwitch('tower')}
          className="control-btn px-4 py-2 font-mono text-[10px] tracking-[2px] border border-white/10 text-white/40 hover:border-cyan-500/40 transition-all duration-300"
        >
          ↺ RESET
        </button>
      </div>
    </header>
  );
}
