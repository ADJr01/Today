// utilities.js - Date Utility Functions

export const isOddDate = (date) => {
  return date.getDate() % 2 !== 0;
};

export const isEvenDate = (date) => {
  return date.getDate() % 2 === 0;
};

export const getWeekNumber = (date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfMonth = date.getDate();
  const firstDayWeekDay = firstDayOfMonth.getDay();

  return Math.ceil((dayOfMonth + firstDayWeekDay) / 7);
};

export const getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export const isAm = (date) => {
  return date.getHours() < 12;
};

export const isPm = (date) => {
  return date.getHours() >= 12;
};

export const isLeapYear = (date) => {
  const year = date.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const isWeekday = (date) => {
  const day = date.getDay();
  return day !== 0 && day !== 6;
};

export const getQuarter = (date) => {
  return Math.floor(date.getMonth() / 3) + 1;
};

export const getWeekOfYear = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getDaysInYear = (date) => {
  return isLeapYear(date) ? 366 : 365;
};

export const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

export const isTomorrow = (date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();
};

export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
};

export const isThisWeek = (date) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
};

export const isThisMonth = (date) => {
  const today = new Date();
  return date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

export const isThisYear = (date) => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear();
};

export const isPast = (date) => {
  return date < new Date();
};

export const isFuture = (date) => {
  return date > new Date();
};

export const getOrdinalSuffix = (date) => {
  const day = date.getDate();
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

export const getDayWithOrdinal = (date) => {
  return `${date.getDate()}${getOrdinalSuffix(date)}`;
};

export const getTimezoneOffset = (date) => {
  return -date.getTimezoneOffset();
};

export const getTimezoneOffsetString = (date) => {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const absOffset = Math.abs(offset);
  const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
  const minutes = String(absOffset % 60).padStart(2, '0');
  return `${sign}${hours}:${minutes}`;
};

export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const isSameDay = (date1, date2) => {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
};

export const isSameMonth = (date1, date2) => {
  return date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
};

export const isSameYear = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear();
};

export const getQuarterName = (date) => {
  const quarter = getQuarter(date);
  return `Q${quarter}`;
};

export const getQuarterDates = (date) => {
  const quarter = getQuarter(date);
  const year = date.getFullYear();
  const startMonth = (quarter - 1) * 3;

  return {
    start: new Date(year, startMonth, 1),
    end: new Date(year, startMonth + 3, 0, 23, 59, 59, 999)
  };
};

export const isMidnight = (date) => {
  return date.getHours() === 0 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0 &&
    date.getMilliseconds() === 0;
};

export const isNoon = (date) => {
  return date.getHours() === 12 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0;
};
