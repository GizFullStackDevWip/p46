const axios = require("axios");
const qs = require("querystring");

function getShowDetails(categoryId) {
  let uId = 74961;
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
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      show_id: categoryId,
      user_id: uId,
      country_code: countryCode,
    },
  };

  return axios
    .get(process.env.REACT_APP_API_URL + "getShowsDetails", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function checkVideoSubscription(videoId) {
  let uId = 74961;
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
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      vid: videoId,
      user_id: uId,
      country_code: countryCode,
    },
  };

  return axios
    .get(
      process.env.REACT_APP_API_URL + "GetSelectedVideoUpdated2",
      customConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function checkUserSubscription() {
  let uId = 74961;
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
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      uid: uId,
      country_code: countryCode,
    },
  };

  return axios
    .get(process.env.REACT_APP_API_URL + "getUserSubscriptions", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function similarShow(videoId) {
  var token = localStorage.getItem("access-token");
  var userId = getCookie("userId");
  let countryCode = getCookie("country_code");
  if (userId) {
    uId = userId;
  } else {
    var uId = 74961;
    let user_id = getCookie("userId");
    if (user_id) {
      uId = user_id;
    }
  }
  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": token,
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      vid: videoId,
      uid: uId,
      country_code: countryCode,
    },
  };

  return axios
    .get(process.env.REACT_APP_API_URL + "SimilarshowsUpdated", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function onVideoPlayFunction(values, event) {
  let countryCode = getCookie("country_code");
  let sessionId = localStorage.getItem("session_id");
  let uId = 74961;
  let user_id = getCookie("userId");
  if (user_id) {
    uId = user_id;
  }
  let device_id = localStorage.getItem("deviceId");
  let ctimestamp = Date.now().toString();
  let ctime = ctimestamp.slice(0, 10);
  let appid = 73;
  const requestBody = {
    session_id: sessionId,
    user_id: uId,
    device_id: device_id,
    publisherid: process.env.REACT_APP_PUBID,
    app_id: appid,
    channel_id: values.channel_id,
    event_type: event,
    video_id: values.video_id,
    video_title: values.video_title,
    category: values.category_id[0],
    timestamp: ctime,
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
function addToMyPlayList(id, flag) {
  var token = localStorage.getItem("access-token");
  var userId = getCookie("userId");
  let countryCode = getCookie("country_code");
  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": token,
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      show_id: id,
      uid: userId,
      watchlistflag: flag,
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "WatchlistShows", customConfig)
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

export const service = {
  getShowDetails,
  similarShow,
  onVideoPlayFunction,
  playerToken,
  checkVideoSubscription,
  checkUserSubscription,
  addToMyPlayList,
  getCookie,
};
