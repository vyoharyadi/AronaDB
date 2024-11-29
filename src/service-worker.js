/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

// Mengklaim kontrol dari Service Worker sebelumnya
clientsClaim();

// Pre-cache semua aset yang dihasilkan build
precacheAndRoute(self.__WB_MANIFEST);

// Cache-first untuk aset statis (CSS, JS, Images)
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image",
  new CacheFirst({
    cacheName: "static-resources",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Maksimal 50 file
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache selama 30 hari
      }),
    ],
  })
);

// Cache semua file dari folder 'pages' dan 'components'
registerRoute(
  ({ url }) =>
    url.pathname.includes("/pages/") || url.pathname.includes("/components/"),
  new CacheFirst({
    cacheName: "dynamic-pages-components",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Maksimal 50 file
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache selama 30 hari
      }),
    ],
  })
);

// Network-first untuk API
registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new NetworkFirst({
    cacheName: "api-responses",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache selama 7 hari
      }),
    ],
  })
);

// Aktifkan event listener untuk skip waiting
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
