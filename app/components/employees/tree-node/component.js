import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EmployeeTreeNode extends Component {
  @service
  store;

  @tracked
  selectedTeam;

  @tracked
  draggedModel;

  get employees() {
    return this.store.peekAll('employee');
  }

  @action
  onDragStart(model, event) {
    if (model.isCEO) return;
    this.draggedModel = model;
    let dataTransfer = event.dataTransfer;
    dataTransfer.clearData();
    dataTransfer.setData('text/plain', model.id);
    event.dataTransfer.effectAllowed = 'move';
  }

  @action
  onDragEnd() {
    this.draggedOverModel = null;
    this.draggedModel = null;
  }

  @action
  onDrop(model, event) {
    let modelId = event.dataTransfer.getData('text');
    this.draggedModel = this.employees.find((e) => e.id == modelId);

    if (
      model &&
      this.draggedModel &&
      model.id !== this.draggedModel.get('manager.id')
    ) {
      this.draggedModel.manager = model;
      this.args.saveTask.perform(this.draggedModel);
    }
  }

  @action
  onDragOver(event) {
    event.preventDefault();
  }
}
