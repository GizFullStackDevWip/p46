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
        params: {
            uid: uId
        }
    };

    return axios.get("https://poppo.tv/platform/bk/authenticate", customConfig)
        .then((response) => {
            localStorage.setItem('access-token', response.data.token);
        })
        .catch((error) => {
            return [];
        });

}

function keyAuthenticate(key) {

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': localStorage.getItem('access-token'),
        },
        params: {
            pubid: 50023,
            key: key
        }
    };

    return axios.get("https://poppo.tv/platform/bk/api/GetUserSubscriptionDetails", customConfig)
        .then((response) => {
            if (response.data.status == 100) {
                console.log('keyAuth', response)
                setCookie('userId', response.data.data[0].user_id, 7);
                setCookie('userEmail', response.data.data[0].user_email, 7);
                setCookie('userName', response.data.data[0].first_name, 7);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', response.data.data[0].first_name)
                localStorage.setItem('userId', response.data.data[0].user_id)
                window.location.href = '/';
            }
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
        params: {
            uid: uId
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

function getshowsbyCategory() {
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

function getShows(key) {
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

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const service = {
    authenticate,
    keyAuthenticate,
    register,
    getshowsbyCategory,
    getShows
};
