define('ember-models-table/components/models-table/row-expand', ['exports', 'ember-models-table/templates/components/models-table/row-expand'], function (exports, _rowExpand) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _rowExpand.default,
    tagName: 'tr',
    classNames: ['expand-row'],
    classNameBindings: ['indexedClass', 'isSelected:selected-expand'],

    /**
     * @property indexedClass
     * @type string
     * @default ''
     */
    indexedClass: Ember.computed('index', function () {
      return `expand-${Ember.get(this, 'index')}`;
    }),

    /**
     * @property isSelected
     * @type boolean
     * @default false
     */
    isSelected: null,

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
     * Bound from {{#crossLink "Components.ModelsTable/expandedRowComponent:property"}}ModelsTable.expandedRowComponent{{/crossLink}}
     *
     * @property expandedRowComponent
     * @type string
     * @default null
     */
    expandedRowComponent: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/visibleProcessedColumns:property"}}ModelsTable.visibleProcessedColumns{{/crossLink}}
     *
     * @property visibleProcessedColumns
     * @type ModelsTableColumn[]
     * @default null
     */
    visibleProcessedColumns: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.clickOnRow:method"}}ModelsTable.actions.clickOnRow{{/crossLink}}
     *
     * @event clickOnRow
     */
    clickOnRow: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.sendAction:method"}}ModelsTable.actions.sendAction{{/crossLink}}
     *
     * @event sendAction
     */
    sendAction: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

    click() {
      Ember.get(this, 'clickOnRow')(Ember.get(this, 'index'), Ember.get(this, 'record'));
    }
  });
});