function createButton({icon, styleValue, active}) {
  const meta = `
    data-type="toolbar-btn"
    data-style='${JSON.stringify(styleValue)}'
  `;

  return `
      <div
        class="btn"
        ${meta}
      >
        <span 
          class="material-icons ${active ? 'active' : ''}"
          ${meta}
        >
          ${icon}
        </span>
      </div>
    `;
}

export function createToolbar() {
  const buttons = [
    {
      icon: 'format_align_left',
      active: false,
      styleValue: {textAlign: 'left'},
    },
    {
      icon: 'format_align_center',
      active: false,
      styleValue: {textAlign: 'center'},
    },
    {
      icon: 'format_align_right',
      active: false,
      styleValue: {textAlign: 'right'},
    },
    {
      icon: 'format_bold',
      active: false,
      styleValue: {fontWeight: 'bold'},
    },
    {
      icon: 'format_italic',
      active: false,
      styleValue: {fontStyle: 'italic'},
    },
    {
      icon: 'format_underline',
      active: false,
      styleValue: {textDecoration: 'underline'},
    },
  ];

  return buttons.map(createButton).join('');
}
