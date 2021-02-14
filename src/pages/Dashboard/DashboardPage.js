import {$} from '../../core/dom';
import Page from '../../core/Page';
import {getDasboardTable} from './dashboard.functions';

export default class DasboardPage extends Page {
  constructor() {
    super();
    this.$root = $.create('div', 'dashboard');
  }
  getRoot() {
    this.$root.html(`
    <div class="dashboard__header">
      <h1>Excel dashboard</h1>
    </div>
    <div class="dashboard__new">
      <div class="dashboard__view">
        <a href="#excel/${new Date().getTime().toString()}" class="create">
          New <br />
          table
        </a>
      </div>
    </div>
    <div class="dashboard__tables dashboard__view">
      ${getDasboardTable()}
    </div>`);

    return this.$root;
  }
}
