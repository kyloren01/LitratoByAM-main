const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use { host, port, secure } for custom SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

async function sendEmail(to, subject, html) {
  await transporter.sendMail({
    from: `"Litrato" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  })
}

module.exports = { sendEmail }
