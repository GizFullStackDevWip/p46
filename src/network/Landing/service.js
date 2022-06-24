const axios = require('axios');
const qs = require('querystring');

function getshowsbyCategory(){
    var token = localStorage.getItem('access-token');
    let device_id = localStorage.getItem('deviceId');
    let ipaddress = localStorage.getItem('ipaddress');
    let uId = 291;
    let user_id = getCookie('userId');
    let countryCode = getCookie('country_code');
    if (user_id) {
        uId = user_id;
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
            'uid': uId,
            'pubid': process.env.REACT_APP_PUBID,
            'country_code': countryCode,
            'channelid' : process.env.REACT_APP_CHANNELID,
            'dev_id' : device_id,
            'ip' : ipaddress,
            'device_type' : 'web'
        },
       
    };
    return axios
    // .get("https://staging.poppo.tv/test/api/show/list", customConfig)
    .get(process.env.REACT_APP_API_URL+'show/list', customConfig)
    .then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function getLiveChannels(){
    var token = localStorage.getItem('access-token');
    let device_id = localStorage.getItem('deviceId');
    let ipaddress = localStorage.getItem('ipaddress');
    let uId = 291;
    let user_id = getCookie('userId');
    let countryCode = getCookie('country_code');
    if (user_id) {
        uId = user_id;
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
            'uid': uId,
            'pubid': process.env.REACT_APP_PUBID,
            'country_code': countryCode,
            'channelid' : process.env.REACT_APP_CHANNELID,
            'dev_id' : device_id,
            'ip' : ipaddress,
            'device_type' : 'web'
        },
       
    };
    return axios.get(process.env.REACT_APP_API_URL + "channel/list", customConfig).then(
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
    getshowsbyCategory,
    getLiveChannels
};
