define('ember-models-table/utils/better-compare', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = betterCompare;


  /**
   * This is a better version of Ember.compare.
   * Sadly, Ember.compare() will always return 0 when comparing two instances of JavaScript objects that do not
   * implement the Comparable-mixin.
   * This function will compare instances via their `valueOf()` method if available.
   *
   * @param {Mixed} v
   * @param {Mixed} w
   * @returns {number}
   */
  function betterCompare(v, w) {
    let type1 = Ember.typeOf(v);
    let type2 = Ember.typeOf(w);

    if (type1 === 'instance' && type2 === 'instance' || type1 === 'object' && type2 === 'object') {
      if (Ember.typeOf(v.compare) === 'function' && Ember.typeOf(w.compare) === 'function') {
        return v.compare(v, w);
      }
      if (Ember.typeOf(v.valueOf) === 'function' && Ember.typeOf(w.valueOf) === 'function') {
        return Ember.compare(v.valueOf(), w.valueOf());
      }
    }

    return Ember.compare(v, w);
  }
});