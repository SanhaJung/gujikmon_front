import axios from 'axios';

class UserApi{
    URL = '/api/user/'; //http://IP:8000/api/todos/
    //URL = 'http://3.36.237.46/api/company/search/';

    deleteUser(pk){
        const body ={
            user_pk:pk,
        }
        console.log(body);
        return axios.post('user/withdrawal/', body).then((response)=>response.data);
        //axios.get(this.URL+keyword).then((response)=>
        //    {return response.data;}
        //);
        //.finally(()=>{})
    }

    updateFavorite(user_pk,company_id){
        const body ={
            user_pk:user_pk,
            favorite:company_id,
        }
        console.log(body);
        return axios.put(this.URL+'favorite/update/',body).then((response)=> response.data).catch(function(error){
            return "-1"
        });
    }

    getFavorite(user_pk){
        return axios.get(this.URL+'favorite/list/'+user_pk).then((response) => response.data).catch(function(error){
            return "-1"
        });
    }

}export default UserApi