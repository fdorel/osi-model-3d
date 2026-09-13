/**
 * useOSIAudio.jsx — Optional ambient audio hook.
 * Creates a Web Audio API oscillator that generates subtle hums per layer.
 */
import { useEffect, useRef } from 'react';

const LAYER_FREQS = [130.81, 146.83, 164.81, 196.00, 220.00, 261.63, 293.66]; // C3 to D4

export function useOSIAudio(enabled) {
  const ctxRef = useRef(null);
  const oscsRef = useRef([]);
  const gainRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      oscsRef.current.forEach(o => { try { o.stop(); } catch { /* Audio sources are stopped safely when disabled */ } });
      oscsRef.current = [];
      return;
    }

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.03;
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    LAYER_FREQS.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0.5 / (i + 1);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      oscsRef.current.push(osc);
    });

    return () => {
      masterGain.disconnect();
      oscsRef.current.forEach(o => { try { o.stop(); } catch { /* Audio sources are stopped safely on cleanup */ } });
    };
  }, [enabled]);
}
