/**
 * Convert Arabic digits (0-9) to Bangla numerals (০-৯)
 */
export function toBanglaDigits(input) {
  if (input === null || input === undefined) return '';
  const str = String(input);
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (digit) => banglaDigits[Number(digit)]);
}

/**
 * Format relative time in Bangla (e.g. "১১ মিনিট আগে", "২ ঘণ্টা আগে")
 */
export function getRelativeTimeBangla(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) {
    return 'এইমাত্র';
  }

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${toBanglaDigits(diffMin)} মিনিট আগে`;
  }

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    return `${toBanglaDigits(diffHours)} ঘণ্টা আগে`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${toBanglaDigits(diffDays)} দিন আগে`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${toBanglaDigits(diffMonths)} মাস আগে`;
  }

  const diffYears = Math.floor(diffDays / 365);
  return `${toBanglaDigits(diffYears)} বছর আগে`;
}

/**
 * Format full date in Bangla (Asia/Dhaka timezone)
 */
export function formatBanglaDate(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  try {
    const formatter = new Intl.DateTimeFormat('bn-BD', {
      timeZone: 'Asia/Dhaka',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return formatter.format(date);
  } catch (e) {
    return date.toISOString();
  }
}

/**
 * Generate a clean Bangla Unicode slug
 */
export function generateSlug(text) {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\u0980-\u09FFa-zA-Z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Cleanly separate kicker and title to prevent duplicate/double kickers
 */
export function parseKickerAndTitle(rawTitle = '', defaultKicker = '') {
  let cleanTitle = (rawTitle || '').trim();
  let kicker = (defaultKicker || '').trim();

  const match = cleanTitle.match(/^([^•:–]+)\s*[•:–]\s*(.+)$/);
  if (match) {
    if (!kicker) {
      kicker = match[1].trim();
    }
    cleanTitle = match[2].trim();
  }

  return { kicker, title: cleanTitle };
}
