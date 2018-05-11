define('ember-models-table/components/models-table/cell-edit-toggle', ['exports', 'ember-models-table/templates/components/models-table/cell-edit-toggle'], function (exports, _cellEditToggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _cellEditToggle.default,

    record: null,

    /**
     * Bound from {{#crossLink "Components.ModelsTable/themeInstance:property"}}ModelsTable.themeInstance{{/crossLink}}
     *
     * @property themeInstance
     * @type object
     * @default null
     */
    themeInstance: null,

    /**
     * Closure action sent on Edit Button being clicked
     *
     * Action will send one parameter - object with fields:
     *
     * * `record` - The record to be edited
     *
     * @type function
     * @event editRowAction
     * @default null
     * @return Must return a truthy value to allow the row to enter the Edit state. May return a Promise.
     */
    editRowAction: null,

    /**
     * Closure action sent on Save Button being clicked
     *
     * Action will send one parameter - object with fields:
     *
     * * `record` - The record to be saved
     *
     * @type function
     * @event saveRowAction
     * @default null
     * @return Must return a truthy value to allow the row to exit the Edit state. May return a Promise.
     */
    saveRowAction: null,

    /**
     * Closure action sent on Cancel Button being clicked
     *
     * Action will send one parameter - object with fields:
     *
     * * `record` - The record currently being edited
     *
     * @type function
     * @event cancelRowAction
     * @default null
     * @return Must return a truthy value to allow the row to exit the Edit state. May return a Promise.
     */
    cancelRowAction: null,

    /**
     * The label for the Edit Button
     *
     * @property editButtonLabel
     * @type string
     * @default themeInstance.messages.editRowButtonLabel
     */
    editButtonLabel: Ember.computed({
      get() {
        return Ember.get(this, 'themeInstance.messages.editRowButtonLabel');
      },
      set(k, v) {
        return v;
      }
    }),

    /**
     * The label for the Cancel Button
     *
     * @property cancelButtonLabel
     * @type string
     * @default themeInstance.messages.cancelRowButtonLabel
     */
    cancelButtonLabel: Ember.computed({
      get() {
        return Ember.get(this, 'themeInstance.messages.cancelRowButtonLabel');
      },
      set(k, v) {
        return v;
      }
    }),

    /**
     * The label for the Save Button
     *
     * @property saveButtonLabel
     * @type string
     * @default themeInstance.messages.saveRowButtonLabel
     */
    saveButtonLabel: Ember.computed({
      get() {
        return Ember.get(this, 'themeInstance.messages.saveRowButtonLabel');
      },
      set(k, v) {
        return v;
      }
    }),

    click(event) {
      event.stopPropagation();
    },

    actions: {
      saveClicked() {
        let actionResult = true;
        let action = Ember.get(this, 'saveRowAction');
        if (action) {
          actionResult = action({ record: Ember.get(this, 'record') });
        }
        Ember.RSVP.resolve(actionResult).then(result => {
          if (result) {
            Ember.get(this, 'saveRow')();
          }
        });
      },

      editClicked() {
        let actionResult = true;
        let editRow = Ember.get(this, 'editRow');
        let action = Ember.get(this, 'editRowAction');
        if (action) {
          actionResult = action({ record: Ember.get(this, 'record') });
        }
        Ember.RSVP.resolve(actionResult).then(result => {
          if (result) {
            editRow();
          }
        });
      },

      cancelClicked() {
        let actionResult = true;
        let action = Ember.get(this, 'cancelRowAction');
        if (action) {
          actionResult = action({ record: Ember.get(this, 'record') });
        }
        Ember.RSVP.resolve(actionResult).then(result => {
          if (result) {
            Ember.get(this, 'cancelEditRow')();
          }
        });
      }

    }
  });
});