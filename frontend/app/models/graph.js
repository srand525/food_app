import DS from 'ember-data';

export default DS.Model.extend({
  edges: DS.attr(),
  nodes: DS.attr()
});
