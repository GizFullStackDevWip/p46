const axios = require('axios');

function fetchHomeBannerDetails() {
    var token = localStorage.getItem('access-token');
    let uId = 74961;
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
        },
        params: {
            uid: uId,
            pubid: 50023,
            country_code:countryCode
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
        },
        params: {
            pubid: 50023,
            user_id: uId,
            country_code:countryCode
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

function getshowsbyPartner(partner_id){
    var token = localStorage.getItem('access-token');
    let countryCode = getCookie('country_code');
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
            user_id: uId,
            partner_id: partner_id,
            country_code:countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/partnerVideos', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function getRecentlyAddedShows(){
    var token = localStorage.getItem('access-token');
    let countryCode = getCookie('country_code');
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
            uid: uId,
            country_code:countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/NewArrivalsUpdated2', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function getLiveChannels(){
    var token = localStorage.getItem('access-token');
    let countryCode = getCookie('country_code');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: 50023,
            country_code:countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/Getallchannels', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function getPartners(){
    var token = localStorage.getItem('access-token');
    let countryCode = getCookie('country_code');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: 50023,
            country_code:countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/partnerList', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function getChannelDetails(id){
    var token = localStorage.getItem('access-token');
    let countryCode = getCookie('country_code');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            channelid: id,
            country_code:countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/liveSchedule', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function getLiveSchedule(id){
    var token = localStorage.getItem('access-token');
    let countryCode = getCookie('country_code');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            channelid: id,
            country_code:countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/liveSchedule', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function addToMyPlayList(id,flag){
    var token = localStorage.getItem('access-token');
    let countryCode = getCookie('country_code');
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
            pubid:50023,
            show_id:id,
            uid:uId,
            watchlistflag:flag,
            country_code:countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/WatchlistShows', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function playList(){
    var token = localStorage.getItem('access-token');
    let countryCode = getCookie('country_code');
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
            pubid:50023,
            uid:uId,
            country_code:countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/GetWatchlistUpdated', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function getShows(key) {
    var token = localStorage.getItem('access-token');
    let countryCode = getCookie('country_code');
    var userId = localStorage.getItem('userId');
    if(userId){
        uId = userId
    }else{
        var uId = 74961
        let user_id = getCookie('userId');
        if (user_id) {
            uId = user_id;
        }
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
            key: key,
            uid:uId,
            country_code:countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/searchShows', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function showsByCategory(id){
    var token = localStorage.getItem('access-token');
    let countryCode = getCookie('country_code');
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
            pubid:50023,
            genre_id:id,
            uid:uId,
            country_code:countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/GetshowsByCategoryUpdated2', customConfig).then(
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
    getshowsbyCategory,
    getshowsbyPartner,
    getLiveChannels,
    getChannelDetails,
    getLiveSchedule,
    addToMyPlayList,
    playList,
    getShows,
    getPartners,
    getRecentlyAddedShows,
    showsByCategory
};
