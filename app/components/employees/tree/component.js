import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action, set } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class EmployeesTree extends Component {
  @service
  store;

  @tracked
  employeeTree = this.buildEmployeeTree(this.args.employees);

  get ceo() {
    return this.args.employees.findBy('isCEO');
  }

  @action
  buildEmployeeTree(employees) {
    let tree = {};
    let roots = [];

    employees.forEach((node) => {
      set(node, 'children', A());
      set(node, 'isSelected', node.isSelected || false);

      tree[node.id] = node;
    });

    employees.forEach((employee) => {
      let child = tree[employee.id];
      let parent = employee.get('manager.id');

      if (isEmpty(parent)) {
        roots.pushObject(child);
      } else {
        tree[parent].children.pushObject(child);
      }
    });

    return roots;
  }

  @task
  *saveEmployeeTask(model) {
    yield model.save();
    let employees = yield this.store.findAll('employee');
    this.employeeTree = this.buildEmployeeTree(employees);
  }
}
