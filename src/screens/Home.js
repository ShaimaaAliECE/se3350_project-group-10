import React from "react";
import { Link } from "react-router-dom";
import state from "../store/Store";
import { makeStyles } from "@material-ui/core";
import { mergeSort } from "../algorithms/mergesort";
import bg from "../assets/homeBG.svg";
import logo from "../assets/Logo.svg";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};   

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
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.logo}>
          <img src={logo} style={{ height: 209, width: 661 }} alt="logo" />
        </div>

        <div className={classes.button}>
        <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Merge Sort" />
          <Tab label="Quick Sort"  />
          <Tab label="Insertion Sort"/>
          <Tab label="Recursive Sort"/>
        </Tabs>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
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
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
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
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
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
        </TabPanel>
      </SwipeableViews>
    </Box>
    
       

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
