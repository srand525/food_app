define('ember-models-table/helpers/and', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.and = and;
  function and(params /*, hash*/) {
    for (let i = 0, len = params.length; i < len; i++) {
      if (!params[i]) {
        return false;
      }
    }
    return true;
  }

  exports.default = Ember.Helper.helper(and);
});