define('ember-composable-helpers/helpers/dec', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.dec = dec;
  function dec([step, val]) {
    if (Ember.isEmpty(val)) {
      val = step;
      step = undefined;
    }

    val = Number(val);

    if (isNaN(val)) {
      return;
    }

    if (step === undefined) {
      step = 1;
    }

    return val - step;
  }

  exports.default = Ember.Helper.helper(dec);
});