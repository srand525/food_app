define('ember-composable-helpers/utils/is-object', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isObject;
  function isObject(val) {
    return Ember.typeOf(val) === 'object' || Ember.typeOf(val) === 'instance';
  }
});