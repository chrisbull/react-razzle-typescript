import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript'; // Safer stringify, prevents XSS attacks
import express from 'express';

import App from './App';
import { RootState } from './store/types';
import { configureStore } from './store/configureStore';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

const initialState: RootState = {
  todos: {
    allIds: ['12345'],
    byIds: {
      '12345': {
        content: 'Hello world',
        completed: false,
      },
    },
  },
};

function getHtml({ context, location }: { context: { url?: string }; location: string }) {
  const store = configureStore({ initialState });
  const state = serialize(store.getState());
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={location}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  const html = `
  <!doctype html>
  <html lang="en">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script>window.__PRELOADED_STATE__ = ${state}</script>
          ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
      </head>
      <body>
          <div id="root">${markup}</div>
      </body>
  </html>`;

  return html;
}

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const html = getHtml({ context: {}, location: req.url });
    res.status(200).send(html);
  });

export default server;
