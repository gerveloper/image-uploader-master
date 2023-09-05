const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const fileUpload = require('express-fileupload')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const CONNECTION = process.env.CONNECTION

mongoose.set('strictQuery', false)
app.use(fileUpload())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("Prueba GET")
})

app.post('/upload', (req, res) => {
    console.log(req.files.file)
    res.send(`Successfully uploaded file "${req.files.file.name}"`)
})

const start = async () => {
    try {
        await mongoose.connect(CONNECTION)

        app.listen(PORT, () => {
            console.log("Server running on port " + PORT)
        })

    } catch(err) {
        console.log(err.message)
    }
}

start()

