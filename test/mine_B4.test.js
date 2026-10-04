const { test } = require('node:test');
const assert = require('node:assert/strict');
const { oddOrPos } = require('../hw1.js');

const cases = [
  { x: [], v: -1 },
  { x: [2, 4, 6], v: -3 },
  { x: [1, 3, 5], v: 4},
  { x: [0, 5, 6], v: 0}
];

for (const { x, v } of cases) {
  test(`append ${v} to ${JSON.stringify(x)}`, () => {
    const before = oddOrPos(x);
    const after = oddOrPos([...x, v]);
    const delta = (Math.abs(v % 2) === 1) || v > 0;
    
    assert.equal(after, before + delta);
  });
}