import "./App.css";
import Piano from "./components/Piano";
import InputContainer from "./components/InputContainer";
import Sheet from "./components/Sheet";
import state from "./store/Store";

function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "grey",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "100%", height: 50, backgroundColor: "black" }} />
      <Sheet />
      <InputContainer />
      <Piano />
    </div>
  );
}

export default App;
