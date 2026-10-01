/**
 * ============================================================================
 * CELESTIAL SOUNDSCAPE ENGINE - WEB AUDIO API
 * Generates dynamic, soothing ambient background soundscapes (Day & Night)
 * purely synthesized in real-time with zero external audio assets!
 * ============================================================================
 */

class SoundscapeEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.currentTheme = 'day';
    this.oscillators = [];
    this.cricketsInterval = null;
    this.breezeInterval = null;

    this.soundBtn = document.getElementById('btn-sound-toggle');
    this.soundIcon = document.getElementById('sound-icon');

    this.init();
  }

  init() {
    if (this.soundBtn) {
      this.soundBtn.addEventListener('click', () => this.toggleSound());
    }

    // Listen to sky theme changes
    window.addEventListener('skyChange', (e) => {
      this.currentTheme = e.detail.theme;
      if (this.isPlaying) {
        this.transitionSoundscape(this.currentTheme);
      }
    });
  }

  initAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
    this.masterGain.connect(this.audioCtx.destination);
  }

  toggleSound() {
    if (!this.audioCtx) {
      this.initAudioContext();
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      if (this.soundIcon) {
        this.soundIcon.className = 'fa-solid fa-volume-high';
      }
      this.soundBtn.classList.add('active');
      this.masterGain.gain.linearRampToValueAtTime(0.08, this.audioCtx.currentTime + 1.5);
      this.startSoundscape(this.currentTheme);
      if (window.portfolio) {
        window.portfolio.showToast('Som Ambiente Dinâmico Ativado 🍃', 'info');
      }
    } else {
      if (this.soundIcon) {
        this.soundIcon.className = 'fa-solid fa-volume-xmark';
      }
      this.soundBtn.classList.remove('active');
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.8);
      setTimeout(() => this.stopAllNodes(), 900);
      if (window.portfolio) {
        window.portfolio.showToast('Som Ambiente Desativado', 'info');
      }
    }
  }

  startSoundscape(theme) {
    this.stopAllNodes();

    if (theme === 'night') {
      this.playNightSynth();
    } else {
      this.playDaySynth();
    }
  }

  transitionSoundscape(theme) {
    if (!this.isPlaying || !this.audioCtx) return;
    this.startSoundscape(theme);
  }

  /**
   * Day ambient: Soft warm harmonic pads & gentle wind filter
   */
  playDaySynth() {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    // Harmonic chord (F major 9: F3, A3, C4, E4, G4)
    const freqs = [174.61, 220.00, 261.63, 329.63, 392.00];

    freqs.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600 + idx * 100, now);

      gain.gain.setValueAtTime(0.015 / (idx + 1), now);

      // Low frequency modulation for subtle breathing effect
      const lfo = this.audioCtx.createOscillator();
      const lfoGain = this.audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, now);
      lfoGain.gain.setValueAtTime(0.008, now);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.oscillators.push(osc, lfo);
    });
  }

  /**
   * Night ambient: Cosmic deep pads & peaceful night resonance
   */
  playNightSynth() {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    // Deep Cosmic Chord (C minor 9: C2, G2, Eb3, Bb3, D4)
    const freqs = [65.41, 98.00, 155.56, 233.08, 293.66];

    freqs.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      gain.gain.setValueAtTime(0.025 / (idx + 1), now);

      // Slow deep swell
      const lfo = this.audioCtx.createOscillator();
      const lfoGain = this.audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, now);
      lfoGain.gain.setValueAtTime(0.01, now);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.oscillators.push(osc, lfo);
    });

    // Night crickets synthesizer
    this.cricketsInterval = setInterval(() => {
      if (!this.isPlaying || this.currentTheme !== 'night') return;
      this.triggerCricketChirp();
    }, 1200);
  }

  triggerCricketChirp() {
    if (!this.audioCtx || !this.isPlaying) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(4500 + Math.random() * 800, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(4800, now);
    filter.Q.setValueAtTime(5, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.008, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  stopAllNodes() {
    if (this.cricketsInterval) {
      clearInterval(this.cricketsInterval);
      this.cricketsInterval = null;
    }

    this.oscillators.forEach(osc => {
      try { osc.stop(); } catch (e) {}
      try { osc.disconnect(); } catch (e) {}
    });
    this.oscillators = [];
  }
}

// Instantiate Sound Engine
window.addEventListener('DOMContentLoaded', () => {
  window.soundEngine = new SoundscapeEngine();
});
