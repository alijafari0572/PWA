const STATIC_CACHE_VERSION = 'static_1'
const DYNAMIC_CACHE_VERSION = 'dynamic_1'


const STATIC_ASSESTS = [
    '/',
    '/index.html',
    '/help.html',
    '/offline.html',
    '/css/skeleton.css',
    '/css/style.css',
    '/js/main.js',
    '/images/placeholder.png'
];

function cleanup() {
    caches.keys()
        .then((keys) => {
            return Promise.all(keys.map((key) => {
                if (key !== STATIC_CACHE_VERSION && key != DYNAMIC_CACHE_VERSION) {
                    console.log('[SW] Remove Old Cache ', key);
                    return caches.delete(key);
                }
            }));
        })
}
function preCache() {
    caches.open(STATIC_CACHE_VERSION)
    .then((cache) => {
        console.log('cache ready');
        return cache.addAll(STATIC_ASSESTS);
    })
    .catch(e => {
        console.log('cache error');
    })
}
self.addEventListener('install', (event) => {
    console.log('[SW] installing Service Worker ...');
    event.waitUntil(preCache());
});

self.addEventListener('activate', (event) => {
    console.log('[SW] activating Service Worker ...');
    event.waitUntil(cleanup());
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    console.log('[SW] fetching ...');
    const request = event.request;

    event.respondWith(
        caches.match(request)
            .then((response) => {
                return response || fetch(request)
                    .then((res) => {
                        caches.open(DYNAMIC_CACHE_VERSION)
                            .then((cache) => {
                                cache.put(request, res);
                            });
                        return res.clone();
                    })
                    .catch((err) => {
                        console.log('[SW] cache fetch error');
                        return caches.open(STATIC_CACHE_VERSION)
                            .then(function (cache) {
                                if (request.headers.get('accept').includes('text/html')) {
                                    return cache.match('/offline.html');
                                }
                                if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
                                    return cache.match('/images/placeholder.png');
                                }
                            });
                    });
            })
            .catch(console.error)
    );

            // 2 Network Only
            // event.respondWith(
            //     fetch(event.request)
            // );

            //1 Cache only
            // event.respondWith(
            //     caches.match(request)
            // );

            // 3 cache first , falling back to network
            // event.respondWith(
            //     caches.match(request)
            //     .then((res) => {
            //         return res || fetch(request)
            //         .then((newRes) => {
            //             caches.open(DYNAMIC_CACHE_VERSION)
            //             .then(cache => cache.put(request,newRes));
            //             return newRes.clone();
            //         });
            //     })
            // );

            // 4 Network first , falling back to cache
            event.respondWith(
                fetch(request)
                .then((res) => {
                    caches.open(DYNAMIC_CACHE_VERSION)
                    .then(cache => cache.put(request,res));
                    return res.clone();
                })
                .catch(err => caches.match(request))
            );

            // 6 Cache & Network Race
            let firstRejectionRecived = false;
            const rejectOnce = () => {
                if(firstRejectionRecived){
                    reject('No Response Recived')
                }else{
                    firstRejectionRecived =true;
                }
            };
            const promiseRace = new Promise((resolve,reject) => {
                    fetch(request)
                    .then(res => res.ok ? resolve(res) : rejectOnce())
                    .catch(rejectOnce);
            });
            event.respondWith(promiseRace);
            // 5 Cache with newtork update
            event.respondWith(
                caches
                .match(request)
                .then((res) => {                    
                    const UpdateResponse = fetch(request)
                    .then((newRes) => {
                        cache.put(request,newRes.clone());
                        return newRes;
                    });
                    return res || UpdateResponse;
                })
            );


});