import {ExcelComponent} from '../../core/ExcelComponents';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  toHTML() {
    return `
      <div class="icon">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
