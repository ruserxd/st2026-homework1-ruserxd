// [HAND-WRITTEN] B2(a): the fault is reached, the state is infected and the
// wrong count reaches the return value, but the assertion never checks it.
const test = require('node:test');
const assert = require('node:assert');
const { oddOrPos } = require('../hw1.js');

test('oddOrPos returns an integer count', () => {
    const r = oddOrPos([-3, -2, 0, 1, 4]);
    assert.ok(Number.isInteger(r));
});
