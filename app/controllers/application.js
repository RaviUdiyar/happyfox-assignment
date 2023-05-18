import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { isBlank } from '@ember/utils';
import { action, set } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { task } from 'ember-concurrency';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service
  store;

  @tracked
  employees = [];

  @tracked
  filteredEmployees = this.model;

  @tracked
  employeeTree = this.buildEmployeeTree(this.model);

  get allTeams() {
    return this.model.map((employee) => employee.team).uniq();
  }

  @task
  *saveEmployeeTask(model) {
    yield model.save();
    let employees = yield this.store.findAll('employee');
    this.employeeTree = this.buildEmployeeTree(employees);
  }

  @action
  applyFilter(employee, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return (
      employee.name?.toLowerCase().includes(searchTerm) ||
      employee.designation?.toLowerCase().includes(searchTerm) ||
      employee.team?.toLowerCase().includes(searchTerm)
    );
  }

  @action
  filterEmployeesOnSearchTerm(value) {
    this.resetHighlight();
    if (isBlank(value)) {
      this.filteredEmployees = this.model;
    } else {
      this.filteredEmployees = this.model.filter((employee) =>
        this.applyFilter(employee, value)
      );
      this.highlightFiltered();
    }
  }

  @action
  filterEmployeesOnTeam(value) {
    this.resetHighlight();
    if (value === '' || value === 'all') {
      this.filteredEmployees = this.model;
    } else {
      this.filteredEmployees = this.model.filter((employee) => {
        return employee.team === value;
      });
      this.highlightFiltered();
    }
    // this.employeeTree = this.buildEmployeeTree(this.filteredEmployees);
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
        if (isEmpty(tree[parent])) {
          roots.pushObject(child);
        }
        tree[parent]?.children?.pushObject(child);
      }
    });

    return roots;
  }

  @action
  resetHighlight() {
    this.model.forEach((employee) => {
      set(employee, 'isHighlighted', false);
    });
  }

  @action
  highlightFiltered() {
    this.filteredEmployees.forEach((employee) => {
      set(employee, 'isHighlighted', true);
    });
  }
}
