// Server-side global variables
require(`dotenv`).config({path:`./config/.env`})
require('./config/db');

// Express
const express = require(`express`)
const cors = require(`cors`)
const app = express()
const createError = require(`http-errors`)

app.use(express.json())

app.use(require(`body-parser`).json())
// app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
};

app.use(cors(corsOptions));


// Routers
const productRoutes = require('./routes/products')
app.use('/users', require('./routes/users'))
app.use(productRoutes)

// Port
app.listen(process.env.SERVER_PORT, () => 
{
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})


// Error 404
app.use((req, res, next) => {next(createError(404))})

// Other errors
app.use(function (err, req, res, next)
{
    console.error(err.message)
    if (!err.statusCode) 
    {
        err.statusCode = 500
    }
    res.status(err.statusCode).send(err.message)
})