const fs = require("fs");
const express = require("express");
const http = require("http");
const https = require("https");
const compression = require("compression");
const path = require("path");
const NODE_ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: path.join(__dirname, `./.env.${NODE_ENV}`),
});

const { SERVER_PORT } = process.env;
const setupServer = async () => {
  const app = express();
  app.use(compression());
  app.set("views", path.join(__dirname, `./dist/views`));
  app.use(express.static(path.join(__dirname, `./dist/views`)));

  app.get("/resume", (req, res) => {
    res.sendFile(path.join(__dirname, `./dist/files/resume.pdf`));
  });
  app.get("/", async (req, res) => {
    res.sendFile("index.html");
  });
  let server;

  if (NODE_ENV === "production") {
    const options = {
      key: fs.readFileSync(process.env.HTTPS_KEY_PATH, "utf8"),
      cert: fs.readFileSync(process.env.HTTPS_CERT_PATH, "utf8"),
      ca: fs.readFileSync(process.env.HTTPS_CA_PATH, "utf8"),
    };

    // Listen for HTTPS requests
    server = https.createServer(options, app);

    // Redirect HTTP to HTTPS
    http
      .createServer((req, res) => {
        const location = `https://www.cytommi.com`;
        res.writeHead(302, { Location: location });
        res.end();
      })
      .listen(80, () => {
        console.log(`cytommi server listening on 80 for HTTPS redirect`);
      });
  } else {
    server = http.createServer(app);
    server.listen(SERVER_PORT, () => {
      console.log(`cytommi dev server listening on port ${SERVER_PORT}`);
    });
  }
};

setupServer();
