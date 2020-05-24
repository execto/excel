import {$} from '../../core/dom';
import {getPixelNumber} from '../../core/utils';

// default table sizes in px
const SIZES = {
  rowHeight: 24,
  colWidth: 100,
};

export class TableResizer {
  resizeSrarted = false;
  constructor($root) {
    this.$root = $root;
  }

  setResizerInfo(event) {
    this.resizeSrarted = true;
    this.$resizerEl = $(event.target);
    this.resizerType = this.$resizerEl.dataset().resizer;
    this.$parentResizerEl = this.$resizerEl.closest('[data-type="resizeble"]');
    this.resizeProperty = this.resizerType === 'col' ? 'right' : 'bottom';
    this.elPositionValue =
      this.resizerType === 'col' ? event.clientX : event.clientY;
  }

  startResize(event) {
    const value = this.resizerType === 'col' ? event.clientX : event.clientY;
    this.$resizerEl.css(
      this.resizeProperty,
      `${this.elPositionValue - value}px`
    );
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
    const currentHeight = this.$parentResizerEl.css('height')
      ? getPixelNumber(this.$parentResizerEl.css('height'))
      : SIZES.rowHeight;
    const newHeight = currentHeight + (event.clientY - this.elPositionValue);

    this.$parentResizerEl.css('height', `${newHeight}px`);
    this.$resizerEl.css('bottom', '0px');
  }

  resizeCol(event) {
    const columnName = this.$parentResizerEl.dataset().columnname;

    const currentWidth = this.$parentResizerEl.css('width')
      ? getPixelNumber(this.$parentResizerEl.css('width'))
      : SIZES.colWidth;
    const newWidth = currentWidth + (event.clientX - this.elPositionValue);
    const newWidthInStr = `${newWidth}px`;

    const elements = document.getElementsByClassName(`cell-${columnName}`);
    for (const element of elements) {
      element.style['width'] = newWidthInStr;
    }
    this.$parentResizerEl.css('width', newWidthInStr);
    this.$resizerEl.css('right', '0px');
  }
}
