define('ember-composable-helpers/helpers/flatten', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flatten = flatten;
  function flatten(array) {
    if (!Ember.isArray(array)) {
      return array;
    }

    return array.reduce((flattened, el) => {
      return flattened.concat(flatten(el));
    }, []);
  }

  exports.default = Ember.Helper.extend({
    compute([array]) {
      Ember.set(this, 'array', array);

      return flatten(array);
    },

    arrayContentDidChange: Ember.observer('array.[]', function () {
      this.recompute();
    })
  });
});