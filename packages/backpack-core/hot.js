import path from "path";

// Placeholder for the active server
let server;

// Always return the latest module
const getApp = () => {
  // `hot?index.js` => `index.js`
  const entry = require(__resourceQuery.substr(1));

  // Support both ES5 & ES6 exports
  return entry ? entry.default : entry;
};

const startApp = () => {
  // Server is listening
  if (server) {
    return;
  }

  const app = getApp();

  // `index.js` may be empty
  if (!app) {
    return;
  }

  // Express/Koa app
  if (app && app.listen) {
    const { createServer } = require("http");
    const port = process.env.PORT || 3000
    server = createServer((req, res) => {
      const app = getApp();

      // Just in-case the app exports have been removed
      if (app && app.listen) {
        app.handle(req, res);
      }
    });

    server.listen(port, function(err) {
      if (err) {
        console.error(err);
        return;
      }

      if (__DEV__) { // webpack flags!
        console.info('🚧 in development.')
      }

      console.log(`️🏃‍ Server started on http://localhost:${port}/.`);
    });
  }
}

// Helpful messages
if (module.hot) {
  console.info("✅ Server-side HMR Enabled!");

  module.hot.accept(__resourceQuery.substr(1), () => {
    console.log(`🔁  HMR Reloading...`);
    startApp();
  });
} else {
  console.warn("🚫  Server-side HMR Not Supported.");
}

// Initialize app
startApp();
