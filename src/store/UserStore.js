import {action, makeObservable, observable} from 'mobx'

export class UserStore{
    rootStore;

    login= false;
    access_token ='';
    favorites =[];
    constructor(root){
        makeObservable(this,  {
        login : observable,
        access_token : observable,
        favorites:observable,  
        addFavorites:action,
        deleteFavorites:action,
        })

    this.rootStore = root;
  }
  addFavorites(_id){
    this.favorites=[
      ...this.favorites,
      _id,]
    }
    
  deleteFavorites(_id){
    const index = this.favorites.indexOf(_id);
    this.favorites.splice(index, 1);
  }

}