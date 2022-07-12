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

function changePassword(oldPassword, newPassword, checked) {
  var token = localStorage.getItem("access-token");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  let uId = 74961;
  let user_id = getCookie("userId");
  let countryCode = getCookie("country_code");
  if (user_id) {
    uId = user_id;
  }
  const customConfig = {
    headers: {
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": token,
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: deviceId,
      ip: ipaddress,
      device_type: "web",
    },
  };

  const data = {
    old: oldPassword,
    new: newPassword,
    logoutAllChecked: checked,
  };

  return axios
    .post(
      process.env.REACT_APP_API_URL + "account/password/change",
      qs.stringify(data),
      customConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("catcherror", error);
      if (error.response.status == 400) {
        return error.response.data;
      } else {
        return [];
      }
    });
}

function logoutFunction(userId) {
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
      uid: userId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: deviceId,
      ip: ipaddress,
      device_type: "web",
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "account/logout", customConfig)
    .then((response) => {
      localStorage.removeItem("previousSubId");
      sessionStorage.removeItem("applaunch");
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

export const service = {
  getCookie,
  changePassword,
  logoutFunction,
};
