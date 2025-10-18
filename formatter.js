// formatter.js - Date Formatting Module

const padZero = (num, size = 2) => String(num).padStart(size, '0');

export const parseFormatString = (date, formatStr) => {
  const tokens = {
    YYYY: () => date.getFullYear(),
    YY: () => String(date.getFullYear()).slice(-2),
    MMMM: () => ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()],
    MMM: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()],
    MM: () => padZero(date.getMonth() + 1),
    M: () => date.getMonth() + 1,
    DD: () => padZero(date.getDate()),
    D: () => date.getDate(),
    dddd: () => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
    ddd: () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
    dd: () => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()],
    HH: () => padZero(date.getHours()),
    H: () => date.getHours(),
    hh: () => padZero(date.getHours() % 12 || 12),
    h: () => date.getHours() % 12 || 12,
    mm: () => padZero(date.getMinutes()),
    m: () => date.getMinutes(),
    ss: () => padZero(date.getSeconds()),
    s: () => date.getSeconds(),
    SSS: () => padZero(date.getMilliseconds(), 3),
    A: () => date.getHours() >= 12 ? 'PM' : 'AM',
    a: () => date.getHours() >= 12 ? 'pm' : 'am',
    ZZ: () => {
      const offset = -date.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const absOffset = Math.abs(offset);
      const hours = padZero(Math.floor(absOffset / 60));
      const minutes = padZero(absOffset % 60);
      return `${sign}${hours}${minutes}`;
    },
    Z: () => {
      const offset = -date.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const absOffset = Math.abs(offset);
      const hours = padZero(Math.floor(absOffset / 60));
      const minutes = padZero(absOffset % 60);
      return `${sign}${hours}:${minutes}`;
    }
  };

  return { tokens };
};

export const formatDate = (date, formatStr) => {
  if (!formatStr) return date.toISOString();

  try {
    const { tokens } = parseFormatString(date, formatStr);

    let result = formatStr;

    // Sort tokens by length (longest first) to avoid partial replacements
    const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);

    for (const token of sortedTokens) {
      const regex = new RegExp(token, 'g');
      result = result.replace(regex, tokens[token]());
    }

    return result;
  } catch (error) {
    return date.toISOString();
  }
};

export const formatLong = (date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const formatShort = (date) => {
  return `${padZero(date.getMonth() + 1)}/${padZero(date.getDate())}/${date.getFullYear()}`;
};

export const formatRelative = (date, baseDate = new Date()) => {
  const diffMs = date - baseDate;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (Math.abs(diffSecs) < 60) {
    return 'just now';
  } else if (Math.abs(diffMins) < 60) {
    return diffMins > 0 ? `in ${diffMins} minute${diffMins > 1 ? 's' : ''}` : `${Math.abs(diffMins)} minute${Math.abs(diffMins) > 1 ? 's' : ''} ago`;
  } else if (Math.abs(diffHours) < 24) {
    return diffHours > 0 ? `in ${diffHours} hour${diffHours > 1 ? 's' : ''}` : `${Math.abs(diffHours)} hour${Math.abs(diffHours) > 1 ? 's' : ''} ago`;
  } else if (Math.abs(diffDays) < 7) {
    return diffDays > 0 ? `in ${diffDays} day${diffDays > 1 ? 's' : ''}` : `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
  } else if (Math.abs(diffDays) < 30) {
    const weeks = Math.floor(Math.abs(diffDays) / 7);
    return diffDays > 0 ? `in ${weeks} week${weeks > 1 ? 's' : ''}` : `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (Math.abs(diffDays) < 365) {
    const months = Math.floor(Math.abs(diffDays) / 30);
    return diffDays > 0 ? `in ${months} month${months > 1 ? 's' : ''}` : `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(Math.abs(diffDays) / 365);
    return diffDays > 0 ? `in ${years} year${years > 1 ? 's' : ''}` : `${years} year${years > 1 ? 's' : ''} ago`;
  }
};

export const formatDuration = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};
