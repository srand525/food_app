define('ember-composable-helpers/helpers/drop', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([dropAmount, array]) {
      Ember.set(this, 'array', array);
      return array.slice(dropAmount);
    },

    arrayContentDidChange: Ember.observer('array.[]', function () {
      this.recompute();
    })
  });
});