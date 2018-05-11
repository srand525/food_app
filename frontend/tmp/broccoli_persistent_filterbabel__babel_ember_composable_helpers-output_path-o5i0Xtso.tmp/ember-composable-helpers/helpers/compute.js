define('ember-composable-helpers/helpers/compute', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.compute = compute;
  function compute([action, ...params]) {
    return action(...params);
  }

  exports.default = Ember.Helper.helper(compute);
});