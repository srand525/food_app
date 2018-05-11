define('ember-models-table/components/models-table/pagination-numeric', ['exports', 'ember-models-table/templates/components/models-table/pagination-numeric'], function (exports, _paginationNumeric) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _paginationNumeric.default,
    classNameBindings: ['themeInstance.paginationWrapper', 'themeInstance.paginationWrapperNumeric'],

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
     * Bound from {{#crossLink "Components.ModelsTable/pageSize:property"}}ModelsTable.pageSize{{/crossLink}}
     *
     * @property pageSize
     * @type number
     * @default null
     */
    pageSize: null,

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
     * List of links to the page
     * Used if {{#crossLink "Components.ModelsTable/useNumericPagination:property"}}ModelsTable.useNumericPagination{{/crossLink}} is true
     * @typedef {object} visiblePageNumber
     * @property {boolean} isLink
     * @property {boolean} isActive
     * @property {string} label
     *
     * @type {visiblePageNumber[]}
     * @property visiblePageNumbers
     */
    visiblePageNumbers: Ember.computed('pagesCount', 'currentPageNumber', function () {
      const {
        pagesCount,
        currentPageNumber
      } = Ember.getProperties(this, 'pagesCount', 'currentPageNumber');
      const notLinkLabel = '...';
      let groups = []; // array of 8 numbers
      let labels = Ember.A([]);
      groups[0] = 1;
      groups[1] = Math.min(1, pagesCount);
      groups[6] = Math.max(1, pagesCount);
      groups[7] = pagesCount;
      groups[3] = Math.max(groups[1] + 1, currentPageNumber - 1);
      groups[4] = Math.min(groups[6] - 1, currentPageNumber + 1);
      groups[2] = Math.floor((groups[1] + groups[3]) / 2);
      groups[5] = Math.floor((groups[4] + groups[6]) / 2);

      for (let n = groups[0]; n <= groups[1]; n++) {
        labels[n] = n;
      }
      const userGroup2 = groups[4] >= groups[3] && groups[3] - groups[1] > 1;
      if (userGroup2) {
        labels[groups[2]] = notLinkLabel;
      }
      for (let i = groups[3]; i <= groups[4]; i++) {
        labels[i] = i;
      }
      const userGroup5 = groups[4] >= groups[3] && groups[6] - groups[4] > 1;
      if (userGroup5) {
        labels[groups[5]] = notLinkLabel;
      }
      for (let i = groups[6]; i <= groups[7]; i++) {
        labels[i] = i;
      }
      return Ember.A(labels.compact().map(label => ({
        label: label,
        isLink: label !== notLinkLabel,
        isActive: label === currentPageNumber })));
    }),

    actions: {
      gotoCustomPage(pageNumber) {
        Ember.get(this, 'goToPage')(pageNumber);
      }
    }
  });
});