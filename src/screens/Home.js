import React from 'react';
import {makeStyles} from  "@material-ui/core";
import Button from '@mui/material/Button';
import App from '../App';
import { Link } from "react-router-dom";
import LoseScreen from "../components/LoseScreen.js"


export default function Home(){
    return(
        <div>
            HOME SCREEN
            <div>
                <Link to="/app">
                    <Button 
                    variant="contained" 
                    sx={{
                        backgroundColor:'#3D3D3D',
                        height:'50px',
                        width:'250px',
                        
                    }}
                    >
                        This goes to App.js
                    </Button>
                </Link>
            </div>
        </div>
    )
}