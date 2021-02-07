import {$} from '../core/dom';
import Page from '../core/Page';

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
      <a href="#" class="create">
        New <br />
        table
      </a>
    </div>
  </div>
  <div class="dashboard__tables dashboard__view">
    <div class="header">
      <span>
        Table name
      </span>
      <span>
        Last opened date
      </span>
    </div>

    <div class="list">
      <li class="record">
        <a href="#">Table 1</a>
        <strong>18.05.2020</strong>
      </li>
      <li class="record">
        <a href="#">Table 1</a>
        <strong>18.05.2020</strong>
      </li>
      <li class="record">
        <a href="#">Table 1</a>
        <strong>18.05.2020</strong>
      </li>
    </div>
  </div>`);

    return this.$root;
  }
}
