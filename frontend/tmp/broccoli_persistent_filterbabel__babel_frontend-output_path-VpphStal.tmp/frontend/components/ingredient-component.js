define("frontend/components/ingredient-component", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    columns: [{
      "propertyName": "ingname",
      "title": "Ingredient Name"
    }],

    didReceiveAttrs() {
      this._super(...arguments);
      console.log(this.get('data'));
    }

  });
});