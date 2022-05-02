module.exports = {
  icon: true,
  expandProps: false,
  titleProp: true,
  typescript: true,
  dimensions: false,
  svgProps: {
    'height': '{height}',
    'width': '{width}'
  },
  template: (variables, { tpl }) => {
    return tpl`
      ${variables.imports};
      interface SVGRProps {
        title?: string;
        titleId?: string;
        color?: string;
        height?: string;
        width?: string;
      }
      const ${variables.componentName} = ({ title, titleId, color, height = '24px', width = '24px' }: SVGRProps) => (
        ${variables.jsx}
      );
      ${variables.exports};
    `
  },
  replaceAttrValues: {
    '#d1d1d1': '{color}'
  },
  outDir: 'src'
}
