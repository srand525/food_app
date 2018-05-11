define('ember-composable-helpers/helpers/previous', ['exports', 'ember-composable-helpers/utils/get-index', 'ember-composable-helpers/-private/create-needle-haystack-helper'], function (exports, _getIndex, _createNeedleHaystackHelper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.previous = previous;
  function previous(currentValue, array, useDeepEqual = false) {
    let currentIndex = (0, _getIndex.default)(array, currentValue, useDeepEqual);

    if (Ember.isEmpty(currentIndex)) {
      return;
    }

    return currentIndex === 0 ? currentValue : Ember.A(array).objectAt(currentIndex - 1);
  }

  exports.default = (0, _createNeedleHaystackHelper.default)(previous);
});