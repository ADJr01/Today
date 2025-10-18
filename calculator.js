// calculator.js - Date Calculation Module

export const timeDiff = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const diffMs = Math.abs(d1 - d2);

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Calculate years, months, and remaining days
  let years = d1.getFullYear() - d2.getFullYear();
  let months = d1.getMonth() - d2.getMonth();
  let remainingDays = d1.getDate() - d2.getDate();

  if (remainingDays < 0) {
    months--;
    const prevMonth = new Date(d1.getFullYear(), d1.getMonth(), 0);
    remainingDays += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years: Math.abs(years),
    months: Math.abs(months),
    days: Math.abs(remainingDays),
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    totalDays: days,
    totalHours: hours,
    totalMinutes: minutes,
    totalSeconds: seconds,
    totalMilliseconds: diffMs
  };
};

export const add = (date, amount, unit) => {
  const d = new Date(date);

  switch (unit.toLowerCase()) {
    case 'millisecond':
    case 'milliseconds':
      d.setMilliseconds(d.getMilliseconds() + amount);
      break;
    case 'second':
    case 'seconds':
      d.setSeconds(d.getSeconds() + amount);
      break;
    case 'minute':
    case 'minutes':
      d.setMinutes(d.getMinutes() + amount);
      break;
    case 'hour':
    case 'hours':
      d.setHours(d.getHours() + amount);
      break;
    case 'day':
    case 'days':
      d.setDate(d.getDate() + amount);
      break;
    case 'week':
    case 'weeks':
      d.setDate(d.getDate() + (amount * 7));
      break;
    case 'month':
    case 'months':
      d.setMonth(d.getMonth() + amount);
      break;
    case 'year':
    case 'years':
      d.setFullYear(d.getFullYear() + amount);
      break;
    default:
      throw new Error(`Invalid unit: ${unit}`);
  }

  return d;
};

export const subtract = (date, amount, unit) => {
  return add(date, -amount, unit);
};

export const isBefore = (date1, date2) => {
  return new Date(date1) < new Date(date2);
};

export const isAfter = (date1, date2) => {
  return new Date(date1) > new Date(date2);
};

export const isSame = (date1, date2, unit = 'day') => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  switch (unit.toLowerCase()) {
    case 'year':
      return d1.getFullYear() === d2.getFullYear();
    case 'month':
      return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth();
    case 'day':
      return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
    case 'hour':
      return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate() &&
        d1.getHours() === d2.getHours();
    case 'minute':
      return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate() &&
        d1.getHours() === d2.getHours() &&
        d1.getMinutes() === d2.getMinutes();
    case 'second':
      return d1.getTime() === d2.getTime();
    default:
      return d1.getTime() === d2.getTime();
  }
};

export const isBetween = (date, startDate, endDate, inclusive = true) => {
  const d = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (inclusive) {
    return d >= start && d <= end;
  } else {
    return d > start && d < end;
  }
};

export const getDifferenceInDays = (date1, date2) => {
  const diffMs = Math.abs(new Date(date1) - new Date(date2));
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
};

export const getDifferenceInHours = (date1, date2) => {
  const diffMs = Math.abs(new Date(date1) - new Date(date2));
  return Math.floor(diffMs / (1000 * 60 * 60));
};

export const getDifferenceInMinutes = (date1, date2) => {
  const diffMs = Math.abs(new Date(date1) - new Date(date2));
  return Math.floor(diffMs / (1000 * 60));
};

export const getDifferenceInSeconds = (date1, date2) => {
  const diffMs = Math.abs(new Date(date1) - new Date(date2));
  return Math.floor(diffMs / 1000);
};

export const getAge = (birthDate, referenceDate = new Date()) => {
  const birth = new Date(birthDate);
  const ref = new Date(referenceDate);

  let age = ref.getFullYear() - birth.getFullYear();
  const monthDiff = ref.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && ref.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export const getExactAge = (birthDate, referenceDate = new Date()) => {
  return timeDiff(referenceDate, birthDate);
};

export const addBusinessDays = (date, days) => {
  const d = new Date(date);
  let addedDays = 0;

  while (addedDays < days) {
    d.setDate(d.getDate() + 1);
    const dayOfWeek = d.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      addedDays++;
    }
  }

  return d;
};

export const subtractBusinessDays = (date, days) => {
  const d = new Date(date);
  let subtractedDays = 0;

  while (subtractedDays < days) {
    d.setDate(d.getDate() - 1);
    const dayOfWeek = d.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      subtractedDays++;
    }
  }

  return d;
};

export const getBusinessDaysDifference = (date1, date2) => {
  const d1 = new Date(Math.min(date1, date2));
  const d2 = new Date(Math.max(date1, date2));
  let count = 0;

  const current = new Date(d1);
  while (current <= d2) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
};
