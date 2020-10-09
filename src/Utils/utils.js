import moment from 'moment';
export const convertTimeToLocal = (date) => {
    return moment(date).format('LT');
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
            return "Today"
        } else {
            return "Tomorrow";

        }
    } else if (newDate > date) {
        return false;
    } else {
        return false;
    }
}
