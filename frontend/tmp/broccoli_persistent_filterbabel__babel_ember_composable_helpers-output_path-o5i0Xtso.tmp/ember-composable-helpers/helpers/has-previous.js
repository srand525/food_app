define('ember-composable-helpers/helpers/has-previous', ['exports', 'ember-composable-helpers/helpers/previous', 'ember-composable-helpers/-private/create-needle-haystack-helper', 'ember-composable-helpers/utils/is-equal'], function (exports, _previous, _createNeedleHaystackHelper, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.hasPrevious = hasPrevious;
  function hasPrevious(currentValue, array, useDeepEqual = false) {
    let previousValue = (0, _previous.previous)(currentValue, array, useDeepEqual);
    let isNotSameValue = !(0, _isEqual.default)(previousValue, currentValue, useDeepEqual);

    return isNotSameValue && Ember.isPresent(previousValue);
  }

  exports.default = (0, _createNeedleHaystackHelper.default)(hasPrevious);
});