import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';

import {CompanyList} from './CardList';
import PrimarySearchAppBar from './AppbarView';
import KakaoMap from './MapView';
import { Grid } from '@material-ui/core';
import { FavoriteCardList } from './FavoriteCardList';


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
      {value === index && <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      }
    </div>
  );
  
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Main() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const login = window.sessionStorage.getItem("login");
  console.log(login);
  return (
    <React.Fragment>
      <CssBaseline />
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <main>
       <KakaoMap></KakaoMap>
       <AppBar position="static">
        <Tabs value={value} 
        onChange={handleChange} aria-label="full width tabs example">
          <Tab label="기업정보" {...a11yProps(0)} />
          {login !== '0' &&<Tab label="관심기업" {...a11yProps(1)} />}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CompanyList></CompanyList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FavoriteCardList></FavoriteCardList>
      </TabPanel>
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