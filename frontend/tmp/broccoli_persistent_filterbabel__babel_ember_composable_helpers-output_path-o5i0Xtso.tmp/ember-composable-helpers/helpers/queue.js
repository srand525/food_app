define('ember-composable-helpers/helpers/queue', ['exports', 'ember-composable-helpers/utils/is-promise'], function (exports, _isPromise) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.queue = queue;
  function queue(actions = []) {
    return function (...args) {
      let invokeWithArgs = function (acc, curr) {
        if ((0, _isPromise.default)(acc)) {
          return acc.then(() => curr(...args));
        }

        return curr(...args);
      };

      return actions.reduce((acc, curr, idx) => {
        if (idx === 0) {
          return curr(...args);
        }

        return invokeWithArgs(acc, curr);
      }, undefined);
    };
  }

  exports.default = Ember.Helper.helper(queue);
});