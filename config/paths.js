const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
  clientBuild: resolveApp('build/client'),
  serverBuild: resolveApp('build/server'),
  srcClient: resolveApp('src'),
  srcStyle: resolveApp('src/styles'),
};

paths.resolveModules = [paths.srcClient, paths.srcStyle, 'node_modules'];

module.exports = paths;
