import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {CompanySearch} from './CompanySearch';
import {MapContainer} from '../map/MapContainer';
import { useStores } from '../store/Context';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(5,0,0,0),

    },
    heroButtons: {
      marginTop: theme.spacing(4),
      style:{
        fontFamily:'GongGothicBold',
      }
    },
  }));



export const KakaoMap = observer(() =>{
  
    const classes = useStyles();
    const {searchStore} =useStores();

    return (
       <div className={classes.heroContent} >
       <Grid container maxWidth='false' disableGutters className={classes.root}>
       {searchStore.searchFlag &&
       <Grid item xs={3}> <CompanySearch></CompanySearch></Grid>}
      
      {searchStore.searchFlag &&
        <Grid item xs={9}><MapContainer/></Grid>}
      
      {!searchStore.searchFlag&&
      <Grid item xs={12}><MapContainer/> </Grid>}
       </Grid>
     </div>
    
     
    );
});
