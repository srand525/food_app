define('frontend/routes/graphs', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.get('store').findAll('graph');
      // return [{"id": "4545", "info":"123"}];
    }
  });
});