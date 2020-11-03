import {ExcelComponent} from '../../core/ExcelComponents';
import {createToolbar} from './toolbar.template';
import {$} from '../../core/dom';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'toolbar-btn') {
      console.log($target.data.style);
    }
  }

  toHTML() {
    return createToolbar();
  }
}
