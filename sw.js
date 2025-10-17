// A simple Service Worker to cache your game files
const CACHE_NAME = 'sicky-snake-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './android-chrome-192x192.png.png',
    './android-chrome-512x512.png.png',
    './eating-apple-cut.mp3.mp3.mp3',
    './game-over-arcade-cut.mp3.mp3.mp3'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
