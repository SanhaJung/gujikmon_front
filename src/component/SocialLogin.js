import React from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

import GoogleButtonImg from '../img/google_login_button.png';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react';
import { useStores } from '../store/Context';
import { MenuItem } from '@material-ui/core';

export function LoginWithKakao(callback) {
  
  window.Kakao.Auth.login({
  success: function(authObj) {
    //alert(JSON.stringify(authObj));
    console.log(authObj);
    window.sessionStorage.setItem('login' , '1');
    const token = window.Kakao.Auth.getAccessToken();
    callback(token);
      //window.location.reload();
    return  token;
  },
  fail: function(err) {
    alert(JSON.stringify(err))
    return false;
  },
});
}

export function LogoutWithKakao() {
  
    if(window.sessionStorage.getItem('login')==='1')
    {
        if(window.Kakao.Auth.getAccessToken()){
            console.log(window.Kakao.Auth.getAccessToken());
            window.Kakao.Auth.logout(() =>{
                    console.log("로그아웃 하였습니다.");
                    window.sessionStorage.setItem('login','0');
                    window.location.reload();
            });
            
        }
    }
}
const clientId ="272905702781-80mi90k3gsjk1kbff0gdv8dsrc244mvt.apps.googleusercontent.com";

export const LoginWithGoogle = observer( ()=> {
  const {userStore} = useStores();
  const onSuccess = (response) => {
    console.log('[Google Login Success] : ' ,response);
    window.sessionStorage.setItem('login' , '2');
    //console.log("id",response.tokenId )
    //window.location.reload();
    userStore.setGoogleUserdata(response.tokenId);
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
})

export const LogoutWithGoogle = observer(() =>{
  const LogoutSuccess = (response) => {
    console.log('[Google Logout Success] : ' ,response);
    window.sessionStorage.setItem('login' , '0');
    window.location.reload();

  }
  return(
        <GoogleLogout
        clientId={clientId}
        render={renderProps => (
            <MenuItem onClick={renderProps.onClick} disabled={renderProps.disabled}>로그아웃</MenuItem>
          )}
        buttonText="Logout"
        onLogoutSuccess={LogoutSuccess}
      >
      </GoogleLogout>
      )
})