import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | foodweb', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:foodweb');
    assert.ok(route);
  });
});
