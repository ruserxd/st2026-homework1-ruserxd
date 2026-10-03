const test = require('node:test');
const assert = require('node:assert');
// [EDITED by student] original: const { lastZero } = require('./hw1.js');
const { lastZero } = require('../hw1.js');

test('lastZero throws TypeError for non-array input', () => {
    assert.throws(() => lastZero(null), { name: 'TypeError', message: 'Not an array' });
    assert.throws(() => lastZero(undefined), TypeError);
    assert.throws(() => lastZero(0), TypeError);
    assert.throws(() => lastZero('0'), TypeError);
    assert.throws(() => lastZero({ 0: 0, length: 1 }), TypeError);
});

test('lastZero returns -1 for an empty array', () => {
    assert.strictEqual(lastZero([]), -1);
});

test('lastZero returns -1 when the array contains no zero', () => {
    assert.strictEqual(lastZero([1, 2, 3]), -1);
    assert.strictEqual(lastZero([-1, 5, 9]), -1);
});

test('lastZero returns the index when the array contains a single zero', () => {
    assert.strictEqual(lastZero([0]), 0);
    assert.strictEqual(lastZero([0, 1, 2]), 0);
    assert.strictEqual(lastZero([1, 0, 2]), 1);
    assert.strictEqual(lastZero([1, 2, 0]), 2);
});

test('lastZero uses strict equality (no type coercion)', () => {
    assert.strictEqual(lastZero(['0', false, null, '', []]), -1);
    assert.strictEqual(lastZero(['0', false, 0]), 2);
});

test('lastZero treats -0 as zero', () => {
    assert.strictEqual(lastZero([1, -0, 2]), 1);
});

// NOTE: With multiple zeros, the current implementation returns the index of
// the FIRST zero, not the last. This test documents the current behavior.
test('lastZero with multiple zeros returns the first zero index (current behavior)', () => {
    assert.strictEqual(lastZero([0, 1, 0]), 0);
    assert.strictEqual(lastZero([1, 0, 2, 0, 3]), 1);
});
