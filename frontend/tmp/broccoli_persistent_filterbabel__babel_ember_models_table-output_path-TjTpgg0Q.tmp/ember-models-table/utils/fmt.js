define('ember-models-table/utils/fmt', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = fmt;
  function fmt(str, formats) {
    str = str || '';
    let cachedFormats = formats;

    if (!Ember.isArray(cachedFormats) || arguments.length > 2) {
      cachedFormats = new Array(arguments.length - 1);

      for (let i = 1, l = arguments.length; i < l; i++) {
        cachedFormats[i - 1] = arguments[i];
      }
    }

    // first, replace any ORDERED replacements.
    let idx = 0; // the current index for non-numerical replacements
    return str.replace(/%@([0-9]+)?/g, function (s, argIndex) {
      argIndex = argIndex ? parseInt(argIndex, 10) - 1 : idx++;
      return cachedFormats[argIndex];
    });
  }
});