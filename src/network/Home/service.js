const axios = require("axios");
const qs = require("querystring");

function fetchHomeBannerDetails() {
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
    .get(process.env.REACT_APP_API_URL + "video/featured", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function getshowsbyCategory(offset = null) {
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
      // 'pubid': 50012,
      'country_code': countryCode,
      'channelid': process.env.REACT_APP_CHANNELID,
      // 'channelid': 275,
      'dev_id': deviceId,
      'ip': ipaddress,
      'device_type': "web",
    },
  };
 
  if(offset === null){
    return axios
    // .get(`https://staging.poppo.tv/test/api/show/list`, customConfig)
    .get(process.env.REACT_APP_API_URL + "show/list", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
  }else{
    return axios
    // .get(process.env.REACT_APP_API_URL + "show/list?offset=${offset}", customConfig)
    .get(`https://api.gizmott.com/api/v1/show/list?offset=${offset}`, customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
  }
  
  
}
function freeVideos(offset) {
  var token = localStorage.getItem("access-token");
  let ipaddress = localStorage.getItem("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
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
      dev_id: deviceId,
      ip: ipaddress,
      device_type: "web",
    },
  };
  if (offset=== null){
  return (
    axios
    .get(process.env.REACT_APP_API_URL + "show/free/list", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    })
  );
  }
  else
  {
    return (
      axios
      .get(process.env.REACT_APP_API_URL + `show/free/list?offset=${offset}`, customConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      })
    );
  }
}

function getshowsbyPartner(partner_id) {
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
    .get(process.env.REACT_APP_API_URL + "show/newarrivals/list", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function getContinueWatchingVideos(offset= null) {
  var token = localStorage.getItem("access-token");
  let ipaddress = localStorage.getItem("ipaddress");
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
  };
  if (offset === null){
  return (
    axios
    .get(
      process.env.REACT_APP_API_URL + "show/continueWatching/list",
      customConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    })
  );
  }
  else
  {
    return (
      axios
      .get(
        process.env.REACT_APP_API_URL + `show/continueWatching/list?offset=${offset}`,
        customConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      })
    );
  }
}
function getLiveChannels() {
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
    .get(process.env.REACT_APP_API_URL + "channel/list", customConfig)
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
    // params: {
    //   channelid: id,
    //   country_code: countryCode,
    // },
  };
  return axios
    .get(process.env.REACT_APP_API_URL + "schedule/guide/" + id, customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function onVideoPlayFunction(values, event) {
  let video_id;
  let video_title;
  console.log("length",values);
  // if(values.videos.length !=0){
  //   video_id = values.videos[0].video_id;
  //   video_title = values.videos[0].video_title;
  // } 
  let categories="";
  // values.categories.map((item,index) => {
  //   categories = categories + item.category_name + ","
  // })
  
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
    channel_id: process.env.REACT_APP_CHANNELID,
    event_type: event,
    video_id: video_id,
    video_title: video_title,
    category: categories.slice(0, -1),
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

function playList(offset = null) {
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
  if (offset === null){
  return (
    axios
    .get(process.env.REACT_APP_API_URL + "show/watchlist", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    })
  );
  }
  else{
    return (
      axios
      .get(process.env.REACT_APP_API_URL + `show/watchlist?offset=${offset}`, customConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      })
    );
  }
}
function getShows(key) {
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
function showsByCategory(id , offset= null) {
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
  if (offset=== null){
  return (
    axios
  // .get("https://staging.poppo.tv/test/api/category/"+id+"/shows/list", customConfig)
    .get(
      process.env.REACT_APP_API_URL + "category/" + id + "/shows/list",
      customConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    })
  );
  }
  else
  {
    return (
      axios
    // .get("https://staging.poppo.tv/test/api/category/"+id+"/shows/list", customConfig)
      .get(
        process.env.REACT_APP_API_URL + `category/` + id + `/shows/list?offset=${offset}`,
        customConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      })
    );
  }
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
  onVideoPlayFunction,
  logoutAll,
  setCookie,
};
