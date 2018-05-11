define('ember-models-table/components/models-table/cell', ['exports', 'ember-models-table/templates/components/models-table/cell'], function (exports, _cell) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _cell.default,
    tagName: 'td',
    classNameBindings: ['column.className'],

    /**
     * One of the {{#crossLink "Components.ModelsTable/data:property"}}data{{/crossLink}}
     *
     * @property record
     * @default null
     */
    record: null,

    /**
     * Row's index where current cell is
     *
     * @property index
     * @default null
     * @type number
     */
    index: null,

    /**
     * @property column
     * @default null
     * @type ModelsTableColumn
     */
    column: null,

    /**
     * @property isEditRow
     * @default null
     * @type boolean
     * @private
     */
    isEditRow: null,

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
     * Closure action {{#crossLink "Components.ModelsTableRow/actions.editRow:method"}}ModelsTableRow.actions.editRow{{/crossLink}}
     *
     * @event editRow
     */
    editRow: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTableRow/actions.saveRow:method"}}ModelsTableRow.actions.saveRow{{/crossLink}}
     *
     * @event saveRow
     */
    saveRow: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTableRow/actions.cancelEditRow:method"}}ModelsTableRow.actions.cancelEditRow{{/crossLink}}
     *
     * @event cancelEditRow
     */
    cancelEditRow: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

    /**
     * Is current row expanded or not
     *
     * @type boolean
     * @default null
     * @property isExpanded
     */
    isExpanded: null,

    /**
     * Is this column editable
     *
     * @type boolean
     * @default true
     * @property isColumnEditable
     * @private
     * @readonly
     */
    isColumnEditable: Ember.computed('column.editable', 'isEditRow', function () {
      let isEditable = Ember.get(this, 'isEditRow');
      if (isEditable === true) {
        let columnEditable = Ember.get(this, 'column.editable');
        if (typeof columnEditable === 'function') {
          isEditable = columnEditable() || false;
        } else if (columnEditable === false) {
          isEditable = false;
        }
      }
      return isEditable;
    }).readOnly(),

    /**
     * Given the mode for a cell (Edit or not) will determine which component to render
     *
     * @property componentToRender
     * @default null
     * @type string
     * @readonly
     * @private
     */
    componentToRender: Ember.computed('isColumnEditable', 'isEditRow', 'column.{propertyName,component,componentForEdit}', function () {
      if (Ember.isNone(Ember.get(this, 'column.propertyName'))) {
        return undefined;
      }
      let editComponent = undefined;
      if (Ember.get(this, 'isColumnEditable')) {
        editComponent = Ember.get(this, 'column.componentForEdit');
        editComponent = Ember.isPresent(editComponent) ? editComponent : Ember.get(this, 'themeInstance.components.cell-content-edit');
      }
      let cellDisplayComponent = Ember.get(this, 'column.component') || Ember.get(this, 'themeInstance.components.cell-content-display');
      return editComponent || cellDisplayComponent;
    }).readOnly(),

    click(e) {
      if (Ember.get(this, 'isEditRow')) {
        e.stopPropagation();
      }
    }

  });
});