
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KEF2HABB.js"
    ],
    "route": "/about"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6M7VW2YP.js"
    ],
    "route": "/tasks"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 598, hash: '1122f57f827b89cf533ea34c8d5529cc27f4280dfc815635af55e1288943abee', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1111, hash: '47d03333a8449553bec172516e8cadc7335002867acf14ff020b247ee10f32ce', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 1973, hash: 'ac63b0e4a9b3d886cdb0a5dd13d3460dc10cdfb1a1d32e352725f3b71da4ebca', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 1230, hash: 'd305a3f5c72665d7caaeb7c61831d5d2f4dbeb85aa14de0adb9ba670ce4d7411', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'tasks/index.html': {size: 3191, hash: '5056e2100a066524e9687c0bb0c0138245d8b89c6b386734515fcae28ae7c971', text: () => import('./assets-chunks/tasks_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
