'use strict';
require('../../modules/es.array.iterator');
require('../../modules/es.string.iterator');
require('../../modules/es.weak-set');
require('../../modules/esnext.weak-set.from');
require('../../modules/web.dom-collections.iterator');
var isCallable = require('../../internals/is-callable');
var path = require('../../internals/path');

var WeakSet = path.WeakSet;
var weakSetfrom = WeakSet.from;

module.exports = function from(source, mapFn, thisArg) {
  return weakSetfrom.call(isCallable(this) ? this : WeakSet, source, mapFn, thisArg);
};
