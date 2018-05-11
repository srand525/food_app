define('ember-models-table/components/models-table/cell-content-display', ['exports', 'ember-models-table/templates/components/models-table/cell-content-display'], function (exports, _cellContentDisplay) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _cellContentDisplay.default,

    init() {
      Ember.set(this, 'tagName', Ember.get(this, 'themeInstance.tagNames.cell-content'));
      this._super(...arguments);
    }
  });
});