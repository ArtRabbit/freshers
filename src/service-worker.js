// Set a name for the current cache
var cacheName = 'freshers2019_v01122019'; 

// Default files to always cache
var cacheFiles = [
	'/_includes/assets/font/lato/lato-v16-latin-900.woff2',
	'/_includes/assets/font/lato/lato-v16-latin-regular.woff2'
]


self.addEventListener('install', function(e) {
    //console.log('[ServiceWorker] Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(

    	// Open the cache
	    caches.open(cacheName).then(function(cache) {

	    	// Add all the default files to the cache
			//console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    }, function(error){
			console.log('error',error);
		})
	); // end e.waitUntil
});


self.addEventListener('activate', function(e) {
    //console.log('[ServiceWorker] Activated');

    e.waitUntil(

    	// Get all the cache keys (cacheName)
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheName) {

					// Delete that cached file
					//console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		},function(error){
			console.log('error',error);
		})
	); // end e.waitUntil

});


self.addEventListener('fetch', function(e) {
	//console.log('[ServiceWorker] Fetch', e.request.url);
	if (e.request.method != 'GET') return;

	e.respondWith(async function() {
		// Try to get the response from a cache.
		const cache = await caches.open(cacheName);
		const cachedResponse = await cache.match(e.request);

		if (cachedResponse) {
		  // If we found a match in the cache, return it, but also
		  // update the entry in the cache in the background.
		  e.waitUntil(cache.add(e.request));
		  return cachedResponse;
		}

		// If we didn't find a match in the cache, use the network.
		return fetch(e.request);
	}());


});
