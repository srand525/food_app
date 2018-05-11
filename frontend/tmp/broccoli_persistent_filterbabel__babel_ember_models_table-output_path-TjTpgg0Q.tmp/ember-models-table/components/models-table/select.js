define('ember-models-table/components/models-table/select', ['exports', 'ember-models-table/templates/components/models-table/select'], function (exports, _select) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    layout: _select.default,
    tagName: 'select',
    classNameBindings: ['cssPropertyName', 'themeInstance.input', 'themeInstance.select'],

    /**
     * @type string
     * @default ''
     * @property type
     */
    type: '',

    /**
     * @type string
     * @default ''
     * @property cssPropertyName
     */
    cssPropertyName: '',

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

    change() {
      this.set('value', this.$('option:selected').val());
    }

  });
});