const { describe, test } = require('node:test');
const assert = require('node:assert/strict');

// Accept either `module.exports = lastZero` or `module.exports = { lastZero }`.
// [EDITED by student] original: const mod = require('./lastZero.js');
const mod = require('../hw1.js');
const lastZero = typeof mod === 'function' ? mod : mod.lastZero;

describe('lastZero: returns -1 when 0 is absent', () => {
  test('empty array', () => {
    assert.equal(lastZero([]), -1);
  });

  test('single non-zero element', () => {
    assert.equal(lastZero([5]), -1);
  });

  test('several non-zero numbers', () => {
    assert.equal(lastZero([1, 2, 3, -1, 0.5]), -1);
  });

  test('values that are only loosely equal to 0 do not count', () => {
    assert.equal(lastZero(['0', false, null, '', [], undefined]), -1);
  });

  test('NaN is not 0', () => {
    assert.equal(lastZero([NaN, NaN]), -1);
  });

  test('holes in a sparse array are not 0', () => {
    assert.equal(lastZero(new Array(5)), -1);
  });
});

describe('lastZero: returns the last index of 0', () => {
  test('single element that is 0', () => {
    assert.equal(lastZero([0]), 0);
  });

  test('0 only at the first position', () => {
    assert.equal(lastZero([0, 1, 2, 3]), 0);
  });

  test('0 only at the last position', () => {
    assert.equal(lastZero([1, 2, 3, 0]), 3);
  });

  test('0 in the middle', () => {
    assert.equal(lastZero([1, 0, 2]), 1);
  });

  test('multiple zeros returns the last one, not the first', () => {
    assert.equal(lastZero([0, 1, 0, 2]), 2);
  });

  test('array of all zeros', () => {
    assert.equal(lastZero([0, 0, 0, 0]), 3);
  });

  test('0 mixed with loosely-equal values picks the real 0', () => {
    assert.equal(lastZero([0, '0', false, null]), 0);
  });

  test('-0 is treated as 0', () => {
    assert.equal(lastZero([1, -0, 2]), 1);
  });

  test('works with objects and other types in the array', () => {
    assert.equal(lastZero([{}, 0, 'a', { v: 0 }, [0]]), 1);
  });

  test('sparse array with a 0 after holes', () => {
    const x = new Array(5);
    x[3] = 0;
    assert.equal(lastZero(x), 3);
  });

  test('large array', () => {
    const x = new Array(100000).fill(1);
    x[42] = 0;
    x[99998] = 0;
    assert.equal(lastZero(x), 99998);
  });

  test('does not modify the input array', () => {
    const x = [0, 1, 0, 2];
    lastZero(x);
    assert.deepEqual(x, [0, 1, 0, 2]);
  });
});

describe('lastZero: throws TypeError when x is not an array', () => {
  const nonArrays = [
    ['undefined', undefined],
    ['null', null],
    ['number 0', 0],
    ['number', 42],
    ['string "0"', '0'],
    ['string', 'abc'],
    ['boolean', true],
    ['plain object', {}],
    ['array-like object', { length: 2, 0: 1, 1: 0 }],
    ['function', () => [0]],
    ['Set', new Set([0])],
  ];

  for (const [label, value] of nonArrays) {
    test(label, () => {
      assert.throws(() => lastZero(value), TypeError);
    });
  }

  test('no argument', () => {
    assert.throws(() => lastZero(), TypeError);
  });
});
