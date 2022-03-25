
const axios = require("axios");
const qs = require("querystring");

// function getShowDetails(categoryId) {
//   let uId = 74961;
//   let device_id = localStorage.getItem("deviceId");
//   let user_id = getCookie("userId");
//   let ipaddress = localStorage.getItem("ipaddress");
//   let countryCode = getCookie("country_code");
//   if (user_id) {
//     uId = user_id;
//   }
//   var token = localStorage.getItem("access-token");
//   const customConfig = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Access-Control-Allow-Origin": true,
//       crossorigin: true,
//       "access-token": token,
//     },
//     params: {
//       pubid: process.env.REACT_APP_PUBID,
//       show_id: categoryId,
//       user_id: uId,
//       country_code: countryCode,
//     },
//   };

//   return axios
//     .get(process.env.REACT_APP_SUB_API_URL + "getShowsDetails", customConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return [];
//     });
// }
function getShowDetails(showId) {
  var token = localStorage.getItem('access-token');
  let device_id = localStorage.getItem('deviceId');
  let ipaddress = localStorage.getItem('ipaddress');
  let uId = 74961;
  let user_id = getCookie('userId');
  let countryCode = getCookie('country_code');
  if (user_id) {
      uId = user_id;
  }
  const customConfig = {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': true,
          crossorigin: true,
          'access-token': token,
          'uid': uId,
          'pubid': process.env.REACT_APP_PUBID,
          'country_code': countryCode,
          'channelid' : process.env.REACT_APP_CHANNELID,
          'dev_id' : device_id,
          'ip' : ipaddress,
          'device_type' : 'web'
      },
    //       params: {
    //   pubid: process.env.REACT_APP_PUBID,
    //   show_id: categoryId,
    //   user_id: uId,
    //   country_code: countryCode,
    // },
  };

  // return axios.get(process.env.REACT_APP_SUB_API_URL+'show/' + categoryId, customConfig).then(
    return axios.get(process.env.REACT_APP_SUB_API_URL + "show/" + showId, customConfig).then(
    // return axios.get(process.env.REACT_APP_API_URL+'getShowsDetails', customConfig).then(
      response => {
          return response.data;
      })
      .catch((error) => {
          return [];
      });
}

function getShowDetailsWithSubscription(showId) {
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
    .get(process.env.REACT_APP_SUB_API_URL + "show/" + showId, customConfig)
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
  let device_id = localStorage.getItem("deviceId");
  let countryCode = getCookie("country_code");
  let ipaddress = localStorage.getItem("ipaddress");
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
      'ip': ipaddress,
      'uid': uId,
      'pubid': process.env.REACT_APP_PUBID,
      'country_code': countryCode,
      'channelid': process.env.REACT_APP_CHANNELID,
      'dev_id': device_id,
      'device_type': "web",
    },
    // params: {
    //   pubid: process.env.REACT_APP_PUBID,
    //   vid: videoId,
    //   user_id: uId,
    //   country_code: countryCode,
    // },
  };

  return axios
    .get(
      // process.env.REACT_APP_API_URL + "GetSelectedVideoUpdated2",
      process.env.REACT_APP_SUB_API_URL + "video/" + videoId,
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
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
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
      'channelid': process.env.REACT_APP_CHANNELID,
      'dev_id': device_id,
      'ip': ipaddress,
      'devic_type': "web",
      'pubied': process.env.REACT_APP_PUBID,
      'uid': uId,
      'country_code': countryCode,
    },
    // params: {
    //   pubid: process.env.REACT_APP_PUBID,
    //   uid: uId,
    //   country_code: countryCode,
    // },
  };

  return axios
    .get(process.env.REACT_APP_SUB_API_URL + "subscription/user", customConfig)
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
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
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
      'channelid': process.env.REACT_APP_CHANNELID,
      'dev_id': device_id,
      'ip': ipaddress,
      'device_type': "web",
      'pubid': process.env.REACT_APP_PUBID,
      'uid': uId,
      'country_code': countryCode,
    },
    // params: {
    //   pubid: process.env.REACT_APP_PUBID,
    //   vid: videoId,
    //   uid: uId,
    //   country_code: countryCode,
    // },
  };

  return axios
    .get(process.env.REACT_APP_SUB_API_URL + "show/similar/"+videoId, customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
// function onVideoPlayFunction(values, event) {
//   let countryCode = getCookie("country_code");
//   let sessionId = localStorage.getItem("session_id");
//   let uId = 74961;
//   let user_id = getCookie("userId");
//   if (user_id) {
//     uId = user_id;
//   }
//   let device_id = localStorage.getItem("deviceId");
//   let ctimestamp = Date.now().toString();
//   let ctime = ctimestamp.slice(0, 10);
//   let appid = 73;
//   const requestBody = {
//     session_id: sessionId,
//     user_id: uId,
//     device_id: device_id,
//     publisherid: process.env.REACT_APP_PUBID,
//     app_id: appid,
//     channel_id: values.channel_id,
//     event_type: event,
//     video_id: values.video_id,
//     video_title: values.video_title,
//     category: values.category_id[0],
//     timestamp: ctime,
//   };
//   var token = localStorage.getItem("access-token");
//   const customConfig = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Access-Control-Allow-Origin": true,
//       crossorigin: true,
//       "access-token": token,
//     },
//   };
//   return axios
//     .post(
//       "https://analytics.poppo.tv/event",
//       qs.stringify(requestBody),
//       customConfig
//     )
//     .then((response) => {
//       // console.log(response,'device action response');
//       return response.data;
//     })
//     .catch((error) => {
//       // console.log(error);
//       return [];
//     });
// }
// function onVideoPlayFunction(values, event, categories, currentTime) {
//   let countryCode = getCookie("country_code");
//   let sessionId = localStorage.getItem("session_id");
//   let uId = service.getCookie("guestUserId");
//   let videoTime =
//     currentTime == 0 || currentTime == undefined ? "" : currentTime.toString();
//   let user_id = getCookie("userId");
//   if (user_id) {
//     uId = user_id;
//   }
//   let device_id = localStorage.getItem("deviceId");
//   let ctimestamp = Date.now().toString();
//   let ctime = ctimestamp.slice(0, 10);
//   let appid = "354"; 
//   let category = categories ? categories.slice(0, -1) : "";
//   const requestBody = {
//     session_id: sessionId,
//     user_id: uId,
//     device_id: device_id,
//     publisherid: process.env.REACT_APP_PUBID,
//     app_id: appid,
//     channel_id: values.channel_id,
//     event_type: event,
//     video_id: values.video_id,
//     video_title: values.video_title,
//     category: category,
//     timestamp: ctime,
//     video_time: videoTime,
//   };
//   var token = localStorage.getItem("access-token");
//   const customConfig = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Access-Control-Allow-Origin": true,
//       crossorigin: true,
//       "access-token": token,
//     },
//   };
//   console.log("event ", event, values);
//   console.log(requestBody);
//   return axios
//     .post(
//       "https://analytics.poppo.tv/event",
//       qs.stringify(requestBody),
//       customConfig
//     )
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return [];
//     });
// }
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

function onVideoPlayFunction(values, event) {
  let video_id;
  let video_title;
  if(values.videos.length !=0){
    video_id = values.videos[0].video_id;
    video_title = values.videos[0].video_title;
  } 
  let categories="";
  values.categories.map((item,index) => {
    categories = categories + item.category_name + ","
  })
  
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
  var userId = getCookie("userId");
  let uId = 74961;
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
  let countryCode = getCookie("country_code");
  if (userId) {
    uId = userId;
  }
  const customConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
      "access-token": token,
      'channelid': process.env.REACT_APP_CHANNELID,
      'dev_id': device_id,
      'ip': ipaddress,
      'device_type': "web",
      'pubid': process.env.REACT_APP_PUBID,
      // show_id: id,
      'uid': userId,
      // watchlistflag: flag,
      'country_code': countryCode,
    },
    // params: {
    //   pubid: process.env.REACT_APP_PUBID,
    //   show_id: id,
    //   uid: userId,
    //   watchlistflag: flag,
    //   country_code: countryCode,
    // },
  };
  return axios
    .get(
      process.env.REACT_APP_SUB_API_URL + "watchlist/show/" + id + "/" + flag,
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

function videoSubscription(selectedVideoId) {
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
      video_id: selectedVideoId,
    },
  };
  return axios
    .get(
      process.env.REACT_APP_SUB_API_URL + "subscription/active",
      customConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

function userSubscription(userLoggedId) {
  var token = localStorage.getItem("access-token");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  let countryCode = getCookie("country_code");
  let uId = 74961;
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
      'uid': userLoggedId,
      'pubid': process.env.REACT_APP_PUBID,
      'country_code': countryCode,
      'channelid': process.env.REACT_APP_CHANNELID,
      'dev_id': deviceId,
      'ip': ipaddress,
      'device_type': "web",
    },
  };
  return axios
    .get(process.env.REACT_APP_SUB_API_URL + "subscription/user", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
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
function getGuestUser() {
  var token = localStorage.getItem("access-token");
  let countryCode = getCookie("country_code");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  const customConfig = {
    headers: {
      pubid: process.env.REACT_APP_PUBID,
      channelid: process.env.REACT_APP_CHANNELID,
      country_code: countryCode,
      "access-token": token,
      device_type: "web",
      dev_id: deviceId,
      ip: ipaddress,
      ua: navigator.userAgent,
    },
  };
  return axios
    .post(
      process.env.REACT_APP_SUB_API_URL + "account/register/guest",
      "",
      customConfig
    )
    .then((response) => {
      console.log("responsedata",response.data)
      localStorage.setItem("userId", response.data.user_id);
      service.setCookie("userId", response.data.user_id);
      service.setCookie("guestUserId", response.data.user_id);
      // return true;
      return response.data;
    })
    .catch((error) => {
      return false;
    });
}
export const service = {
  getShowDetails,
  getShowDetailsWithSubscription,
  similarShow,
  onVideoPlayFunction,
  playerToken,
  videoSubscription,
  checkVideoSubscription,
  getGuestUser,
  checkUserSubscription,
  userSubscription,
  addToMyPlayList,
  getCookie,
  setCookie,
  eraseCookie,
};
