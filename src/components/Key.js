import { makeStyles } from "@material-ui/core";
import * as Tone from "tone";

const useStyles = makeStyles((theme) => ({
  white: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    width: 80,
    height: 300,
    padding: 5,
    zIndex: -1,
  },
  black: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    backgroundColor: "black",
    color: "white",
    width: 50,
    height: 170,
    padding: 5,
    zIndex: 2,
    marginLeft: -25,
    marginRight: -25,
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
    currentNoteStandard = parseInt(currentNote - 12 * noteLevel);
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
      style={{ alignItems: "flex-end", paddingBottom: 20 }}
      className={
        index % 12 === 1
          ? styles.black
          : index % 12 === 3
          ? styles.black
          : index % 12 === 6
          ? styles.black
          : index % 12 === 8
          ? styles.black
          : index % 12 === 10
          ? styles.black
          : styles.white
      }
      onClick={() => {
        playSound(totalNotes, index + 1);
      }}
    >
      {" "}
      {index + 1}{" "}
    </button>
  );
}

export default Key;
