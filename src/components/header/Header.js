import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponents';
import {tableNameChange} from '../../redux/actionCreators';
import {getHeaderTemplate} from './header.template';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  get template() {
    return getHeaderTemplate(this.$getState().tableName || 'New table');
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.attribute('data-btn-name') === 'delete') {
      const tableId = this.$getState().tableId;
      localStorage.removeItem(tableId);
      location.hash = 'dashboard';
    }
  }

  onInput(event) {
    this.$dispatch(tableNameChange(event.target.value));
  }

  toHTML() {
    return this.template;
  }
}
