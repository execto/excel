import {ExcelComponent} from '../../core/ExcelComponents';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      storeKeySubsctiption: ['currentText'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$inputDiv = this.$root.find('.input');
    this.initSubscribers();
    this.$inputDiv.text(this.store.getState().currentText || '');
  }

  initSubscribers() {
    this.$on('cell:changed', (text) => this.$inputDiv.text(text));
  }

  storeChanged({currentText}) {
    this.$inputDiv.text(currentText);
  }

  onInput(event) {
    this.$emmit('formula:input', this.$inputDiv.text());
  }

  onClick(event) {
    console.log(event.target);
  }

  onKeydown(keyEvent) {
    if (keyEvent.code === 'Enter') {
      keyEvent.preventDefault();
      this.$emmit('formula:apply');
    }
  }

  toHTML() {
    return `
      <div class="icon">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
