var CACHE_NAME = "cache-v1";
var FILES_TO_CACHE = ["/", "/statics/assets/"];

self.addEventListener("install", async () => {
  const cache = await caches.open(CACHE_NAME);
  cache.addAll(FILES_TO_CACHE);
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") {
    return;
  }
  const url = new URL(req.url);
  if (url.origin === location.url) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(networkFirst(req));
  }
});

const cacheFirst = (req) => {
  const cachedResponse = caches.match(req);
  return cachedResponse || fetch(req);
};
const networkFirst = async (req) => {
  const cache = await caches.open(CACHE_NAME);
  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (err) {
    console.log(err);
    return await cache.match(req);
  }
};
