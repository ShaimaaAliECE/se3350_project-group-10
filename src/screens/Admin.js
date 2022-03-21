import { makeStyles, Button, Grow } from "@material-ui/core";

import { useParams } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";

import { Link } from "react-router-dom";
import backBtn from "../assets/back.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: "Raleway",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,1)",
    zindex: 10,
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    fontSize: "30px",
    backgroundColor: "black",
    padding: "10px",
  },
  title: {
    flex: "2",
    flexGrow: "15",
  },
  sideBar: {
    display: "flex",
    height: "100%" /* 100% Full-height */,
    width: "15%" /* 0 width - change this with JavaScript */,
    top: 0,
    left: 0,
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  firstBox: {
    flex: "1",
    flexGrow: "0.75",
  },
  home: {
    flex: "2",
    flexGrow: "1.5",
    color: "black",
    fontSize: "25px",
    textAlign: "center",
  },
  analytics: {
    flex: "3",
    flexGrow: "0.5",
    color: "black",
    fontSize: "25px",
    textAlign: "center",
  },
  navbarBackBtn: {
    image: backBtn,
    flex: "1",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
    marginTop: "8px",
    marginRight: "20px",
    flexDirection: "row",
    flexGrow: "1",
  },

  thirdBox: {
    flex: "3",
    flexGrow: "1",
  },
}));

function Level() {
  const style = useStyles();
  let params = useParams();
  return (
    <>
      <div className={style.container}>
        <div className={style.navbar}>
          {
            <div className={style.navbarBackBtn}>
              <Link to="/">
                <img src={backBtn} />
              </Link>
            </div>
          }
          <div className={style.title}>Admin Dashboard</div>
          <div className={style.thirdBox}></div>
        </div>
        <div className={style.sideBar}>
          <div className={style.firstBox}></div>
          <div className={style.home}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>
          </div>
          <div className={style.analytics}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Analytics
            </Link>
          </div>
          <div style={{ flex: "4", flexGrow: "10" }}></div>
        </div>
      </div>
    </>
  );
}

export default view(Level);
