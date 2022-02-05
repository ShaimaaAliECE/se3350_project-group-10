import { makeStyles } from "@material-ui/core";
import Key from "./Key";
import { view } from "@risingstack/react-easy-state";
import state from "../store/Store";

const useStyles = makeStyles((theme) => ({
  piano: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  whiteKey: {
    padding: 10,
  },
  blackKey: {
    backgroundColor: "back",
    zIndex: 2,
  },
}));

function RenderKeys(x) {
  let temp = [];
  //where x is the piano length
  for (let i = 0; i < x; i++) {
    temp.push(
      <div style={{}} key={i}>
        <Key index={i} totalNotes={x} />
      </div>
    );
  }
  return temp;
}

export default view(function Piano() {
  const styles = useStyles();

  //import store
  //get max# piano keys from store
  const pianoLength = Math.max(...state.ans[0].array);
  return <div className={styles.piano}>{RenderKeys(pianoLength)}</div>;
});
