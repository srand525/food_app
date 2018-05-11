define('frontend/helpers/exists-in', ['exports', 'ember-models-table/helpers/exists-in'], function (exports, _existsIn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _existsIn.default;
    }
  });
  Object.defineProperty(exports, 'existsIn', {
    enumerable: true,
    get: function () {
      return _existsIn.existsIn;
    }
  });
});