const path = require('path')

module.exports = {
  icon: true,
  expandProps: false,
  titleProp: true,
  typescript: true,
  dimensions: false,
  ref: true,
  svgProps: {
    'height': '{height}',
    'width': '{width}'
  },
  template: (variables, { tpl }) => {
    return tpl`
      ${variables.imports};
      interface SVGRProps {
        color?: string;
        height?: string;
        width?: string;
        title?: string;
        titleId?: string;
        strokeWidth?: number;
      }
      const ${variables.componentName} = ({ color = 'currentColor', height = '24px', width = '24px', title, titleId, strokeWidth = 1.5 }: SVGRProps, ref: Ref<SVGSVGElement>) => (
        ${variables.jsx}
      );
      ${variables.exports};
    `
  },
  replaceAttrValues: {
    '#0F172A': '{color}',
    '#d1d1d1': '{color}',
    '#strokeWidthToken#': '{strokeWidth}'
  },
  outDir: 'src',
  index: true,
  indexTemplate: (filePaths) => {

    const importIcons = filePaths.map((filePath) => {
      const basename = path.basename(filePath, path.extname(filePath))
      const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
      return `import ${exportName} from './${basename}'`
    }).join(';\n');

    const iconNames = filePaths.map((filePath) => {
      const basename = path.basename(filePath, path.extname(filePath))
      const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
      return `${ exportName.charAt(0).toLowerCase() + exportName.slice(1)}`;
    });

    const types = `;\n export type IconName ="${iconNames.join('" | "')}";\n`;

    const keys = `;\n export const IconKeys = ["${iconNames.join('", "')}"];\n`;

    const exportMap = filePaths.map((filePath) => {
      const basename = path.basename(filePath, path.extname(filePath))
      const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
      return `${ exportName.charAt(0).toLowerCase() + exportName.slice(1)}: ${exportName}`;
    }).join(',\n');

    const mappedEntries = `;\n export const IconDictionary: Record<IconName, any> = {\n${exportMap}\n};\n`

    return importIcons + types + mappedEntries + keys;
  }
}
