import {$} from '../../core/dom';
import {
  isCell,
  getCellIndexes,
  getCellsRange,
  isEqualCells,
} from './table.helpers';

export class TableSelector {
  static selectedStyle = 'selected';
  static multipleSelectionCellStyle = 'multiple-selection-cell';

  $selectedCells = [];
  $activeCell;

  constructor($table) {
    this.$table = $table;
    this.init();
  }

  init() {
    this.$activeCell = this.$table.find('[data-cellcomplexname="1:1"]');
    this.$activeCell.toggleClass(TableSelector.selectedStyle);
  }

  select(event) {
    this.$activeCell.toggleClass(TableSelector.selectedStyle);
    this.$activeCell = $(event.target);
    this.$activeCell.toggleClass(TableSelector.selectedStyle);
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
}
