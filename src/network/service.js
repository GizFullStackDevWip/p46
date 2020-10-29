import { getDeviceType, getBrowserType } from '../Utils/utils';
const axios = require('axios');
const qs = require('querystring');
function authenticate() {
    let uId = 74961;
    let countryCode = getCookie('country_code');
    let user_id = getCookie('userId');
    if (user_id) {
        uId = user_id;
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
        },
        params: {
            uid: uId,
            country_code: countryCode
        }
    };

    return axios.get("https://poppo.tv/platform/bk/authenticate", customConfig)
        .then((response) => {
            if (response.data.message == 'Invalid user') {
                localStorage.removeItem("userName");
                localStorage.removeItem("userId");
                localStorage.setItem('isLoggedIn', 'false');
                eraseCookie('userName');
                eraseCookie('userId');
                eraseCookie('userEmail');
                eraseCookie('subscriptionId');
                authenticate();
            } else {
                localStorage.setItem('access-token', response.data.token);
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
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': localStorage.getItem('access-token'),
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            key: key,
            country_code: countryCode
        }
    };

    return axios.get(process.env.REACT_APP_API_URL+"GetUserSubscriptionDetails", customConfig)
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

function register(values, facebookId) {
    let countryCode = getCookie('country_code');
    let device_id = localStorage.getItem('deviceId');
    var token = localStorage.getItem('access-token');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        }
    };
    const data = {
        'device_id': device_id,
        'first_name': values.firstname,
        'last_name': values.lastname,
        'user_email': values.email,
        'password': values.password,
        'pubid': process.env.REACT_APP_PUBID,
        'device_type': 'web',
        'facebook_id': facebookId,
        'country_code': countryCode
    }

    return axios.post("https://poppo.tv/platform/bk/registerWithEmail", qs.stringify(data), customConfig)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}

function getshowsbyCategory() {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');
    var uId = 74961
    let user_id = getCookie('userId');
    if (user_id) {
        uId = user_id;
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            user_id: uId,
            country_code: countryCode
        }
    };
    return axios.get(process.env.REACT_APP_API_URL+'getShowsByCategory', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function getShows(key) {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');
    var userId = localStorage.getItem('userId');
    if (userId) {
        uId = userId
    } else {
        var uId = 74961
        let user_id = getCookie('userId');
        if (user_id) {
            uId = user_id;
        }
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            key: key,
            uid: uId,
            country_code: countryCode
        }
    };
    return axios.get(process.env.REACT_APP_API_URL+'searchShows', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function verifyEmail(values, userRegisterId) {
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            user_id: userRegisterId,
            otp: values.verification_code
        }
    };
    return axios.get('https://poppo.tv/platform/bk/verifyOtpFromEmail', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function login(values) {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');
    let device_id = localStorage.getItem('deviceId');
    let ipaddress = localStorage.getItem('ipaddress');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            'user_email': values.email,
            'password': values.password,
            'device_id': device_id,
            'ipaddress': ipaddress,
            'country_code': countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/Loginnew', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function userSubscription(userLoggedId) {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');
    let device_id = localStorage.getItem('deviceId');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            'uid': userLoggedId,
            'country_code': 'cx',
            'device_id': device_id,
            'country_code': countryCode
        }
    };
    return axios.get(process.env.REACT_APP_API_URL+'getUserSubscriptions', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function forgotEmail(values) {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            'user_email': values.forgot_email,
            country_code: countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/Forgotpassword', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function logoutAll(user_id) {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            'user_id': user_id,
            country_code: countryCode
        }
    };
    return axios.get('https://poppo.tv/platform/bk/Logoutall', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function publisherSubscription() {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            country_code: countryCode
        }
    };
    return axios.get(process.env.REACT_APP_API_URL+'GetpublisherSubscriptions', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}

function videoSubscription(selectedVideoId) {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            video_id: selectedVideoId,
            country_code: countryCode
        }
    };
    return axios.get(process.env.REACT_APP_API_URL+'GetvideoSubscriptions', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function androidTokeDecode(antkn) {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            key: antkn,
            country_code: countryCode
        }
    };
    return axios.get(process.env.REACT_APP_API_URL+'GetUserSubscriptionDetails', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function stripeSession(sub_id) {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            sub_id: sub_id,
            country_code: countryCode
        }
    };
    return axios.get('http://poppo.tv/createStripeSession', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function stripeDecode(sessionId) {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            sessionId: sessionId,
            country_code: countryCode
        }
    };
    return axios.get('http://poppo.tv/fetchStripeDetails', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function paymentUpdate(subscription, mode_of_payment, status) {
    let countryCode = getCookie('country_code');
    var uId = 74961
    let user_id = getCookie('userId');
    if (user_id) {
        uId = user_id;
    }
    let orginal_amount = localStorage.getItem('selectedAmount');
    let selectedSubId = localStorage.getItem('selectedSubId');
    let deviceType = localStorage.getItem('deviceType');
    let device_id = localStorage.getItem('deviceId');
    var token = localStorage.getItem('access-token');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        }
    };
    const data = {
        'device_id': device_id,
        'transaction_type': 1,
        'subscription_id': selectedSubId,
        'mode_of_payment': mode_of_payment,
        'status': status,
        'uid': uId,
        'amount': orginal_amount,
        'country_code': 'cx',
        'receiptid': subscription,
        'pubid': process.env.REACT_APP_PUBID,
        'device_type': deviceType,
        'country_code': countryCode
    }
    return axios.post(process.env.REACT_APP_API_URL+"updateTransaction", qs.stringify(data), customConfig)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}
function unsubscribe(receiptid, sub_id) {
    let countryCode = getCookie('country_code');
    var uId = 74961
    let user_id = getCookie('userId');
    if (user_id) {
        uId = user_id;
    }
    var token = localStorage.getItem('access-token');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        }
    };
    const data = {
        'sub_id': sub_id,
        'userid': uId,
        'receiptid': receiptid,
        'pubid': process.env.REACT_APP_PUBID,
        'country_code': countryCode
    }
    return axios.post(process.env.REACT_APP_API_URL+"unsubscribe", qs.stringify(data), customConfig)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}
function paypalSubscription() {
    let countryCode = getCookie('country_code');
    var token = localStorage.getItem('access-token');
    var uId = 74961
    let user_id = getCookie('userId');
    if (user_id) {
        uId = user_id;
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: process.env.REACT_APP_PUBID,
            'user_id': uId,
            country_code: countryCode
        }
    };
    return axios.get(process.env.REACT_APP_API_URL+'checkPaypalSubscribed', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function facebokLogin(facebook_id, facebook_email) {
    let countryCode = getCookie('country_code');
    let device_id = localStorage.getItem('deviceId');
    var token = localStorage.getItem('access-token');
    let ipaddress = localStorage.getItem('ipaddress');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        }
    };
    const data = {
        'device_id': device_id,
        'facebook_id': facebook_id,
        'ipaddress': ipaddress,
        'pubid': process.env.REACT_APP_PUBID,
        'loginType': 'facebook',
        'fb_email': facebook_email,
        'country_code': countryCode

    }

    return axios.post("https://poppo.tv/platform/bk/loginViaSocialMedia", qs.stringify(data), customConfig)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}
function facebokLink(facebook_id, facebook_email) {
    let countryCode = getCookie('country_code');
    let device_id = localStorage.getItem('deviceId');
    var token = localStorage.getItem('access-token');
    let ipaddress = localStorage.getItem('ipaddress');
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        }
    };
    const data = {
        'device_id': device_id,
        'facebook_id': facebook_id,
        'ipaddress': ipaddress,
        'pubid': process.env.REACT_APP_PUBID,
        'loginType': 'facebook',
        'fb_email': facebook_email,
        'country_code': countryCode
    }

    return axios.post("https://poppo.tv/platform/bk/linkSocialAccount", qs.stringify(data), customConfig)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}
function getLocation() {
    return axios.get('https://geolocation-db.com/json/');
}
function analytics() {
    let countryCode = getCookie('country_code');
    let sessionId = localStorage.getItem('session_id');
    // setCookie('device_analytics',true);
    let uId = 74961;
    let user_id = getCookie('userId');
    let email_id = getCookie('userEmail');
    if (user_id) {
        uId = user_id;
    }
    let device_id = localStorage.getItem('deviceId');
    let token = localStorage.getItem('access-token');
    let firstName = localStorage.getItem('userName');
    if (!firstName) {
        firstName = ''
    }
    let appid = 73;
    let deviceType = getDeviceType();
    let ctimestamp = Date.now().toString();
    let ctime = ctimestamp.slice(0, 10);
    let browserType = getBrowserType();
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        }
    };
    let currentLocation = JSON.parse(localStorage.getItem('currentLocation'));
    const data = {
        "session_id": sessionId,
        "device_id": device_id,
        "publisherid": process.env.REACT_APP_PUBID,
        "app_id": appid,
        "user_id": uId,
        "ip_address": currentLocation.IPv4,
        "ua": navigator.userAgent,
        "timestamp": ctime,
        "country": currentLocation.country_name,
        "device_type": deviceType,
        "city": currentLocation.city,
        "latitude": currentLocation.latitude,
        "longitude": currentLocation.longitude,
        "width": window.innerWidth,
        "height": window.innerHeight,
        "device_make": navigator.userAgent,
        "device_model": navigator.userAgent,
        "browser": browserType,
        "user_name": firstName,
        "user_email": email_id,
        "user_contact_number": ''
    }
    return axios.post("https://analytics.poppo.tv/device", qs.stringify(data), customConfig)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}
function cookiePlicy() {
    let uId = 74961;
    let user_id = getCookie('userId');
    let token = localStorage.getItem('access-token');
    if (user_id) {
        uId = user_id;
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        }
    };
    const data = {
        "uid": uId,
    }
    return axios.post(process.env.REACT_APP_API_URL+"acceptCookies", qs.stringify(data), customConfig)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}
function getGeoInfo() {
    return axios.get('https://ipapi.co/json/').then((response) => {
        return response.data;
    }).catch((error) => {
        // console.log(error);
    });
};
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const service = {
    authenticate,
    keyAuthenticate,
    register,
    getshowsbyCategory,
    getShows,
    verifyEmail,
    login,
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
    paypalSubscription,
    facebokLogin,
    facebokLink,
    analytics,
    getLocation,
    getGeoInfo,
    getCookie,
    setCookie,
    cookiePlicy
};
