define('ember-models-table/components/models-table/footer', ['exports', 'ember-models-table/templates/components/models-table/footer'], function (exports, _footer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _footer.default,
    classNameBindings: ['themeInstance.tfooterWrapper'],

    /**
     * Bound from {{#crossLink "Components.ModelsTable/firstIndex:property"}}ModelsTable.firstIndex{{/crossLink}}
     *
     * @property firstIndex
     * @type number
     * @default null
     */
    firstIndex: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/lastIndex:property"}}ModelsTable.lastIndex{{/crossLink}}
     *
     * @property lastIndex
     * @type number
     * @default null
     */
    lastIndex: null,

    recordsCount: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/anyFilterUsed:property"}}ModelsTable.anyFilterUsed{{/crossLink}}
     *
     * @property anyFilterUsed
     * @type boolean
     * @default null
     */
    anyFilterUsed: null,

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
     * Bound from {{#crossLink "Components.ModelsTable/currentPageNumber:property"}}ModelsTable.currentPageNumber{{/crossLink}}
     *
     * @property currentPageNumber
     * @type number
     * @default null
     */
    currentPageNumber: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/pagesCount:property"}}ModelsTable.pagesCount{{/crossLink}}
     *
     * @property pagesCount
     * @type number
     * @default null
     */
    pagesCount: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/showPageSize:property"}}ModelsTable.showPageSize{{/crossLink}}
     *
     * @property showPageSize
     * @type boolean
     * @default null
     */
    showPageSize: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/useNumericPagination:property"}}ModelsTable.useNumericPagination{{/crossLink}}
     *
     * @property useNumericPagination
     * @type boolean
     * @default null
     */
    useNumericPagination: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.goToPage:method"}}ModelsTable.actions.goToPage{{/crossLink}}
     *
     * @event goToPage
     */
    goToPage: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.clearFilters:method"}}ModelsTable.actions.clearFilters{{/crossLink}}
     *
     * @event clearFilters
     */
    clearFilters: null,

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
    themeInstance: null

  });
});