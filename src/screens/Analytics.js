import { makeStyles, Button, Grow } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";
import { Link } from "react-router-dom";
import backBtn from "../assets/back.svg";
import { fontFamily } from "@mui/system";
import homeIcon from "../assets/home.svg";
import anIcon from "../assets/line-chart.svg";
import dp from "../assets/dp.svg";
import l1 from "../assets/l1.svg";
import l2 from "../assets/l2.svg";
import l3 from "../assets/l3.svg";
import l4 from "../assets/l4.svg";
import l5 from "../assets/l5.svg";
import prev from "../assets/leftBtn.svg";
import next from "../assets/rightBtn.svg";
import history from "../assets/historyIcon.svg";
import button from "../assets/histLink.svg";
import Navbar from "../components/NavBar";
import zIndex from "@material-ui/core/styles/zIndex";
import { CenterFocusStrong } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  page: {
    fontFamily: "Raleway",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    zindex: -10,
    position: "relative",
  },

  navbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    fontSize: "30px",
    fontFamily: "Raleway",
    backgroundColor: "#111111",
    padding: "10px",
  },

  navbarBackBtn: {
    image: backBtn,
    flex: "1",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#111111",
    marginTop: "8px",
    marginRight: "20px",
    flexDirection: "row",
    flexGrow: "1",
  },

  title: {
    flex: "2",
    flexGrow: "15",
  },

  sideBar: {
    display: "flex",
    height: "100%",
    width: "15%",
    top: 0,
    left: 0,
    flexDirection: "column",
    backgroundColor: "#111111",
    float: "left",
  },

  firstBox: {
    flex: "1",
    flexGrow: "0.75",
  },

  thirdBox: {
    flex: "3",
    flexGrow: "1",
  },

  button: {
    display: "flex",
    alignItems: "left",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#393939",
      color: "#38C6D9",
      fontWeight: "bold",
    },
  },

  history: {
    flex: "2",
    flexGrow: "1.5",
    color: "white",
    fontSize: "25px",
    marginLeft: "15%",
  },

  analytics: {
    flex: "3",
    flexGrow: "1.5",
    color: "#38C6D9",
    fontSize: "25px",
    marginLeft: "15%",
  },

  icon: {
    maxWidth: "100%",
    marginRight: "5%",
  },

  mainContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "65%",
    height: "94%",
  },

  box: {
    backgroundColor: "#111111",
    fontFamily: "Raleway",
    width: "30%",
    height: "40%",
    marginLeft: 25,
    marginTop: 25,
    zIndex: 10,
  },

  levelBox: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#424242",
    borderRadius: 80,
    fontFamily: "Raleway",
    margin: 25,
    width: "100%",
    height: "55%",
    zindex: 10,
    position: "relative",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    height: "94%",
    width: "20%",
    marginTop: 25,
    marginRight: 25,
  },

  profile: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#111111",
    fontFamily: "Raleway",
    fontSize: "25px",
    width: "100%",
    height: "40%",
  },

  anContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 25,
    width: "100%",
    height: "55%",
    backgroundColor: "#111111",
  },

  anContainerInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "90%",
    width: "100%",
  },

  text: {
    fontFamily: "Raleway",
    color: "white",
    fontSize: "33px",
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
  },

  levelIcon: {
    height: "50%",
  },

  arrowBtn: {
    backgroundImage: `url(${prev})`,
    margin: "5px",
    height: "63px",
    width: "40px",
    justifyContent: "flex-end",
    top: "42%",
    border: 0,
    cursor: "pointer",
    backgroundColor: "transparent",
    padding: 0,
    "&:hover": {
      opacity: "60%",
    },
  },

  arrowBtnR: {
    backgroundImage: `url(${next})`,
    margin: "5px",
    height: "63px",
    width: "50px",
    justifyContent: "flex-end",
    top: "42%",
    border: 0,
    cursor: "pointer",
    backgroundColor: "transparent",
    padding: 0,
    "&:hover": {
      opacity: "60%",
    },
  },

  levelBar: {
    height: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textHighlight: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#393939",
      color: "#38C6D9",
      fontWeight: "bold",
    },
  },
}));

function Analytics() {
  const style = useStyles();
  let params = useParams();

  return (
    <>
      <Navbar />

      <div className={style.page}>
        <div className={style.sideBar}>
          <div className={style.firstBox}></div>

          <div className={style.history}>
            <Link to="/Admin" className={style.textHighlight}>
              <div className={style.button}>
                <div className={style.icon}>
                  <img src={homeIcon}></img>
                </div>
                History
              </div>
            </Link>
          </div>

          <div className={style.analytics}>
            <Link
              to="/Analytics"
              className={style.textHighlight}
              style={{ color: "#38C6D9", fontWeight: "bold" }}
            >
              <div className={style.button}>
                <div className={style.icon}>
                  <img src={anIcon}></img>
                </div>
                Analytics
              </div>
            </Link>
          </div>

          <div style={{ flex: "4", flexGrow: "10" }}></div>
        </div>

        <div className={style.mainContainer}>
          <div className={style.box}>
            <div className={style.text}>Time Spent</div>
          </div>
          <div className={style.box}>
            <div className={style.text}>Lives Left</div>
          </div>
          <div className={style.box}>
            <div className={style.text}>Attempts</div>
          </div>
          <div className={style.levelBox}>
            <div
              className={style.text}
              style={{ textAlign: "center", height: "10%" }}
            >
              Average Statistics
            </div>
            <div className={style.levelBar}>
              <button className={style.arrowBtn}>
                {/* onClick={() => { */}
                {/* default state is Level 1. Set prev state */}
                {/* }} */}
              </button>

              {/* Icon for Level 1. The rest are already imported, just follow the same formatting. */}
              <img src={l1} className={style.levelIcon}></img>

              <button className={style.arrowBtnR}>
                {/* onClick={() => { */}
                {/* default state is Level 1. Set next state */}
                {/* }} */}
              </button>
            </div>
          </div>
        </div>
        <div className={style.container}>
          <div className={style.profile}>
            <div className={style.text}>Hello,</div>
            <img src={dp} style={{ height: "70%", width: "auto" }}></img>
          </div>

          <div className={style.anContainer}>
            <div className={style.text}>History</div>
            <div className={style.anContainerInner}>
              <img
                src={history}
                style={{ height: "50%", width: "auto", marginTop: 20 }}
              ></img>
              <Link to="/Admin" style={{ width: "70%" }}>
                <img
                  src={button}
                  style={{ marginTop: 20, width: "100%" }}
                ></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default view(Analytics);
