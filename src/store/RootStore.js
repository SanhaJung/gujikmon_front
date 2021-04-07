import {CompanyStore} from './CompanyStore';
export class RootStore{
    companyStore;
    constructor(){
        this.companyStore = new CompanyStore(this);
    }
}