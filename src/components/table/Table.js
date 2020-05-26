import {ExcelComponent} from '../../core/ExcelComponents';
import {getTable} from './table.template';
import {TableResizer} from './TableResizer';
import {TableSelector} from './TableSelector';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup', 'click'],
    });
    this.onMousemove = this.onMousemove.bind(this);
  }

  init() {
    super.init();
    this.tableResizer = new TableResizer(this.$root);
    this.tableSelector = new TableSelector(this.$root);
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

  onClick(event) {
    if (event.target.dataset.cellname) {
      this.tableSelector.select(event);
    }
  }

  toHTML() {
    return getTable();
  }
}
