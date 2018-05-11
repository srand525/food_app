define('ember-composable-helpers/helpers/array', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.array = array;
  function array(params = []) {
    // slice params to avoid mutating the provided params
    return Ember.A(params.slice());
  }

  exports.default = Ember.Helper.helper(array);
});