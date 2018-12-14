const postcssPresetEnv = require('postcss-preset-env');
const paths = require('./config/paths');
const breakpoints = require('./src/lib/BreakPoints');
const isDev = process.env.NODE_ENV === 'development';

const cssNano = require('cssnano')({
  preset: 'default',
});

module.exports = () => {
  return [
    require('postcss-css-reset')(),
    require('postcss-import')({
      path: paths.srcStyle,
    }),
    require('postcss-each')(),
    require('postcss-nested')(),
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer')({
      browsers: ['last 3 versions', 'IE >= 9', 'Edge <= 15'],
    }),
    // require('postcss-advanced-variables')({}),
    // require('postcss-custom-properties')({
    //   preserve: false,
    //   importFrom: () => ({
    //     customProperties: require('./src/styles/theme.js')(),
    //   }),
    //   // importFrom: () => './src/styles/variables.css',
    //   // exportTo: './src/styles/props.css',
    // }),
    require('postcss-simple-vars')({
      variables: () => require('./src/styles/theme.js')(),
      // onVariables: (variables) => {
      //   console.log('CSS Variables');
      //   console.log(JSON.stringify(variables, null, 2));
      // },
    }),
    require('postcss-functions')({
      functions: {
        uc: (string) => string.charAt(0).toUpperCase() + string.slice(1),
      },
    }),
    require('postcss-easy-media-query')({
      breakpoints,
    }),
    postcssPresetEnv({
      browsers: 'last 2 versions',
      stage: 2,
      features: {
        'nesting-rules': true,
        'color-mod-function': {
          unresolved: 'warn',
        },
      },
    }),
    isDev ? null : cssNano,
  ];
};
