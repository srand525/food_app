define('ember-composable-helpers/helpers/invoke', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.invoke = invoke;


  const { all } = Ember.RSVP;

  function invoke([methodName, ...args]) {
    let obj = args.pop();

    if (Ember.isArray(obj)) {
      return function () {
        let promises = obj.map(item => Ember.tryInvoke(item, methodName, args));

        return all(promises);
      };
    }

    return function () {
      return Ember.tryInvoke(obj, methodName, args);
    };
  }

  exports.default = Ember.Helper.helper(invoke);
});