define('ember-models-table/helpers/html-safe', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.htmlSafe = htmlSafe;
  function htmlSafe([str] /*, hash*/) {
    return Ember.String.htmlSafe(str || '');
  }

  exports.default = Ember.Helper.helper(htmlSafe);
});