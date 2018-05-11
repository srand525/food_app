define('ember-composable-helpers/helpers/intersect', ['exports', 'ember-composable-helpers/-private/create-multi-array-helper'], function (exports, _createMultiArrayHelper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = (0, _createMultiArrayHelper.default)(Ember.computed.intersect);
});