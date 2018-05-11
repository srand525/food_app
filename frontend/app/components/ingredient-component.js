import Component from '@ember/component';

export default Component.extend({
  columns: [
  {
    "propertyName": "ingname"
    ,"title": "Ingredient Name"
  }
]
,
didReceiveAttrs(){
this._super(...arguments);
console.log(this.get('data'));
}

});
