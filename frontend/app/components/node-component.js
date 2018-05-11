import Component from '@ember/component';

export default Component.extend({
  columns: [
  // {
  //   "propertyName": "nodeid"
  //   // ,"title": "Ingredient Name"
  // },
  {
    "propertyName": "nodename"
    // ,"title": "Ingredient Name"
  },
  {
    "propertyName": "nodetype"
    // ,"title": "Ingredient Name"
  }
]
,
didReceiveAttrs(){
this._super(...arguments);
console.log(this.get('data'));
}

});
