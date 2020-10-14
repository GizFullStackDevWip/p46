import moment from 'moment';

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
            let timeData = localDate.format('DD-MM-YYYY');
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
