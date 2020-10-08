import moment from 'moment';
export const convertTimeToLocal = (date) => {
    return moment(date).format('LT');
}
export const convertTime = (duration) => {
    var hours = Math.floor(duration / 60);
    var minutes = duration % 60;
    return hours + 'hr, ' + minutes + 'min';
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
