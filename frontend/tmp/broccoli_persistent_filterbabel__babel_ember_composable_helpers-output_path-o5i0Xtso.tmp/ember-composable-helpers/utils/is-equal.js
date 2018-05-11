define('ember-composable-helpers/utils/is-equal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isEqual;
  function isEqual(firstValue, secondValue, useDeepEqual = false) {
    if (useDeepEqual) {
      return JSON.stringify(firstValue) === JSON.stringify(secondValue);
    } else {
      return Ember.isEqual(firstValue, secondValue) || Ember.isEqual(secondValue, firstValue);
    }
  }
});