import { makeStyles } from "@material-ui/core";
import React from "react";
import { view } from "@risingstack/react-easy-state";
import { Link } from "react-router-dom";
import historyIcon from "../assets/miniHistIcon.svg";
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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GetAverages } from "../firebase/functions";

const useStyles = makeStyles((theme) => ({
  fullpage: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
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
  },
  analytics: {
    flex: "3",
    flexGrow: "1.5",
    color: "#38C6D9",
    fontSize: "25px",
  },
  icon: {
    maxWidth: "100%",
    marginRight: "5%",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    width: "65%",
    height: "94%",
  },
  box: {
    backgroundColor: "#111111",
    fontFamily: "Raleway",
    width: "30%",
    height: "100%",
    marginLeft: 20,
    zIndex: 10,
  },
  levelBox: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#424242",
    borderRadius: 80,
    fontFamily: "Raleway",
    marginLeft: "5%",
    marginTop: 25,
    width: "90%",
    height: "50%",
    zindex: 10,
    position: "relative",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "94%",
    width: "20%",
    flexWrap: "wrap",
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
    height: "50%",
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
  statsText: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50%",
    color: "white",
    fontFamily: "Raleway",
    fontSize: 60,
  },
  firstRow: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    height: "40%",
  },
}));

function Analytics() {
  const style = useStyles();
  let navigate = useNavigate();
  const [levelState, setLevelState] = useState(1);
  const { data, loading } = GetAverages("merge_sort", levelState);
  let levelNums = [l1, l2, l3, l4, l5];
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    navigate("/");
  }
  return (
    <>
      <div className={style.fullpage}>
        <Navbar admin={true} />
        <div className={style.page}>
          <div className={style.sideBar}>
            <div className={style.history}>
              <Link to="/Admin" className={style.textHighlight}>
                <div className={style.button}>
                  <div className={style.icon}>
                    <img src={historyIcon} alt={"history"}></img>
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
                    <img src={anIcon} alt={"analytics"}></img>
                  </div>
                  Analytics
                </div>
              </Link>
            </div>
            <div style={{ flex: "4", flexGrow: "10" }}></div>
          </div>
          <div className={style.mainContainer}>
            <div className={style.firstRow}>
              <div className={style.box}>
                <div className={style.text}>Time Spent</div>
                {!loading ? (
                  <div className={style.statsText}>
                    {(function () {
                      let hrs = Math.floor(data?.time / 3600);
                      let min = Math.floor((data?.time % 3600) / 60);
                      let sec = (data?.time % 3600) % 60;
                      if (hrs && min && sec != 0) {
                        return hrs + ":" + min + ":" + sec;
                      } else {
                        return min + ":" + sec;
                      }
                    })()}
                  </div>
                ) : null}
              </div>
              <div className={style.box}>
                <div className={style.text}>Lives Left</div>
                {!loading ? (
                  <div className={style.statsText}>{data?.livesLeft}</div>
                ) : null}
              </div>
              <div className={style.box}>
                <div className={style.text}>Attempts</div>
                {!loading ? (
                  <div className={style.statsText}>{data?.attempts}</div>
                ) : null}
              </div>
            </div>
            <div className={style.levelBox}>
              <div
                className={style.text}
                style={{ textAlign: "center", height: "10%" }}
              >
                Average Statistics
              </div>
              <div className={style.levelBar}>
                <button
                  className={style.arrowBtn}
                  disabled={levelState == 1}
                  onClick={() => {
                    setLevelState(levelState - 1);
                  }}
                ></button>
                <img
                  src={levelNums[levelState - 1]}
                  className={style.levelIcon}
                  alt={"level"}
                ></img>

                <button
                  className={style.arrowBtnR}
                  disabled={levelState == 5}
                  onClick={() => {
                    setLevelState(levelState + 1);
                  }}
                ></button>
              </div>
            </div>
          </div>

          <div className={style.container}>
            <div className={style.profile}>
              <div className={style.text}>Hello,</div>
              <img
                src={dp}
                alt={"admin"}
                style={{ height: "70%", width: "auto" }}
              ></img>
            </div>

            <div className={style.anContainer}>
              <div className={style.text}>History</div>
              <div className={style.anContainerInner}>
                <img
                  src={history}
                  style={{ height: "50%", width: "auto", marginTop: 20 }}
                  alt={"history"}
                ></img>
                <Link to="/Admin" style={{ width: "70%" }}>
                  <img
                    src={button}
                    style={{ marginTop: 20, width: "100%" }}
                    alt={"button"}
                  ></img>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default view(Analytics);
