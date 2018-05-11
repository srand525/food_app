'use strict';

define('frontend/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/graph.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/graph.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/ingredient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/ingredient.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/node.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/node.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/user.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/ingredient-component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/ingredient-component.js should pass ESLint\n\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n13:1 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/node-component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/node-component.js should pass ESLint\n\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n21:1 - Unexpected console statement. (no-console)');
  });

  QUnit.test('models/graph.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/graph.js should pass ESLint\n\n');
  });

  QUnit.test('models/ingredient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/ingredient.js should pass ESLint\n\n');
  });

  QUnit.test('models/node.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/node.js should pass ESLint\n\n');
  });

  QUnit.test('models/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/about.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass ESLint\n\n');
  });

  QUnit.test('routes/foodweb.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/foodweb.js should pass ESLint\n\n');
  });

  QUnit.test('routes/graphs.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/graphs.js should pass ESLint\n\n4:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/ingredient/nutrition.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/ingredient/nutrition.js should pass ESLint\n\n');
  });

  QUnit.test('routes/ingredients.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/ingredients.js should pass ESLint\n\n4:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('routes/mealprep.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/mealprep.js should pass ESLint\n\n');
  });

  QUnit.test('routes/nodes.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/nodes.js should pass ESLint\n\n4:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('routes/package.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/package.js should pass ESLint\n\n');
  });

  QUnit.test('routes/plan.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/plan.js should pass ESLint\n\n');
  });

  QUnit.test('routes/prep.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/prep.js should pass ESLint\n\n');
  });

  QUnit.test('routes/users.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/users.js should pass ESLint\n\n4:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });
});
define('frontend/tests/integration/components/ingredient-component-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | ingredient-component', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "uT/j6psn",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"ingredient-component\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Sh+8pZ1G",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"ingredient-component\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('frontend/tests/integration/components/node-component-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | node-component', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "iENUYw1N",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"node-component\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "F1Wv2wR0",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"node-component\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('frontend/tests/test-helper', ['frontend/app', 'frontend/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('frontend/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/ingredient-component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/ingredient-component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/node-component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/node-component-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/graph-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/graph-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/ingredient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/ingredient-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/node-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/node-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/user-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/graph-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/graph-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/ingredient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/ingredient-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/node-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/node-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/user-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/about-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/foodweb-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/foodweb-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/graphs-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/graphs-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/ingredient/nutrition-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/ingredient/nutrition-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/ingredients-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/ingredients-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/mealprep-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/mealprep-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/nodes-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/nodes-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/package-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/package-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/plan-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/plan-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/prep-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/prep-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users-test.js should pass ESLint\n\n');
  });
});
define('frontend/tests/unit/adapters/graph-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Adapter | graph', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:graph');
      assert.ok(adapter);
    });
  });
});
define('frontend/tests/unit/adapters/ingredient-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Adapter | ingredient', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:ingredient');
      assert.ok(adapter);
    });
  });
});
define('frontend/tests/unit/adapters/node-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Adapter | node', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:node');
      assert.ok(adapter);
    });
  });
});
define('frontend/tests/unit/adapters/user-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Adapter | user', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:user');
      assert.ok(adapter);
    });
  });
});
define('frontend/tests/unit/models/graph-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | graph', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('graph', {}));
      assert.ok(model);
    });
  });
});
define('frontend/tests/unit/models/ingredient-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | ingredient', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('ingredient', {}));
      assert.ok(model);
    });
  });
});
define('frontend/tests/unit/models/node-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | node', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('node', {}));
      assert.ok(model);
    });
  });
});
define('frontend/tests/unit/models/user-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | user', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('user', {}));
      assert.ok(model);
    });
  });
});
define('frontend/tests/unit/routes/about-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | about', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:about');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/routes/foodweb-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | foodweb', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:foodweb');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/routes/graphs-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | graphs', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:graphs');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/routes/index-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/routes/ingredient/nutrition-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | ingredient/nutrition', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:ingredient/nutrition');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/routes/ingredients-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | ingredients', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:ingredients');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/routes/mealprep-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | mealprep', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:mealprep');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/routes/nodes-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | nodes', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:nodes');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/routes/package-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | package', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:package');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/routes/plan-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | plan', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:plan');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/routes/prep-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | prep', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:prep');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/routes/users-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | users', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:users');
      assert.ok(route);
    });
  });
});
define('frontend/config/environment', [], function() {
  var prefix = 'frontend';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('frontend/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
