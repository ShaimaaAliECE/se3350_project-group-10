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
