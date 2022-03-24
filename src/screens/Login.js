import React from "react";
import { makeStyles } from "@material-ui/core";
import bg from "../assets/homeBG.svg";
import { useTheme } from "@mui/material/styles";



const useStyles = makeStyles((theme) => ({


  container: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },


  content: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 65, //Toolbar takes up 65px
  },
  button: {
    margin: 20,
    justifyContent: "space-between",
    padding: 12,
    fontSize: 18,
    fontWeight: 400,
    fontFamily: "Raleway",
    color: "white",
    textAlign: "center",
    backgroundColor: "#504c4c",
    border: 0,
    borderRadius: 10,
    "&:hover": {
      cursor: "pointer",
    },
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "black", 
    color: 'white',
    textAlign: "center",
    fontSize: "25px",
    padding: "10px",
    
  },
  login:
  {
    fontFamily: "Raleway",
    color: "white",
    "&:hover": {
      cursor: "pointer",
  },

}, 

}));



export default function Login() {
  //Values and States for the Tabs
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const classes = useStyles();
  return (
    <><div className={classes.navbar}>
      </div>
      <div className={classes.container}>
      <div className={classes.content}>
      <div className={classes.login}></div>
      
        <div>
        </div>
      </div>
    </div></>

  );
}
