import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {Filter} from './Filter';
import SearchApi from '../api/SearchApi';

import {MapContainer} from '../map/MapContainer';


const useStyles = makeStyles((theme) => ({
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
      style:{
        fontFamily:'GongGothicBold',
      }
    },
  }));



export default function KakaoMap(){
  
    const classes = useStyles();

    return (
      
       <div className={classes.heroContent} >
       <Container maxWidth='false'>
         <MapContainer></MapContainer>
       </Container>
     </div>
    
     
    );
}
