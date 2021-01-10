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

export function createToolbar(state) {
  console.log(state);
  const {textAlign, fontWeight, fontStyle, textDecoration} = state;
  const buttons = [
    {
      icon: 'format_align_left',
      active: textAlign === 'left',
      styleValue: {textAlign: 'left'},
    },
    {
      icon: 'format_align_center',
      active: textAlign === 'center',
      styleValue: {textAlign: 'center'},
    },
    {
      icon: 'format_align_right',
      active: textAlign === 'right',
      styleValue: {textAlign: 'right'},
    },
    {
      icon: 'format_bold',
      active: fontWeight === 'bold',
      styleValue: {fontWeight: fontWeight === 'bold' ? 'normal' : 'bold'},
    },
    {
      icon: 'format_italic',
      active: fontStyle === 'italic',
      styleValue: {fontStyle: fontStyle === 'italic' ? 'normal' : 'italic'},
    },
    {
      icon: 'format_underline',
      active: textDecoration === 'underline',
      styleValue: {
        textDecoration: textDecoration === 'underline' ? 'none' : 'underline',
      },
    },
  ];

  return buttons.map(createButton).join('');
}
