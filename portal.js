const express = require('express')
const cors = require('cors')
const allRoutes = require('express-list-endpoints')
const bodyParser = require('body-parser')

const app = express()

const account = require('./api/routers/account.router')
const hr = require('./api/routers/hr.router')
const ac = require('./api/routers/acMembers.router')

const { connectDB } = require('./config/dbConfig')



// add other middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => res.send('Home Page Route'))

// app.use('/account', account)
// app.use((req, res) => {
//   res.status(404).send({ err: 'No such url' })
// })

app.use('/hrAccount', hr)
app.use((req, res) => {
  res.status(404).send({ err: 'No such url' })
})

// app.use('/acAccount', ac)
// app.use((req, res) => {
//   res.status(404).send({ err: 'No such url' })
// })

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Origin', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept'
  )
  next()
})



connectDB()


const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server up and running on ${port}`))
