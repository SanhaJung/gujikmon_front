import axios from 'axios';
import CSRFToken from './csrftoken';
class FilterApi{
    URL = '/api/companies/'; //http://IP:8000/api/todos/
    //URL = 'http://3.36.237.46/api/companies';

    setFilter(filter){
        return axios.post(this.URL,filter).then((response)=>response.data);
        //.catch(()=>{})
        //.finally(()=>{})
    }

}export default FilterApi