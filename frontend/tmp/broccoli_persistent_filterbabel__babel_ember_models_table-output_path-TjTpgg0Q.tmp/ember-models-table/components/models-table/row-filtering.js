define('ember-models-table/components/models-table/row-filtering', ['exports', 'ember-models-table/templates/components/models-table/row-filtering', 'ember-models-table/utils/macros'], function (exports, _rowFiltering, _macros) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _rowFiltering.default,
    tagName: 'tr',

    /**
     * Bound from {{#crossLink "Components.ModelsTable/visibleProcessedColumns:property"}}ModelsTable.visibleProcessedColumns{{/crossLink}}
     *
     * @property visibleProcessedColumns
     * @type ModelsTableColumn[]
     * @default null
     */
    visibleProcessedColumns: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/processedColumns:property"}}ModelsTable.processedColumns{{/crossLink}}
     *
     * @property processedColumns
     * @type ModelsTableColumn[]
     * @default null
     */
    processedColumns: null,

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
     * @default null
     * @type object[]
     */
    selectedItems: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/expandedItems:property"}}ModelsTable.expandedItems{{/crossLink}}
     *
     * @property expandedItems
     * @default null
     * @type object[]
     */
    expandedItems: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/useDataGrouping:property"}}ModelsTable.useDataGrouping{{/crossLink}}
     *
     * @property useDataGrouping
     * @default null
     * @type boolean
     */
    useDataGrouping: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/displayGroupedValueAs:property"}}ModelsTable.displayGroupedValueAs{{/crossLink}}
     *
     * @property displayGroupedValueAs
     * @default null
     * @type string
     */
    displayGroupedValueAs: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.sort:method"}}ModelsTable.actions.sort{{/crossLink}}
     *
     * @event sort
     */
    sort: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.sendAction:method"}}ModelsTable.actions.sendAction{{/crossLink}}
     *
     * @event sendAction
     */
    sendAction: null,

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
    collapseAllRows: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.toggleAllSelection:method"}}ModelsTable.actions.toggleAllSelection{{/crossLink}}
     *
     * @event toggleAllSelection
     */
    toggleAllSelection: null,

    /**
     * @property shownColumns
     * @type object[]
     * @private
     * @readonly
     */
    shownColumns: (0, _macros.shownColumns)('colspanForFilterCell')

  });
});