define("frontend/templates/nodes", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LW57JCgd", "block": "{\"symbols\":[],\"statements\":[[6,\"h2\"],[8],[0,\"NODES\"],[9],[0,\"\\n\\n\"],[6,\"p\"],[8],[0,\" put a graph viz here! \"],[9],[0,\"\\n\"],[2,\" {{#each model as |post|}}\\n    <p>{{post.node_id}}</p>\\n        <p>{{post.node_name}}</p>\\n            <p>{{post.node_type}}</p>\\n{{/each}} \"],[0,\"\\n\"],[1,[26,\"node-component\",null,[[\"data\"],[[22,[\"model\"]]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/nodes.hbs" } });
});