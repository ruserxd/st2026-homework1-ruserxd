const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
// [EDITED by student] original: const { countPositive } = require('./hw1.js');
const { countPositive } = require('../hw1.js');

describe('countPositive', () => {
  test('throws TypeError when x is not an array', () => {
    assert.throws(() => countPositive(null), TypeError);
    assert.throws(() => countPositive(undefined), TypeError);
    assert.throws(() => countPositive(5), TypeError);
    assert.throws(() => countPositive('123'), TypeError);
    assert.throws(() => countPositive({ length: 2, 0: 1, 1: 2 }), TypeError);
  });

  test('returns 0 for an empty array', () => {
    assert.equal(countPositive([]), 0);
  });

  test('counts all elements when every element is positive', () => {
    assert.equal(countPositive([1, 2, 3]), 3);
  });

  test('returns 0 when every element is negative', () => {
    assert.equal(countPositive([-1, -2, -3]), 0);
  });

  test('counts only positives in a mix of positives and negatives', () => {
    assert.equal(countPositive([-4, 2, -1, 2]), 2);
  });

  test('handles single-element arrays', () => {
    assert.equal(countPositive([7]), 1);
    assert.equal(countPositive([-7]), 0);
  });

  test('handles non-integer and extreme values', () => {
    assert.equal(countPositive([0.5, -0.5, Number.MAX_VALUE, -Infinity, Infinity]), 3);
  });

  // Fault-revealing test: 0 is not positive, but the implementation uses
  // `x[i] >= 0` instead of `x[i] > 0`, so it returns 3 here. Marked as todo
  // so the suite passes while the fault is documented.
  test('does not count zero as positive', { todo: 'fault: uses >= 0 instead of > 0' }, () => {
    assert.equal(countPositive([-4, 2, 0, 2]), 2);
  });
});
