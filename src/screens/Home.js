import React from "react";
import { Link } from "react-router-dom";
import state from "../store/Store";
import { makeStyles } from "@material-ui/core";
import { mergeSort } from "../algorithms/mergesort";
import bg from "../assets/homeBG.svg";
import logo from "../assets/Logo.svg";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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

  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
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
    backgroundColor: "#757575",
    border: 0,
    borderRadius: 10,
    "&:hover": {
      cursor: "pointer",
    },
  },
  link: {
    textDecoration: "none",
  },
  accordion: {
    padding: 12,
    fontSize: 18,
    fontWeight: 400,
    fontFamily: "Raleway",
    textAlign: "center",
    backgroundColor: "#757575",
    border: 0,
    borderRadius: 10,
    "&:hover": {
      cursor: "pointer",
    },
  }
}));

export function generateEmptyArr() {
  state.input = [];
  for (let i = 0; i < state.ans[state.step]?.array.length; i++) {
    state.input.push(0);
  }
}

const random = (min, max) => {
  let num = [];
  for (let i = 0; i < 10; i++) {
    num.push(Math.floor(Math.random() * (max - min) + min));
  }
  return num;
};

function initializeSplit() {
  for (let i = 1; i < state.depth; i++) {
    state.splits.push(i);
  }
  //Switch to -2 for 0,1,2,3,4,3,2,1,0 instead of 0,1,2,3,4,4,3,2,1,0
  for (let i = state.depth - 1; i > 0; i--) {
    state.splits.push(i);
  }
  state.splits.push(0);
}

function initializeSheets() {
  let depth = state.depth;
  //Fill sheetSplit
  let temp = [];
  for (let i = 0; i < depth + 1; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].array.length; j++) {
      temp.push(0);
    }
    state.sheetSplit.push(temp);
  }

  //Fill sheetMerge
  for (let i = 0; i < depth - 1; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].array.length; j++) {
      temp.push(0);
    }
    state.sheetMerge.push(temp);
  }
}

function handleClick(level) {
  switch (level) {
    case 1:
      console.log("level 1");
      break;
    case 2:
      console.log("level 2");
      break;
    case 3:
      state.resetStates();
      mergeSort([...random(1, 11)]);
      generateEmptyArr();
      initializeSplit();
      initializeSheets();
      break;
    default:
  }
}

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.logo}>
          <img src={logo} style={{ height: 209, width: 661 }} alt="logo" />
        </div>

        <div>
      <Accordion className={classes.accordion}>
        <AccordionSummary className={classes.accordion}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Merge Sort</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 1
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 2
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 3
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 4
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 5
            </button>
          </Link>

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Quick Sort</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            
           <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 1
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 2
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 3
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 4
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 5
            </button>
          </Link>

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Insertion Sort</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 1
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 2
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 3
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 4
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 5
            </button>
          </Link>

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Recursive Sort</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 1
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 2
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 3
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 4
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Level 5
            </button>
          </Link>

          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
        
{/*}

        <div className={classes.buttonContainer}>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Merge Sort
            </button>
          </Link>


          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Quick Sort
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Insertion Sort
            </button>
          </Link>
          <Link to="/level_3" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Recursive Sort
            </button>
          </Link>
        </div>
        */}
      </div>
    </div>
  );
}
