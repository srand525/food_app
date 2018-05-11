define('ember-models-table/helpers/is-equal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isEqual = isEqual;
  function isEqual([left, right, type] /*, hash*/) {
    if (type === 'number') {
      return Number(left) === Number(right);
    }
    return left === right;
  }

  exports.default = Ember.Helper.helper(isEqual);
});