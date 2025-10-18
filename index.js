// today.js - Core Module
import { formatDate, formatLong, formatShort, parseFormatString } from './formatter.js';
import { getLastNDays, getLastNWeeks, getLastNMonths, getNDaysAgo, getNWeeksAgo, getNMonthsAgo, getNYearsAgo } from './navigator.js.js';
import { timeDiff, add, subtract, isBefore, isAfter, isSame, isBetween } from './calculator.js';
import {
  isOddDate,
  isEvenDate,
  getWeekNumber,
  getDayOfYear,
  isAm,
  isPm,
  isLeapYear,
  isWeekend,
  isWeekday,
  getQuarter,
  getWeekOfYear,
  getDaysInMonth,
  getDaysInYear
} from './utilities.js';
import {
  toUnixTimestamp,
  toMillisecondsTimestamp,
  fromUnixTimestamp,
  fromMillisecondsTimestamp,
  toISOString,
  toUTCString,
  toLocaleDateString,
  toLocaleTimeString
} from './converters.js';
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfHour,
  endOfHour
} from './boundary.js';

class Today {
  constructor(date = new Date()) {
    this._date = new Date(date);
    if (isNaN(this._date.getTime())) {
      throw new Error('Invalid date provided');
    }
  }

  // Core getters
  get date() {
    return new Date(this._date);
  }

  get year() {
    return this._date.getFullYear();
  }

  get month() {
    return this._date.getMonth() + 1;
  }

  get day() {
    return this._date.getDate();
  }

  get hours() {
    return this._date.getHours();
  }

  get minutes() {
    return this._date.getMinutes();
  }

  get seconds() {
    return this._date.getSeconds();
  }

  get milliseconds() {
    return this._date.getMilliseconds();
  }

  get dayOfWeek() {
    return this._date.getDay();
  }

  get dayName() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[this._date.getDay()];
  }

  get monthName() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return months[this._date.getMonth()];
  }

  // Formatter Interface
  Date() {
    return {
      format: (todayInstance, formatStr) => formatDate(todayInstance._date, formatStr),
      formatLong: (todayInstance) => formatLong(todayInstance._date),
      formatShort: (todayInstance) => formatShort(todayInstance._date)
    };
  }

  // Navigation Methods
  getLastNDays(n) {
    return getLastNDays(this._date, n).map(d => new Today(d));
  }

  getLastNWeeks(n) {
    return getLastNWeeks(this._date, n).map(d => new Today(d));
  }

  getLastNMonths(n) {
    return getLastNMonths(this._date, n).map(d => new Today(d));
  }

  getNDaysAgo(n) {
    return new Today(getNDaysAgo(this._date, n));
  }

  getNWeeksAgo(n) {
    return new Today(getNWeeksAgo(this._date, n));
  }

  getNMonthsAgo(n) {
    return new Today(getNMonthsAgo(this._date, n));
  }

  getNYearsAgo(n) {
    return new Today(getNYearsAgo(this._date, n));
  }

  // Calculator Methods
  timeDiff(otherDate) {
    return timeDiff(this._date, otherDate);
  }

  add(amount, unit) {
    return new Today(add(this._date, amount, unit));
  }

  subtract(amount, unit) {
    return new Today(subtract(this._date, amount, unit));
  }

  isBefore(otherDate) {
    return isBefore(this._date, otherDate);
  }

  isAfter(otherDate) {
    return isAfter(this._date, otherDate);
  }

  isSame(otherDate, unit = 'day') {
    return isSame(this._date, otherDate, unit);
  }

  isBetween(startDate, endDate, inclusive = true) {
    return isBetween(this._date, startDate, endDate, inclusive);
  }

  // Utility Methods
  isOddDate() {
    return isOddDate(this._date);
  }

  isEvenDate() {
    return isEvenDate(this._date);
  }

  getWeekNumber() {
    return getWeekNumber(this._date);
  }

  getDayOfYear() {
    return getDayOfYear(this._date);
  }

  isAm() {
    return isAm(this._date);
  }

  isPm() {
    return isPm(this._date);
  }

  isLeapYear() {
    return isLeapYear(this._date);
  }

  isWeekend() {
    return isWeekend(this._date);
  }

  isWeekday() {
    return isWeekday(this._date);
  }

  getQuarter() {
    return getQuarter(this._date);
  }

  getWeekOfYear() {
    return getWeekOfYear(this._date);
  }

  getDaysInMonth() {
    return getDaysInMonth(this._date);
  }

  getDaysInYear() {
    return getDaysInYear(this._date);
  }

  // Converter Methods
  toUnixTimestamp() {
    return toUnixTimestamp(this._date);
  }

  toMillisecondsTimestamp() {
    return toMillisecondsTimestamp(this._date);
  }

  toISOString() {
    return toISOString(this._date);
  }

  toUTCString() {
    return toUTCString(this._date);
  }

  toLocaleDateString(locale = 'en-US', options = {}) {
    return toLocaleDateString(this._date, locale, options);
  }

  toLocaleTimeString(locale = 'en-US', options = {}) {
    return toLocaleTimeString(this._date, locale, options);
  }

  // Boundary Methods
  startOfDay() {
    return new Today(startOfDay(this._date));
  }

  endOfDay() {
    return new Today(endOfDay(this._date));
  }

  startOfWeek(startDay = 0) {
    return new Today(startOfWeek(this._date, startDay));
  }

  endOfWeek(startDay = 0) {
    return new Today(endOfWeek(this._date, startDay));
  }

  startOfMonth() {
    return new Today(startOfMonth(this._date));
  }

  endOfMonth() {
    return new Today(endOfMonth(this._date));
  }

  startOfYear() {
    return new Today(startOfYear(this._date));
  }

  endOfYear() {
    return new Today(endOfYear(this._date));
  }

  startOfHour() {
    return new Today(startOfHour(this._date));
  }

  endOfHour() {
    return new Today(endOfHour(this._date));
  }

  // Format and Time Methods
  format(formatStr) {
    return formatDate(this._date, formatStr);
  }

  getTime(formatStr = 'HH:MM:SS') {
    return formatDate(this._date, formatStr);
  }

  setTime(date) {
    if (date) {
      const d = new Date(date);
      this._date.setHours(d.getHours());
      this._date.setMinutes(d.getMinutes());
      this._date.setSeconds(d.getSeconds());
      this._date.setMilliseconds(d.getMilliseconds());
    } else {
      this._date.setHours(0, 0, 0, 0);
    }
    return this;
  }

  // Clone
  clone() {
    return new Today(this._date);
  }

  // Static Methods
  static now() {
    return new Today();
  }

  static fromUnixTimestamp(timestamp) {
    return new Today(fromUnixTimestamp(timestamp));
  }

  static fromMillisecondsTimestamp(timestamp) {
    return new Today(fromMillisecondsTimestamp(timestamp));
  }

  static parse(dateString) {
    return new Today(new Date(dateString));
  }

  static isValid(date) {
    return date instanceof Date && !isNaN(date.getTime());
  }
}

export default Today;
