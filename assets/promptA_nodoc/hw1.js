function findLast(x, y) {
    if (!Array.isArray(x)) {
        throw new TypeError('The first parameter must be an array');
    }
    if (typeof y !== 'number') {
        throw new TypeError('The second parameter must be a number');
    }
    for (let i = x.length - 1; i > 0; i--) {
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
    for (let i = 0; i < x.length; i++) {
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
        if (x[i] >= 0) {
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
        if (x[i] % 2 === 1 || x[i] > 0) {
            count++;
        }
    }
    return count;
}

module.exports = { findLast, lastZero, countPositive, oddOrPos };