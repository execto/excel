import {ExcelComponent} from '../../core/ExcelComponents';
import {getTable} from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  toHTML() {
    return getTable();
  }
}
