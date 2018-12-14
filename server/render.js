import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'store';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import Helmet from 'react-helmet';
import { disableFetching, enableFetching } from 'helpers/withGetData';
import Colors from 'lib/Colors';
import App from 'views/App/App';

const getManifestUrl = (clientStats) => {
  const manifest = clientStats.assets.find((asset) => asset.name.search('manifest') === 0);
  return manifest ? manifest.name : 'manifest.json';
};

const generateHtml = (clientStats, store, app) => {
  const chunkNames = flushChunkNames();

  const initialData = JSON.stringify({
    state: store.getState(),
  });

  const chunks = flushChunks(clientStats, { chunkNames });
  const { js, styles, cssHash } = chunks;

  const head = Helmet.renderStatic();

  const html = [
    '<!doctype html>',
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="application-name" content="Comviq store" />',
    '<meta name="mobile-web-app-capable" content="yes" />',
    '<meta name="apple-mobile-web-app-capable" content="yes" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">',

    '<link rel="shortcut icon" type="image/png" href="/favicon.png" />',
    '<link rel="icon" type="image/png" href="/icon_36x36.png" sizes="36x36" />',
    '<link rel="icon" type="image/png" href="/icon_48x48.png" sizes="48x48" />',
    '<link rel="icon" type="image/png" href="/icon_72x72.png" sizes="72x72" />',
    '<link rel="icon" type="image/png" href="/icon_96x96.png" sizes="96x96" />',
    '<link rel="icon" type="image/png" href="/icon_144x144.png" sizes="144x144" />',
    '<link rel="icon" type="image/png" href="/icon_192x192.png" sizes="192x192" />',
    '<link rel="icon" type="image/png" href="/icon_512x512.png" sizes="512x512" />',
    `<meta name="theme-color" content="${Colors.comviq[0]}">`,
    `<link rel="manifest" href="/static/${getManifestUrl(clientStats)}">`,
    '<link href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700" rel="stylesheet">',
    head.base.toString(),
    head.title.toString(),
    head.meta.toString(),
    head.link.toString(),
    head.script.toString(),
    styles,
    '</head>',
    '<body>',
    `<div id="root">${renderToString(app)}</div>`,
    `<script>window.__INITIAL_DATA__ = ${initialData}</script>`,
    cssHash,
    js,
    '</body>',
    '</html>',
  ]
    .filter((h) => !!h)
    .join('');

  return html;
};

export default ({ clientStats }) => (req, res, next) => {
  const settings = req.session ? req.session.user : {};
  const store = configureStore({
    initialState: {
      app: {
        settings,
      },
    },
    middleware: [],
  });

  const { url } = req;
  const context = {};
  const app = (
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  renderToString(app);
  disableFetching();
  store
    .close()
    .then(() => {
      const html = generateHtml(clientStats, store, app);
      enableFetching();
      res.send(html);
    })
    .catch((err) => {
      enableFetching();
      next(err);
    });
};
