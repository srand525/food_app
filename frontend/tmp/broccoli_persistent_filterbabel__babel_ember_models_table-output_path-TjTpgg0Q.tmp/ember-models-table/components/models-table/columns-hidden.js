define('ember-models-table/components/models-table/columns-hidden', ['exports', 'ember-models-table/templates/components/models-table/columns-hidden'], function (exports, _columnsHidden) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _columnsHidden.default,
    tagName: 'tr',

    /**
     * Bound from {{#crossLink "Components.ModelsTableTable/columnsCount:property"}}ModelsTable.columnsCount{{/crossLink}}
     *
     * @property columnsCount
     * @type number
     * @default null
     */
    columnsCount: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.sendAction:method"}}ModelsTable.actions.sendAction{{/crossLink}}
     *
     * @event sendAction
     */
    sendAction: null
  });
});