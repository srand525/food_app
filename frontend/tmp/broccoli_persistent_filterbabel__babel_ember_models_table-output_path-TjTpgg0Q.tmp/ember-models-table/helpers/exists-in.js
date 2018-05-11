define('ember-models-table/helpers/exists-in', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    content: Ember.computed('needle', 'haystack.[]', function () {
      let needle = Ember.get(this, 'needle');
      let haystack = Ember.get(this, 'haystack');
      return Ember.isArray(haystack) ? haystack.includes(needle) : false;
    }).readOnly(),

    compute([haystack, needle]) {
      Ember.set(this, 'needle', needle);
      Ember.set(this, 'haystack', haystack);
      return Ember.get(this, 'content');
    },

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});