
const axios = require('axios');
const qs = require('querystring');

function getCommunity() {
    var token = localStorage.getItem("access-token");
    let countryCode = getCookie("country_code");
    let device_id = localStorage.getItem("deviceId");
    let ip = localStorage.getItem("ipaddress");
    var uId = 74961;
    let user_id = getCookie("userId");
    if (user_id) {
      uId = user_id;
    }
    const customConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": true,
        crossorigin: true,
        "access-token": token,
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
        channelid: 354,
        uid: uId,
        dev_id: device_id,
        ip: ip,
        device_type: "web",
      },
    };
    return axios
      .get(
        process.env.REACT_APP_SUB_API_URL + "community/list",
        customConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }

function getCommunityShow(Id) {
    var token = localStorage.getItem("access-token");
    let countryCode = getCookie("country_code");
    let device_id = localStorage.getItem("deviceId");
    let ip = localStorage.getItem("ipaddress");
    var uId = 74961;
    let user_id = getCookie("userId");
    if (user_id) {
      uId = user_id;
    }
    const customConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": true,
        crossorigin: true,
        "access-token": token,
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
        channelid: 354,
        uid: uId,
        dev_id: device_id,
        ip: ip,
        device_type: "web",
      },
    };
  
    return axios
      .get(
        process.env.REACT_APP_SUB_API_URL + "community/" + Id + "/videos",
        customConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }

function getPartnerShows(partnerId) {
    let uId = 74961;
    let user_id = getCookie('userId');
    let countryCode = getCookie('country_code');
    let device_id = localStorage.getItem("deviceId");
    let ip = localStorage.getItem("ipaddress");
    if (user_id) {
        uId = user_id;
    }
    var token = localStorage.getItem('access-token');
    const customConfig = {
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Access-Control-Allow-Origin': true,
            // crossorigin: true,
            // 'access-token': token
             "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": true,
        crossorigin: true,
        "access-token": token,
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
        channelid: 354,
        uid: uId,
        dev_id: device_id,
        ip: ip,
        device_type: "web",
        },
        // params: {
        //     pubid: process.env.REACT_APP_PUBID,
        //     partner_id: partnerId,
        //     user_id: uId,
        //     country_code:countryCode
        // }
    };

    return axios.get(process.env.REACT_APP_SUB_API_URL+'partner/'+partnerId+'/videos', customConfig).then(
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
    let uId = 74961;
    let device_id = localStorage.getItem('deviceId');
    let ipaddress = localStorage.getItem('ipaddress');
    if (userId) {
      uId = userId;
  }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
            'pubid':process.env.REACT_APP_PUBID,
            // show_id:id,
            'uid':userId,
            // watchlistflag:flag,
            'country_code':countryCode,
            'channelid' : process.env.REACT_APP_CHANNELID,
            'dev_id' : device_id,
            'ip' : ipaddress,
            'device_type' : 'web'
        },
        // params: {
        //     pubid:process.env.REACT_APP_PUBID,
        //     show_id:id,
        //     uid:userId,
        //     watchlistflag:flag,
        //     country_code:countryCode
        // }
    };
    return axios.get(process.env.REACT_APP_SUB_API_URL+'watchlist/show/'+ id + '/' + flag, customConfig).then(
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
    addToMyPlayList,
    getCommunityShow,
    getCommunity
};
