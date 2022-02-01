
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button, makeStyles } from "@material-ui/core";
import state from '../store/Store';


// add scroll css to container (filled with multiple  groups of lines)
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 'auto',
        justifyContent: 'space-between',
        background: 'white',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.3)',
        color: 'white',
        height: 500,
        width: 980,
        marginTop: 80,
        marginLeft: 150,
        overflow: 'scroll',

    },
    lines: {
        borderBottom: 15,
        color: "black",

    },
    lineRow: {

        flex: 'auto',
        marginTop: 50,
    },
    square: {
        display: "flex",
        width: 50,
        height: 50,
        flexDirection: "row",
        margin: 10,
        background: "rgba(220,220,220, .6)",
    },
    mapped: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }


}));





//creating function component sheet 
//include Lines as component 
//Lines component should include state (black or white)
//state of lines set to white originally 
// next group of lines state changes to black once player submits correct row of inputs
function Sheet() {
    const style = useStyles();
    return (
        <>
            <div className={style.container}>
                <Lines />
                <Lines />
                <Lines />
                <Lines />
                <Lines />
                <Lines />
                <Lines />
                <Lines />
            </div>
        
        </>

    );
}

//creating function component lines 
function Lines() {
    const style = useStyles();

    return (
        <div className={style.lineRow}>
            <hr className={style.lines}></hr>
            <hr className={style.lines}></hr>
            <hr className={style.lines}></hr>
            <hr className={style.lines}></hr>
            <hr className={style.lines}></hr>
        </div>



    )
}

// function Submit() {
//     const style = useStyles();

//     return (
//         <div>
//             <Button></Button>
//         </div>
//     )
// }

// function Array() {
//     const style = useStyles();

//     return (
//         <div className='row'></div>
//     )

// }
function CreateMap(arr) {
    const style = useStyles();
    //Maps user entered array
    return arr.map((arr) => (
      <div
        className={style.square}
        key={arr}
        // style={styles}
      >
        {arr}
      </div>
    ));



  }
function InputContainer() {
  const arr = state.input;

  return <div style={stylesMain}>{CreateMap(arr)}</div>;
}



export default Sheet; 
