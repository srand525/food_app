define('frontend/router', ['exports', 'frontend/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('users');
    this.route('about');
    this.route('ingredients');
    this.route('contact');
    this.route('nodes');
    this.route('mealprep', function () {});
    this.route('foodweb');
    this.route('plan');
    this.route('prep');
    this.route('package');

    this.route('ingredient', function () {
      this.route('nutrition');
    });
    this.route('graphs');
  });

  exports.default = Router;
});