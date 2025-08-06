// server/models/Lead .js
const mongoose = require("mongoose")

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  query: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Lead", leadSchema)


