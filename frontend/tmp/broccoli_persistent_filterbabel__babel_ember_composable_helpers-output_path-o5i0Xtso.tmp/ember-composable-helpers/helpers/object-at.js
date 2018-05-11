define('ember-composable-helpers/helpers/object-at', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.objectAt = objectAt;
  function objectAt(index, array) {
    if (!Ember.isArray(array)) {
      return undefined;
    }

    index = parseInt(index, 10);

    return Ember.A(array).objectAt(index);
  }

  exports.default = Ember.Helper.extend({
    content: Ember.computed('index', 'array.[]', function () {
      let index = Ember.get(this, 'index');
      let array = Ember.get(this, 'array');

      return objectAt(index, array);
    }),

    compute([index, array]) {
      Ember.set(this, 'index', index);
      Ember.set(this, 'array', array);

      return Ember.get(this, 'content');
    },

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});