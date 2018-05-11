define('ember-composable-helpers/helpers/compact', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([array]) {
      if (!Ember.isArray(array)) {
        return Ember.A([array]);
      }

      Ember.set(this, 'array', array);

      return Ember.get(this, 'content');
    },

    content: Ember.computed.filter('array', Ember.isPresent),

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});