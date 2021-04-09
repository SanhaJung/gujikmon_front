import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import {CompanyList} from './CardList';
import PrimarySearchAppBar from './AppbarView';
import KakaoMap from './MapView';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        구직몬
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#4D6AFF",
    //backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


export default function Main() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <main>
       <KakaoMap></KakaoMap>
        <CompanyList></CompanyList>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}