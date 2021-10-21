const axios = require("axios");
const qs = require("querystring");

function fetchHomeBannerDetails() {
  var token = localStorage.getItem("access-token");
  let uId = 74961;
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
    },
    params: {
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "GetFeaturedshows", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function getshowsbyCategory() {
  var token = localStorage.getItem("access-token");
  var uId = 74961;
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
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      user_id: uId,
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "getShowsByCategory", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function getshowsbyPartner(partner_id) {
  var token = localStorage.getItem("access-token");
  let countryCode = getCookie("country_code");
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
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      user_id: uId,
      partner_id: partner_id,
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "partnerVideos", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function getRecentlyAddedShows() {
  var token = localStorage.getItem("access-token");
  let countryCode = getCookie("country_code");
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
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      uid: uId,
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "NewArrivalsUpdated2", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function getLiveChannels() {
  var token = localStorage.getItem("access-token");
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
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "Getallchannels", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function getPartners() {
  var token = localStorage.getItem("access-token");
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
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "partnerList", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function getChannelDetails(id) {
  var token = localStorage.getItem("access-token");
  let countryCode = getCookie("country_code");
  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": token,
    },
    params: {
      channelid: id,
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "liveSchedule", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function getLiveSchedule(id) {
  var token = localStorage.getItem("access-token");
  let countryCode = getCookie("country_code");
  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": token,
    },
    params: {
      channelid: id,
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "liveSchedule", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function addToMyPlayList(id, flag) {
  var token = localStorage.getItem("access-token");
  let countryCode = getCookie("country_code");
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
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      show_id: id,
      uid: uId,
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

function playList() {
  var token = localStorage.getItem("access-token");
  let countryCode = getCookie("country_code");
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
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      uid: uId,
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "GetWatchlistUpdated", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function getShows(key) {
  var token = localStorage.getItem("access-token");
  let countryCode = getCookie("country_code");
  var uId = 74961;
  var userId = getCookie("userId");
  if (userId) {
    uId = userId;
  }
  // if (userId) {
  //   uId = userId;
  // } else {
  //   var uId = 74961;
  //   let user_id = getCookie("userId");
  //   if (user_id) {
  //     uId = user_id;
  //   }
  // }
  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": token,
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      key: key,
      uid: uId,
      country_code: countryCode,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "searchShows", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function showsByCategory(id) {
  var token = localStorage.getItem("access-token");
  let countryCode = getCookie("country_code");
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
    },
    params: {
      pubid: process.env.REACT_APP_PUBID,
      genre_id: id,
      uid: uId,
      country_code: countryCode,
    },
  };
  return axios
    .get(
      process.env.REACT_APP_API_URL + "GetshowsByCategoryUpdated2",
      customConfig
    )
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
    category: values.category,
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
  showsByCategory,
  onVideoPlayFunction,
  getCookie,
};
