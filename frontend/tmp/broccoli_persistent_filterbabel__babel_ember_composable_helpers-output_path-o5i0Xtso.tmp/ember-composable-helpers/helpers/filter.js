define('ember-composable-helpers/helpers/filter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([callback, array]) {
      Ember.set(this, 'array', array);
      Ember.set(this, 'callback', callback);

      return Ember.get(this, 'content');
    },

    callbackDidChange: Ember.observer('callback', function () {
      let callback = Ember.get(this, 'callback');

      if (Ember.isEmpty(callback)) {
        Ember.defineProperty(this, 'content', []);
        return;
      }

      let cp = Ember.computed.filter('array', callback);

      Ember.defineProperty(this, 'content', cp);
    }),

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});