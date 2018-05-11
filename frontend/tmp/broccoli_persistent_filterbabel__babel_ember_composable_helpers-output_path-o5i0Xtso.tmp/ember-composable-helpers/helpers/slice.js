define('ember-composable-helpers/helpers/slice', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([start, end, array]) {
      Ember.set(this, 'array', array);
      return array.slice(start, end);
    },

    arrayContentDidChange: Ember.observer('array.[]', function () {
      this.recompute();
    })
  });
});