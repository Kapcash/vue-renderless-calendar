import Vue from 'vue';
import { addMonths, subMonths } from 'date-fns';
import CalendarDate from './classes/CalendarDate';
import { generateFullWeekDates, getWeekdayNames } from './utils/fns';

export default {
  name: 'RenderlessCalendarBis',
  props: {
    value: {
      type: [Object, Array],
      required: false,
      default: null
    },
    startDate: {
      type: [Date, String],
      default: () => new Date()
    },
    range: {
      type: Boolean,
      default: false
    },
    numberOfMonths: {
      type: Number,
      default: 1
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    minDate: {
      type: Date,
      default: null
    },
    maxDate: {
      type: Date,
      default: null
    },
    disabledDates: {
      type: Array,
      default: () => []
    },
    markedDates: {
      type: Array,
      default: () => []
    }
    // preventOutOfRange: {
    //   default: true,
    //   type: Boolean
    // },
    // captureThirdDate: {
    //   type: Boolean,
    //   default: false
    // },
    // dateSelectStrategy: {
    //   type: Function,
    //   default: null
    // },
    // captureHover: {
    //   type: Boolean,
    //   default: true
    // },
    // firstDayOfWeek: {
    //   type: Number,
    //   default: 1
    // }
  },

  data() {
    return {
      months: null,
      currentDate: null,
      currentMonthIndex: 0,
      selectedDates: [],
      startMonth: null,
      startYear: null,
      viewState: []
    };
  },

  created() {
    this.selectedDates = [this.value].flat().filter(Boolean);
    this.currentDate = new CalendarDate(this.startDate || new Date());

    this.months = generateFullWeekDates(this.currentDate, this.numberOfMonths || 1);
  },

  computed: {
    displayedMonths() {
      return this.months.slice(this.currentMonthIndex, this.currentMonthIndex + this.numberOfMonths);
    },
    // /**
    //  * @return {LocaleStrings}
    //  */
    // localeStrings() {
    //   return typeof this.locale === 'string'
    //     ? getCalendarStringsForLocale(this.locale, this.firstDayOfWeek)
    //     : this.locale;
    // },
    weekDayNames() {
      return getWeekdayNames(this.firstDayOfWeek);
    }
    // monthNames() {
    //   return this.localeStrings.months
    //     .map(({ short, full }, id) => ({ short, full, id }));
    // },
    // monthsList() {
    //   return getMonthsList({
    //     startMonth: this.startMonth,
    //     startYear: this.startYear,
    //     monthNames: this.monthNames,
    //     viewState: this.viewState
    //   });
    // }
    // canGoToPrevMonth() {
    //   const [{ month, year }] = this.viewState;

    //   return !shouldPreventMonthChange({
    //     minDate: this.minDate,
    //     maxDate: this.maxDate,
    //     startMonth: month,
    //     startYear: year,
    //     step: -1
    //   });
    // },
    // canGoToNextMonth() {
    //   const { month, year } = this.viewState[this.viewState.length - 1];

    //   return !shouldPreventMonthChange({
    //     minDate: this.minDate,
    //     maxDate: this.maxDate,
    //     startMonth: month,
    //     startYear: year,
    //     step: 1
    //   });
    // }
  },

  methods: {
    onDateSelect(date) {
      this.setDates([date]);
    },
    onDateMouseOver(date) {
      this.currentHoveredDate = date;
    },
    onDateMouseOut() {
      this.currentHoveredDate = null;
    },
    setDates(dates) {
      this.selectedDates.forEach(date => {
        date.isSelected = false;
      });
      dates.forEach(date => {
        date.isSelected = true;
      });
      this.selectedDates = dates;
      this.$emit('input', dates.length === 1 ? dates[0] : dates);
      this.$emit('onDateChange', dates);
    },
    prevMonth() {
      this.currentMonthIndex -= 1;
      this.currentDate = new CalendarDate(subMonths(this.currentDate._date, 1));
      
      if (this.currentMonthIndex < 0) {
        this.currentMonthIndex = 0;
        this.months.unshift(generateFullWeekDates(this.currentDate, 1)[0]);
      }
    },
    nextMonth() {
      this.currentMonthIndex += 1;
      this.currentDate = new CalendarDate(addMonths(this.currentDate._date, 1));
      
      if (this.currentMonthIndex >= this.months.length) {
        this.months.push(generateFullWeekDates(this.currentDate, 1)[0]);
      }
    }
    // resetDates(index) {
    //   this.setDates(resetDate(this.selectedDates, index));
    // },
    // prevPage(jumpToMonthIndex) {
    //   const { viewState, viewMode, customNumberOfMonths } = this;
    //   const [date] = viewState;
    //   let { year, month } = date;
    //   let newViewState = [];

    //   if (jumpToMonthIndex === true) {
    //     month = jumpToMonthIndex + 1;
    //   }

    //   if (this.shouldPreventMonthChange(year, month, -1) || month < 0) {
    //     return;
    //   }

    //   const prevMonthDate = getMonthDateSafely(year, month - 1);

    //   const calendar = generateCalendarViewData({
    //     numberOfMonths: customNumberOfMonths,
    //     year: prevMonthDate.getFullYear(),
    //     month: prevMonthDate.getMonth(),
    //     viewMode,
    //     firstDayOfWeek: this.firstDayOfWeek
    //   });

    //   if (viewMode === VIEW_MODE_SINGLE) {
    //     newViewState = [{
    //       year: prevMonthDate.getFullYear(),
    //       month: prevMonthDate.getMonth()
    //     }];
    //   } else if (viewMode === VIEW_MODE_DOUBLE) {
    //     const first = viewState[0];

    //     newViewState = [{
    //       year: prevMonthDate.getFullYear(),
    //       month: prevMonthDate.getMonth()
    //     }, first];
    //   }

    //   this.calendar = calendar;
    //   this.viewState = newViewState;
    // },
    // nextPage(jumpToMonthIndex) {
    //   const { viewMode, viewState, customNumberOfMonths } = this;
    //   let newViewState = [];
    //   let { year, month } = viewMode === VIEW_MODE_SINGLE
    //     ? viewState[0]
    //     : viewState[1];

    //   if (jumpToMonthIndex === true) {
    //     month = jumpToMonthIndex - 1;
    //   }
        
    //   if (this.shouldPreventMonthChange(year, month, 1) || month < 0) {
    //     return;
    //   }

    //   if (viewMode === VIEW_MODE_DOUBLE) {
    //     const first = viewState[0];
    //     year = first.year;
    //     month = first.month;
    //   }

    //   const nextMonthDate = getMonthDateSafely(year, month + 1);

    //   const calendar = generateCalendarViewData({
    //     numberOfMonths: customNumberOfMonths,
    //     year: nextMonthDate.getFullYear(),
    //     month: nextMonthDate.getMonth(),
    //     viewMode,
    //     firstDayOfWeek: this.firstDayOfWeek
    //   });

    //   if (viewMode === VIEW_MODE_SINGLE) {
    //     newViewState = [{
    //       year: nextMonthDate.getFullYear(),
    //       month: nextMonthDate.getMonth()
    //     }];
    //   } else if (viewMode === VIEW_MODE_DOUBLE) {
    //     const second = viewState[1];
    //     const nextMonthDate = getMonthDateSafely(year, month + 2);

    //     newViewState = [second, {
    //       year: nextMonthDate.getFullYear(),
    //       month: nextMonthDate.getMonth()
    //     }];
    //   }

    //   this.calendar = calendar;
    //   this.viewState = newViewState;
    // },
    // shouldPreventMonthChange(year, month, step) {
    //   return this.preventOutOfRange && shouldPreventMonthChange({
    //     startMonth: month,
    //     startYear: year,
    //     minDate: this.minDate,
    //     maxDate: this.maxDate,
    //     step
    //   });
    // },
    //   setMonth(monthListItem) {
    //     const { month, year } = monthListItem;
    //     const { viewMode, customNumberOfMonths } = this;
        
    //     let newViewState = viewModeInitializer(this.viewMode, this.customNumberOfMonths, new CalendarDate(year, month + 1));

  //     this.calendar = generateCalendarViewData({
  //       numberOfMonths: customNumberOfMonths,
  //       viewMode,
  //       month,
  //       year,
  //       firstDayOfWeek: this.firstDayOfWeek
  //     });
  //     this.viewState = newViewState;
  //   },
  //   isBetween(date) {
  //     return this.captureHover && this.mode !== MODE_SINGLE && date.isBetween({
  //       currentHoveredDate: this.currentHoveredDate,
  //       captureThirdDate: this.captureThirdDate,
  //       selectedDates: this.selectedDates
  //     });
  //   },
  //   isSelected(date) {
  //     const isSelectingRange = this.currentHoveredDate && this.mode === MODE_RANGE && this.selectedDates.length === 1;
  //     return date.isWithin(this.selectedDates)
  //       || (isSelectingRange && date.getTime() === this.currentHoveredDate.getTime());
  //   },
  //   isDisabled(date) {
  //     return isRestricted(date, {
  //       disabledDates: this.disabledDates,
  //       maxDate: this.maxDate,
  //       minDate: this.minDate
  //     });
  //   },
  //   isOneDayAfter(date) {
  //     return this.selectedDates
  //       .some(selectedDate => isNextDate(date, selectedDate));
  //   },
  //   isOneDayBefore(date) {
  //     return this.selectedDates
  //       .some(selectedDate => isPrevDate(date, selectedDate));
  //   },
  //   isOneDayBeforeFirst(date) {
  //     const first = this.selectedDates[0];
  //     return first && isPrevDate(date, first);
  //   },
  //   isOneDayAfterFirst(date) {
  //     const first = this.selectedDates[0];
  //     return first && isNextDate(date, first);
  //   },
  //   isOneDayBeforeLast(date) {
  //     const last = this.selectedDates[1];
  //     return last && isPrevDate(date, last);
  //   },
  //   isOneDayAfterLast(date) {
  //     const last = this.selectedDates[1];
  //     return last && isNextDate(date, last);
  //   },
  //   isFirst(date) {
  //     const first = this.selectedDates[0];
  //     return first && isDateEqual(date, first);
  //   },
  //   isLast(date) {
  //     const last = this.selectedDates[1];
  //     return last && isDateEqual(date, last);
  //   },
  //   isMarked(date) {
  //     return isMarked(date, this.markedDates);
  //   },
  //   getModifiers(date) {
  //     return {
  //       isBetween: this.isBetween(date),
  //       isSelected: this.isSelected(date),
  //       isDisabled: this.isDisabled(date),
  //       isOneDayAfter: this.isOneDayAfter(date),
  //       isOneDayBefore: this.isOneDayBefore(date),
  //       isOneDayBeforeFirst: this.isOneDayBeforeFirst(date),
  //       isOneDayAfterFirst: this.isOneDayAfterFirst(date),
  //       isOneDayBeforeLast: this.isOneDayBeforeLast(date),
  //       isOneDayAfterLast: this.isOneDayAfterLast(date),
  //       isFirst: this.isFirst(date),
  //       isLast: this.isLast(date),
  //       isMarked: this.isMarked(date)
  //     };
  //   }
  },

  watch: {
    value(newVal) {
      this.selectedDates = [newVal].flat().filter(Boolean).sort((d1, d2) => d1.getTime() - d2.getTime());
    }
    // mode: {
    //   handler(mode) {
    //     this.dateChangeStrategy = this.dateSelectStrategy || getDateSelectStrategy(mode);
    //   },
    //   immediate: true
    // },
    // firstDayOfWeek(newFirstDoW) {
    //   const [{ month, year }] = this.viewState;
    //   this.calendar = Object.freeze(generateCalendarViewData({
    //     numberOfMonths: this.customNumberOfMonths,
    //     viewMode: this.viewMode,
    //     firstDayOfWeek: newFirstDoW,
    //     month,
    //     year
    //   }));
    // }
  },

  render() {
    return this.$scopedSlots.default({
      weekDayNames: this.weekDayNames,
      monthNames: this.monthNames,
      monthsList: this.monthsList,
      datesByMonths: this.displayedMonths,

      calendar: this.calendar,
      selectedDates: this.selectedDates,
      startMonth: this.startMonth,
      startYear: this.startYear,

      prevMonth: this.prevMonth,
      nextMonth: this.nextMonth,

      canGoToPrevMonth: this.canGoToPrevMonth,
      canGoToNextMonth: this.canGoToNextMonth,

      prevPage: this.prevPage,
      nextPage: this.nextPage,
      resetDates: this.resetDates,
      setMonth: this.setMonth,
      onDateSelect: this.onDateSelect,

      dateListeners: {
        mouseout: this.onDateMouseOut,
        mouseover: this.onDateMouseOver,
        click: this.onDateSelect
      },
      dateAttrs: this.getModifiers
    });
  }
};
