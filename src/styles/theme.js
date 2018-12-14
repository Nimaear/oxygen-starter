//@flow
const Colors = require('../lib/Colors');
const BreakPoints = require('../lib/BreakPoints');

const typeStyles = () => {
  return {
    sm: '12px',
    md: '16px',
    lg: '18px',
    xl: '22px',
    xxl: '26px',
    xxxl: '36px',
  };
};

const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const addVarsTo = (dest, prefix, vars) => {
  Object.keys(vars).forEach((key) => {
    if (typeof vars[key] === 'object') {
      addVarsTo(dest, `${prefix}${ucFirst(key)}`, vars[key]);
    } else {
      dest[`${prefix}${ucFirst(key)}`] = vars[key];
    }
  });
};

const Grid = {
  gutter: '0.5rem',
};

module.exports = () => {
  const theme = {
    white: 'rgba(255, 255, 255, 1)',
    border: {
      width: 1,
      radius: 2,
    },
    spacing: 4,
    primary: Colors.comviq,
    danger: Colors.alizarin,
    muted: Colors.silver,
  };

  const Typography = typeStyles();

  const components = {
    type: Typography,
    breakpoint: BreakPoints,
    grid: Grid,
  };

  const customProperties = {
    spacing: `${theme.spacing}px`,
  };

  Object.keys(components).forEach((comp) => addVarsTo(customProperties, comp, components[comp]));
  return customProperties;
};
