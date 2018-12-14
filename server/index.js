require('colors');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const clientConfig = require('../webpack/client.dev');
const serverConfig = require('../webpack/server.dev');
const clientConfigProd = require('../webpack/client.prod');
const serverConfigProd = require('../webpack/server.prod');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const port = process.env.PORT || 3010;

const { publicPath } = clientConfig.output;
const outputPath = clientConfig.output.path;
const DEV = process.env.NODE_ENV === 'development';
const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    req.session.user = {
      viewMode: 'normal',
    };
  }
  next();
});
// app.use('/media', proxy('http://magento2.test/'));
app.use(
  '/service-worker.js',
  express.static(path.resolve(__dirname, '..', 'build/client/service-worker.js'), {
    setHeaders: (res, path) => {
      res.set('Service-Worker-Allowed', '/');
    },
  })
);
app.use(express.static('public'));

let isBuilt = false;

const done = () =>
  !isBuilt &&
  app.listen(port, '0.0.0.0', () => {
    isBuilt = true;
    console.log(`BUILD COMPLETE -- Listening @ http://localhost:${port}`.magenta);
  });

if (DEV) {
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  const options = { publicPath, stats: { colors: true } };
  const devMiddleware = webpackDevMiddleware(compiler, options);

  // app.use(pino);
  app.use(devMiddleware);
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));

  devMiddleware.waitUntilValid(done);
} else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const serverRender = require('../build/server/main.js').default;
    // app.use(pino);
    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({ clientStats }));

    done();
  });
}
