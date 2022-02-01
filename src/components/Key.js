import { makeStyles } from "@material-ui/core";
import { textAlign } from "@mui/system";

const useStyles = makeStyles((theme) => ({
    white: {
        display: "flex",
        backgroundColor: "white", 
        width: "25px", 
        height: "75px",
        padding: "5px",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    black: {
        display: "flex",
        backgroundColor: "black", 
        color: "white",
        width: "12px",
        height: "45px",
        padding: "5px",
        alignItems: "flex-start",
        justifyContent: "center"
    }
}));


function Key(props) {
  const styles = useStyles();
  const index = props.index;

return (
    <button className={index % 2 === 0 ? styles.white : styles.black} > {index} </button>
  );
}

export default Key;
