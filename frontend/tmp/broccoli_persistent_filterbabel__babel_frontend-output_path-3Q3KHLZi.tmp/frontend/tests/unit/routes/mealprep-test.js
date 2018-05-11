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