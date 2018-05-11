define('ember-composable-helpers/helpers/sort-by', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute(params) {
      // slice params to avoid mutating the provided params
      let sortProps = params.slice();
      let array = sortProps.pop();
      let [firstSortProp] = sortProps;

      if (Ember.typeOf(firstSortProp) === 'function' || Ember.isArray(firstSortProp)) {
        sortProps = firstSortProp;
      }

      Ember.set(this, 'array', array);
      Ember.set(this, 'sortProps', sortProps);

      return Ember.get(this, 'content');
    },

    sortPropsDidChange: Ember.observer('sortProps', function () {
      let sortProps = Ember.get(this, 'sortProps');

      if (Ember.isEmpty(sortProps)) {
        Ember.defineProperty(this, 'content', []);
      }

      if (typeof sortProps === 'function') {
        Ember.defineProperty(this, 'content', Ember.computed.sort('array', sortProps));
      } else {
        Ember.defineProperty(this, 'content', Ember.computed.sort('array', 'sortProps'));
      }
    }),

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});