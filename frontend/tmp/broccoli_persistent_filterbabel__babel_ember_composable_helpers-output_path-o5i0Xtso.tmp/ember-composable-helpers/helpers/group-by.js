define('ember-composable-helpers/helpers/group-by', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const groupFunction = function () {
    let array = Ember.get(this, 'array');
    let byPath = Ember.get(this, 'byPath');
    let groups = Ember.Object.create();

    array.forEach(item => {
      let groupName = Ember.get(item, byPath);
      let group = Ember.get(groups, groupName);

      if (!Ember.isArray(group)) {
        group = Ember.A();
        groups[`${groupName}`] = group;
      }

      group.push(item);
    });

    return groups;
  };

  exports.default = Ember.Helper.extend({
    compute([byPath, array]) {
      Ember.set(this, 'array', array);
      Ember.set(this, 'byPath', byPath);

      return Ember.get(this, 'content');
    },

    byPathDidChange: Ember.observer('byPath', function () {
      let byPath = Ember.get(this, 'byPath');

      if (byPath) {
        Ember.defineProperty(this, 'content', Ember.computed(`array.@each.${byPath}`, groupFunction));
      } else {
        Ember.defineProperty(this, 'content', null);
      }
    }),

    contentDidChange: Ember.observer('content', function () {
      this.recompute();
    })
  });
});