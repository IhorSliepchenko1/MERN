const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const auth = require('./routes/auth.route')
const todo = require('./routes/todo.route')

const app = express()
dotenv.config()

app.use(cors({
     origin: 'http://127.0.0.1:5173',
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ extended: true }))

app.use('/api/auth', auth)
app.use('/api/todo', todo)

const PORT = process.env.PORT
const URL = process.env.URL

const start = async () => {
     try {
          await mongoose.connect(URL)
          app.listen(PORT, () => {
               console.log(`Connected database, http://localhost:${PORT}`);
          })
     }
     catch (e) { console.error(e); }
}

start()