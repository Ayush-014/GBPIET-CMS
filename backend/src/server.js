const express = require("express");
const http = require("http");
const apiRoutes = require("./routes");
const bodyParser = require("body-parser");
const { ServerConfig } = require("./config");
const errorHandler = require("./utils/errorHandler");
const connectToDB = require("./config/dbConfig");
const runExpiredPostCleanup = require("./utils/cronJob");
const app = express();
const path = require("path");
const server = http.createServer(app);

const cors = require("cors");

const allowedOrigins = ["http://localhost:5173"]; // Change to your frontend URL

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy does not allow access from origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", apiRoutes);
app.use(errorHandler);

async function startServer() {
  try {
    await connectToDB();
    runExpiredPostCleanup();
    server.listen(ServerConfig.PORT, () => {
      console.log(`🚀 Server listening on port ${ServerConfig.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
    process.exit(1);
  }
}
startServer();
