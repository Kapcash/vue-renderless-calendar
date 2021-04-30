import { VIEW_MODE_DOUBLE, VIEW_MODE_SINGLE, VIEW_MODE_CUSTOM } from './constants';
import { getMonthDateSafely } from './renderless-date.service';

const initializers = {
  [VIEW_MODE_SINGLE]: initializeSingleViewMode,
  [VIEW_MODE_DOUBLE]: initializeDoubleViewMode,
  [VIEW_MODE_CUSTOM]: initializeCustomViewMode
};

export function viewModeInitializer(viewMode, numberOfMonths, optionalStartDate) {
  return initializers[viewMode](numberOfMonths, optionalStartDate);
}


function initializeSingleViewMode(_numberOfMonths, optionalStartDate) {
  const startDate = optionalStartDate || new Date();
  const year = startDate.getFullYear();
  const month = startDate.getMonth();

  return [{ year, month }];
}


function initializeDoubleViewMode(_numberOfMonths, optionalStartDate) {
  const startDate = optionalStartDate || new Date();
  const currentYear = startDate.getFullYear();
  const currentMonth = startDate.getMonth();

  const nextMonthDate = getMonthDateSafely(startDate.getFullYear(), startDate.getMonth() + 1);
  const nextMonthYear = nextMonthDate.getFullYear();
  const nextMonthNumber = nextMonthDate.getMonth();

  return [
    { year: currentYear, month: currentMonth },
    { year: nextMonthYear, month: nextMonthNumber }
  ];
}

function initializeCustomViewMode(numberOfMonths, optionalStartDate) {
  const startDate = optionalStartDate || new Date();

  const pageState = [];
  const endMonth = startDate.getMonth() + numberOfMonths;

  for (let month = startDate.getMonth(); month < endMonth; month++) {
    const date = getMonthDateSafely(startDate.getFullYear(), month);

    pageState.push({
      year: date.getFullYear(),
      month: date.getMonth()
    });
  }

  return pageState;
}

const viewNavigators = {
  [VIEW_MODE_SINGLE]: {
    prevPage: () => {},
    nextPage: () => {}
  },
  [VIEW_MODE_DOUBLE]: {
    prevPage: () => {},
    nextPage: () => {}
  }
};

export function getViewNavigator(viewMode) {
  return viewNavigators[viewMode];
}




