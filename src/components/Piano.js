import { makeStyles } from "@material-ui/core";
import Key from "./Key";
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
      <div style={{}}>
        <Key index={i} key={i} totalNotes={x} />
      </div>
    );
  }
  return temp;
}
function Piano() {
  const styles = useStyles();

  //import store
  //get max# piano keys from store
  const pianoLength = 30;
  return <div className={styles.piano}>{RenderKeys(pianoLength)}</div>;
}

export default Piano;
