define('ember-composable-helpers/helpers/filter-by', ['exports', 'ember-composable-helpers/utils/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([byPath, value, array]) {
      if (!Ember.isArray(array) && Ember.isArray(value)) {
        array = value;
        value = undefined;
      }

      Ember.set(this, 'array', array);
      Ember.set(this, 'byPath', byPath);
      Ember.set(this, 'value', value);

      return Ember.get(this, 'content');
    },

    byPathDidChange: Ember.observer('byPath', 'value', function () {
      let byPath = Ember.get(this, 'byPath');
      let value = Ember.get(this, 'value');

      if (Ember.isEmpty(byPath)) {
        Ember.defineProperty(this, 'content', []);
        return;
      }

      let filterFn;

      if (Ember.isPresent(value)) {
        if (typeof value === 'function') {
          filterFn = item => value(Ember.get(item, byPath));
        } else {
          filterFn = item => (0, _isEqual.default)(Ember.get(item, byPath), value);
        }
      } else {
        filterFn = item => !!Ember.get(item, byPath);
      }

      let cp = Ember.computed.filter(`array.@each.${byPath}`, filterFn);

      Ember.defineProperty(this, 'content', cp);
    }),

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});