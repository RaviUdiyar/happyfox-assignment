import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class EmployeeModel extends Model {
  @tracked
  isHighlighted = false;

  @attr('string') name;
  @attr('string') designation;
  @attr('string') team;
  @belongsTo('employee', { inverse: 'subordinates' }) manager;
  @hasMany('employee', { inverse: 'manager' }) subordinates;

  get isCEO() {
    return this.id === '1';
  }

  get isManager() {
    return this.belongsTo('manager').value() != null;
  }
}
