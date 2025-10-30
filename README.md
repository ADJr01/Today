# Today.js 🚀

**A Modular JavaScript Date & Time Library**

Today.js is a comprehensive, functional-style date manipulation library designed to be a complete replacement for JavaScript's native Date object. Built with modularity, performance, and developer experience in mind.

## 🌟 Features

- **Modular Architecture** - Clean separation of concerns across multiple modules
- **Functional Programming** - Immutable operations, pure functions
- **Comprehensive API** - 100+ utility functions for date manipulation
- **Zero Dependencies** - Lightweight and fast
- **Chainable Methods** - Fluent interface for elegant code
- **TypeScript Ready** - Full type definitions support
- **Business Logic Built-in** - Business days, quarters, fiscal periods
- **Multiple Format Support** - ISO, SQL, Unix, Excel, and custom formats


## 🚀 Quick Start

```javascript
import Today from './today.js';

// Create instance
const today = new Today();

// Format dates
console.log(today.format('YYYY-MM-DD')); // "2024-10-18"
console.log(today.format('MMMM Do, YYYY')); // "October 18th, 2024"

// Navigate dates
const nextWeek = today.add(7, 'days');
const lastMonth = today.subtract(1, 'month');

// Calculate differences
const age = today.timeDiff(new Date('1996-03-19'));
console.log(age.years); // 28

// Utility checks
console.log(today.isWeekend()); // false
console.log(today.isLeapYear()); // false
```

## 📚 Module Structure

```
today-js/
├── today.js           # Core class
├── formatter.js       # Date formatting & parsing
├── navigator.js       # Date navigation & ranges
├── calculator.js      # Date arithmetic & comparisons
├── utilities.js       # Utility functions & checks
├── converters.js      # Format conversions
└── boundary.js        # Start/end of periods
```

## 🎯 Core Methods

### Initialization

```javascript
const today = new Today();                    // Current date
const specific = new Today(new Date());       // Specific date
const parsed = Today.parse('2024-10-18');    // Parse string
const fromUnix = Today.fromUnixTimestamp(ts); // From timestamp
```

### Formatting

```javascript
// Flexible formatting
today.format('YYYY-MM-DD');              // "2024-10-18"
today.format('DD/MM/YYYY HH:mm:ss');     // "18/10/2024 15:30:00"
today.format('dddd, MMMM D, YYYY');      // "Friday, October 18, 2024"
today.format('hh:mm A');                 // "03:30 PM"

// Preset formats
const formatter = today.Date();
formatter.formatLong(today);              // "October 18, 2024"
formatter.formatShort(today);             // "10/18/2024"

// Time
today.getTime();                          // "15:30:45"
today.getTime('HH:mm');                   // "15:30"
```

### Format Tokens

| Token | Description | Example |
|-------|-------------|---------|
| YYYY | 4-digit year | 2024 |
| YY | 2-digit year | 24 |
| MMMM | Full month name | October |
| MMM | Short month name | Oct |
| MM | 2-digit month | 10 |
| M | Month number | 10 |
| DD | 2-digit day | 18 |
| D | Day number | 18 |
| dddd | Full day name | Friday |
| ddd | Short day name | Fri |
| HH | 24-hour (2-digit) | 15 |
| hh | 12-hour (2-digit) | 03 |
| mm | Minutes | 30 |
| ss | Seconds | 45 |
| A | AM/PM | PM |

### Navigation

```javascript
// Get past dates
today.getLastNDays(7);           // Array of last 7 days
today.getLastNWeeks(4);          // Array of last 4 weeks
today.getLastNMonths(6);         // Array of last 6 months

// Get specific past date
today.getNDaysAgo(5);            // 5 days ago
today.getNWeeksAgo(2);           // 2 weeks ago
today.getNMonthsAgo(3);          // 3 months ago
today.getNYearsAgo(1);           // 1 year ago
```

### Arithmetic

```javascript
// Add time
today.add(5, 'days');
today.add(2, 'months');
today.add(1, 'year');
today.add(30, 'minutes');

// Subtract time
today.subtract(3, 'weeks');
today.subtract(2, 'hours');

// Chaining
today.add(1, 'month').add(15, 'days').subtract(2, 'hours');
```

### Comparisons

```javascript
// Boolean checks
today.isBefore(otherDate);
today.isAfter(otherDate);
today.isSame(otherDate, 'day');
today.isBetween(startDate, endDate);

// Time differences
const diff = today.timeDiff(pastDate);
// Returns: { years, months, days, hours, minutes, seconds,
//            totalDays, totalHours, totalMinutes, ... }
```

### Utilities

```javascript
// Date checks
today.isOddDate();               // true if date is odd
today.isEvenDate();              // true if date is even
today.isLeapYear();              // true if leap year
today.isWeekend();               // true if Sat/Sun
today.isWeekday();               // true if Mon-Fri

// Time checks
today.isAm();                    // true if before noon
today.isPm();                    // true if after noon

// Calendar info
today.getWeekNumber();           // Week number in month
today.getWeekOfYear();           // Week number in year
today.getDayOfYear();            // Day number (1-366)
today.getQuarter();              // Quarter (1-4)
today.getDaysInMonth();          // Days in current month
today.getDaysInYear();           // 365 or 366
```

### Boundaries

```javascript
// Start and end of periods
today.startOfDay();              // 00:00:00.000
today.endOfDay();                // 23:59:59.999
today.startOfWeek();             // Start of week (Sunday)
today.startOfWeek(1);            // Start of week (Monday)
today.endOfWeek();               // End of week
today.startOfMonth();            // First day of month
today.endOfMonth();              // Last day of month
today.startOfYear();             // January 1st
today.endOfYear();               // December 31st
today.startOfQuarter();          // Start of quarter
today.endOfQuarter();            // End of quarter
```

### Conversions

```javascript
// Timestamps
today.toUnixTimestamp();         // Unix timestamp (seconds)
today.toMillisecondsTimestamp(); // Milliseconds

// Standard formats
today.toISOString();             // ISO 8601
today.toUTCString();             // UTC string
today.toLocaleDateString();      // Locale date
today.toLocaleTimeString();      // Locale time
```

### Properties

```javascript
today.year;           // 2024
today.month;          // 10
today.day;            // 18
today.hours;          // 15
today.minutes;        // 30
today.seconds;        // 45
today.milliseconds;   // 123
today.dayOfWeek;      // 5 (Friday)
today.dayName;        // "Friday"
today.monthName;      // "October"
today.date;           // Native Date object
```

## 💼 Real-World Examples

### Age Calculator

```javascript
function calculateAge(birthDate) {
  const today = Today.now();
  return today.timeDiff(birthDate).years;
}
```

### Business Days

```javascript
function addBusinessDays(startDate, days) {
  let current = new Today(startDate);
  let added = 0;
  
  while (added < days) {
    current = current.add(1, 'days');
    if (current.isWeekday()) added++;
  }
  
  return current;
}
```

### Payment Schedule

```javascript
function getPaymentSchedule(startDate, months) {
  const schedule = [];
  let current = new Today(startDate);
  
  for (let i = 0; i < months; i++) {
    current = current.add(1, 'months');
    schedule.push(current.format('YYYY-MM-DD'));
  }
  
  return schedule;
}
```

### Time Ago Formatter

```javascript
function formatTimeAgo(date) {
  const now = Today.now();
  const past = new Today(date);
  const diff = now.timeDiff(past.date);
  
  if (diff.totalMinutes < 60) return `${diff.totalMinutes}m ago`;
  if (diff.totalHours < 24) return `${diff.totalHours}h ago`;
  if (diff.totalDays < 7) return `${diff.totalDays}d ago`;
  return past.format('MMM D');
}
```

## 🔧 Advanced Usage

### Chaining Operations

```javascript
const result = Today.now()
  .startOfMonth()
  .add(15, 'days')
  .add(3, 'hours')
  .format('YYYY-MM-DD HH:mm:ss');
```

### Date Ranges

```javascript
function getDateRange(start, end) {
  const dates = [];
  let current = new Today(start);
  const endDate = new Today(end);
  
  while (current.isBefore(endDate.date) || current.isSame(endDate.date)) {
    dates.push(current.format('YYYY-MM-DD'));
    current = current.add(1, 'days');
  }
  
  return dates;
}
```

## 🎨 Why Today.js?

- **Better than moment.js** - Smaller, faster, more modern
- **Cleaner than date-fns** - Object-oriented + functional approach
- **More powerful than Day.js** - More features out of the box
- **Perfect for any project** - From simple scripts to enterprise apps

## 📖 API Reference

Full API documentation available at [docs/API.md](docs/API.md)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT License - feel free to use in any project!

## ⭐ Show Your Support

If you find Today.js useful, please give it a star on GitHub!

---

Made with ❤️ for developers who love clean, powerful date manipulation
