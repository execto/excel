class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (html) {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.$el.innerHTML = '';
    return this;
  }

  append(node) {
    node = node instanceof Dom ? node.$el : node;
    if (document.append) {
      this.$el.append(node);
      return this;
    }
    this.$el.appendChild(node);
    return this;
  }

  on(event, callback) {
    this.$el.addEventListener(event, callback);
  }

  off(event, callback) {
    this.$el.removeEventListener(event, callback);
  }
}

export const $ = (selector) => {
  return new Dom(selector);
};

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  el.classList.add(classes);
  return $(el);
};
