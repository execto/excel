const CHARS = {
  A: 'A'.charCodeAt(0),
  Z: 'Z'.charCodeAt(0),
};

function getCell(data) {
  return `
    <div class="cell" contenteditable>
      ${data}
    </div>
  `;
}

function getColumn(data) {
  return `
    <div class="column">
      ${data}
      <div class="column-resizer"></div>
    </div>
  `;
}

function getRow(info, data) {
  return `
    <div class="row">
      <div class="row-info">
        ${info || ''}
        ${info ? '<div class="row-resizer"></div>' : ''}
      </div>
      <div class="row-data">
        ${data.join('')}
      </div>
    </div>
  `;
}

function getCharFromCode(_, idx) {
  return String.fromCharCode(CHARS.A + idx);
}

export function getTable(rowsCount = 15) {
  const rows = [];
  const columnsCount = CHARS.Z - CHARS.A + 1;

  const cols = new Array(columnsCount)
    .fill('')
    .map(getCharFromCode)
    .map(getColumn);
  const firstRow = getRow(null, cols);
  rows.push(firstRow);

  for (let rowNum = 1; rowNum <= rowsCount; rowNum += 1) {
    const cells = new Array(columnsCount).fill('').map(getCell);
    const row = getRow(rowNum, cells);
    rows.push(row);
  }

  return rows.join('');
}
