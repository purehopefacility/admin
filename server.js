const express = require("express");
const next = require("next");
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // Example of custom route handling with Express
    server.get("/api/hello", (req, res) => {
      res.send({ message: "Hello from Express!" });
    });

    // Handling CORS with Express Middleware
    server.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust for security in production
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS",
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
      );
      if (req.method === "OPTIONS") {
        return res.status(200).end();
      }
      next();
    });

    // Default handler for all other requests
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
