import {action, makeObservable, observable} from 'mobx'


export class FilterStore{

  rootStore;
  locationSelected =[];
  certificationSelected=[];
  IndustySelected=[];

  
  constructor(root){
    makeObservable(this,  {
        locationSelected :observable,
        certificationSelected : observable,
        IndustySelected : observable,
    })

    this.rootStore = root;
  }

}