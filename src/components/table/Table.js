import {ExcelComponent} from '../../core/ExcelComponents';
import {getTable} from './table.template';
import {TableResizer} from './TableResizer';
import {TableSelector} from './TableSelector';
import {shouldResize, isCell} from './table.helpers';

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
    if (shouldResize(event)) {
      this.tableResizer.preapreResizer(event);
      this.$root.on('mousemove', this.onMousemove);
      return;
    }
    if (isCell(event)) {
      this.tableSelector.select(event);
      this.tableSelector.preapreMultipleSelection(event);
      this.$root.on('mousemove', this.onMousemove);
    }
  }

  onMouseup(event) {
    this.$root.off('mousemove', this.onMousemove);
    this.tableResizer.resizeSrarted && this.tableResizer.resize(event);
  }

  onMousemove(event) {
    this.tableResizer.resizeSrarted && this.tableResizer.moveResizer(event);

    this.tableSelector.multipleSelectionStarted &&
      this.tableSelector.moveSelector(event);
  }

  onClick(event) {}

  toHTML() {
    return getTable();
  }
}
