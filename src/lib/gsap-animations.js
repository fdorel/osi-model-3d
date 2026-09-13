/**
 * GSAP Animation Library — Centralized timeline and tween management.
 */
import gsap from 'gsap';

export const Anim = {
  // Layer list items staggered entrance
  animateLayerList(items) {
    items.forEach((item, idx) => {
      gsap.set(item, { opacity: 0, x: -20 });
      gsap.to(item, {
        opacity: 1, x: 0, duration: 0.6,
        delay: 0.3 + idx * 0.1, ease: 'power3.out'
      });
    });
  },

  // Camera fly-in for tower view
  animateTowerView() {
    return gsap.timeline()
      .fromTo('#canvas-container', { opacity: 0 }, { opacity: 1, duration: 1 })
      .from('.layer-item', {
        opacity: 0, x: -30, stagger: 0.08, duration: 0.5, ease: 'back.out(1.7)'
      }, '-=0.5');
  },

  // Side-angle view for data flow
  animateFlowView() {
    return gsap.timeline()
      .to('#canvas-container', { opacity: 0, duration: 0.3 })
      .to({}, { duration: 0.1 })
      .to('#canvas-container', { opacity: 1, duration: 0.5 });
  },

  // Update status text with pulse effect
  updateStatus(text) {
    const el = document.getElementById('status-text');
    if (!el) return;
    gsap.fromTo(el,
      { scale: 1.4, color: '#ffd700' },
      { scale: 1, color: '#00d4ff', duration: 0.4, ease: 'power2.out' }
    );
    el.textContent = text;
  },

  // Highlight a specific layer (dim others)
  highlightLayer(layerId, meshRefMap) {
    Object.entries(meshRefMap).forEach(([id, ref]) => {
      const targetOpacity = id === String(layerId) ? 0.5 : 0.12;
      const targetEmissive = id === String(layerId) ? 0.4 : 0.05;
      if (ref.current?.material) {
        gsap.to(ref.current.material, {
          opacity: targetOpacity, emissiveIntensity: targetEmissive, duration: 0.4
        });
      }
    });
  },

  // Reset all layers to default
  resetLayerHighlights(meshRefMap) {
    Object.values(meshRefMap).forEach(ref => {
      if (ref.current?.material) {
        gsap.to(ref.current.material, {
          opacity: 0.25, emissiveIntensity: 0.1, duration: 0.5
        });
      }
    });
  },

  // Entrance animation for the entire app
  playEntrance() {
    return gsap.timeline()
      .from('.logo', { opacity: 0, x: -40, duration: 0.8, ease: 'power3.out' })
      .from('.nav-btn', {
        opacity: 0, y: -15, stagger: 0.08, duration: 0.5, ease: 'back.out(1.7)'
      }, '-=0.4')
      .from('.control-btn', { opacity: 0, scale: 0.7, stagger: 0.1 }, '-=0.3')
      .from('.info-item', { opacity: 0, y: 15, stagger: 0.05, duration: 0.4 }, '-=0.2')
      .add(() => document.getElementById('loader')?.classList.add('hidden'));
  }
};

export default Anim;
