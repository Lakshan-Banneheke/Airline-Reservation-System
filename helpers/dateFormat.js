const ymd = (dateObj) => {
    const year = dateObj.getFullYear();

    const month = (`0${dateObj.getMonth() + 1}`).slice(-2);
    const date = (`0${dateObj.getDate()}`).slice(-2);

    const format = `${year}-${month}-${date}`;

    return format;
};

const hms = (dateObj) => {
    const hour = (`0${dateObj.getHours() + 1}`).slice(-2);

    const minute = (`0${dateObj.getMinutes() + 1}`).slice(-2);
    const second = (`0${dateObj.getSeconds() + 1}`).slice(-2);

    const format = `${hour}:${minute}:${second}`;

    return format;
};
const ymdhms = (dateObj) => {
    const year = dateObj.getFullYear();

    const month = (`0${dateObj.getMonth() + 1}`).slice(-2);
    const date = (`0${dateObj.getDate()}`).slice(-2);
    const hour = (`0${dateObj.getHours() + 1}`).slice(-2);

    const minute = (`0${dateObj.getMinutes() + 1}`).slice(-2);
    const second = (`0${dateObj.getSeconds() + 1}`).slice(-2);

    const format = `${year}-${month}-${date} ${hour}:${minute}:${second}`;

    return format;
};
module.exports = {
    ymd,
    hms,
    ymdhms,
};
