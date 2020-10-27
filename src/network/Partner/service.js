const axios = require('axios');
const qs = require('querystring');


function getPartnerShows(partnerId) {
    let uId = 74961;
    let user_id = getCookie('userId');
    let countryCode = getCookie('country_code');
    if (user_id) {
        uId = user_id;
    }
    var token = localStorage.getItem('access-token');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            partner_id: partnerId,
            user_id: uId,
            country_code:countryCode
        }
    };

    return axios.get(process.env.REACT_APP_API_URL+'partnerVideosByShows', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function addToMyPlayList(id,flag){
    var token = localStorage.getItem('access-token');
    var userId = localStorage.getItem('userId');
    let countryCode = getCookie('country_code');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid:process.env.REACT_APP_PUBID,
            show_id:id,
            uid:userId,
            watchlistflag:flag,
            country_code:countryCode
        }
    };
    return axios.get(process.env.REACT_APP_API_URL+'WatchlistShows', customConfig).then(
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
    getPartnerShows,
    addToMyPlayList
};
