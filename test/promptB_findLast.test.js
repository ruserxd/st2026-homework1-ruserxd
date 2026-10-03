const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
// [EDITED by student] original: const { findLast } = require('./findLast');
const { findLast } = require('../hw1.js');

describe('findLast: returns last index of y in x', () => {
  it('returns the last index when y occurs multiple times', () => {
    assert.equal(findLast([1, 2, 3, 2, 1], 2), 3);
    assert.equal(findLast([1, 2, 3, 2, 1], 1), 4);
  });

  it('returns the index when y occurs exactly once', () => {
    assert.equal(findLast([5, 6, 7], 6), 1);
  });

  it('finds y at the first position', () => {
    assert.equal(findLast([9, 1, 2, 3], 9), 0);
  });

  it('finds y at the last position', () => {
    assert.equal(findLast([1, 2, 3, 9], 9), 3);
  });

  it('returns length - 1 when every element equals y', () => {
    assert.equal(findLast([4, 4, 4, 4], 4), 3);
  });

  it('works on a single-element array', () => {
    assert.equal(findLast([42], 42), 0);
  });

  it('handles zero, negative, and fractional numbers', () => {
    assert.equal(findLast([0, 1, 0, 1], 0), 2);
    assert.equal(findLast([-1, -2, -1, 3], -1), 2);
    assert.equal(findLast([0.5, 1.5, 0.5, 2.5], 0.5), 2);
  });

  it('handles Infinity and -Infinity', () => {
    assert.equal(findLast([Infinity, 1, Infinity, 2], Infinity), 2);
    assert.equal(findLast([-Infinity, 1, -Infinity], -Infinity), 2);
  });

  it('works on a large array', () => {
    const x = new Array(100000).fill(0);
    x[12345] = 7;
    x[99998] = 7;
    assert.equal(findLast(x, 7), 99998);
  });

  it('does not modify the input array', () => {
    const x = [1, 2, 3, 2, 1];
    const copy = [...x];
    findLast(x, 2);
    assert.deepEqual(x, copy);
  });
});

describe('findLast: returns -1 when y is absent', () => {
  it('returns -1 for an empty array', () => {
    assert.equal(findLast([], 1), -1);
  });

  it('returns -1 when no element equals y', () => {
    assert.equal(findLast([1, 2, 3], 4), -1);
  });

  it('returns -1 for a single-element array that does not match', () => {
    assert.equal(findLast([1], 2), -1);
  });

  it('returns -1 when the array holds only non-number elements', () => {
    assert.equal(findLast([{}, [], null, undefined], 1), -1);
  });
});

describe('findLast: throws TypeError when x is not an array', () => {
  const notArrays = [
    ['undefined', undefined],
    ['null', null],
    ['a number', 5],
    ['a string', '1,2,3'],
    ['a boolean', true],
    ['a plain object', { 0: 1, length: 1 }],
    ['a function', () => [1]],
  ];

  for (const [label, x] of notArrays) {
    it(`throws TypeError when x is ${label}`, () => {
      assert.throws(() => findLast(x, 1), TypeError);
    });
  }
});

describe('findLast: throws TypeError when y is not a number', () => {
  const notNumbers = [
    ['undefined', undefined],
    ['null', null],
    ['a numeric string', '1'],
    ['a boolean', true],
    ['an object', {}],
    ['an array', [1]],
    ['a BigInt', 1n],
  ];

  for (const [label, y] of notNumbers) {
    it(`throws TypeError when y is ${label}`, () => {
      assert.throws(() => findLast([1, 2, 3], y), TypeError);
    });
  }

  it('throws TypeError even when the array contains a matching non-number', () => {
    assert.throws(() => findLast(['1', 1], '1'), TypeError);
  });

  it('throws TypeError for an empty array with non-number y', () => {
    assert.throws(() => findLast([], 'a'), TypeError);
  });
});

describe('findLast: throws TypeError for invalid arguments in general', () => {
  it('throws TypeError when called with no arguments', () => {
    assert.throws(() => findLast(), TypeError);
  });

  it('throws TypeError when y is omitted', () => {
    assert.throws(() => findLast([1, 2, 3]), TypeError);
  });

  it('throws TypeError when both x and y are invalid', () => {
    assert.throws(() => findLast('abc', 'a'), TypeError);
  });
});

describe('findLast: NaN is a number', () => {
  it('does not throw when y is NaN', () => {
    assert.doesNotThrow(() => findLast([1, 2, 3], NaN));
  });
});
