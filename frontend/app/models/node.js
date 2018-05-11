import DS from 'ember-data';

export default DS.Model.extend({
  nodeid: DS.attr(),
  nodename: DS.attr(),
  nodetype: DS.attr()
});
