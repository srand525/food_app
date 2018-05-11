define('ember-composable-helpers/helpers/take', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([takeAmount, array]) {
      Ember.set(this, 'array', array);
      return array.slice(0, takeAmount);
    },

    arrayContentDidChange: Ember.observer('array.[]', function () {
      this.recompute();
    })
  });
});