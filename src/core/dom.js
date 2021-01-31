class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  get data() {
    return this.$el.dataset;
  }

  html(html) {
    if (html) {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== 'string') {
      return this.$el.innerText.trim();
    }
    this.$el.innerText = text;
    return this;
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

  focus() {
    this.$el.focus();
  }

  blur() {
    this.$el.blur();
  }

  on(event, callback) {
    this.$el.addEventListener(event, callback);
  }

  off(event, callback) {
    this.$el.removeEventListener(event, callback);
  }

  css(styles) {
    Object.assign(this.$el.style, styles);
    return this;
  }

  getCss(styles) {
    return styles.reduce((styles, prop) => {
      return {
        ...styles,
        [prop]: this.$el.style[prop],
      };
    }, {});
  }

  toggleClass(className) {
    this.$el.classList.toggle(className);
    return this;
  }

  appendClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  parent() {
    return $(this.$el.parentElement);
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getSizes() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    const el = this.$el.querySelector(selector);
    if (el) {
      return $(el);
    }
    return null;
  }

  findAll(selector) {
    const elements = this.$el.querySelectorAll(selector);
    const $elements = [];
    for (const element of elements) {
      $elements.push($(element));
    }
    return $elements;
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
