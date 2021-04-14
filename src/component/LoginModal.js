import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import KakaoButtonImg from '../img/kakao_login_buton.png';
import GoogleButtonImg from '../img/google_login_button.png';
import Button from '@material-ui/core/Button';
import {loginWithGoogle, loginWithKakao } from './SocialLogin';
import GoogleLogin from 'react-google-login';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button:{
      padding:0,
  }
}));


function displayToken() {
  const token = getCookie('authorize-access-token')
  if(token) {
    window.Kakao.Auth.setAccessToken(token)
    window.Kakao.Auth.getStatusInfo(({ status }) => {
      if(status === 'connected') {
        document.getElementById('token-result').innerText = 'login success. token: ' +  window.Kakao.Auth.getAccessToken()
      } else {
        window.Kakao.Auth.setAccessToken(null)
      }
    })
  }
}
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function LoginModal({open,handleClose}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  
  const body = (
    <div style={modalStyle} className={classes.paper}>
                    <Grid container direction="row"
                        justify="space-between"
                        alignItems="center"
                        >
                        <h2 id="simple-modal-title">로그인</h2>
                        <IconButton  component="span" onClick={handleClose}>
                            <CloseIcon  fontSize="large"></CloseIcon>
                        </IconButton>
                    </Grid>                    
                    <Grid container direction="row" justify="space-between"   alignItems="center">
                    <Button
                        className={classes.button} onClick={() => {loginWithKakao() ; handleClose()}}>
                        <img src={KakaoButtonImg} alt="Kitten" height="80" width="650" />
                    </Button>
                  {loginWithGoogle({handleClose})}
                  {/*   <Button
                        className={classes.button} onClick={() => { loginWithGoogle(); handleClose()}}>
                        <img src={GoogleButtonImg} alt="Kitten" height="80" width="650" /> 
                    </Button>*/}
                    </Grid>
    </div>
  );

  return (
    <div>
    {displayToken}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}