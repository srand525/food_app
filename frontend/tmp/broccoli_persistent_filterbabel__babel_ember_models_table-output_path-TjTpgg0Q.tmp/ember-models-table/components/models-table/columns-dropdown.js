define('ember-models-table/components/models-table/columns-dropdown', ['exports', 'ember-models-table/templates/components/models-table/columns-dropdown'], function (exports, _columnsDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _columnsDropdown.default,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/processedColumns:property"}}ModelsTable.processedColumns{{/crossLink}}
     *
     * @property processedColumns
     * @type object[]
     * @default null
     */
    processedColumns: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/columnDropdownOptions:property"}}ModelsTable.columnDropdownOptions{{/crossLink}}
     *
     * @property columnDropdownOptions
     * @type object[]
     * @default null
     */
    columnDropdownOptions: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.showAllColumns:method"}}ModelsTable.actions.showAllColumns{{/crossLink}}
     *
     * @event showAllColumns
     */
    showAllColumns: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.hideAllColumns:method"}}ModelsTable.actions.hideAllColumns{{/crossLink}}
     *
     * @event hideAllColumns
     */
    hideAllColumns: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.restoreDefaultVisibility:method"}}ModelsTable.actions.restoreDefaultVisibility{{/crossLink}}
     *
     * @event restoreDefaultVisibility
     */
    restoreDefaultVisibility: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.toggleColumnSet:method"}}ModelsTable.actions.toggleColumnSet{{/crossLink}}
     *
     * @event toggleColumnSet
     */
    toggleColumnSet: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.toggleHidden:method"}}ModelsTable.actions.toggleHidden{{/crossLink}}
     *
     * @event toggleHidden
     */
    toggleHidden: null,

    /**
     * Closure action {{#crossLink "Components.ModelsTable/actions.sendAction:method"}}ModelsTable.actions.sendAction{{/crossLink}}
     *
     * @event sendAction
     */
    sendAction: null,

    actions: {
      showAllColumns() {
        Ember.get(this, 'showAllColumns')();
      },
      hideAllColumns() {
        Ember.get(this, 'hideAllColumns')();
      },
      restoreDefaultVisibility() {
        Ember.get(this, 'restoreDefaultVisibility')();
      },
      toggleColumnSet(columnSet) {
        Ember.get(this, 'toggleColumnSet')(columnSet);
      },
      toggleHidden(column) {
        Ember.get(this, 'toggleHidden')(column);
      }
    }
  });
});