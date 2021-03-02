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

const utc_timestamp = (dateObj)=>{
    const year = dateObj.getUTCFullYear();

    const month = (`0${dateObj.getUTCMonth() + 1}`).slice(-2);
    const date = (`0${dateObj.getUTCDate()}`).slice(-2);
    const hour = (`0${dateObj.getUTCHours() + 1}`).slice(-2);

    const minute = (`0${dateObj.getUTCMinutes() + 1}`).slice(-2);

    const format = `${year}/${month}/${date} ${hour}:${minute}`;

    return format;
}
module.exports = {
    utc_timestamp,
    ymd,
    hms,
    ymdhms,
};
