define('ember-models-table/components/models-table/page-size-select', ['exports', 'ember-models-table/templates/components/models-table/page-size-select'], function (exports, _pageSizeSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _pageSizeSelect.default,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/pageSizeOptions:property"}}ModelsTable.pageSizeOptions{{/crossLink}}
     *
     * @property pageSizeOptions
     * @type object[]
     * @default null
     */
    pageSizeOptions: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/pageSize:property"}}ModelsTable.pageSize{{/crossLink}}
     *
     * @property pageSize
     * @type number
     * @default null
     */
    pageSize: null,

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