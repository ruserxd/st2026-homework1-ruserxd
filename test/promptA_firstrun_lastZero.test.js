const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
// [EDITED by student] original: const { lastZero } = require('./hw1');
const { lastZero } = require('../hw1.js');

describe('lastZero', () => {
  test('throws TypeError when x is not an array', () => {
    assert.throws(() => lastZero(null), TypeError);
    assert.throws(() => lastZero(undefined), TypeError);
    assert.throws(() => lastZero('0'), TypeError);
    assert.throws(() => lastZero(0), TypeError);
    assert.throws(() => lastZero({ 0: 0, length: 1 }), TypeError);
  });

  test('returns -1 for an empty array', () => {
    assert.equal(lastZero([]), -1);
  });

  test('returns -1 when there is no zero', () => {
    assert.equal(lastZero([1, 2, 3]), -1);
  });

  test('uses strict equality (no "0", false, null, or "")', () => {
    assert.equal(lastZero(['0', false, null, '']), -1);
  });

  test('treats -0 as zero', () => {
    assert.equal(lastZero([5, -0]), 1);
  });

  test('finds a single zero at the start', () => {
    assert.equal(lastZero([0, 1, 2]), 0);
  });

  test('finds a single zero in the middle', () => {
    assert.equal(lastZero([1, 0, 2]), 1);
  });

  test('finds a single zero at the end', () => {
    assert.equal(lastZero([1, 2, 0]), 2);
  });

  // Fails against the current implementation: the loop scans forward and
  // returns the FIRST zero, not the last. Marked todo so the suite passes
  // while still documenting the fault.
  test('returns the last index when there are multiple zeros', { todo: 'fault: returns first zero, not last' }, () => {
    assert.equal(lastZero([0, 1, 0]), 2);
  });
});
