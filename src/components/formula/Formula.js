import {ExcelComponent} from '../../core/ExcelComponents';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      listeners: ['input'],
    });
  }

  toHTML() {
    return `
      <div class="icon">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput() {
    console.log('On inpu listener');
  }
}
