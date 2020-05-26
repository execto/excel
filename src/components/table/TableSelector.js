import {$} from '../../core/dom';

export class TableSelector {
  static className = 'selected';

  constructor($table) {
    this.$table = $table;
    this.init();
  }

  init() {
    this.$activeEl = this.$table.find('[data-cellcomplexname="A:1"]');
    this.$activeEl.toggleClass(TableSelector.className);
  }

  select(event) {
    this.$activeEl.toggleClass(TableSelector.className);
    this.$activeEl = $(event.target);
    this.$activeEl.toggleClass(TableSelector.className);
  }

  selectMany(event) {}
}
