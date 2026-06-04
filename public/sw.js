/* eslint-disable no-restricted-globals */

// Self-contained high-performance PWA Service Worker for InfectAtlas
const CACHE_NAME = "infectatlas-pwa-cache-v1";
const OFFLINE_URL = "/offline.html";

// Assets to cache on install for perfect offline experience
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/offline.html",
  "/favicon.ico",
  "/app_icon_192.png",
  "/app_icon_512.png",
  "/screenshot_mobile.png",
  "/screenshot_desktop.png",
  "/manifest.json"
];

// Skip waiting message handler
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Install: Cache all core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[InfectAtlas SW] Pre-caching core application shell & offline fallback");
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn("[InfectAtlas SW] Warm-up caching failed for some assets (this is normal during dev):", err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old stale caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[InfectAtlas SW] Removing stale cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Intercept requests with robust Network-First then Offline Fallback Strategy
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If response is valid, dynamically cache a copy for seamless offline retrieval
        if (response && response.status === 200 && response.type === "basic") {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch((error) => {
        console.log("[InfectAtlas SW] Fetch failed, serving from cache or offline page", error);
        
        // Try to match the exact request from the cache first
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // If it is a web page navigation, serve the beautifully designed offline page
          const isHtmlRequest = event.request.mode === "navigate" || 
            (event.request.headers.get("accept") && event.request.headers.get("accept").includes("text/html"));
          
          if (isHtmlRequest) {
            return caches.open(CACHE_NAME).then((cache) => {
              return cache.match(OFFLINE_URL);
            });
          }

          // Return basic offline status response for assets that were neither cached nor available
          return new Response("InfectAtlas: Connection offline.", {
            status: 503,
            statusText: "Service Unavailable (Offline)",
            headers: { "Content-Type": "text/plain" }
          });
        });
      })
  );
});

// Windows/OS Widgets Event Handlers
self.addEventListener("widgetinstall", (event) => {
  console.log("[InfectAtlas SW] Windows Widget installed for tag:", event.tag);
  event.waitUntil(Promise.resolve());
});

self.addEventListener("widgetuninstall", (event) => {
  console.log("[InfectAtlas SW] Windows Widget uninstalled for tag:", event.tag);
  event.waitUntil(Promise.resolve());
});

self.addEventListener("widgetresume", (event) => {
  console.log("[InfectAtlas SW] Windows Widget resumed for tag:", event.tag);
  event.waitUntil(Promise.resolve());
});

self.addEventListener("widgetclick", (event) => {
  console.log("[InfectAtlas SW] Windows Widget clicked: action =", event.action);
  const action = event.action;
  if (action === "launch") {
    event.waitUntil(
      self.clients.matchAll({ type: "window" }).then((clientsArr) => {
        if (clientsArr.length > 0) {
          return clientsArr[0].focus();
        }
        return self.clients.openWindow("/");
      })
    );
  }
});
