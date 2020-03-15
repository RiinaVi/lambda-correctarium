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

const startOfWork = 10;
const endOfWork = 19;

function formatDate(date) {
    return moment(date).format('DD/MM/YYYY HH:mm')
}

export function priceCalculator(textLength, lang) {
    if (!textLength) return 0;
    const priceForOneSymbol = allPricesForSymbol[lang];
    const minimumPrice = priceForOneSymbol * 1000;
    const price = priceForOneSymbol * textLength;
    return price >= minimumPrice ? price : minimumPrice;
}

export function timeCalculator(textLength, lang) {
    const minimumTime = 60;
    const symbolsPerHour = allSymbolsPerHour[lang];
    if (textLength <= symbolsPerHour) return minimumTime;

    const symbolPerMinute = symbolsPerHour / 60;
    return 30 + Math.ceil(textLength / symbolPerMinute);
}

export function deadlineCalculator(timeForWork, orderTime = new Date()) {

    orderTime = toNextWorkingMoment(orderTime);
    const timeToEnd = moment.duration(moment(orderTime).hours(endOfWork).minutes(0).diff(orderTime)).asMinutes();

    if (timeToEnd >= timeForWork) {
        return formatDate(moment(orderTime).add(timeForWork, 'minutes'));
    }

    orderTime = moment(orderTime).add(timeToEnd, 'minutes');
    return deadlineCalculator(timeForWork - timeToEnd, orderTime)
}


function toNextWorkingMoment(orderTime) {

    const isAfterFinish = moment(orderTime).isSameOrAfter(moment(orderTime).hours(endOfWork).minutes(0));
    const isBeforeStart = moment(orderTime).isBefore(moment(orderTime).hours(startOfWork).minutes(0));
    const isFriday = moment(orderTime).day() === 5;
    const isSaturday = moment(orderTime).day() === 6;
    const isSunday = moment(orderTime).day() === 0;

    function addDays(days) {
        return moment(orderTime).add(days, 'days').hours(startOfWork).minutes(0)
    }

    if (isFriday && isAfterFinish) {
        return addDays(3)
    }

    if (isSaturday) {
        return addDays(2)
    }

    if (isAfterFinish || isSunday) {
        return addDays(1)
    }

    if (isBeforeStart) {
        return addDays(0)
    }

    return orderTime
}

