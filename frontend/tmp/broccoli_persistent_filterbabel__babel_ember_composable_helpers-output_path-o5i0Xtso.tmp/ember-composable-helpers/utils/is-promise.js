define('ember-composable-helpers/utils/is-promise', ['exports', 'ember-composable-helpers/utils/is-object'], function (exports, _isObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isPromise;


  function isPromiseLike(obj = {}) {
    return Ember.typeOf(obj.then) === 'function' && Ember.typeOf(obj.catch) === 'function';
  }

  function isPromise(obj) {
    return (0, _isObject.default)(obj) && isPromiseLike(obj);
  }
});