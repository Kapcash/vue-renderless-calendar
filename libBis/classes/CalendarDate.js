import {
  isWeekend
} from 'date-fns';
import { isBetween } from '../utils/renderless-date.service';

export default class CalendarDate {
  isSelected = false

  isOtherMonth = false

  constructor(...args) {
    this._date = new Date(...args);
    this.weekday = this._date.getDay();
    this.day = this._date.getDate();
    this.month = this._date.getMonth();
    this.year = this._date.getFullYear();
  }

  get isToday() {
    return this._date.getTime() === Date.now();
  }

  get isWeekend() {
    return isWeekend(this._date);
  }

  get realMonth() {
    return this.month + 1;
  }

  isWithin(dates) {
    return dates.some(date => date.getTime() === this._date.getTime());
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
      return isBetween(this._date, [left, currentHoveredDate])
        || isBetween(this._date, [currentHoveredDate, left]);
    }
  
    if (captureThirdDate && currentHoveredDate) {
      return isBetween(this._date, [left, currentHoveredDate])
        || isBetween(this._date, [currentHoveredDate, right]);
    }
  
    return isBetween(this._date, [left, right]);
  }
}
