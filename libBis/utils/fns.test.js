/* eslint-disable no-undef */
import { subMonths, addMonths } from 'date-fns';
import { expandFullWeek, generateDates } from './fns';

describe('fns', () => {
  describe('generate dates', () => {
    it('should generate 3 months from 6th month', () => {
      const startDate = new Date(2021, 6);
      const nbMonths = 3;
      let monthsDates = generateDates(startDate, nbMonths);
  
      expect(monthsDates).toHaveLength(nbMonths);
  
      expect(monthsDates[0].monthIndex).toEqual(6);
      expect(monthsDates[0].year).toEqual(2021);
      expect(monthsDates[0].dates).toHaveLength(31);
  
      expect(monthsDates[1].monthIndex).toEqual(7);
      expect(monthsDates[1].year).toEqual(2021);
      expect(monthsDates[1].dates).toHaveLength(31);
  
      expect(monthsDates[2].monthIndex).toEqual(8);
      expect(monthsDates[2].year).toEqual(2021);
      expect(monthsDates[2].dates).toHaveLength(30);
    });
  
    it('should generate 3 months from last month of year', () => {
      const startDate = new Date(2021, 11);
      const nbMonths = 3;
      let monthsDates = generateDates(startDate, nbMonths);
  
      expect(monthsDates).toHaveLength(nbMonths);
  
      expect(monthsDates[0].monthIndex).toEqual(11);
      expect(monthsDates[0].year).toEqual(2021);
      expect(monthsDates[0].dates).toHaveLength(31);
  
      expect(monthsDates[1].monthIndex).toEqual(0);
      expect(monthsDates[1].year).toEqual(2022);
      expect(monthsDates[1].dates).toHaveLength(31);
  
      expect(monthsDates[2].monthIndex).toEqual(1);
      expect(monthsDates[2].year).toEqual(2022);
      expect(monthsDates[2].dates).toHaveLength(28);
    });
  
    it('should generate 1 months from first month', () => {
      const startDate = new Date(2021, 0);
      const nbMonths = 1;
  
      let monthsDates = generateDates(startDate, nbMonths);
  
      expect(monthsDates).toHaveLength(nbMonths);
  
      expect(monthsDates[0].monthIndex).toEqual(0);
      expect(monthsDates[0].year).toEqual(2021);
      expect(monthsDates[0].dates).toHaveLength(31);
    });
  
    it('should generate 1 months from middle of year', () => {
      const startDate = new Date(2021, 5);
      const nbMonths = 1;
  
      let monthsDates = generateDates(startDate, nbMonths);
  
      expect(monthsDates).toHaveLength(nbMonths);
  
      expect(monthsDates[0].monthIndex).toEqual(5);
      expect(monthsDates[0].year).toEqual(2021);
      expect(monthsDates[0].dates).toHaveLength(30);
    });
  });
  describe('expand full weeks', () => {
    function expectFullWeeks(generatedMonth) {
      const currentMonth = generatedMonth.monthIndex;
      const { dates } = generatedMonth;
      
      const firstDate = dates[0];
      const prevMonthYear = subMonths(firstDate, 1).getFullYear();
      const lastDate = dates[dates.length - 1];
      const nextMonthYear = addMonths(lastDate, 1).getFullYear();
      const nbBefore = firstDate.getDay();
      const nbAfter = 6 - lastDate.getDay();

      expandFullWeek(generatedMonth);

      const beforeDates = dates.slice(0, nbBefore);
      const afterDates = nbAfter > 0 ? dates.slice(-nbAfter) : [];

      const lastDayOfBeforeMonth = beforeDates[beforeDates.length - 1]?.getDate();
      const expectedLastDays = Array(nbBefore).fill(0).map((_, index) => lastDayOfBeforeMonth - index);
      const firstDayOfAfterMonth = afterDates[0]?.getDate();
      const expectedFirstDays = Array(nbAfter).fill(0).map((_, index) => firstDayOfAfterMonth + index);

      expect(beforeDates.map(date => date.getFullYear())).toEqual(Array(nbBefore).fill(prevMonthYear));
      expect(beforeDates.map(date => date.getMonth())).toEqual(Array(nbBefore).fill((currentMonth - 1 + 12) % 12));
      expect(beforeDates.map(date => date.getDate())).toEqual(expectedLastDays.reverse());

      expect(afterDates.map(date => date.getFullYear())).toEqual(Array(nbAfter).fill(nextMonthYear));
      expect(afterDates.map(date => date.getMonth())).toEqual(Array(nbAfter).fill((currentMonth + 1) % 12));
      expect(afterDates.map(date => date.getDate())).toEqual(expectedFirstDays);
    }

    it('should add other months days to complete weeks', () => {
      const startDate = new Date(2021, 4);
      let monthsDates = generateDates(startDate, 1);

      expectFullWeeks(monthsDates[0]);
    });

    it('should add other months days to complete weeks on several months', () => {
      const startDate = new Date(2021, 4);
      let monthsDates = generateDates(startDate, 4);

      monthsDates.forEach(expectFullWeeks);
    });

    it('should add other months days to complete weeks on several months across two years', () => {
      const startDate = new Date(2021, 11);
      let monthsDates = generateDates(startDate, 3);

      monthsDates.forEach(expectFullWeeks);
    });
  });
});
