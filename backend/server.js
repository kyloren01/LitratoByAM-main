require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const authRoute = require('./src/Routes/authRoutes')
const adminRoute = require('./src/Routes/adminRoutes')
const employeeRoute = require('./src/Routes/employeeRoutes')
const customerRoute = require('./src/Routes/customerRoutes')

const app = express()
const cors = require('cors')
const { initUserTable } = require('./src/Model/userModel')

app.use(cors())
app.use(bodyParser.json())

// Routes
app.use('/api/auth', authRoute)
app.use('/api/admin', adminRoute)
app.use('/api/employee', employeeRoute)
app.use('/api/customer', customerRoute)

// Error handling
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

const PORT = process.env.PORT || 5000
initUserTable()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err)
    process.exit(1)
  })
