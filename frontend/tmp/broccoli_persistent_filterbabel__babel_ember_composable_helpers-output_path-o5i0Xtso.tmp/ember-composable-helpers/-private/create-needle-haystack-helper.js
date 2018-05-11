define('ember-composable-helpers/-private/create-needle-haystack-helper', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createNeedleHaystackHelper;


  const K = () => {};

  /**
   * Creates a generic Helper class implementation that expects a `needle` and
   * `haystack` as arguments. A `fn` function is required to be passed in
   * that is invoked with the `needle` and `haystack` arguments.
   *
   * @private
   * @param  {Function} fn A function to run against the needle and haystack
   * @return {Any}
   */
  function createNeedleHaystackHelper(fn = K) {
    return Ember.Helper.extend({
      content: Ember.computed('needle.[]', 'haystack.[]', 'option', function () {
        let needle = Ember.get(this, 'needle');
        let haystack = Ember.get(this, 'haystack');
        let option = Ember.get(this, 'option');

        return fn(needle, haystack, option);
      }).readOnly(),

      compute([needle, option, haystack]) {
        if (Ember.isEmpty(haystack)) {
          haystack = option;
          option = null;
        }

        Ember.set(this, 'needle', needle);
        Ember.set(this, 'haystack', haystack);
        Ember.set(this, 'option', option);

        return Ember.get(this, 'content');
      },

      contentDidChange: Ember.observer('content', function () {
        this.recompute();
      })
    });
  }
});