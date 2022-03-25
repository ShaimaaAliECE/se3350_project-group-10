import React from "react";
import { makeStyles } from "@material-ui/core";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";
import InputBoxes from "./InputBoxes";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    background: "white",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.3)",
    height: "100%",
    width: "100%",
  },
  lines: {
    borderBottom: 15,
    width: "100%",
    color: "black",
  },
  lineRow: {
    zIndex: 2,
  },
  stylesContainerInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
}));

function Sheet() {
  const styles = useStyles();
  let level = useParams().level;

  let arr = [...state.sheet];

  return (
    <div
      className={styles.container}
      style={level != 5 ? { overflowX: "hidden" } : { overflow: "scroll" }}
    >
      <div className={styles.stylesContainerInner}>
        {arr.map(function (arrObj) {
          console.log(arrObj);
          return arrObj.map(function (arrInnerObj) {
            console.log(arrInnerObj);
            return (
              <div
                style={{
                  position: "relative",
                  marginTop: 50,
                }}
              >
                <Lines />
                <div
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: " translate(-50%, -50%)",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <InputBoxes arrInnerObj={arrInnerObj} />
                </div>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

//creating function component lines
function Lines() {
  const style = useStyles();
  return (
    <div className={style.lineRow}>
      <hr className={style.lines}></hr>
      <hr className={style.lines}></hr>
      <hr className={style.lines}></hr>
      <hr className={style.lines}></hr>
      <hr className={style.lines}></hr>
    </div>
  );
}

export default view(Sheet);
