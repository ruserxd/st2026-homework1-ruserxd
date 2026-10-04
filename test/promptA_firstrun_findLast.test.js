const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
// [EDITED by student] original: const { findLast } = require('./hw1.js');
const { findLast } = require('../hw1.js');

describe('findLast', () => {
    test('returns index of a single match in the middle', () => {
        assert.equal(findLast([2, 3, 5], 3), 1);
    });

    test('returns index when match is the last element', () => {
        assert.equal(findLast([2, 3, 5], 5), 2);
    });

    test('returns 0 when match is only at the first element', () => {
        assert.equal(findLast([2, 3, 5], 2), 0);
    });

    test('returns 0 for a single-element array that matches', () => {
        assert.equal(findLast([7], 7), 0);
    });

    test('returns the last index when value appears multiple times', () => {
        assert.equal(findLast([1, 4, 1, 4, 1], 4), 3);
        assert.equal(findLast([1, 4, 1, 4, 1], 1), 4);
    });

    test('returns -1 when value is absent', () => {
        assert.equal(findLast([2, 3, 5], 4), -1);
    });

    test('returns -1 for an empty array', () => {
        assert.equal(findLast([], 1), -1);
    });

    test('uses strict equality (no type coercion)', () => {
        assert.equal(findLast(['1', 1, '1'], 1), 1);
        assert.equal(findLast(['3'], 3), -1);
    });

    test('handles negative numbers and zero', () => {
        assert.equal(findLast([-1, 0, -1], -1), 2);
        assert.equal(findLast([0, 5, 6], 0), 0);
    });

    test('returns -1 when searching for NaN', () => {
        assert.equal(findLast([NaN, 1, NaN], NaN), -1);
    });

    test('throws TypeError when first argument is not an array', () => {
        for (const bad of [null, undefined, 42, 'abc', { length: 1, 0: 1 }]) {
            assert.throws(() => findLast(bad, 1), {
                name: 'TypeError',
                message: 'The first parameter must be an array',
            });
        }
    });

    test('throws TypeError when second argument is not a number', () => {
        for (const bad of ['1', null, undefined, {}, [1]]) {
            assert.throws(() => findLast([1, 2], bad), {
                name: 'TypeError',
                message: 'The second parameter must be a number',
            });
        }
    });

    test('checks the array argument before the number argument', () => {
        assert.throws(() => findLast('not array', 'not number'), {
            message: 'The first parameter must be an array',
        });
    });
});
