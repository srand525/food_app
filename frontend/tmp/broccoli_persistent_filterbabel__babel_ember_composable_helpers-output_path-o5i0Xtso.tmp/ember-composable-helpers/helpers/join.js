define('ember-composable-helpers/helpers/join', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([separator, array]) {
      if (Ember.isArray(separator)) {
        array = separator;
        separator = ',';
      }

      Ember.set(this, 'array', array);
      return array.join(separator);
    },

    arrayContentDidChange: Ember.observer('array.[]', function () {
      this.recompute();
    })
  });
});