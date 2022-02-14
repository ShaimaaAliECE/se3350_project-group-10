import { makeStyles } from "@material-ui/core";
import React from "react";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";

const useStyles = makeStyles((theme) => ({
  stylesContainerOuter: {
    display: "flex",
    flexDirection: "row",
  },

  stylesContainerInner: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    color: "black",
    margin: 15,
  },
}));

const stylesMainInner = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function chunk(array, limit) {
  const chunks = Math.ceil(array.length / limit);
  return Array.from({ length: chunks }, (_, i) =>
    array.slice(
      Math.ceil((i * array.length) / chunks),
      Math.ceil(((i + 1) * array.length) / chunks)
    )
  );
}

function CreateMap(arrOuter) {
  //Maps user entered array

  const style = useStyles();

  return (
    <div className={style.stylesContainerOuter}>
      {arrOuter.map((arrInner) => (
        <div className={style.stylesContainerInner}>
          {arrInner.map((arrObj) => (
            <div
              style={{
                display: "flex",
                width: 50,
                height: 50,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                margin: 10,
                background: "rgba(220,220,220, 1)",
              }}
            >
              {arrObj === 0 ? "" : arrObj}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function InputBoxes(props) {
  let arr = props.arrObj.array;
  let indRef = props.indRef;
  let divisor;
  if (state.step !== 0 && state.splits[indRef] !== 0) {
    divisor = Math.round(
      state.ans[0].array.length / (2 * state.splits[indRef])
    );
  } else {
    divisor = state.ans[0].array.length;
  }
  return (
    <div id={props.arrObj.row} style={stylesMainInner}>
      {CreateMap(chunk(arr, divisor))}
    </div>
  );
}

export default view(InputBoxes);
