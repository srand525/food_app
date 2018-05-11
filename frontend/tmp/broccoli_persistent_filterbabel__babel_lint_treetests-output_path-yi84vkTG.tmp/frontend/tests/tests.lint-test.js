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