// server/utils/sendEmail.js
// server/utils/sendEmail.js
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendEmail = async ({ name, email, phone, query }) => {
  const message = `
📥 New Lead Submitted on Ecoinch:

👤 Name:  ${name}
📧 Email: ${email}
📞 Phone: ${phone}
📝 Query:
${query}

------------------------------
Sent on: ${new Date().toLocaleString()}
`

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
    subject: `📬 New Lead from ${name}`,
    text: message, // plain text only
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("✅ Email sent successfully")
  } catch (error) {
    console.error("❌ Error sending email:", error)
  }
}

module.exports = sendEmail
