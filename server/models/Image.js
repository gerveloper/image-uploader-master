const { Schema, model } = require('mongoose')

let Image = new Schema({

    url : {
        type : String,
        required : true
    }
})

module.exports = model('Image', Image)