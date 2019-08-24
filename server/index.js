const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// middleware
app.use(bodyParser.json())
app.use(cors())

// routes
const todos = require('./routes/api/todos')

app.use('/api/todos', todos)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server listening on ${port}!`))