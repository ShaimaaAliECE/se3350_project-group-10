import { makeStyles } from "@material-ui/core";
import React from "react";
import backBtn from "../assets/back.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@material-ui/core";
import Timer from "../components/Timer";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    backgroundColor: "black",
    padding: "10px",
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: "Raleway",
  },

  navbarInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  iconBtn: {
    color: "white",
    "&:hover": { color: "#38C6D9" },
    paddingRight: 0,
  },

  title: {
    fontSize: 20,
  },
}));

function Navbar(props) {
  const style = useStyles();
  let params = useParams();

  return (
    <>
      <div className={style.navbar}>
        {
          <div>
            <a href="/">
              <div className={style.navbarInner}>
                <IconButton className={style.iconBtn}>
                  <ArrowBackIosNewIcon style={{ color: "inherit" }} />
                </IconButton>
                <img alt="back" style={{ width: 35 }} src={backBtn} />
              </div>
            </a>
          </div>
        }
        {props.admin ? null : (
          <>
            <div className={style.title}>Level {params.level} - Merge Sort</div>
            <Timer />
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
