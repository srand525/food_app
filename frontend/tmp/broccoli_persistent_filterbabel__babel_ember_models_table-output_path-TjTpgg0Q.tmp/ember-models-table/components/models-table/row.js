define('ember-models-table/components/models-table/row', ['exports', 'ember-models-table/templates/components/models-table/row', 'ember-models-table/mixins/hover-support'], function (exports, _row, _hoverSupport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend(_hoverSupport.default, {
    layout: _row.default,
    classNameBindings: ['rowSelectedClass', 'rowExpandedClass'],
    tagName: 'tr',

    /**
     * @property rowSelectedClass
     * @private
     * @type string
     */
    rowSelectedClass: Ember.computed('isSelected', 'themeInstance.selectedRow', function () {
      return Ember.get(this, 'isSelected') ? Ember.get(this, 'themeInstance.selectedRow') : '';
    }),

    /**
     * @property rowExpandedClass
     * @private
     * @type string
     * @readonly
     */
    rowExpandedClass: Ember.computed('isExpanded', 'themeInstance.expandedRow', function () {
      return Ember.get(this, 'isExpanded') ? Ember.get(this, 'themeInstance.expandedRow') : '';
    }).readOnly(),

    /**
     * @property rowspanForFirstCell
     * @type number
     * @private
     * @readonly
     */
    rowspanForFirstCell: Ember.computed('visibleGroupedItems.length', 'expandedGroupItemsCount', 'groupSummaryRowComponent', function () {
      const rowspan = Ember.get(this, 'visibleGroupedItems.length') + Ember.get(this, 'expandedGroupItemsCount');
      return Ember.get(this, 'groupSummaryRowComponent') ? rowspan + 1 : rowspan;
    }).readOnly(),

    /**
     * Row's index
     *
     * @property index
     * @type number
     * @default null
     */
    index: null,

    /**
     * One of the {{#crossLink "Components.ModelsTable/data:property"}}data{{/crossLink}}
     *
     * @property record
     * @type object
     * @default null
     */
    record: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/visibleProcessedColumns:property"}}ModelsTable.visibleProcessedColumns{{/crossLink}}
     *
     * @property visibleProcessedColumns
     * @type ModelsTableColumn[]
     * @default null
     */
    visibleProcessedColumns: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/currentGroupingPropertyName:property"}}ModelsTable.currentGroupingPropertyName{{/crossLink}}
     *
     * @property currentGroupingPropertyName
     * @type string
     * @default null
     */
    currentGroupingPropertyName: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/collapsedGroupValues:property"}}ModelsTable.collapsedGroupValues{{/crossLink}}
     *
     * @property collapsedGroupValues
     * @type array
     * @default null
     */
    collapsedGroupValues: null,

    /**
     * @type object[]
     * @property groupedItems
     * @default null
     * @private
     */
    groupedItems: null,

    /**
     * @type object[]
     * @property visibleGroupedItems
     * @default null
     * @private
     */
    visibleGroupedItems: null,

    /**
     * @type object[]
     * @property selectedGroupedItems
     * @default null
     * @private
     */
    selectedGroupedItems: null,

    /**
     * @type object[]
     * @property expandedGroupedItems
     * @default null
     * @private
     */
    expandedGroupedItems: null,

    /**
     * @type *
     * @property groupedValue
     * @default null
     */
    groupedValue: null,

    /**
     * Rows group size where current row is
     *
     * @type number
     * @property groupedLength
     * @default null
     */
    groupedLength: null,

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
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

    /**
     * Is the row in edit mode
     *
     * @property isEditRow
     * @type boolean
     * @default false
     */
    isEditRow: false,

    click() {
      Ember.get(this, 'clickOnRow')(Ember.get(this, 'index'), Ember.get(this, 'record'));
    },

    doubleClick() {
      Ember.get(this, 'doubleClickOnRow')(Ember.get(this, 'index'), Ember.get(this, 'record'));
    },

    enter() {
      Ember.get(this, 'hoverOnRow')(Ember.get(this, 'index'), Ember.get(this, 'record'));
    },

    leave() {
      Ember.get(this, 'outRow')(Ember.get(this, 'index'), Ember.get(this, 'record'));
    },

    actions: {
      toggleGroupedRows() {
        Ember.get(this, 'toggleGroupedRows')(Ember.get(this, 'groupedValue'));
      },

      /**
       * Place a row into edit mode
       *
       * @returns {undefined}
       * @method actions.editRow
       */
      editRow() {
        Ember.set(this, 'isEditRow', true);
      },

      /**
       * Indicate a row has been saved, the row is no longer in edit mode
       *
       * @returns {undefined}
       * @method actions.saveRow
       */
      saveRow() {
        Ember.set(this, 'isEditRow', false);
      },

      /**
       * Indicate the edit on the row has been cancelled, the row is no longer in edit mode
       *
       * @returns {undefined}
       * @method actions.cancelEditRow
       */
      cancelEditRow() {
        Ember.set(this, 'isEditRow', false);
      }
    }

  });
});