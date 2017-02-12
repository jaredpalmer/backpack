import express from "express";
import app from "./app";

if (module.hot) {
  module.hot.accept("./app", function() {
    console.log("🔁  HMR Reloading `./app`...");
  });

  console.info("✅  Server-side HMR Enabled!");
} else {
  console.info("❌  Server-side HMR Not Supported.");
}

const port = process.env.PORT || 3000

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function(err) {
    if (err) {
      console.error(err);
      return;
    }

    if (__DEV__) { // webpack flags!
      console.log('> in development')
    }

    console.log(`> listening on port ${port}`)
  })
;
