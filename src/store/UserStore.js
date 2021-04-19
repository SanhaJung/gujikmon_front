import {action, makeObservable, observable} from 'mobx';
import LoginApi from '../api/LoginApi';
import UserApi from '../api/UserApi';
import {Company} from './CompanyStore';

export class UserStore{
    rootStore;
    loginApi = new LoginApi();
    userApi = new UserApi();
    login_type= 0;
    kakao_access_token ='';
    google_id_token='';
    user_pk='';
    user_email ='';
    favorites =[];
    favorites_id = [] ;
    constructor(root){
        makeObservable(this,  {
        login_type : observable,
        kakao_access_token : observable,
        google_id_token : observable,
        favorites:observable,  
        favorites_id:observable,
        updateFavorites:action,
        setGoogleUserdata:action,
        setFavorites:action,
        })

    this.rootStore = root;
  }

  async updateFavorites(_id){
    const result = await this.userApi.updateFavorite(this.user_pk,_id);
    if(result === "-1"){
      console.log("UpdateFavorite response failed");
      return -1;
    }
    else if (result.result !== undefined && result.result === "append"){
      console.log("favorite append success");
      return true;
    }
    else if (result.result !== undefined && result.result === "remove"){
      console.log("favorite remove");
      return false;
    }
  }
    
  setFavorites(companies){
    console.log("setFavorites : ",companies);

    let newCom=[];
    let newFavorite_ids=[]


     companies.map((data)=>{
      let sgb= [];
      data.sgBrandNm.map((sg)=>{
        sgb.push(sg.ceNm);
      })
            
      var com = new Company(
        data.company.id, 
        data.company.busiNo,
        data.company.coNm,
        data.company.coAddr,
        data.company.regionCd,
        data.company.regionNm,
        data.company.superIndTpCd, 
        data.company.superIndTpNm,
        data.company.coMainProd,
        data.company.coHomePage,
        data.company.alwaysWorkerCnt,
        data.company.recruitment,
        sgb,
        data.info,
        data.company.x,
        data.company.y);
        newCom.push(com);

        newFavorite_ids.push(com.id);
    })
    this.favorites=  newCom;
    this.favorites_id=  newFavorite_ids;
    console.log(this.favorites);
  }
  
  async setKakoUserdata(accessToken){
    console.log(accessToken);
    const result = await this.loginApi.loginKaoKao(accessToken);
    console.log("KAKAO LOGIN : ",result);
    window.sessionStorage.setItem('user_pk', result.user_pk);
    this.kakao_access_token = result.access_token;
    this.user_email= result.user_email;
    this.user_pk =result.user_pk;    
    this.login_type = 1;

    this.setFavorites(result.cofavorites);
    console.log("This is direct" ,this.favorites);
    return result;
  }

  async setGoogleUserdata(idToken){
    const result = await this.loginApi.loginGoogle(idToken);
    console.log("GOOGLOE LOGIN", result);
    this.google_id_token = result.id_token;
    this.user_email= result.user_email;
    this.user_pk =result.user_pk;    
    this.login_type = 2;

    window.sessionStorage.setItem('user_pk', result.user_pk);
    this.setFavorites(result.cofavorites);

  }
  
}