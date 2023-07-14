(() => {
  // node_modules/@shopify/web-pixels-extension/build/esm/globals.mjs
  var EXTENSION_POINT = "WebPixel::Render";

  // node_modules/@shopify/web-pixels-extension/build/esm/register.mjs
  var register = function register2(extend) {
    return shopify.extend(EXTENSION_POINT, extend);
  };

  // extensions/app-web-pixel-seo/src/index.js
  register(({ configuration, analytics, browser }) => {
    analytics.subscribe("page_viewed", (event) => {
      console.log("Page viewed", event);
    });
  });
})();
