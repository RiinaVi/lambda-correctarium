import {deadlineCalculator, timeCalculator, priceCalculator} from "./calculators";

describe('Price calculator', () => {
    it('should return 0 if the input string is empty', () => {
        expect(priceCalculator(0, 'Ukrainian')).toBe(0)
    });
    it('should return 50 if language is Ukrainian/Russian and string length is less than 1000', () => {
        expect(priceCalculator(100, 'Russian')).toBe(50)
    });
    it('should return 120 if language is English and string length is less than 1000', () => {
        expect(priceCalculator(200,'English')).toBe(120)
    });
});

describe('Time calculator',()=>{
    it('should return 60 minutes if language is Ukrainian/Russian and string length is less than 1333', function () {
        expect(timeCalculator(1000, 'Russian')).toBe(60)
    });
    it('should return 60 minutes if language is English and string length is less than 333', function () {
        expect(timeCalculator(300, 'English')).toBe(60)
    });
});

describe('Deadline calculator', ()=>{
    it('should return formatted deadline date', function () {
        expect(deadlineCalculator(60, 'March 13, 2020 13:00:00')).toBe('13/03/2020 14:00')
    });
});
