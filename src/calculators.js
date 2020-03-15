import moment from "moment";

export const languages = [
    'Russian', 'English', 'Ukrainian'
];

const allPricesForSymbol = {
    Russian: 0.05,
    Ukrainian: 0.05,
    English: 0.12
};

const allSymbolsPerHour = {
    Russian: 1333,
    Ukrainian: 1333,
    English: 333
};

function formatDate(date) {
    return moment(date).format('DD/MM/YYYY HH:mm')
}

export function priceCalculator(textLength, lang) {
    if (!textLength) return 0;
    let priceForOneSymbol = allPricesForSymbol[lang];
    let minimumPrice = priceForOneSymbol * 1000;
    let price = priceForOneSymbol * textLength;
    return price >= minimumPrice ? price : minimumPrice;
}

export function timeCalculator(textLength, lang) {
    let minimumTime = 60;
    let symbolsPerHour = allSymbolsPerHour[lang];
    if (textLength <= symbolsPerHour) return minimumTime;

    let symbolPerMinute = Math.round(symbolsPerHour / 60);
    let time = 30 + Math.round(textLength / symbolPerMinute);
    console.log(time);
    return time;
}

export function deadlineCalculator(timeForWork, orderTime = new Date()) {

    orderTime = toNextWorkingMoment(orderTime);
    const timeToEnd = moment.duration(moment(orderTime).hours(19).diff(orderTime)).asMinutes();

    if (timeToEnd >= timeForWork) {
        orderTime = moment(orderTime).add(timeForWork, 'minutes');
        return formatDate(orderTime);
    }

    orderTime = moment(orderTime).add(timeToEnd, 'minutes');
    return deadlineCalculator(timeForWork - timeToEnd, orderTime)
}


function toNextWorkingMoment(orderTime) {

    const isAfterFinish = moment(orderTime).isSameOrAfter(moment(orderTime).hours(19));
    const isBeforeStart = moment(orderTime).isBefore(moment(orderTime).hours(10));
    const isFriday = moment(orderTime).day() === 5;
    const isSaturday = moment(orderTime).day() === 6;
    const isSunday = moment(orderTime).day() === 0;

    function addDays(days) {
        return moment(orderTime).add(days, 'days').hours(10).minutes(0)
    }

    if (isFriday && isAfterFinish) {
        return addDays(3)
    }

    if (isAfterFinish || isSunday) {
        return addDays(1)
    }

    if (isSaturday) {
        return addDays(2)
    }

    if (isBeforeStart) {
        return addDays(0)
    }

    return orderTime
}

