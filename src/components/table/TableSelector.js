import {$} from '../../core/dom';

export class TableSelector {
  constructor($table) {
    this.$table = $table;
    this.init();
  }

  init() {
    this.$activeEl = this.$table.find('[data-cellcomplexname="A:1"]');
    this.$activeEl.toggleClass('selected');
  }

  select(event) {
    this.$activeEl.toggleClass('selected');
    this.$activeEl = $(event.target);
    this.$activeEl.toggleClass('selected');
  }

  selectMany(event) {}
}
