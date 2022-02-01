
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button, makeStyles } from "@material-ui/core";
import state from '../store/Store';


// add scroll css to container (filled with multiple  groups of lines)
const useStyles = makeStyles(() => ({
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
    main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    stylesContainerInner: { display: "flex" },
    stylesMainOuter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
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
                <MainArray/>
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
        <div>

            <div className={style.lineRow}>
                <hr className={style.lines}></hr>
                <hr className={style.lines}></hr>
                <hr className={style.lines}></hr>
                <hr className={style.lines}></hr>
                <hr className={style.lines}></hr>
            </div>
        </div>




    )
}
function MainArray () {
    const style = useStyles();
    const arr = state.input;
    return (
        <div className={style.main}> <div className={style.square}>
        {arr}
    </div></div>
    )
    
}

function CreateMap(arrOuter) {
    const style = useStyles();
    //Maps user entered array
    return (
        <div className={style.main}>
            {arrOuter.map((arrInner) => (
                <div className={style.stylesContainerInner}>
                    {arrInner.map((arrObj) => (
                        <div className={style.square} key={arrObj}>
                            {arrObj}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
function chunk(array, limit) {
    const chunks = Math.ceil(array.length / limit);
    return Array.from({ length: chunks }, (_, i) =>
        array.slice((i * array.length) / chunks, ((i + 1) * array.length) / chunks)
    );
}
function InputContainer() {
    const arr = state.input;
    const style = useStyles();
    return (<div className={style.main}>{CreateMap(chunk(arr, 4))}</div>);
}



export default Sheet; 
