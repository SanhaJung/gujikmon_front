import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {StoreProvider} from './store/Context';
import {RootStore} from './store/RootStore';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const rootStore = new RootStore();
const theme = createMuiTheme({
  typography:{
    fontFamily :[
      'GongGothicLight',
      'GongGothicMedium',
      'GongGothicBold'
    ].join(','),
    fontSize: 15,
  }
})

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={rootStore} >
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
