define('ember-composable-helpers/-private/create-multi-array-helper', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (multiArrayComputed) {
    return Ember.Helper.extend({
      compute([...arrays]) {
        Ember.set(this, 'arrays', arrays.map(obj => {
          if (Ember.isArray(obj)) {
            return Ember.A(obj);
          }

          return obj;
        }));

        return Ember.get(this, 'content');
      },

      valuesDidChange: Ember.observer('arrays.[]', function () {
        this._recomputeArrayKeys();

        let arrays = Ember.get(this, 'arrays');
        let arrayKeys = Ember.get(this, 'arrayKeys');

        if (Ember.isEmpty(arrays)) {
          Ember.defineProperty(this, 'content', []);
          return;
        }

        Ember.defineProperty(this, 'content', multiArrayComputed(...arrayKeys));
      }),

      contentDidChange: Ember.observer('content.[]', function () {
        this.recompute();
      }),

      _recomputeArrayKeys() {
        let arrays = Ember.get(this, 'arrays');

        let oldArrayKeys = Ember.get(this, 'arrayKeys') || [];
        let newArrayKeys = arrays.map(idForArray);

        let keysToRemove = oldArrayKeys.filter(key => {
          return newArrayKeys.indexOf(key) === -1;
        });

        keysToRemove.forEach(key => Ember.set(this, key, null));
        arrays.forEach(array => Ember.set(this, idForArray(array), array));

        Ember.set(this, 'arrayKeys', newArrayKeys);
      }
    });
  };

  const idForArray = array => `__array-${Ember.guidFor(array)}`;
});