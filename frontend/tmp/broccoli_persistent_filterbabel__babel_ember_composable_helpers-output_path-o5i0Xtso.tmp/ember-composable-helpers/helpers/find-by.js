define('ember-composable-helpers/helpers/find-by', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([byPath, value, array]) {
      Ember.set(this, 'array', array);
      Ember.set(this, 'byPath', byPath);
      Ember.set(this, 'value', value);

      return Ember.get(this, 'content');
    },

    byPathDidChange: Ember.observer('byPath', function () {
      let byPath = Ember.get(this, 'byPath');

      if (Ember.isEmpty(byPath)) {
        Ember.defineProperty(this, 'content', []);
        return;
      }

      Ember.defineProperty(this, 'content', Ember.computed(`array.@each.${byPath}`, 'value', function () {
        let array = Ember.get(this, 'array');
        let value = Ember.get(this, 'value');

        return Ember.A(array).findBy(byPath, value);
      }));
    }),

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});