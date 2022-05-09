import { Redirect } from 'react-router-dom';
import { getDeviceType, getBrowserType } from '../Utils/utils';
const axios = require('axios');
const qs = require('querystring');
// function authenticate() {
//     let uId = 74961;
//     let countryCode = getCookie('country_code');
//     let ipaddress = localStorage.getItem("ipaddress");
//   let deviceId = localStorage.getItem("deviceId");
//     let user_id = getCookie('userId');
//     if (user_id) {
//         uId = user_id;
//     }
//     const customConfig = {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Access-Control-Allow-Origin': true,
//             crossorigin: true,
//             // uid: uId,
//             // pubid: process.env.REACT_APP_PUBID,
//             // country_code: countryCode,
//             // channelid: process.env.REACT_APP_CHANNELID,
//             // dev_id: deviceId,
//             // ip: ipaddress,
//             // device_type: "web",
//         },
//         params: {
//             uid: uId,
//             country_code: countryCode
//         }
//     };

//     return axios
//     // .get("https://staging.poppo.tv/api/v1/account/authenticate", customConfig)
//     .get("https://staging.poppo.tv/platform/bk/authenticate", customConfig)
//         .then((response) => {
//             if (response.data.message == 'Invalid user') {
//                 localStorage.removeItem("userName");
//                 localStorage.removeItem("userId");
//                 localStorage.setItem('isLoggedIn', 'false');
//                 eraseCookie('userName');
//                 eraseCookie('userId');
//                 eraseCookie('userEmail');
//                 eraseCookie('subscriptionId');
//                 authenticate();
//             } else {
//                 localStorage.setItem('access-token', response.data.token);
//             }
//         })
//         .catch((error) => {
//             return [];
//         });

// }
function authenticate() {
  let uId = service.getCookie("guestUserId");
  let countryCode = getCookie("country_code");
  let ipaddress = getCookie("ipaddress");
  let deviceId = localStorage.getItem("deviceId");
  let user_id = getCookie("userId");
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
    },
  };
  return axios
    .get(process.env.REACT_APP_SUB_API_URL + "account/authenticate", customConfig)
    .then((response) => {
      if (response.data.message == "Invalid user") {
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        localStorage.setItem("isLoggedIn", "false");
        eraseCookie("userName");
        eraseCookie("userId");
        eraseCookie("userEmail");
        eraseCookie("subscriptionId");
      } else {
        localStorage.setItem("access-token", response.data.token);
        return response.data;
      }
    })
    .catch((error) => {
      return [];
    });
}
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}
function keyAuthenticate(key) {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem("access-token");
    let ipaddress = getCookie("ipaddress");
    let deviceId = localStorage.getItem("deviceId");
    let uId = service.getCookie("guestUserId");
    let user_id = getCookie("userId");
    if (user_id) {
      uId = user_id;
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': localStorage.getItem('access-token'),
            // uid: uId,
            // pubid: process.env.REACT_APP_PUBID,
            // country_code: countryCode,
            // channelid: process.env.REACT_APP_CHANNELID,
            // dev_id: deviceId,
            // ip: ipaddress,
            // device_type: "web",
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            key: key,
            country_code: countryCode
        }
    };

    return axios
    .get(process.env.REACT_APP_SUB_API_URL+"GetUserSubscriptionDetails", customConfig)
    // .get(process.env.REACT_APP_SUB_API_URL + "subscription/details", customConfig)
        .then((response) => {
            if (response.data.status == 100) {
                // console.log('keyAuth', response)
                setCookie('userId', response.data.data[0].user_id, 7);
                setCookie('userEmail', response.data.data[0].user_email, 7);
                setCookie('userName', response.data.data[0].first_name, 7);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', response.data.data[0].first_name)
                localStorage.setItem('userId', response.data.data[0].user_id)
                window.location.href = '/';
            }
        })
        .catch((error) => {
            return [];
        });

}

// function register(values, facebookId) {
//     let countryCode = getCookie('country_code');
//     let device_id = localStorage.getItem('deviceId');
//     var token = localStorage.getItem('access-token');
//     const customConfig = {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Access-Control-Allow-Origin': true,
//             crossorigin: true,
//             'access-token': token,
//         }
//     };
//     const data = {
//         'device_id': device_id,
//         'first_name': values.firstname,
//         'last_name': values.lastname,
//         'user_email': values.email,
//         'password': values.password,
//         'pubid': process.env.REACT_APP_PUBID,
//         'device_type': 'web',
//         'facebook_id': facebookId,
//         'country_code': countryCode
//     }

//     return axios.post("https://staging.poppo.tv/platform/bk/registerWithEmail", qs.stringify(data), customConfig)
//         .then((response) => {
//             return response.data;
//         })
//         .catch((error) => {
//             return [];
//         });

// }
function register(values, facebookId) {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
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
      uid: uId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: device_id,
      ip: ipaddress,
      device_type: "web",
    },
  };
  const data = {
    first_name: values.firstname,
    last_name: values.lastname,
    user_email: values.email,
    password: values.password,
    facebook_id: facebookId,
  };

  return axios
    .post(
      process.env.REACT_APP_SUB_API_URL + "account/register",
      qs.stringify(data),
      customConfig
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

// function getshowsbyCategory() {
//     let countryCode = getCookie('country_code');
//     var token = localStorage.getItem('access-token');
//     var uId = 74961
//     let user_id = getCookie('userId');
//     if (user_id) {
//         uId = user_id;
//     }
//     const customConfig = {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Access-Control-Allow-Origin': true,
//             crossorigin: true,
//             'access-token': token,
//         },
//         params: {
//             pubid: process.env.REACT_APP_PUBID,
//             user_id: uId,
//             country_code: countryCode
//         }
//     };
//     return axios.get(process.env.REACT_APP_SUB_API_URL+'getShowsByCategory', customConfig).then(
//         response => {
//             return response.data;
//         })
//         .catch((error) => {
//             return [];
//         });
// }
function getshowsbyCategory() {
  console.log("getshowsbyCategory123",getshowsbyCategory);
    let countryCode = getCookie("country_code");
    var token = localStorage.getItem("access-token");
    // var uId = 7496
    let uId = service.getCookie("guestUserId");
    let device_id = localStorage.getItem("deviceId");
    let ipaddress = localStorage.getItem("ipaddress");
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
        uid: uId,
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
        channelid: process.env.REACT_APP_CHANNELID,
        dev_id: device_id,
        ip: ipaddress,
        device_type: "web",
      },
      // params: {
      //     pubid: process.env.REACT_APP_PUBID,
      //     user_id: uId,
      //     country_code: countryCode
      // }
    };
    return axios
      .get(process.env.REACT_APP_SUB_API_URL + "show/list", customConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }
// function getShows(key) {
//     let countryCode = getCookie('country_code');
//     var token = localStorage.getItem('access-token');
//     var userId = localStorage.getItem('userId');
//     if (userId) {
//         uId = userId
//     } else {
//         var uId = 74961
//         let user_id = getCookie('userId');
//         if (user_id) {
//             uId = user_id;
//         }
//     }
//     const customConfig = {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Access-Control-Allow-Origin': true,
//             crossorigin: true,
//             'access-token': token,
//         },
//         params: {
//             pubid: process.env.REACT_APP_PUBID,
//             key: key,
//             uid: uId,
//             country_code: countryCode
//         }
//     };
//     return axios.get(process.env.REACT_APP_SUB_API_URL+'searchShows', customConfig).then(
//         response => {
//             return response.data;
//         })
//         .catch((error) => {
//             return [];
//         });
// }
function getShows(key) {
    let countryCode = getCookie("country_code");
    var token = localStorage.getItem("access-token");
    var userId = localStorage.getItem("userId");
    let device_id = localStorage.getItem("deviceId");
    let ipaddress = localStorage.getItem("ipaddress");
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
        uid: uId,
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
        channelid: process.env.REACT_APP_CHANNELID,
        dev_id: device_id,
        ip: ipaddress,
        device_type: "web",
      },
      params: {
        // pubid: process.env.REACT_APP_PUBID,
        key: key,
        // uid: uId,
        // country_code: countryCode
      },
    };
    return axios
      .get(process.env.REACT_APP_SUB_API_URL + "show/search", customConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }
// function verifyEmail(values, userRegisterId) {
//     var token = localStorage.getItem('access-token');

//     const customConfig = {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Access-Control-Allow-Origin': true,
//             crossorigin: true,
//             'access-token': token,
//         },
//         params: {
//             pubid: process.env.REACT_APP_PUBID,
//             user_id: userRegisterId,
//             otp: values.verification_code
//         }
//     };
//     return axios.get('https://staging.poppo.tv/platform/bk/verifyOtpFromEmail', customConfig).then(
//         response => {
//             return response.data;
//         })
//         .catch((error) => {
//             return [];
//         });
// }
// function verifyEmail(values, userRegisterId) {
//     var token = localStorage.getItem("access-token");
//     let device_id = localStorage.getItem("deviceId");
//     let ipaddress = localStorage.getItem("ipaddress");
//     let uId = 74961;
//     let user_id = getCookie("userId");
//     let countryCode = getCookie("country_code");
//     if (user_id) {
//       uId = user_id;
//     }
//     const customConfig = {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "Access-Control-Allow-Origin": true,
//         crossorigin: true,
//         "access-token": token,
//         uid: userRegisterId,
//         pubid: process.env.REACT_APP_PUBID,
//         country_code: countryCode,
//         channelid: process.env.REACT_APP_CHANNELID,
//         dev_id: device_id,
//         ip: ipaddress,
//         device_type: "web",
//       },
//       params: {
//       //   pubid: process.env.REACT_APP_PUBID,
//       //   user_id: userRegisterId,
//         otp: values.verification_code,
//       },
//     };
//     return axios
//       .get(
//           process.env.REACT_APP_SUB_API_URL + "account/otp/verify", customConfig
//       //   "https://staging.poppo.tv/platform/bk/verifyOtpFromEmail",
//       //   customConfig
//       )
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         return [];
//       });
//   }
function verifyEmail(values, userRegisterId) {
  var token = localStorage.getItem("access-token");
  let device_id = localStorage.getItem("deviceId");
  let ipaddress = localStorage.getItem("ipaddress");
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
      uid: userRegisterId,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
      channelid: process.env.REACT_APP_CHANNELID,
      dev_id: device_id,
      ip: ipaddress,
      device_type: "web",
    },
    params: {
      otp: values.verification_code,
    },
  };
  return axios
    .get(process.env.REACT_APP_SUB_API_URL + "account/otp/verify", customConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}

  async function login(values) {
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
    };
    var url = new URL(process.env.REACT_APP_SUB_API_URL + "account/login"),
      params = {
        user_email: values.email,
        password: values.password,
      };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    let res = {};
    let response = await fetch(url, customConfig);
    res.status = response.status;
    res.data = await response.json();
    return res;
  }


// function login(values) {
//     let countryCode = getCookie("country_code");
//     var token = localStorage.getItem("access-token");
//     let device_id = localStorage.getItem("deviceId");
//     let ipaddress = localStorage.getItem("ipaddress");
//     let uId = 74961;
//     let user_id = getCookie("userId");
//     if (user_id) {
//       uId = user_id;
//     }
//     const customConfig = {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "Access-Control-Allow-Origin": true,
//         crossorigin: true,
//         "access-token": token,
//         uid: uId,
//         pubid: process.env.REACT_APP_PUBID,
//         country_code: countryCode,
//         channelid: process.env.REACT_APP_CHANNELID,
//         dev_id: device_id,
//         ip: ipaddress,
//         device_type: "web",
//       },
//       // params: {
//       //   pubid: process.env.REACT_APP_PUBID,
//       //   user_email: values.email,
//       //   password: values.password,
//       //   device_id: device_id,
//       //   ipaddress: ipaddress,
//       //   country_code: countryCode,
//       // },
//     };
//     return axios
//       // .get("https://staging.poppo.tv/platform/bk/Loginnew", customConfig)
//       .get(process.env.REACT_APP_SUB_API_URL + "subscription/user", customConfig)
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         return [];
//       });
//   }
  function userSubscription(userLoggedId) {
    let countryCode = getCookie("country_code");
    var token = localStorage.getItem("access-token");
    let device_id = localStorage.getItem("deviceId");
    let ipaddress = localStorage.getItem("ipaddress");
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
        uid: userLoggedId,
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
        channelid: process.env.REACT_APP_CHANNELID,
        dev_id: device_id,
        ip: ipaddress,
        device_type: "web",
      },
     
      // params:{
      //   if (login_needed = "true"){
      //     sinin
      //   },
      //   else :{
      //     login_needed
      //   }
      // }
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
  function forgotEmail(values) {
    let countryCode = getCookie("country_code");
    var token = localStorage.getItem("access-token");
    let device_id = localStorage.getItem("deviceId");
    let ipaddress = localStorage.getItem("ipaddress");
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
        uid: uId,
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
        channelid: process.env.REACT_APP_CHANNELID,
        dev_id: device_id,
        ip: ipaddress,
        device_type: "web",
  
      },
      params: {
      //   pubid: process.env.REACT_APP_PUBID,
        user_email: values.forgot_email,
      //   country_code: countryCode,
      },
    };
    return axios
    .get(process.env.REACT_APP_SUB_API_URL + "account/passwordReset", customConfig)
      // .get("https://staging.poppo.tv/platform/bk/Forgotpassword", customConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }
  function logoutAll(user_id) {
    let countryCode = getCookie("country_code");
    var token = localStorage.getItem("access-token");
    let ipaddress = getCookie("ipaddress");
    let deviceId = localStorage.getItem("deviceId");
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
      // params: {
      //   pubid: process.env.REACT_APP_PUBID,
      //   user_id: user_id,
      //   country_code: countryCode,
      //   channelid: process.env.REACT_APP_CHANNELID,
      //   dev_id: deviceId,
      //   ip: ipaddress,
      //   device_type: "web",
      // },
    };
    return (
      axios
        // .get('https://staging.poppo.tv/platform/bk/Logoutall', customConfig)
        .get(process.env.REACT_APP_SUB_API_URL + "account/logoutall", customConfig)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return [];
        })
    );
  }
  // function publisherSubscription() {
  //   let countryCode = getCookie("country_code");
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
  //       country_code: countryCode,
  //     },
  //   };
  //   return axios
  //     .get(
  //       process.env.REACT_APP_SUB_API_URL + "GetpublisherSubscriptions",
  //       customConfig
  //     )
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       return [];
  //     });
  // }
  
  function publisherSubscription() {
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
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
      },
    };
    return axios
      .get(process.env.REACT_APP_SUB_API_URL + "subscription/list", customConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }
function videoSubscription(selectedVideoId) {
    let countryCode = getCookie("country_code");
    var token = localStorage.getItem("access-token");
    let ipaddress = getCookie("ipaddress");
    let deviceId = localStorage.getItem("deviceId");
    let uId = service.getCookie("guestUserId");
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
        uid: uId,
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
        channelid: process.env.REACT_APP_CHANNELID,
        dev_id: deviceId,
        ip: ipaddress,
        device_type: "web",
      },
      params: {
      //   pubid: process.env.REACT_APP_PUBID,
        video_id: selectedVideoId,
      //   country_code: countryCode,
      },
    };
    return axios
      .get(process.env.REACT_APP_SUB_API_URL + "subscription/active", customConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }
  
  function androidTokeDecode(antkn) {
    let countryCode = getCookie("country_code");
    var token = localStorage.getItem("access-token");
    let ipaddress = getCookie("ipaddress");
    let deviceId = localStorage.getItem("deviceId");
    let uId = service.getCookie("guestUserId");
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
        uid: uId,
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
        channelid: process.env.REACT_APP_CHANNELID,
        dev_id: deviceId,
        ip: ipaddress,
        device_type: "web",
      },
      params: {
        pubid: process.env.REACT_APP_PUBID,
        key: antkn,
        country_code: countryCode,
      },
    };
    return axios
      .get(
        process.env.REACT_APP_SUB_API_URL + "subscription/details",
        customConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
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
  

  function stripeSession(sub_id) {
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
        pubid: process.env.REACT_APP_PUBID,
        sub_id: sub_id,
        country_code: countryCode,
      },
    };
    return axios
      .get(
        process.env.REACT_APP_SUB_API_URL + "subscription/stripe/session",
        customConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
  function stripeDecode(sessionId) {
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
      //   country_code: countryCode,
        channelid: process.env.REACT_APP_CHANNELID,
      //   dev_id: deviceId,
      //   ip: ipaddress,
      //   device_type: "web",
      },
      params: {
        pubid: process.env.REACT_APP_PUBID,
        sessionId: sessionId,
        country_code: countryCode,
      },
    };
    return axios
      .get(
        process.env.REACT_APP_SUB_API_URL + "subscription/stripe/details",
        customConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
  function paymentUpdate(subscription, mode_of_payment, status, phone) {
    var token = localStorage.getItem("access-token");
    let ipaddress = getCookie("ipaddress");
    let deviceId = localStorage.getItem("deviceId");
    let uId = service.getCookie("guestUserId");
    let user_id = getCookie("userId");
    let countryCode = getCookie("country_code");
    if (user_id) {
      uId = user_id;
    }
    let orginal_amount = localStorage.getItem("selectedAmount");
    let selectedSubId = localStorage.getItem("selectedSubId");
    let deviceType = localStorage.getItem("deviceType");
    var token = localStorage.getItem("access-token");
  
    let ideabizPhone = "";
  
    if (phone == undefined) {
      ideabizPhone = "";
    } else {
      ideabizPhone = phone;
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
    const data = {
      device_id: deviceId,
      transaction_type: 1,
      subscription_id: selectedSubId,
      mode_of_payment: mode_of_payment,
      status: status,
      uid: uId,
      amount: orginal_amount,
      receiptid: subscription,
      pubid: process.env.REACT_APP_PUBID,
      device_type: deviceType,
      country_code: countryCode,
      ideabiz_phone: ideabizPhone,
    };
    return axios
      .post(
        process.env.REACT_APP_SUB_API_URL + "subscription/updateTransaction",
        qs.stringify(data),
        customConfig
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  function unsubscribe(receiptid, sub_id) {
    let countryCode = getCookie("country_code");
    var uId = 74961;
    let user_id = getCookie("userId");
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
    };
    const data = {
      sub_id: sub_id,
      userid: uId,
      receiptid: receiptid,
      pubid: process.env.REACT_APP_PUBID,
      country_code: countryCode,
    };
    return axios
      .post(
        process.env.REACT_APP_SUB_API_URL + "unsubscribe",
        qs.stringify(data),
        customConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }
  function paypalSubscription(subID) {
    var token = localStorage.getItem("access-token");
    let ipaddress = getCookie("ipaddress");
    let deviceId = localStorage.getItem("deviceId");
    let uId = 74961;
    let user_id = getCookie("userId");
    let subId = localStorage.getItem("selectedSubId");
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
        sub_id: subID,
      },
    };
    return axios
      .get(
        process.env.REACT_APP_SUB_API_URL + "subscription/paypal/verify",
        customConfig
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
  
  function facebookLogin(facebook_id, facebook_email) {
    let countryCode = getCookie("country_code");
    let device_id = localStorage.getItem("deviceId");
    var token = localStorage.getItem("access-token");
    let ipaddress = localStorage.getItem("ipaddress");
    let uId = 74961;
    let user_id = getCookie("userId");
    if (user_id) {
      uId = user_id;
    }
    const customConfig = {
      method: "POST",
      body: qs.stringify(data),
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
    const data = {
      device_id: device_id,
      facebook_id: facebook_id,
      ipaddress: ipaddress,
      pubid: process.env.REACT_APP_PUBID,
      loginType: "facebook",
     email: facebook_email,
      country_code: countryCode,
      // first_name: name,
    };
  
    return axios
      .post(
          process.env.REACT_APP_SUB_API_URL + "account/social/loginWithoutCode",
      //   "https://staging.poppo.tv/platform/bk/loginViaSocialMedia",
        qs.stringify(data),
        customConfig
      )
      // .then((response) => {
      //   return response.data;
      // })
      // .catch((error) => {
      //   return [];
      // });
      .then((response) => {
          let res = {};
    
          // console.log('newfbapires', response)
          res.status = response.status;
    
          try {
            res.data = response.data.data;
          } catch (error) {
            res.status = response.status;
          }
    
          return res;
        })
        .catch((error) => {
          return {};
        });
  }
  function facebookLink(facebook_id, facebook_email) {
    let countryCode = getCookie("country_code");
    let device_id = localStorage.getItem("deviceId");
    var token = localStorage.getItem("access-token");
    let ipaddress = localStorage.getItem("ipaddress");
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
        uid: uId,
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
        channelid: process.env.REACT_APP_CHANNELID,
        dev_id: device_id,
        ip: ipaddress,
        device_type: "web",
      },
    };
    const data = {
      device_id: device_id,
      facebook_id: facebook_id,
      ipaddress: ipaddress,
      pubid: process.env.REACT_APP_PUBID,
      loginType: "facebook",
      fb_email: facebook_email,
      country_code: countryCode,
    };
  
    return axios
      .post(
      //   "https://staging.poppo.tv/platform/bk/linkSocialAccount",
      process.env.REACT_APP_SUB_API_URL + "account/social/link",
      qs.stringify(data),
        customConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }
  function getLocation() {
    return axios.get("https://giz.poppo.tv/service/ipinfo");
  }


function analytics() {
    let countryCode = getCookie("country_code");
    setCookie("device_analytics", "true");
    let sessionId = localStorage.getItem("session_id");
    // setCookie('device_analytics',true);
    let uId = 74961;
    let user_id = getCookie("userId");
    let email_id = getCookie("userEmail");
    if (user_id) {
      uId = user_id;
    }
    let device_id = localStorage.getItem("deviceId");
    let token = localStorage.getItem("access-token");
    let firstName = localStorage.getItem("userName");
    if (!firstName) {
      firstName = "";
    }
    let appid = 73;
    let deviceType = getDeviceType();
    let ctimestamp = Date.now().toString();
    let ctime = ctimestamp.slice(0, 10);
    let browserType = getBrowserType();
    const customConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": true,
        crossorigin: true,
        "access-token": token,
      },
    };
    let currentLocation = JSON.parse(localStorage.getItem("currentLocation"));
    const data = {
      session_id: sessionId,
      device_id: device_id,
      publisherid: process.env.REACT_APP_PUBID,
      app_id: appid,
      user_id: uId,
      ip_address: currentLocation.IPv4,
      ua: navigator.userAgent,
      timestamp: ctime,
      country: currentLocation.country_name,
      device_type: deviceType,
      city: currentLocation.city,
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      width: window.innerWidth,
      height: window.innerHeight,
      device_make: navigator.userAgent,
      device_model: navigator.userAgent,
      browser: browserType,
      user_name: firstName,
      user_email: email_id,
      user_contact_number: "",
    };
    return axios
      .post("https://analytics.poppo.tv/device", qs.stringify(data), customConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }
  function cookiePlicy() {
    let uId = 74961;
    let user_id = getCookie("userId");
    let token = localStorage.getItem("access-token");
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
    };
    const data = {
      uid: uId,
    };
    return axios
      .post(
        process.env.REACT_APP_SUB_API_URL + "acceptCookies",
        qs.stringify(data),
        customConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }
  // function getGeoInfo() {
  //   return axios
  //     .get("https://ipapi.co/json/")
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //     });
  // }
  function getGeoInfo() {
      return axios
        .get("https://giz.poppo.tv/service/ipinfo")
        .then((response) => {
          if (response.data) {
            service.setCookie("country_code", response.data.countryCode, 30);
            service.setCookie("ipaddress", response.data.query, 30);
            let currentLocation = {};
            currentLocation["country_name"] = response.data.country;
            currentLocation["city"] = response.data.city;
            currentLocation["latitude"] = response.data.lat;
            currentLocation["longitude"] = response.data.lon;
            currentLocation["IPv4"] = response.data.query;
            currentLocation["state"] = response.data.region;
            localStorage.setItem(
              "currentLocation",
              JSON.stringify(currentLocation)
            );
          }
          return response.data;
        })
        .catch((error) => {});
    }
  function generateTvLink() {
    let uId = 74961;
    let countryCode = getCookie("country_code");
    let ipaddress = localStorage.getItem("ipaddress");
    let deviceId = localStorage.getItem("deviceId");
    let user_id = getCookie("userId");
    let token = localStorage.getItem("access-token");
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
        channelid: 354,
        dev_id: deviceId,
        ip: ipaddress,
        device_type: "web",
      },
    };
    return axios
    .post(
      process.env.REACT_APP_SUB_API_URL + "user/code/generate",
      "",
      customConfig
    )
      // .post("https://api.gizmott.com/api/v1/user/code/generate", "", customConfig)
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
  function applaunchEvent(event) {
    let sessionId = localStorage.getItem("session_id");
    let uId = service.getCookie("guestUserId");
    let user_id = getCookie("userId");
    if (user_id) {
      uId = user_id;
    }
    let device_id = localStorage.getItem("deviceId");
    let ctimestamp = Date.now().toString();
    let ctime = ctimestamp.slice(0, 10);
    let appid = "354"; 
    const requestBody = {
      app_id: appid,
      timestamp: ctime,
      device_id: device_id,
      event_type: event,
      publisherid: process.env.REACT_APP_PUBID,
      user_id: uId,
      channel_id: process.env.REACT_APP_CHANNELID,
      session_id: sessionId,
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
    console.log("event ", event);
    console.log(requestBody);
    return axios
      .post(
        "https://analytics.poppo.tv/event",
        qs.stringify(requestBody),
        customConfig
      )
      .then((response) => {
        sessionStorage.setItem("applaunch", true);
        return response.data;
      })
      .catch((error) => {
        sessionStorage.removeItem("applaunch");
        return [];
      });
  }
 
  // function userSubscription(userLoggedId) {
  //   var token = localStorage.getItem("access-token");
  //   let ipaddress = getCookie("ipaddress");
  //   let deviceId = localStorage.getItem("deviceId");
  //   let countryCode = getCookie("country_code");
  //   let uId = 74961;
  //   let user_id = getCookie("userId");
  //   if (user_id) {
  //     uId = user_id;
  //   }
  //   const customConfig = {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Access-Control-Allow-Origin": true,
  //       crossorigin: true,
  //       "access-token": token,
  //       'uid': userLoggedId,
  //       'pubid': process.env.REACT_APP_PUBID,
  //       'country_code': countryCode,
  //       'channelid': process.env.REACT_APP_CHANNELID,
  //       'dev_id': deviceId,
  //       'ip': ipaddress,
  //       'device_type': "web",
  //     },
  //   };
  //   return axios
  //     .get(process.env.REACT_APP_SUB_API_URL + "subscription/user", customConfig)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       return [];
  //     });
  // }
  function changePassword(oldPassword, newPassword, checked) {
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
        process.env.REACT_APP_SUB_API_URL + "account/password/change",
        qs.stringify(data),
        customConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }
  function forgotPassword(email) {
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
        user_email: email,
        pubid: process.env.REACT_APP_PUBID,
      },
    };
    return axios
      .get("https://staging.poppo.tv/platform/bk/Forgotpassword", customConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }
  
export const service = {
    authenticate,
    keyAuthenticate,
    register,
    getshowsbyCategory,
    getShows,
    verifyEmail,
    applaunchEvent,
    login,
    eraseCookie,
    userSubscription,
    forgotEmail,
    logoutAll,
    publisherSubscription,
    videoSubscription,
    androidTokeDecode,
    stripeSession,
    stripeDecode,
    paymentUpdate,
    unsubscribe,
    getGuestUser,
    paypalSubscription,
    facebookLogin,
    changePassword,
    forgotPassword,
    facebookLink,
    analytics,
    getLocation,
    getGeoInfo,
    getCookie,
    setCookie,
    cookiePlicy,
    generateTvLink
};
