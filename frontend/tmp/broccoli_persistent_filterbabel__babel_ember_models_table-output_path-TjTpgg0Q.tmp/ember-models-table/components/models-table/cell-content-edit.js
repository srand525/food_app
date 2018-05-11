define('ember-models-table/components/models-table/cell-content-edit', ['exports', 'ember-models-table/templates/components/models-table/cell-content-edit'], function (exports, _cellContentEdit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _cellContentEdit.default,

    init() {
      Ember.set(this, 'tagName', Ember.get(this, 'themeInstance.tagNames.cell-content'));
      this._super(...arguments);
    }
  });
});