import {StatefullExcelComponent} from '../../core/StatefullExcelComponent';
import {createToolbar} from './toolbar.template';
import {$} from '../../core/dom';

export class Toolbar extends StatefullExcelComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  get template() {
    return createToolbar(this.state);
  }

  prepare() {
    const state = {
      textAlign: 'left',
      fontWeight: 'normal',
      fontStyle: 'none',
      textDecoration: 'none',
    };
    this.initState(state);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'toolbar-btn') {
      const styleValue = JSON.parse($target.data.style);
      this.setState({...styleValue});
    }
  }

  toHTML() {
    return this.template;
  }
}
