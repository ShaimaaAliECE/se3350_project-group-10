import React from "react";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({

    container: {
        position: "fixed",
        top: 60,
        left: 50,
        borderRadius: 30,
        width: 200,
        height: 300,
        backgroundColor: "rgba(131,130,130,0.9)",
        margin: "auto",
      },
    
      detailsContainer: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },

    content: {
        padding: 0,
        textAlign: "left",
        backgroundColor: "transparent",
        fontFamily: "Raleway",
        fontSize: "22px",
        color: "white",
    }
    }))


export default function PopUp(){    
const classes = useStyles();
    return(
     <div className={classes.container}>
         <div className={classes.detailsContainer}>
            <div className={classes.content}>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Raleway" />
                <script>
                
                </script>
            </div>
         </div>
       
     </div>
)
}