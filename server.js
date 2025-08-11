const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const leadRoutes = require("./routes/leadRoutes")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// use both

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://ecoinch.com",
  "https://www.ecoinch.com",
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)


app.use(express.json())

app.use("/api/leads", leadRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => console.log(`Server running on port :-  ${PORT}`))
  })
  .catch((err) => console.error("MongoDB connection error:", err))
