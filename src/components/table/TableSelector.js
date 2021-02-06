import {$} from '../../core/dom';
import parse from '../../core/parse';
import {
  isCell,
  getCellIndexes,
  getCellsRange,
  isEqualCells,
} from './table.helpers';

export const tableSelectorKeyCodes = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Enter',
  'Tab',
];

export const arrowKeyCodes = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
];

export class TableSelector {
  static selectedStyle = 'selected';
  static multipleSelectionCellStyle = 'multiple-selection-cell';

  $selectedCells = [];
  $activeCell;

  constructor($table) {
    this.$table = $table;
    this.init();
  }

  get activeCellText() {
    return this.$activeCell.attribute('data-value');
  }

  get activeCellIdx() {
    return this.$activeCell.data.cellcomplexname;
  }

  get activeCellsIds() {
    const cells = [];
    this.$selectedCells.forEach((cell) =>
      cells.push(cell.data.cellcomplexname)
    );
    if (cells.indexOf(this.activeCellIdx) === -1) {
      cells.push(this.activeCellIdx);
    }
    return cells;
  }

  init() {
    this.$activeCell = this.$table.find('[data-cellcomplexname="1:1"]');
    this.$activeCell.toggleClass(TableSelector.selectedStyle);
    this.$activeCell.focus();
  }

  applyStyles(styles) {
    this.$activeCell.css(styles);
    this.$selectedCells.forEach(($cell) => $cell.css(styles));
  }

  select(event) {
    const $cell = $(event.target);
    this.selectCell($cell);
  }

  selectCell($cell) {
    this.$activeCell.toggleClass(TableSelector.selectedStyle);
    this.$activeCell = $cell;
    this.$activeCell.toggleClass(TableSelector.selectedStyle);
    this.$activeCell.focus();
  }

  preapreMultipleSelection(event) {
    this.multipleSelectionStarted = true;
    this.startCell = $(event.target);
    this.clearSelectedCells();
  }

  moveSelector(event) {
    const currentCell = $(event.target);
    const cellsAreEqual = isEqualCells(this.startCell, currentCell);

    if (isCell(event) && !cellsAreEqual) {
      this.clearSelectedCells();
      this.selectCells(this.startCell, currentCell);
      return;
    }

    if (isCell(event) && cellsAreEqual) {
      this.clearSelectedCells();
      return;
    }
  }

  clearSelectedCells() {
    this.$selectedCells.forEach(($cell) =>
      $cell.removeClass(TableSelector.multipleSelectionCellStyle)
    );
    this.$selectedCells = [];
  }

  selectCells(startCell, currentCell) {
    const startCellIdxs = getCellIndexes(startCell);
    const currentCellIdxs = getCellIndexes(currentCell);
    const range = getCellsRange(startCellIdxs, currentCellIdxs);
    const $cells = this.getCellsToSelect(range);
    this.$selectedCells = $cells;
    this.$selectedCells.forEach(($cell) =>
      $cell.appendClass(TableSelector.multipleSelectionCellStyle)
    );
  }

  getCellsToSelect(range) {
    const {colRange, rowRange} = range;

    const cellNames = [];
    for (let row = rowRange.from; row <= rowRange.to; row += 1) {
      for (let col = colRange.from; col <= colRange.to; col += 1) {
        cellNames.push(`${col}:${row}`);
      }
    }

    const $cells = cellNames.map((name) =>
      this.$table.find(`[data-cellcomplexname="${name}"]`)
    );

    return $cells;
  }

  handleKeydown(keyCode) {
    if (arrowKeyCodes.indexOf(keyCode) > -1) {
      this.handleArrowsKey(keyCode);
      return;
    }
    if (keyCode === 'Tab') {
      this.handleTabKey();
      return;
    }
    if (keyCode === 'Enter') {
      this.handleEnterKey();
      return;
    }
    throw new Error('Impossible key code for TableSelector');
  }

  handleArrowsKey(keyCode) {
    const [colIdx, rowIdx] = getCellIndexes(this.$activeCell);

    let nextCellIdx;
    switch (keyCode) {
      case 'ArrowLeft':
        nextCellIdx = `${colIdx - 1}:${rowIdx}`;
        break;
      case 'ArrowRight':
        nextCellIdx = `${colIdx + 1}:${rowIdx}`;
        break;
      case 'ArrowUp':
        nextCellIdx = `${colIdx}:${rowIdx - 1}`;
        break;
      case 'ArrowDown':
        nextCellIdx = `${colIdx}:${rowIdx + 1}`;
        break;
      default:
        throw new Error('Unknown arrow key code');
    }

    const $nextCell = this.$table.find(
      `[data-cellcomplexname="${nextCellIdx}"]`
    );
    if ($nextCell) {
      this.$activeCell.blur();
      this.selectCell($nextCell);
    }
  }

  handleTabKey() {
    const [colIdx, rowIdx] = getCellIndexes(this.$activeCell);
    const nextCellIdx = `${colIdx + 1}:${rowIdx}`;

    const $nextCell = this.$table.find(
      `[data-cellcomplexname="${nextCellIdx}"]`
    );
    if ($nextCell) {
      this.$activeCell.blur();
      this.selectCell($nextCell);
    }
  }

  handleEnterKey() {
    const [colIdx, rowIdx] = getCellIndexes(this.$activeCell);
    const nextCellIdx = `${colIdx}:${rowIdx + 1}`;

    const $nextCell = this.$table.find(
      `[data-cellcomplexname="${nextCellIdx}"]`
    );
    if ($nextCell) {
      this.$activeCell.blur();
      this.selectCell($nextCell);
    }
  }

  handleFormulaInput(value) {
    this.$activeCell.attribute('data-value', value).text(parse(value));
  }

  handleFormulaApply() {
    this.$activeCell.focus();
  }
}
