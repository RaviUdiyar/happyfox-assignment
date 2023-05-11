import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { isBlank } from '@ember/utils';

export default class Sidebar extends Component {
  @service
  store;

  @tracked
  searchTerm = '';

  @tracked
  selectedTeam;

  @tracked
  filteredEmployees = this.args.employees;

  get teams() {
    return this.args.employees.map((employee) => employee.team).uniq();
  }

  @action
  applyFilter(employee) {
    return (
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.designation
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase()) ||
      employee.team.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  @action
  filterEmployeesOnSearchTerm({ target: { value } }) {
    this.searchTerm = value;
    if (isBlank(value)) return;

    this.filteredEmployees = this.args.employees.filter(this.applyFilter);
  }

  @action
  filterEmployeesOnTeam({ target: { value } }) {
    this.selectedTeam = value;
    if (value === '') {
      this.filteredEmployees = this.args.employees;
    } else {
      this.filteredEmployees = this.args.employees.filter((employee) => {
        return employee.team === value;
      });
    }
  }
}
