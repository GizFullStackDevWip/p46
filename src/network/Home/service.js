const axios = require("axios");
const qs = require("querystring");
let uId = getCookie("guestUserId");


function fetchHomeBannerDetails() {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
    .get(process.env.REACT_APP_API_URL + "video/featured", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function getshowsbyCategory() {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
    .get(process.env.REACT_APP_API_URL + "show/list", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function freeVideos() {
  var token = localStorage.getItem("access-token");
  let ipaddress = localStorage.getItem("ipaddress");
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
  return axios
    .get(process.env.REACT_APP_API_URL + "show/free/list", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function getshowsbyPartner(partner_id) {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
    .get(process.env.REACT_APP_API_URL + "show/newarrivals/list", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function getContinueWatchingVideos() {
  var token = localStorage.getItem("access-token");
  let ipaddress = localStorage.getItem("ipaddress");
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
  return axios
    .get(
      process.env.REACT_APP_API_URL + "show/continueWatching/list",
      customConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function getLiveChannels() {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
    .get(
      process.env.REACT_APP_API_URL + "watchlist/show/" + id + "/" + flag,
      customConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function playList() {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
    .get(process.env.REACT_APP_API_URL + "show/watchlist", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function getShows(key) {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
    params: {
      key: key,
    },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "show/search", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function showsByCategory(id) {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  
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
    .get(
      process.env.REACT_APP_API_URL + "category/" + id + "/shows/list",
      customConfig
    )
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

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
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
  getCookie,
  freeVideos,
  getContinueWatchingVideos,
  getVideoDetails,
  videoSubscription,
  checkUserSubscription,
  logoutAll,
  setCookie,
};
