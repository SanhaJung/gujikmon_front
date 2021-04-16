import axios from 'axios';

class SearchApi{
    URL = '/api/company/search/'; //http://IP:8000/api/todos/
    //URL = 'http://3.36.237.46/api/company/search/';

    search(keyword){
        return axios.get(this.URL+keyword).then((response)=>response.data);
        //axios.get(this.URL+keyword).then((response)=>
        //    {return response.data;}
        //);
        //.finally(()=>{})
    }

}export default SearchApi