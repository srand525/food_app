define('ember-models-table/components/models-table/row-sorting-cell', ['exports', 'ember-models-table/templates/components/models-table/row-sorting-cell'], function (exports, _rowSortingCell) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _rowSortingCell.default,
    tagName: 'th',

    classNameBindings: ['themeInstance.theadCell', 'column.className'],

    attributeBindings: ['colspan'],

    colspan: Ember.computed.readOnly('column.realColspanForSortCell'),

    click() {
      const column = Ember.get(this, 'column');
      if (Ember.get(column, 'useSorting')) {
        Ember.get(this, 'sort')(column);
      }
    },

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
     * Bound from {{#crossLink "Components.ModelsTable/expandedItems:property"}}ModelsTable.data{{/crossLink}}
     *
     * @property data
     * @default null
     * @type object[]
     */
    data: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.sort:method"}}ModelsTable.actions.sort{{/crossLink}}
     *
     * @event sort
     */
    sort: null,

    /**
     * @property column
     * @default null
     * @type ModelsTableColumn
     */
    column: null,

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
    toggleAllSelection: null
  });
});