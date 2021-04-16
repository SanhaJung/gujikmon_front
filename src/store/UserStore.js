import {action, makeObservable, observable} from 'mobx';
import LoginApi from '../api/LoginApi';
import UserApi from '../api/UserApi';
import {Company} from './CompanyStore';

export class UserStore{
    rootStore;
    loginApi = new LoginApi();
    userApi = new UserApi();
    login= false;
    kakao_access_token ='';
    google_id_token='';
    user_pk='';
    user_email ='';
    favorites =[];
    constructor(root){
        makeObservable(this,  {
        login : observable,
        kakao_access_token : observable,
        google_id_token : observable,
        favorites:observable,  
        updateFavorites:action,
        setKakoUserdata:action,
        setGoogleUserdata:action,
        })

    this.rootStore = root;
  }

  setFavorites(companies){
    let newCom=[];
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
        data.info);
      
        newCom.push(com);
    })
    this.favorites= newCom;
  };
  async updateFavorites(_id){
    const result = await this.userApi.updateFavorite(this.user_pk,_id);
    if(result === "-1"){
      console.log("UpdateFavorite response failed");
      return;
    }
    console.log(result);
    this.setFavorites(result);
    }
    
    async getFavoirtes(){
    const result = await this.userApi.getFavorite(this.user_pk);
    if(result === "-1"){
      console.log("getFavorite response failed");
      return;
    }
    console.log(result);
    this.setFavorites(result);
  }
  
  async setKakoUserdata(accessToken){
    console.log(accessToken);
    const result = await this.loginApi.loginKaoKao(accessToken);
    console.log(result);
    this.kakao_access_token = result.access_token;
    this.user_email= result.user_email;
    this.user_pk =result.user_pk;    
    return result;
  }
  async setGoogleUserdata(idToken){
    const result = await this.loginApi.loginGoogle(idToken);
    this.google_id_token = result.id_token;
    this.user_email= result.user_email;
    this.user_pk =result.user_pk;    
  }
}