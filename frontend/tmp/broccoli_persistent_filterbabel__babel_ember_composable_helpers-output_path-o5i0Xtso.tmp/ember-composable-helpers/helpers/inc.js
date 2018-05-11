define('ember-composable-helpers/helpers/inc', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.inc = inc;
  function inc([step, val]) {
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

    return val + step;
  }

  exports.default = Ember.Helper.helper(inc);
});