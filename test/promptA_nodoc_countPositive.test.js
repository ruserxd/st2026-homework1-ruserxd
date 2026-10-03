const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
// [EDITED by student] original: const { countPositive } = require('./hw1.js');
const { countPositive } = require('../hw1.js');

describe('countPositive', () => {
    describe('input validation', () => {
        test('throws TypeError for non-array inputs', () => {
            for (const input of [undefined, null, 42, 'abc', {}, { length: 2, 0: 1, 1: 2 }]) {
                assert.throws(() => countPositive(input), {
                    name: 'TypeError',
                    message: 'Not an array',
                });
            }
        });
    });

    describe('counting', () => {
        test('returns 0 for an empty array', () => {
            assert.equal(countPositive([]), 0);
        });

        test('counts all elements when every element is positive', () => {
            assert.equal(countPositive([1, 2, 3, 4]), 4);
        });

        test('returns 0 when every element is negative', () => {
            assert.equal(countPositive([-1, -2, -3]), 0);
        });

        test('counts only the non-negative elements in a mixed array', () => {
            assert.equal(countPositive([-4, 2, 0, 2]), 3);
        });

        test('counts 0 (current behavior: condition is x[i] >= 0)', () => {
            assert.equal(countPositive([0]), 1);
            assert.equal(countPositive([0, 0, 0]), 3);
        });

        test('counts -0 since -0 >= 0', () => {
            assert.equal(countPositive([-0]), 1);
        });

        test('handles single-element arrays', () => {
            assert.equal(countPositive([5]), 1);
            assert.equal(countPositive([-5]), 0);
        });

        test('handles non-integer and extreme numeric values', () => {
            assert.equal(countPositive([0.1, -0.1]), 1);
            assert.equal(countPositive([Infinity, -Infinity]), 1);
            assert.equal(countPositive([Number.MAX_VALUE, Number.MIN_VALUE, -Number.MIN_VALUE]), 2);
        });

        test('does not count NaN', () => {
            assert.equal(countPositive([NaN, 1]), 1);
        });

        test('does not mutate the input array', () => {
            const input = [-1, 0, 1];
            countPositive(input);
            assert.deepEqual(input, [-1, 0, 1]);
        });
    });
});
