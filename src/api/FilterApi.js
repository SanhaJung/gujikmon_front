import axios from 'axios';

class FilterApi{
    URL = '/api/companies'; //http://IP:8000/api/todos/

    setFilter(filter){
        return axios.post(this.URL,filter).then((response)=>response.data);
        //.catch(()=>{})
        //.finally(()=>{})
    }

}export default FilterApi