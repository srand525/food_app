QUnit.module('ESLint | app');

QUnit.test('adapters/graph.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'adapters/graph.js should pass ESLint\n\n');
});

QUnit.test('adapters/ingredient.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'adapters/ingredient.js should pass ESLint\n\n');
});

QUnit.test('adapters/node.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'adapters/node.js should pass ESLint\n\n');
});

QUnit.test('adapters/user.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'adapters/user.js should pass ESLint\n\n');
});

QUnit.test('app.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'app.js should pass ESLint\n\n');
});

QUnit.test('components/ingredient-component.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/ingredient-component.js should pass ESLint\n\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n13:1 - Unexpected console statement. (no-console)');
});

QUnit.test('components/node-component.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/node-component.js should pass ESLint\n\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n21:1 - Unexpected console statement. (no-console)');
});

QUnit.test('models/graph.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/graph.js should pass ESLint\n\n');
});

QUnit.test('models/ingredient.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/ingredient.js should pass ESLint\n\n');
});

QUnit.test('models/node.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/node.js should pass ESLint\n\n');
});

QUnit.test('models/user.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/user.js should pass ESLint\n\n');
});

QUnit.test('resolver.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'resolver.js should pass ESLint\n\n');
});

QUnit.test('router.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'router.js should pass ESLint\n\n');
});

QUnit.test('routes/about.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/about.js should pass ESLint\n\n');
});

QUnit.test('routes/foodweb.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/foodweb.js should pass ESLint\n\n');
});

QUnit.test('routes/graphs.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/graphs.js should pass ESLint\n\n4:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
});

QUnit.test('routes/index.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/index.js should pass ESLint\n\n');
});

QUnit.test('routes/ingredient/nutrition.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/ingredient/nutrition.js should pass ESLint\n\n');
});

QUnit.test('routes/ingredients.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/ingredients.js should pass ESLint\n\n4:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
});

QUnit.test('routes/mealprep.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/mealprep.js should pass ESLint\n\n');
});

QUnit.test('routes/nodes.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/nodes.js should pass ESLint\n\n4:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
});

QUnit.test('routes/package.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/package.js should pass ESLint\n\n');
});

QUnit.test('routes/plan.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/plan.js should pass ESLint\n\n');
});

QUnit.test('routes/prep.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/prep.js should pass ESLint\n\n');
});

QUnit.test('routes/users.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/users.js should pass ESLint\n\n4:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
});

