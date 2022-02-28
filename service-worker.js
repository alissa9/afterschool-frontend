const cacheName = "school-v1";
const cacheFiles = [
  "index.html",
  "style.css",
  "products.js",
  "app.js",
  "store.webmanifest",
  "images/arabic.jpg",
  "images/Icon192x192.jpg",
  "images/Icon512x512.jpg",
  "images/chemistry.jpg",
  "images/drama.jpg",
  "images/english.jpg",
  "images/geography.jpg",
  "images/history.jpg",
  "images/IT.jpg",
  "images/maths.jpg",
  "images/music.jpg",
  "images/swimming.png",
];

self.addEventListener("install", (e) => {
  try {
    
    console.log("[Service Worker] Install");
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
        console.log("[Service Worker] Caching all the files");
        return cache.addAll(cacheFiles);
      })
      );
    } catch (error) {
      console.log("[Service Worker] error: " + error)
    }
});

// self.addEventListener("fetch", (e) => {
//   console.log("[Service Worker] Fetched resource " + e.request.url);
// });

// self.addEventListener("fetch", function (e) {
//   e.respondWith(
//     // check if the cache has the file
//     caches.match(e.request).then(function (r) {
//       console.log("[Service Worker] Fetching resource: " + e.request.url);
//       // 'r' is the matching file if it exists in the cache
//       return r;
//     })
//   );
// });

// Cashing all the new files 
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      // Download the file if it is not in the cache,
      return (
        r ||
        fetch(e.request).then(function (response) {
          // add the new file to cache
          return caches.open(cacheName).then(function (cache) {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
