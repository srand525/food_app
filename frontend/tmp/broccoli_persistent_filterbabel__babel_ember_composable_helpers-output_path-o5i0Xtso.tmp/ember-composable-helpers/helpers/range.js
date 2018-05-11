define('ember-composable-helpers/helpers/range', ['exports', 'ember-composable-helpers/utils/comparison'], function (exports, _comparison) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.range = range;
  function range([min, max, isInclusive]) {
    isInclusive = Ember.typeOf(isInclusive) === 'boolean' ? isInclusive : false;
    let numbers = [];

    if (min < max) {
      let testFn = isInclusive ? _comparison.lte : _comparison.lt;
      for (let i = min; testFn(i, max); i++) {
        numbers.push(i);
      }
    }

    if (min > max) {
      let testFn = isInclusive ? _comparison.gte : _comparison.gt;
      for (let i = min; testFn(i, max); i--) {
        numbers.push(i);
      }
    }

    return numbers;
  }

  exports.default = Ember.Helper.helper(range);
});