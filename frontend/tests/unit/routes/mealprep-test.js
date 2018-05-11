import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | mealprep', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:mealprep');
    assert.ok(route);
  });
});
