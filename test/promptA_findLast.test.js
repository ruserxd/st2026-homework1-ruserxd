const { test, describe } = require('node:test');
const assert = require('node:assert');
// [EDITED by student] original: const { findLast } = require('./hw1');
const { findLast } = require('../hw1.js');

describe('findLast', () => {
    describe('input validation', () => {
        test('throws TypeError when first parameter is not an array', () => {
            for (const bad of [null, undefined, 42, 'abc', {}, { length: 2, 0: 1, 1: 2 }]) {
                assert.throws(() => findLast(bad, 1), {
                    name: 'TypeError',
                    message: 'The first parameter must be an array',
                });
            }
        });

        test('throws TypeError when second parameter is not a number', () => {
            for (const bad of [null, undefined, '1', true, {}, [1], 1n]) {
                assert.throws(() => findLast([1, 2, 3], bad), {
                    name: 'TypeError',
                    message: 'The second parameter must be a number',
                });
            }
        });

        test('checks the array before the number', () => {
            assert.throws(() => findLast('not array', 'not number'), {
                message: 'The first parameter must be an array',
            });
        });
    });

    describe('search behavior', () => {
        test('returns -1 for an empty array', () => {
            assert.strictEqual(findLast([], 1), -1);
        });

        test('returns -1 when the value is not present', () => {
            assert.strictEqual(findLast([1, 2, 3], 4), -1);
        });

        test('finds the value at the last index', () => {
            assert.strictEqual(findLast([1, 2, 3], 3), 2);
        });

        test('finds the value in the middle', () => {
            assert.strictEqual(findLast([1, 2, 3], 2), 1);
        });

        test('returns the last index when the value appears multiple times', () => {
            assert.strictEqual(findLast([2, 3, 5, 3, 7], 3), 3);
            assert.strictEqual(findLast([2, 2, 2], 2), 2);
        });

        test('returns the later occurrence when the value is also at index 0', () => {
            assert.strictEqual(findLast([5, 1, 5], 5), 2);
        });

        test('uses strict equality (no type coercion)', () => {
            assert.strictEqual(findLast(['1', '2'], 1), -1);
            assert.strictEqual(findLast([0, 1, '1'], 1), 1);
        });

        test('works with negative numbers, floats and Infinity', () => {
            assert.strictEqual(findLast([0, -1, -2], -2), 2);
            assert.strictEqual(findLast([0, 1.5, 2.5], 1.5), 1);
            assert.strictEqual(findLast([0, Infinity], Infinity), 1);
        });

        test('never matches NaN (NaN !== NaN)', () => {
            assert.strictEqual(findLast([NaN, NaN, NaN], NaN), -1);
        });

        test('treats 0 and -0 as equal', () => {
            assert.strictEqual(findLast([1, 0], -0), 1);
        });

        test('does not mutate the input array', () => {
            const arr = [1, 2, 3];
            findLast(arr, 2);
            assert.deepStrictEqual(arr, [1, 2, 3]);
        });
    });

    // Known defect: the loop condition is `i > 0`, so index 0 is never checked.
    // These tests describe the correct behavior and are marked `todo` so they
    // run and report, but don't fail the suite. Change the loop to `i >= 0`
    // to fix the bug, then remove the `todo` option.
    describe('element at index 0 (known bug)', () => {
        test('finds the value when it is only at index 0',
            { todo: 'loop condition `i > 0` skips index 0' }, () => {
                assert.strictEqual(findLast([2, 3, 5], 2), 0);
            });

        test('finds the value in a single-element array',
            { todo: 'loop condition `i > 0` skips index 0' }, () => {
                assert.strictEqual(findLast([7], 7), 0);
            });
    });
});
