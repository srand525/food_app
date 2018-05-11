define('ember-composable-helpers/helpers/without', ['exports', 'ember-composable-helpers/-private/create-needle-haystack-helper', 'ember-composable-helpers/utils/includes'], function (exports, _createNeedleHaystackHelper, _includes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.without = without;


  function contains(needle, haystack) {
    return (0, _includes.default)(Ember.A(haystack), needle);
  }

  function without(needle, haystack) {
    if (!Ember.isArray(haystack)) {
      return false;
    }

    if (Ember.typeOf(needle) === 'array' && Ember.get(needle, 'length')) {
      return haystack.reduce((acc, val) => contains(val, needle) ? acc : acc.concat(val), []);
    }

    return Ember.A(haystack).without(needle);
  }

  exports.default = (0, _createNeedleHaystackHelper.default)(without);
});