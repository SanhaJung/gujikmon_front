import {CompanyStore} from './CompanyStore';
import {FilterStore} from './FilterStore';
export class RootStore{
    companyStore;
    filterStore;
    constructor(){
        this.companyStore = new CompanyStore(this);
        this.filterStore = new FilterStore(this);
    }
}