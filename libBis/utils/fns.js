import {
  lastDayOfMonth, isEqual, setDay, format, nextDay 
} from 'date-fns';
import CalendarDate from '../classes/CalendarDate';

export function generateFullWeekDates(startDate, nbOfMonths) {
  const dates = generateDates(startDate, nbOfMonths);
  expandFullWeekAllMonths(dates);
  return dates;
}

export function generateDates(startDate, nbOfMonths) {
  if (nbOfMonths < 1) { return {}; }

  const startMonth = startDate.month;
  const startYear = startDate.year;

  const lastMonthIndex = startMonth + nbOfMonths - 1;
  const endDate = lastDayOfMonth(new CalendarDate(startYear, lastMonthIndex)._date);
  const months = [generateBaseMonth(startYear, startMonth)];

  // Start from startDate and just increase the day until last date generated
  for (let dayIndex = 1; ; dayIndex++) {
    const newDate = new CalendarDate(startYear, startMonth, dayIndex);
    const currentMonth = newDate.month;
    const currentYear = newDate.year;

    let lastMonth = months[months.length - 1];
    
    if (lastMonth.monthIndex !== currentMonth) {
      const newMonth = generateBaseMonth(currentYear, currentMonth);
      lastMonth = newMonth;
      months.push(newMonth);
    }
    
    lastMonth.dates.push(newDate);

    if (isEqual(newDate._date, endDate)) {
      break;
    }
  }
  return months;
}

function generateBaseMonth(year, mthIndex) {
  return {
    monthIndex: mthIndex,
    year,
    dates: []
  };
}

export function expandFullWeekAllMonths(monthsDates) {
  monthsDates.forEach(expandFullWeek);
}

export function expandFullWeek(monthDates, firstDayOfWeek) {
  const firstDate = monthDates.dates[0];
  const lastDate = monthDates.dates[monthDates.dates.length - 1];
  const nbToPreppend = (6 + firstDate.weekday - firstDayOfWeek) % 6;
  const nbToAppend = (6 + firstDayOfWeek - lastDate.weekday) % 6;

  const prependedDates = generateDays(firstDate, -nbToPreppend).reverse();
  const appendedDates = generateDays(lastDate, nbToAppend);

  prependedDates.forEach(date => date.isOtherMonth = true);
  appendedDates.forEach(date => date.isOtherMonth = true);

  monthDates.dates.unshift(...prependedDates);
  monthDates.dates.push(...appendedDates);
}

function generateDays(startingDate, nbOfDays) {
  const incr = nbOfDays >= 0 ? 1 : -1;
  const days = [];
  for (let i = incr; nbOfDays >= 0 ? i < nbOfDays + 1 : i > nbOfDays - 1; i += incr) {
    const dayOfMonth = startingDate.weekday + i;
    const newDay = new CalendarDate(startingDate.year, startingDate.month, dayOfMonth);
    days.push(newDay);
  }
  return days;
}

// ======== I18N ======== //

export function getWeekdayNames(firstDayOfWeekIndex = 0) {
  const formatWeekday = date => {
    return {
      long: format(date, 'EEEE'),
      short: format(date, 'E'),
      letter: format(date, 'EEEEE')
    };
  };
  let firstDayOfWeek = setDay(new Date(), firstDayOfWeekIndex);
  const weekdayNames = [formatWeekday(firstDayOfWeek)];

  for (let i = firstDayOfWeekIndex + 1; i < 7 + firstDayOfWeekIndex; i++) {
    firstDayOfWeek = nextDay(firstDayOfWeek, i);
    weekdayNames.push(formatWeekday(firstDayOfWeek));
  }
  return weekdayNames;
}