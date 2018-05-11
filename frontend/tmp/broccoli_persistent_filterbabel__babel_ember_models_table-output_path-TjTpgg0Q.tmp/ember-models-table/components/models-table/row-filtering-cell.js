define('ember-models-table/components/models-table/row-filtering-cell', ['exports', 'ember-models-table/templates/components/models-table/row-filtering-cell'], function (exports, _rowFilteringCell) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _rowFilteringCell.default,
    tagName: 'th',
    classNameBindings: ['themeInstance.theadCell', 'column.className', 'filteringClassName'],

    attributeBindings: ['colspan'],

    colspan: Ember.computed.readOnly('column.realColspanForFilterCell'),

    filteringClassName: Ember.computed('column.useFilter', 'themeInstance.theadCellNoFiltering', function () {
      return Ember.get(this, 'column.useFilter') ? '' : Ember.get(this, 'themeInstance.theadCellNoFiltering');
    }),

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

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