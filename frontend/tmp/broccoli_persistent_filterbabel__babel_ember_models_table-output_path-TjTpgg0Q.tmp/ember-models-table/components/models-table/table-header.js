define('ember-models-table/components/models-table/table-header', ['exports', 'ember-models-table/templates/components/models-table/table-header'], function (exports, _tableHeader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _tableHeader.default,
    tagName: 'thead',
    classNameBindings: ['noHeaderFilteringAndSorting:table-header-no-filtering-and-sorting', 'themeInstance.thead'],

    /**
     * Bound from {{#crossLink "Components.ModelsTable/noHeaderFilteringAndSorting:property"}}ModelsTable.noHeaderFilteringAndSorting{{/crossLink}}
     *
     * @property noHeaderFilteringAndSorting
     * @type boolean
     * @default null
     */
    noHeaderFilteringAndSorting: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/groupedHeaders:property"}}ModelsTable.groupedHeaders{{/crossLink}}
     *
     * @property groupedHeaders
     * @type groupedHeader[][]
     * @default null
     */
    groupedHeaders: null,

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
     * Bound from {{#crossLink "Components.ModelsTable/useFilteringByColumns:property"}}ModelsTable.useFilteringByColumns{{/crossLink}}
     *
     * @property useFilteringByColumns
     * @type boolean
     * @default null
     */
    useFilteringByColumns: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/useDataGrouping:property"}}ModelsTable.useDataGrouping{{/crossLink}}
     *
     * @property useDataGrouping
     * @type boolean
     * @default null
     */
    useDataGrouping: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/displayGroupedValueAs:property"}}ModelsTable.displayGroupedValueAs{{/crossLink}}
     *
     * @property displayGroupedValueAs
     * @type string
     * @default null
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
    collapseAllRows: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.toggleAllSelection:method"}}ModelsTable.actions.toggleAllSelection{{/crossLink}}
     *
     * @event toggleAllSelection
     */
    toggleAllSelection: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/expandedItems:property"}}ModelsTable.data{{/crossLink}}
     *
     * @property data
     * @default null
     * @type object[]
     */
    data: null,

    actions: {
      sort(column) {
        Ember.get(this, 'sort')(column);
      }
    }
  });
});