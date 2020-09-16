const axios = require('axios');

function authenticate() {
    let uId = 74961;
    let user_id = getCookie('userId');
    if (user_id) {
        uId = user_id;
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
        },
        params:{
            uid:uId
        }
    };
    
    return axios.get("https://staging.poppo.tv/platform/bk/authenticate", customConfig)
        .then((response) => {
            localStorage.setItem('access-token', response.data.token);
        })
        .catch((error) => {
            return [];
        });

}
function register() {
    let uId = 74961;
    let user_id = getCookie('userId');
    if (user_id) {
        uId = user_id;
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
        },
        params:{
            uid:uId
        }
    };
    
    return axios.get("https://staging.poppo.tv/platform/bk/registerWithEmail", customConfig)
        .then((response) => {
            localStorage.setItem('access-token', response.data.token);
        })
        .catch((error) => {
            return [];
        });

}

function getshowsbyCategory(){
    var token = localStorage.getItem('access-token');
    var uId = 74961
    let user_id = getCookie('userId');
    if (user_id) {
        uId = user_id;
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: 50023,
            user_id: uId
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/getShowsByCategory', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function getShows(key){
    var token = localStorage.getItem('access-token');
    // var uId = 74961
    // let user_id = getCookie('userId');
    // if (user_id) {
    //     uId = user_id;
    // }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: 50023,
            key: key
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/SearchshowsUpdated2', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export const service = {
    authenticate,
    register,
    getshowsbyCategory,
    getShows
};