const ymd = (dateObj) => {
    const year = dateObj.getFullYear();

    const month = (`0${dateObj.getMonth() + 1}`).slice(-2);
    const date = (`0${dateObj.getDate()}`).slice(-2);

    const format = `${year}-${month}-${date}`;

    return format;
};

module.exports = {
    ymd,
};
