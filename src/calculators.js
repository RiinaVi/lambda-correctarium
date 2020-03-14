import zeropad from 'zeropad';

export function formatDate(date) {
    let properDate = new Date(date);
    return zeropad(properDate.getDate()) + '/'
        + zeropad(properDate.getMonth() + 1) + '/'
        + properDate.getFullYear() +' '
        + zeropad(properDate.getHours()) +':'+ zeropad(properDate.getMinutes());
}
export const languages = [
    'Russian', 'English', 'Ukrainian'
];

const allPricesForSymbol = {
    russian: 0.05,
    ukrainian: 0.05,
    english: 0.12
};

const allSymbolsPerHour = {
    russian: 1333,
    ukrainian: 1333,
    english: 333
};

export function priceCalculator(textLength, lang) {
    if(!textLength) return 0;
    let priceForOneSymbol = allPricesForSymbol[lang.toLowerCase()];
    let minimumPrice = priceForOneSymbol * 1000;
    let price = priceForOneSymbol * textLength;
    return price >= minimumPrice ? price : minimumPrice;
}

export function timeCalculator(textLength, lang) {
    let minimumTime = 60;
    let symbolsPerHour = allSymbolsPerHour[lang.toLowerCase()];
    if (textLength<=symbolsPerHour) return minimumTime;

    let symbolPerMinute = Math.round(symbolsPerHour/60);
    let time = 30 + Math.round(textLength/symbolPerMinute);
    console.log(time);
    return time;
}

export function deadlineCalculator(timeForWork, orderTime='') {
    let deadline = orderTime ? new Date(orderTime) : new Date();
    deadline.setMinutes(deadline.getMinutes()+timeForWork);
    return formatDate(deadline);
}


// priceCalculator(process.argv[2].length, urk)
// timeCalculator(133, languages[1]);
// module.exports = {priceCalculator, deadlineCalculator, timeCalculator};
