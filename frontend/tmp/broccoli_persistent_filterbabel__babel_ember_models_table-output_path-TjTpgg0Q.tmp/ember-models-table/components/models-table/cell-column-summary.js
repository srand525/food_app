define('ember-models-table/components/models-table/cell-column-summary', ['exports', 'ember-models-table/templates/components/models-table/cell-column-summary'], function (exports, _cellColumnSummary) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function sumBy(collection) {
    return Ember.computed(`${collection}.[]`, function () {
      const c = Ember.get(this, collection);
      return c ? c.reduce((a, b) => a + b, 0) : 0;
    }).readOnly();
  }

  function avgBy(collection, sumBy) {
    return Ember.computed(sumBy, function () {
      const count = Ember.get(this, `${collection}.length`);
      return count ? Ember.get(this, sumBy) / count : 0;
    }).readOnly();
  }

  function minBy(collection) {
    return Ember.computed(`${collection}.[]`, function () {
      return Math.min.apply(Math, Ember.get(this, collection));
    }).readOnly();
  }

  function maxBy(collection) {
    return Ember.computed(`${collection}.[]`, function () {
      return Math.max.apply(Math, Ember.get(this, collection));
    }).readOnly();
  }

  function medianBy(collection) {
    return Ember.computed(`${collection}.[]`, function () {
      let c = Ember.get(this, collection);
      if (!Ember.get(c, 'length')) {
        return null;
      }
      c = c.slice().sort((a, b) => a - b);
      let lowMiddle = Math.floor((c.length - 1) / 2);
      let highMiddle = Math.ceil((c.length - 1) / 2);
      return (c[lowMiddle] + c[highMiddle]) / 2;
    }).readOnly();
  }

  /**
   * Component for table-footer cells. Used as column-summary. It provides several metrics like:
   *
   * * min of selected items
   * * max of selected items
   * * sum of selected items
   * * average of selected items
   * * median of selected items
   * * min of data
   * * max of data
   * * sum of data
   * * average of data
   * * median of data
   *
   * Here `selectedItems` and `data` are bound from `models-table` and are mapped by `column.propertyName`.
   *
   * Component should be used only for column with set `propertyName`.
   *
   * Component should be extended or it's template should be overridden.
   *
   * @namespace Components
   * @class ModelsTableCellColumnSummary
   * @extends Ember.Component
   */
  exports.default = Ember.Component.extend({
    layout: _cellColumnSummary.default,
    tagName: 'td',

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
     * Bound from {{#crossLink "Components.ModelsTable/data:property"}}ModelsTable.data{{/crossLink}}
     *
     * @property data
     * @type object[]
     * @default null
     */
    data: null,

    /**
     * `selectedItems.mapBy(column.propertyName)`
     *
     * @property mappedSelectedItems
     * @default []
     * @type array
     * @readonly
     */
    mappedSelectedItems: Ember.computed(function () {
      return [];
    }),

    /**
     * `expandedItems.mapBy(column.propertyName)`
     *
     * @property mappedExpandedItems
     * @default []
     * @type array
     * @readonly
     */
    mappedExpandedItems: Ember.computed(function () {
      return [];
    }),

    /**
     * `data.mapBy(column.propertyName)`
     *
     * @property mappedData
     * @default []
     * @type array
     * @readonly
     */
    mappedData: Ember.computed(function () {
      return [];
    }),

    /**
     * @property minSelected
     * @type number
     */
    minSelected: minBy('mappedSelectedItems'),

    /**
     * @property minData
     * @type number
     */
    minData: minBy('mappedData'),

    /**
     * @property maxSelected
     * @type number
     */
    maxSelected: maxBy('mappedSelectedItems'),

    /**
     * @property maxData
     * @type number
     */
    maxData: maxBy('mappedData'),

    /**
     * @property sumSelected
     * @type number
     */
    sumSelected: sumBy('mappedSelectedItems'),

    /**
     * @property sumData
     * @type number
     */
    sumData: sumBy('mappedData'),

    /**
     * @property avgSelected
     * @type number
     */
    avgSelected: avgBy('mappedSelectedItems', 'sumSelected'),

    /**
     * @property avgData
     * @type number
     */
    avgData: avgBy('mappedData', 'sumData'),

    /**
     * @property medianSelected
     * @type number
     */
    medianSelected: medianBy('mappedSelectedItems'),

    /**
     * @property medianData
     * @type number
     */
    medianData: medianBy('mappedData')

  });
});