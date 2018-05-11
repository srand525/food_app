define('ember-models-table/components/models-table/pagination-simple', ['exports', 'ember-models-table/templates/components/models-table/pagination-simple'], function (exports, _paginationSimple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _paginationSimple.default,

    classNameBindings: ['themeInstance.paginationWrapper', 'themeInstance.paginationWrapperDefault'],

    /**
     * Bound from {{#crossLink "Components.ModelsTable/currentPageNumber:property"}}ModelsTable.currentPageNumber{{/crossLink}}
     *
     * @property currentPageNumber
     * @type number
     * @default null
     */
    currentPageNumber: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/arrangedContentLength:property"}}ModelsTable.arrangedContentLength{{/crossLink}}
     *
     * @property recordsCount
     * @type number
     * @default null
     */
    recordsCount: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/pagesCount:property"}}ModelsTable.pagesCount{{/crossLink}}
     *
     * @property pagesCount
     * @type number
     * @default null
     */
    pagesCount: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.gotoCustomPage:method"}}ModelsTable.actions.gotoCustomPage{{/crossLink}}
     *
     * @event goToPage
     */
    goToPage: null,

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
    sendAction: null,

    /**
     * Are buttons "Back" and "First" enabled
     *
     * @type boolean
     * @property gotoBackEnabled
     */
    gotoBackEnabled: Ember.computed.gt('currentPageNumber', 1),

    /**
     * Are buttons "Next" and "Last" enabled
     *
     * @type boolean
     * @property gotoForwardEnabled
     */
    gotoForwardEnabled: Ember.computed('currentPageNumber', 'pagesCount', function () {
      return Ember.get(this, 'currentPageNumber') < Ember.get(this, 'pagesCount');
    }),

    actions: {
      gotoFirst() {
        if (!Ember.get(this, 'gotoBackEnabled')) {
          return;
        }
        Ember.get(this, 'goToPage')(1);
      },

      gotoPrev() {
        if (!Ember.get(this, 'gotoBackEnabled')) {
          return;
        }
        const currentPageNumber = Ember.get(this, 'currentPageNumber');
        if (currentPageNumber > 1) {
          Ember.get(this, 'goToPage')(currentPageNumber - 1);
        }
      },

      gotoNext() {
        if (!Ember.get(this, 'gotoForwardEnabled')) {
          return;
        }
        let currentPageNumber = Ember.get(this, 'currentPageNumber');
        let pageSize = parseInt(Ember.get(this, 'pageSize'), 10);
        let arrangedContentLength = Ember.get(this, 'recordsCount');
        if (arrangedContentLength > pageSize * (currentPageNumber - 1)) {
          Ember.get(this, 'goToPage')(currentPageNumber + 1);
        }
      },

      gotoLast() {
        if (!Ember.get(this, 'gotoForwardEnabled')) {
          return;
        }
        let pageSize = parseInt(Ember.get(this, 'pageSize'), 10);
        let arrangedContentLength = Ember.get(this, 'recordsCount');
        let pageNumber = arrangedContentLength / pageSize;
        pageNumber = 0 === pageNumber % 1 ? pageNumber : Math.floor(pageNumber) + 1;
        Ember.get(this, 'goToPage')(pageNumber);
      }
    }
  });
});