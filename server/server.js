/* Server-side global variables */
require(`dotenv`).config({path:`./config/.env`})
require('./config/db');

/* Express */
const express = require(`express`)
const cors = require(`cors`)
const app = express()
const createError = require(`http-errors`)

/*Middleware imports*/
const logger = require(`./middleware/logger`)
const {errorHandler, notFoundHandler} = require(`./middleware/errorHandler`)

/* Middleware */
app.use(express.json())

// app.use(require(`body-parser`).json())

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(logger)

// Routers
const productRoutes = require('./routes/products')
app.use('/users', require('./routes/users'))
app.use(productRoutes)

// Port
app.listen(process.env.SERVER_PORT, () =>
{
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})

app.use(notFoundHandler)

app.use(errorHandler)