export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('No $root from DomListener');
    }
    this.$root = $root;
  }
}
