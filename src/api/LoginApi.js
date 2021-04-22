import axios from 'axios';

class LoginApi{
    URL = 'user/login/'; //http://IP:8000/api/todos/
    //URL = 'http://3.36.237.46/api/companies';

    loginKaoKao(getAccessToken){
        const body ={
            access_token:getAccessToken,
        }
        return axios.post(this.URL+'kakao/',body).then((response)=>response.data);
        //.catch(()=>{})
        //.finally(()=>{})
    }
    loginGoogle(idToken){
        const body ={
            id_token:idToken,
        }
        return axios.post(this.URL+'google/',body).then((response)=>response.data);
        //.catch(()=>{})
        //.finally(()=>{})
    }
}export default LoginApi