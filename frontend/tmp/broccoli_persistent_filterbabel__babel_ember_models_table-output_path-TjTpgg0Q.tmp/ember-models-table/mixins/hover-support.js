define('ember-models-table/mixins/hover-support', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Mixin.create({

    enter() {},
    leave() {},

    mouseEnter() {
      this.enter();
    },

    focusIn() {
      this.enter();
    },

    mouseLeave() {
      this.leave();
    },

    focusOut() {
      this.leave();
    }

  });
});