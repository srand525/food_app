define('ember-composable-helpers/helpers/next', ['exports', 'ember-composable-helpers/utils/get-index', 'ember-composable-helpers/-private/create-needle-haystack-helper'], function (exports, _getIndex, _createNeedleHaystackHelper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.next = next;
  function next(currentValue, array, useDeepEqual = false) {
    let currentIndex = (0, _getIndex.default)(array, currentValue, useDeepEqual);
    let lastIndex = Ember.get(array, 'length') - 1;

    if (Ember.isEmpty(currentIndex)) {
      return;
    }

    return currentIndex === lastIndex ? currentValue : Ember.A(array).objectAt(currentIndex + 1);
  }

  exports.default = (0, _createNeedleHaystackHelper.default)(next);
});