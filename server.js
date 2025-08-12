const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const leadRoutes = require("./routes/leadRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow localhost + production domains
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://ecoinch.com",
  "https://www.ecoinch.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/leads", leadRoutes);

// MongoDB connection optimization
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Keep up to 10 DB connections ready
      serverSelectionTimeoutMS: 5000, // Fail fast if no DB connection
      socketTimeoutMS: 45000, // Avoid long-hanging queries
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  }
};

// Start server
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port: ${PORT}`)
  );
});
