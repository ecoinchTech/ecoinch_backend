// server/routes/leadRoutes.js
const express = require("express")
const router = express.Router()
const Lead = require("../models/Lead")
const sendEmail = require("../utils/sendEmail.js") // for mail only

// router.post("/", async (req, res) => {
//   try {
//     const { name, email, phone, query } = req.body

//     const newLead = new Lead({ name, email, phone, query })
//     await newLead.save()

//     res.status(201).json({ message: "Lead submitted successfully" })
//   } catch (error) {
//     console.error("Error saving lead:", error)
//     res.status(500).json({ message: "Server error" })
//   }
// })


// GET all queries (only query text, optional: include name)
router.get("/queries", async (req, res) => {
  try {
    const queries = await Lead.find({}, { name: 1, phone: 1, email: 1,  query: 1, submittedAt: 1, _id: 0 }).sort({ submittedAt: -1 })
    res.json(queries)
  } catch (error) {
    console.error("Error fetching queries:", error)
    res.status(500).json({ message: "Server error" })
  }
})



router.post("/", async (req, res) => {
  try {
    const { name, email, phone, query } = req.body

    const newLead = new Lead({ name, email, phone, query })
    await newLead.save()

    // send email
    await sendEmail({ name, email, phone, query })

    res.status(201).json({ message: "Lead submitted and email sent" })
  } catch (error) {
    console.error("Error saving lead or sending email:", error)
    res.status(500).json({ message: "Server error" })
  }
})





module.exports = router
