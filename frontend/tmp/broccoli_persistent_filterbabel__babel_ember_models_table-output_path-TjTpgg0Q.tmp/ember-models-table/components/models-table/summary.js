define('ember-models-table/components/models-table/summary', ['exports', 'ember-models-table/templates/components/models-table/summary', 'ember-models-table/utils/fmt'], function (exports, _summary, _fmt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _summary.default,
    classNameBindings: ['themeInstance.footerSummary', 'paginationTypeClass'],

    /**
     * @property paginationTypeClass
     * @type string
     * @private
     * @readonly
     */
    paginationTypeClass: Ember.computed('useNumericPagination', 'themeInstance.{footerSummaryNumericPagination,footerSummaryDefaultPagination}', function () {
      return Ember.get(this, 'useNumericPagination') ? Ember.get(this, 'themeInstance.footerSummaryNumericPagination') : Ember.get(this, 'themeInstance.footerSummaryDefaultPagination');
    }).readOnly(),

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

    /**
     * Bound from {{#crossLink "Components.ModelsTable/arrangedContentLength:property"}}ModelsTable.arrangedContentLength{{/crossLink}}
     *
     * @property recordsCount
     * @type number
     * @default null
     */
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
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

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
     * Bound from {{#crossLink "Components.ModelsTable/useNumericPagination:property"}}ModelsTable.useNumericPagination{{/crossLink}}
     *
     * @property useNumericPagination
     * @type boolean
     * @default null
     */
    useNumericPagination: null,

    /**
     * @property summary
     * @type string
     * @private
     * @readonly
     */
    summary: Ember.computed('firstIndex', 'lastIndex', 'recordsCount', 'msg', function () {
      return (0, _fmt.default)(Ember.get(this, 'themeInstance.messages.tableSummary'), Ember.get(this, 'firstIndex'), Ember.get(this, 'lastIndex'), Ember.get(this, 'recordsCount'));
    }).readOnly(),

    actions: {
      clearFilters() {
        Ember.get(this, 'clearFilters')();
      }
    }
  });
});