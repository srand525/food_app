define("frontend/components/node-component", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    columns: [
    // {
    //   "propertyName": "nodeid"
    //   // ,"title": "Ingredient Name"
    // },
    {
      "propertyName": "nodename"
      // ,"title": "Ingredient Name"
    }, {
      "propertyName": "nodetype"
      // ,"title": "Ingredient Name"
    }],

    didReceiveAttrs() {
      this._super(...arguments);
      console.log(this.get('data'));
    }

  });
});