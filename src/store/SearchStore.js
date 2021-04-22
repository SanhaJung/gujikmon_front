import {action, makeObservable, observable,set,toJS} from 'mobx'
import SearchApi from '../api/SearchApi'

export class SearchStore{
  searchApi = new SearchApi();
  rootStore;
  searchFlag = false; //검색이 됬으면 true ,아니면 fasle
  searchResult = [];

  constructor(root){
    makeObservable(this,  {
        searchFlag:observable,
        Search : action,
    })

    this.rootStore = root;
  }

  async Search(keyword){ 
    const result = await this.searchApi.search(keyword);
    this.searchResult = result;
    this.searchFlag =true;
    return result;

  }

}