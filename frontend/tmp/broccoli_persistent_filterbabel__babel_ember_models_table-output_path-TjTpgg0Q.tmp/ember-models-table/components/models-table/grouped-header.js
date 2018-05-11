define('ember-models-table/components/models-table/grouped-header', ['exports', 'ember-models-table/templates/components/models-table/grouped-header'], function (exports, _groupedHeader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _groupedHeader.default,
    tagName: 'tr',

    /**
     * @type {groupedHeader}
     * @default null
     * @property groupedHeader
     */
    groupedHeader: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @default null
     * @type object
     */
    themeInstance: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/useDataGrouping:property"}}ModelsTable.useDataGrouping{{/crossLink}}
     *
     * @property useDataGrouping
     * @default null
     * @type boolean
     */
    useDataGrouping: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/displayGroupedValueAs:property"}}ModelsTable.displayGroupedValueAs{{/crossLink}}
     *
     * @property displayGroupedValueAs
     * @default null
     * @type string
     */
    displayGroupedValueAs: null

  });
});