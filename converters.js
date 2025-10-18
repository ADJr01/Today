// converters.js - Date Conversion Module

export const toUnixTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};

export const toMillisecondsTimestamp = (date) => {
  return date.getTime();
};

export const fromUnixTimestamp = (timestamp) => {
  return new Date(timestamp * 1000);
};

export const fromMillisecondsTimestamp = (timestamp) => {
  return new Date(timestamp);
};

export const toISOString = (date) => {
  return date.toISOString();
};

export const toUTCString = (date) => {
  return date.toUTCString();
};

export const toLocaleDateString = (date, locale = 'en-US', options = {}) => {
  return date.toLocaleDateString(locale, options);
};

export const toLocaleTimeString = (date, locale = 'en-US', options = {}) => {
  return date.toLocaleTimeString(locale, options);
};

export const toLocaleString = (date, locale = 'en-US', options = {}) => {
  return date.toLocaleString(locale, options);
};

export const toJSON = (date) => {
  return date.toJSON();
};

export const toString = (date) => {
  return date.toString();
};

export const toDateString = (date) => {
  return date.toDateString();
};

export const toTimeString = (date) => {
  return date.toTimeString();
};

export const toObject = (date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
    dayOfWeek: date.getDay(),
    timestamp: date.getTime(),
    unixTimestamp: Math.floor(date.getTime() / 1000),
    timezoneOffset: date.getTimezoneOffset()
  };
};

export const fromObject = (obj) => {
  return new Date(
    obj.year || 1970,
    (obj.month || 1) - 1,
    obj.day || 1,
    obj.hours || 0,
    obj.minutes || 0,
    obj.seconds || 0,
    obj.milliseconds || 0
  );
};

export const toArray = (date) => {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ];
};

export const fromArray = (arr) => {
  return new Date(
    arr[0] || 1970,
    (arr[1] || 1) - 1,
    arr[2] || 1,
    arr[3] || 0,
    arr[4] || 0,
    arr[5] || 0,
    arr[6] || 0
  );
};

export const toUTC = (date) => {
  return new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ));
};

export const fromUTC = (date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds()
  );
};

export const toSQLDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const toSQLDateTime = (date) => {
  const datePart = toSQLDate(date);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${datePart} ${hours}:${minutes}:${seconds}`;
};

export const toSQLTimestamp = (date) => {
  return toSQLDateTime(date);
};

export const fromSQLDate = (sqlDate) => {
  const [year, month, day] = sqlDate.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const fromSQLDateTime = (sqlDateTime) => {
  const [datePart, timePart] = sqlDateTime.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

export const toExcelDate = (date) => {
  const epoch = new Date(1899, 11, 30);
  const msPerDay = 86400000;
  return (date - epoch) / msPerDay;
};

export const fromExcelDate = (excelDate) => {
  const epoch = new Date(1899, 11, 30);
  const msPerDay = 86400000;
  return new Date(epoch.getTime() + excelDate * msPerDay);
};

export const toRFC2822 = (date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const day = days[date.getDay()];
  const dateNum = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const absOffset = Math.abs(offset);
  const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, '0');
  const offsetMinutes = String(absOffset % 60).padStart(2, '0');

  return `${day}, ${dateNum} ${month} ${year} ${hours}:${minutes}:${seconds} ${sign}${offsetHours}${offsetMinutes}`;
};
