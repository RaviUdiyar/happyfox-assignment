import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Sidebar extends Component {
  @tracked
  searchTerm = '';

  @tracked
  selectedTeam;
}
