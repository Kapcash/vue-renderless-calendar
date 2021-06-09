import { isBetween } from '../utils/renderless-date.service';

export default class CalendarDate extends Date {
  constructor(...args) {
    super(...args);

    this.isOtherMonth = false;
  }

  get isToday() {
    return this.getTime() === Date.now();
  }

  get isWeekend() {
    return this.getDay() >= 5;
  }

  isWithin(dates) {
    return dates.some(date => date.getTime() === this.getTime());
  }

  isBetween({
    currentHoveredDate,
    captureThirdDate,
    selectedDates
  }) {
    if (selectedDates.length === 0) {
      return false;
    }
  
    const [left, right] = selectedDates;
  
    if (!right && currentHoveredDate) {
      return isBetween(this, [left, currentHoveredDate])
        || isBetween(this, [currentHoveredDate, left]);
    }
  
    if (captureThirdDate && currentHoveredDate) {
      return isBetween(this, [left, currentHoveredDate])
        || isBetween(this, [currentHoveredDate, right]);
    }
  
    return isBetween(this, [left, right]);
  }
}
