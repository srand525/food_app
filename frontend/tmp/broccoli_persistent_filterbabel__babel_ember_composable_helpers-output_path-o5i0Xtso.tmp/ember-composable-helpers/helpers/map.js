define('ember-composable-helpers/helpers/map', ['exports'], function (exports) {
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

    byPathDidChange: Ember.observer('callback', function () {
      let callback = Ember.get(this, 'callback');

      if (Ember.isEmpty(callback)) {
        Ember.defineProperty(this, 'content', []);
        return;
      }

      Ember.defineProperty(this, 'content', Ember.computed.map('array', callback));
    }),

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});