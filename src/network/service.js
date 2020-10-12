import { getDeviceType,getBrowserType } from '../Utils/utils';
const axios = require('axios');
const qs = require('querystring');
function authenticate() {
    let uId = 74961;
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
            uid: uId
        }
    };

    return axios.get("https://poppo.tv/platform/bk/authenticate", customConfig)
        .then((response) => {
            localStorage.setItem('access-token', response.data.token);
        })
        .catch((error) => {
            return [];
        });

}

function keyAuthenticate(key) {
    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': localStorage.getItem('access-token'),
        },
        params: {
            pubid: 50023,
            key: key
        }
    };

    return axios.get("https://poppo.tv/platform/bk/api/GetUserSubscriptionDetails", customConfig)
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
        'pubid': 50023,
        'device_type': 'web',
        'facebook_id': facebookId
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
            pubid: 50023,
            user_id: uId
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/getShowsByCategory', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function getShows(key) {
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
            pubid: 50023,
            key: key,
            uid: uId
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/searchShows', customConfig).then(
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
            pubid: 50023,
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
            pubid: 50023,
            'user_email': values.email,
            'password': values.password,
            'device_id': device_id,
            'ipaddress': ipaddress
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
            pubid: 50023,
            'uid': userLoggedId,
            'country_code': 'cx',
            'device_id': device_id,
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/getUserSubscriptions', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function forgotEmail(values) {
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: 50023,
            'user_email': values.forgot_email,
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
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: 50023,
            'user_id': user_id,
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
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: 50023,
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/GetpublisherSubscriptions', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}

function videoSubscription(selectedVideoId) {
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: 50023,
            video_id: selectedVideoId
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/GetvideoSubscriptions', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}

function androidTokeDecode(antkn) {
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: 50023,
            key: antkn
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/GetUserSubscriptionDetails', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function stripeSession(sub_id) {
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: 50023,
            sub_id: sub_id
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
    var token = localStorage.getItem('access-token');

    const customConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': true,
            crossorigin: true,
            'access-token': token,
        },
        params: {
            pubid: 50023,
            sessionId: sessionId
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
        'pubid': 50023,
        'device_type': deviceType
    }
    return axios.post("https://poppo.tv/platform/bk/api/updateTransaction", qs.stringify(data), customConfig)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}
function unsubscribe(receiptid, sub_id) {
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
        'pubid': 50023,
    }
    return axios.post("https://poppo.tv/platform/bk/api/unsubscribe", qs.stringify(data), customConfig)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}
function paypalSubscription() {
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
            pubid: 50023,
            'user_id': uId,
        }
    };
    return axios.get('https://poppo.tv/platform/bk/api/checkPaypalSubscribed', customConfig).then(
        response => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
}
function facebokLogin(facebook_id, facebook_email) {
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
        'pubid': 50023,
        'loginType': 'facebook',
        'fb_email': facebook_email

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
        'pubid': 50023,
        'loginType': 'facebook',
        'fb_email': facebook_email
    }

    return axios.post("https://poppo.tv/platform/bk/linkSocialAccount", qs.stringify(data), customConfig)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });

}
function getLocation(){
    return axios.get('https://geolocation-db.com/json/');
}
function analytics() {
    setCookie('device_analytics', 'true');
    let uId = 74961;
    let user_id = getCookie('userId');
    if (user_id) {
        uId = user_id;
    }
    let device_id = localStorage.getItem('deviceId');
    let token = localStorage.getItem('access-token');
    let firstName = localStorage.getItem('userName');
    if (!firstName) {
        firstName = ''
    }
    let appid = 61;
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
    console.log(currentLocation,'currentLocation');
    const data = {
        "device_id": device_id,
        "publisherid": 50023,
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
        "user_email": '',
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
    getCookie,
    setCookie,
};
