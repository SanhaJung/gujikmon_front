import React from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

import GoogleButtonImg from '../img/google_login_button.png';
import Button from '@material-ui/core/Button';

export function loginWithKakao() {
    window.Kakao.Auth.login({
      success: function(authObj) {
        alert(JSON.stringify(authObj));
        console.log(authObj);
        window.sessionStorage.setItem('login' , '1');
        window.location.reload();
      },
      fail: function(err) {
        alert(JSON.stringify(err))
      },
    });
  }

export function logoutWithKakao() {
    if(window.sessionStorage.getItem('login')==='1')
    {
        if(window.Kakao.Auth.getAccessToken()){
            console.log("카카오 로그인 토큰 존재");
            window.Kakao.Auth.logout(() =>{
                    console.log("로그아웃 하였습니다.");
                    window.sessionStorage.setItem('login','0');
                    window.location.reload();
            });
            
        }
    }
}
const clientId ="272905702781-80mi90k3gsjk1kbff0gdv8dsrc244mvt.apps.googleusercontent.com";

export function loginWithGoogle({handleClose}) {
  const onSuccess = (response) => {
    console.log('[Google Login Success] : ' ,response);
    window.sessionStorage.setItem('login' , '2');
    handleClose();
  }
  const onFailure = (response) =>{
    console.log('[Google Login Fail] : ' ,response);
  }
  return(
        <GoogleLogin
          clientId={clientId}
          render={renderProps => (
            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={GoogleButtonImg} alt="Kitten" height="80" width="650" /> </Button>
          )}
          buttonText="Login" 
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
    )
}
export function logoutWithGoogle() {
  const LogoutSuccess = (response) => {
    console.log('[Google Logout Success] : ' ,response);
    window.sessionStorage.setItem('login' , '0');
    window.location.reload();
  }
  console.log("im here");
  return(
        <GoogleLogout
        clientId={clientId}
        
        buttonText="Logout"
        onLogoutSuccess={LogoutSuccess}
      >
      </GoogleLogout>
      )

}