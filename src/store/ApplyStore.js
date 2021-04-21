import {action, makeObservable, observable,set,toJS} from 'mobx'
import {Company} from './CompanyStore';

export class ApplyStore{
    rootStore;
    applyCompanies=[];

    constructor(root){
        makeObservable(this,{
            applyCompanies :observable
        })
        this.rootStore = root;
    }

    setApplyCompanies(companies){

        let newCom = [];
        companies.map((data)=>{
       
            if(data.recruitment === true){
                let sgb =[];
                data.sgBrandNm.map((sg)=>{
                    sgb.push(sg.ceNm);
                })
  
                
                var com = new Company(
                    data.id, 
                    data.busiNo,
                    data.coNm,
                    data.coAddr,
                    data.regionCd,
                    data.regionNm,
                    data.superIndTpCd, 
                    data.superIndTpNm,
                    data.coMainProd,
                    data.coHomePage,
                    data.alwaysWorkerCnt,
                    data.recruitment,
                    data.sgBrandNm,
                    data.info,
                    data.x,
                    data.y);

                newCom.push(com);
             
            }
        })
        this.applyCompanies=newCom;
    

    }
    



}