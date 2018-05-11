define('ember-models-table/components/models-table/themes/semanticui/select', ['exports', 'ember-models-table/components/models-table/select', 'ember-models-table/templates/components/models-table/select'], function (exports, _select, _select2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _select.default.extend({

    layout: _select2.default,

    classNames: ['ui fluid dropdown']

  });
});