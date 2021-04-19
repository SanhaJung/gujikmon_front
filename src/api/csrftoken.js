//csrftoken.js
import axios from 'axios'; 
import React from 'react'; 

axios.defaults.xsrfCookieName = 'csrftoken'; 
axios.defaults.xsrfHeaderName = 'X-CSRFToken'; 

function getCookie(name) {
    let cookieValue = null; 
    if (document.cookie && document.cookie !== '') { 
        let cookies = document.cookie.split(';'); 
        for (let i = 0; i < cookies.length; i++) { 
            let cookie = cookies[i].replace(' ', ''); 
            //var cookie = jQuery.trim(cookies[i]); //jQuery 
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                 break; 
            } 
        } 
    } 
    return cookieValue; 
} 

const CSRFToken = () => { 
    const csrftoken = getCookie('csrftoken'); 
    return( <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/> ) 
}; 

export default CSRFToken //  <CSRFToken/>이라는 컴포넌트 사용

//Django template의 {% csrftoken %}처럼, React의 <CSRFToken />을 활용

