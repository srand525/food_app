define('ember-models-table/components/models-table/data-group-by-select', ['exports', 'ember-models-table/templates/components/models-table/data-group-by-select'], function (exports, _dataGroupBySelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    layout: _dataGroupBySelect.default,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/currentGroupingPropertyName:property"}}ModelsTable.currentGroupingPropertyName{{/crossLink}}
     *
     * @property value
     * @type string
     * @default null
     */
    value: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/dataGroupOptions:property"}}ModelsTable.dataGroupOptions{{/crossLink}}
     *
     * @property options
     * @default null
     * @type object[]
     */
    options: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/currentGroupingPropertyName:property"}}ModelsTable.currentGroupingPropertyName{{/crossLink}}
     *
     * @property currentGroupingPropertyName
     * @type string
     * @default null
     */
    currentGroupingPropertyName: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/sortByGroupedFieldDirection:property"}}ModelsTable.sortByGroupedFieldDirection{{/crossLink}}
     *
     * @property sortByGroupedFieldDirection
     * @type string
     * @default null
     */
    sortByGroupedFieldDirection: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.sendAction:method"}}ModelsTable.actions.sendAction{{/crossLink}}
     *
     * @event sendAction
     */
    sendAction: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.sort:method"}}ModelsTable.actions.sort{{/crossLink}}
     *
     * @event sort
     */
    sort: null,

    actions: {
      sort() {
        Ember.get(this, 'sort')({ propertyName: Ember.get(this, 'currentGroupingPropertyName') });
      }
    }
  });
});