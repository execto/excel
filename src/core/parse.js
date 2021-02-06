export default function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      const res = eval(value.slice(1));
      return String(res || '');
    } catch {
      return value;
    }
  }
  return value;
}
