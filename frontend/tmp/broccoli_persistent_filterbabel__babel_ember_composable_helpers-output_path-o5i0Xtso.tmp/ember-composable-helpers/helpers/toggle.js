define('ember-composable-helpers/helpers/toggle', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toggle = toggle;


  function nextIndex(length, currentIdx) {
    if (currentIdx === -1 || currentIdx + 1 === length) {
      return 0;
    }

    return currentIdx + 1;
  }

  function toggle([prop, obj, ...values]) {
    return function () {
      let currentValue = Ember.get(obj, prop);

      if (Ember.isPresent(values)) {
        let currentIdx = values.indexOf(currentValue);
        let nextIdx = nextIndex(Ember.get(values, 'length'), currentIdx);

        return Ember.set(obj, prop, values[nextIdx]);
      }

      return Ember.set(obj, prop, !currentValue);
    };
  }

  exports.default = Ember.Helper.helper(toggle);
});