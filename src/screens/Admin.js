import { makeStyles, Button, Grow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";
import { Link } from "react-router-dom";
import backBtn from "../assets/back.svg";
import homeIcon from "../assets/home.svg";
import anIcon from "../assets/line-chart.svg";
import dp from "../assets/dp.svg";
import l1 from "../assets/l1.svg";
import button from "../assets/anLink.svg";
import Navbar from "../components/NavBar";
import { useState } from "react";
import { FetchAllLevels } from "../firebase/functions";

const useStyles = makeStyles((theme) => ({
  page: {
    fontFamily: "Raleway",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    zindex: -10,
    overflow: "hidden",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    height: "94%",
    width: "20%",
    marginTop: 25,
    marginRight: 25,
    overflow: "hidden",
  },

  mainContainer: {
    display: "flex",
    width: "65%",
    height: "94%",
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
  },

  firstBox: {
    flex: "1",
    flexGrow: "0.75",
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

  dataBox: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#111111",
    height: "100%",
    width: "100%",
    margin: 25,
    overflowY: "scroll",
    "&::-webkit-scrollbar": { display: "none" },
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
  anImg: {
    flex: 2,
    alignItems: "center",
    width: "100%",
    height: "100%",
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

  thirdBox: {
    flex: "3",
    flexGrow: "1",
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
  let params = useParams();
  let navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data, loading, error } = FetchAllLevels("merge_sort", 5);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  if (!isLoggedIn) {
    navigate("/");
  }

  return (
    <>
      <Navbar admin={true} />
      <div className={style.page}>
        <div className={style.sideBar}>
          <div className={style.firstBox}></div>

          <div className={style.history}>
            <Link
              to="/Admin"
              className={style.textHighlight}
              style={{ color: "#38C6D9", fontWeight: "bold" }}
            >
              <div className={style.button}>
                <div className={style.icon}>
                  <img src={homeIcon}></img>
                </div>
                History
              </div>
            </Link>
          </div>

          <div className={style.analytics}>
            <Link to="/Analytics" className={style.textHighlight}>
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
            <img src={dp} style={{ height: "70%", width: "auto" }}></img>
          </div>
          <div className={style.anContainer}>
            <div className={style.text}>Analytics</div>
            <div className={style.anContainerInner}>
              <img
                src={l1}
                style={{ height: "40%", width: "auto", marginTop: 27 }}
              ></img>
              <Link to="/Analytics" style={{ width: "70%" }}>
                <img
                  src={button}
                  style={{ marginTop: 25, width: "100%" }}
                ></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default view(Admin);
