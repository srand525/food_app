define("frontend/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "nOyHTgGG", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n  \"],[14,\"navbar\",[]],[0,\"\\n  \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[2,\" <div class=\\\"container\\\">\\n  <div class=\\\"menu\\\">\\n{{#link-to 'index'}}\\n      <h1>\\n        <em>Your app</em>\\n      </h1>\\n    {{/link-to}}    <div class=\\\"links\\\">\\n{{#link-to 'users'}}\\n        users\\n      {{/link-to}}    </div>\\n  </div>\\n\\n  <div class=\\\"body\\\">\\n    {{outlet}}\\n  </div>\\n</div> \"],[0,\"\\n\"]],\"hasEval\":true}", "meta": { "moduleName": "frontend/templates/application.hbs" } });
});