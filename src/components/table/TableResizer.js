import {$} from '../../core/dom';

export class TableResizer {
  resizeSrarted = false;
  constructor($table) {
    this.$table = $table;
  }

  preapreResizer(event) {
    this.resizeSrarted = true;
    this.$resizerEl = $(event.target);
    this.resizerType = this.$resizerEl.data.resizer;
    this.$parentResizerEl = this.$resizerEl.closest('[data-type="resizeble"]');
    this.resizeProperty = this.resizerType === 'col' ? 'right' : 'bottom';
    this.resizerSizes = this.$resizerEl.getSizes();
    this.resizerParentSizes = this.$parentResizerEl.getSizes();
    this.valueToResize =
      this.resizerType === 'col' ? this.resizerSizes.x : this.resizerSizes.y;
  }

  moveResizer(event) {
    const value = this.resizerType === 'col' ? event.clientX : event.clientY;

    this.$resizerEl.css({
      [this.resizeProperty]: `${this.valueToResize - value}px`,
    });
  }

  resize(event) {
    if (this.resizerType === 'col') {
      this.resizeCol(event);
    } else {
      this.resizeRow(event);
    }
    this.resizeSrarted = false;
  }

  resizeRow(event) {
    const currentHeight = this.resizerParentSizes.height;
    const newHeight = currentHeight + (event.clientY - this.resizerSizes.y);

    this.$parentResizerEl.css({height: `${newHeight}px`});
    this.$resizerEl.css({bottom: '0px'});
  }

  resizeCol(event) {
    const columnName = this.$parentResizerEl.data.columnname;

    const currentWidth = this.resizerParentSizes.width;
    const newWidth = currentWidth + (event.clientX - this.resizerSizes.x);
    const newWidthInStr = `${newWidth}px`;

    const $elements = this.$table.findAll(`[data-cellname="${columnName}"]`);
    for (const $element of $elements) {
      $element.css({width: newWidthInStr});
    }
    this.$parentResizerEl.css({width: newWidthInStr});
    this.$resizerEl.css({right: '0px'});
  }
}
