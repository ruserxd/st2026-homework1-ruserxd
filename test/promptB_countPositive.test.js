const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
// [EDITED by student] original: const { countPositive } = require('./countPositive');
const { countPositive } = require('../hw1.js');

describe('countPositive', () => {
  describe('returns the count of positive elements', () => {
    test('empty array returns 0', () => {
      assert.equal(countPositive([]), 0);
    });

    test('single positive element returns 1', () => {
      assert.equal(countPositive([5]), 1);
    });

    test('single negative element returns 0', () => {
      assert.equal(countPositive([-5]), 0);
    });

    test('all positive elements', () => {
      assert.equal(countPositive([1, 2, 3, 4]), 4);
    });

    test('all negative elements', () => {
      assert.equal(countPositive([-1, -2, -3]), 0);
    });

    test('mixed positive and negative elements', () => {
      assert.equal(countPositive([-4, 2, 0, 2]), 2);
    });

    test('duplicate positive values are each counted', () => {
      assert.equal(countPositive([7, 7, 7]), 3);
    });

    test('positive non-integers are counted', () => {
      assert.equal(countPositive([0.5, -0.5, 1e-10]), 2);
    });

    test('Infinity is positive, -Infinity is not', () => {
      assert.equal(countPositive([Infinity, -Infinity]), 1);
    });

    test('large array', () => {
      const x = Array.from({ length: 1000 }, (_, i) => i - 499); // -499..500
      assert.equal(countPositive(x), 500);
    });
  });

  describe('zero is not positive', () => {
    test('0 is not counted', () => {
      assert.equal(countPositive([0]), 0);
    });

    test('-0 is not counted', () => {
      assert.equal(countPositive([-0]), 0);
    });

    test('array of only zeros returns 0', () => {
      assert.equal(countPositive([0, 0, 0]), 0);
    });

    test('NaN is not counted', () => {
      assert.equal(countPositive([NaN, 1]), 1);
    });
  });

  describe('return value', () => {
    test('returns a number', () => {
      assert.equal(typeof countPositive([1, -1]), 'number');
    });

    test('does not modify the input array', () => {
      const x = [-1, 2, 0, 3];
      const copy = [...x];
      countPositive(x);
      assert.deepEqual(x, copy);
    });
  });

  describe('throws TypeError if x is not an array', () => {
    const nonArrays = [
      ['undefined', undefined],
      ['null', null],
      ['a number', 5],
      ['a string', '123'],
      ['a boolean', true],
      ['a plain object', { a: 1 }],
      ['an array-like object', { length: 2, 0: 1, 1: 2 }],
      ['a function', () => [1, 2]],
    ];

    for (const [name, value] of nonArrays) {
      test(`throws TypeError for ${name}`, () => {
        assert.throws(() => countPositive(value), TypeError);
      });
    }

    test('throws TypeError when called with no arguments', () => {
      assert.throws(() => countPositive(), TypeError);
    });
  });
});
