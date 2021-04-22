import {action, makeObservable, observable,set,toJS} from 'mobx'
import FilterApi from '../api/FilterApi'
export class FilterStore{
  filterApi = new FilterApi();
  rootStore;
  locationSelected =[];
  certificationSelected=[];
  IndustySelected=[];
  myFilter = {};
  
  constructor(root){
    makeObservable(this,  {
        locationSelected :observable,
        certificationSelected : observable,
        IndustySelected : observable,
        SetFilter : action,
    })

    this.rootStore = root;
  }

  async SetFilter(lo, cer, ind){ 

    //코드만 추출
    var locationCode  =[];
    toJS(lo).map((x)=>{
      locationCode.push(x.code);
    })

    var industryCode  =[];
    toJS(ind).map((x)=>{
      industryCode.push(x.code);
    })
    
    //전체선택 됬는지 탐색
    let totalIndex = cer.indexOf("전체");
    if(totalIndex !== -1)
      cer =["all"];

    totalIndex = industryCode.indexOf("all");
    if(totalIndex !== -1)
      industryCode =["all"];

    //전체선택 확인 및 상위 행정구역 코드 삭제
    locationCode.sort();
    var upper = -1;
    var toDelete = new Set();
    for(let i=0; i<locationCode.length;i++){
      if(locationCode[i]===0){
        locationCode = ["all"];
        break;
      }
      if(locationCode[i]%1000 === 0){
        upper=locationCode[i];
      }
      else{
        if(upper/1000 === parseInt(locationCode[i]/1000)){
          toDelete.add(upper);
        }
      }
    }

    toDelete.forEach((todelete)=>{
      //console.log(todelete)
      const index = locationCode.indexOf(todelete);
      locationCode.splice(index, 1);
    })

    //빈 배열일 경우
    if(locationCode.length===0)
    locationCode = ["all"];
    
    if(cer.length===0)
    cer=["all"];

    if(industryCode.length===0)
    industryCode=["all"];

    //적용
    this.myFilter.regionCd = locationCode;
    this.myFilter.certificationCd = cer;
    this.myFilter.businessCd = industryCode;
    this.myFilter.apply = "all";
    console.log(JSON.stringify(this.myFilter));

    //const result = await this.filterApi.setFilter(JSON.stringify(this.myFilter));
    return await this.filterApi.setFilter(this.myFilter);
  }
}