define('ember-models-table/components/models-table/group-summary-row', ['exports', 'ember-models-table/templates/components/models-table/group-summary-row'], function (exports, _groupSummaryRow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _groupSummaryRow.default,
    tagName: 'tr',
    classNames: ['group-summary-row'],

    /**
     * Bound from {{#crossLink "Components.ModelsTable/visibleProcessedColumns:property"}}ModelsTable.visibleProcessedColumns{{/crossLink}}
     *
     * @property visibleProcessedColumns
     * @type ModelsTableColumn[]
     * @default null
     */
    visibleProcessedColumns: null,

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
    sendAction: null
  });
});