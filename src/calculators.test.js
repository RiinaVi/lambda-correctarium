import {calculateDeadline, calculateTime, calculatePrice} from "./calculators";
import moment from "moment";

describe('Price calculator', () => {
    it.each
        ` textLength |   language   | result
             ${0}    |${'Russian'}  | ${0}
             ${0}    |${'English'}  | ${0}
             ${0}    |${'Ukrainian'}| ${0}
             ${100}  |${'Russian'}  | ${50}
             ${200}  |${'Ukrainian'}| ${50}
             ${300}  |${'English'}  | ${120}
            ${2000}  |${'Russian'}  | ${100}
            ${4000}  |${'Ukrainian'}  | ${200}
            ${6000}  |${'English'}  | ${720}
    `('returns $result UAH if text length - $textLength and language - $language',
        ({textLength, language, result}) => {
        expect(calculatePrice(textLength, language)).toBe(result);
    });
});

describe('Time calculator', () => {
    it.each
        ` textLength |   language   | result
            ${1000}  |${'Russian'}  | ${60}
            ${300}   |${'English'}  | ${60}
            ${1300}  |${'Ukrainian'}| ${60}
            ${2000}  |${'Russian'}  | ${121}
            ${1333}  |${'Ukrainian'}| ${60}
            ${1334}  |${'Ukrainian'}| ${91}
            ${4000}  |${'English'}  | ${751}
    `('returns $result minutes if text length - $textLength and language - $language',
        ({textLength, language, result}) => {
            expect(calculateTime(textLength, language)).toBe(result);
        });

});

describe('Deadline calculator', () => {

    it.each
    `        orderDate               |  timeForWork  |          result
    ${'23/09/2019, 10:00 Monday'}    | ${5}          | ${'23/09/2019, 15:00 Monday'}
    ${'23/09/2019, 18:00 Monday'}    | ${7}          | ${'24/09/2019, 16:00 Tuesday'}
    ${'23/09/2019, 18:00 Monday'}    | ${25}         | ${'26/09/2019, 16:00 Thursday'}
    ${'21/09/2019, 15:00 Saturday'}  | ${7}          | ${'23/09/2019, 17:00 Monday'}
    ${'20/09/2019, 17:00 Friday'}    | ${60}         | ${'01/10/2019, 14:00 Tuesday'}
    ${'21/09/2019, 17:00 Saturday'}  | ${60}         | ${'01/10/2019, 16:00 Tuesday'}
    ${'24/09/2019, 08:00 Tuesday'}   | ${8}          | ${'24/09/2019, 18:00 Tuesday'}
    ${'25/09/2019, 08:00 Wednesday'} | ${8}          | ${'25/09/2019, 18:00 Wednesday'}
    ${'25/09/2019, 18:00 Wednesday'} | ${8}          | ${'26/09/2019, 17:00 Thursday'}
    ${'25/09/2019, 19:00 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
    ${'25/09/2019, 18:45 Wednesday'} | ${8}          | ${'26/09/2019, 17:45 Thursday'}
    ${'25/09/2019, 19:10 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
    ${'27/09/2019, 17:00 Friday'}    | ${8}          | ${'30/09/2019, 16:00 Monday'}
    ${'27/09/2019, 19:00 Friday'}    | ${8}          | ${'30/09/2019, 18:00 Monday'}
    ${'28/09/2019, 10:00 Saturday'}  | ${8}          | ${'30/09/2019, 18:00 Monday'}`
    ('returns $result if order date is - $orderDate and time for work in hours - $timeForWork',
        ({orderDate, timeForWork, result}) => {
                expect(calculateDeadline(timeForWork*60,
                    moment(orderDate, 'DD/MM/YYYY, HH:mm dddd'))).toBe(result)
        })
});
