import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";
import { Link } from "react-router-dom";
import backBtn from "../assets/back.svg";
import historyIcon from "../assets/miniHistIcon.svg";
import anIcon from "../assets/line-chart.svg";
import dp from "../assets/dp.svg";
import l1 from "../assets/l1.svg";
import button from "../assets/anLink.svg";
import Navbar from "../components/NavBar";
import { useState } from "react";
import { FetchAllLevels } from "../firebase/functions";

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
  },

  container: {
    display: "flex",
    flexDirection: "column",
    height: "94%",
    width: "20%",
    marginRight: 25,
    overflow: "hidden",
  },

  mainContainer: {
    display: "flex",
    width: "65%",
    height: "90%",
    marginBottom: 25,
    overflow: "hidden",
  },
  sideBar: {
    display: "flex",
    height: "100%",
    width: "15%",
    flexDirection: "column",
    backgroundColor: "#111111",
  },
  button: {
    display: "flex",
    padding: 20,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#393939",
      color: "#38C6D9",
      fontWeight: "bold",
    },
  },
  history: {
    color: "white",
    fontSize: "25px",
  },
  analytics: {
    color: "#38C6D9",
    fontSize: "25px",
  },
  icon: {
    maxWidth: "100%",
    marginRight: "5%",
  },
  dataBox: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#111111",
    width: "100%",
    marginLeft: 25,
    marginRight: 25,
    overflowY: "scroll",
    "&::-webkit-scrollbar": { display: "none" },
  },

  profile: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#111111",
    fontFamily: "Raleway",
    fontSize: "25px",
    height: "40%",
  },

  anContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 25,
    height: "52.6%",
    backgroundColor: "#111111",
  },

  anContainerInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "90%",
  },
  anImg: {
    alignItems: "center",
    marginLeft: 50,
    marginTop: 30,
  },
  text: {
    fontFamily: "Raleway",
    color: "white",
    fontSize: "33px",
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 20,
  },
  textHighlight: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      color: "#38C6D9",
    },
  },
  data: {
    color: "white",
  },
}));

function RenderTable(values) {
  let count = 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            width: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Level
        </h1>
        <h1
          style={{
            width: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Time
        </h1>
        <h1
          style={{
            width: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Attemps
        </h1>
        <h1
          style={{
            width: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Lives
        </h1>
      </div>
      {values.map((x) => {
        count++;
        // eslint-disable-next-line no-lone-blocks
        {
          return x.map((y) => {
            if (y.time) {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: 30,
                  }}
                >
                  <h6
                    style={{
                      width: "10%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {count}
                  </h6>
                  <h6
                    style={{
                      width: "10%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {y.time}
                  </h6>
                  <h6
                    style={{
                      width: "10%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {y.attempts}
                  </h6>
                  <h6
                    style={{
                      width: "10%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {y.livesLeft}
                  </h6>
                </div>
              );
            }
          });
        }
      })}
    </div>
  );
}

function Admin() {
  const style = useStyles();
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data, loading } = FetchAllLevels("merge_sort", 5);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  if (!isLoggedIn) {
    navigate("/");
  }

  return (
    <>
      <div className={style.fullpage}>
        <Navbar admin={true} />
        <div className={style.page}>
          <div className={style.sideBar}>
            <div className={style.firstBox}></div>
            <div className={style.history}>
              <Link
                to="/admin"
                className={style.textHighlight}
                style={{ color: "#38C6D9", fontWeight: "bold" }}
              >
                <div className={style.button}>
                  <div className={style.icon}>
                    <img src={historyIcon} alt="history"></img>
                  </div>
                  History
                </div>
              </Link>
            </div>

            <div className={style.analytics}>
              <Link to="/analytics" className={style.textHighlight}>
                <div className={style.button}>
                  <div className={style.icon}>
                    <img src={anIcon} alt="analytics"></img>
                  </div>
                  Analytics
                </div>
              </Link>
            </div>
          </div>

          <div className={style.mainContainer}>
            <div className={style.dataBox}>
              <div className={style.text}>Logged Data</div>
              <div className={style.data}>
                {loading ? null : RenderTable(data)}
              </div>
            </div>
          </div>
          <div className={style.container}>
            <div className={style.profile}>
              <div className={style.text}>Hello,</div>
              <img src={dp} style={{ height: "70%" }} alt="profile"></img>
            </div>
            <div className={style.anContainer}>
              <div className={style.text}>Analytics</div>
              <div className={style.anContainerInner}>
                <img
                  src={l1}
                  style={{ height: "40%", marginTop: 27 }}
                  alt="l1"
                ></img>
                <Link to="/Analytics" style={{ width: "70%" }}>
                  <img
                    src={button}
                    style={{ marginTop: 25, width: "100%" }}
                    alt="button"
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

export default view(Admin);
