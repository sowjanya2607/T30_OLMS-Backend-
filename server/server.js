const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowingRecordRoutes = require("./routes/borrowingRecordRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");
const digitalResourceRoutes = require("./routes/digitalResources");
const server = require('./src/server.js');
const app = express();
// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // You may need this option if you're using cookies or sessions
  })
);
app.use(bodyParser.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/borrowing-records", require("./routes/borrowingRecordRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/digital-resources", digitalResourceRoutes);
// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrowingRecord", borrowingRecordRoutes);
app.use("/api/admin", adminRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://sowjanyagunturi2004:987654321@cluster0.urac1hp.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
