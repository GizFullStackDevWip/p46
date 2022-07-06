const axios = require("axios");
const qs = require("querystring");

function playerToken() {
  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": localStorage.getItem("access-token"),
    },
  };

  return axios
    .get("https://poppo.tv/proxy/api/GenerateToken", customConfig)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return [];
    });
}
function onVideoPlayFunction(videoDetails, event, videoTime) {
  let categories = "";
  videoDetails &&
    videoDetails.category_name &&
    videoDetails.category_name.map((item, index) => {
      if (index === videoDetails.category_name.length - 1) {
        categories = categories + item;
      } else {
        categories = categories + item + ",";
      }
    });
  console.log("categories-->", categories);
  let sessionId = localStorage.getItem("session_id");
  let uId = 291;
  let user_id = getCookie("userId");
  if (user_id) {
    uId = user_id;
  }
  let device_id = localStorage.getItem("deviceId");
  let ctimestamp = Date.now().toString();
  let ctime = ctimestamp.slice(0, 10);
  const requestBody = {
    session_id: sessionId,
    user_id: uId,
    device_id: device_id,
    publisherid: process.env.REACT_APP_PUBID,
    app_id: 140,
    channel_id: videoDetails.channel_id,
    event_type: event,
    video_id: videoDetails.video_id,
    video_title: videoDetails.video_title,
    category: categories,
    timestamp: ctime,
    video_time: videoTime == null || videoTime == 0 ? "" : videoTime,
  };
  var token = localStorage.getItem("access-token");
  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": token,
    },
  };
  return axios
    .post(
      "https://analytics.poppo.tv/event",
      qs.stringify(requestBody),
      customConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function checkVideoSubscription(videoId) {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  let uId = 291;
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
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: device_id,
      ip: ipaddress,
      device_type: "web",
    },
  };

  return axios
    .get(process.env.REACT_APP_API_URL + "video/" + videoId, customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

// function checkUserSubscription() {
//   var token = localStorage.getItem("access-token");
//   let device_id = localStorage.getItem("deviceId");
//   let ipaddress = localStorage.getItem("ipaddress");
//   let uId = 291;
//   let user_id = getCookie("userId");
//   let countryCode = getCookie("country_code");
//   if (user_id) {
//     uId = user_id;
//   }
//   const customConfig = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Access-Control-Allow-Origin": true,
//       crossorigin: true,
//       "access-token": token,
//       uid: uId,
//       pubid: process.env.REACT_APP_PUBID,
//       country_code: countryCode,
//       channelid: process.env.REACT_APP_CHANNELID,
//       dev_id: device_id,
//       ip: ipaddress,
//       device_type: "web",
//     },
//   };

//   return axios
//     .get(process.env.REACT_APP_API_URL + "subscription/user", customConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return [];
//     });
// }
function getShowDetails(showId) {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  let uId = 291;
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
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: device_id,
      ip: ipaddress,
      device_type: "web",
    },
  };

  return axios
  // .get("https://staging.poppo.tv/test/api/show/"+showId, customConfig)
    .get(process.env.REACT_APP_API_URL + "show/" + showId, customConfig)
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

function getVideoDetails(videoId) {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  let uId = 291;
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
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: device_id,
      ip: ipaddress,
      device_type: "web",
    },
  };

  return axios
    .get(process.env.REACT_APP_API_URL + "video/" + videoId, customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function videoSubscription(selectedVideoId) {
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
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: deviceId,
      ip: ipaddress,
      device_type: "web",
    },
    params: {
      video_id: selectedVideoId,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "subscription/active", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function checkUserSubscription() {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  let uId = 291;
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
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: device_id,
      ip: ipaddress,
      device_type: "web",
    },
  };

  return axios
    .get(process.env.REACT_APP_API_URL + "subscription/user", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
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
      localStorage.removeItem("previousSubId");
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
export const service = {
  playerToken,
  onVideoPlayFunction,
  checkVideoSubscription,
  checkUserSubscription,
  getShowDetails,
  getCookie,
  getVideoDetails,
  videoSubscription,
  checkUserSubscription,
  logoutAll,
};
