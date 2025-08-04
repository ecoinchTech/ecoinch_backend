// server/server.js
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const leadRoutes = require("./routes/leadRoutes")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: "http://localhost:3000", 
}))
app.use(express.json())

app.use("/api/leads", leadRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.error("MongoDB connection error:", err))
