define('ember-models-table/components/models-table/table-footer', ['exports', 'ember-models-table/templates/components/models-table/table-footer'], function (exports, _tableFooter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _tableFooter.default,
    tagName: 'tfoot',

    /**
     * Bound from {{#crossLink "Components.ModelsTable/data:property"}}ModelsTable.data{{/crossLink}}
     *
     * @property data
     * @type object
     * @default null
     */
    data: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/visibleProcessedColumns:property"}}ModelsTable.visibleProcessedColumns{{/crossLink}}
     *
     * @property visibleProcessedColumns
     * @type ModelsTableColumn[]
     * @default null
     */
    visibleProcessedColumns: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/selectedItems:property"}}ModelsTable.selectedItems{{/crossLink}}
     *
     * @property selectedItems
     * @type object[]
     * @default null
     */
    selectedItems: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/expandedItems:property"}}ModelsTable.expandedItems{{/crossLink}}
     *
     * @property expandedItems
     * @type object[]
     * @default null
     */
    expandedItems: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.goToPage:method"}}ModelsTable.actions.goToPage{{/crossLink}}
     *
     * @event goToPage
     */
    goToPage: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.clearFilters:method"}}ModelsTable.actions.clearFilters{{/crossLink}}
     *
     * @event clearFilters
     */
    clearFilters: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.sendAction:method"}}ModelsTable.actions.sendAction{{/crossLink}}
     *
     * @event sendAction
     */
    sendAction: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.expandRow:method"}}ModelsTable.actions.expandRow{{/crossLink}}
     *
     * @event expandRow
     */
    expandRow: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.collapseRow:method"}}ModelsTable.actions.collapseRow{{/crossLink}}
     *
     * @event collapseRow
     */
    collapseRow: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.expandAllRows:method"}}ModelsTable.actions.expandAllRows{{/crossLink}}
     *
     * @event expandAllRows
     */
    expandAllRows: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.collapseAllRows:method"}}ModelsTable.actions.collapseAllRows{{/crossLink}}
     *
     * @event collapseAllRows
     */
    collapseAllRows: null
  });
});