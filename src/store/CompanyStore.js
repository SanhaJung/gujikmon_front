import {action, makeObservable, observable} from 'mobx'
import Companys from '../Companys';

/*   {
_id: "ObjectId",  // 자동으로 생성됨(유닉스 시간+ 기기id+프로세스 id + 카운터 -> 책 p31)
coNm:"기업명(string)",
coAddr:"기업주소(string)",
regionCd:"지역 코드(integer)",
regionNm:"지역명(string)",
superIndTpCd:"업종 코드(integer)",
superIndTpNm:"업종 명(string)",
coContent:"사업 내용(string)",
coMainProd:"주요 생산품목(string)",
coGdpnt:"기업 장점내용(string)",
coHomePage:"회사 홈페이지(string)",
alwaysWorkerCnt:"상시 근로자 수(string)",
sgBrandNm:["인증제도1","인증제도2"],
info:{  //채용 정보 
     exit : true,
     wantedInfoUrl:"워크넷 채용정보 URL(string)",
     wantedMobileInfoUrl:"워크넷 모바일 채용정보 URL(string)",
  } 
}*/
class Company{
  _id= "ObjectId";  // 자동으로 생성됨(유닉스 시간+ 기기id+프로세스 id + 카운터 -> 책 p31)
  coNm="기업명(string)";
  coAddr="기업주소(string)";
  regionCd="지역 코드(integer)";
  regionNm="지역명(string)";
  superIndTpCd="업종 코드(integer)";
  superIndTpNm="업종 명(string)";
  coContent="사업 내용(string)";
  coMainProd="주요 생산품목(string)";
  coGdpnt="기업 장점내용(string)";
  coHomePage="회사 홈페이지(string)";
  alwaysWorkerCnt="상시 근로자 수(string)";
  sgBrandNm=["인증제도1","인증제도2"];
  info={  //채용 정보 
       exit : true,
       wantedInfoUrl:"워크넷 채용정보 URL(string)",
       wantedMobileInfoUrl:"워크넷 모바일 채용정보 URL(string)",
    };
  }

export class CompanyStore{

  rootStore;
  companys = Companys;
  tempcount = 0;
  constructor(root){
    makeObservable(this,  {
      companys : observable,
      createCompany : action,
    })

    this.rootStore = root;
  }

  createCompany(){
    console.log("clicked Now!");
    this.companys=[
      ...this.companys,
      new Company(),
    ]
    
    console.log(this.companys);
  }
}