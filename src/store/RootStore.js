import {CompanyStore} from './CompanyStore';
import {FilterStore} from './FilterStore';
import {UserStore} from './UserStore';
import {SearchStore} from './SearchStore';
export class RootStore{
    companyStore;
    filterStore;
    userStore;
    searchStore;
    constructor(){
        this.companyStore = new CompanyStore(this);
        this.filterStore = new FilterStore(this);
        this.userStore = new UserStore(this);
        this.searchStore =new SearchStore(this);
    }
}