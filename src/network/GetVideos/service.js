const axios = require('axios');
const qs = require('querystring');


function getShowDetails(categoryId) {
    let uId = 74961;
    let user_id = getCookie('userId');
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
            pubid: 50023,
            show_id: categoryId,
            user_id: uId
        }
    };

    return axios.get('https://poppo.tv/platform/bk/api/getShowsDetails', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function checkVideoSubscription(videoId) {
    let uId = 74961;
    let user_id = getCookie('userId');
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
            pubid: 50023,
            vid: videoId,
            user_id: uId
        }
    };

    return axios.get('https://poppo.tv/platform/bk/api/GetSelectedVideoUpdated2', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function checkUserSubscription() {
    let uId = 74961;
    let user_id = getCookie('userId');
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
            pubid: 50023,
            uid: uId
        }
    };

    return axios.get('https://poppo.tv/platform/bk/api/getUserSubscriptions', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function similarShow(videoId) {
    let uId = 74961;
    let user_id = getCookie('userId');
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
            pubid: 50023,
            vid: videoId,
            user_id: uId
        }
    };

    return axios.get('https://poppo.tv/platform/bk/api/SimilarshowsUpdated', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function onVideoPlayFunction(values) {
    var timestamp = Date.now().toString();
    var res = timestamp.slice(0, 10);
    // console.log(values);
    // console.log(res);
    const requestBody = {
        // session_id: window.session_id,
        // user_id: window.getCookie('userId'),
        // device_id: window.device_id,
        // publisherid: window.publisherid,
        // app_id: window.appid,
        // channel_id: window.channel_id,
        // event_type: "POP02",
        // video_id: values.video_id,
        // video_title: values.video_title,
        // category: values.category_id,
        // timestamp: res,
    };
    var token = localStorage.getItem('access-token');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
    };
    return axios
        .post('https://us-central1-gizmeon-222018.cloudfunctions.net/poppo-analytics-api/event', qs.stringify(requestBody), customConfig)
        .then((response) => {
            // console.log(response,'device action response');
            return response.data;
        })
        .catch((error) => {
            // console.log(error);
            return [];
        });
}

function playerToken() {

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': localStorage.getItem('access-token'),
        }
    };

    return axios.get("https://poppo.tv/proxy/api/GenerateToken", customConfig)
        .then((response) => {
            return response
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
    getShowDetails,
    similarShow,
    onVideoPlayFunction,
    playerToken,
    checkVideoSubscription,
    checkUserSubscription
};
