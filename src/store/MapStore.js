import {action, makeObservable, observable,set,toJS} from 'mobx'

export class MapStore{
    rootStore;
    map = window;
    constructor(root){
        makeObservable(this,{
            map:observable,
        })
        this.rootStore = root;
    }

  

 }
    
