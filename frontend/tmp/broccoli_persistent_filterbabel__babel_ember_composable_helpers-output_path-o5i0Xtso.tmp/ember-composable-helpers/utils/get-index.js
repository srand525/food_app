define('ember-composable-helpers/utils/get-index', ['exports', 'ember-composable-helpers/utils/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getIndex;
  function getIndex(array, currentValue, useDeepEqual) {
    let needle = currentValue;

    if (useDeepEqual) {
      needle = Ember.A(array).find(object => {
        return (0, _isEqual.default)(object, currentValue, useDeepEqual);
      });
    }

    let index = Ember.A(array).indexOf(needle);

    return index >= 0 ? index : null;
  }
});