import {action, makeObservable, observable,set,toJS} from 'mobx'

export class MapStore{
    rootStore;
    map = window;
    loading =false;

    mapCenter_y= 37.5012860931305;
    mapCenter_x = 127.039604663862


    constructor(root){
        makeObservable(this,{
            map:observable,
            mapCenter_y : observable,
            mapCenter_x : observable,
            loading:observable,
        })
        this.rootStore = root;
    }

  

 }
    
