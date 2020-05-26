const CHARS = {
  A: 'A'.charCodeAt(0),
  Z: 'Z'.charCodeAt(0),
};

function getCell(row) {
  return (data, idx) => {
    const cellname = String.fromCharCode(CHARS.A + idx);
    return `
      <div 
        class="cell" 
        data-cellname="${cellname}"
        data-cellindex="${row}"
        data-cellcomplexname="${cellname}:${row}" 
        contenteditable
      >
        ${data}
      </div>
    `;
  };
}

function getColumn(data) {
  return `
    <div 
      class="column" 
      data-columnname="${data}" 
      data-type="resizeble"
    >
      ${data}
      <div class="column-resizer" data-resizer="col"></div>
    </div>
  `;
}

function getRow(info, data) {
  const resizer = info
    ? '<div class="row-resizer" data-resizer="row"></div>'
    : '';
  return `
    <div class="row" data-type="resizeble">
      <div class="row-info">
        ${info || ''}
        ${resizer}
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
    const cells = new Array(columnsCount).fill('').map(getCell(rowNum));
    const row = getRow(rowNum, cells);
    rows.push(row);
  }

  return rows.join('');
}
