define('frontend/routes/ingredients', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.get('store').findAll('ingredient');
      // return [{"id": "4545", "info":"123"}];
    }
  });
});