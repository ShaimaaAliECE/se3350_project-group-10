import React from "react";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";

export function Timer() {
  return (
    <div style={{ width: "5%" }}>
      <span>{("0" + Math.floor(state.timer / 3600)).slice(-2)}:</span>
      <span>{("0" + Math.floor((state.timer % 3600) / 60)).slice(-2)}:</span>
      <span>{("0" + ((state.timer % 3600) % 60)).slice(-2)}</span>
    </div>
  );
}
export default view(Timer);
