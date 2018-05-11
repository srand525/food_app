define('ember-models-table/components/models-table/table-body', ['exports', 'ember-models-table/templates/components/models-table/table-body'], function (exports, _tableBody) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _tableBody.default,
    tagName: 'tbody',

    /**
     * Bound from {{#crossLink "Components.ModelsTableTable/columnsCount:property"}}ModelsTable.columnsCount{{/crossLink}}
     *
     * @property columnsCount
     * @type number
     * @default null
     */
    columnsCount: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/visibleContent:property"}}ModelsTable.visibleContent{{/crossLink}}
     *
     * @property visibleContent
     * @type object[]
     * @default null
     */
    visibleContent: null,

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
     * @type number[]
     * @default null
     */
    expandedItems: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/expandedRowComponent:property"}}ModelsTable.expandedRowComponent{{/crossLink}}
     *
     * @property expandedRowComponent
     * @type string
     * @default null
     */
    expandedRowComponent: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/groupingRowComponent:property"}}ModelsTable.groupingRowComponent{{/crossLink}}
     *
     * @property groupingRowComponent
     * @type object
     * @default null
     */
    groupingRowComponent: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/groupSummaryRowComponent:property"}}ModelsTable.groupSummaryRowComponent{{/crossLink}}
     *
     * @property groupSummaryRowComponent
     * @type object
     * @default null
     */
    groupSummaryRowComponent: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/visibleProcessedColumns:property"}}ModelsTable.visibleProcessedColumns{{/crossLink}}
     *
     * @property visibleProcessedColumns
     * @type ModelsTableColumn[]
     * @default null
     */
    visibleProcessedColumns: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/allColumnsAreHidden:property"}}ModelsTable.allColumnsAreHidden{{/crossLink}}
     *
     * @property allColumnsAreHidden
     * @type boolean
     * @default null
     */
    allColumnsAreHidden: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/data:property"}}ModelsTable.data{{/crossLink}}
     *
     * @property data
     * @type object[]
     * @default null
     */
    data: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/useDataGrouping:property"}}ModelsTable.useDataGrouping{{/crossLink}}
     *
     * @property useDataGrouping
     * @type boolean
     * @default null
     */
    useDataGrouping: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/collapsedGroupValues:property"}}ModelsTable.collapsedGroupValues{{/crossLink}}
     *
     * @property collapsedGroupValues
     * @type array
     * @default null
     */
    collapsedGroupValues: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/currentGroupingPropertyName:property"}}ModelsTable.currentGroupingPropertyName{{/crossLink}}
     *
     * @property currentGroupingPropertyName
     * @type string
     * @default null
     */
    currentGroupingPropertyName: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/dataGroupOptions:property"}}ModelsTable.dataGroupOptions{{/crossLink}}
     *
     * @property dataGroupOptions
     * @type object[]
     * @default null
     */
    dataGroupOptions: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/groupedVisibleContentValuesOrder:property"}}ModelsTable.groupedVisibleContentValuesOrder{{/crossLink}}
     *
     * @property groupedVisibleContentValuesOrder
     * @type array
     * @default null
     */
    groupedVisibleContentValuesOrder: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/groupedVisibleContent:property"}}ModelsTable.groupedVisibleContent{{/crossLink}}
     *
     * @property groupedVisibleContent
     * @type object
     * @default null
     */
    groupedVisibleContent: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/groupedArrangedContent:property"}}ModelsTable.groupedArrangedContent{{/crossLink}}
     *
     * @property groupedArrangedContent
     * @type object[]
     * @default null
     */
    groupedArrangedContent: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/displayGroupedValueAs:property"}}ModelsTable.displayGroupedValueAs{{/crossLink}}
     *
     * @property displayGroupedValueAs
     * @type string
     * @default null
     */
    displayGroupedValueAs: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.toggleGroupedRows:method"}}ModelsTable.actions.toggleGroupedRows{{/crossLink}}
     *
     * @event toggleGroupedRows
     */
    toggleGroupedRows: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.toggleGroupedRowsSelection:method"}}ModelsTable.actions.toggleGroupedRowsSelection{{/crossLink}}
     *
     * @event toggleGroupedRowsSelection
     */
    toggleGroupedRowsSelection: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.toggleGroupedRowsExpands:method"}}ModelsTable.actions.toggleGroupedRowsExpands{{/crossLink}}
     *
     * @event toggleGroupedRowsExpands
     */
    toggleGroupedRowsExpands: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.clickOnRow:method"}}ModelsTable.actions.clickOnRow{{/crossLink}}
     *
     * @event clickOnRow
     */
    clickOnRow: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.doubleClickOnRow:method"}}ModelsTable.actions.doubleClickOnRow{{/crossLink}}
     *
     * @event doubleClickOnRow
     */
    doubleClickOnRow: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.hoverOnRow:method"}}ModelsTable.actions.hoverOnRow{{/crossLink}}
     *
     * @event hoverOnRow
     */
    hoverOnRow: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.outRow:method"}}ModelsTable.actions.outRow{{/crossLink}}
     *
     * @event outRow
     */
    outRow: null,

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

    actions: {
      clickOnRow(index, row) {
        Ember.get(this, 'clickOnRow')(index, row);
      }
    }
  });
});