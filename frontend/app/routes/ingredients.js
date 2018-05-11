import Ember from 'ember';


export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('ingredient');
    // return [{"id": "4545", "info":"123"}];
  }
});
