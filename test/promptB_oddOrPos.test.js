const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

// [EDITED by student] original: const { oddOrPos } = require('./oddOrPos.js');
const { oddOrPos } = require('../hw1.js');

describe('oddOrPos', () => {
  describe('returns a count', () => {
    it('returns 0 for an empty array', () => {
      assert.equal(oddOrPos([]), 0);
    });

    it('returns a number', () => {
      assert.equal(typeof oddOrPos([1, 2, 3]), 'number');
    });
  });

  describe('positive values', () => {
    it('counts positive odd values', () => {
      assert.equal(oddOrPos([1, 3, 5]), 3);
    });

    it('counts positive even values (positive is enough)', () => {
      assert.equal(oddOrPos([2, 4, 6]), 3);
    });

    it('counts a single positive value', () => {
      assert.equal(oddOrPos([42]), 1);
    });

    it('counts positive non-integers', () => {
      assert.equal(oddOrPos([0.5, 2.5]), 2);
    });
  });

  describe('negative values', () => {
    it('counts negative odd values (odd is enough)', () => {
      assert.equal(oddOrPos([-1, -3, -5]), 3);
    });

    it('counts a single negative odd value', () => {
      assert.equal(oddOrPos([-7]), 1);
    });

    it('does not count negative even values', () => {
      assert.equal(oddOrPos([-2, -4, -6]), 0);
    });

    it('does not count negative non-integers', () => {
      assert.equal(oddOrPos([-0.5, -1.5]), 0);
    });
  });

  describe('zero', () => {
    it('does not count zero (neither odd nor positive)', () => {
      assert.equal(oddOrPos([0]), 0);
    });

    it('does not count repeated zeros', () => {
      assert.equal(oddOrPos([0, 0, 0]), 0);
    });

    it('does not count negative zero', () => {
      assert.equal(oddOrPos([-0]), 0);
    });
  });

  describe('mixed arrays', () => {
    it('counts each element that is odd or positive exactly once', () => {
      // -3 (odd), 1 (odd and positive), 2 (positive)
      assert.equal(oddOrPos([-3, -2, 0, 1, 2]), 3);
    });

    it('counts duplicates individually', () => {
      assert.equal(oddOrPos([-1, -1, 2, 2, -2, 0]), 4);
    });

    it('handles large magnitudes', () => {
      assert.equal(
        oddOrPos([Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, -1e6]),
        2,
      );
    });

    it('handles long arrays', () => {
      const x = [];
      for (let i = -500; i <= 500; i++) x.push(i);
      // 500 positives + 250 negative odds (-1, -3, ..., -499)
      assert.equal(oddOrPos(x), 750);
    });
  });

  describe('input is not modified', () => {
    it('does not mutate the array', () => {
      const x = [-3, -2, 0, 1, 2];
      oddOrPos(x);
      assert.deepEqual(x, [-3, -2, 0, 1, 2]);
    });
  });

  describe('throws TypeError when x is not an array', () => {
    const nonArrays = [
      ['undefined', undefined],
      ['null', null],
      ['a number', 5],
      ['a string', '1,2,3'],
      ['a boolean', true],
      ['a plain object', { 0: 1, 1: 2 }],
      ['an array-like object', { length: 2, 0: 1, 1: 2 }],
      ['a Set', new Set([1, 2])],
      ['a function', () => [1, 2]],
    ];

    for (const [label, value] of nonArrays) {
      it(`throws TypeError for ${label}`, () => {
        assert.throws(() => oddOrPos(value), TypeError);
      });
    }

    it('throws TypeError when called with no arguments', () => {
      assert.throws(() => oddOrPos(), TypeError);
    });
  });
});
