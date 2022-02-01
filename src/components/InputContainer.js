import React from "react";
import state from "../store/Store";

const styles = {
  display: "flex",
  width: 50,
  height: 50,
  flexDirection: "row",
  margin: 10,
  background: "rgba(220,220,220, .6)",
};

const stylesMain = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function createMap(arr) {
  //Maps user entered array
  return arr.map((arr) => (
    <div
      style={styles}
      key={arr}
      // style={styles}
    >
      {arr}
    </div>
  ));
}

function InputContainer() {
  const arr = state.input;

  return <div style={stylesMain}>{createMap(arr)}</div>;
}

export default InputContainer;
