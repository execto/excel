import {ExcelComponent} from '../../core/ExcelComponents';
import {tableNameChange} from '../../redux/actionCreators';
import {getHeaderTemplate} from './header.template';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  get template() {
    return getHeaderTemplate(this.$getState().tableName || 'New table');
  }

  onInput(event) {
    this.$dispatch(tableNameChange(event.target.value));
  }

  toHTML() {
    return this.template;
  }
}
