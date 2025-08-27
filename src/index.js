const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./lib/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// routes
app.use("/api/rooms", require("./routes/rooms.routes"));
app.use("/api/classes", require("./routes/classes.routes"));
app.use("/api/bookings", require("./routes/bookings.routes"));
app.use("/api/posts", require("./routes/posts.routes"));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ API running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Mongo connect error:", err);
    process.exit(1);
  });
