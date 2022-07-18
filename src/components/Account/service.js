const axios = require("axios");
const qs = require("querystring");
let uId = getCookie("guestUserId");

function getAccountDetails() {
  var token = localStorage.getItem("access-token");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  
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
  //process.env.REACT_APP_API_URL +
  //
  return axios
    .get(process.env.REACT_APP_API_URL + "account/details", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function unsubscribe(sub_id) {
  var token = localStorage.getItem("access-token");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  
  let user_id = getCookie("userId");
  let countryCode = getCookie("country_code");
  if (user_id) {
    uId = user_id;
  }

  var token = localStorage.getItem("access-token");
  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
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
    sub_id: sub_id,
    userid: uId,
    pubid: process.env.REACT_APP_PUBID,
    country_code: countryCode,
  };
  return axios
    .post(
      process.env.REACT_APP_API_URL + "subscription/cancel",
      qs.stringify(data),
      customConfig
    )
    .then((response) => {
      console.log("unsubscribe success", response);
      return response.data;
    })
    .catch((error) => {
      console.log("unsubscribe error", error, error.response);
      return error.response.data;
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

function NewsLetterAdd(email) {
  var token = localStorage.getItem("access-token");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  
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
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: deviceId,
      ip: ipaddress,
      device_type: "web",
      "access-token": token,
    },
  };
  const data = {
    email: email,
  };
  return axios
    .post(
      process.env.REACT_APP_API_URL + "account/newsletter/subscribe",
      qs.stringify(data),
      customConfig
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function NewsLetterRemove(email) {
  var token = localStorage.getItem("access-token");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  
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
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: deviceId,
      ip: ipaddress,
      device_type: "web",
      "access-token": token,
    },
  };
  const data = {
    email: email,
  };
  return axios
    .post(
      process.env.REACT_APP_API_URL + "account/newsletter/unsubscribe",
      qs.stringify(data),
      customConfig
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function addPhoneNumber(cCode, phoneNumber) {
  var token = localStorage.getItem("access-token");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  
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
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: deviceId,
      ip: ipaddress,
      device_type: "web",
      "access-token": token,
    },
  };
  const data = {
    c_code: cCode,
    new: phoneNumber,
  };
  return axios
    .post(
      process.env.REACT_APP_API_URL + "account/phone/change",
      qs.stringify(data),
      customConfig
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function deletePhoneNumber(cCode, phoneNumber) {
  var token = localStorage.getItem("access-token");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  
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
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: deviceId,
      ip: ipaddress,
      device_type: "web",
      "access-token": token,
    },
  };
  const data = {
    c_code: cCode,
    new: phoneNumber,
  };
  return axios
    .post(
      process.env.REACT_APP_API_URL + "account/phone/delete",
      "",
      customConfig
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

export const service = {
  getAccountDetails,
  unsubscribe,
  getCookie,
  NewsLetterAdd,
  NewsLetterRemove,
  addPhoneNumber,
  deletePhoneNumber,
};
