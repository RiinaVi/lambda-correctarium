import {deadlineCalculator, timeCalculator, priceCalculator} from "./calculators";

describe('Price calculator', () => {
    it('should return 0 if the input string is empty', () => {
        expect(priceCalculator(0, 'Ukrainian')).toBe(0)
    });
    it('should return 50 if language is Ukrainian/Russian and string length is less than 1000', () => {
        expect(priceCalculator(100, 'Russian')).toBe(50);
        expect(priceCalculator(100, 'Ukrainian')).toBe(50)
    });
    it('should return 120 if language is English and string length is less than 1000', () => {
        expect(priceCalculator(200, 'English')).toBe(120)
    });
    it('should return valid price if there are more than 1000 characters', () => {
        expect(priceCalculator(2000, 'Russian')).toBe(100);
        expect(priceCalculator(4000, 'Ukrainian')).toBe(200);
        expect(priceCalculator(6000, 'English')).toBe(720);
    });
});

describe('Time calculator', () => {
    it('should return 60 minutes if language is Ukrainian/Russian and string length is less than 1333', () => {
        expect(timeCalculator(1000, 'Russian')).toBe(60);
        expect(timeCalculator(1000, 'Ukrainian')).toBe(60)
    });
    it('should return 60 minutes if language is English and string length is less than 333', () => {
        expect(timeCalculator(300, 'English')).toBe(60)
    });
    it('should return valid working time', () => {
        expect(timeCalculator(2000, 'Russian')).toBe(121);
        expect(timeCalculator(4000, 'English')).toBe(751);
    });
});

describe('Deadline calculator', () => {
    it('should return formatted deadline date',  () => {
        expect(deadlineCalculator(60, new Date('March 13, 2020 13:00'))).toBe('13/03/2020 14:00')
    });
    it('should return valid deadline counting weekends',  () => {
        expect(deadlineCalculator(120, new Date('March 13, 2020 18:00'))).toBe('16/03/2020 11:00');
        expect(deadlineCalculator(240, new Date('March 13, 2020 19:00'))).toBe('16/03/2020 14:00');
        expect(deadlineCalculator(90, new Date('March 14, 2020 19:00'))).toBe('16/03/2020 11:30');
        expect(deadlineCalculator(540, new Date('March 15, 2020 19:00'))).toBe('16/03/2020 19:00');
        expect(deadlineCalculator(1740, new Date('March 11, 2020 18:30'))).toBe('17/03/2020 11:30');
    });
});
