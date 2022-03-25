
const axios = require("axios");
const qs = require("querystring");

function androidTokeDecode(antkn) {
  var token = localStorage.getItem("access-token");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  let uId = service.getCookie("guestUserId");
  let user_id = getCookie("userId");
  let countryCode = getCookie("country_code");
  if (user_id) {
    uId = user_id;
  }

  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": token,
      'uid': uId,
      'pubid': process.env.REACT_APP_PUBID,
      'country_code': countryCode,
      'channelid': process.env.REACT_APP_CHANNELID,
      'dev_id': deviceId,
      'ip': ipaddress,
      'device_type': "web",
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      key: antkn,
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_SUB_API_URL + "subscription/details", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function bilingDetails() {
  var token = localStorage.getItem("access-token");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  let uId = service.getCookie("guestUserId");
  let user_id = getCookie("userId");
  let countryCode = getCookie("country_code");
  if (user_id) {
    uId = user_id;
  }

  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": token,
      'uid': uId,
      'pubid': process.env.REACT_APP_PUBID,
      'country_code': countryCode,
      'channelid': process.env.REACT_APP_CHANNELID,
      'dev_id': deviceId,
      'ip': ipaddress,
      'device_type': "web",
    },
  };
  return axios
    .get(process.env.REACT_APP_SUB_API_URL + "subscription/history", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
export const service = {
  androidTokeDecode,
  getCookie,
  setCookie,
  bilingDetails,
};
