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
