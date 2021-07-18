import { lastDayOfMonth, isEqual } from 'date-fns';

export function generateDates(startDate, nbOfMonths) {
  if (nbOfMonths < 1) { return {}; }

  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();

  const lastMonthIndex = startMonth + nbOfMonths - 1;
  const endDate = lastDayOfMonth(new Date(startYear, lastMonthIndex));
  const months = [generateBaseMonth(startYear, startMonth)];

  // Start from startDate and just increase the day until last date generated
  for (let dayIndex = 1; ; dayIndex++) {
    const newDate = new Date(startYear, startMonth, dayIndex);
    const currentMonth = newDate.getMonth();
    const currentYear = newDate.getFullYear();

    let lastMonth = months[months.length - 1];
    
    if (lastMonth.monthIndex !== currentMonth) {
      const newMonth = generateBaseMonth(currentYear, currentMonth);
      lastMonth = newMonth;
      months.push(newMonth);
    }
    
    lastMonth.dates.push(newDate);

    if (isEqual(newDate, endDate)) {
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
  const nbToPreppend = (6 + firstDate.getDay() - firstDayOfWeek) % 6;
  const nbToAppend = (6 + firstDayOfWeek - lastDate.getDay()) % 6;

  const prependedDates = generateDays(firstDate, -nbToPreppend).reverse();
  const appendedDates = generateDays(lastDate, nbToAppend);

  monthDates.dates.unshift(...prependedDates);
  monthDates.dates.push(...appendedDates);
}

function generateDays(startingDate, nbOfDays) {
  const incr = nbOfDays >= 0 ? 1 : -1;
  const days = [];
  for (let i = incr; nbOfDays >= 0 ? i < nbOfDays + 1 : i > nbOfDays - 1; i += incr) {
    const dayOfMonth = startingDate.getDate() + i;
    const newDay = new Date(startingDate.getFullYear(), startingDate.getMonth(), dayOfMonth);
    days.push(newDay);
  }
  return days;
}