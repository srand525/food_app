define('ember-composable-helpers/helpers/chunk', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.chunk = chunk;


  const { max, ceil } = Math;

  function chunk(num, array) {
    let integer = parseInt(num, 10);
    let size = max(integer, 0);

    let length = 0;
    if (Ember.isArray(array)) {
      length = Ember.get(array, 'length');
    }

    if (!length || size < 1) {
      return [];
    } else {
      let index = 0;
      let resultIndex = -1;
      let result = new Array(ceil(length / size));

      while (index < length) {
        result[++resultIndex] = array.slice(index, index += size);
      }

      return result;
    }
  }

  exports.default = Ember.Helper.extend({
    content: Ember.computed('num', 'array.[]', function () {
      let array = Ember.get(this, 'array');
      let num = Ember.get(this, 'num');

      return chunk(num, array);
    }),

    compute([num, array]) {
      Ember.set(this, 'array', array);
      Ember.set(this, 'num', num);

      return Ember.get(this, 'content');
    },

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});