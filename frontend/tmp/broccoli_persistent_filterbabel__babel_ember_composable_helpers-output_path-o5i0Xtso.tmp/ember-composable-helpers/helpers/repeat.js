define('ember-composable-helpers/helpers/repeat', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.repeat = repeat;
  function repeat([length, value]) {
    if (Ember.typeOf(length) !== 'number') {
      return [value];
    }
    return Array.apply(null, { length }).map(() => value); // eslint-disable-line
  }

  exports.default = Ember.Helper.helper(repeat);
});