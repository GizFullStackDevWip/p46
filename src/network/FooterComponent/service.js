const axios = require('axios');
const qs = require('querystring');


function contact(values) {
    var token = localStorage.getItem('access-token');
    let countryCode = getCookie('country_code');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token
        }
    };
    const data = {
        'name': values.firstname,
        'email': values.email,
        'pubid': 50023,
        'state': values.state,
        'reason':values.issues,
        'country': values.country,
        'title': values.movie,
        'platform': values.platform,
        'topic': values.topic,
        'message': values.message,
        'country_code':countryCode
    }

    return axios.post('https://staging.poppo.tv/sendSupport', qs.stringify(data), customConfig).then(
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
    contact
};
