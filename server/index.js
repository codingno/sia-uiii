require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '../files')))

app.listen(process.env.IMAGE_SERVER_PORT, () => console.log("Run Image Server on PORT:" + process.env.IMAGE_SERVER_PORT))