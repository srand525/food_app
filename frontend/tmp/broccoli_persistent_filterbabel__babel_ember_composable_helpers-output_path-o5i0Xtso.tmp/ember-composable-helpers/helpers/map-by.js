define('ember-composable-helpers/helpers/map-by', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([byPath, array]) {
      Ember.set(this, 'array', array);
      Ember.set(this, 'byPath', byPath);

      return Ember.get(this, 'content');
    },

    byPathDidChange: Ember.observer('byPath', function () {
      let byPath = Ember.get(this, 'byPath');

      if (Ember.isEmpty(byPath)) {
        Ember.defineProperty(this, 'content', []);
        return;
      }

      Ember.defineProperty(this, 'content', Ember.computed.mapBy('array', byPath));
    }),

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});