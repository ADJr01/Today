// ============================================================================
// TODAY.JS - Professional Date Utility Library
// A comprehensive, modular date/time manipulation library
// ============================================================================

// ============================================================================
// CORE UTILITIES MODULE
// ============================================================================
const CoreUtils = {
    /**
     * Clone a date object to avoid mutations
     */
    cloneDate(date) {
        return new Date(date.getTime());
    },

    /**
     * Validate if value is a valid date
     */
    isValidDate(date) {
        return date instanceof Date && !isNaN(date.getTime());
    },

    /**
     * Pad number with leading zeros
     */
    pad(num, size = 2) {
        return String(num).padStart(size, '0');
    },

    /**
     * Get days in a specific month
     */
    getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    },

    /**
     * Check if year is leap year
     */
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
};

// ============================================================================
// CALCULATION MODULE
// ============================================================================
const Calculations = {
    /**
     * Calculate difference between two dates
     */
    timeDiff(date1, date2) {
        const d1 = CoreUtils.cloneDate(date1);
        const d2 = CoreUtils.cloneDate(date2);

        let years = d2.getFullYear() - d1.getFullYear();
        let months = d2.getMonth() - d1.getMonth();
        let days = d2.getDate() - d1.getDate();
        let hours = d2.getHours() - d1.getHours();
        let minutes = d2.getMinutes() - d1.getMinutes();
        let seconds = d2.getSeconds() - d1.getSeconds();

        if (seconds < 0) {
            minutes--;
            seconds += 60;
        }
        if (minutes < 0) {
            hours--;
            minutes += 60;
        }
        if (hours < 0) {
            days--;
            hours += 24;
        }
        if (days < 0) {
            months--;
            const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days, hours, minutes, seconds };
    },

    /**
     * Get week number of the month
     */
    getWeekOfMonth(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const firstDayOfWeek = firstDay.getDay();
        const offsetDate = date.getDate() + firstDayOfWeek - 1;
        return Math.ceil(offsetDate / 7);
    },

    /**
     * Get week number of the year (ISO week)
     */
    getWeekOfYear(date) {
        const d = CoreUtils.cloneDate(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    },

    /**
     * Get day of year (1-365/366)
     */
    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    },

    /**
     * Get quarter of year (1-4)
     */
    getQuarter(date) {
        return Math.ceil((date.getMonth() + 1) / 3);
    }
};

// ============================================================================
// RANGE GENERATION MODULE
// ============================================================================
const RangeGenerator = {
    /**
     * Generate array of last N days
     */
    getLastNDays(baseDate, n) {
        const result = [];
        for (let i = 0; i < n; i++) {
            const d = CoreUtils.cloneDate(baseDate);
            d.setDate(d.getDate() - i);
            result.push(d);
        }
        return result.reverse();
    },

    /**
     * Generate array of last N weeks (start of each week)
     */
    getLastNWeeks(baseDate, n) {
        const result = [];
        for (let i = 0; i < n; i++) {
            const d = CoreUtils.cloneDate(baseDate);
            d.setDate(d.getDate() - (i * 7));
            const dayOfWeek = d.getDay();
            d.setDate(d.getDate() - dayOfWeek);
            result.push(d);
        }
        return result.reverse();
    },

    /**
     * Generate array of last N months (first day of each month)
     */
    getLastNMonths(baseDate, n) {
        const result = [];
        for (let i = 0; i < n; i++) {
            const d = CoreUtils.cloneDate(baseDate);
            d.setMonth(d.getMonth() - i);
            d.setDate(1);
            result.push(d);
        }
        return result.reverse();
    },

    /**
     * Generate array of next N days
     */
    getNextNDays(baseDate, n) {
        const result = [];
        for (let i = 0; i < n; i++) {
            const d = CoreUtils.cloneDate(baseDate);
            d.setDate(d.getDate() + i);
            result.push(d);
        }
        return result;
    },

    /**
     * Get all days in current month
     */
    getAllDaysInMonth(baseDate) {
        const year = baseDate.getFullYear();
        const month = baseDate.getMonth();
        const daysInMonth = CoreUtils.getDaysInMonth(year, month);
        const result = [];

        for (let i = 1; i <= daysInMonth; i++) {
            result.push(new Date(year, month, i));
        }
        return result;
    },

    /**
     * Get all weekdays in current month
     */
    getWeekdaysInMonth(baseDate) {
        return RangeGenerator.getAllDaysInMonth(baseDate)
            .filter(d => d.getDay() !== 0 && d.getDay() !== 6);
    },

    /**
     * Get all weekends in current month
     */
    getWeekendsInMonth(baseDate) {
        return RangeGenerator.getAllDaysInMonth(baseDate)
            .filter(d => d.getDay() === 0 || d.getDay() === 6);
    }
};

// ============================================================================
// MANIPULATION MODULE
// ============================================================================
const Manipulation = {
    /**
     * Add time to a date
     */
    add(baseDate, value, unit) {
        const d = CoreUtils.cloneDate(baseDate);

        switch (unit.toLowerCase()) {
            case 'second':
            case 'seconds':
                d.setSeconds(d.getSeconds() + value);
                break;
            case 'minute':
            case 'minutes':
                d.setMinutes(d.getMinutes() + value);
                break;
            case 'hour':
            case 'hours':
                d.setHours(d.getHours() + value);
                break;
            case 'day':
            case 'days':
                d.setDate(d.getDate() + value);
                break;
            case 'week':
            case 'weeks':
                d.setDate(d.getDate() + (value * 7));
                break;
            case 'month':
            case 'months':
                d.setMonth(d.getMonth() + value);
                break;
            case 'year':
            case 'years':
                d.setFullYear(d.getFullYear() + value);
                break;
            default:
                throw new Error(`Invalid unit: ${unit}`);
        }

        return d;
    },

    /**
     * Subtract time from a date
     */
    subtract(baseDate, value, unit) {
        return Manipulation.add(baseDate, -value, unit);
    },

    /**
     * Set date to start of unit
     */
    startOf(baseDate, unit) {
        const d = CoreUtils.cloneDate(baseDate);

        switch (unit.toLowerCase()) {
            case 'second':
                d.setMilliseconds(0);
                break;
            case 'minute':
                d.setSeconds(0, 0);
                break;
            case 'hour':
                d.setMinutes(0, 0, 0);
                break;
            case 'day':
                d.setHours(0, 0, 0, 0);
                break;
            case 'week':
                d.setHours(0, 0, 0, 0);
                d.setDate(d.getDate() - d.getDay());
                break;
            case 'month':
                d.setDate(1);
                d.setHours(0, 0, 0, 0);
                break;
            case 'year':
                d.setMonth(0, 1);
                d.setHours(0, 0, 0, 0);
                break;
            case 'quarter':
                const quarter = Calculations.getQuarter(d);
                d.setMonth((quarter - 1) * 3, 1);
                d.setHours(0, 0, 0, 0);
                break;
            default:
                throw new Error(`Invalid unit: ${unit}`);
        }

        return d;
    },

    /**
     * Set date to end of unit
     */
    endOf(baseDate, unit) {
        const d = CoreUtils.cloneDate(baseDate);

        switch (unit.toLowerCase()) {
            case 'second':
                d.setMilliseconds(999);
                break;
            case 'minute':
                d.setSeconds(59, 999);
                break;
            case 'hour':
                d.setMinutes(59, 59, 999);
                break;
            case 'day':
                d.setHours(23, 59, 59, 999);
                break;
            case 'week':
                d.setHours(23, 59, 59, 999);
                d.setDate(d.getDate() + (6 - d.getDay()));
                break;
            case 'month':
                d.setMonth(d.getMonth() + 1, 0);
                d.setHours(23, 59, 59, 999);
                break;
            case 'year':
                d.setMonth(11, 31);
                d.setHours(23, 59, 59, 999);
                break;
            case 'quarter':
                const quarter = Calculations.getQuarter(d);
                d.setMonth(quarter * 3, 0);
                d.setHours(23, 59, 59, 999);
                break;
            default:
                throw new Error(`Invalid unit: ${unit}`);
        }

        return d;
    }
};

// ============================================================================
// FORMATTING MODULE
// ============================================================================
const Formatting = {
    /**
     * Format date according to pattern
     */
    format(date, pattern) {
        const tokens = {
            YYYY: date.getFullYear(),
            YY: String(date.getFullYear()).slice(-2),
            MMMM: ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()],
            MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()],
            MM: CoreUtils.pad(date.getMonth() + 1),
            M: date.getMonth() + 1,
            DD: CoreUtils.pad(date.getDate()),
            D: date.getDate(),
            dddd: ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'][date.getDay()],
            ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
            HH: CoreUtils.pad(date.getHours()),
            H: date.getHours(),
            hh: CoreUtils.pad(date.getHours() % 12 || 12),
            h: date.getHours() % 12 || 12,
            mm: CoreUtils.pad(date.getMinutes()),
            m: date.getMinutes(),
            ss: CoreUtils.pad(date.getSeconds()),
            s: date.getSeconds(),
            SSS: CoreUtils.pad(date.getMilliseconds(), 3),
            A: date.getHours() >= 12 ? 'PM' : 'AM',
            a: date.getHours() >= 12 ? 'pm' : 'am'
        };

        let formatted = pattern;

        // Sort by length to replace longer patterns first
        const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);

        for (const token of sortedTokens) {
            formatted = formatted.replace(new RegExp(token, 'g'), tokens[token]);
        }

        // Check if format was valid (contains at least one replaced token)
        if (formatted === pattern) {
            return date.toISOString();
        }

        return formatted;
    },

    /**
     * Get time in specified format
     */
    getTime(date, format = 'HH:mm:ss') {
        return Formatting.format(date, format);
    },

    /**
     * Convert to human readable relative time
     */
    fromNow(date, baseDate = new Date()) {
        const diff = baseDate - date;
        const seconds = Math.floor(Math.abs(diff) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        const suffix = diff > 0 ? 'ago' : 'from now';

        if (seconds < 60) return `${seconds} seconds ${suffix}`;
        if (minutes < 60) return `${minutes} minutes ${suffix}`;
        if (hours < 24) return `${hours} hours ${suffix}`;
        if (days < 30) return `${days} days ${suffix}`;
        if (months < 12) return `${months} months ${suffix}`;
        return `${years} years ${suffix}`;
    },

    /**
     * Convert to calendar format (Today, Yesterday, Tomorrow, etc.)
     */
    calendar(date, baseDate = new Date()) {
        const today = Manipulation.startOf(baseDate, 'day');
        const compareDate = Manipulation.startOf(date, 'day');
        const diff = Math.floor((compareDate - today) / (1000 * 60 * 60 * 24));

        if (diff === 0) return `Today at ${Formatting.getTime(date, 'h:mm A')}`;
        if (diff === -1) return `Yesterday at ${Formatting.getTime(date, 'h:mm A')}`;
        if (diff === 1) return `Tomorrow at ${Formatting.getTime(date, 'h:mm A')}`;
        if (diff > 1 && diff < 7) return Formatting.format(date, 'dddd [at] h:mm A');
        return Formatting.format(date, 'MMM D, YYYY [at] h:mm A');
    }
};

// ============================================================================
// COMPARISON MODULE
// ============================================================================
const Comparison = {
    /**
     * Check if date is before another date
     */
    isBefore(date1, date2, granularity = 'millisecond') {
        const d1 = Manipulation.startOf(date1, granularity);
        const d2 = Manipulation.startOf(date2, granularity);
        return d1 < d2;
    },

    /**
     * Check if date is after another date
     */
    isAfter(date1, date2, granularity = 'millisecond') {
        const d1 = Manipulation.startOf(date1, granularity);
        const d2 = Manipulation.startOf(date2, granularity);
        return d1 > d2;
    },

    /**
     * Check if date is same as another date
     */
    isSame(date1, date2, granularity = 'millisecond') {
        const d1 = Manipulation.startOf(date1, granularity);
        const d2 = Manipulation.startOf(date2, granularity);
        return d1.getTime() === d2.getTime();
    },

    /**
     * Check if date is between two dates
     */
    isBetween(date, start, end, inclusivity = '[]') {
        const includeStart = inclusivity[0] === '[';
        const includeEnd = inclusivity[1] === ']';

        const afterStart = includeStart ? date >= start : date > start;
        const beforeEnd = includeEnd ? date <= end : date < end;

        return afterStart && beforeEnd;
    },

    /**
     * Check if date is today
     */
    isToday(date, baseDate = new Date()) {
        return Comparison.isSame(date, baseDate, 'day');
    },

    /**
     * Check if date is yesterday
     */
    isYesterday(date, baseDate = new Date()) {
        const yesterday = Manipulation.subtract(baseDate, 1, 'day');
        return Comparison.isSame(date, yesterday, 'day');
    },

    /**
     * Check if date is tomorrow
     */
    isTomorrow(date, baseDate = new Date()) {
        const tomorrow = Manipulation.add(baseDate, 1, 'day');
        return Comparison.isSame(date, tomorrow, 'day');
    },

    /**
     * Check if date is a weekend
     */
    isWeekend(date) {
        const day = date.getDay();
        return day === 0 || day === 6;
    },

    /**
     * Check if date is a weekday
     */
    isWeekday(date) {
        return !Comparison.isWeekend(date);
    }
};

// ============================================================================
// BUSINESS LOGIC MODULE
// ============================================================================
const Business = {
    /**
     * Add business days (excluding weekends)
     */
    addBusinessDays(baseDate, days) {
        let d = CoreUtils.cloneDate(baseDate);
        let remaining = Math.abs(days);
        const direction = days > 0 ? 1 : -1;

        while (remaining > 0) {
            d.setDate(d.getDate() + direction);
            if (Comparison.isWeekday(d)) {
                remaining--;
            }
        }

        return d;
    },

    /**
     * Get count of business days between two dates
     */
    businessDaysDiff(date1, date2) {
        let count = 0;
        let current = CoreUtils.cloneDate(date1);
        const end = CoreUtils.cloneDate(date2);

        while (current < end) {
            if (Comparison.isWeekday(current)) {
                count++;
            }
            current.setDate(current.getDate() + 1);
        }

        return count;
    },

    /**
     * Check if date is a business day
     */
    isBusinessDay(date) {
        return Comparison.isWeekday(date);
    },

    /**
     * Get next business day
     */
    getNextBusinessDay(baseDate) {
        let d = CoreUtils.cloneDate(baseDate);
        d.setDate(d.getDate() + 1);

        while (!Comparison.isWeekday(d)) {
            d.setDate(d.getDate() + 1);
        }

        return d;
    },

    /**
     * Get previous business day
     */
    getPreviousBusinessDay(baseDate) {
        let d = CoreUtils.cloneDate(baseDate);
        d.setDate(d.getDate() - 1);

        while (!Comparison.isWeekday(d)) {
            d.setDate(d.getDate() - 1);
        }

        return d;
    }
};

// ============================================================================
// MAIN TODAY CLASS
// ============================================================================
class Today {
    constructor(date = null) {
        this.date = date ? new Date(date) : new Date();

        if (!CoreUtils.isValidDate(this.date)) {
            throw new Error('Invalid date provided');
        }
    }

    // ========== GETTERS ==========

    getDate() {
        return CoreUtils.cloneDate(this.date);
    }

    getYear() {
        return this.date.getFullYear();
    }

    getMonth() {
        return this.date.getMonth();
    }

    getDay() {
        return this.date.getDate();
    }

    getDayOfWeek() {
        return this.date.getDay();
    }

    getHours() {
        return this.date.getHours();
    }

    getMinutes() {
        return this.date.getMinutes();
    }

    getSeconds() {
        return this.date.getSeconds();
    }

    // ========== RANGE METHODS ==========

    getLastNDays(n) {
        return RangeGenerator.getLastNDays(this.date, n);
    }

    getLastNWeeks(n) {
        return RangeGenerator.getLastNWeeks(this.date, n);
    }

    getLastNMonths(n) {
        return RangeGenerator.getLastNMonths(this.date, n);
    }

    getNextNDays(n) {
        return RangeGenerator.getNextNDays(this.date, n);
    }

    getAllDaysInMonth() {
        return RangeGenerator.getAllDaysInMonth(this.date);
    }

    getWeekdaysInMonth() {
        return RangeGenerator.getWeekdaysInMonth(this.date);
    }

    getWeekendsInMonth() {
        return RangeGenerator.getWeekendsInMonth(this.date);
    }

    // ========== AGO METHODS ==========

    getNDaysAgo(n) {
        return Manipulation.subtract(this.date, n, 'days');
    }

    getNWeeksAgo(n) {
        return Manipulation.subtract(this.date, n, 'weeks');
    }

    getNMonthsAgo(n) {
        return Manipulation.subtract(this.date, n, 'months');
    }

    getNYearsAgo(n) {
        return Manipulation.subtract(this.date, n, 'years');
    }

    // ========== CALCULATION METHODS ==========

    timeDiff(compareDate) {
        return Calculations.timeDiff(compareDate, this.date);
    }

    getWeekNumber() {
        return Calculations.getWeekOfMonth(this.date);
    }

    getWeekOfYear() {
        return Calculations.getWeekOfYear(this.date);
    }

    getDayOfYear() {
        return Calculations.getDayOfYear(this.date);
    }

    getQuarter() {
        return Calculations.getQuarter(this.date);
    }

    getDaysInMonth() {
        return CoreUtils.getDaysInMonth(this.date.getFullYear(), this.date.getMonth());
    }

    // ========== MANIPULATION METHODS ==========

    add(value, unit) {
        return Manipulation.add(this.date, value, unit);
    }

    subtract(value, unit) {
        return Manipulation.subtract(this.date, value, unit);
    }

    startOf(unit) {
        return Manipulation.startOf(this.date, unit);
    }

    endOf(unit) {
        return Manipulation.endOf(this.date, unit);
    }

    setTime(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        if (arguments.length === 0) {
            this.date.setHours(0, 0, 0, 0);
        } else if (arguments[0] instanceof Date) {
            const d = arguments[0];
            this.date.setHours(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        } else {
            this.date.setHours(hours, minutes, seconds, milliseconds);
        }
        return this;
    }

    clone() {
        return new Today(this.date);
    }

    // ========== UTILITY METHODS ==========

    isOddDate() {
        return this.date.getDate() % 2 !== 0;
    }

    isEvenDate() {
        return this.date.getDate() % 2 === 0;
    }

    isAm() {
        return this.date.getHours() < 12;
    }

    isPm() {
        return this.date.getHours() >= 12;
    }

    isLeapYear() {
        return CoreUtils.isLeapYear(this.date.getFullYear());
    }

    isWeekend() {
        return Comparison.isWeekend(this.date);
    }

    isWeekday() {
        return Comparison.isWeekday(this.date);
    }

    isToday() {
        return Comparison.isToday(this.date);
    }

    isYesterday() {
        return Comparison.isYesterday(this.date);
    }

    isTomorrow() {
        return Comparison.isTomorrow(this.date);
    }

    // ========== COMPARISON METHODS ==========

    isBefore(date, granularity = 'millisecond') {
        return Comparison.isBefore(this.date, date, granularity);
    }

    isAfter(date, granularity = 'millisecond') {
        return Comparison.isAfter(this.date, date, granularity);
    }

    isSame(date, granularity = 'millisecond') {
        return Comparison.isSame(this.date, date, granularity);
    }

    isBetween(start, end, inclusivity = '[]') {
        return Comparison.isBetween(this.date, start, end, inclusivity);
    }

    // ========== FORMATTING METHODS ==========

    format(pattern = 'YYYY-MM-DD') {
        return Formatting.format(this.date, pattern);
    }

    getTime(format = 'HH:mm:ss') {
        return Formatting.getTime(this.date, format);
    }

    fromNow(baseDate = new Date()) {
        return Formatting.fromNow(this.date, baseDate);
    }

    calendar(baseDate = new Date()) {
        return Formatting.calendar(this.date, baseDate);
    }

    toUnixTimestamp() {
        return Math.floor(this.date.getTime() / 1000);
    }

    toMillisecondsTimestamp() {
        return this.date.getTime();
    }

    toISOString() {
        return this.date.toISOString();
    }

    toUTCString() {
        return this.date.toUTCString();
    }

    toDateString() {
        return this.date.toDateString();
    }

    toTimeString() {
        return this.date.toTimeString();
    }

    toLocaleDateString(locale = 'en-US', options = {}) {
        return this.date.toLocaleDateString(locale, options);
    }

    toLocaleTimeString(locale = 'en-US', options = {}) {
        return this.date.toLocaleTimeString(locale, options);
    }

    // ========== BUSINESS DAY METHODS ==========

    addBusinessDays(days) {
        return Business.addBusinessDays(this.date, days);
    }

    businessDaysDiff(date) {
        return Business.businessDaysDiff(this.date, date);
    }

    isBusinessDay() {
        return Business.isBusinessDay(this.date);
    }

    getNextBusinessDay() {
        return Business.getNextBusinessDay(this.date);
    }

    getPreviousBusinessDay() {
        return Business.getPreviousBusinessDay(this.date);
    }

    // ========== STATIC UTILITY METHODS ==========

    static now() {
        return new Today();
    }

    static fromUnixTimestamp(timestamp) {
        return new Today(new Date(timestamp * 1000));
    }

    static fromMilliseconds(milliseconds) {
        return new Today(new Date(milliseconds));
    }

    static parse(dateString) {
        return new Today(new Date(dateString));
    }

    static isValid(date) {
        return CoreUtils.isValidDate(new Date(date));
    }

    static min(...dates) {
        const timestamps = dates.map(d => new Date(d).getTime());
        return new Today(new Date(Math.min(...timestamps)));
    }

    static max(...dates) {
        const timestamps = dates.map(d => new Date(d).getTime());
        return new Today(new Date(Math.max(...timestamps)));
    }

    static daysBetween(date1, date2) {
        const diff = Math.abs(new Date(date2) - new Date(date1));
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    static hoursBetween(date1, date2) {
        const diff = Math.abs(new Date(date2) - new Date(date1));
        return Math.floor(diff / (1000 * 60 * 60));
    }

    static minutesBetween(date1, date2) {
        const diff = Math.abs(new Date(date2) - new Date(date1));
        return Math.floor(diff / (1000 * 60));
    }
}

// ============================================================================
// EXPORT
// ============================================================================
// For Node.js / Module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Today;
}else{
    export default Today;
}