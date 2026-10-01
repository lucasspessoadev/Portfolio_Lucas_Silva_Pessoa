import { useState, useRef, useCallback, useEffect } from 'react';

export function useSoundscape(currentTheme, showToast) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const cricketsIntervalRef = useRef(null);

  const stopAllNodes = useCallback(() => {
    if (cricketsIntervalRef.current) {
      clearInterval(cricketsIntervalRef.current);
      cricketsIntervalRef.current = null;
    }

    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch (e) {}
      try { osc.disconnect(); } catch (e) {}
    });
    oscillatorsRef.current = [];
  }, []);

  const triggerCricketChirp = useCallback(() => {
    if (!audioCtxRef.current || !isPlaying) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(4500 + Math.random() * 800, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(4800, now);
    filter.Q.setValueAtTime(5, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.035, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start(now);
    osc.stop(now + 0.18);
  }, [isPlaying]);

  const playOceanAndRainNoise = useCallback((theme) => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Create 3 seconds of white noise buffer for ocean surf & rain atmosphere
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(theme === 'night' ? 850 : 1250, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.22, now);

    // LFO for slow ocean wave swell motion (4 second wave swell cycle)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.22, now);
    lfoGain.gain.setValueAtTime(0.12, now);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    whiteNoise.start();
    oscillatorsRef.current.push(whiteNoise, lfo);
  }, []);

  const playDaySynth = useCallback(() => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const freqs = [174.61, 220.00, 261.63, 329.63, 392.00];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800 + idx * 120, now);

      gain.gain.setValueAtTime(0.18 / (idx + 1), now);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, now);
      lfoGain.gain.setValueAtTime(0.05, now);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current);

      osc.start();
      oscillatorsRef.current.push(osc, lfo);
    });

    playOceanAndRainNoise('day');
  }, [playOceanAndRainNoise]);

  const playNightSynth = useCallback(() => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const freqs = [65.41, 98.00, 155.56, 233.08, 293.66];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);

      gain.gain.setValueAtTime(0.22 / (idx + 1), now);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, now);
      lfoGain.gain.setValueAtTime(0.06, now);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current);

      osc.start();
      oscillatorsRef.current.push(osc, lfo);
    });

    playOceanAndRainNoise('night');

    cricketsIntervalRef.current = setInterval(() => {
      triggerCricketChirp();
    }, 1100);
  }, [triggerCricketChirp, playOceanAndRainNoise]);

  const startSoundscape = useCallback((theme) => {
    stopAllNodes();
    if (theme === 'night') {
      playNightSynth();
    } else {
      playDaySynth();
    }
  }, [stopAllNodes, playNightSynth, playDaySynth]);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.setValueAtTime(0.70, audioCtxRef.current.currentTime);
      masterGainRef.current.connect(audioCtxRef.current.destination);
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const toggleSound = useCallback(() => {
    initAudio();
    const ctx = audioCtxRef.current;

    setIsPlaying(prev => {
      const nextState = !prev;
      if (nextState) {
        masterGainRef.current.gain.linearRampToValueAtTime(0.70, ctx.currentTime + 1.2);
        startSoundscape(currentTheme);
        if (showToast) showToast('Som Ambiente Dinâmico Ativado 🍃🔊', 'info');
      } else {
        masterGainRef.current.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        setTimeout(() => stopAllNodes(), 900);
        if (showToast) showToast('Som Ambiente Desativado', 'info');
      }
      return nextState;
    });
  }, [initAudio, startSoundscape, currentTheme, showToast, stopAllNodes]);

  // React to theme changes while audio is playing
  useEffect(() => {
    if (isPlaying) {
      startSoundscape(currentTheme);
    }
  }, [currentTheme, isPlaying, startSoundscape]);

  return { isPlaying, toggleSound };
}
