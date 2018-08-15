// キャッシュファイルのバージョン
// ファイル変更があった場合は、バージョンを変更する
var CACHE_STATIC_NAME = 'static-v2';

// キャッシュさせるファイルリスト
var STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/src/js/app.js',
  '/src/js/material.min.js',
  '/src/css/app.css',
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
];

// ServiceWorkerのinstallイベント発火時に、ファイルをキャッシュさせる
self.addEventListener('install', function (event) {
  console.log('[Service Worker]Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function (cache) {
        console.log('[Service Worker]Precaching Static Files');
        cache.addAll(STATIC_FILES);
      })
  )
});

// ServiceWorkerのActivateイベント発火時に、旧バージョンのキャッシュを
self.addEventListener('activate', function (event) {
  console.log('[Service Worker]Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

// ServiceWorkerのfetchイベント発火時に、キャッシュファイルを返却
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .catch(function(err) {
              // エラーの場合は、offline.htmlを返却
              return caches.open(CACHE_STATIC_NAME)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
});
