import {StatefullExcelComponent} from '../../core/StatefullExcelComponent';
import {createToolbar} from './toolbar.template';
import {$} from '../../core/dom';
import {cellStyles} from '../../consts/cellStyles';

export class Toolbar extends StatefullExcelComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      storeKeySubsctiption: ['currentCellStyles'],
      ...options,
    });
  }

  get template() {
    return createToolbar(this.state);
  }

  prepare() {
    this.initState(cellStyles);
  }

  storeChanged(state) {
    this.setState(state.currentCellStyles);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'toolbar-btn') {
      const styleValue = JSON.parse($target.data.style);
      this.$emmit('toolbar:applyStyles', styleValue);
    }
  }

  toHTML() {
    return this.template;
  }
}
