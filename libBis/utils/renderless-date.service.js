import { MILLISECONDS_IN_DAY, SATURDAY, SUNDAY } from './constants';

export function fromFormatted(formatted) {
  return new Date(...formatted.split('-'));
}

export function isBetween(date, datesRange) {
  const [left, right] = datesRange;
  return isGreaterThan(date, left) && isLessThan(date, right);
}


export function isSelected(date, selectedDates) {
  return selectedDates.some(selectedDate => isDateEqual(selectedDate, date));
}


export function isDisabled(date, disabledDates) {
  return disabledDates.indexOf(date) !== -1;
}


export function isToday(date) {
  const today = new Date();

  return today.getDate() === date.getDate()
    && today.getMonth() === date.getMonth()
    && today.getFullYear() === date.getFullYear();
}


export function isWeekend(date) {
  const day = date.getDay();
  return day === SUNDAY || day === SATURDAY;
}

export function isPrevDate(date, referenceDate) {
  return isOneDayAfter(referenceDate, date);
}

export function isNextDate(date, referenceDate) {
  return isOneDayAfter(date, referenceDate);
}

export function isOneDayAfter(date, referenceDate) {
  const date1 = date.getTime();
  const date2 = referenceDate.getTime();

  return date1 - date2 === MILLISECONDS_IN_DAY;
}

export function isLessThan(date, referenceDate) {
  return ((date && date.getTime()) || 0) < ((referenceDate && referenceDate.getTime()) || 0);
}

export function isGreaterThan(date, referenceDate) {
  return ((date && date.getTime()) || 0) > ((referenceDate && referenceDate.getTime()) || 0);
}

export function isDateEqual(date, referenceDate) {
  return ((date && date.getTime()) || 0) === ((referenceDate && referenceDate.getTime()) || 0);
}

export function isSameMonth(month1, month2) {
  return month1 === month2;
}

export function isMarked(date, markedDates) {
  return markedDates.indexOf(date) !== -1;
}

export function getMonthDateSafely(year, month) {
  return new Date(year, month);
}

export function isRestricted(date, {
  disabledDates = [],
  maxDate = '',
  minDate = ''
}) {
  return (minDate && isLessThan(date, minDate))
    || (maxDate && isGreaterThan(date, maxDate))
    || isDisabled(date, disabledDates);
}
