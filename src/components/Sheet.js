import React from "react";
import { makeStyles } from "@material-ui/core";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";
import InputBoxes from "./InputBoxes";

const useStyles = makeStyles(() => ({
  container: {
    background: "white",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.3)",
    height: "100%",
    width: "100%",
    overflowY: "auto",
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
  },
}));

function Sheet() {
  const styles = useStyles();

  let arr = [...state.sheet];
  return (
    <div className={styles.container}>
      <div className={styles.stylesContainerInner}>
        {arr.map(function (arrObj) {
          return arrObj.map(function (arrInnerObj) {
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
                    overflow: "scroll",
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
