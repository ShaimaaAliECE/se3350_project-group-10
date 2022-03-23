import { makeStyles } from "@material-ui/core";
import Key from "./Key";
import { view } from "@risingstack/react-easy-state";
import state from "../store/Store";

const useStyles = makeStyles((theme) => ({
  piano: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "black",
  },
  whiteKey: {
    padding: 10,
  },
  blackKey: {
    backgroundColor: "back",
    zIndex: 2,
  },
}));

function RenderKeys(x, notesArr) {
  let arr = [];
  let numberStore = [];

  //Custom piano
  if (notesArr) {
    for (let i = 0; i < notesArr.length; i++) {
      if (numberStore.indexOf(notesArr[i]) === -1) {
        numberStore.push(notesArr[i]);
        arr.push(
          <div style={{}} key={i}>
            <Key
              index={numberStore.length - 1}
              totalNotes={x}
              note={notesArr[i]}
            />
          </div>
        );
      }
    }
  } else {
    //where x is the piano length
    for (let i = 0; i < x; i++) {
      arr.push(
        <div style={{}} key={i}>
          <Key index={i} totalNotes={x} note={i + 1} />
        </div>
      );
    }
  }

  return arr;
}

export default view(function Piano(props) {
  const styles = useStyles();
  const level = props.level;
  let notesArr;
  if (level == 5) {
    //Render Piano with only needed values
    notesArr = state.ans[state.ans.length - 1].array;
  }

  //import store
  //get max# piano keys from store
  const pianoLength = Math.max(...state.ans[0].array);
  return (
    <div className={styles.piano}>{RenderKeys(pianoLength, notesArr)}</div>
  );
});
