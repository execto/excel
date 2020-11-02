import {ExcelComponent} from '../../core/ExcelComponents';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$inputDiv = this.$root.find('.input');
    this.initSubscribers();
  }

  initSubscribers() {
    // this.$on('cell:input', (text) => this.$inputDiv.text(text));
    this.$on('cell:changed', (text) => this.$inputDiv.text(text));
    this.$subscrbe((state) => this.$inputDiv.text(state.currentText));
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
