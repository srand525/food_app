define('frontend/models/node', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    nodeid: _emberData.default.attr(),
    nodename: _emberData.default.attr(),
    nodetype: _emberData.default.attr()
  });
});