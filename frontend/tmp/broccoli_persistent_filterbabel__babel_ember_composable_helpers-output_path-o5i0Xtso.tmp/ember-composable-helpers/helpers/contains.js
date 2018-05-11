define('ember-composable-helpers/helpers/contains', ['exports', 'ember-composable-helpers/-private/create-needle-haystack-helper', 'ember-composable-helpers/utils/includes'], function (exports, _createNeedleHaystackHelper, _includes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.contains = contains;


  function _contains(needle, haystack) {
    return (0, _includes.default)(Ember.A(haystack), needle);
  }

  function contains(needle, haystack) {
    if (!Ember.isArray(haystack)) {
      return false;
    }

    if (Ember.isArray(needle) && Ember.get(needle, 'length')) {
      return needle.reduce((acc, val) => acc && _contains(val, haystack), true);
    }

    return _contains(needle, haystack);
  }

  exports.default = (0, _createNeedleHaystackHelper.default)(contains);
});