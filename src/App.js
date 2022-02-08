import "./App.css";
import Piano from "./components/Piano";
import InputContainer from "./components/InputContainer";
import Sheet from "./components/Sheet";
import state from "./store/Store";
import { useEffect, useState } from "react";
import { Link, Modal } from "@material-ui/core";

function App() {
  let [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    setOpenModal(state.gameOver);
  }, []);
  const closeModal = () => {
    setOpenModal(false);
  };

  const handleHomeButton = () => {
    closeModal();
    state.resetStates();
  };
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
      <div
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "black",
        }}
      />
      <Sheet />
      <InputContainer />
      <Piano />
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Link to="/" onClick={handleHomeButton}>
          Home
        </Link>
      </Modal>
    </div>
  );
}

export default App;
