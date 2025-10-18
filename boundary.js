// boundary.js - Date Boundary Module

export const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const endOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const startOfWeek = (date, startDay = 0) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day < startDay ? 7 : 0) + day - startDay;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const endOfWeek = (date, startDay = 0) => {
  const d = startOfWeek(date, startDay);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const startOfMonth = (date) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const endOfMonth = (date) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1, 0);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const startOfYear = (date) => {
  const d = new Date(date);
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const endOfYear = (date) => {
  const d = new Date(date);
  d.setMonth(11, 31);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const startOfHour = (date) => {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  return d;
};

export const endOfHour = (date) => {
  const d = new Date(date);
  d.setMinutes(59, 59, 999);
  return d;
};

export const startOfMinute = (date) => {
  const d = new Date(date);
  d.setSeconds(0, 0);
  return d;
};

export const endOfMinute = (date) => {
  const d = new Date(date);
  d.setSeconds(59, 999);
  return d;
};

export const startOfSecond = (date) => {
  const d = new Date(date);
  d.setMilliseconds(0);
  return d;
};

export const endOfSecond = (date) => {
  const d = new Date(date);
  d.setMilliseconds(999);
  return d;
};

export const startOfQuarter = (date) => {
  const d = new Date(date);
  const quarter = Math.floor(d.getMonth() / 3);
  d.setMonth(quarter * 3, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const endOfQuarter = (date) => {
  const d = new Date(date);
  const quarter = Math.floor(d.getMonth() / 3);
  d.setMonth(quarter * 3 + 3, 0);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const startOfDecade = (date) => {
  const d = new Date(date);
  const decade = Math.floor(d.getFullYear() / 10) * 10;
  d.setFullYear(decade, 0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const endOfDecade = (date) => {
  const d = new Date(date);
  const decade = Math.floor(d.getFullYear() / 10) * 10 + 9;
  d.setFullYear(decade, 11, 31);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const startOfCentury = (date) => {
  const d = new Date(date);
  const century = Math.floor(d.getFullYear() / 100) * 100;
  d.setFullYear(century, 0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const endOfCentury = (date) => {
  const d = new Date(date);
  const century = Math.floor(d.getFullYear() / 100) * 100 + 99;
  d.setFullYear(century, 11, 31);
  d.setHours(23, 59, 59, 999);
  return d;
};
