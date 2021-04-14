import {CompanyStore} from './CompanyStore';
import {FilterStore} from './FilterStore';
import {UserStore} from './UserStore';
export class RootStore{
    companyStore;
    filterStore;
    userStore;
    constructor(){
        this.companyStore = new CompanyStore(this);
        this.filterStore = new FilterStore(this);
        this.userStore = new UserStore(this);
    }
}