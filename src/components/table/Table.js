import {ExcelComponent} from '../../core/ExcelComponents';
import {getTable} from './table.template';
import {TableResizer} from './TableResizer';
import {TableSelector, tableSelectorKeyCodes} from './TableSelector';
import {shouldResize, isCell} from './table.helpers';
import {resizeTable} from '../../redux/actionCreators';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup', 'click', 'keydown', 'input'],
      ...options,
    });
    this.onMousemove = this.onMousemove.bind(this);
  }

  init() {
    super.init();
    this.tableResizer = new TableResizer(this.$root, this.$getState());
    this.tableSelector = new TableSelector(this.$root);
    this.initSubscribers();
    this.$emmit('cell:changed', this.tableSelector.activeCellText);
    this.$subscrbe((state) => console.log(state));
  }

  initSubscribers() {
    this.$on('formula:apply', () => this.tableSelector.handleFormulaApply());
    this.$on('formula:input', (text) =>
      this.tableSelector.handleFormulaInput(text)
    );
  }

  onInput(event) {
    if (isCell(event)) {
      this.$emmit('cell:input', this.tableSelector.activeCellText);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.tableResizer.preapreResizer(event);
      this.$root.on('mousemove', this.onMousemove);
      return;
    }
    if (isCell(event)) {
      this.tableSelector.select(event);
      this.$emmit('cell:changed', this.tableSelector.activeCellText);
      this.tableSelector.preapreMultipleSelection(event);
      this.$root.on('mousemove', this.onMousemove);
    }
  }

  onMouseup(event) {
    this.$root.off('mousemove', this.onMousemove);
    this.tableResizer.resizeSrarted &&
      this.tableResizer
        .resize(event)
        .then((data) => this.$dispatch(resizeTable(data)));
  }

  onMousemove(event) {
    this.tableResizer.resizeSrarted && this.tableResizer.moveResizer(event);

    this.tableSelector.multipleSelectionStarted &&
      this.tableSelector.moveSelector(event);
  }

  onClick(event) {}

  onKeydown(event) {
    if (tableSelectorKeyCodes.indexOf(event.code) > -1 && !event.shiftKey) {
      event.preventDefault();
      this.tableSelector.handleKeydown(event.code);
      this.$emmit('cell:changed', this.tableSelector.activeCellText);
    }
  }

  toHTML() {
    return getTable(15, this.$getState());
  }
}
