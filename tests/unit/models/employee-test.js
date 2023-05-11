import { module, test } from 'qunit';
import { setupTest } from 'happyfox-assignment/tests/helpers';

module('Unit | Model | employee', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('employee', {});
    assert.ok(model);
  });
});
