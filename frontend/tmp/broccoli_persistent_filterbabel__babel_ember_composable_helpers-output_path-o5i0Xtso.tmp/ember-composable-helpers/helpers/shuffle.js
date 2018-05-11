define('ember-composable-helpers/helpers/shuffle', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shuffle = shuffle;
  function shuffle(array, randomizer) {
    array = array.slice(0);
    let count = Ember.get(array, 'length');
    let rand, temp;
    randomizer = Ember.typeOf(randomizer) === 'function' && randomizer || Math.random;

    while (count > 1) {
      rand = Math.floor(randomizer() * count--);

      temp = array[count];
      array[count] = array[rand];
      array[rand] = temp;
    }
    return array;
  }

  exports.default = Ember.Helper.extend({
    compute([random, array]) {
      if (array === undefined) {
        array = random;
        random = undefined;
      }

      if (!Ember.isArray(array)) {
        return Ember.A([array]);
      }

      Ember.set(this, 'array', array);
      return shuffle(array, random);
    },

    arrayContentDidChange: Ember.observer('array.[]', function () {
      this.recompute();
    })
  });
});