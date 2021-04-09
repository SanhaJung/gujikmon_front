import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {Filter} from './SelectionView';

import MapContainer from '../map/MapContainer';


const { kakao } = window;


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
      
       <div  className={classes.heroContent} >
       <Container maxWidth="xl">
         {/* <Filter></Filter> */}
         <MapContainer></MapContainer>
         {/* <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
         </Typography>
         <Typography variant="h5" align="center" color="textSecondary" paragraph>
           Something short and leading about the collection below—its contents.
         </Typography>
         <div className={classes.heroButtons}>
           <Grid container spacing={2} justify="center">
             <Grid item>
               <Button variant="contained" color="primary" style={{fontFamily:'GongGothicBold'}}>
                 Main call to action
               </Button>
             </Grid>
             <Grid item>
               <Button variant="outlined" color="primary" style={{fontFamily:'GongGothicLight'}}>
                 Secondary action
               </Button>
             </Grid>
           </Grid>
         </div> */}
         
       </Container>
     </div>
    
     
    );
}
