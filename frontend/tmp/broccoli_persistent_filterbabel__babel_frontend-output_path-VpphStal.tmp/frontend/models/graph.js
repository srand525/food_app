define('frontend/models/graph', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    edges: _emberData.default.attr(),
    nodes: _emberData.default.attr()
  });
});