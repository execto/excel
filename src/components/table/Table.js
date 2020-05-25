import {ExcelComponent} from '../../core/ExcelComponents';
import {getTable} from './table.template';
import {TableResizer} from './TableResizer';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup'],
    });
    this.onMousemove = this.onMousemove.bind(this);
    this.tableResizer = new TableResizer($root);
  }

  onMousedown(event) {
    if (event.target.dataset.resizer) {
      this.tableResizer.setResizerInfo(event);
      this.$root.on('mousemove', this.onMousemove);
    }
  }

  onMouseup(event) {
    this.$root.off('mousemove', this.onMousemove);
    this.tableResizer.resizeSrarted && this.tableResizer.resize(event);
  }

  onMousemove(event) {
    this.tableResizer.startResize(event);
  }

  toHTML() {
    return getTable();
  }
}
