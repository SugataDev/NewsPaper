import { test, describe } from 'node:test';
import assert from 'node:assert';
import { toBanglaDigits, getRelativeTimeBangla, generateSlug } from '../src/utils/formatters.js';

describe('Helper Formatters Unit Tests', () => {
  test('toBanglaDigits converts 0-9 correctly', () => {
    assert.strictEqual(toBanglaDigits('0123456789'), '০১২৩৪৫৬৭৮৯');
    assert.strictEqual(toBanglaDigits(2026), '২০২৬');
    assert.strictEqual(toBanglaDigits('Score: 100% in 15 mins'), 'Score: ১০০% in ১৫ mins');
    assert.strictEqual(toBanglaDigits(''), '');
    assert.strictEqual(toBanglaDigits(null), '');
  });

  test('getRelativeTimeBangla produces correct intervals', () => {
    const now = new Date();
    
    // 30 seconds ago
    const justNow = new Date(now.getTime() - 30 * 1000);
    assert.strictEqual(getRelativeTimeBangla(justNow), 'এইমাত্র');

    // 11 minutes ago
    const elevenMinsAgo = new Date(now.getTime() - 11 * 60 * 1000);
    assert.strictEqual(getRelativeTimeBangla(elevenMinsAgo), '১১ মিনিট আগে');

    // 2 hours ago
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    assert.strictEqual(getRelativeTimeBangla(twoHoursAgo), '২ ঘণ্টা আগে');

    // 3 days ago
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    assert.strictEqual(getRelativeTimeBangla(threeDaysAgo), '৩ দিন আগে');
  });

  test('generateSlug creates clean Bangla Unicode slugs without punctuation', () => {
    const title1 = 'এবার পুকুরের মাঝেও মাইনফিল্ড!';
    assert.strictEqual(generateSlug(title1), 'এবার-পুকুরের-মাঝেও-মাইনফিল্ড');

    const title2 = 'রাজধানীতে বৃষ্টির পূর্বাভাস: তাপমাত্রা কমার সম্ভাবনা';
    assert.strictEqual(generateSlug(title2), 'রাজধানীতে-বৃষ্টির-পূর্বাভাস-তাপমাত্রা-কমার-সম্ভাবনা');

    const title3 = '  Hello World! ঢাকা ২০২৬ --- ';
    assert.strictEqual(generateSlug(title3), 'hello-world-ঢাকা-২০২৬');
  });
});
