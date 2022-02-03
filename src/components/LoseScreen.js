import React from 'react';
import {makeStyles} from  "@material-ui/core";
import Button from '@mui/material/Button';
import image from '../assets/looseBackground.svg';

const useStyles = makeStyles((theme) => ({
  container:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'100vh',
  
    
  },

  content:{
    borderStyle:'solid',
    borderColor:'black',
    borderRadius:'20px',
    width: '800px',
    height: '500px',
    backgroundSize:'cover',
    backgroundColor:'darkgrey',
    backgroundImage: `url(${image})`,
  },

  title:{
    textAlign:'center',
    fontSize:'50px',
  },

  buttonSection:{
    display:'flex',
    textAlign:'center',
    justifyContent:'center',
    height:'200px',
    flexDirection:'column',
    padding:'100px',
  },

  buttons:{
    padding:'20px',
  },

  })); 

export default function LoseScreen() {

  const style = useStyles();

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>Nice Try!</div>

        <div className={style.buttonSection}>

          <div className={style.buttons}>
            <Button 
            variant="contained" 
            className={style.button}
            sx={{
              backgroundColor:'#3D3D3D',
              height:'50px',
              width:'250px',
              
            }}
            >Restart Level</Button>
          </div>

          <div className={style.buttons}>
          <Button 
            variant="contained" 
            className={style.button}
            sx={{
              backgroundColor:'#3D3D3D',
              height:'50px',
              width:'250px',
            }}
            >Quit Level</Button>
          </div>
          
          <div className={style.buttons}>
          <Button 
            variant="contained" 
            className={style.button}
            sx={{
              backgroundColor:'#3D3D3D',
              height:'50px',
              width:'250px',
            }}
            >Switch Algorithms</Button>
          </div>
          
        </div>
      </div>
    </div>
  );
}