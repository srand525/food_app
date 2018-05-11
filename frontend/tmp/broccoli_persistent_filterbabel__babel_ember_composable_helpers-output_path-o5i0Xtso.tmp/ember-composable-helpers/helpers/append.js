define('ember-composable-helpers/helpers/append', ['exports', 'ember-composable-helpers/-private/create-multi-array-helper'], function (exports, _createMultiArrayHelper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.append = append;
  function append(...dependentKeys) {
    dependentKeys = dependentKeys || [];
    let arrayKeys = dependentKeys.map(dependentKey => {
      return `${dependentKey}.[]`;
    });

    return Ember.computed(...arrayKeys, function () {
      let array = dependentKeys.map(dependentKey => {
        let value = Ember.get(this, dependentKey);
        return Ember.isArray(value) ? value.toArray() : [value];
      });

      return [].concat(...array);
    });
  }

  exports.default = (0, _createMultiArrayHelper.default)(append);
});