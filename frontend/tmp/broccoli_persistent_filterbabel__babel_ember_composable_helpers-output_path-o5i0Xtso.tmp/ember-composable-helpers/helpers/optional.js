define('ember-composable-helpers/helpers/optional', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.optional = optional;
  function optional([action]) {
    if (typeof action === 'function') {
      return action;
    }

    return i => i;
  }

  exports.default = Ember.Helper.helper(optional);
});