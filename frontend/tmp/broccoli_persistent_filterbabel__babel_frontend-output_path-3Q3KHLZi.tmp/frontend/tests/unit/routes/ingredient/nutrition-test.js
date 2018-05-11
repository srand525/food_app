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