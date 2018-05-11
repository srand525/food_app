define('ember-composable-helpers/helpers/pipe', ['exports', 'ember-composable-helpers/utils/is-promise'], function (exports, _isPromise) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.invokeFunction = invokeFunction;
  exports.pipe = pipe;
  function invokeFunction(acc, curr) {
    if ((0, _isPromise.default)(acc)) {
      return acc.then(curr);
    }

    return curr(acc);
  }

  function pipe(actions = []) {
    return function (...args) {
      return actions.reduce((acc, curr, idx) => {
        if (idx === 0) {
          return curr(...args);
        }

        return invokeFunction(acc, curr);
      }, undefined);
    };
  }

  exports.default = Ember.Helper.helper(pipe);
});