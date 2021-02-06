export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getPixelNumber = (string) => {
  const idxPxPostfix = string.indexOf('px');
  if (idxPxPostfix < 0) {
    throw new Error('Invalid string value getPixelNumber(string)');
  }
  return Number(string.slice(0, idxPxPostfix));
};

export const storage = (key, value = null) => {
  if (!value) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const appendData = (data) => {
  return Object.keys(data).reduce((acc, dataKey) => {
    return data[dataKey] ? `${acc} data-${dataKey}="${data[dataKey]}"` : acc;
  }, '');
};

export const camelToDashCase = (str) => {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

export const styleObjectToInline = (styles) => {
  return Object.keys(styles)
    .reduce((acc, styleProp) => {
      return [...acc, `${camelToDashCase(styleProp)}: ${styles[styleProp]}`];
    }, [])
    .join(';');
};

export const debounce = (fn, wait) => {
  let timerId;
  return (...args) => {
    const later = () => {
      clearTimeout(timerId);
      fn(...args);
    };
    clearTimeout(timerId);
    timerId = setTimeout(later, wait);
  };
};
