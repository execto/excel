import {ExcelComponent} from '../../core/ExcelComponents';
import {getTable} from './table.template';
import {TableResizer} from './TableResizer';
import {TableSelector, tableSelectorKeyCodes} from './TableSelector';
import {shouldResize, isCell} from './table.helpers';
import {
  applyCellStyles,
  cellStyleChange,
  changeText,
  resizeTable,
} from '../../redux/actionCreators';
import {cellStyles} from '../../consts/cellStyles';

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
    this.updateCellState();
  }

  initSubscribers() {
    this.$on('formula:apply', () => this.tableSelector.handleFormulaApply());
    this.$on('formula:input', (text) => {
      this.tableSelector.handleFormulaInput(text);
      this.updateCellState();
    });
    this.$on('toolbar:applyStyles', (styles) => {
      this.tableSelector.applyStyles(styles);
      this.$dispatch(
        applyCellStyles({
          styles,
          cellIds: this.tableSelector.activeCellsIds,
        })
      );
    });
  }

  onInput(event) {
    if (isCell(event)) {
      this.updateCellState();
    }
  }

  updateCellState() {
    const activeCellText = this.tableSelector.activeCellText;
    const activeCellId = this.tableSelector.activeCellIdx;
    this.$dispatch(changeText({id: activeCellId, value: activeCellText}));
    this.$dispatch(
      cellStyleChange(
        this.tableSelector.$activeCell.getCss(Object.keys(cellStyles))
      )
    );
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.tableResizer.preapreResizer(event);
      this.$root.on('mousemove', this.onMousemove);
      return;
    }
    if (isCell(event)) {
      this.tableSelector.select(event);
      // this.updateCellState();
      this.$emmit('cell:changed', this.tableSelector.activeCellText);
      this.$dispatch(
        cellStyleChange(
          this.tableSelector.$activeCell.getCss(Object.keys(cellStyles))
        )
      );
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
