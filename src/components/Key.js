import { makeStyles } from "@material-ui/core";
import * as Tone from "tone";
import state from "../store/Store.js";
import { view } from "@risingstack/react-easy-state";

const useStyles = makeStyles((theme) => ({
  white: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    width: "3%",
    height: "100%",
    padding: 15,
    borderRight: "0",
  },
  black: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    backgroundColor: "black",
    color: "white",
    width: "1%",
    height: "50%",
    padding: 10,
    marginLeft: "-0.75%",
    border: "none",
    marginRight: "-0.75%",
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

export default view(function Key(props) {
  const styles = useStyles();
  const index = props.index;
  const note = props.note;
  const totalNotes = props.totalNotes;

  const handleClick = () => {
    //If input boxes are full, dont add
    if (state.input[state.input.length - 1] !== 0) {
      return;
    }
    playSound(totalNotes, index + 1);
    //Update Store with users choice
    let currentArr = state.input;
    let i = 0;
    while (currentArr[i] !== 0) {
      i++;
    }
    currentArr[i] = note;
    state.input = currentArr;
  };

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
      onClick={handleClick}
    >
      <> {note} </>
    </button>
  );
});
