define('ember-models-table/components/models-table/no-data', ['exports', 'ember-models-table/templates/components/models-table/no-data'], function (exports, _noData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _noData.default,
    tagName: 'tr',

    /**
     * @property realColumnsCount
     * @type {number}
     * @private
     */
    realColumnsCount: Ember.computed('columnsCount', function () {
      return Ember.get(this, 'columnsCount') + (Ember.get(this, 'displayGroupedValueAs') === 'column' ? 1 : 0);
    }),

    /**
     * Bound from {{#crossLink "Components.ModelsTable/processedColumns:property"}}ModelsTable.processedColumns{{/crossLink}}
     *
     * @property processedColumns
     * @type object[]
     * @default null
     */
    columnsCount: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.sendAction:method"}}ModelsTable.actions.sendAction{{/crossLink}}
     *
     * @event sendAction
     */
    sendAction: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null
  });
});