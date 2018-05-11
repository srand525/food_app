define('ember-models-table/components/models-table/row-group-toggle', ['exports', 'ember-models-table/templates/components/models-table/row-group-toggle'], function (exports, _rowGroupToggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _rowGroupToggle.default,

    /**
     * Determines if `stopPropagation` should be called for event-handlers in the current component
     *
     * @property stopEventsPropagation
     * @type boolean
     * @default true
     */
    stopEventsPropagation: true,

    /**
     * Bound from {{#crossLink "Components.ModelsTableRowGrouping/groupIsCollapsed:property"}}groupIsCollapsed{{/crossLink}}
     *
     * @property groupIsCollapsed
     * @type boolean
     * @default null
     */
    groupIsCollapsed: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTableRowGrouping/groupedValue:property"}}groupedValue{{/crossLink}}
     *
     * @type *
     * @property groupedValue
     * @default null
     */
    groupedValue: null,

    /**
     * List of all rows group items
     *
     * If rows group is last on the page, not all it's items may be shown. Use `visibleGroupedItems` to get rows group items shown on the current table's page
     *
     * @type object[]
     * @property groupedItems
     * @default null
     */
    groupedItems: null,

    /**
     * List of rows group items shown on the current table page
     *
     * @type object[]
     * @property visibleGroupedItems
     * @default null
     */
    visibleGroupedItems: null,

    /**
     * List of selected rows group items
     *
     * @type object[]
     * @property selectedGroupedItems
     * @default null
     */
    selectedGroupedItems: null,

    /**
     * List of expanded rows group items
     *
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
     * Bound from {{#crossLink "Components.ModelsTable/displayGroupedValueAs:property"}}ModelsTable.displayGroupedValueAs{{/crossLink}}
     *
     * @property displayGroupedValueAs
     * @type string
     * @default null
     */
    displayGroupedValueAs: null,

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
     * Closure action {{#crossLink "Components.ModelsTable/actions.sendAction:method"}}ModelsTable.actions.sendAction{{/crossLink}}
     *
     * @event sendAction
     */
    sendAction: null,

    actions: {

      /**
       * Calls passed `toggleGroupedRows`
       *
       * @method actions.toggleGroupedRows
       * @param {Event} e user-interaction event
       * @returns {undefined}
       */
      toggleGroupedRows(e) {
        Ember.get(this, 'toggleGroupedRows')(Ember.get(this, 'groupedValue'));
        if (e && Ember.get(this, 'stopEventsPropagation')) {
          e.stopPropagation();
        }
      },
      /**
       * Calls passed `toggleGroupedRowsSelection`
       *
       * @method actions.toggleGroupedRowsSelection
       * @param {Event} e user-interaction event
       * @returns {undefined}
       */
      toggleGroupedRowsSelection(e) {
        Ember.get(this, 'toggleGroupedRowsSelection')(Ember.get(this, 'groupedValue'));
        if (e && Ember.get(this, 'stopEventsPropagation')) {
          e.stopPropagation();
        }
      },
      /**
       * Calls passed `toggleGroupedRowsExpands`
       *
       * @method actions.toggleGroupedRowsExpands
       * @param {Event} e user-interaction event
       * @returns {undefined}
       */
      toggleGroupedRowsExpands(e) {
        Ember.get(this, 'toggleGroupedRowsExpands')(Ember.get(this, 'groupedValue'));
        if (e && Ember.get(this, 'stopEventsPropagation')) {
          e.stopPropagation();
        }
      }
    }
  });
});