// 把 require('../hw1.js') 導向 assets/hw1_fixed.js，不修改任何測試檔
const Module = require('module');
const path = require('path');
const FAULTY = path.resolve(__dirname, '..', 'hw1.js');
const FIXED = path.resolve(__dirname, 'hw1_fixed.js');
const original = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  const resolved = original.call(this, request, parent, ...rest);
  return resolved === FAULTY ? FIXED : resolved;
};
