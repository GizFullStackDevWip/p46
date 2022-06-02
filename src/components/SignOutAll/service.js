const axios = require("axios");
const qs = require("querystring");

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

function logoutAll(user_id) {
  var token = localStorage.getItem("access-token");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  let countryCode = getCookie("country_code");
  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": token,
      uid: user_id,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: deviceId,
      ip: ipaddress,
      device_type: "web",
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "account/logoutall", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

export const service = {
  getCookie,
  logoutAll,
};
