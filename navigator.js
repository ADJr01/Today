// navigator.js - Date Navigation Module

export const getLastNDays = (date, n) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(date);
    d.setDate(d.getDate() - i);
    result.push(d);
  }
  return result.reverse();
};

export const getLastNWeeks = (date, n) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(date);
    d.setDate(d.getDate() - (i * 7));
    result.push(d);
  }
  return result.reverse();
};

export const getLastNMonths = (date, n) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(date);
    d.setMonth(d.getMonth() - i);
    result.push(d);
  }
  return result.reverse();
};

export const getLastNYears = (date, n) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(date);
    d.setFullYear(d.getFullYear() - i);
    result.push(d);
  }
  return result.reverse();
};

export const getNDaysAgo = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() - n);
  return d;
};

export const getNWeeksAgo = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() - (n * 7));
  return d;
};

export const getNMonthsAgo = (date, n) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() - n);
  return d;
};

export const getNYearsAgo = (date, n) => {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() - n);
  return d;
};

export const getNDaysAhead = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};

export const getNWeeksAhead = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + (n * 7));
  return d;
};

export const getNMonthsAhead = (date, n) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
};

export const getNYearsAhead = (date, n) => {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + n);
  return d;
};

export const getNextNDays = (date, n) => {
  const result = [];
  for (let i = 1; i <= n; i++) {
    const d = new Date(date);
    d.setDate(d.getDate() + i);
    result.push(d);
  }
  return result;
};

export const getNextNWeeks = (date, n) => {
  const result = [];
  for (let i = 1; i <= n; i++) {
    const d = new Date(date);
    d.setDate(d.getDate() + (i * 7));
    result.push(d);
  }
  return result;
};

export const getNextNMonths = (date, n) => {
  const result = [];
  for (let i = 1; i <= n; i++) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + i);
    result.push(d);
  }
  return result;
};

export const getAllDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const result = [];
  for (let day = 1; day <= daysInMonth; day++) {
    result.push(new Date(year, month, day));
  }
  return result;
};

export const getAllDaysInYear = (date) => {
  const year = date.getFullYear();
  const result = [];

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      result.push(new Date(year, month, day));
    }
  }
  return result;
};

export const getWeekDaysInMonth = (date) => {
  const days = getAllDaysInMonth(date);
  return days.filter(d => d.getDay() !== 0 && d.getDay() !== 6);
};

export const getWeekendsInMonth = (date) => {
  const days = getAllDaysInMonth(date);
  return days.filter(d => d.getDay() === 0 || d.getDay() === 6);
};

export const getBusinessDays = (startDate, endDate) => {
  const result = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      result.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return result;
};

export const getDateRange = (startDate, endDate) => {
  const result = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    result.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return result;
};
