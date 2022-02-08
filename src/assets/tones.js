import * as Tone from "tone";


export function playIncorrectSound() {
    
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("D3", "8n", now );
  synth.triggerAttackRelease("C#3", "8n", now + 0.125);
  synth.triggerAttackRelease("C3", "8n", now +0.25);

}

export function playCorrectSound() {
  
  
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("C4", "8n", now);
  synth.triggerAttackRelease("E4", "8n", now + 0.125);
  synth.triggerAttackRelease("G4", "8n", now + 0.25);
  synth.triggerAttackRelease("C5", "8n", now + 0.325);
}

export function winSound() {
  const synth = new Tone.AMSynth().toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("C4", "8n", now);
  synth.triggerAttackRelease("E4", "8n", now + 0.125);
  synth.triggerAttackRelease("G4", "8n", now + 0.25);
  synth.triggerAttackRelease("A4", "8n", now + 0.375);
  synth.triggerAttackRelease("G4", "8n", now + 0.75);

  synth.triggerAttackRelease("D4", "8n", now+ 1.125);
  synth.triggerAttackRelease("F#4", "8n", now + 1.25);
  synth.triggerAttackRelease("A4", "8n", now + 1.375);
  synth.triggerAttackRelease("B4", "8n", now + 1.5);
  synth.triggerAttackRelease("A4", "8n", now + 1.825);

  synth.triggerAttackRelease("E4", "8n", now+ 2.2);
  synth.triggerAttackRelease("A4", "8n", now + 2.325);
  synth.triggerAttackRelease("B4", "8n", now + 2.45);
  synth.triggerAttackRelease("C5", "8n", now + 2.575);
  synth.triggerAttackRelease("B4", "8n", now + 2.950);
  synth.triggerAttackRelease("C5", "8n", now + 3.075);

}

export function loseSound() {
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("F3", "16n", now);
  synth.triggerAttackRelease("G#3", "16n", now + 0.25);
  synth.triggerAttackRelease("G#3", "16n", now + 0.5);
  synth.triggerAttackRelease("G3", "8n", now + 0.825);
  synth.triggerAttackRelease("F3", "8n", now + 0.95);
  synth.triggerAttackRelease("D#3", "8n", now + 1.2);
  synth.triggerAttackRelease("C2", "8n", now + 1.325);
  synth.triggerAttackRelease("D#3", "8n", now + 1.825);
  synth.triggerAttackRelease("C2", "8n", now + 1.95);

}