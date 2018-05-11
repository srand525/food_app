define('ember-composable-helpers/helpers/reduce', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([callback, initialValue, array]) {
      Ember.set(this, 'callback', callback);
      Ember.set(this, 'array', array);
      Ember.set(this, 'initialValue', initialValue);

      return Ember.get(this, 'content');
    },

    callbackDidChange: Ember.observer('callback', 'initialValue', function () {
      let callback = Ember.get(this, 'callback');
      let initialValue = Ember.get(this, 'initialValue');

      if (Ember.isEmpty(callback)) {
        Ember.defineProperty(this, 'content', []);
        return;
      }

      let cp = Ember.computed('array.[]', () => {
        let array = Ember.get(this, 'array');
        return array.reduce(callback, initialValue);
      });

      Ember.defineProperty(this, 'content', cp);
    }),

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});