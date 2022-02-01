import * as Tone from "tone";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "B"];
//Where notes is # of possible notes, currentNote is index of current Note
function playSound(notes, currentNote) {
  const synth = new Tone.Synth().toDestination();
  let octave;
  let currentNoteStandard;
  let note;
  //Based on how many notes, start at a different octave
  //notes /12 gives u # of octaves needed
  if (notes / 12 < 2) {
    octave = 4;
  } else if (notes / 12 === 3) {
    octave = 3;
  } else {
    octave = 2;
  }

  let noteLevel = parseInt(currentNote / 12);

  currentNoteStandard = parseInt(currentNote - 12 * noteLevel);

  //for every note level increment octave, if note level is 1, add 1 to octave
  octave += noteLevel;
  console.loog(currentNoteStandard);
  note = notes[currentNoteStandard] + "" + octave;

  console.log(note);
  synth.triggerAttackRelease(note, "8n");
}

export default playSound;
