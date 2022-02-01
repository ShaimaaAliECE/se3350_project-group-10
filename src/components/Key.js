import { makeStyles } from "@material-ui/core";
import * as Tone from "tone";

const useStyles = makeStyles((theme) => ({
  white: {
    display: "flex",
    backgroundColor: "white",
    width: "25px",
    height: "75px",
    padding: "5px",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  black: {
    display: "flex",
    backgroundColor: "black",
    color: "white",
    width: "12px",
    height: "45px",
    padding: "5px",
    alignItems: "flex-start",
    justifyContent: "center",
  },
}));

//Where notes is # of possible notes, currentNote is index of current Note
function playSound(totalNotes, currentNote) {
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const synth = new Tone.Synth().toDestination();
  let octave;
  let currentNoteStandard;
  let note;

  //Based on how many notes, start at a different octave
  //notes /12 gives u # of octaves needed
  if (totalNotes / 12 < 2) {
    octave = 4;
  } else if (totalNotes / 12 === 3) {
    octave = 3;
  } else {
    octave = 2;
  }
  let noteLevel = parseInt(currentNote / 12);
  if (currentNote > 12) {
    currentNoteStandard = currentNote - 12 * noteLevel - 1;
  } else {
    currentNoteStandard = currentNote - 1;
  }
  //for every note level increment octave, if note level is 1, add 1 to octave
  if (currentNote !== 12) {
    octave += noteLevel;
  }
  note = notes[currentNoteStandard] + "" + parseInt(octave);
  synth.triggerAttackRelease(note, "8n");
}
function Key(props) {
  const styles = useStyles();
  const index = props.index;
  const totalNotes = props.totalNotes;
  return (
    <button
      className={index % 2 === 0 ? styles.white : styles.black}
      onClick={() => {
        playSound(totalNotes, index);
      }}
    >
      {" "}
      {index}{" "}
    </button>
  );
}

export default Key;
