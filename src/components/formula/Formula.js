import {ExcelComponent} from '../../core/ExcelComponents';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    return `
      <div class="icon">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log(event.target.innerText);
  }

  onClick(event) {
    console.log(event.target);
  }
}
