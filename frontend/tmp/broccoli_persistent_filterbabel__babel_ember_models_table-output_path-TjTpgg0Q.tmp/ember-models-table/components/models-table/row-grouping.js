define('ember-models-table/components/models-table/row-grouping', ['exports', 'ember-models-table/templates/components/models-table/row-grouping'], function (exports, _rowGrouping) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _rowGrouping.default,
    tagName: 'tr',

    classNameBindings: ['themeInstance.groupingRow'],

    /**
     * @property groupedValue
     * @type *
     * @default null
     */
    groupedValue: null,

    /**
     * Determines if rows group is collapsed (bound from the parent component template)
     *
     * @type boolean
     * @default null
     * @property groupIsCollapsed
     */
    groupIsCollapsed: null,

    /**
     * Rows count in the rows group
     *
     * @type number
     * @default null
     * @property groupedLength
     */
    groupedLength: null,

    /**
     * @property cellColspan
     * @type number
     * @default null
     * @private
     * @readonly
     */
    cellColspan: Ember.computed('displayGroupedValueAs', 'visibleProcessedColumns.length', function () {
      return Ember.get(this, 'visibleProcessedColumns.length') + (Ember.get(this, 'displayGroupedValueAs') === 'row' ? 0 : 1);
    }).readOnly(),

    /**
     * @type object[]
     * @property groupedItems
     * @default null
     */
    groupedItems: null,

    /**
     * @type object[]
     * @property visibleGroupedItems
     * @default null
     */
    visibleGroupedItems: null,

    /**
     * @type object[]
     * @property selectedGroupedItems
     * @default null
     */
    selectedGroupedItems: null,

    /**
     * @type object[]
     * @property expandedGroupedItems
     * @default null
     */
    expandedGroupedItems: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/currentGroupingPropertyName:property"}}ModelsTable.currentGroupingPropertyName{{/crossLink}}
     *
     * @property currentGroupingPropertyName
     * @type string
     * @default null
     */
    currentGroupingPropertyName: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/visibleProcessedColumns:property"}}ModelsTable.visibleProcessedColumns{{/crossLink}}
     *
     * @property visibleProcessedColumns
     * @type ModelsTableColumn[]
     * @default null
     */
    visibleProcessedColumns: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.toggleGroupedRows:method"}}ModelsTable.actions.toggleGroupedRows{{/crossLink}}
     *
     * @event toggleGroupedRows
     */
    toggleGroupedRows: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/displayGroupedValueAs:property"}}ModelsTable.displayGroupedValueAs{{/crossLink}}
     *
     * @property displayGroupedValueAs
     * @type string
     * @default null
     */
    displayGroupedValueAs: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/groupingRowComponent:property"}}ModelsTable.groupingRowComponent{{/crossLink}}
     *
     * @type string
     * @default null
     * @property groupingRowComponent
     */
    groupingRowComponent: null,

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
    sendAction: null,

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
    toggleGroupedRowsExpands: null

  });
});