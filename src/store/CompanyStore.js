import {action, makeObservable, observable} from 'mobx'
import SearchApi from '../api/SearchApi'

export class Company{
  id= "ObjectId(integer)";  // 자동으로 생성됨(유닉스 시간+ 기기id+프로세스 id + 카운터 -> 책 p31)
  busiNo = "사업자등록번호(string)"
  coNm="기업명(string)";
  coAddr="기업주소(string)";
  regionCd="지역 코드(integer)";
  regionNm="지역명(string)";
  superIndTpCd="업종 코드(integer)";
  superIndTpNm="업종 명(string)";
  //coContent="사업 내용(string)";
  coMainProd="주요 생산품목(string)";
  //coGdpnt="기업 장점내용(string)";
  coHomePage="회사 홈페이지(string)";
  alwaysWorkerCnt="상시 근로자 수(string)";
  sgBrandNm=["인증제도1","인증제도2"];
  recruitment="채용여부(bool)";
  x= "경도";
  y= "위도";
  info={  //채용 정보 
       exit : true,
       wantedInfoUrl:"워크넷 채용정보 URL(string)",
       wantedMobileInfoUrl:"워크넷 모바일 채용정보 URL(string)",
    };
  
    constructor(id,busiNo,coNm,coAddr,regionCd,regionNum,superIndTpCd,superIndTpNm,
      coMainProd,coHomePage,alwaysWorkerCnt,recuritment,sgBrandNm,info,x,y){
        this.id =id;
        this.busiNo =busiNo;
        this.coNm=coNm;
        this.coAddr=coAddr;
        this.regionCd =regionCd;
        this.regionNm=regionNum;
        this.superIndTpCd=superIndTpCd;
        this.superIndTpNm=superIndTpNm;
        //this.coContent=coContent;
        this.coMainProd=coMainProd;
        //this.coGdpnt=coGdpnt;
        this.coHomePage=coHomePage;
        this.alwaysWorkerCnt=alwaysWorkerCnt;
        this.sgBrandNm = sgBrandNm;
        this.recruitment = recuritment;
        this.x=x;
        this.y=y;
        if(recuritment)
          this.info=info;
        else
          this.info={
            exit:true,
            wantedInfoUrl:"",
            wantedMobileInfoUrl:"",
          };
      }
}

export class CompanyStore{

  rootStore;
  companys = [];
  searchApi = new SearchApi();
  flag = false;

  constructor(root){
    makeObservable(this,  {
      companys : observable,
      createCompany : action,
      setCompany:action,
    })

    this.rootStore = root;
  }

  async init(){
    if(this.flag){ //초기 한번만 실행을 위하여
      return;
    }

    this.flag = true;
    const result = await this.searchApi.search('서울');

    result.map((data)=>{
      let sgb= [];
      data.sgBrandNm.map((sg)=>{
        sgb.push(sg.ceNm);
      })
      
      //console.log(data.company.coContent);
      
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
      // console.log("ok"); 
      this.companys.push(com);
    })
  }

  createCompany(){
    this.companys=[
      ...this.companys,
      new Company(),
    ]
      }

  setCompany(companies){

    let newCom=[];
    companies.map((data)=>{
      //console.log("hih",data);
      let sgb= [];

      if(data.sgBrandNm === undefined){//초기값이 설정되지 않았을 경우
        data.company ={
          id :"ObjectId(integer)",
        busiNo : "사업자등록번호(string)",
        coNm : "",
        coAddr : "",
        regionCd : "지역 코드(integer)",
        regionNm :"지역명(string)",
        superIndTpCd :"업종 코드(integer)",
        superIndTpNm : "업종 명(string)",
        coMainProd : "",
        coHomePage : "",
        alwaysWorkerCnt : "",
        recruitment : false,
        x : "경도",
        y :"위도",
        }
        data.sgBrandNm=[{ceNm:''}];
        data.info={  //채용 정보 
             exit : true,
             wantedInfoUrl:"워크넷 채용정보 URL(string)",
             wantedMobileInfoUrl:"워크넷 모바일 채용정보 URL(string)",
          };
      }

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
    })
    this.companys= newCom;
  };

}