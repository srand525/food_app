import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('users');
  this.route('about');
  this.route('ingredients');
  this.route('contact');
  this.route('nodes');
  this.route('mealprep', function() {});
  this.route('foodweb');
  this.route('plan');
  this.route('prep');
  this.route('package');

  this.route('ingredient', function() {
    this.route('nutrition');
  });
  this.route('graphs');
});

export default Router;
