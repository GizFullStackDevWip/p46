const axios = require('axios');

function fetchHomeBannerDetails() {
    var token = localStorage.getItem('access-token');
    let uId = 74961;
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            uid: uId,
            pubid: 50023
        }

    };
    return axios.get("https://poppo.tv/platform/bk/api/GetFeaturedshows", customConfig).then(
        response => {
            return response.data;
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
    fetchHomeBannerDetails,
    getshowsbyCategory
};