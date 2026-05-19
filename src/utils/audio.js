// Web Audio API Utility for custom retro dial pad tones and celebratory melodies
let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

// DTMF (Dual-Tone Multi-Frequency) frequencies for telephone dial pad
const DTMF_FREQS = {
  '1': { r: 697, c: 1209 },
  '2': { r: 697, c: 1336 },
  '3': { r: 697, c: 1477 },
  '4': { r: 770, c: 1209 },
  '5': { r: 770, c: 1336 },
  '6': { r: 770, c: 1477 },
  '7': { r: 852, c: 1209 },
  '8': { r: 852, c: 1336 },
  '9': { r: 852, c: 1477 },
  '*': { r: 941, c: 1209 },
  '0': { r: 941, c: 1336 },
  '#': { r: 941, c: 1477 }
};

/**
 * Play standard DTMF telephone dialpad tone
 * @param {string} key 
 */
export const playDialTone = (key) => {
  try {
    initAudio();
    const freqs = DTMF_FREQS[key];
    if (!freqs) return;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = freqs.r;

    osc2.type = 'sine';
    osc2.frequency.value = freqs.c;

    // Smooth gain curve to prevent popping clicks
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.02); // Lower volume to be gentle
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime + 0.12);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start();
    osc2.start();

    osc1.stop(audioCtx.currentTime + 0.2);
    osc2.stop(audioCtx.currentTime + 0.2);
  } catch (err) {
    console.warn('Audio Context failed to play:', err);
  }
};

/**
 * Play ascendence neon unlock sound (retro synth)
 */
export const playUnlockMelody = () => {
  try {
    initAudio();
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6
    const startTime = audioCtx.currentTime;

    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'triangle'; // Sweet 8-bit sound
      osc.frequency.value = freq;

      const noteStart = startTime + index * 0.08;
      const noteEnd = noteStart + 0.15;

      gainNode.gain.setValueAtTime(0, noteStart);
      gainNode.gain.linearRampToValueAtTime(0.12, noteStart + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, noteEnd);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(noteStart);
      osc.stop(noteEnd);
    });
  } catch (err) {
    console.warn('Unlock melody failed to play:', err);
  }
};

/**
 * Play a low retro error buzz
 */
export const playErrorMelody = () => {
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sawtooth'; // Buzz sound
    osc.frequency.value = 110; // Low A2 frequency

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.05);
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime + 0.25);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  } catch (err) {
    console.warn('Error buzzer failed to play:', err);
  }
};
