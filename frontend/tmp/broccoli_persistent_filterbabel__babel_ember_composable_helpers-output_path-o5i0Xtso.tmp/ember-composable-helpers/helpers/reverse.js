define('ember-composable-helpers/helpers/reverse', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([array]) {
      if (!Ember.isArray(array)) {
        return [array];
      }

      Ember.set(this, 'array', array);
      return Ember.A(array).slice(0).reverse();
    },

    arrayContentDidChange: Ember.observer('array.[]', function () {
      this.recompute();
    })
  });
});