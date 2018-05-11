define("ember-composable-helpers/utils/includes", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = includes;
  function includes(haystack, ...args) {
    let finder = haystack.includes || haystack.contains;
    return finder.apply(haystack, args);
  }
});