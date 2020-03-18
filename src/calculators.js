import moment from "moment-timezone";

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
    return date.format('DD/MM/YYYY, HH:mm dddd')
}

moment.fn.resetDate = function (hours = startOfWork) {
    return this.hours(hours).minutes(0)
};

export function calculatePrice(textLength, lang) {
    if (!textLength) return 0;
    const priceForOneSymbol = allPricesForSymbol[lang];
    const minimumPrice = priceForOneSymbol * 1000;
    const price = priceForOneSymbol * textLength;
    return price >= minimumPrice ? price : minimumPrice;
}

export function calculateTime(textLength, lang) {
    const minimumTime = 60;
    const symbolsPerHour = allSymbolsPerHour[lang];
    if (textLength <= symbolsPerHour) return minimumTime;

    const symbolPerMinute = symbolsPerHour / 60;
    return 30 + Math.ceil(textLength / symbolPerMinute);
}

export function calculateDeadline(timeForWorkInMinutes, orderDate = moment()) {
    moment.tz.setDefault('Europe/Kiev');

    const userTimeZone = moment.tz.guess();
    let startDate = orderDate;

    while (timeForWorkInMinutes){
        startDate = convertToNextWorkingDate(startDate);

        const timeToEnd = moment.duration(moment(startDate).resetDate(endOfWork).diff(startDate)).asMinutes();

        if (timeToEnd >= timeForWorkInMinutes) {
            return formatDate(startDate.add(timeForWorkInMinutes, 'minutes').tz(userTimeZone));
        }

        startDate = startDate.add(timeToEnd, 'minutes');
        timeForWorkInMinutes-=timeToEnd
    }
}


function convertToNextWorkingDate(date) {

    const isAfterFinish = date.isSameOrAfter(moment(date).resetDate(endOfWork));
    const isBeforeStart = date.isBefore(moment(date).resetDate());
    const isFriday = date.day() === 5;
    const isSaturday = date.day() === 6;
    const isSunday = date.day() === 0;


    function addDays(days) {
        return date.add(days, 'days').resetDate()
    }

    if (isFriday && isAfterFinish) {
        return addDays(3)
    }

    if (isSaturday) {
        return addDays(2)
    }

    if (isSunday) {
        return addDays(1)
    }

    if (isAfterFinish) {
        return addDays(1)
    }

    if (isBeforeStart) {
        return addDays(0)
    }

    return date
}

