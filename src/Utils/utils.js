import moment from 'moment';

export const playerController = (position, playerId) => {
    let screenPosition = document.documentElement.scrollTop;
    let playerStream = document.getElementById(playerId);
    if (playerStream !== null && playerStream !== 'undefined') {
        if (screenPosition > position) {
            playerStream.pause();
        } else if (screenPosition < position) {
            if (playerStream != null) {
                if (playerStream.paused) {
                    try {
                        playerStream.play();
                    } catch (error) {
                        // console.log('playerStreamError', error)
                    }
                }
            }

        }
    }
}
export const deviceDetect = () => {
    let screenWidth = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;
    return (screenWidth > 959) ? true : false;
}
export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
export const convertTimeToLocal = (date) => {
    let tempDate = moment.utc(date);
    let localDate = moment(tempDate).local();
    let timeData = localDate.format('hh:mm A');
    return timeData;
}
export const convertTime = (duration) => {
    var hours = Math.floor(duration / 60);
    var minutes = duration % 60;
    var min = Math.round(minutes);
    if (hours === 0) {
        return min + 'min';
    } else {
        return hours + 'hr, ' + min + 'min';
    }
}
export const convertSecondsToMin = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
    return hDisplay + mDisplay;
}
export const validateName = (stringValue) => {
    if (/^[A-Za-z]+$/.test(stringValue.trim())) {
        return (true);
    }
    return (false);
}
export const validateEmail = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (true);
    }
    return (false);
}
export const getDateStatus = (d) => {
    let newDate = new Date();
    var date = new Date(d);
    if (newDate < date) {
        if (date.getDate() == newDate.getDate() &&
            date.getMonth() == newDate.getMonth() &&
            date.getFullYear() == newDate.getFullYear()) {
            return '';
        } else {
            let tempDate = moment.utc(d);
            let localDate = moment(tempDate).local();
            let timeData = localDate.format('MM-DD-YYYY');
            return timeData;
        }
    } else if (newDate > date) {
        return false;
    } else {
        return false;
    }
}
export const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
};
export const getBrowserType = () => {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    if (isFirefox === true) {
        return 'Firefox';
    }
    var isSafari = /constructor/i.test(window.HTMLElement) ||
        (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })
            (!window['safari'] || (typeof window['safari'] !== 'undefined' && window['safari'].pushNotification));
    if (isSafari === true) {
        return 'Safari';
    }
    var isIE = false || !!document.documentMode;
    if (isIE === true) {
        return 'IE';
    }
    var isEdge = !isIE && !!window.StyleMedia;
    if (isEdge === true) {
        return 'Edge';
    }
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if (isChrome === true) {
        return 'Chrome';
    }
    var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
    if (isEdgeChromium === true) {
        return 'EdgeChromium';
    }
}
export const getSessionId = () => {
    let date = new Date();
    let millis = date.getTime();
    let deviceId = localStorage.getItem('deviceId');
    let sessionId = millis + deviceId;
    localStorage.setItem('session_id', sessionId);
}

export const checkOperatingSystem = () => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    //Check mobile device is Android
    if (/android/i.test(userAgent)) {
        //Add your Code here
        return 'android';
    }

    //Check mobile device is IOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        //Add your Code here
        return 'iPhone';
    }

    //Check device os is Windows (For Laptop and PC)
    if (navigator.appVersion.indexOf("Win") != -1) {
        //Add your Code here
        return 'window';
    }

    //Check device os is MAC (For Laptop and PC)
    if (navigator.appVersion.indexOf("Mac") != -1) {
        //Add your Code here
        return 'mac';
    }
    return 'none';
}