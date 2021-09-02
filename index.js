require("dotenv").config();
const express = require("express");
const { json } =  require("express");
const cors = require("cors")
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(json())
app.use(routes)

app.listen(3333, () => {
    console.log('server running on port 3333')
})
