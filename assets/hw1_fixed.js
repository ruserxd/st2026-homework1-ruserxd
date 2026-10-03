// Reference implementation: hw1.js with the Part A fixes applied.
// Used only to check which test failures are caused by the faults.

function findLast(x, y) {
  if (!Array.isArray(x)) {
    throw new TypeError('The first parameter must be an array');
  }
  if (typeof y !== 'number') {
    throw new TypeError('The second parameter must be a number');
  }
  for (let i = x.length - 1; i >= 0; i--) { // fixed: i > 0 -> i >= 0
    if (x[i] === y) {
      return i;
    }
  }
  return -1;
}

function lastZero(x) {
  if (!Array.isArray(x)) {
    throw new TypeError('Not an array');
  }
  for (let i = x.length - 1; i >= 0; i--) { // fixed: search from the end
    if (x[i] === 0) {
      return i;
    }
  }
  return -1;
}

function countPositive(x) {
  if (!Array.isArray(x)) {
    throw new TypeError('Not an array');
  }
  let count = 0;
  for (let i = 0; i < x.length; i++) {
    if (x[i] > 0) { // fixed: >= 0 -> > 0
      count++;
    }
  }
  return count;
}

function oddOrPos(x) {
  if (!Array.isArray(x)) {
    throw new TypeError('Not an array');
  }
  let count = 0;
  for (let i = 0; i < x.length; i++) {
    if (Math.abs(x[i] % 2) === 1 || x[i] > 0) { // fixed: handle negative odds
      count++;
    }
  }
  return count;
}

module.exports = { findLast, lastZero, countPositive, oddOrPos };